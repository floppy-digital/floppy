const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.send(501);
  } else {
    try {
      const { content, path } = req.body;
      const options = {
        method: 'POST',
        url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-API-Key': process.env.MORALIS_API_KEY,
        },
        data: [
          {
            content,
            path,
          },
        ],
      };
      const { data } = await axios.request(options);
      const hash = data[0].path;
      res.send(hash);
    } catch (error) {
      console.error(error.message);
    }
  }
}
