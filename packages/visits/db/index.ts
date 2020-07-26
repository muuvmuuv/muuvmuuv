import { initializeApp, credential, database } from 'firebase-admin'

const serviceAccount = require('../firebase-cert.json')

export const getDatabase = (): database.Database => {
  initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: 'https://github-muuvmuuv-visits.firebaseio.com/',
  })

  return database()
}
