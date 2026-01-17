"use client";
import { useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      onUpload(data.url);
    } else {
      alert("Upload failed");
    }

    setLoading(false);
  }

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFile} 
        style={{ color: '#ffffff' }} 
      />
      {loading && <p>Uploading...</p>}
    </div>
  );
}
