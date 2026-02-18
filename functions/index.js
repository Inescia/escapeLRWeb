import admin from 'firebase-admin'
import { https } from 'firebase-functions'
import { defineString } from 'firebase-functions/params'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'

admin.initializeApp()
const db = admin.firestore()
const STRIPE_SECRET = defineString('STRIPE_SECRET')
const STRIPE_WEBHOOK_SECRET = defineString('STRIPE_WEBHOOK_SECRET')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ingenious.code.tech@gmail.com',
    pass: 'rncabyccctxsixfu',
  },
})

export const stripeWebhook = https.onRequest(async (req, res) => {
  const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: '2023-10-16' })
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET.value())
  } catch (err) {
    console.error('Webhook signature verification failed.', err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const mail = session.customer_details?.email || session.customer_email || null
    const parcoursName = session.metadata?.parcoursName || 'tours'
    const code = _generateCode()

    await db.collection('Codes').doc(code).set({
      id: code,
      creationDate: admin.firestore.FieldValue.serverTimestamp(),
      mail,
      parcoursName,
      status: 'ready',
    })
    console.log(`Code généré pour ${mail}: ${code}`)
    _sendMail(mail, code, parcoursName)
  }

  res.sendStatus(200)
})

function _generateCode(length = 8) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }

  return result.match(/.{1,4}/g).join('-')
}

function _sendMail(mail, code, parcoursName) {
  const LABELS = {
    tours: "Dans l'Ombre des Tours",
    richelieu: 'Les Secrets de Richelieu',
    esclavage: "L'Héritage Colonial",
    nazis: 'Le Code des Résistants',
  }

  const mailOptions = {
    from: 'Escape LR ⚓️<ingenious.code.tech@gmail.com>',
    to: mail,
    subject: "Votre code d'accès 🔐",
    html: `
          <img src="cid:logo" alt="Logo" style="width:auto; margin-bottom:20px;" />
          <h2>Votre aventure peut commencer dès maintenant !</h2>

          <p>Merci pour votre achat 🎉</p>

          <p>Voici votre code d'accès pour le parcours “${LABELS[parcoursName] || parcoursName}“ :</p>

          <div style="
            font-size:24px;
            font-weight:bold;
            letter-spacing:3px;
            margin:20px 0;
          ">
            ${code}
          </div>

          <p>Téléchargez l'application mobile Escape LR 📱 puis entrez ce code pour commencer.</p></br>

          <p>À très vite dans les rues de La Rochelle ⚓️</p>
        `,
    attachments: [
      {
        filename: 'logo.png',
        path: './assets/logo.png',
        cid: 'logo',
      },
    ],
  }
  return transporter.sendMail(mailOptions, (erro, info) => {
    console.log(erro, info)
    if (erro) return console.error(erro.toString())
    return 'Sended'
  })
}
