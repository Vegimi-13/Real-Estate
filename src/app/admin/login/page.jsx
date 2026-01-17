"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "@/styles/Login.module.css";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "/admin";
  } else {
    setError(data.message || "Invalid credentials");
  }
}

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>
      <div className={styles.card}>
        <h1 className={styles.title}>EH Admin</h1>
        <p className={styles.subtitle}>Sign in to manage your properties</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
