const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.send(501);
  } else {
    try {
      const fullUrl = `https://gateway.moralisipfs.com/ipfs/${req.body.url}`;
      const response = await axios.get(fullUrl, {
        responseType: 'arraybuffer',
      });

      res.send(response.data.toString('base64'));
    } catch (error) {
      console.error(error.message);
    }
  }
}
