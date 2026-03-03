// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const header = document.getElementById("header");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = "linear-gradient(45deg, #06D6A0, #0ACF83)";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background =
          "linear-gradient(45deg, var(--primary), #5A9CFF)";
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      if (
        entry.target.classList.contains("strength-card") ||
        entry.target.classList.contains("product-card") ||
        entry.target.classList.contains("contact-detail") ||
        entry.target.classList.contains("video-item") ||
        entry.target.classList.contains("team-member") ||
        entry.target.classList.contains("process-step")
      ) {
        const index = Array.from(entry.target.parentElement.children).indexOf(
          entry.target,
        );
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .strength-card, .product-card, .contact-detail, .video-item, .team-member, .process-step",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Animate stats counter
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent =
        target + (element.textContent.includes("+") ? "+" : "");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(start) + (element.textContent.includes("+") ? "+" : "");
    }
  }, 16);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.textContent);
          if (!isNaN(target)) {
            animateCounter(stat, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Video placeholder click effect
const videoPlaceholders = document.querySelectorAll(".video-placeholder i");
videoPlaceholders.forEach((placeholder) => {
  placeholder.addEventListener("click", () => {
    const videoContainer = placeholder.closest(".video-placeholder");
    videoContainer.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7);">
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: white; margin-bottom: 20px;">Packaging Demo Video</h3>
                    <p style="color: rgba(255,255,255,0.8); margin-bottom: 30px;">This would be an embedded video showcasing our products</p>
                    <div style="background: #333; width: 100%; height: 250px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white;">
                        <i class="fas fa-play-circle" style="font-size: 4rem;"></i>
                    </div>
                </div>
            </div>
        `;
  });
});

// Product filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      productCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Set active navigation
window.addEventListener("load", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("#navMenu a:not(.btn)");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });

  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add("animate__animated", "animate__fadeInUp");
    }, 300);
  }
});
