import firebase from 'core/firebase'
import { applicationServerKey } from 'core/config'

export function initialisePush() {
  return (dispatch, getState) => {
    // Let's check if we can do this
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.log("Notifications aren't supported")
      return
    }

    if (Notification.permission === 'denied') {
      console.log('The user has blocked notifications')
      return
    }

    if (!('PushManager' in window)) {
      console.log("Push messaging isn't supported")
      return
    }

    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.getSubscription()
        .then(subscription => {
          if (!subscription) {
            dispatch({ type: 'SETTING_NOTIFICATIONS_CHANGED', disabled: false, toggled: false })
            return
          }

          sendPushSubscription(getState, subscription).then(() => {
            dispatch({ type: 'SETTING_NOTIFICATIONS_CHANGED', disabled: false, toggled: true })
          })
        })

    })
  }
}

export function pushSubscribe() {
  return (dispatch, getState) => {
    // Disable the button so it can't be changed while we process the request
    dispatch({ type: 'SETTING_NOTIFICATIONS_CHANGED', disabled: true })

    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      })
        .then(subscription => sendPushSubscription(getState, subscription))
        .then(() => {
          dispatch({ type: 'SETTING_NOTIFICATIONS_CHANGED', disabled: false, toggled: true })
        })
        .catch(error => {
          if (Notification.permission === 'denied') {
            // The user denied the notification permission
            // It can be re-enabled only manually...
          }
          else {
            // A problem occured with the subscription
            console.error('Unable to subscribe to push.', error)
          }
        })
    })
  }
}

export function pushUnsubscribe() {
  return (dispatch, getState) => {
    // Disable the button so it can't be changed while we process the request
    dispatch({ type: 'SETTING_NOTIFICATIONS_CHANGED', disabled: true })

    const { auth } = getState()
    const settingRef = firebase.database().ref(`users/${auth.uid}/settings/notifications`)

    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.getSubscription()
        .then(subscription => {
          // Check if we have subscription to unsubscribe
          if (!subscription) {
            dispatch({ type: 'SETTING_NOTIFICATIONS_CHANGED', disabled: false, toggled: false })
            settingRef.set(false)
            return
          }

          // Remove the subscription from the database. After this it will be
          // useless anyway
          const subKey = getSubscriptionKey(subscription)
          const updates = {}
          updates[`users/${auth.uid}/pushSubscriptions/${subKey}`] = null
          updates[`users/${auth.uid}/settings/notifications`] = false
          firebase.database().ref().update(updates).then(() => {
            subscription.unsubscribe()
            dispatch({ type: 'SETTING_NOTIFICATIONS_CHANGED', disabled: false, toggled: false })
          })
        })
    })
  }
}

export function sendPushSubscription(getState, subscription) {
  const { auth } = getState()
  const subKey = getSubscriptionKey(subscription)
  const data = JSON.stringify(subscription)

  const updates = {}
  updates[`users/${auth.uid}/pushSubscriptions/${subKey}`] = data
  updates[`users/${auth.uid}/settings/notifications`] = true
  return firebase.database().ref().update(updates)
}

function getSubscriptionKey(subscription) {
  return encodeURIComponent(subscription.endpoint).replace(/\./g, '%2E')
}
