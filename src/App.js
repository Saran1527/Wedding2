import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import {
  FaHeart,
  FaGlassCheers,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const scrollToSection = (index) => {
      if (index < sections.length) {
        sections[index].scrollIntoView({ behavior: "smooth" });
        if (index < sections.length - 1) {
          setTimeout(() => scrollToSection(index + 1), 8000);
        }
      }
    };
    const scrollTimer = setTimeout(() => scrollToSection(0), 1000);
    return () => clearTimeout(scrollTimer);
  }, []);

  // Date & Countdown
  const weddingDate = useMemo(() => new Date("2026-04-06T07:30:00"), []);
  const getTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) return {};
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [weddingDate]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [getTimeLeft]);

  // Scroll Reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Floating Snowflakes
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        size: 16 + Math.random() * 14,
      })),
    []
  );


  // Snowflakes Effect
  useEffect(() => {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      const size = Math.random() * 6 + 4;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.top = `-10px`;
      snowflake.style.backgroundColor = `rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`;
      snowflake.style.borderRadius = '50%';
      const rotateDeg = Math.random() * 360;
      snowflake.style.transform = `rotate(${rotateDeg}deg)`;
      snowflake.style.animationDelay = `${Math.random() * 10}s`;
      snowflakesContainer.appendChild(snowflake);
      setTimeout(() => {
        if (snowflake.parentNode) {
          snowflake.parentNode.removeChild(snowflake);
        }
      }, 20000);
    };
    const interval = setInterval(createSnowflake, 200);
    return () => clearInterval(interval);
  }, []);

  // Twinkling Stars
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${1 + Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${1.5 + Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="App">
      {/* Sparkles & Particles */}
      <div className="sparkles"></div>
      <div className="snowflakes"></div>
      <div className="stars"></div>

      {/* Floating Snowflakes */}
      <div className="hearts">
        {snowflakes.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Welcome Section */}
      <section className="welcome">
        <h1 className="glow slide-in-left">
          <GiDiamondRing className="ring-icon" /> Krishnaraj Weds Surya {" "}
          <GiDiamondRing className="ring-icon" />
        </h1>
        <p className="intro slide-in-right delay-1">
          Join us as we celebrate the marriage of <br />
          <strong>Krishnaraj & Surya</strong>
        </p>
        <p className="slide-in-left delay-2">
          💒 <FaHeart /> Marriage Ceremony 💒 <br />
          <strong>06 April 2026 • 6:00 AM – 7:30 AM</strong>
        </p>
        <p className="slide-in-right delay-3">
          🎉 <FaGlassCheers /> Wedding Reception 🎉 <br />
          <strong>06 April 2026 • 7:00 PM</strong>
        </p>
        <p className="tagline slide-in-left delay-4">
          ❤️ Make the moment special with us ❤️
        </p>
      </section>

      {/* Countdown */}
      <section className="countdown reveal">
        <h2 className="animate-heading">⏳ Countdown to Our Big Day</h2>
        {timeLeft.days !== undefined ? (
          <div className="timer">
            <div>
              <span>{timeLeft.days}</span>Days
            </div>
            <div>
              <span>{timeLeft.hours}</span>Hours
            </div>
            <div>
              <span>{timeLeft.minutes}</span>Minutes
            </div>
            <div>
              <span>{timeLeft.seconds}</span>Seconds
            </div>
          </div>
        ) : (
          <p>🎉 It's our wedding day! 🎉</p>
        )}
      </section>


      {/* Couple Section */}
      <section className="couple reveal">
        <div className="right">
          <h4>
            Krishnaraj ❤️ Surya
          </h4>
          <p>
            Two souls, one heart. Join us as we begin this beautiful journey
            together, surrounded by love, laughter, and blessings from our families
            and friends.
          </p>
        </div>
      </section>

      {/* Parents Section */}
      <section className="parents reveal">
        <h2 className="animate-heading">Family Details</h2>
        <div className="parents-container">
          <div className="parent-group" style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "40px" }}>

              {/* Groom's Detail */}
              <div style={{ flex: "1 1 300px", textAlign: "center" }}>
                <h3 style={{ color: "var(--accent-color)", borderBottom: "2px dashed var(--primary-color)", paddingBottom: "10px", marginBottom: "20px" }}>Groom's Family</h3>
                <p style={{ margin: "5px 0", fontSize: "1.1rem", color: "var(--text-color)" }}><strong>Mr.V. Ravichandran Naidu<br />&<br />Mrs. Thangam</strong></p>
                <p style={{ margin: "25px 0 5px 0", fontSize: "0.95rem", fontStyle: "italic", color: "var(--text-light)" }}>Proud parents of the Groom</p>
                <h4 style={{ color: "var(--primary-color)", fontSize: "1.4rem", fontWeight: "bold", margin: "10px 0", fontFamily: "var(--font-heading)" }}>R. Krishnaraj (a) Mukesh<br /><span style={{ fontSize: "1rem" }}>B.Tech., (EEE)</span></h4>
                <p style={{ margin: "5px 0", fontSize: "0.85rem", color: "var(--text-light)" }}>(Caterpillar India Pvt Limited., Thiruvallur)</p>
              </div>

              {/* Bride's Detail */}
              <div style={{ flex: "1 1 300px", textAlign: "center" }}>
                <h3 style={{ color: "var(--accent-color)", borderBottom: "2px dashed var(--primary-color)", paddingBottom: "10px", marginBottom: "20px" }}>Bride's Family</h3>
                <p style={{ margin: "5px 0", fontSize: "1.1rem", color: "var(--text-color)" }}><strong>Mr.B. Natarajan Naidu<br />&<br />Mrs. Selvi</strong></p>
                <p style={{ margin: "25px 0 5px 0", fontSize: "0.95rem", fontStyle: "italic", color: "var(--text-light)" }}>Proud parents of the Bride</p>
                <h4 style={{ color: "var(--primary-color)", fontSize: "1.4rem", fontWeight: "bold", margin: "10px 0", fontFamily: "var(--font-heading)" }}>N. Surya (a) Leelavathi<br /><span style={{ fontSize: "1rem" }}>B.Sc., Nursing</span></h4>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* Gallery */}

      <section className="venue reveal">
        <div className="left">
          <h2 className="animate-heading">
            <FaMapMarkerAlt /> Wedding Venues
          </h2>

          <div className="venue-details">

            {/* Marriage */}
            <div className="venue-item">
              <h3>💒 Marriage Ceremony</h3>
              <p><strong>Sri Mahakaleshwarar Thirukovil</strong></p>
              <p>Irumbai, T.C. Koot Road, Villupuram District</p>
              <p>📅 06 April 2026 • 🕕 6:00 AM - 7:30 AM</p>

              <button
                className="direction-btn"
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=Sri+Mahakaleshwarar+Thirukovil+Irumbai",
                    "_blank"
                  )
                }
              >
                📍 Get Directions
              </button>
            </div>

            {/* Reception */}
            <div className="venue-item">
              <h3>🎉 Reception</h3>
              <p><strong>JVM Mahal</strong></p>
              <p>Sedarapet Main Road, Pondicherry</p>
              <p>📅 06 April 2026 • 🕖 7:00 PM onwards</p>

              <button
                className="direction-btn"
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=JVM+Mahal+Pondicherry",
                    "_blank"
                  )
                }
              >
                📍 Get Directions
              </button>
            </div>

          </div>
        </div>
      </section>
      <section className="thank-you-section reveal">
        <div className="thank-you-snowflakes">
          <span className="thank-you-snowflake">❤️</span>
          <span className="thank-you-snowflake">❤️</span>
        </div>
        <div className="thank-you-content">
          <h3>Thank You for Being Part of Our Special Day</h3>
          <p>Your presence is the greatest gift we could ask for</p>
          <div className="thank-you-icons">
            <FaHeart className="thank-you-icon" />
            <GiDiamondRing className="thank-you-icon" />
            <FaHeart className="thank-you-icon" />
          </div>
          <p className="thank-you-note">With love, Krishnaraj & Surya</p>
        </div>
      </section>

      {/* Actual Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              For inquiries or to create a website like this, contact:
            </p>
            <p className="footer-contact">
              <a href="tel:+917010145439">WhatsApp: +91 7010145439</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
