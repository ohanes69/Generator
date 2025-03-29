// Support
const clickSupport = document.getElementById('clickSupport')
clickSupport.addEventListener('click', () => {
    try {
        window.location.href = 'mailto:billify@gmail.com';
    } catch (error) {
        alert("Veuillez configurer une application de messagerie pour envoyer un e-mail. Sinon contactez-nous sur billify@gmail.com");
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

optionsPayment.addEventListener('click', () => {
    optionsList.classList.remove('hidden')
})

// PopUp > 
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file_input");
    const dropzoneInput = document.getElementById("dropzone-file");
    const fileNameDisplay = document.getElementById("file_name_display");
    const filePreview = document.getElementById("file_preview");
    const previewImage = document.getElementById("preview_image");
    const popUp = document.getElementById("popUpImage");
    const fileInputBtn = document.getElementById("fileInputBtn");
    const dropzoneLabel = document.querySelector("#popUpImage label"); // Zone de drop

    fileInputBtn.addEventListener("click", function() {
        popUp.classList.remove("hidden");
    });

    function handleFileSelection(file) {
        if (file) {
            fileNameDisplay.textContent = file.name;
            fileNameDisplay.classList.add("text-black");

            // Afficher l'aperçu si c'est une image
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    filePreview.classList.remove("hidden"); // Afficher l'aperçu
                };
                reader.readAsDataURL(file);
            } else {
                previewImage.src = ""; // Supprimer l'image si ce n'est pas une image
                filePreview.classList.add("hidden");
            }
        } else {
            fileNameDisplay.textContent = "Aucun fichier sélectionné";
            filePreview.classList.add("hidden");
        }
        popUp.classList.add("hidden");
    }

    fileInput.addEventListener("change", function() {
        handleFileSelection(fileInput.files[0]);
    });

    dropzoneInput.addEventListener("change", function() {
        handleFileSelection(dropzoneInput.files[0]);
    });

    dropzoneLabel.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropzoneLabel.classList.add("border-emerald-500");
    });

    dropzoneLabel.addEventListener("dragleave", () => {
        dropzoneLabel.classList.remove("border-emerald-500");
    });

    dropzoneLabel.addEventListener("drop", (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileSelection(file);
        }
    });

    popUp.addEventListener("click", function(event) {
        if (event.target === popUp) {
            popUp.classList.add("hidden");
        }
    });
});