const tokenAddress = 'FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYM';
const apiKey='process.env.MORALIS_API_KEY';

//choose url local or cloud server
const BACKEND_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://b4b-bfoi.onrender.com';

//fetch from backed not api
async function fetchTokenPrice() {
  try {
    const response = await fetch(`${BACKEND_URL}/price`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)
    const rawPrice = data.usdPrice;
    //const price = (typeof rawPrice === 'string' ? Number(rawPrice) : rawPrice).toFixed(6) // Adjust decimal places as needed
    console.log(rawPrice);
    //update UI
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