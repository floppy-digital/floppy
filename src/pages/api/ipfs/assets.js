const axios = require('axios');

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.send(501);
  } else {
    try {
      const { front, back, audio } = req.body;

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
            content: front.content,
            path: front.path,
          },
          {
            content: back.content,
            path: back.path,
          },
          {
            content: audio.content,
            path: audio.path,
          },
        ],
      };

      const { data } = await axios.request(options);
      res.send(data);
    } catch (error) {
      console.error(error.message);
    }
  }
}
