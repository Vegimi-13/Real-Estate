"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isAdmin) return null;

  return (
    <motion.nav
      className={`${styles.nav} ${!isHome ? styles.adminNav : ""}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.logo}>EH</div>

      {/* Desktop Links */}
      <div className={styles.links}>
        <Link className={styles.item} href="/">Home</Link>
        <Link className={styles.item} href="/listings">Listimet</Link>
        
        {!isAdmin && (
          <Link className={styles.contact} href="https://wa.me/38344123456" target="_blank">
            <WhatsAppIcon size={20} /> WhatsApp
          </Link>
        )}
      </div>

      {/* Hamburger Icon */}
      <button 
        className={styles.hamburger}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={mobileMenuOpen ? styles.open : ""}></span>
        <span className={mobileMenuOpen ? styles.open : ""}></span>
        <span className={mobileMenuOpen ? styles.open : ""}></span>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Link 
              className={styles.mobileItem} 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              className={styles.mobileItem} 
              href="/listings"
              onClick={() => setMobileMenuOpen(false)}
            >
              Listimet
            </Link>
            <Link 
              className={styles.mobileContact} 
              href="https://wa.me/38344123456" 
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
            >
              <WhatsAppIcon size={20} /> WhatsApp
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
