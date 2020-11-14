import * as firebase from 'firebase-admin'

const params = {
  apiKey: 'AIzaSyDlh_7nZYR03vpRjcZvEgi_fTmb4oqjzKs',
  authDomain: 'pakettikauppa-295108.firebaseapp.com',
  databaseURL: 'https://pakettikauppa-295108.firebaseio.com',
  projectId: 'pakettikauppa-295108',
  storageBucket: 'pakettikauppa-295108.appspot.com',
  messagingSenderId: '516972920334',
  appId: '1:516972920334:web:d44aa3ad6d31c94dce865f',
  measurementId: 'G-3FE3EL3FE7',
}

firebase.initializeApp({
  credential: firebase.credential.cert(params),
})
