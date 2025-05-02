document.addEventListener("DOMContentLoaded", () => {
  // Typed.js for roles
  var typed = new Typed('#roles', {
    strings: ['Software Developer', 'FullStack Developer.'],
    typeSpeed: 65,
    backSpeed: 20,
    backDelay: 1500,
    loop: true
  });

  // Contact form submission
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const action = "https://formspree.io/f/mwpokrdz";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        status.innerText = "Thank you! Your message has been sent.";
        status.style.color = "lightgreen";
        form.reset();
      } else {
        status.innerText = "Oops! Something went wrong.";
        status.style.color = "red";
      }
    } catch (error) {
      status.innerText = "Network error. Please try again.";
      status.style.color = "red";
    }
  });

  // Fixed footer observer
  const contactSection = document.querySelector("#contact");
  const fixedFooter = document.querySelector(".fixed-footer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fixedFooter.style.opacity = "1";
          fixedFooter.style.pointerEvents = "auto";
        } else {
          fixedFooter.style.opacity = "0";
          fixedFooter.style.pointerEvents = "none";
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(contactSection);

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const menuIcon = menuToggle.querySelector("i");

  // Ensure nav-links is visible on desktop
  if (window.innerWidth >= 768) {
    navLinks.classList.remove("hidden");
  }

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
  });

  // Close menu only on mobile when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        navLinks.classList.add("hidden");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-times");
      }
    });
  });

  // Handle window resize to ensure desktop menu visibility
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      navLinks.classList.remove("hidden");
      menuIcon.classList.add("fa-bars");
      menuIcon.classList.remove("fa-times");
    } else {
      navLinks.classList.add("hidden");
    }
  });
});