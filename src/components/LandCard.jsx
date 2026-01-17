"use client";

import { useState } from "react";
import styles from "../styles/LandCard.module.css";
import { motion } from "framer-motion";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function LandCard({ land }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!land) return null;

  const images = land.images || [];
  const hasMultipleImages = images.length > 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const imageUrl = images.length > 0 ? images[currentImageIndex] : null;

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={land.title} className={styles.image} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No Image</div>
        )}

        {hasMultipleImages && (
          <>
            <button className={`${styles.arrowButton} ${styles.prevButton}`} onClick={handlePrev}>
              &#8249;
            </button>
            <button className={`${styles.arrowButton} ${styles.nextButton}`} onClick={handleNext}>
              &#8250;
            </button>
          </>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{land.title}</h3>
        
        <div className={styles.infoRow}>
          <span className={styles.infoItem}>
            Lokacioni: {land.location}
          </span>
          <span className={styles.infoItem}>
            Cmimi: {land.price} €
          </span>
        </div>
        
        <div className={styles.sizeRow}>
          Sipërfaqja: {land.size} {land.sizeUnit || 'm²'}
        </div>

        <div className={styles.details}>
          <span style={{ fontWeight: 800, color: '#000' }}>+383 44 123 456</span>
          <a href={`https://wa.me/38344123456?text=Pershendetje, jam i interesuar per ${land.title}`} 
             target="_blank" 
             className={styles.whatsappBtn}
             onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
