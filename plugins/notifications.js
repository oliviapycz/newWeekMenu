import Vue from 'vue'
import { urlBase64ToUint8Array } from '../utils/urlBase64ToUint8Array'
import { PUBLIC_SERVER_KEY } from '../utils/constants'
import Subscription from '~/api/subscription'
Vue.mixin({
  methods: {
    requestPermissionForNotification () {
      console.log('in mixin')
      if ('Notification' in window) {
        Notification.requestPermission((result) => {
          console.log('result', result)
          if (result !== 'granted') {
            console.log('notification not granted')
          } else {
            // this.displayConfirmNotification()
            this.configurePushSubscription()
            console.log('notification active')
          }
        })
      } else {
        alert('notification not happened correctly ')
      }
    },
    displayConfirmNotification () {
      if ('serviceWorker' in navigator) {
        const options = {
          body: 'You successfully subscribed to notifications service',
          // icon: '../static/icon.png',
          dir: 'ltr',
          vibrate: [100, 50, 100],
          // badge: '../static/icon.png',
          tag: 'confirm-display-notification',
          renotify: true,
          actions: [
            {
              action: 'confirm',
              title: 'Okay'
              // icon: '../static/icon.png'
            },
            {
              action: 'cancel',
              title: 'Cancel'
              // icon: '../static/icon.png'
            }
          ]
        }
        navigator.serviceWorker.ready.then((sw) => {
          console.log('message here')
          sw.showNotification('Successfully Subscribed', options)
        })
      }
    },
    configurePushSubscription () {
      if (!('serviceWorker' in navigator)) {
        // eslint-disable-next-line no-useless-return
        return
      }
      navigator.serviceWorker.ready
        .then((sw) => {
          return sw.pushManager.getSubscription()
            .then((sub) => {
              if (sub === null) {
                return sw.pushManager
                  .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(PUBLIC_SERVER_KEY)
                  })
                  .then((subscription) => {
                    console.log('Subscribe OK:', subscription)
                    return Subscription.createSubscription(JSON.stringify(subscription))
                  })
                  .then((response) => {
                    if (response.ok) {
                      this.displayConfirmNotification()
                      console.log('Server Stored Subscription.')
                    }
                  })
                  .catch((err) => {
                    console.log('Subscribe Error:', err)
                  })
              } else {
                // that.newNotif('Subscribtion sudah ada')
              }
            })
        })
    }
  }
})
