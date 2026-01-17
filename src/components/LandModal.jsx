import { useEffect, useState } from "react";
import styles from "../styles/LandModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function LandModal({ land, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
    <div className={styles.overlay} onClick={onClose}>
      <motion.div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.contentContainer}>
            <div className={styles.imageContainer}>
                {imageUrl && (
                    <img src={imageUrl} alt={land.title} className={styles.image} />
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

          <div className={styles.details}>
            <h2 className={styles.title}>{land.title}</h2>
            <p className={styles.location}>📍 {land.location}</p>

            <div className={styles.grid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Sipërfaqja</span>
                <span className={styles.value}>{land.size} {land.sizeUnit || 'm²'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Lloji</span>
                <span className={styles.value}>{land.propertyType || 'Toke'}</span>
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Përshkrimi</span>
                <p className={styles.description}>
                  {land.description || "Nuk ka përshkrim për këtë pronë."}
                </p>
              </div>
              
              <div className={styles.infoItem}>
                 <span className={styles.label}>Cmimi</span>
                 <span className={styles.value} style={{ fontSize: '1.5rem', fontWeight: 800 }}>{land.price} €</span>
              </div>
            </div>

            <div className={styles.actions}>
              <a href={`https://wa.me/38344123456?text=Pershendetje, jam i interesuar per ${land.title}`} 
                 target="_blank" 
                 className={styles.whatsappBtn}
              >
                <WhatsAppIcon size={24} /> Kontaktoni në WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
