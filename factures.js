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


// PopUp > add files
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file_input")
    const dropzoneInput = document.getElementById("dropzone-file")
    const fileNameDisplay = document.getElementById("file_name_display")
    const filePreview = document.getElementById("file_preview")
    const previewImage = document.getElementById("preview_image")
    const popUp = document.getElementById("popUpImage")
    const fileInputBtn = document.getElementById("fileInputBtn")
    const dropzoneLabel = document.querySelector("#popUpImage label") // Zone de drop

    fileInputBtn.addEventListener("click", function() {
        popUp.classList.remove("hidden")
    })

    function handleFileSelection(file) {
      if (file) {
          fileNameDisplay.textContent = file.name;
          fileNameDisplay.classList.remove("text-gray-500"); // Supprimer gris
          fileNameDisplay.classList.add("text-black"); // Ajouter noir
  
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
          fileNameDisplay.classList.remove("text-black");
          fileNameDisplay.classList.add("text-gray-500");
          filePreview.classList.add("hidden");
      }
      popUp.classList.add("hidden");
  }

    fileInput.addEventListener("change", function() {
        handleFileSelection(fileInput.files[0])
    })

    dropzoneInput.addEventListener("change", function() {
        handleFileSelection(dropzoneInput.files[0])
    })

    dropzoneLabel.addEventListener("dragover", (event) => {
        event.preventDefault()
        dropzoneLabel.classList.add("border-emerald-500")
    })

    dropzoneLabel.addEventListener("dragleave", () => {
        dropzoneLabel.classList.remove("border-emerald-500")
    })

    dropzoneLabel.addEventListener("drop", (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]
        if (file) {
            handleFileSelection(file);
        }
    })

    popUp.addEventListener("click", function(event) {
        if (event.target === popUp) {
            popUp.classList.add("hidden");
        }
    })
})


// Dupliquer les lignes pour le détail de la commande
document.addEventListener("DOMContentLoaded", function () {
    const addRowButton = document.getElementById("addRow");
    const linesContainer = document.getElementById("linesContainer");
    const firstLine = linesContainer.querySelector(".ligne-produit");

    function createCrossIcon() {
        const cross = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        cross.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        cross.setAttribute("height", "20px");
        cross.setAttribute("viewBox", "0 -960 960 960");
        cross.setAttribute("width", "20px");
        cross.setAttribute("fill", "#6B7280");
        cross.classList.add("cursor-pointer", "cross-icon");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z");
        cross.appendChild(path);

        cross.addEventListener("click", function () {
            const line = cross.closest(".ligne-produit");
            if (line) {
                line.remove();
            }
        });

        return cross;
    }

    // Nettoyer une ligne clonée
    function cleanClonedLine(clone) {
        // Supprimer toutes les croix existantes dans la ligne
        clone.querySelectorAll(".cross-icon").forEach(icon => icon.remove());

        // Réinitialiser tous les champs input
        clone.querySelectorAll("input").forEach(input => input.value = "");

        // Ajouter une nouvelle croix
        const cross = createCrossIcon();
        clone.appendChild(cross);

        return clone;
    }

    // Ajouter croix à la première ligne seulement si elle n’en a pas déjà
    if (!firstLine.querySelector(".cross-icon")) {
        const cross = createCrossIcon();
        firstLine.appendChild(cross);
    }

    // Ajouter une ligne
    addRowButton.addEventListener("click", function () {
        const clone = firstLine.cloneNode(true);
        const cleanedClone = cleanClonedLine(clone);
        linesContainer.appendChild(cleanedClone);
    });
});


  // Choix Multiple : Choisir une des options de type d'opération
  document.addEventListener("DOMContentLoaded", function () {
    const typeLinks = document.querySelectorAll("#dropdown a");
    const typeInput = document.getElementById("TypeOperationInput");

    typeLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const selectedType = this.textContent;

        typeInput.classList.remove("hidden");
        typeInput.value = selectedType;
      });
    });
  });


// Choix Multiple : Choisir une des options de paiement
document.addEventListener("DOMContentLoaded", function () {
  const choixLinks = document.querySelectorAll("#dropdownFirst a");
  const inputChoice = document.getElementById("ChoicePaiement");

  choixLinks.forEach(link => {
  link.addEventListener("click", function (e) {
      e.preventDefault(); // empêche le saut en haut de page

      const selectedText = this.textContent;

      // Affiche l'input s’il est caché
      inputChoice.classList.remove("hidden");

      // Met à jour la valeur de l’input
      inputChoice.value = selectedText;
  });
  });
});


 // Choix Multiple : Choisir le type de produit
 document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("dropdownDefaultButton");
    const dropdownMenu = document.getElementById("dropdownProduit");
    const typeLinks = document.querySelectorAll("#dropdownProduit a");

    // Fonction pour ouvrir ou fermer le menu
    function toggleDropdown() {
        const isOpen = dropdownMenu.classList.contains("hidden");
        dropdownMenu.classList.toggle("hidden", !isOpen);
        dropdownButton.setAttribute("aria-expanded", isOpen.toString());
    }

    // Ouvrir/fermer le menu au clic sur le bouton
    dropdownButton.addEventListener("click", function (e) {
        e.stopPropagation(); // Empêche la propagation pour éviter de fermer le menu immédiatement
        toggleDropdown();
    });

    // Fermer le menu si l'utilisateur clique à l'extérieur
    document.addEventListener("click", function (e) {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            if (!dropdownMenu.classList.contains("hidden")) {
                toggleDropdown();
            }
        }
    });

    // Mettre à jour le texte du bouton et fermer le menu après la sélection d'une option
    typeLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const selectedType = this.textContent;
            dropdownButton.innerHTML = `${selectedType} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 4 4 4-4"/>
            </svg>`;
            toggleDropdown(); // Fermer le menu après la sélection
        });
    });
});


// DatePicker - Date de la vente ou prestation
document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.querySelector('#cally-popover1 calendar-date');
    const button = document.getElementById('cally1');
    const label = document.getElementById('cally-label');
  
    if (calendar) {
      calendar.addEventListener('change', function (e) {
        const date = e.target.value;
  
        // Met à jour juste le texte du <span> sans toucher au SVG
        if (label && date) {
          label.textContent = date;
        }
      });
    }
  });


// DatePicker - Date d'échéance du règlement
document.querySelector('#cally-popover2 calendar-date').addEventListener('change', function () {
    const date = this.value;
    const button = document.getElementById('cally2');
    const label = document.getElementById('cally-label2');
    const icon = document.getElementById('calendar-icon2');
    const input = document.querySelector('#cally-popover2').parentElement.querySelector('input');
  
    input.value = date;;
  
    // Affiche l'input
    input.classList.remove('hidden');
  });
