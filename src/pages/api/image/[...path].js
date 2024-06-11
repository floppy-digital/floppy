const axios = require('axios');

export const config = {
  api: {
    responseLimit: '8mb',
  },
};

export default async function handler(req, res) {
  try {
    const { path } = req.query;

    const fullUrl =
      path.length == 3
        ? `https://dg3mov3znt8u.cloudfront.net/upload/${path[0]}/${path[1]}/${path[2]}`
        : `https://dg3mov3znt8u.cloudfront.net/upload/${path[0]}/${path[1]}`;
    const { data } = await axios.get(fullUrl, { responseType: 'stream' });
    data.pipe(res);
  } catch (error) {
    console.error(error);
  }
}
