const tokenAddress = 'FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYM';
const apiKey='4de277169fe44525aa4988c8ead2c291';

async function fetchTokenPrice() {
  try {
    const response = await fetch('https://public-api.birdeye.so/defi/price?address=FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYMpump', {
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
    const price = data.data.value.toFixed(8)  // Adjust decimal places as needed
    console.log(data);
    document.getElementById('price').textContent = `$${price}`;
  } catch (error) {
    console.error('Error fetching token price:', error);
    document.getElementById('price').textContent = 'Error loading price';
  }
}

// Fetch the price initially
fetchTokenPrice();

// Update the price every 10 seconds
setInterval(fetchTokenPrice, 10000);