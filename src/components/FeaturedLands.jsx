"use client";

import { useEffect, useState } from "react";
import LandCard from "./LandCard";
import LandModal from "./LandModal";
import styles from "../styles/FeaturedLands.module.css";
import { AnimatePresence } from "framer-motion";

export default function FeaturedLands() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(() => {
    async function fetchLands() {
      try {
        const res = await fetch("/api/lands");
        const data = await res.json();
        if (data.success) {
          // Show only the 3 newest lands (API returns sorted by createdAt desc)
          setLands(data.lands.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch lands", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLands();
  }, []);

  if (loading) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.heading}>Loading properties...</div>
            </div>
        </section>
    );
  }

  return (
    <>
      <section className={styles.section} id="listings">
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.heading}>Pronat e Fundit</h2>
            <p className={styles.subheading}>Eksploroni tokat dhe pronat më të fundit të zgjedhura për ju.</p>
          </div>

          <div className={styles.grid}>
            {lands.map((land) => (
              <div key={land._id} onClick={() => setSelectedLand(land)} style={{ cursor: "pointer" }}>
                <LandCard land={land} />
              </div>
            ))}
            {lands.length === 0 && (
              <p>No properties found at the moment.</p>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedLand && (
          <LandModal land={selectedLand} onClose={() => setSelectedLand(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
