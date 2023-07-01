var score = 0;
var responseTimes = {
  addition: [],
  addition3chiffres: []
};

function genererAddition(nombresChiffres) {
  var maxNombre = Math.pow(10, nombresChiffres) - 1;
  var nombre1 = Math.floor(Math.random() * maxNombre) + 1;
  var nombre2 = Math.floor(Math.random() * maxNombre) + 1;
  var resultat = nombre1 + nombre2;

  if (nombresChiffres === 2) {
    document.getElementById("additionResult").innerHTML = nombre1 + " + " + nombre2 + " = ";
    document.getElementById("additionResult").innerHTML += '<input type="text" id="reponseAddition" />';
    document.getElementById("additionResult").innerHTML += '<button onclick="verifierAddition(' + resultat + ')">Vérifier</button>';
  } else if (nombresChiffres === 3) {
    document.getElementById("addition3chiffresResult").innerHTML = nombre1 + " + " + nombre2 + " = ";
    document.getElementById("addition3chiffresResult").innerHTML += '<input type="text" id="reponseAddition3chiffres" />';
    document.getElementById("addition3chiffresResult").innerHTML += '<button onclick="verifierAddition(' + resultat + ')">Vérifier</button>';
  }
}

function verifierAddition(resultatAttendu) {
  if (document.getElementById("reponseAddition")) {
    var reponse = parseInt(document.getElementById("reponseAddition").value);
    if (reponse === resultatAttendu) {
      score++;
      document.getElementById("score").innerHTML = "Score : " + score;
      afficherNotification("Bonne réponse !", "success");
    } else {
      afficherNotification("Mauvaise réponse. La réponse correcte est " + resultatAttendu, "error");
    }
    document.getElementById("reponseAddition").value = "";
  } else if (document.getElementById("reponseAddition3chiffres")) {
    var reponse = parseInt(document.getElementById("reponseAddition3chiffres").value);
    if (reponse === resultatAttendu) {
      score++;
      document.getElementById("score").innerHTML = "Score : " + score;
      afficherNotification("Bonne réponse !", "success");
    } else {
      afficherNotification("Mauvaise réponse. La réponse correcte est " + resultatAttendu, "error");
    }
    document.getElementById("reponseAddition3chiffres").value = "";
  }
}

// Fonction pour calculer le temps de réponse
function calculateResponseTime(startTime) {
  const endTime = Date.now();
  return endTime - startTime;
}

// Gestionnaire d'événement pour vérifier la réponse et calculer le temps de réponse
function checkAnswer(event) {
  const resultatAttendu = parseInt(event.target.dataset.resultatAttendu);
  const answerInput = event.target.previousElementSibling;
  const responseTime = calculateResponseTime(event.target.dataset.startTime);
  const speedElement = event.target.nextElementSibling;

  const reponse = parseInt(answerInput.value);
  if (reponse === resultatAttendu) {
    score++;
    document.getElementById("score").innerHTML = "Score : " + score;
    afficherNotification("Bonne réponse !", "success");
  } else {
    afficherNotification("Mauvaise réponse. La réponse correcte est " + resultatAttendu, "error");
  }

  answerInput.value = "";
  speedElement.textContent = `Temps de réponse : ${responseTime} ms`;

  // Enregistrer le temps de réponse dans une catégorie appropriée (par exemple, l'addition)
  if (answerInput.id === "reponseAddition") {
    responseTimes.addition.push(responseTime);
  } else if (answerInput.id === "reponseAddition3chiffres") {
    responseTimes.addition3chiffres.push(responseTime);
  }
}

// Attacher les gestionnaires d'événements aux boutons de vérification
var checkButtons = document.querySelectorAll('.check-answer');
checkButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    event.target.dataset.startTime = Date.now(); // Enregistrer le temps de début
    checkAnswer(event);
  });
});
