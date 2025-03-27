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


// Changer "choisir le fichier" en nom de l'image
function updateFileName() {
    const fileInput = document.getElementById('uploadLogo');
    const fileNameSpan = document.getElementById('fileName');
    const fileName = fileInput.files[0] ? fileInput.files[0].name : 'Aucun fichier choisi';
    
    fileNameSpan.textContent = fileName;
}

// Changer le défilement de <options>
const optionsPayment = document.getElementById('optionsPayment')
const optionsList = document.getElementById('optionsList')
const optionsBorder = document.getElementById('optionsBorder')

optionsPayment.addEventListener('click', () => {
    if (optionsList.classList.contains('hidden'))
    {
        optionsList.classList.remove('hidden')
        optionsBorder.classList.replace('rounded-lg', 'rounded-t-lg')
    }
    else 
    {
        optionsList.classList.add('hidden')
        optionsBorder.classList.replace('rounded-t-lg', 'rounded-lg')
    }
})

// If I select an option, text pop
const textBase = document.getElementById('textBase');
const paymentOptions = document.querySelectorAll('#optionsList button');

// Fonction pour mettre à jour le texte
paymentOptions.forEach(button => {
    button.addEventListener('click', () => {
        textBase.textContent = button.textContent; // Remplace le texte
        document.getElementById('optionsList').classList.add('hidden'); // Ferme le menu après sélection
    });
});





// Changer le défilement de <options>
const optionsPayment2 = document.getElementById('optionsPayment2')
const optionsList2 = document.getElementById('optionsList2')
const optionsBorder2 = document.getElementById('optionsBorder2')

optionsPayment2.addEventListener('click', () => {
    if (optionsList.classList.contains('hidden'))
    {
        optionsList2.classList.remove('hidden')
        optionsBorder2.classList.replace('rounded-lg', 'rounded-t-lg')
    }
    else 
    {
        optionsList2.classList.add('hidden')
        optionsBorder2.classList.replace('rounded-t-lg', 'rounded-lg')
    }
})

// If I select an option, text pop
const textBase2 = document.getElementById('textBase2');
const paymentOptions2 = document.querySelectorAll('#optionsList2 button');

// Fonction pour mettre à jour le texte
paymentOptions2.forEach(button => {
    button.addEventListener('click', () => {
        textBase2.textContent = button.textContent; // Remplace le texte
        document.getElementById('optionsList2').classList.add('hidden'); // Ferme le menu après sélection
    });
});