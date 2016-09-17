import Firebase from 'firebase'

const firebase = Firebase.initializeApp({
  apiKey: 'AIzaSyBe_P4b1YvER6RQ3I7ie3l1Gqh4I4r2ZPk',
  authDomain: 'purplechat-a8c3f.firebaseapp.com',
  databaseURL: 'https://purplechat-a8c3f.firebaseio.com',
  storageBucket: 'purplechat-a8c3f.appspot.com',
  messagingSenderId: '20224651740'
})

export default firebase
