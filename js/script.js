
/* =========================================
   TABOE — WEBSITE INTERACTIONS
   Independent redesign concept
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");
  const navigationLinks = document.querySelectorAll(".main-navigation a");

  // Mobile navigation
  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      navigation.classList.toggle("is-open", !isOpen);
    });

    // Close the menu after choosing a page
    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when Escape is pressed
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Restore desktop navigation after resizing
    window.addEventListener("resize", () => {
      if (window.innerWidth > 650) {
        closeMenu();
      }
    });
  }

  // Mark the current navigation link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navigationLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // Add a subtle reveal animation to content sections
  const revealTargets = document.querySelectorAll(
    ".intro-section, .featured-section, .statement-section"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealTargets.forEach((section) => {
      section.classList.add("reveal-section");
      revealObserver.observe(section);
    });
  }
});
