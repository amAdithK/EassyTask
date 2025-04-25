// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";

// Request notification permission
const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BAfTzASb_Sh02ThHsRKnoTynEHf5hSntVeK6LIZeT8se0TWy5FsuELzO6gdAFNZyabo1GPN1ltXo9GZq36fVUs4",
      });
      console.log("FCM Token:", token);
      // TODO: Save token to Firestore/user profile
    }
  } catch (error) {
    console.error("Notification error:", error);
  }
};

export default function App() {
  useEffect(() => {
    requestNotificationPermission();

    // Listen for incoming messages
    onMessage(messaging, (payload) => {
      console.log(payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasklist" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
