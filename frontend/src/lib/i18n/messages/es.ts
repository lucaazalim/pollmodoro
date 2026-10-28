import { plural } from '../plural';
import type { Messages } from './en';

const p = plural('es');

const messages: Messages = {
	common: {
		createPoll: 'Crear encuesta',
		createAPoll: 'Crea una encuesta',
		goHome: 'Ir al inicio',
		loading: 'Cargando',
		opensInNewTab: '(se abre en una pestaña nueva)',
		votes: (count: number) => p(count, { one: '# voto', many: '# de votos', other: '# votos' })
	},
	layout: {
		skipToContent: 'Saltar al contenido principal'
	},
	header: {
		mainNavigation: 'Navegación principal',
		home: 'Inicio de Pollmodoro',
		yourPolls: 'Tus encuestas',
		toggleTheme: 'Cambiar modo oscuro',
		language: 'Idioma'
	},
	footer: {
		builtBy: 'Hecho con 🍅 por {author}',
		source: 'Código en GitHub'
	},
	home: {
		metaTitle: 'Pollmodoro · Encuestas rápidas, sin registro',
		metaDescription:
			'Pollmodoro es un creador de encuestas gratuito y sin registro. Escribe una pregunta, comparte el enlace y mira cómo se actualizan los resultados en directo.',
		ogDescription:
			'Escribe una pregunta, comparte el enlace y mira cómo se actualizan los resultados en directo. Gratis, sin necesidad de cuenta.',
		heroTitle: 'Crea una encuesta. Comparte un enlace. Mira los votos.',
		heroText:
			'Pollmodoro es un creador de encuestas gratuito y sin registro. Escribe una pregunta, añade hasta diez opciones y envía el enlace a quien tenga que responder. Los resultados se actualizan en directo a medida que llegan los votos.',
		seeExample: 'Ver una encuesta de ejemplo',
		howItWorks: 'Cómo funciona',
		steps: {
			write: {
				title: 'Escribe la pregunta',
				text: 'Añade un título, una descripción opcional y entre dos y diez opciones. Decide si la gente puede elegir más de una.'
			},
			share: {
				title: 'Comparte el enlace',
				text: 'Cada encuesta tiene su propio enlace. Pégalo en un chat, en un correo o en una publicación. Nadie necesita una cuenta para votar.'
			},
			watch: {
				title: 'Mira los resultados',
				text: 'Los votos aparecen según llegan, con recuentos y porcentajes. Deja la página abierta y se mantendrá actualizada.'
			}
		},
		goodToKnow: 'Conviene saber',
		details: {
			noAccounts: {
				title: 'Sin cuentas',
				text: 'No hay nada que registrar. Las encuestas que creas se guardan en este navegador en «Tus encuestas».'
			},
			anonymous: {
				title: 'Votación anónima',
				text: 'Votar no pide nombre ni correo electrónico.'
			},
			choice: {
				title: 'Opción única o múltiple',
				text: 'Deja que la gente elija una opción o tantas como quiera.'
			},
			bots: {
				title: 'Protección contra bots',
				text: 'Crear una encuesta y votar pasan por Cloudflare Turnstile para evitar votos automatizados.'
			},
			free: {
				title: 'Gratis',
				text: 'No hay versión de pago ni límite de encuestas.'
			},
			openSource: {
				title: 'Código abierto',
				text: 'Hecho con SvelteKit y Cloudflare Workers. El código está en GitHub.'
			}
		},
		closingTitle: 'Así de sencillo.',
		closingText: 'Una pregunta, unas cuantas opciones y un enlace para compartir.'
	},
	preview: {
		label: 'Ejemplo de encuesta',
		badge: 'Encuesta de ejemplo',
		question: '¿Adónde vamos a comer el viernes?',
		options: ['La pizzería de la esquina', 'Tacos', 'Sushi', 'Me da igual, no soy exigente'],
		footer: (count: number) =>
			p(count, {
				one: '# voto · los resultados se actualizan en directo',
				many: '# de votos · los resultados se actualizan en directo',
				other: '# votos · los resultados se actualizan en directo'
			})
	},
	createPoll: {
		metaDescription:
			'Escribe una pregunta, añade algunas opciones y obtén un enlace para compartir.',
		intro: 'Haz una pregunta, añade algunas opciones y recibirás un enlace para compartir.',
		question: 'Pregunta',
		questionPlaceholder: '¿Qué quieres preguntar?',
		description: 'Descripción',
		optional: '(opcional)',
		descriptionPlaceholder: 'Añade contexto si te ayuda.',
		options: 'Opciones',
		optionsHint: (min: number, max: number) =>
			`Entre ${min} y ${max} opciones para que la gente elija.`,
		optionPlaceholder: (position: number) => `Opción ${position}`,
		removeOption: (position: number) => `Quitar opción ${position}`,
		addOption: 'Añadir opción',
		allowMultiple: 'Permitir varias selecciones',
		allowMultipleDescription: 'Quien vote puede elegir más de una opción.',
		submitting: 'Creando encuesta…',
		verificationRequired: 'Completa primero la verificación.',
		failed: 'No se pudo crear la encuesta. Inténtalo de nuevo.',
		errors: {
			questionRequired: 'La pregunta es obligatoria',
			optionRequired: 'Una opción no puede estar vacía',
			tooLong: (max: number) =>
				p(max, {
					one: 'Debe tener menos de # carácter',
					many: 'Debe tener menos de # de caracteres',
					other: 'Debe tener menos de # caracteres'
				}),
			tooFewOptions: (min: number) =>
				p(min, {
					one: 'Añade al menos # opción',
					many: 'Añade al menos # de opciones',
					other: 'Añade al menos # opciones'
				}),
			tooManyOptions: (max: number) =>
				p(max, {
					one: 'Puedes añadir hasta # opción',
					many: 'Puedes añadir hasta # de opciones',
					other: 'Puedes añadir hasta # opciones'
				})
		}
	},
	vote: {
		metaDescription: (title: string) => `Vota en «${title}» en Pollmodoro.`,
		ogDescription: 'Vota en esta encuesta y mira los resultados en directo.',
		votesLabel: 'Votos',
		typeLabel: 'Tipo',
		createdLabel: 'Creada',
		multipleChoice: 'Opción múltiple',
		singleChoice: 'Opción única',
		createdOn: (date: string) => `Creada el ${date}`,
		pickOneOrMore: 'Elige una o más opciones',
		pickOne: 'Elige una opción',
		optionVotes: (percentage: string, option: string) =>
			`${percentage} de los votos para ${option}`,
		submit: 'Votar',
		submitMany: (count: number) =>
			p(count, {
				one: 'Vota por # opción',
				many: 'Vota por # de opciones',
				other: 'Vota por # opciones'
			}),
		submitting: 'Enviando…',
		submittingStatus: 'Enviando tu voto.',
		cannotVoteStatus: 'Elige una opción y completa la verificación para votar.',
		success: 'Tu voto se ha registrado.',
		failed: 'No se pudo enviar tu voto. Inténtalo de nuevo.',
		verification: 'Verificación de que eres humano',
		disclaimer:
			'Esta encuesta la ha creado un usuario de Pollmodoro. Pollmodoro no crea ni respalda su contenido.'
	},
	share: {
		title: 'Comparte esta encuesta',
		text: 'Cualquiera con el enlace puede votar.',
		link: 'Enlace de la encuesta',
		copy: 'Copiar',
		copied: 'Enlace copiado al portapapeles.',
		copyFailed: 'No se pudo copiar el enlace.',
		emailBody: (url: string) => `Vota en esta encuesta: ${url}`,
		byEmail: 'Compartir por correo',
		on: (network: string) => `Compartir en ${network}`
	},
	createYourOwn: {
		title: '¿Tienes una pregunta propia?',
		text: 'Las encuestas son gratis y tardan un minuto en configurarse. No necesitas cuenta.'
	},
	pollNotFound: {
		title: 'Encuesta no encontrada',
		text: 'Esta encuesta no existe o el enlace es incorrecto. Revisa la dirección o crea una nueva encuesta.'
	},
	mascot: {
		title: 'Mascota',
		poke: 'Darle un toque a la mascota'
	},
	yourPolls: {
		intro:
			'Encuestas que has creado en este navegador. La lista se guarda localmente, así que no aparece en otros dispositivos, y si borras los datos del navegador desaparece (las encuestas siguen en línea).',
		loading: 'Cargando tus encuestas',
		empty: 'Todavía no has creado ninguna encuesta en este navegador.'
	},
	error: {
		notFoundTitle: 'Página no encontrada',
		notFoundText: 'No hay nada en esta dirección. Revisa el enlace o vuelve al inicio.',
		title: 'Algo salió mal',
		serverText: 'El servidor ha tenido un error. Inténtalo de nuevo en un momento.',
		text: 'Se ha producido un error inesperado. Inténtalo de nuevo.',
		tryAgain: 'Intentar de nuevo'
	}
};

export default messages;
