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



// Dupliquer les lignes pour le détail de la commande / DatePicker pour date de la commande ou vente / Calcul TTC // Biens ou services
document.addEventListener("DOMContentLoaded", function () {
    const addRowButton = document.getElementById("addRow");
    const linesContainer = document.getElementById("linesContainer");
    const firstLine = linesContainer.querySelector(".ligne-produit");

    // Fonction pour calculer le TTC
    function calculateTTC(line) {
        const quantity = parseFloat(line.querySelector('.quantity-input').value.replace(',', '.')) || 0;
        const price = parseFloat(line.querySelector('.price-input').value.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
        const vat = parseFloat(line.querySelector('.vat-input').value.replace('%', '').replace(',', '.')) || 0;
        
        const ht = quantity * price;
        const ttc = ht * (1 + vat / 100);
        
        line.querySelector('.ttc-input').value = ttc.toFixed(2).replace('.', ',') + '€';
    }

    // Initialise les calculs pour une ligne
    function setupLineCalculations(line) {
        line.querySelectorAll('.quantity-input, .price-input, .vat-input').forEach(input => {
            input.addEventListener('input', () => calculateTTC(line));
        });
        calculateTTC(line); // Calcul initial
    }

    // Fonction pour initialiser un calendrier
    function initCalendar(button) {
        const popoverId = button.getAttribute('popovertarget');
        const popover = document.getElementById(popoverId);
        const calendar = popover?.querySelector('calendar-date');
        const label = button.querySelector('.date-label');

        if (calendar) {
            // On clone le calendar pour éviter les doublons d'écouteurs
            const newCalendar = calendar.cloneNode(true);
            calendar.replaceWith(newCalendar);

            newCalendar.addEventListener('change', function(e) {
                if (label && e.target.value) {
                    label.textContent = e.target.value;
                }
            });
        }
    }

    // Fonction pour configurer un dropdown
    function setupDropdown(dropdownButton) {
        const dropdownMenu = dropdownButton.nextElementSibling;
        const selectedType = dropdownButton.querySelector('span');

        // Forcer 'Biens' comme sélection par défaut si vide
        if (!selectedType.textContent.trim()) {
            selectedType.textContent = 'Biens';
        }

        dropdownButton.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        });

        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                selectedType.textContent = this.textContent;
                dropdownMenu.classList.add('hidden');
            });
        });
    }

    // Fonction pour créer l'icône croix
    function createCrossIcon() {
        const cross = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        cross.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        cross.setAttribute("height", "20px");
        cross.setAttribute("viewBox", "0 -960 960 960");
        cross.setAttribute("width", "20px");
        cross.setAttribute("fill", "currentColor");
        cross.classList.add("cursor-pointer", "cross-icon", "text-gray-500", "hover:text-red-500");

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

    // Fonction améliorée pour nettoyer une ligne clonée
    function cleanClonedLine(clone) {
        // Supprimer les croix existantes
        clone.querySelectorAll(".cross-icon").forEach(icon => icon.remove());

        // Réinitialiser tous les champs input
        clone.querySelectorAll("input").forEach(input => {
            if (!input.classList.contains('ttc-input')) {
                input.value = "";
            }
        });

        // Gestion du calendrier
        const calendarButton = clone.querySelector('[popovertarget]');
        if (calendarButton) {
            const uniqueId = Date.now();
            const newPopoverId = `cally-popover-${uniqueId}`;
            
            // Mise à jour des attributs
            calendarButton.id = `cally-${uniqueId}`;
            calendarButton.setAttribute('popovertarget', newPopoverId);
            calendarButton.setAttribute('style', `anchor-name:--cally${uniqueId}`);
            
            // Mise à jour du popover
            const popover = clone.querySelector('[popover]');
            if (popover) {
                popover.id = newPopoverId;
                popover.setAttribute('style', `position-anchor:--cally${uniqueId}`);
            }
            
            // Réinitialisation de la date
            const label = calendarButton.querySelector('.date-label');
            if (label) {
                label.textContent = '2025-01-01';
                label.id = `cally-label-${uniqueId}`;
            }
        }

        // Gestion du dropdown type de produit
        const dropdownButton = clone.querySelector('[data-dropdown]');
        if (dropdownButton) {
            const selectedType = dropdownButton.querySelector('span');
            selectedType.textContent = 'Biens'; // Forcer 'Biens' par défaut
        }

        // Ajouter une nouvelle croix
        const cross = createCrossIcon();
        clone.appendChild(cross);

        return clone;
    }

    // Initialiser les dropdowns existants
    document.querySelectorAll('[data-dropdown]').forEach(setupDropdown);

    // Initialiser le premier calendrier
    const firstCalendarButton = document.getElementById('cally1');
    if (firstCalendarButton) {
        initCalendar(firstCalendarButton);
    }

    // Initialiser les calculs pour la première ligne
    setupLineCalculations(firstLine);

    // Ajouter croix à la première ligne seulement si elle n'en a pas déjà
    if (!firstLine.querySelector(".cross-icon")) {
        const cross = createCrossIcon();
        firstLine.appendChild(cross);
    }

    // Ajouter une ligne
    addRowButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const clone = firstLine.cloneNode(true);
        const cleanedClone = cleanClonedLine(clone);
        linesContainer.appendChild(cleanedClone);

        // Initialiser le nouveau calendrier
        const newCalendarButton = cleanedClone.querySelector('[popovertarget]');
        if (newCalendarButton) {
            initCalendar(newCalendarButton);
        }

        // Initialiser les dropdowns
        cleanedClone.querySelectorAll('[data-dropdown]').forEach(setupDropdown);

        // Initialiser les calculs pour la nouvelle ligne
        setupLineCalculations(cleanedClone);
    });

    // Gestion de la fermeture des popovers et dropdowns quand on clique ailleurs
    document.addEventListener('click', function(e) {
        // Fermer les popovers
        if (!e.target.closest('[popover]') && !e.target.closest('[popovertarget]')) {
            document.querySelectorAll('[popover][open]').forEach(popover => {
                popover.hidePopover();
            });
        }
        
        // Fermer les dropdowns
        if (!e.target.closest('[data-dropdown]')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
        }
    });
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

  