import { plural } from '../plural';
import type { Messages } from './en';

const p = plural('fr');

const messages: Messages = {
	common: {
		createPoll: 'Créer un sondage',
		createAPoll: 'Créez un sondage',
		goHome: 'Retour à l’accueil',
		loading: 'Chargement',
		opensInNewTab: '(s’ouvre dans un nouvel onglet)',
		votes: (count: number) => p(count, { one: '# vote', many: '# de votes', other: '# votes' })
	},
	layout: {
		skipToContent: 'Aller au contenu principal'
	},
	header: {
		mainNavigation: 'Navigation principale',
		home: 'Accueil de Pollmodoro',
		yourPolls: 'Vos sondages',
		toggleTheme: 'Activer ou désactiver le mode sombre',
		language: 'Langue'
	},
	footer: {
		builtBy: 'Fait avec 🍅 par {author}',
		source: 'Code source sur GitHub'
	},
	home: {
		metaTitle: 'Pollmodoro · Sondages rapides, sans inscription',
		metaDescription:
			'Pollmodoro est un outil gratuit de création de sondages, sans inscription. Rédigez une question, partagez le lien et suivez les résultats en direct.',
		ogDescription:
			'Rédigez une question, partagez le lien et suivez les résultats en direct. Gratuit, sans compte nécessaire.',
		heroTitle: 'Créez un sondage. Partagez un lien. Voyez les votes.',
		heroText:
			'Pollmodoro est un outil gratuit de création de sondages, sans inscription. Rédigez une question, ajoutez jusqu’à dix options et envoyez le lien à ceux qui doivent répondre. Les résultats se mettent à jour en direct à mesure que les votes arrivent.',
		seeExample: 'Voir un exemple de sondage',
		howItWorks: 'Comment ça marche',
		steps: {
			write: {
				title: 'Rédigez la question',
				text: 'Ajoutez un titre, une description facultative et de deux à dix options. Choisissez si les participants peuvent en sélectionner plusieurs.'
			},
			share: {
				title: 'Partagez le lien',
				text: 'Chaque sondage a son propre lien. Collez-le dans une conversation, un e-mail ou une publication. Personne n’a besoin de compte pour voter.'
			},
			watch: {
				title: 'Suivez les résultats',
				text: 'Les votes apparaissent au fur et à mesure, avec les totaux et les pourcentages. Gardez la page ouverte pour qu’elle reste à jour.'
			}
		},
		goodToKnow: 'Bon à savoir',
		details: {
			noAccounts: {
				title: 'Aucun compte',
				text: 'Rien à créer. Les sondages que vous créez sont mémorisés dans ce navigateur, sous « Vos sondages ».'
			},
			anonymous: {
				title: 'Vote anonyme',
				text: 'Voter ne demande ni nom ni adresse e-mail.'
			},
			choice: {
				title: 'Choix unique ou multiple',
				text: 'Laissez les participants choisir une option, ou autant qu’ils le souhaitent.'
			},
			bots: {
				title: 'Protection contre les robots',
				text: 'La création d’un sondage et le vote passent par Cloudflare Turnstile pour bloquer les votes automatisés.'
			},
			free: {
				title: 'Gratuit',
				text: 'Il n’existe pas de version payante, et le nombre de sondages n’est pas limité.'
			},
			openSource: {
				title: 'Code ouvert',
				text: 'Conçu avec SvelteKit et Cloudflare Workers. Le code est disponible sur GitHub.'
			}
		},
		closingTitle: 'C’est aussi simple que ça.',
		closingText: 'Une question, quelques options et un lien à partager.'
	},
	preview: {
		label: 'Exemple de sondage',
		badge: 'Sondage d’exemple',
		question: 'Où allons-nous déjeuner vendredi ?',
		options: ['La pizzeria du coin', 'Tacos', 'Sushi', 'Peu importe, je ne suis pas difficile'],
		footer: (count: number) =>
			p(count, {
				one: '# vote · résultats mis à jour en direct',
				many: '# de votes · résultats mis à jour en direct',
				other: '# votes · résultats mis à jour en direct'
			})
	},
	createPoll: {
		metaDescription:
			'Rédigez une question, ajoutez quelques options et obtenez un lien à partager.',
		intro: 'Posez une question, ajoutez quelques options, et vous obtiendrez un lien à partager.',
		question: 'Question',
		questionPlaceholder: 'Que voulez-vous demander ?',
		description: 'Description',
		optional: '(facultatif)',
		descriptionPlaceholder: 'Ajoutez du contexte, si besoin.',
		options: 'Options',
		optionsHint: (min: number, max: number) =>
			`Entre ${min} et ${max} options parmi lesquelles les participants peuvent choisir.`,
		optionPlaceholder: (position: number) => `Option ${position}`,
		removeOption: (position: number) => `Supprimer l’option ${position}`,
		addOption: 'Ajouter une option',
		allowMultiple: 'Autoriser plusieurs choix',
		allowMultipleDescription: 'Les votants peuvent sélectionner plus d’une option.',
		submitting: 'Création du sondage…',
		verificationRequired: 'Veuillez d’abord effectuer la vérification.',
		failed: 'Le sondage n’a pas pu être créé. Veuillez réessayer.',
		errors: {
			questionRequired: 'Une question est requise',
			optionRequired: 'Une option ne peut pas être vide',
			tooLong: (max: number) =>
				p(max, {
					one: 'Moins de # caractère',
					many: 'Moins de # de caractères',
					other: 'Moins de # caractères'
				}),
			tooFewOptions: (min: number) =>
				p(min, {
					one: 'Ajoutez au moins # option',
					many: 'Ajoutez au moins # d’options',
					other: 'Ajoutez au moins # options'
				}),
			tooManyOptions: (max: number) =>
				p(max, {
					one: 'Vous pouvez ajouter jusqu’à # option',
					many: 'Vous pouvez ajouter jusqu’à # d’options',
					other: 'Vous pouvez ajouter jusqu’à # options'
				})
		}
	},
	vote: {
		metaDescription: (title: string) => `Votez sur « ${title} » sur Pollmodoro.`,
		ogDescription: 'Votez dans ce sondage et suivez les résultats en direct.',
		votesLabel: 'Votes',
		typeLabel: 'Type',
		createdLabel: 'Créé',
		multipleChoice: 'Choix multiple',
		singleChoice: 'Choix unique',
		createdOn: (date: string) => `Créé le ${date}`,
		pickOneOrMore: 'Choisissez une ou plusieurs options',
		pickOne: 'Choisissez une option',
		optionVotes: (percentage: string, option: string) => `${percentage} des votes pour ${option}`,
		submit: 'Voter',
		submitMany: (count: number) =>
			p(count, {
				one: 'Voter pour # option',
				many: 'Voter pour # d’options',
				other: 'Voter pour # options'
			}),
		submitting: 'Envoi…',
		submittingStatus: 'Envoi de votre vote.',
		cannotVoteStatus: 'Choisissez une option et effectuez la vérification pour voter.',
		success: 'Votre vote a bien été enregistré.',
		failed: 'Votre vote n’a pas pu être envoyé. Veuillez réessayer.',
		verification: 'Vérification que vous êtes humain',
		disclaimer:
			'Ce sondage a été créé par un utilisateur de Pollmodoro. Son contenu n’est ni créé ni approuvé par Pollmodoro.'
	},
	share: {
		title: 'Partager ce sondage',
		text: 'Toute personne disposant du lien peut voter.',
		link: 'Lien du sondage',
		copy: 'Copier',
		copied: 'Lien copié dans le presse-papiers.',
		copyFailed: 'Le lien n’a pas pu être copié.',
		emailBody: (url: string) => `Votez sur ce sondage : ${url}`,
		byEmail: 'Partager par e-mail',
		on: (network: string) => `Partager sur ${network}`
	},
	createYourOwn: {
		title: 'Vous avez une question à poser ?',
		text: 'Les sondages sont gratuits et prennent environ une minute à configurer. Aucun compte nécessaire.'
	},
	pollNotFound: {
		title: 'Sondage introuvable',
		text: 'Ce sondage n’existe pas, ou le lien est incorrect. Vérifiez l’adresse ou créez un nouveau sondage.'
	},
	mascot: {
		title: 'Mascotte',
		poke: 'Chatouiller la mascotte'
	},
	yourPolls: {
		intro:
			'Sondages que vous avez créés dans ce navigateur. La liste est enregistrée localement : elle n’apparaît donc pas sur d’autres appareils, et elle disparaît si vous effacez les données du navigateur (les sondages eux-mêmes restent en ligne).',
		loading: 'Chargement de vos sondages',
		empty: 'Vous n’avez encore créé aucun sondage dans ce navigateur.'
	},
	error: {
		notFoundTitle: 'Page introuvable',
		notFoundText: 'Il n’y a rien à cette adresse. Vérifiez le lien ou revenez à l’accueil.',
		title: 'Une erreur est survenue',
		serverText: 'Le serveur a rencontré une erreur. Veuillez réessayer dans un instant.',
		text: 'Une erreur inattendue est survenue. Veuillez réessayer.',
		tryAgain: 'Réessayer'
	}
};

export default messages;
