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
  apiKey: "AIzaSyBXjUGbU2ujeDVW2HgFar19UyRf_p4lBYA",
  authDomain: "easytask-new.firebaseapp.com",
  projectId: "easytask-new",
  storageBucket: "easytask-new.firebasestorage.app",
  messagingSenderId: "914814720542",
  appId: "1:914814720542:web:b8fbfb138a89d72347ec0f",
  measurementId: "G-TY5ZK1R4HC",
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
