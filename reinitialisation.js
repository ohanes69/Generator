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
        // Basculer l'affichage du menu
        mobileMenu.classList.toggle("-translate-y-full");

        // Basculer la visibilité des boutons
        buttonBurger.classList.toggle("hidden");
        buttonClose.classList.toggle("hidden");

        // Activer/désactiver le défilement de la page
        if (mobileMenu.classList.contains("-translate-y-full")) {
            document.body.classList.remove("overflow-hidden"); // Réactiver le défilement
        } else {
            document.body.classList.add("overflow-hidden"); // Désactiver le défilement
        }
    }

    // Écouteurs d'événements pour l'ouverture et la fermeture
    buttonBurger.addEventListener("click", toggleMenu);
    buttonClose.addEventListener("click", toggleMenu);
});

// Pour le scrool, CDN
document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
});

// Reinitialisation règles
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reset-form");
    const passwordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");
    const confirmError = document.getElementById("confirm-error");

    // Vérification du mot de passe
    passwordInput.addEventListener("input", function () {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>_+={}\[\]~`-]{8,}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.classList.remove("hidden");
        } else {
            passwordError.classList.add("hidden");
        }
    });

    // Vérification de la correspondance des mots de passe
    confirmPasswordInput.addEventListener("input", function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmError.classList.remove("hidden");
        } else {
            confirmError.classList.add("hidden");
        }
    });

    // Validation du formulaire
    form.addEventListener("submit", function (event) {
        let isValid = true;

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>_+={}\[\]~`-]{8,}$/.test(passwordInput.value)) {
            passwordError.classList.remove("hidden");
            isValid = false;
        } else {
            passwordError.classList.add("hidden");
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmError.classList.remove("hidden");
            isValid = false;
        } else {
            confirmError.classList.add("hidden");
        }

        if (!isValid) {
            event.preventDefault(); // Empêche l'envoi du formulaire si erreurs
        }
    });
});

// Afficher / masquer mot de passe
const passwordInput = document.getElementById("new-password");
const togglePassword = document.getElementById("toggle-password");
const eyeOpen1 = document.getElementById("eyesOpen1");
const eyeClosed1 = document.getElementById("eyesClosed1");

togglePassword.addEventListener("click", function () {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  eyeOpen1.classList.toggle("hidden", !isPassword);
  eyeClosed1.classList.toggle("hidden", isPassword);
});
  
  // Afficher / masquer confirmation mot de passe
  const confirmPasswordInput = document.getElementById("confirm-password");
  const toggleConfirmPassword = document.getElementById("toggle-confirm-password");
  const eyeOpen2 = document.getElementById("eyesOpen2");
  const eyeClosed2 = document.getElementById("eyesClosed2");
  
  toggleConfirmPassword.addEventListener("click", function () {
    const isPassword = confirmPasswordInput.type === "password";
    confirmPasswordInput.type = isPassword ? "text" : "password";
  
    eyeOpen2.classList.toggle("hidden", !isPassword);
    eyeClosed2.classList.toggle("hidden", isPassword);
  });