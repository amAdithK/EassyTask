// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCaVHO-zfvvJdaTtyxggOvk7YFcRSE3xjU",
  authDomain: "eassycorptrack.firebaseapp.com",
  projectId: "eassycorptrack",
  storageBucket: "eassycorptrack.firebasestorage.app",
  messagingSenderId: "960870842985",
  appId: "1:960870842985:web:07ac09e3adf039144e98f8",
  measurementId: "G-4HTK059Y2F",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: payload.notification.icon?.icon || "",
    // data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
