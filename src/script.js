
// === Carousel Logic ===
const track = document.getElementById("carouselTrack");
let currentSlide = 0;
const totalSlides = 2; // Update this if number of slides changes

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// === Scroll to Top Button ===
const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scrollTopBtn";
scrollTopBtn.title = "Go to top";
scrollTopBtn.innerHTML = "⮝";
document.body.appendChild(scrollTopBtn);

scrollTopBtn.style.cssText = `
  display: none;
  position: fixed;
  bottom: 40px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  background: #800000;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
`;

scrollTopBtn.addEventListener("mouseover", () => {
  scrollTopBtn.style.backgroundColor = "#a30000";
});
scrollTopBtn.addEventListener("mouseout", () => {
  scrollTopBtn.style.backgroundColor = "#800000";
});

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }

  const nav = document.querySelector("header");
  if (window.scrollY > 80) {
    nav.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
  } else {
    nav.style.boxShadow = "none";
  }
};

scrollTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// === Typing Effect in Hero Section ===
const heroText = "Discover the Spirit of the South";
let idx = 0;
const typingTarget = document.querySelector(".hero-content p");

function typeEffect() {
  if (typingTarget && idx < heroText.length) {
    typingTarget.textContent += heroText.charAt(idx);
    idx++;
    setTimeout(typeEffect, 60);
  }
}
if (typingTarget) {
  typingTarget.textContent = "";
  typeEffect();
}

// === Scroll Reveal Animation ===
const revealElements = document.querySelectorAll(".experiences-container, .activities-container, .blogs-container");

window.addEventListener("scroll", () => {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// === Image Hover Zoom for Carousel Cards ===
document.querySelectorAll(".carousel-card img").forEach(img => {
  img.addEventListener("mouseenter", () => {
    img.style.transform = "scale(1.05)";
    img.style.transition = "transform 0.3s ease";
  });
  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

// === Start Your Journey Button Scroll ===
document.getElementById("startJourneyBtn").addEventListener("click", function (e) {
    e.preventDefault(); // prevent default anchor jump
    const target = document.getElementById("placesToVisit");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });

// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // optional: stop observing once shown
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => {
  observer.observe(el);
});


  document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.hero, .intro, .places-section, .experiences-section, .things-to-do-section, .blogs-section, .site-footer');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    sections.forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
  });



  