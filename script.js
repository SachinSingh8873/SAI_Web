const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

navToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});

function closeMobileNav() {
  mobileNav.classList.remove("show");
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const brand = e.target.brand.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;
  const message = e.target.message.value;

  const whatsappText =
    `Quotation Request:%0A` +
    `Name: ${name}%0A` +
    `Brand: ${brand}%0A` +
    `Email: ${email}%0A` +
    `Phone: ${phone}%0A` +
    `Requirement: ${message}`;

  window.open(`https://wa.me/918187085691?text=${whatsappText}`, "_blank");
}

// Function to set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
