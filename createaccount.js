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


// DOM chargé
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form")
    const emailInput = document.getElementById("email")
    const emailError = document.getElementById("email-error")
    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirm-password")
    const passwordError = document.getElementById("password-error")
    const confirmPasswordError = document.getElementById("confirm-password-error")

    // Live validation
    emailInput.addEventListener("input", function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailInput.value)) {
            emailError.classList.remove("hidden")
        } else {
            emailError.classList.add("hidden")
        }
    })

    passwordInput.addEventListener("input", function () {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]{8,}$/
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.textContent = "Mot de passe invalide : minimum 8 caractères, incluant au moins une lettre et un chiffre."
            passwordError.classList.remove("hidden")
        } else {
            passwordError.classList.add("hidden")
        }
    })

    confirmPasswordInput.addEventListener("input", function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Les mots de passe ne correspondent pas."
            confirmPasswordError.classList.remove("hidden")
        } else {
            confirmPasswordError.classList.add("hidden")
        }
    })

    // Submit complet
    form.addEventListener("submit", async function (event) {
        event.preventDefault()

        const email = emailInput.value.trim()
        const password = passwordInput.value
        const confirmPassword = confirmPasswordInput.value

        let isValid = true

        // Vérification email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.classList.remove("hidden")
            isValid = false
        } else {
            emailError.classList.add("hidden")
        }

        // Vérification mot de passe
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/.test(password)) {
            passwordError.textContent = "Mot de passe invalide : minimum 8 caractères, incluant au moins une lettre et un chiffre."
            passwordError.classList.remove("hidden")
            isValid = false
        } else {
            passwordError.classList.add("hidden")
        }

        // Vérification correspondance
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Les mots de passe ne correspondent pas."
            confirmPasswordError.classList.remove("hidden")
            isValid = false
        } else {
            confirmPasswordError.classList.add("hidden")
        }

        // Si pas valide → stop
        if (!isValid) return

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                
                setTimeout(function() {
                    form.reset(); // Réinitialiser le formulaire après 2 secondes
                }, 2000)
            } else {
                alert('❌ ' + result.error);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    })
})


// Afficher / masquer mot de passe
const passwordInput = document.getElementById("password");
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


// Faire apparaître la pop-up lors du chargement de la page, puis la faire disparaître selon le choix du user

        let popup = document.getElementById('pop-up')
    setTimeout(() => {
        popup.classList.remove('hidden')
        setTimeout(() => {
            popup.classList.remove('opacity-0', 'scale-90', 'translate-y-4');
        }, 50);
    }, 2000);

    let croix = document.getElementById('croix')
    croix.addEventListener('click', () => {
        popup.classList.add('hidden')
    })


