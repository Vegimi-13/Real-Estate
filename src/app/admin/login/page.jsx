"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  console.log("Submitting login with:", { email, password });

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  console.log("Response status:", res.status);
  const data = await res.json();
  console.log("Response data:", data);

  if (res.ok) {
    console.log("Redirecting to /admin...");
    window.location.href = "/admin";
  } else {
    console.log("Login failed");
    setError(data.message || "Invalid credentials");
  }
}


  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: 320, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <h1>Admin Login</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
