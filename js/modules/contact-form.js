// CONTACT FORM VALIDATION

export function initContactForm() {
    const contactForm = document.querySelector(".card-contact form");
    if (!contactForm) return;

    const requiredFields = contactForm.querySelectorAll("input[required], textarea[required]");

    const updateFieldError = (field) => {
        const errorEl = document.getElementById(`error-${field.id}`);
        if (!errorEl) return;
        const showInvalid = !field.checkValidity();
        errorEl.textContent = "";
        field.setAttribute("aria-invalid", showInvalid ? "true" : "false");
    };

    contactForm.addEventListener("submit", (event) => {
        let firstInvalid = null;
        requiredFields.forEach((field) => {
            updateFieldError(field);
            if (!field.checkValidity() && !firstInvalid) {
                firstInvalid = field;
            }
        });
        if (firstInvalid) {
            event.preventDefault();
            firstInvalid.focus();
        }
    });

    requiredFields.forEach((field) => {
        field.addEventListener("input", () => {
            if (field.getAttribute("aria-invalid") === "true") {
                updateFieldError(field);
            }
        });
    });
}
