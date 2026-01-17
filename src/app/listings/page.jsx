"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LandCard from "@/components/LandCard";
import LandModal from "@/components/LandModal";
import styles from "@/styles/Listings.module.css";
import { AnimatePresence } from "framer-motion";

export default function ListingsPage() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(() => {
    async function fetchLands() {
      try {
        const res = await fetch("/api/lands");
        const data = await res.json();
        if (data.success) {
          setLands(data.lands);
        }
      } catch (error) {
        console.error("Failed to fetch lands", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLands();
  }, []);

  return (
    <>
      <Navbar /> {/* Reuse Navbar */}
      <main className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.heading}>Të Gjitha Pronat</h1>
            <p className={styles.subheading}>Shfletoni portofolin tonë të plotë të tokave dhe pronave.</p>
          </div>

          {loading ? (
             <div style={{textAlign: 'center', fontSize: '1.2rem', color: '#666'}}>Duke ngarkuar pronat...</div>
          ) : (
            <div className={styles.grid}>
              {lands.map((land) => (
                <div key={land._id} onClick={() => setSelectedLand(land)} style={{ cursor: "pointer" }}>
                  <LandCard land={land} />
                </div>
              ))}
              {lands.length === 0 && (
                <div style={{textAlign: 'center', gridColumn: '1/-1', padding: '2rem'}}>
                    <p>Nuk u gjetën prova për momentin.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedLand && (
          <LandModal land={selectedLand} onClose={() => setSelectedLand(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
