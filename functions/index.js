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

export const sendEmail = https.onRequest(
  // eslint-disable-next-line no-unused-vars
  async (req, res) => {
    const { mail, code, parcoursName } = {
      mail: 'ineswcia@gmail.com',
      code: 'ABCD-DEFG',
      parcoursName: 'tours',
    }
    if (!mail || !code || !parcoursName) {
      throw new https.HttpsError('invalid-argument', 'Missing mail, code or parcoursName')
    }
    _sendMail(mail, code, parcoursName)
    res.sendStatus(200)
  },
)

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
    from: 'Escape LR<ingenious.code.tech@gmail.com>',
    to: mail,
    subject: "Votre code d'accès 🔐",
    html: `
        <!doctype html>
        <html lang="fr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta name="color-scheme" content="light only" />
          <meta name="supported-color-schemes" content="light only" />
          <meta http-equiv="x-ua-compatible" content="ie=edge" />
          <title>Votre aventure peut commencer</title>

          <!--[if mso]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          <![endif]-->

          <style>
            :root {
              color-scheme: light only;
              supported-color-schemes: light;
            }

            /* Minimal responsive helpers */
            @media screen and (max-width: 620px) {
              .container { width: 100% !important; }
              .px { padding-left: 16px !important; padding-right: 16px !important; }
              .h1 { font-size: 30px !important; line-height: 36px !important; }
              .p { font-size: 18px !important; line-height: 26px !important; }
            }

            u + .body * {
              background-color: inherit !important;
              color: inherit !important;
            }

            /* Force les couleurs déclarées */
            body, table, td {
              forced-color-adjust: none !important;
              -webkit-text-fill-color: inherit !important;
            }
          </style>
        </head>

        <body style="margin:0; padding:0; background:#000; background-image: linear-gradient(135deg, #2c3e5b 0%, #091837 100%);">
          <!-- Preheader (caché) -->
          <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; mso-hide:all;">
            Votre aventure peut commencer dès maintenant : voici votre code d'accès.
          </div>

         <table role="presentation" class="container" width="600"
            style="width:600px; max-width:600px; margin: 0 auto;">

            <!-- HERO avec background image + VML pour Outlook -->
            <tr>
              <td align="center">
                <table role="presentation" width="100%" >
                  <tr>
                    <td class="px" style="padding:28px 36px 34px 36px; text-align:left;">

                      <!-- Logo -->
                      <div>
                        <img
                          src="cid:logo"
                          width="180"
                          alt="Logo"
                          style="display:block; border:0; outline:none; text-decoration:none; height:auto;"
                        />
                      </div>

                      <!-- Spacer -->
                      <div style="line-height:28px; height:28px;">&nbsp;</div>

                      <div style="background:#000; mix-blend-mode:screen;">
                      <div style="background:#000; mix-blend-mode:difference;">
                      <!-- Title -->
                      <div class="h1"
                          style="font-family: Arial, Helvetica, sans-serif; font-size:36px; line-height:44px; font-weight:700; color:#ffffff; text-align:center; margin: 20px 0">
                            Votre aventure peut commencer dès maintenant&nbsp;!
                      </div>

                      <div style="line-height:22px; height:22px;">&nbsp;</div>

                      <!-- Subtitle -->
                      <div class="p"
                          style="font-family: Arial, Helvetica, sans-serif; font-size:20px; line-height:30px; font-weight:600; color:#ffffff; text-align:center;">
                        <span style="color:#ffffff" data-ogsc="color:#ffffff">
                          Merci pour votre achat 🎉
                        </span>
                      </div>

                      <div style="line-height:18px; height:18px;">&nbsp;</div>

                      <!-- Text -->
                      <div class="p"
                          style="font-family: Arial, Helvetica, sans-serif; font-size:20px; line-height:30px; color:#ffffff; text-align:center;">
                        <span style="color:#ffffff" data-ogsc="color:#ffffff">
                          Voici votre code d'accès pour le parcours <strong>"${LABELS[parcoursName] || parcoursName}"</strong>&nbsp;:
                        </span>
                      </div>

                      <div style="line-height:18px; height:18px;">&nbsp;</div>

                      <!-- CODE BOXES -->
                      <table role="presentation" align="center" style=" margin: 20px auto;">
                        <tr>
                          <td style="padding:14px 22px; font-size:26px; font-weight:bold;
                                    color:#4F637E; border-radius:8px; letter-spacing:4px; background-color: #ffffff;">
                            ${code}
                          </td>
                        </tr>
                      </table>

                      <div style="line-height:24px; height:24px;">&nbsp;</div>

                      <!-- App text -->
                      <div class="p"
                          style="font-family: Arial, Helvetica, sans-serif; font-size:20px; line-height:30px; color:#ffffff; text-align:center;">
                        Téléchargez l'application mobile <strong>Escape LR</strong> 📱 puis entrez ce code pour commencer.
                      </div>

                      <div style="line-height:26px; height:26px;">&nbsp;</div>

                      <!-- Closing -->
                      <div class="p"
                          style="font-family: Arial, Helvetica, sans-serif; font-size:20px; line-height:30px; color:#ffffff; text-align:center;">
                        À très vite dans les rues de La Rochelle ⚓
                      </div>

                      <div style="line-height:28px; height:28px;">&nbsp;</div>

                      <!-- Footer contact -->
                      <div class="p"
                        style="font-family: Arial, Helvetica, sans-serif; font-size:16px; line-height:24px; color:#ffffff; text-align:center;  margin: 20px 0;">
                        En cas de problème, n'hésitez pas à nous contacter via ce mail :
                        <a href="mailto:ingenious.code.tech@gmail.com" style="color:#ffffff; text-decoration:underline;">
                          ingenious.code.tech@gmail.com
                        </a>
                      </div>

                      </div>
                      </div>

                      <div style="line-height:10px; height:10px;">&nbsp;</div>

                    </td>
                  </tr>
                </table>

              </td>
            </tr>

          </table>
        </body>
      </html>`,
    attachments: [
      {
        filename: 'logo.png',
        path: './assets/logo3.png',
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
