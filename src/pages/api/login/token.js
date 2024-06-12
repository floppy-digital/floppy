const { db, auth } = require('@/lib/firebaseServer');
const { recoverPersonalSignature } = require('@metamask/eth-sig-util');

function isValidSignature(address, signature, message) {
  const signingAddress = recoverPersonalSignature({
    data: message,
    signature: signature,
  });

  return signingAddress.toLowerCase() === address.toLowerCase();
}

export default async function handler(req, res) {
  try {
    const { address, signature } = req.query;

    const [token, doc] = await Promise.all([
      auth.createCustomToken(address),
      db.collection('users').doc(address).get(),
    ]);

    if (!doc.exists) {
      res.send({ error: 'user not found' });
    }

    const { messageToSign } = doc.data();

    if (!messageToSign) {
      res.send({ error: 'invalid messsage' });
    }

    const validSignature = isValidSignature(address, signature, messageToSign);

    if (!validSignature) {
      res.send({ error: 'invalid signature' });
    }

    db.collection('users').doc(address).update({
      messageToSign: null,
    });

    res.send(token);
  } catch (error) {
    console.error(error.message);
  }
}
