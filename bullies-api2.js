const tokenAddress = 'FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYM';
const apiKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQ3NGFkYjczLTg1Y2UtNGY1Mi04OTUyLTIyNDE0NWU3MTZkYSIsIm9yZ0lkIjoiNDQ4MTgyIiwidXNlcklkIjoiNDYxMTIxIiwidHlwZUlkIjoiZDQ4ZDg4YWItNzAxNS00Y2RkLWExOWEtODMzZjE3OWZiOTMzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDc3NjA1MjksImV4cCI6NDkwMzUyMDUyOX0.JYAtTWTR9aBpXPL4gY5WFaWcd4yqRn5lGFei0x20Vbo';

async function fetchTokenPrice() {
  try {
    const response = await fetch('https://solana-gateway.moralis.io/token/mainnet/FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYMpump/price', {
    headers: {
        'X-API-KEY':  `${apiKey}`,
         accept: 'application/json',
        'x-chain': 'solana'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)
    const rawPrice = data.usdPrice;
    //const price = (typeof rawPrice === 'string' ? Number(rawPrice) : rawPrice).toFixed(6) // Adjust decimal places as needed
    console.log(rawPrice);
    document.getElementById('price').textContent = `$${rawPrice}`;
  } catch (error) {
    console.error('Error fetching token price:', error);
    document.getElementById('price').textContent = 'Error loading price';
  }
}

// Fetch the price initially
fetchTokenPrice();

// Update the price every 60 seconds
setInterval(fetchTokenPrice, 60000);