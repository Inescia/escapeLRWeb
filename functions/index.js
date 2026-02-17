/* eslint-disable no-unused-vars */
import admin from 'firebase-admin'
import { https } from 'firebase-functions'
import { defineString } from 'firebase-functions/params'
import Stripe from 'stripe'

admin.initializeApp()
const db = admin.firestore()
const STRIPE_SECRET = defineString('STRIPE_SECRET')
const STRIPE_WEBHOOK_SECRET = defineString('STRIPE_WEBHOOK_SECRET')

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
    console.log('event:', session)

    const mail = session.customer_details?.email || session.customer_email || null
    const parcoursName = session.metadata?.parcoursName || 'Inconnu'
    const code = _generateCode()

    console.log('mail', mail)
    console.log('parcoursName', parcoursName)
    console.log('code', code)

    await db.collection('Codes').doc(code).set({
      id: code,
      creationDate: admin.firestore.FieldValue.serverTimestamp(),
      mail,
      parcoursName,
      status: 'ready',
    })
    console.log(`Code généré pour ${mail}: ${code}`)
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

/*import { Resend } from "resend";

const resendKey = defineSecret("RESEND_API_KEY");

export const stripeWebhook = functions.https.onRequest(
  { secrets: [resendKey] },
  async (req, res) => {
    const resend = new Resend(resendKey.value());

    // ... validation Stripe ...

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const email = session.customer_email!;
      const code = generateCode();

      await db.collection("Codes").add({
        code,
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // ✉️ ENVOI DU MAIL
      await resend.emails.send({
        from: "Escape La Rochelle <contact@tondomaine.fr>",
        to: email,
        subject: "Votre code d'accès à l'aventure 🔐",
        html: `
          <h2>Votre aventure commence maintenant.</h2>

          <p>Merci pour votre achat 🎉</p>

          <p>Voici votre code d'accès :</p>

          <div style="
            font-size:24px;
            font-weight:bold;
            letter-spacing:3px;
            margin:20px 0;
          ">
            ${code}
          </div>

          <p>Téléchargez l'application puis entrez ce code pour commencer.</p>

          <p>À très vite dans les rues de La Rochelle…</p>
        `,
      });
    }

    res.sendStatus(200);
  }
);
*/
