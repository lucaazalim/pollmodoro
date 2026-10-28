import { plural } from '../plural';
import type { Messages } from './en';

const p = plural('de');

const messages: Messages = {
	common: {
		createPoll: 'Umfrage erstellen',
		createAPoll: 'Eine Umfrage erstellen',
		goHome: 'Zur Startseite',
		loading: 'Wird geladen',
		opensInNewTab: '(öffnet in einem neuen Tab)',
		votes: (count: number) => p(count, { one: '# Stimme', other: '# Stimmen' })
	},
	layout: {
		skipToContent: 'Zum Hauptinhalt springen'
	},
	header: {
		mainNavigation: 'Hauptnavigation',
		home: 'Pollmodoro-Startseite',
		yourPolls: 'Deine Umfragen',
		toggleTheme: 'Dunkelmodus umschalten',
		language: 'Sprache'
	},
	footer: {
		builtBy: 'Gebaut mit 🍅 von {author}',
		source: 'Quellcode auf GitHub'
	},
	home: {
		metaTitle: 'Pollmodoro · Schnelle Umfragen ohne Anmeldung',
		metaDescription:
			'Pollmodoro ist ein kostenloser Umfrage-Ersteller ohne Anmeldung. Stell eine Frage, teile den Link und sieh zu, wie die Ergebnisse live aktualisiert werden.',
		ogDescription:
			'Stell eine Frage, teile den Link und sieh zu, wie die Ergebnisse live aktualisiert werden. Kostenlos, ohne Konto.',
		heroTitle: 'Erstelle eine Umfrage. Teile einen Link. Sieh dir die Stimmen an.',
		heroText:
			'Pollmodoro ist ein kostenloser Umfrage-Ersteller ohne Anmeldung. Stell eine Frage, füge bis zu zehn Optionen hinzu und schick den Link an alle, die antworten sollen. Die Ergebnisse aktualisieren sich live, sobald Stimmen eingehen.',
		seeExample: 'Beispielumfrage ansehen',
		howItWorks: 'So funktioniert’s',
		steps: {
			write: {
				title: 'Die Frage schreiben',
				text: 'Füge einen Titel, optional eine Beschreibung und zwei bis zehn Optionen hinzu. Lege fest, ob mehrere Antworten erlaubt sind.'
			},
			share: {
				title: 'Den Link teilen',
				text: 'Jede Umfrage bekommt einen eigenen Link. Füge ihn in einen Chat, eine E-Mail oder einen Beitrag ein. Zum Abstimmen braucht niemand ein Konto.'
			},
			watch: {
				title: 'Die Ergebnisse verfolgen',
				text: 'Stimmen erscheinen, sobald sie eingehen, mit Anzahl und Prozenten. Lass die Seite offen, dann bleibt sie aktuell.'
			}
		},
		goodToKnow: 'Gut zu wissen',
		details: {
			noAccounts: {
				title: 'Keine Konten',
				text: 'Du musst dich nicht anmelden. Umfragen, die du erstellst, werden in diesem Browser unter „Deine Umfragen“ gespeichert.'
			},
			anonymous: {
				title: 'Anonyme Abstimmung',
				text: 'Für die Abstimmung werden kein Name und keine E-Mail-Adresse abgefragt.'
			},
			choice: {
				title: 'Einzel- oder Mehrfachauswahl',
				text: 'Lass die Leute eine Option wählen oder so viele, wie sie möchten.'
			},
			bots: {
				title: 'Schutz vor Bots',
				text: 'Beim Erstellen einer Umfrage und beim Abstimmen wird Cloudflare Turnstile genutzt, damit automatisierte Stimmen draußen bleiben.'
			},
			free: {
				title: 'Kostenlos',
				text: 'Es gibt keine kostenpflichtige Version und keine Begrenzung der Anzahl an Umfragen.'
			},
			openSource: {
				title: 'Open Source',
				text: 'Gebaut mit SvelteKit und Cloudflare Workers. Der Code ist auf GitHub.'
			}
		},
		closingTitle: 'Mehr ist es nicht.',
		closingText: 'Eine Frage, ein paar Optionen und ein Link zum Teilen.'
	},
	preview: {
		label: 'Beispiel für eine Umfrage',
		badge: 'Beispielumfrage',
		question: 'Wohin sollen wir am Freitag zum Mittagessen gehen?',
		options: ['Die Pizzeria um die Ecke', 'Tacos', 'Sushi', 'Egal, ich bin nicht wählerisch'],
		footer: (count: number) =>
			p(count, {
				one: '# Stimme · Ergebnisse werden live aktualisiert',
				other: '# Stimmen · Ergebnisse werden live aktualisiert'
			})
	},
	createPoll: {
		metaDescription:
			'Stell eine Frage, füge ein paar Optionen hinzu und erhalte einen Link zum Teilen.',
		intro: 'Stell eine Frage, füge ein paar Optionen hinzu, und du erhältst einen Link zum Teilen.',
		question: 'Frage',
		questionPlaceholder: 'Was möchtest du fragen?',
		description: 'Beschreibung',
		optional: '(optional)',
		descriptionPlaceholder: 'Gib bei Bedarf etwas Kontext an.',
		options: 'Optionen',
		optionsHint: (min: number, max: number) =>
			`Zwischen ${min} und ${max} Optionen, unter denen die Leute wählen können.`,
		optionPlaceholder: (position: number) => `Option ${position}`,
		removeOption: (position: number) => `Option ${position} entfernen`,
		addOption: 'Option hinzufügen',
		allowMultiple: 'Mehrfachauswahl erlauben',
		allowMultipleDescription: 'Teilnehmende können mehr als eine Option wählen.',
		submitting: 'Umfrage wird erstellt…',
		verificationRequired: 'Bitte schließe zuerst die Überprüfung ab.',
		failed: 'Die Umfrage konnte nicht erstellt werden. Bitte versuche es erneut.',
		errors: {
			questionRequired: 'Eine Frage ist erforderlich',
			optionRequired: 'Eine Option darf nicht leer sein',
			tooLong: (max: number) =>
				p(max, { one: 'Maximal # Zeichen erlaubt', other: 'Maximal # Zeichen erlaubt' }),
			tooFewOptions: (min: number) =>
				p(min, {
					one: 'Füge mindestens # Option hinzu',
					other: 'Füge mindestens # Optionen hinzu'
				}),
			tooManyOptions: (max: number) =>
				p(max, {
					one: 'Du kannst bis zu # Option hinzufügen',
					other: 'Du kannst bis zu # Optionen hinzufügen'
				})
		}
	},
	vote: {
		metaDescription: (title: string) => `Stimme bei „${title}“ auf Pollmodoro ab.`,
		ogDescription: 'Stimme bei dieser Umfrage ab und sieh die Ergebnisse live.',
		votesLabel: 'Stimmen',
		typeLabel: 'Typ',
		createdLabel: 'Erstellt',
		multipleChoice: 'Mehrfachauswahl',
		singleChoice: 'Einzelauswahl',
		createdOn: (date: string) => `Erstellt am ${date}`,
		pickOneOrMore: 'Wähle eine oder mehrere Optionen',
		pickOne: 'Wähle eine Option',
		optionVotes: (percentage: string, option: string) => `${percentage} der Stimmen für ${option}`,
		submit: 'Abstimmen',
		submitMany: (count: number) =>
			p(count, { one: 'Für # Option abstimmen', other: 'Für # Optionen abstimmen' }),
		submitting: 'Stimme wird abgegeben…',
		submittingStatus: 'Deine Stimme wird abgegeben.',
		cannotVoteStatus: 'Wähle eine Option und schließe die Überprüfung ab, um abzustimmen.',
		success: 'Deine Stimme ist angekommen.',
		failed: 'Deine Stimme konnte nicht abgegeben werden. Bitte versuche es erneut.',
		verification: 'Überprüfung, dass du ein Mensch bist',
		disclaimer:
			'Diese Umfrage wurde von einem Pollmodoro-Nutzer erstellt. Ihr Inhalt wird weder von Pollmodoro erstellt noch unterstützt.'
	},
	share: {
		title: 'Diese Umfrage teilen',
		text: 'Jeder mit dem Link kann abstimmen.',
		link: 'Link zur Umfrage',
		copy: 'Kopieren',
		copied: 'Link in die Zwischenablage kopiert.',
		copyFailed: 'Der Link konnte nicht kopiert werden.',
		emailBody: (url: string) => `Stimme bei dieser Umfrage ab: ${url}`,
		byEmail: 'Per E-Mail teilen',
		on: (network: string) => `Auf ${network} teilen`
	},
	createYourOwn: {
		title: 'Hast du eine eigene Frage?',
		text: 'Umfragen sind kostenlos und in etwa einer Minute eingerichtet. Kein Konto nötig.'
	},
	pollNotFound: {
		title: 'Umfrage nicht gefunden',
		text: 'Diese Umfrage existiert nicht, oder der Link ist falsch. Prüfe die Adresse oder erstelle eine neue Umfrage.'
	},
	yourPolls: {
		intro:
			'Umfragen, die du in diesem Browser erstellt hast. Die Liste wird lokal gespeichert und erscheint daher nicht auf anderen Geräten. Wenn du die Browserdaten löschst, wird sie entfernt (die Umfragen selbst bleiben online).',
		loading: 'Deine Umfragen werden geladen',
		empty: 'Du hast in diesem Browser noch keine Umfragen erstellt.'
	},
	error: {
		notFoundTitle: 'Seite nicht gefunden',
		notFoundText:
			'Unter dieser Adresse gibt es nichts. Prüfe den Link oder geh zurück zur Startseite.',
		title: 'Etwas ist schiefgelaufen',
		serverText: 'Der Server hat einen Fehler gemeldet. Bitte versuche es in einem Moment erneut.',
		text: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.',
		tryAgain: 'Erneut versuchen'
	}
};

export default messages;
