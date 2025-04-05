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
            fileNameDisplay.textContent = file.name
            fileNameDisplay.classList.add("text-black")

            // Afficher l'aperçu si c'est une image
            if (file.type.startsWith("image/")) {
                const reader = new FileReader()
                reader.onload = function(e) {
                    previewImage.src = e.target.result
                    filePreview.classList.remove("hidden") // Afficher l'aperçu
                }
                reader.readAsDataURL(file)
            } else {
                previewImage.src = "" // Supprimer l'image si ce n'est pas une image
                filePreview.classList.add("hidden")
            }
        } else {
            fileNameDisplay.textContent = "Aucun fichier sélectionné"
            filePreview.classList.add("hidden")
        }
        popUp.classList.add("hidden")
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




// Date Picker
let display = document.querySelector(".display");
let days = document.querySelector(".days");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let selected = document.querySelector(".selected");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

function displayCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const numberOfDays = lastDay.getDate();

  let formattedDate = date.toLocaleString("fr-FR", {
    month: "long",
    year: "numeric"
  });

  // Mettre la première lettre du mois en majuscule
  formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  display.innerHTML = `${formattedDate}`;

  // Nettoyage des anciens jours
  days.innerHTML = "";

  // Ajout des jours du mois
  for (let i = 1; i <= numberOfDays; i++) {
    let div = document.createElement("div");
    let currentDate = new Date(year, month, i);
    
    div.dataset.date = currentDate.toDateString();
    div.innerHTML = i;
    div.classList.add("day"); // Ajout d'une classe CSS pour le style
    days.appendChild(div);

    // Vérifier si c'est la date actuelle et ajouter une classe
    if (
      currentDate.getFullYear() === new Date().getFullYear() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getDate() === new Date().getDate()
    ) {
      div.classList.add("current-date");
    }
  }
}

// Afficher le calendrier au chargement
displayCalendar();

// Gestion de la navigation
previous.addEventListener("click", () => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  date.setMonth(month);
  displayCalendar();
  displaySelected();
});

next.addEventListener("click", () => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  date.setMonth(month);
  displayCalendar();
  displaySelected();
});

// Fonction pour gérer la sélection de date
function displaySelected() {
  const dayElements = document.querySelectorAll(".day");
  
  dayElements.forEach((day) => {
    day.addEventListener("click", (e) => {
      // Retirer la sélection précédente
      document.querySelectorAll(".day").forEach((day) => {
        day.classList.remove("selected-date");
      });

      // Ajouter la classe selected-date à la date sélectionnée
      e.target.classList.add("selected-date");

      // Retirer la classe current-date de l'élément de la date actuelle
      document.querySelectorAll(".day").forEach((day) => {
        day.classList.remove("current-date");
      });

      const selectedDate = new Date(e.target.dataset.date);
      const formattedDate = selectedDate.toLocaleDateString("fr-FR", {
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });

      selected.innerHTML = `Date sélectionnée : ${formattedDate}`;
    });
  });
}
displaySelected();

// Apparition datePicker vente/prestation
const showCalendarBtn = document.getElementById("showCalendarBtn");
const calendarContainer = document.getElementById("calendarContainer");

showCalendarBtn.addEventListener("click", (event) => {
    event.stopPropagation();  // Empêche la propagation du clic
    calendarContainer.classList.toggle("hidden");  // Affiche/masque le calendrier
});

// Masquer le calendrier lorsqu'on clique en dehors du bouton ou du calendrier
document.addEventListener("click", (event) => {
    if (!showCalendarBtn.contains(event.target) && !calendarContainer.contains(event.target)) {
        calendarContainer.classList.add("hidden");
    }
});






// DatePicker 2
let display2 = document.querySelector(".display2");
let days2 = document.querySelector(".days2");
let previous2 = document.querySelector(".left2");
let next2 = document.querySelector(".right2");

let date2 = new Date();
let year2 = date.getFullYear();
let month2 = date.getMonth();

// Fonction d'affichage du calendrier
function displayCalendar2() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const numberOfDays = lastDay.getDate();
    let formattedDate = date.toLocaleString("fr-FR", {
        month: "long",
        year: "numeric"
    });

    // Mettre la première lettre du mois en majuscule
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    display2.innerHTML = `${formattedDate}`;

    // Nettoyage des anciens jours
    days2.innerHTML = "";

    // Ajout des jours du mois
    for (let i = 1; i <= numberOfDays; i++) {
        let div = document.createElement("div");
        let currentDate = new Date(year, month, i);
        
        div.dataset.date = currentDate.toDateString();
        div.innerHTML = i;
        div.classList.add("day2");
        days2.appendChild(div);

        // Vérifier si c'est la date actuelle et ajouter une classe
        if (
            currentDate.getFullYear() === new Date().getFullYear() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getDate() === new Date().getDate()
        ) {
            div.classList.add("current-date2");
        }
    }

    displaySelected2();
}

displayCalendar2();

// Gestion de la navigation
previous2.addEventListener("click", () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    date.setMonth(month);
    displayCalendar2();
});

next2.addEventListener("click", () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    date.setMonth(month);
    displayCalendar2();
});

// Fonction pour gérer la sélection de date
function displaySelected2() {
    const dayElements = document.querySelectorAll(".day2");
    
    dayElements.forEach((day) => {
        day.addEventListener("click", (e) => {
            // Retirer la sélection précédente
            document.querySelectorAll(".day2").forEach((day) => {
                day.classList.remove("selected-date2");
            });

            // Ajouter la classe selected-date à la date sélectionnée
            e.target.classList.add("selected-date2");

            // Retirer la classe current-date de l'élément de la date actuelle
            document.querySelectorAll(".day2").forEach((day) => {
                day.classList.remove("current-date2");
            });
        });
    });
}

// Apparition datePicker échéance du règlement
const showCalendarBtn2 = document.getElementById("showCalendarBtn2");
const calendarContainer2 = document.getElementById("calendarContainer2");

showCalendarBtn2.addEventListener("click", (event) => {
    event.stopPropagation();  // Empêche la propagation du clic
    calendarContainer2.classList.toggle("hidden");  // Affiche/masque le calendrier
});

// Masquer le calendrier lorsqu'on clique en dehors du bouton ou du calendrier
document.addEventListener("click", (event) => {
    if (!showCalendarBtn2.contains(event.target) && !calendarContainer2.contains(event.target)) {
        calendarContainer2.classList.add("hidden");
    }
});

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


  document.addEventListener("DOMContentLoaded", function () {
    const choixLinks = document.querySelectorAll("#dropdownHoverFirst a");
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