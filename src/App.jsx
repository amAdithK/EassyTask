import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer, toast } from "react-toastify";
import { updateFcmToken } from "./services/fcmTokenService";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const fcmToken = await getToken(messaging, {
            vapidKey:
              "BAfTzASb_Sh02ThHsRKnoTynEHf5hSntVeK6LIZeT8se0TWy5FsuELzO6gdAFNZyabo1GPN1ltXo9GZq36fVUs4",
          });
          console.log("FCM Token:", fcmToken);
          await updateFcmToken(fcmToken);
          setToken(fcmToken);
        }
      } catch (error) {
        console.error("Notification error:", error);
      }
    };

    requestNotificationPermission();

    onMessage(messaging, (payload) => {
      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
        });
      } else {
        toast(payload.notification.title + ": " + payload.notification.body); // Fallback with toast
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasklist" element={<Home firebase={token} />} />
      </Routes>
    </BrowserRouter>
  );
}
