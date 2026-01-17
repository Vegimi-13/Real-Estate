"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <footer style={{ backgroundColor: "#000", color: "#fff", padding: "4rem 2rem", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
        
        {/* Brand */}
        <div>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "1rem" }}>EH</h2>
          <p style={{ color: "#888", lineHeight: "1.6" }}>
            Platforma juaj e besuar për gjetjen e tokave dhe pronave më të mira në treg.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1.5rem" }}>Linqe të Shpejta</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="/" style={{ color: "#fff", textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }} className="hover:opacity-100">
              Home
            </Link>
            <Link href="/listings" style={{ color: "#fff", textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }} className="hover:opacity-100">
              Listimet
            </Link>
            <Link href="/admin" style={{ color: "#fff", textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }} className="hover:opacity-100">
              Admin Login
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1.5rem" }}>Kontakt</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a href="https://wa.me/38344123456" target="_blank" style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff", textDecoration: "none" }}>
               <WhatsAppIcon size={20} /> +383 44 123 456
            </a>
            <p style={{ color: "#888" }}>info@eh-realestate.com</p>
            <p style={{ color: "#888" }}>Prishtinë, Kosovë</p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #333", marginTop: "4rem", paddingTop: "2rem", textAlign: "center", color: "#666" }}>
        <p>&copy; {new Date().getFullYear()} EH Real Estate. Të gjitha drejtat e rezervuara.</p>
      </div>
    </footer>
  );
}
