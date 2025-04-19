import React, { useState, useEffect, useRef } from "react";
import "./stylee.css"; // Make sure this CSS file exists in your src/ folder

const places = [
  {
    href: "ooty.html",
    img: "images/ooty.png",
    alt: "Ooty",
    name: "Ooty",
  },
  {
    href: "chennai.html",
    img: "images/Chennai.jpg",
    alt: "Chennai",
    name: "Chennai",
  },
  {
    href: "kanyakumari.html",
    img: "images/Kanyakumari.jpg",
    alt: "Kanniyakumari",
    name: "Kanniyakumari",
  },
  {
    href: "madurai.html",
    img: "images/madurai2.webp",
    alt: "Madurai",
    name: "Madurai",
  },
  {
    href: "rameshawaram.html",
    img: "images/rameshwaram3.jpg",
    alt: "Rameshwaram",
    name: "Rameshwaram",
  },
  {
    href: "coimbatore.html",
    img: "images/coimbatore-tamil-nadu.jpg",
    alt: "Coimbatore",
    name: "Coimbatore",
  },
];

const Home = () => {
  // Carousel state
  const [slide, setSlide] = useState(0);
  const maxVisible = 3; // Number of visible cards at once

  // Typing effect state
  const [typedText, setTypedText] = useState("");
  const heroText = "Discover the Spirit of the South";

  // Scroll to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Header shadow state
  const [headerShadow, setHeaderShadow] = useState(false);

  // Refs for scroll reveal
  const revealRefs = useRef([]);
  revealRefs.current = [];

  // Add refs to elements for scroll reveal
  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Carousel logic
  const handlePrev = () => {
    setSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setSlide((prev) => Math.min(prev + 1, places.length - maxVisible));
  };

  const visiblePlaces = places.slice(slide, slide + maxVisible);

  // Smooth scroll for anchor links and Start Journey button
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  // Typing effect for hero section
  useEffect(() => {
    let idx = 0;
    setTypedText("");
    function type() {
      setTypedText((prev) => prev + heroText.charAt(idx));
      idx++;
      if (idx < heroText.length) {
        setTimeout(type, 60);
      }
    }
    type();
    // eslint-disable-next-line
  }, []);

  // Scroll to top button and header shadow
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 200);
      setHeaderShadow(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const revealOnScroll = () => {
      revealRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("show");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  // Image hover zoom for carousel cards
  useEffect(() => {
    const imgs = document.querySelectorAll(".carousel-card img");
    imgs.forEach((img) => {
      const handleMouseEnter = () => {
        img.style.transform = "scale(1.05)";
        img.style.transition = "transform 0.3s ease";
      };
      const handleMouseLeave = () => {
        img.style.transform = "scale(1)";
      };
      img.addEventListener("mouseenter", handleMouseEnter);
      img.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("mouseenter", () => {});
        img.removeEventListener("mouseleave", () => {});
      });
    };
  }, [slide]);

  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Start journey button scroll
  const handleStartJourney = (e) => {
    e.preventDefault();
    const target = document.getElementById("placesToVisit");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Header Section */}
      <header style={{ boxShadow: headerShadow ? "0 2px 6px rgba(0,0,0,0.1)" : "none" }}>
        <div className="container nav-container">
          <div className="logo">Tamil Nadu Tourism</div>
          <nav>
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li className="dropdown">
                <a href="#" className="dropbtn">Places to Visit</a>
                <div className="dropdown-content">
                  <a href="ooty.html">Ooty</a>
                  <a href="chennai.html">Chennai</a>
                  <a href="madurai.html">Madurai</a>
                  <a href="kanyakumari.html">Kanyakumari</a>
                  <a href="rameswaram.html">Rameswaram</a>
                  <a href="coimbatore.html">Coimbatore</a>
                </div>
              </li>
              <li className="dropdown">
                <a href="#" className="dropbtn">Experiences</a>
                <div className="dropdown-content">
                  <a href="adventure.html">Adventure</a>
                  <a href="spiritual.html">Spiritual</a>
                  <a href="medicaltourism.html">Medical</a>
                  <a href="eatdrink.html">Eat &amp; Drink</a>
                </div>
              </li>
              <li className="dropdown">
                <a href="#" className="dropbtn">Things-to-do</a>
                <div className="dropdown-content">
                  <a href="parasailing.html">Parasailing</a>
                  <a href="spiritual.html">Surfing</a>
                  <a href="hiking.html">Hiking</a>
                </div>
              </li>
              <li className="dropdown">
                <a href="#" className="dropbtn">Blogs</a>
                <div className="dropdown-content">
                  <a href="cuisine1.html">Cuisines of the Tamil Land</a>
                  <a href="cuisine2.html">Regional Cuisine of Tamil Nadu</a>
                  <a href="sweetsav.html">Sweet Savouries from Tamil Nilam</a>
                </div>
              </li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
          <div className="top-right">
            <div className="language-toggle">EN | TA</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" ref={addToRefs}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Explore Tamil Nadu</h1>
            <p>{typedText}</p>
            <a
              href="#placesToVisit"
              className="btn-explore"
              id="startJourneyBtn"
              onClick={handleStartJourney}
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro" ref={addToRefs}>
        <div className="intro-container">
          <h2>Welcome to Tamil Nadu!</h2>
          <p>
            A potpourri of vibrant cultures, exotic destinations and enduring memories; welcome to one of the heartlands of human civilization.
          </p>
          <p>
            <em>
              <strong>Tamil Nadu – where stories never end.</strong>
            </em>
          </p>
        </div>
      </section>

      {/* Places to Visit Section */}
      <section className="places-section" id="placesToVisit" ref={addToRefs}>
        <h2>Places to visit</h2>
        <p>
          Discover Tamil Nadu's unique destinations - from UNESCO World Heritage Sites to soothing beaches and hill stations.
        </p>
        <div className="carousel-wrapper">
          <button
            className="carousel-btn left"
            onClick={handlePrev}
            disabled={slide === 0}
            aria-label="Previous"
          >
            &#10094;
          </button>
          <div className="carousel-track" id="carouselTrack">
            {visiblePlaces.map((place, idx) => (
              <div className="carousel-card" key={place.name}>
                <a href={place.href}>
                  <img src={place.img} alt={place.alt} />
                  <div className="place-name">{place.name}</div>
                </a>
              </div>
            ))}
          </div>
          <button
            className="carousel-btn right"
            onClick={handleNext}
            disabled={slide >= places.length - maxVisible}
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="experiences-section" ref={addToRefs}>
        <h2>Experiences</h2>
        <p>
          If you're looking for some of the best travel experiences to explore in Tamil Nadu, you've arrived at the right spot!
        </p>
        <div className="experiences-container">
          <a href="adventure.html" className="experience-card">
            <img src="images/adventure.webp" alt="Adventure" />
            <div className="caption">Adventure</div>
          </a>
          <a href="eatdrink.html" className="experience-card">
            <img src="images/eatanddrink.jpeg" alt="Eat & Drink" />
            <div className="caption">Eat &amp; Drink</div>
          </a>
          <a href="spiritual.html" className="experience-card">
            <img src="images/spritual.jpeg" alt="Spiritual" />
            <div className="caption">Spiritual</div>
          </a>
          <a href="medicaltourism.html" className="experience-card">
            <img src="images/mediacltourism.jpg" alt="Medical Tourism" />
            <div className="caption">Medical Tourism</div>
          </a>
        </div>
      </section>

      {/* Things to Do Section */}
      <section className="things-to-do-section" ref={addToRefs}>
        <h2>Things to do</h2>
        <p>
          From paragliding to scuba diving, from taking heritage trails to watching
          cultural activities, there is plenty to do, learn and experience in Tamil Nadu.
          Know more about what this enchanting land has to offer you.
        </p>
        <div className="activities-container">
          <div className="activity-card">
            <img src="images/parasailing.webp" alt="Parasailing" />
            <h3>Parasailing</h3>
            <p>
              Soar like a bird and flit like a butterfly and cherish the ecstasy and fun of flying. Tamil Nadu offers some of the safest…
            </p>
            <a href="parasailing.html" className="read-more">
              Read More <span>&rarr;</span>
            </a>
          </div>
          <div className="activity-card">
            <img src="images/surfing.jpeg" alt="Surfing" />
            <h3>Surfing</h3>
            <p>
              Head to the sandy beaches of Tamil Nadu to ride on the rolling waves, to slice through the thundering breakers, to…
            </p>
            <a href="surfing.html" className="read-more">
              Read more <span>&rarr;</span>
            </a>
          </div>
          <div className="activity-card">
            <img src="images/hiking.avif" alt="Hiking" />
            <h3>Hiking</h3>
            <p>
              The hiking trails of Tamil Nadu always offer a warm welcome to anyone seeking such solace.
            </p>
            <a href="hiking.html" className="read-more">
              Read more <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blogs-section" ref={addToRefs}>
        <h2>Blogs</h2>
        <div className="blogs-container">
          <div className="blog-card">
            <img src="images/cuisines.webp" alt="Tamil Cuisine" />
            <h3>Cuisines of the Tamil Land</h3>
            <p>
              The delectable cuisine of Tamil Nadu is a culinary style which dates to antiquity and has since influenced the other states...
            </p>
            <a href="cuisine1.html" className="read-more">
              Read More <span>&rarr;</span>
            </a>
          </div>
          <div className="blog-card">
            <img src="images/regionalcuisine.webp" alt="Regional Cuisine" />
            <h3>Explore the regional cuisine of Tamil Nadu</h3>
            <p>
              Next time you visit Tamil Nadu explore beyond idli, vada and sambar. Instead savour each regional cuisine that boasts of...
            </p>
            <a href="cuisine2.html" className="read-more">
              Read More <span>&rarr;</span>
            </a>
          </div>
          <div className="blog-card">
            <img src="images/sweets.webp" alt="Sweet Savories" />
            <h3>Sweet Savouries from Tamil Nilam</h3>
            <p>
              No meal can be treated as complete without the desserts. The indulgent desserts of Tamil Nadu are exquisite and nutritio...
            </p>
            <a href="sweetsav.html" className="read-more">
              Read More <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" ref={addToRefs}>
        <div className="footer-container">
          <div className="footer-logo">
            <h3>Tamil Taste Trails</h3>
            <p>Discover the rich flavors of Tamil Nadu – one dish at a time.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="blogs.html">Blogs</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Tamil Taste Trails. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        id="scrollTopBtn"
        title="Go to top"
        style={{
          display: showScrollTop ? "block" : "none",
          position: "fixed",
          bottom: "40px",
          right: "30px",
          zIndex: 99,
          fontSize: "18px",
          background: "#800000",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 15px",
          cursor: "pointer",
        }}
        onClick={handleScrollTop}
        onMouseOver={e => e.currentTarget.style.background = "#a30000"}
        onMouseOut={e => e.currentTarget.style.background = "#800000"}
      >
        ⮝
      </button>
    </>
  );
};

export default Home;
