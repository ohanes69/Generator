// Support
const clickSupport = document.getElementById('clickSupport')
clickSupport.addEventListener('click', () => {
    try {
        window.location.href = 'mailto:billify@gmail.com';
    } catch (error) {
        alert("Veuillez configurer une application de messagerie pour envoyer un e-mail.");
    }
})

const clickSupportMobile = document.getElementById('clickSupportMobile')
clickSupportMobile.addEventListener('click', () => {
    try {
        window.location.href = 'mailto:billify@gmail.com';
    } catch (error) {
        alert("Veuillez configurer une application de messagerie pour envoyer un e-mail. Sinon contactez-nous sur billify@gmail.com");
    }
})

// MenuVersionDesk&Mob
document.addEventListener("DOMContentLoaded", function () {
    const buttonBurger = document.getElementById("buttonBurger");
    const buttonClose = document.getElementById("buttonClose");
    const mobileMenu = document.getElementById("mobile-menu");

    function toggleMenu() {
        mobileMenu.classList.toggle("-translate-y-full");
        buttonBurger.classList.toggle("hidden");
        buttonClose.classList.toggle("hidden");
    }

    // Écouteurs d'événements pour l'ouverture et la fermeture
    buttonBurger.addEventListener("click", toggleMenu);
    buttonClose.addEventListener("click", toggleMenu);
});

// Pour le scrool, CDN
document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
});

// Pour les validations différentes 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    emailInput.addEventListener("input", function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.classList.remove("hidden");
        } else {
            emailError.classList.add("hidden");
        }
    });

    passwordInput.addEventListener("input", function () {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.textContent = "Mot de passe invalide : minimum 8 caractères, incluant au moins une lettre et un chiffre.";
            passwordError.classList.remove("hidden");
        } else {
            passwordError.classList.add("hidden");
        }
    });

    confirmPasswordInput.addEventListener("input", function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Les mots de passe ne correspondent pas.";
            confirmPasswordError.classList.remove("hidden");
        } else {
            confirmPasswordError.classList.add("hidden");
        }
    });

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Vérification de l'email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            emailError.classList.remove("hidden");
            isValid = false;
        } else {
            emailError.classList.add("hidden");
        }

        // Vérification du mot de passe
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value)) {
            passwordError.textContent = "Mot de passe invalide : minimum 8 caractères, incluant au moins une lettre et un chiffre.";
            passwordError.classList.remove("hidden");
            isValid = false;
        } else {
            passwordError.classList.add("hidden");
        }

        // Vérification de la correspondance des mots de passe
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Les mots de passe ne correspondent pas.";
            confirmPasswordError.classList.remove("hidden");
            isValid = false;
        } else {
            confirmPasswordError.classList.add("hidden");
        }

        if (!isValid) {
            event.preventDefault(); // Bloque l'envoi du formulaire
        }
    });
});