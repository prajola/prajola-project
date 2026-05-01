import { useEffect, useRef } from "react";

import DemoSnippet from "./components/ui/demo";
import { MapPin } from "lucide-react";
import "../style.css";

function App() {
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll(
      ".reveal-text, .reveal-up, .reveal-scale"
    );

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    // Mouse Tracking for Venture Cards Glow Effect
    const cards = document.querySelectorAll<HTMLElement>(".venture-card");

    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glow = card.querySelector<HTMLElement>(".card-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15) 0%, transparent 60%)`;
      }
    };

    const handleMouseLeave = (card: HTMLElement) => {
      const glow = card.querySelector<HTMLElement>(".card-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`;
      }
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
      card.addEventListener("mouseleave", () => handleMouseLeave(card));
    });

    // Navbar Background on Scroll
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.style.background = "rgba(5, 5, 8, 0.9)";
          navbarRef.current.style.borderBottom =
            "1px solid rgba(255, 255, 255, 0.1)";
        } else {
          navbarRef.current.style.background = "rgba(5, 5, 8, 0.7)";
          navbarRef.current.style.borderBottom =
            "1px solid rgba(255, 255, 255, 0.08)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      // Event listeners for cards are tricky to remove without storing the bound functions,
      // but since they don't re-render often in this static portfolio, it's acceptable.
    };
  }, []);

  return (
    <>
      {/* Integrating the provided React background components */}
      {/* BackgroundSnippet is commented out because DemoSnippet has z-[-2] and is fully opaque, 
          so you wouldn't see BackgroundSnippet beneath it anyway. 
          If you want to use the white grid background instead, uncomment BackgroundSnippet and comment out DemoSnippet. */}
      {/* <BackgroundSnippet /> */}
      <DemoSnippet />

      {/* Dynamic Background from original HTML */}
      <div className="bg-mesh">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar" ref={navbarRef}>
        <div className="nav-brand">PA.</div>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#ventures">Ventures</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge reveal-text flex items-center gap-2">
            <MapPin size={16} />
            Belfast, Northern Ireland
          </div>
          <h1 className="hero-title reveal-text delay-1">
            Prajol
            <br />
            <span className="gradient-text">Annamudu</span>
          </h1>
          <p className="hero-subtitle reveal-text delay-2">
            Tech Innovator &bull; Product Leader &bull; Entrepreneur
          </p>
          <p className="hero-description reveal-text delay-3">
            Building the AI-Native Observability Stack for Cloud-Scale Enterprises.
          </p>
          <div className="hero-actions reveal-text delay-4">
            <a href="#ventures" className="btn btn-primary">
              View Ventures
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="hero-visual reveal-scale delay-5">
          <div className="profile-container">
            <img
              src="/Assets/profile.jpeg"
              alt="Prajol Annamudu"
              className="profile-img"
            />
            <div className="profile-glow"></div>
          </div>
        </div>
      </header>

      {/* Ventures Section */}
      <section className="ventures-section" id="ventures">
        <div className="section-header reveal-up">
          <h2 className="section-title">Leadership & Ventures</h2>
          <div className="section-line"></div>
        </div>

        <div className="ventures-grid">
          {/* KubēGraf & Orkastor */}
          <div className="venture-card featured reveal-up delay-1">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="venture-role">Co-Founder & CPO</div>
              <h3 className="venture-name">KubēGraf @ Orkastor</h3>
              <p className="venture-desc">
                Building the AI-native observability stack. An AI-driven
                platform enabling localized detection, diagnosis, and faster
                resolution of Kubernetes infrastructure incidents.
              </p>
            </div>
            {/* Added Unsplash placeholder for context as requested */}
            <img
              src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop"
              alt="Cloud Infrastructure"
              className="w-full h-32 object-cover mt-4 rounded-md opacity-80"
            />
          </div>

          {/* LAIPORD */}
          <div className="venture-card reveal-up delay-2">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="venture-role">Founder & CEO</div>
              <h3 className="venture-name">LAIPORD</h3>
              <p className="venture-desc">
                An autonomous AI sales engine transforming how modern businesses
                approach lead generation and conversion.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="AI Engine"
              className="w-full h-32 object-cover mt-4 rounded-md opacity-80"
            />
          </div>

          {/* Pragenx AI */}
          <div className="venture-card reveal-up delay-3">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="venture-role">Founder & CEO</div>
              <h3 className="venture-name">Pragenx AI</h3>
              <p className="venture-desc">
                Pioneering next-generation artificial intelligence solutions for
                enterprise applications.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop"
              alt="AI Core"
              className="w-full h-32 object-cover mt-4 rounded-md opacity-80"
            />
          </div>

          {/* Prafounds Ventures */}
          <div className="venture-card reveal-up delay-5">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="venture-role">Director & Co-founder</div>
              <h3 className="venture-name">Prafounds Ventures</h3>
              <p className="venture-desc">
                Strategic venture initiatives focusing on accelerating
                high-impact technology and AI startups.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
              alt="Venture Capital"
              className="w-full h-32 object-cover mt-4 rounded-md opacity-80"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-container reveal-up bg-white/10 backdrop-blur-md rounded-xl p-8 relative overflow-hidden">
          {/* Unsplash Background for About Section */}
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
            alt="Office Setup"
            className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
          />
          <div className="relative z-10">
            <h2 className="section-title">Vision & Focus</h2>
            <p className="about-text">
              Based in the Belfast Metropolitan Area, I am dedicated to driving
              AI-powered solutions that transform how enterprises manage
              cloud-native infrastructure. As a tech innovator and product
              leader, my primary focus is on accelerating incident detection and
              resolution for cloud-scale environments through advanced AI and SRE
              practices.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <h2 className="footer-title">Let's Connect</h2>
          <p className="footer-subtitle">
            Always open to discussing AI, DevOps, and new tech ventures.
          </p>
          <div className="footer-links">
            <a
              href="https://www.linkedin.com/in/prajol-annamudu/"
              target="_blank"
              rel="noreferrer"
              className="social-link btn"
            >
              LinkedIn Profile
            </a>
          </div>
          <p className="copyright">
            &copy; 2026 Prajol Annamudu. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
