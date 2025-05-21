const tokenAddress = 'FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYM';

fetch(`https://public-api.birdeye.so/public/price??address=${tokenAddress}`, {
  method: 'GET',
  headers: {
    'X-API-KEY': 'REDACTED',
    'Content-Type': 'application/json',
  }
})
.then(res => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
})
.then(data => {
  console.log('Response data:', data);
})
.catch(err => {
  console.error('Fetch error:', err);
});