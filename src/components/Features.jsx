"use client";

import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Besimi",
      desc: "Ne jemi partneri juaj i besuar. Çdo pronë verifikohet me kujdes për të siguruar transparencë të plotë.",
      icon: "🤝",
    },
    {
      title: "Shpejtësia",
      desc: "Procesi ynë është i optimizuar për t'ju kursyer kohë. Gjeni pronën tuaj të ëndrrave në pak minuta.",
      icon: "⚡",
    },
    {
      title: "Cilësia",
      desc: "Ofrojmë vetëm pronat më ekskluzive dhe me potencialin më të lartë në tregun e Kosovës.",
      icon: "💎",
    },
  ];

  return (
    <section style={{ padding: "6rem 2rem", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#000", marginBottom: "1rem" }}>
            Pse të na zgjidhni ne?
          </h2>
          <p style={{ color: "#666", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Ne ofrojmë standardin më të lartë të shërbimit në tregun e patundshmërive, duke ju lidhur me mundësitë më të mira.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                border: "1px solid #f3f4f6",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>{feature.icon}</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem", color: "#000" }}>{feature.title}</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
