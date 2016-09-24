/* global importScripts */
import 'file?name=../sw-toolbox.js!sw-toolbox/sw-toolbox'

(self => {
  importScripts('/sw-toolbox.js')

  /// INSTALLATION AND ACTIVATION OF THE WORKER

  self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting())
  })

  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
  })

  /// PUSH NOTIFCATIONS
  self.addEventListener('push', event => {
    const data = event.data.json()
    const title = data ? data.sender.displayName : 'New message'
    const options = {
      body: data ? data.messageText : 'You have a new message on PurpleChat!',
      icon: data ? data.sender.photoURL : '/images/icon-192.png',
      vibrate: [200, 100, 200, 100, 400],
      tag: data ? `purplechat-${data.chatId}` : 'purplechat-message',
      data: {
        url: '/#/messages/' + data.chatId
      }
    }

    event.waitUntil(
      self.registration.showNotification(title, options)
    )
  })

  self.addEventListener('notificationclick', event => {
    event.notification.close()

    event.waitUntil(
      self.clients.matchAll({ type: 'window' })
        .then(windowClients => {
          for (const client of windowClients) {
            if ('focus' in client) {
              return client.focus()
            }
          }

          if ('openWindow' in self.clients) {
            return self.clients.openWindow(event.notification.data.url)
          }
        })
    )
  })


  /// CACHING

  self.toolbox.router.get('/(.*)', self.toolbox.networkFirst, {
    cache: {
      name: 'bundle-cache-v1',
      maxEntries: 10
    }
  })

  self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
    origin: /firebasestorage\.googleapis\.com/,
    cache: {
      name: 'firebase-storage-cache',
      maxEntries: 25
    }
  })
})(self)
