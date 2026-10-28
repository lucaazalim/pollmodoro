import { plural } from '../plural';
import type { Messages } from './en';

const p = plural('pt-BR');

const messages: Messages = {
	common: {
		createPoll: 'Criar enquete',
		createAPoll: 'Criar uma enquete',
		goHome: 'Ir para o início',
		loading: 'Carregando',
		opensInNewTab: '(abre em uma nova aba)',
		// CLDR puts 0 in `one`, but Portuguese says "0 votos".
		votes: (count: number) =>
			p(count, { '=0': '# votos', one: '# voto', many: '# de votos', other: '# votos' })
	},
	layout: {
		skipToContent: 'Pular para o conteúdo principal'
	},
	header: {
		mainNavigation: 'Navegação principal',
		home: 'Página inicial do Pollmodoro',
		yourPolls: 'Suas enquetes',
		toggleTheme: 'Alternar modo escuro',
		language: 'Idioma'
	},
	footer: {
		builtBy: 'Feito com 🍅 por {author}',
		source: 'Código-fonte no GitHub'
	},
	home: {
		metaTitle: 'Pollmodoro · Enquetes rápidas, sem cadastro',
		metaDescription:
			'O Pollmodoro é um criador de enquetes gratuito, sem cadastro. Escreva uma pergunta, compartilhe o link e acompanhe os resultados em tempo real.',
		ogDescription:
			'Escreva uma pergunta, compartilhe o link e acompanhe os resultados em tempo real. Gratuito, sem precisar de conta.',
		heroTitle: 'Crie uma enquete. Compartilhe um link. Veja os votos.',
		heroText:
			'O Pollmodoro é um criador de enquetes gratuito, sem cadastro. Escreva uma pergunta, adicione até dez opções e envie o link para quem precisa responder. Os resultados são atualizados em tempo real conforme os votos chegam.',
		seeExample: 'Ver uma enquete de exemplo',
		howItWorks: 'Como funciona',
		steps: {
			write: {
				title: 'Escreva a pergunta',
				text: 'Adicione um título, uma descrição opcional e de duas a dez opções. Decida se as pessoas podem escolher mais de uma.'
			},
			share: {
				title: 'Compartilhe o link',
				text: 'Cada enquete ganha o seu próprio link. Cole-o em um chat, em um e-mail ou em uma postagem. Ninguém precisa de conta para votar.'
			},
			watch: {
				title: 'Acompanhe os resultados',
				text: 'Os votos aparecem conforme chegam, com contagens e porcentagens. Deixe a página aberta e ela se mantém atualizada.'
			}
		},
		goodToKnow: 'Bom saber',
		details: {
			noAccounts: {
				title: 'Sem contas',
				text: 'Não há nada para se cadastrar. As enquetes que você cria ficam salvas neste navegador em “Suas enquetes”.'
			},
			anonymous: {
				title: 'Votação anônima',
				text: 'Votar não pede nome nem endereço de e-mail.'
			},
			choice: {
				title: 'Escolha única ou múltipla',
				text: 'Deixe as pessoas escolherem uma opção ou quantas quiserem.'
			},
			bots: {
				title: 'Proteção contra robôs',
				text: 'Criar uma enquete e votar passam pelo Cloudflare Turnstile para barrar votos automatizados.'
			},
			free: {
				title: 'Gratuito',
				text: 'Não existe versão paga nem limite para o número de enquetes.'
			},
			openSource: {
				title: 'Código aberto',
				text: 'Feito com SvelteKit e Cloudflare Workers. O código está no GitHub.'
			}
		},
		closingTitle: 'É simples assim.',
		closingText: 'Uma pergunta, algumas opções e um link para compartilhar.'
	},
	preview: {
		label: 'Exemplo de enquete',
		badge: 'Enquete de exemplo',
		question: 'Onde vamos almoçar na sexta-feira?',
		options: ['A pizzaria da esquina', 'Tacos', 'Sushi', 'Tanto faz, eu não sou exigente'],
		footer: (count: number) =>
			p(count, {
				one: '# voto · resultados atualizados ao vivo',
				many: '# de votos · resultados atualizados ao vivo',
				other: '# votos · resultados atualizados ao vivo'
			})
	},
	createPoll: {
		metaDescription:
			'Escreva uma pergunta, adicione algumas opções e receba um link para compartilhar.',
		intro: 'Faça uma pergunta, adicione algumas opções e você receberá um link para compartilhar.',
		question: 'Pergunta',
		questionPlaceholder: 'O que você quer perguntar?',
		description: 'Descrição',
		optional: '(opcional)',
		descriptionPlaceholder: 'Adicione um contexto, se ajudar.',
		options: 'Opções',
		optionsHint: (min: number, max: number) =>
			`Entre ${min} e ${max} opções para as pessoas escolherem.`,
		optionPlaceholder: (position: number) => `Opção ${position}`,
		removeOption: (position: number) => `Remover opção ${position}`,
		addOption: 'Adicionar opção',
		allowMultiple: 'Permitir várias seleções',
		allowMultipleDescription: 'Quem vota pode escolher mais de uma opção.',
		submitting: 'Criando enquete…',
		verificationRequired: 'Conclua a verificação primeiro.',
		failed: 'Não foi possível criar a enquete. Tente novamente.',
		errors: {
			questionRequired: 'A pergunta é obrigatória',
			optionRequired: 'Uma opção não pode ficar vazia',
			tooLong: (max: number) =>
				p(max, {
					one: 'Deve ter menos de # caractere',
					many: 'Deve ter menos de # de caracteres',
					other: 'Deve ter menos de # caracteres'
				}),
			tooFewOptions: (min: number) =>
				p(min, {
					one: 'Adicione pelo menos # opção',
					many: 'Adicione pelo menos # de opções',
					other: 'Adicione pelo menos # opções'
				}),
			tooManyOptions: (max: number) =>
				p(max, {
					one: 'Você pode adicionar até # opção',
					many: 'Você pode adicionar até # de opções',
					other: 'Você pode adicionar até # opções'
				})
		}
	},
	vote: {
		metaDescription: (title: string) => `Vote em “${title}” no Pollmodoro.`,
		ogDescription: 'Vote nesta enquete e acompanhe os resultados em tempo real.',
		votesLabel: 'Votos',
		typeLabel: 'Tipo',
		createdLabel: 'Criada',
		multipleChoice: 'Escolha múltipla',
		singleChoice: 'Escolha única',
		createdOn: (date: string) => `Criada em ${date}`,
		pickOneOrMore: 'Escolha uma ou mais opções',
		pickOne: 'Escolha uma opção',
		optionVotes: (percentage: string, option: string) => `${percentage} dos votos para ${option}`,
		submit: 'Votar',
		submitMany: (count: number) =>
			p(count, {
				one: 'Votar em # opção',
				many: 'Votar em # de opções',
				other: 'Votar em # opções'
			}),
		submitting: 'Enviando…',
		submittingStatus: 'Enviando seu voto.',
		cannotVoteStatus: 'Escolha uma opção e conclua a verificação para votar.',
		success: 'Seu voto foi registrado.',
		failed: 'Não foi possível enviar seu voto. Tente novamente.',
		verification: 'Verificação de que você é humano',
		disclaimer:
			'Esta enquete foi criada por um usuário do Pollmodoro. Seu conteúdo não é criado nem endossado pelo Pollmodoro.'
	},
	share: {
		title: 'Compartilhe esta enquete',
		text: 'Quem tiver o link pode votar.',
		link: 'Link da enquete',
		copy: 'Copiar',
		copied: 'Link copiado para a área de transferência.',
		copyFailed: 'Não foi possível copiar o link.',
		emailBody: (url: string) => `Vote nesta enquete: ${url}`,
		byEmail: 'Compartilhar por e-mail',
		on: (network: string) => `Compartilhar no ${network}`
	},
	createYourOwn: {
		title: 'Também tem uma pergunta?',
		text: 'As enquetes são gratuitas e levam cerca de um minuto para configurar. Não é preciso ter conta.'
	},
	pollNotFound: {
		title: 'Enquete não encontrada',
		text: 'Esta enquete não existe ou o link está errado. Confira o endereço ou crie uma nova enquete.'
	},
	mascot: {
		title: 'Mascote',
		poke: 'Cutucar o mascote'
	},
	yourPolls: {
		intro:
			'Enquetes que você criou neste navegador. A lista fica salva localmente, então não aparece em outros dispositivos, e limpar os dados do navegador a remove (as enquetes em si continuam online).',
		loading: 'Carregando suas enquetes',
		empty: 'Você ainda não criou nenhuma enquete neste navegador.'
	},
	error: {
		notFoundTitle: 'Página não encontrada',
		notFoundText: 'Não há nada neste endereço. Confira o link ou volte para o início.',
		title: 'Algo deu errado',
		serverText: 'O servidor encontrou um erro. Tente novamente em instantes.',
		text: 'Ocorreu um erro inesperado. Tente novamente.',
		tryAgain: 'Tentar novamente'
	}
};

export default messages;
