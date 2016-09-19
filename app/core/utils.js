import firebase from 'core/firebase'

export const getServerTime = (function(db) {
  let offset = 0
  db.ref('.info/serverTimeOffset').once('value', snapshot => {
    offset = snapshot.val()
  })
  return () => (Date.now() + offset)
})(firebase.database())
