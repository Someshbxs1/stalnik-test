// Firebase SDK (Modular Import)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA0moN52cChxYY89nIWB6atsPXV35V7u_E",
  authDomain: "stalnet-test-01.firebaseapp.com",
  projectId: "stalnet-test-01",
  storageBucket: "stalnet-test-01.firebasestorage.app",
  messagingSenderId: "194702494584",
  appId: "1:194702494584:web:80eb2143a4003965aa968d"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const msgDiv = document.getElementById("messages");

// Send Message
sendBtn.addEventListener("click", async () => {
  const text = msgInput.value.trim();
  if (text) {
    await addDoc(collection(db, "messages"), {
      text,
      sender: "admin1",
      timestamp: serverTimestamp()
    });
    msgInput.value = '';
  }
});

// Display Messages in Real-Time
const q = query(collection(db, "messages"), orderBy("timestamp"));
onSnapshot(q, (snapshot) => {
  msgDiv.innerHTML = '';
  snapshot.forEach((doc) => {
    const msg = doc.data();
    msgDiv.innerHTML += `<p><strong>${msg.sender}:</strong> ${msg.text}</p>`;
  });
});
