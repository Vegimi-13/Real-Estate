"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.heroContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>
          Gjeni Pronën Tuaj <br /> Ideale
        </h1>
        <p className={styles.subtitle}>
          Zbuloni toka dhe prona premium me të dhëna të verifikuara.
          Investoni në të ardhmen tuaj sot me ofertat tona ekskluzive.
        </p>
        
        <Link href="/listings" className={styles.primaryBtn}>
          Shiko Listimet
        </Link>
      </motion.div>
    </section>
  );
}
