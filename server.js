// Load .env file only if it's not already in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 
console.log('Moralis API Key:', process.env.MORALIS_API_KEY ? 'SET' : 'NOT SET');


const express = require('express'); //switch to ESM next time to use import instead
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let cachedPrice = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 1000; // 60 seconds

const TOKEN_ADDRESS = 'FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYMpump';
const API_KEY = process.env.MORALIS_API_KEY;
const API_URL = 'https://solana-gateway.moralis.io/token/mainnet/FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYMpump/price';

app.use(cors());



//create and call api endpoint
app.get('/price', async (req, res) => {
    try {
        const now = Date.now();

        //serve from cache if less than cache duration old
        if (cachedPrice && (now - lastFetched) < CACHE_DURATION) {
        return res.json({ usdPrice: cachedPrice, source: 'cache' });
        }
        //fetch data
       
        const response = await fetch(API_URL, {
            headers: {'X-API-Key': API_KEY },
        });

        if(!response.ok) {
        const text = await response.text();
        console.log(`API returned status ${response.status}: ${text}`);

        return res.status(response.status).json({error: 'Network response was not ok', details: text});
    }
    const data = await response.json();

    //get the price and a fallback just incase
    const usdPrice = data.usdPrice ?? (data.nativePrice && data.nativePrice.value);

    cachedPrice = usdPrice;
    lastFetched = now;

    res.json({usdPrice, source: 'api'});
     } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//listens for server running properly
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

