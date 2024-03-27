var limdu = require("limdu");
const prompt = require("prompt-sync")({ sigint: true });
const job = require("./models/jobModel");
const user = require("./models/userModel");
const candidature = require("./models/candidatureModel");

(async function () {
  // First, define our base classifier type (a multi-label classifier based on winnow):
  var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: limdu.classifiers.Winnow.bind(0, {
      retrain_count: 10,
    }),
  });

  // Now define our feature extractor - a function that takes a sample and adds features to a given features set:
  var WordExtractor = function (input, features) {
    input.split(" ").forEach(function (word) {
      features[word] = 1;
    });
  };

  // Initialize a classifier with the base classifier type and the feature extractor:
  var intentClassifier = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor,
  });

  // Train and test:
  intentClassifier.trainBatch([
    { input: "Je veux consulter des offres d emplois", output: "emplois" },
    { input: "Je recherche un emploi", output: "emplois" },
    { input: "Ou puis je trouver des offres d emplois", output: "emplois" },
    { input: "Quels sont les postes disponibles", output: "emplois" },
    { input: "Comment puis je postuler à un emploi", output: "emplois" },
    {
      input:
        "Je suis a la recherche de nouvelles opportunites professionnelles",
      output: "emplois",
    },
    {
      input: "J'aimerais decouvrir les postes vacants disponibles",
      output: "emplois",
    },
    {
      input: "Je souhaite explorer les offres d emploi dans mon domaine",
      output: "emplois",
    },
    {
      input:
        "Je suis interesse par les opportunites de carriere actuellement disponibles",
      output: "emplois",
    },
    {
      input:
        "J aspire à trouver un emploi correspondant a mes competences et e mes interets",
      output: "emplois",
    },
    {
      input:
        "Je désire consulter les offres d emploi pour elargir mes horizons professionnels",
      output: "emplois",
    },
    {
      input: "Je suis curieux de voir ce que le marche du travail a a offrir",
      output: "emplois",
    },
    {
      input:
        "Je suis motive à trouver un emploi qui correspond a mes objectifs professionnels",
      output: "emplois",
    },
    {
      input:
        "J ai hate de decouvrir de nouvelles opportunites professionnelles excitantes",
      output: "emplois",
    },
    {
      input:
        "Je suis ouvert a explorer de nouveaux defis professionnels et a contribuer de maniere significative",
      output: "emplois",
    },

    {
      input: "Je souhaite suivre l evolution de mes candidatures recentes",
      output: "candidatures",
    },
    {
      input: "J aimerais connaitre le statut de mes demandes d emploi en cours",
      output: "candidatures",
    },
    {
      input:
        "Je voudrais verifier les reponses aux candidatures que j ai soumises",
      output: "candidatures",
    },
    {
      input:
        "Je desire consulter les retours des entreprises sur mes candidatures",
      output: "candidatures",
    },
    {
      input:
        "Je suis intéresse par l avancement de mes demarches pour trouver un emploi",
      output: "candidatures",
    },
    {
      input:
        "Je veux m assurer que mes candidatures sont bien prises en consideration",
      output: "candidatures",
    },
    {
      input:
        "Je suis motive a suivre de pres mes progres dans ma recherche d emploi",
      output: "candidatures",
    },
    {
      input: "Je souhaite suivre l evolution de mes candidatures recentes",
      output: "candidatures",
    },
    {
      input: "J aimerais connaître le statut actuel de mes demandes d emploi",
      output: "candidatures",
    },
    {
      input:
        "Je voudrais verifier les reponses reçues suite a mes soumissions de candidatures",
      output: "candidatures",
    },
    {
      input:
        "Je desire consulter les retours des entreprises concernant mes candidatures",
      output: "candidatures",
    },
    {
      input:
        "Je suis interesse par le suivi de mes demarches pour trouver un emploi",
      output: "candidatures",
    },
    {
      input:
        "Je souhaite m assurer que mes candidatures sont prises en consideration comme il se doit",
      output: "candidatures",
    },
    {
      input:
        "Je suis motive a observer de pres mes avancees dans ma quete d emploi",
      output: "candidatures",
    },
  ]);

  var intentClassifierTypeEmploi = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor,
  });

  // Train and test:
  intentClassifierTypeEmploi.trainBatch([
    {
      input: "Je cherche un poste de developpeur backend",
      output: "developpeur web",
    },
    { input: "Je voudrais travailler comme patissier", output: "cuisinier" },
    {
      input: "Quels postes sont disponibles pour un ingenieur en informatique",
      output: "ingenieur logiciel",
    },
    {
      input: "Je suis interesse par un emploi danalyste de donnees senior",
      output: "analyste de donnees",
    },
    {
      input: "Je cherche des offres pour un chef de projet technique",
      output: "chef de projet",
    },
    {
      input:
        "Comment puis je obtenir un emploi dans le domaine de la securite informatique",
      output: "cybersecurite",
    },
    {
      input: "Je recherche un poste de developpeur frontend",
      output: "developpeur web",
    },
    {
      input: "Je veux devenir chef cuisinier dans un restaurant etoile",
      output: "cuisinier",
    },
    {
      input:
        "Quelles sont les opportunites pour un ingenieur en genie logiciel",
      output: "ingenieur logiciel",
    },
    {
      input:
        "Je suis a la recherche d un emploi danalyste de donnees en finance",
      output: "analyste de donnees",
    },
    {
      input: "Je cherche des offres pour un chef de projet agile",
      output: "chef de projet",
    },
    {
      input:
        "Comment puis je trouver des emplois dans le domaine de la cybersecurite pour les debutants",
      output: "cybersecurite",
    },
    {
      input:
        "Je suis passionne par le developpement web et je veux trouver un emploi dans ce domaine",
      output: "developpeur web",
    },
    {
      input:
        "Je suis un amateur de cuisine et je veux devenir un chef professionnel",
      output: "cuisinier",
    },
    {
      input:
        "Quels sont les postes disponibles pour un ingenieur logiciel experimente",
      output: "ingenieur logiciel",
    },
    {
      input:
        "Je suis interesse par un poste d analyste de donnees dans une entreprise de haute technologie",
      output: "analyste de donnees",
    },
    {
      input: "Je cherche des offres pour un chef de projet informatique",
      output: "chef de projet",
    },
    { input: "Recherche développeur front end", output: "developpeur web" },
    { input: "Emploi developpeur web", output: "developpeur web" },
    { input: "Opportunité developpeur web", output: "developpeur web" },
    { input: "Poste developpeur web", output: "developpeur web" },
    { input: "Offre developpeur web", output: "developpeur web" },
    { input: "Cherche developpeur web", output: "developpeur web" },
    { input: "Travail developpeur web", output: "developpeur web" },
    { input: "Carrière developpeur web", output: "developpeur web" },
    { input: "Recrutement developpeur web", output: "developpeur web" },
    { input: "Mission developpeur web", output: "developpeur web" },
    { input: "Emploi cuisinier restaurant", output: "cuisinier" },
    { input: "Cherche cuisinier qualifie", output: "cuisinier" },
    { input: "Recrutement cuisinier", output: "cuisinier" },
    { input: "Opportunité cuisinier", output: "cuisinier" },
    { input: "Poste cuisinier gastronomique", output: "cuisinier" },
    { input: "Travail cuisinier professionnel", output: "cuisinier" },
    { input: "Recherche cuisinier expérimenté", output: "cuisinier" },
    { input: "Mission cuisinier", output: "cuisinier" },
    { input: "Offre cuisinier", output: "cuisinier" },
    { input: "Carrière cuisinier", output: "cuisinier" },
    { input: "Emploi ingénieur informatique", output: "ingenieur logiciel" },
    {
      input: "Cherche ingénieur logiciel expérimenté",
      output: "ingenieur logiciel",
    },
    {
      input: "Recrutement ingénieur développement",
      output: "ingenieur logiciel",
    },
    { input: "Opportunité ingénieur R&D", output: "ingenieur logiciel" },
    {
      input: "Poste ingénieur logiciel embarqué",
      output: "ingenieur logiciel",
    },
    { input: "Offre ingénieur système", output: "ingenieur logiciel" },
    { input: "Travail ingénieur software", output: "ingenieur logiciel" },
    {
      input: "Recherche ingénieur génie logiciel",
      output: "ingenieur logiciel",
    },
    { input: "Mission ingénieur conception", output: "ingenieur logiciel" },
    { input: "Emploi analyste big data", output: "analyste de donnees" },
    { input: "Cherche analyste statistique", output: "analyste de donnees" },
    {
      input: "Recrutement analyste business intelligence",
      output: "analyste de donnees",
    },
    { input: "Opportunité analyste datamining", output: "analyste de donnees" },
    {
      input: "Poste analyste intelligence artificielle",
      output: "analyste de donnees",
    },
    { input: "Offre analyste données clients", output: "analyste de donnees" },
    {
      input: "Travail analyste informatique décisionnelle",
      output: "analyste de donnees",
    },
    {
      input: "Recherche analyste données financières",
      output: "analyste de donnees",
    },
    {
      input: "Mission analyste marketing numérique",
      output: "analyste de donnees",
    },
    {
      input: "Carrière analyste scientifique des données",
      output: "analyste de donnees",
    },
    { input: "Emploi chef de projet informatique", output: "chef de projet" },
    { input: "Cherche chef de projet agile", output: "chef de projet" },
    { input: "Recrutement chef de projet technique", output: "chef de projet" },
    { input: "Opportunité chef de projet digital", output: "chef de projet" },
    { input: "Poste chef de projet senior", output: "chef de projet" },
    { input: "Offre chef de projet IT", output: "chef de projet" },
    { input: "Travail chef de projet marketing", output: "chef de projet" },
    { input: "Recherche chef de projet fonctionnel", output: "chef de projet" },
    { input: "Mission chef de projet ERP", output: "chef de projet" },
    {
      input: "Carrière chef de projet international",
      output: "chef de projet",
    },
    { input: "Emploi spécialiste cybersécurité", output: "cybersecurite" },
    { input: "Cherche expert sécurité informatique", output: "cybersecurite" },
    { input: "Recrutement analyste cyberdéfense", output: "cybersecurite" },
    { input: "Opportunité ingénieur cryptographie", output: "cybersecurite" },
  ]);

  //rennomez
  var intentClassifierOuiNon = new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor,
  });

  // Train and test:
  intentClassifierOuiNon.trainBatch([
    { input: "oui", output: "oui" },
    { input: "je veux bien", output: "oui" },
    { input: "d accord", output: "oui" },
    { input: "certainement", output: "oui" },
    { input: "absolument", output: "oui" },
    { input: "pas de probleme", output: "oui" },
    { input: "non", output: "non" },
    { input: "non merci", output: "non" },
    { input: "je passe mon tour", output: "non" },
    { input: "je decline", output: "non" },
    { input: "pas interesse", output: "non" },
    { input: "", output: "non" },
  ]);

  const jobs = await job.getAllJobs();
  const questionInscription = prompt("Voulez-vous vous inscrire (oui/non) ?");
  predicted_response_inscription =
    intentClassifierOuiNon.classify(questionInscription);
  let currentUser;
  if (predicted_response_inscription[0] == "oui") {
    const nom = prompt("Bonjour, veuillez entrer votre nom :");
    const prenom = prompt("Votre prénom :");
    currentUser = await user.createUser(prenom, nom);
    console.log(
      "Inscription réussie ! " + prenom + " " + nom + " est inscrit."
    );
  } else {
    do {
      const nom = prompt("Bonjour, veuillez entrer votre nom :");
      const prenom = prompt("Votre prénom :");
      try {
        currentUser = await user.getUserByName(prenom, nom);
        if (!currentUser) {
          console.log("Utilisateur non trouvé. Veuillez réessayer.");
        }
        if (currentUser) {
          console.log("Bienvenue " + prenom + " " + nom + ", vous êtes connecté.");
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données de l'utilisateur :",
          error
        );
      }
    } while (!currentUser);
  }

  console.log(
    "Vous pouvez : Consulter des offres d'emplois & Postuler, Consulter vos candidatures"
  );
  const questionAsk = prompt(
    "Voulez vous consulter des offres d'emplois ou vos candidatures ?"
  );
  predicted_response = intentClassifier.classify(questionAsk);
  if (predicted_response[0] == "emplois") {
    const questionsEmplois = prompt("Que recherchez-vous ?");
    predicted_response_type_emploi =
      intentClassifierTypeEmploi.classify(questionsEmplois);
    for (iJob of jobs) {
      if (iJob.job_type == predicted_response_type_emploi[0]) {
        console.log("Voici la liste de jobs pour le poste : ");
        console.log(
          iJob["titre_poste"] + " - ",
          iJob["companie"] + " - ",
          iJob["location"] + " - ",
          iJob["salaire"] + " €"
        );
        const questionsPostuler = prompt("Voulez-vous y postuler (oui/non) ?");
        predicted_response_postuler =
          intentClassifierOuiNon.classify(questionsPostuler);
        if (predicted_response_postuler[0] == "oui") {
          const listcandidature = await candidature.createCandidature(
            currentUser.id,
            iJob.id
          );
          const questionsCountCandidatures = prompt(
            "Votre candidature a été envoyée. Voulez-vous voir le nombre de candidatures envoyées ?"
          );
          predicted_response_count_candidature =
            intentClassifierOuiNon.classify(questionsCountCandidatures);
          if (predicted_response_count_candidature == "oui") {
            console.log(
              "Le nombre de candidatures à ce poste : " + listcandidature.length
            );
            console.log("Au revoir.");
            return;
          }
          if (predicted_response_count_candidature == "non") {
            console.log("Au revoir.");
            return;
          }
        }
        if (predicted_response_postuler[0] == "non") {
          console.log("Au revoir.");
          return;
        }
      }
    }
  }

  if (predicted_response[0] == "candidatures") {
    const yourCandidatures = await candidature.getCandidatureByUserId(
      currentUser.id
    );
    if (yourCandidatures.length == 0) {
      return console.log("Vous n'avez pas encore postulé à un poste.");
    }
    console.log("Voici la liste de vos candidatures : ");
    yourCandidatures.forEach(async (candidature) => {
      const iJob = await job.getJobById(candidature.id_job);
      console.log(
        iJob.titre_poste +
          " - " +
          iJob.companie +
          " - " +
          iJob.location +
          " - " +
          iJob.salaire +
          " €"
      );
    });
  }
})();
