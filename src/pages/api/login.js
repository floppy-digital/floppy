const router = require('express').Router()
const {v4: uuidv4} = require('uuid')
const {db, auth} = require('../firebase')
const {recoverPersonalSignature} = require('@metamask/eth-sig-util')

function isValidSignature(address, signature, message) {
    const signingAddress = recoverPersonalSignature({
        data: message,
        signature: signature
    })

    return signingAddress.toLowerCase() === address.toLowerCase()
}

// GET api/login/message
router.get('/message', async (req, res, next) => {
    try {
        const {address} =  req.query

        if (!address) {
            res.send({error: 'invalid address'})
        }

        const randomId = uuidv4()

        const messageToSign = `nonce: ${randomId}`

        const user = await db.collection('users').doc(address).get()
        
        if (!user.data() || !user.data().messageToSign) {
            db.collection('users').doc(address).set({
                messageToSign,
            },{
                merge: true
            })
        }

        res.send(messageToSign)
    } catch (error) {
        next(error)
    }
})

// GET api/login/token
router.get('/token', async (req, res, next) => {
    try {
        const {address, signature} = req.query

        const [token, doc] = await Promise.all([
            auth.createCustomToken(address),
            db.collection('users').doc(address).get()
        ])

        if (!doc.exists){
            res.send({error: 'user not found'})
        }

        const {messageToSign} = doc.data()

        if (!messageToSign) {
            res.send({error: 'invalid messsage'})
        }

        const validSignature = isValidSignature(address, signature, messageToSign)

        if (!validSignature) {
            res.send({error: 'invalid signature'})
        }
       
        db.collection('users').doc(address).update({
            messageToSign: null
        })

        res.send(token)
    } catch (error) {
        next(error)
    }
})

module.exports = router