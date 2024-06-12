const { v4: uuidv4 } = require('uuid');
const { db } = require('@/lib/firebaseServer');

export default async function handler(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      res.send({ error: 'invalid address' });
    }

    const randomId = uuidv4();

    const messageToSign = `nonce: ${randomId}`;

    const user = await db.collection('users').doc(address).get();

    if (!user.data() || !user.data().messageToSign) {
      db.collection('users').doc(address).set(
        {
          messageToSign,
        },
        {
          merge: true,
        }
      );
    }

    res.send(messageToSign);
  } catch (error) {
    console.error(error.message);
  }
}
