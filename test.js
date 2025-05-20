const tokenAddress = 'FDmk5MKCDKSLwN2dVDUmWPJbwMY2iVodcTxVJJYM';

fetch(`https://bds-api.birdeye.so/market/token_price?address=${tokenAddress}`, {
  method: 'GET',
  headers: {
    'X-API-KEY': 'b0d3259d2b7a4b2ba20c3e5d8e9864f2',
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