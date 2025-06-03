importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCaVHO-zfvvJdaTtyxggOvk7YFcRSE3xjU",
  authDomain: "eassycorptrack.firebaseapp.com",
  projectId: "eassycorptrack",
  storageBucket: "eassycorptrack.firebasestorage.app",
  messagingSenderId: "960870842985",
  appId: "1:960870842985:web:07ac09e3adf039144e98f8",
  measurementId: "G-4HTK059Y2F",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon, url } = payload.data || {};

  self.registration.showNotification(title || "New Notification", {
    body: body || "",
    icon: icon || "/firebase-icon.png",
    data: {
      url: url || "/tasklist",
    },
    vibrate: [200, 100, 200],
    requireInteraction: true,
  });
});

// Handle notification click
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/tasklist";
  clients.openWindow(targetUrl + "?refresh=true");

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (let client of clientList) {
          if (client.url.includes("/") && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(targetUrl);
      })
  );
});
