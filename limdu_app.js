var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./JobModel');
const user = require('./UserModel');
const candidature = require('./CandidatureModel');

(async function() {
	// First, define our base classifier type (a multi-label classifier based on winnow):
	var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
		binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
	});

	// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
	var WordExtractor = function(input, features) {
		input.split(" ").forEach(function(word) {
			features[word]=1;
		});
	};

	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifier = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifier.trainBatch([
		{input: "Je veux consulter des offres d emplois", output: "emplois"},
		{input: "Je recherche un emploi", output: "emplois"},
		{input: "Ou puis je trouver des offres d emplois", output: "emplois"},
		{input: "Quels sont les postes disponibles", output: "emplois"},
		{input: "Comment puis je postuler à un emploi", output: "emplois"},
		{input: "Je veux soumettre ma candidature", output: "candidatures"},
		{input: "Comment puis je me porter candidat à un poste", output: "candidatures"},
		{input: "Je cherche des informations sur le processus de recrutement", output: "candidatures"}
	]);

	var intentClassifierTypeEmploi = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifierTypeEmploi.trainBatch([
		{input: "Je cherche un poste de developpeur backend", output: "developpeur web"},
		{input: "Je voudrais travailler comme patissier", output: "cuisinier"},
		{input: "Ou puis je trouver des annonces pour un developpeur junior", output: "developpeur"},
		{input: "Quels postes sont disponibles pour un ingenieur en informatique", output: "ingenieur logiciel"},
		{input: "Je suis interesse par un emploi danalyste de donnees senior", output: "analyste de donnees"},
		{input: "Je cherche des offres pour un chef de projet technique", output: "chef de projet"},
		{input: "Comment puis je obtenir un emploi dans le domaine de la securite informatique", output: "cybersecurite"},
		{input: "Je recherche un poste de developpeur frontend", output: "developpeur web"},
		{input: "Je veux devenir chef cuisinier dans un restaurant etoile", output: "cuisinier"},
		{input: "Ou puis je postuler pour un emploi de developpeur Android", output: "developpeur"},
		{input: "Quelles sont les opportunites pour un ingenieur en genie logiciel", output: "ingenieur logiciel"},
		{input: "Je suis a la recherche d un emploi danalyste de donnees en finance", output: "analyste de donnees"},
		{input: "Je cherche des offres pour un chef de projet agile", output: "chef de projet"},
		{input: "Comment puis je trouver des emplois dans le domaine de la cybersecurite pour les debutants", output: "cybersecurite"},
		{input: "Je suis passionne par le developpement web et je veux trouver un emploi dans ce domaine", output: "developpeur web"},
		{input: "Je suis un amateur de cuisine et je veux devenir un chef professionnel", output: "cuisinier"},
		{input: "Ou puis je trouver des offres d emploi pour un developpeur fullstack", output: "developpeur"},
		{input: "Quels sont les postes disponibles pour un ingenieur logiciel experimente", output: "ingenieur logiciel"},
		{input: "Je suis interesse par un poste d analyste de donnees dans une entreprise de haute technologie", output: "analyste de donnees"},
		{input: "Je cherche des offres pour un chef de projet informatique", output: "chef de projet"}
	]);

	//rennomez 
	var intentClassifierPostuler = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifierPostuler.trainBatch([
		{input: "oui", output: "oui"},
		{input: "je veux bien", output: "oui"},
		{input: "d accord", output: "oui"},
		{input: "certainement", output: "oui"},
		{input: "absolument", output: "oui"},
		{input: "pas de probleme", output: "oui"},
		{input: "non", output: "non"},
		{input: "non merci", output: "non"},
		{input: "je passe mon tour", output: "non"},
		{input: "je decline", output: "non"},
		{input: "pas interesse", output: "non"}
	]);

	const jobs = await db.getAllJobs()
	let currentuser;
	do 
	{
		const nom = prompt('Bonjour, veuillez entrer votre nom :')
		const prenom = prompt('Votre prénom :')
		currentuser = await user.getUserByName(prenom, nom)
	} while (typeof currentuser == undefined);

	console.log("Vous pouvez : Consulter des offres d'emplois & Postuler, Consulter vos candidatures")
	const questionAsk = prompt("Voulez vous consulter des offres d'emplois ou vos candidatures ?")
	predicted_response = intentClassifier.classify(questionAsk);
	if(predicted_response[0] == 'emplois'){
		const questionsEmplois = prompt("Que recherchez-vous ?")
		predicted_response_type_emploi = intentClassifierTypeEmploi.classify(questionsEmplois)
		for(job of jobs) {
			if (job.job_type == predicted_response_type_emploi[0]) {
				console.log("Voici la liste de jobs pour le poste de ${job.job_type}")
				console.log(job['titre_poste'],job['job_type'],job['companie'],job['location'],job['salaire'])
				const questionsPostuler = prompt("Voulez-vous y postuler (oui/non) ?")
				predicted_response_postuler = intentClassifierPostuler.classify(questionsPostuler)
				if(predicted_response_postuler[0] == "oui"){
					const listcandidature = await candidature.createCandidature(currentuser.id, job.id)
					const questionsCountCandidatures = prompt("Votre candidature a été envoyée. Voulez-vous voir le nombre de candidatures envoyées ?")
					predicted_response_count_candidature = intentClassifierPostuler.classify(questionsCountCandidatures)
					if(predicted_response_count_candidature == "oui"){
						console.log("Le nombre de candidatures à ce poste : "+ listcandidature.length)
					}
					if(predicted_response_count_candidature == "non"){
						console.log("Au revoir.")
					}
				}
				if(predicted_response_postuler[0] == "non"){ console.log("Au revoir.") }
			}
		}

	}

	if(predicted_response[0] == 'candidatures'){
		console.log('candidatures');
	}

})()