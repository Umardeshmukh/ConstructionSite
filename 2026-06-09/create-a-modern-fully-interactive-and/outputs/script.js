const phoneNumber = "919876543210";

function openWhatsApp(message) {
  const text = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const intent = link.dataset.whatsapp || "Website inquiry";
    openWhatsApp(`Hello MahaBuild Engineers, I want help with ${intent}. Please contact me for home construction in/near Aurangabad.`);
  });
});

document.querySelector("[data-lead-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const message = [
    "Hello MahaBuild Engineers, I want to book a free engineer consultation.",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Location: ${data.get("location")}`,
    `Plot size: ${data.get("plot") || "Not sure"}`,
    `Expected budget: ${data.get("budget")}`
  ].join("\n");
  form.querySelector("[data-form-note]").textContent = "Opening WhatsApp with your consultation request...";
  openWhatsApp(message);
});

const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 18);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
  observer.observe(element);
});
