document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];

const setMenu = (open) => {
  if (!navToggle || !nav) return;
  navToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  const label = navToggle.querySelector(".sr-only");
  if (label) label.textContent = open ? "Close navigation" : "Open navigation";
};

navToggle?.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setMenu(false);
});

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const observedSections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { threshold: [0.18, 0.38, 0.62], rootMargin: "-18% 0px -55%" },
  );
  observedSections.forEach((section) => sectionObserver.observe(section));
}

const gallery = document.querySelector("[data-gallery]");
const photos = gallery ? [...gallery.querySelectorAll("[data-photo]")] : [];
const currentLabel = document.querySelector("[data-gallery-current]");
const previousButton = document.querySelector("[data-gallery-prev]");
const nextButton = document.querySelector("[data-gallery-next]");

const activePhotoIndex = () => {
  if (!gallery || !photos.length) return 0;
  const left = gallery.scrollLeft;
  return photos.reduce((nearest, photo, index) => {
    const currentDistance = Math.abs(photo.offsetLeft - photos[0].offsetLeft - left);
    const nearestDistance = Math.abs(photos[nearest].offsetLeft - photos[0].offsetLeft - left);
    return currentDistance < nearestDistance ? index : nearest;
  }, 0);
};

const updateGalleryCount = () => {
  if (!currentLabel) return;
  currentLabel.textContent = String(activePhotoIndex() + 1).padStart(2, "0");
};

const goToPhoto = (index) => {
  if (!gallery || !photos.length) return;
  const normalized = (index + photos.length) % photos.length;
  gallery.scrollTo({
    left: photos[normalized].offsetLeft - photos[0].offsetLeft,
    behavior: "smooth",
  });
};

previousButton?.addEventListener("click", () => goToPhoto(activePhotoIndex() - 1));
nextButton?.addEventListener("click", () => goToPhoto(activePhotoIndex() + 1));
gallery?.addEventListener("scroll", updateGalleryCount, { passive: true });

const copyButton = document.querySelector("[data-copy-email]");
copyButton?.addEventListener("click", async () => {
  const email = copyButton.getAttribute("data-copy-email");
  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = "Email copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy email";
    }, 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
