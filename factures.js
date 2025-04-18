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
const addRowBtn = document.getElementById('addRow');
const container = document.getElementById('linesContainer');

  addRowBtn.addEventListener('click', () => {
    const firstRow = container.querySelector('.ligne-produit');
    const newRow = firstRow.cloneNode(true);

    // Réinitialise les valeurs des inputs
    newRow.querySelectorAll('input').forEach(input => input.value = '');

    container.appendChild(newRow);
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
    const typeLinks = document.querySelectorAll("#dropdownProduit a");
    const typeInput = document.getElementById("ChoiceProduit");

    typeLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const selectedType = this.textContent;

        typeInput.classList.remove("hidden");
        typeInput.value = selectedType;
      });
    });
  });

// DatePicker - Date de la vente ou prestation
document.querySelector('#cally-popover1 calendar-date').addEventListener('change', function () {
    const date = this.value;
    const button = document.getElementById('cally1');
    const label = document.getElementById('cally-label1');
    const icon = document.getElementById('calendar-icon1');
    const input = document.querySelector('#cally-popover1').parentElement.querySelector('input');
  
    input.value = date;;
  
    // Affiche l'input
    input.classList.remove('hidden');
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