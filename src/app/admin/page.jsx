"use client"
import styles from "@/styles/Admin.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/UploadWidget";
import Link from "next/link";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("list"); // 'list' or 'add'
  const [form, setForm] = useState({
    title: "",
    location: "",
    size: "",
    sizeUnit: "m²",
    propertyType: "Toke",
    price: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); 
  const [lands, setLands] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchLands();
  }, []);

  async function fetchLands() {
    try {
      const res = await fetch("/api/lands");
      const data = await res.json();
      if (data.success) {
        setLands(data.lands);
      }
    } catch (err) {
      console.error("Failed to fetch lands", err);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  async function handleDelete(id) {
    if (!confirm("A jeni i sigurt që doni ta fshini këtë pronë?")) return;

    try {
      const res = await fetch(`/api/lands/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchLands(); 
      } else {
        alert(data.error || "Dështoi fshirja e pronës");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMsgType("");

    const res = await fetch("/api/lands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Prona u shtua me sukses");
      setMsgType("success");
      setForm({
        title: "",
        location: "",
        size: "",
        sizeUnit: "m²",
        propertyType: "Toke",
        price: "",
        description: "",
      });
      setImages([]);
      fetchLands();
      
      // Optional: switch to list view after adding?
      // setActiveTab("list"); 
    } else {
      setMessage(data.message || "Something went wrong ❌");
      setMsgType("error");
    }

    setLoading(false);
  }

  return (
    <div className={styles.dashboard}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>EH Admin</div>
        
        <nav className={styles.navItems}>
          <button 
            className={`${styles.navItem} ${activeTab === 'list' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Lista e Pronave
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'add' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('add')}
          >
            ➕ Shto Pronë
          </button>
           <Link href="/" className={styles.navItem} style={{ marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
             🏠 Kthehu në Home
           </Link>
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Dalje (Log Out)
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        
        {activeTab === 'list' && (
          <div>
            <div className={styles.header}>
              <h1 className={styles.heading}>Menaxho Pronat</h1>
              <p className={styles.subheading}>Shiko dhe menaxho të gjitha listimet.</p>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Titulli</th>
                    <th>Lloji</th>
                    <th>Lokacioni</th>
                    <th>Cmimi</th>
                    <th>Sipërfaqja</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {lands.map((land) => (
                    <tr key={land._id}>
                      <td style={{ fontWeight: 600 }}>{land.title}</td>
                      <td>{land.propertyType || land.type}</td>
                      <td>{land.location}</td>
                      <td style={{ fontWeight: 700 }}>{land.price} €</td>
                      <td>{land.size} {land.sizeUnit}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(land._id)}
                          className={styles.deleteBtn}
                        >
                          Fshij
                        </button>
                      </td>
                    </tr>
                  ))}
                  {lands.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                        Nuk u gjetën prona.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div>
            <div className={styles.header}>
              <h1 className={styles.heading}>Shto Pronë të Re</h1>
              <p className={styles.subheading}>Plotëso formën për të shtuar një listim të ri.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Titulli</label>
                <input
                  name="title"
                  placeholder="Sh. Toka ne Brezovice"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Lloji i Pronës</label>
                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className={styles.input}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Toke">Tokë</option>
                    <option value="Shtepi">Shtëpi</option>
                    <option value="Banese">Banesë</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Lokacioni</label>
                  <input
                    name="location"
                    placeholder="Prishtine, Dragodan"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '15px' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Siperfaqja</label>
                  <input
                    name="size"
                    type="number"
                    placeholder="e.g. 500"
                    value={form.size}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Njësia</label>
                  <select
                    name="sizeUnit"
                    value={form.sizeUnit}
                    onChange={handleChange}
                    className={styles.input}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="m²">m²</option>
                    <option value="ari">Ari</option>
                    <option value="hektare">Hektarë</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Cmimi (€)</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="e.g. 120000"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Pershkrimi</label>
                <textarea
                  name="description"
                  placeholder="Detaje rreth prones..."
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                />
              </div>

              <div className={styles.uploadSection}>
                <label className={styles.label} style={{ marginBottom: '1rem', display: 'block' }}>Fotografi</label>
                <ImageUpload onUpload={(url) => setImages((prev) => [...prev, url])} />

                <div className={styles.previewContainer}>
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className={styles.previewImage}
                      alt="Preview"
                    />
                  ))}
                </div>
              </div>

              <button disabled={loading} className={styles.submitBtn}>
                {loading ? "Duke ruajtur..." : "SHTO PRONEN"}
              </button>

              {message && (
                <div className={`${styles.message} ${msgType === 'success' ? styles.success : styles.error}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
