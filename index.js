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

// Placeholder hidden when i mouseover

function hiddenPlaceHolder(inputElement) {
    inputElement.addEventListener('focus', () => {
        inputElement.classList.replace('placeholder:text-gray-400', 'placeholder-transparent')
    })
    inputElement.addEventListener('blur', () => {
        if (inputElement.value == '')
        {
            inputElement.classList.replace('placeholder-transparent', 'placeholder:text-gray-400')
        }
    })
}

const inputFirstName = document.getElementById('firstName')
const inputLastName = document.getElementById('lastName')
const inputAdress = document.getElementById('inputAdress')
const inputPhone = document.getElementById('inputPhone')
const inputEmail = document.getElementById('inputEmail')
const inputRef = document.getElementById('inputRef')


hiddenPlaceHolder(inputFirstName)
hiddenPlaceHolder(inputLastName)
hiddenPlaceHolder(inputAdress)
hiddenPlaceHolder(inputPhone)
hiddenPlaceHolder(inputEmail)
hiddenPlaceHolder(inputRef)