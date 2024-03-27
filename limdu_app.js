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
    { input: "Je suis a la recherche de nouvelles opportunites professionnelles", output: "emplois" },
    { input: "J'aimerais decouvrir les postes vacants disponibles", output: "emplois" },
    { input: "Je souhaite explorer les offres d emploi dans mon domaine", output: "emplois" },
    { input: "Je suis interesse par les opportunites de carriere actuellement disponibles", output: "emplois" },
    { input: "J aspire à trouver un emploi correspondant a mes competences et e mes interets", output: "emplois" },
    { input: "Je désire consulter les offres d emploi pour elargir mes horizons professionnels", output: "emplois" },
    { input: "Je suis curieux de voir ce que le marche du travail a a offrir", output: "emplois" },
    { input: "Je suis motive à trouver un emploi qui correspond a mes objectifs professionnels", output: "emplois" },
    { input: "J ai hate de decouvrir de nouvelles opportunites professionnelles excitantes", output: "emplois" },
    { input: "Je suis ouvert a explorer de nouveaux defis professionnels et a contribuer de maniere significative", output: "emplois" },

    { input: "Je souhaite suivre l evolution de mes candidatures recentes", output: "candidatures" },
    { input: "J aimerais connaitre le statut de mes demandes d emploi en cours", output: "candidatures" },
    { input: "Je voudrais verifier les reponses aux candidatures que j ai soumises", output: "candidatures" },
    { input: "Je desire consulter les retours des entreprises sur mes candidatures", output: "candidatures" },
    { input: "Je suis intéresse par l avancement de mes demarches pour trouver un emploi", output: "candidatures" },
    { input: "Je veux m assurer que mes candidatures sont bien prises en consideration", output: "candidatures" },
    { input: "Je suis motive a suivre de pres mes progres dans ma recherche d emploi", output: "candidatures" },
    { input: "Je souhaite suivre l evolution de mes candidatures recentes", output: "candidatures" },
    { input: "J aimerais connaître le statut actuel de mes demandes d emploi", output: "candidatures" },
    { input: "Je voudrais verifier les reponses reçues suite a mes soumissions de candidatures", output: "candidatures" },
    { input: "Je desire consulter les retours des entreprises concernant mes candidatures", output: "candidatures" },
    { input: "Je suis interesse par le suivi de mes demarches pour trouver un emploi", output: "candidatures" },
    { input: "Je souhaite m assurer que mes candidatures sont prises en consideration comme il se doit", output: "candidatures" },
    { input: "Je suis motive a observer de pres mes avancees dans ma quete d emploi", output: "candidatures" },
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
      input: "Ou puis je trouver des annonces pour un developpeur junior",
      output: "developpeur",
    },
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
      input: "Ou puis je postuler pour un emploi de developpeur Android",
      output: "developpeur",
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
        "Ou puis je trouver des offres d emploi pour un developpeur fullstack",
      output: "developpeur",
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
  ]);

  const jobs = await job.getAllJobs();
  let currentUser;
  do {
    const nom = prompt("Bonjour, veuillez entrer votre nom :");
    const prenom = prompt("Votre prénom :");
    try {
      currentUser = await user.getUserByName(prenom, nom);
      if (!currentUser) {
        console.log("Utilisateur non trouvé. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur :", error);
    }
  } while (!currentUser);

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
        console.log("Voici la liste de jobs pour le poste de ${job.job_type}");
        console.log(
          iJob["titre_poste"],
          iJob["job_type"],
          iJob["companie"],
          iJob["location"],
          iJob["salaire"]
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
      console.log(iJob.titre_poste);
    });

    console.log("Voilà vos candidatures, Au revoir !");
  }
})();
