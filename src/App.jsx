import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import { reload } from "firebase/auth";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const fcmToken = await getToken(messaging, {
            vapidKey:
              "BKHiOsWONhBq5fJwpDVWB0ikAouaf_kb7c-7x380slicfXOIfhg-iv2YM398g4fZ4kuy_7xkyLzmqHjuOOf59EA",
          });
          localStorage.setItem("FCMTokenKey", fcmToken);
          setToken(fcmToken);
        }
      } catch (error) {
        console.error("Notification error:", error);
      }
    };

    requestNotificationPermission();

    // onMessage(messaging, async (payload) => {
    //   const registration = await navigator.serviceWorker.getRegistration();

    //   window.location.reload();
    //   if (registration) {
    //     registration.showNotification(payload.data.title, {
    //       body: payload.data.body,
    //       icon: payload.data.icon,
    //       data: payload.data,
    //       vibrate: [100, 50, 100],
    //       requireInteraction: false,
    //     });
    //   } else {
    //     toast(payload.data.title + ": " + payload.data.body); // fallback
    //   }
    // });

    onMessage(messaging, async (payload) => {
      window.dispatchEvent(new Event("refresh-task-list")); // 🔁 Custom event

      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.showNotification(payload.data.title, {
          body: payload.data.body,
          icon: payload.data.icon,
          data: payload.data,
          vibrate: [100, 50, 100],
          requireInteraction: false,
        });
      } else {
        toast(payload.data.title + ": " + payload.data.body);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("access_token") ? (
              <Navigate to="/tasklist" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/tasklist"
          element={
            <ProtectedRoute>
              <Home firebase={token} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
