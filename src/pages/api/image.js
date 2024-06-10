const axios = require('axios');
const router = require('express').Router();

router.use(
  ['/:folder/:subfolder/:name', '/:folder/:name'],
  async (req, res, next) => {
    try {
      const fullUrl = req.params.subfolder
        ? `https://dg3mov3znt8u.cloudfront.net/upload/${req.params.folder}/${req.params.subfolder}/${req.params.name}`
        : `https://dg3mov3znt8u.cloudfront.net/upload/${req.params.folder}/${req.params.name}`;
      const { data } = await axios.get(fullUrl, { responseType: 'stream' });
      data.pipe(res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
