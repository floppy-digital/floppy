import axios from 'axios';
const url1 = '/api/ipfs/assets';
const url2 = '/api/ipfs/metadata';

export const saveAssetsToIPFS = async (front, back) => {
  try {
    const { data } = await axios.post(url1, {
      front,
      back,
    });

    const hashes = [];

    data.forEach((path) => {
      hashes.push(path.path.split('ipfs/')[1]);
    });

    return hashes;
  } catch (error) {
    console.error(error);
  }
};

export const saveMetadataToIPFS = async (content, path) => {
  try {
    const { data } = await axios.post(url2, { content, path });
    const metadataHash = data.split('ipfs/')[1];
    return metadataHash;
  } catch (error) {
    console.error(error);
  }
};
