const tokenMint = 'YOUR_TOKEN_MINT_ADDRESS'; // Replace with your token's mint address
const apiKey = 'YOUR_MORALIS_API_KEY'; // Replace with your Moralis API key

async function fetchTokenPrice() {
  try {
    const response = await fetch(`https://solana-gateway.moralis.io/token/price?network=mainnet&address=${tokenMint}`, {
      headers: {
        'accept': 'application/json',
        'X-API-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const price = data.usdPrice.toFixed(5); // Adjust decimal places as needed
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