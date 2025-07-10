import React from "react";
import n1 from "../../images/chiamistakes/n1.jpg";
import n2 from "../../images/chiamistakes/n2.avif";
import n3 from "../../images/chiamistakes/n3.jpg";
import n4 from "../../images/chiamistakes/n4.avif";
import n5 from "../../images/chiamistakes/n5.jpeg";

// --- Color Palette ---
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  textLight: "#ffffff",
};

// --- Styles for the New UI ---
const styles = {
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  titleWrapper: {
    textAlign: "center",
    marginBottom: "60px",
  },
  title: {
    color: colors.textDark,
    fontWeight: 800,
    fontSize: "40px",
    marginBottom: "16px",
  },
  paragraph: {
    color: colors.textMuted,
    fontSize: "20px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  itemRow: {
    padding: "30px",
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  // --- YAHAN BADLAV KIYE GAYE HAIN ---
  imageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // 1. Container jo image ko circular banayega
  circularImageContainer: {
    width: "200px", // Circle ka size badhaya gaya hai
    height: "200px",
    borderRadius: "50%",
    overflow: "hidden", // Yeh zaroori hai taaki image bahar na nikle
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
    border: `5px solid ${colors.textLight}`, // Optional: white border
  },
  // 2. Image ko container ko poori tarah cover karne ke liye style
  circularImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Yeh image ko stretch kiye bina circle ko fill karega
  },
  // --- (Baaki styles wahi hain) ---
  textContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  itemTitle: {
    color: colors.textDark,
    fontWeight: 700,
    fontSize: "26px",
    marginBottom: "15px",
    textAlign: "left",
  },
  itemDesc: {
    color: colors.textMuted,
    fontSize: "17px",
    textAlign: "left",
    lineHeight: "1.7",
  },
};

const ChiaMistakes = () => {
  const tips = [
    {
      img: n1,
      title: "Don’t Eat Them Dry",
      desc: "Dry chia seeds can swell in your throat and cause discomfort. Always soak them in liquid for at least 10-15 minutes before eating.",
    },
    {
      img: n2,
      title: "Don’t Overeat at Once",
      desc: "Due to their high fiber content, eating too much at once can cause bloating or gas. Start with 1-2 tablespoons per day.",
    },
    {
      img: n3,
      title: "Don’t Skip Water",
      desc: "Chia seeds absorb a lot of liquid. If you eat them, be sure to drink plenty of water throughout the day to stay hydrated.",
    },
    {
      img: n4,
      title: "Don’t Replace Meals",
      desc: "While nutritious, chia seeds are not a complete meal replacement. Use them to enhance your meals, not to replace them entirely.",
    },
    {
      img: n5,
      title: "Don’t Cook at High Heat",
      desc: "Exposing chia seeds to very high temperatures can damage their delicate omega-3 fatty acids. Add them to dishes after cooking or in low-heat recipes.",
    },
  ];

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.titleWrapper}>
          <h2 style={styles.title}>Using Chia Seeds the Right Way</h2>
          <p style={styles.paragraph}>
            To get the most out of these super seeds, it's important to use them
            correctly. Here are a few common mistakes to avoid for a healthy
            experience.
          </p>
        </div>

        <div>
          {tips.map((tip, idx) => (
            <div className="row align-items-center mb-5" key={idx}>
              <div className="col-12">
                <div className="row align-items-center" style={styles.itemRow}>
                  <div
                    className={`col-md-4 ${idx % 2 !== 0 ? "order-md-2" : ""}`}
                    style={styles.imageWrapper}
                  >
                    {/* --- YAHAN BHI BADLAV KIYA GAYA HAI --- */}
                    {/* Ab ek naya circular container hai */}
                    <div style={styles.circularImageContainer}>
                      <img
                        src={tip.img}
                        alt={tip.title}
                        style={styles.circularImage}
                      />
                    </div>
                  </div>

                  <div className="col-md-8" style={styles.textContent}>
                    <h3 style={styles.itemTitle}>{tip.title}</h3>
                    <p style={styles.itemDesc}>{tip.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChiaMistakes;
