import { plural } from '../plural';
import type { Messages } from './en';

const p = plural('ja');

const messages: Messages = {
	common: {
		createPoll: '投票を作成',
		createAPoll: '投票を作成する',
		goHome: 'ホームへ戻る',
		loading: '読み込み中',
		opensInNewTab: '（新しいタブで開きます）',
		votes: (count: number) => p(count, { other: '#票' })
	},
	layout: {
		skipToContent: '本文へスキップ'
	},
	header: {
		mainNavigation: 'メインナビゲーション',
		home: 'Pollmodoro ホーム',
		yourPolls: '作成した投票',
		toggleTheme: 'ダークモードを切り替え',
		language: '言語'
	},
	footer: {
		builtBy: '{author} が 🍅 を使って開発',
		source: 'GitHub でソースを見る'
	},
	home: {
		metaTitle: 'Pollmodoro · すぐに使える投票、登録不要',
		metaDescription:
			'Pollmodoro は、登録不要で使える無料の投票作成ツールです。質問を入力してリンクを共有すると、結果がリアルタイムで更新されます。',
		ogDescription:
			'質問を入力してリンクを共有すると、結果がリアルタイムで更新されます。無料で、アカウントも不要です。',
		heroTitle: '投票を作る。リンクを共有する。結果を見る。',
		heroText:
			'Pollmodoro は、登録不要で使える無料の投票作成ツールです。質問を入力し、選択肢を最大10個まで追加して、回答してほしい人にリンクを送るだけです。投票が集まると、結果がリアルタイムで更新されます。',
		seeExample: '投票の例を見る',
		howItWorks: '使い方',
		steps: {
			write: {
				title: '質問を書く',
				text: 'タイトル、任意の説明、そして2〜10個の選択肢を追加します。複数選択を許可するかどうかも選べます。'
			},
			share: {
				title: 'リンクを共有する',
				text: '投票ごとに専用のリンクが作られます。チャット、メール、投稿に貼り付けてください。投票にアカウントは必要ありません。'
			},
			watch: {
				title: '結果を確認する',
				text: '投票が集まるとすぐに、票数と割合が表示されます。ページを開いたままにすると、自動で最新の状態になります。'
			}
		},
		goodToKnow: '知っておきたいこと',
		details: {
			noAccounts: {
				title: 'アカウント不要',
				text: '登録の必要はありません。作成した投票は、このブラウザの「作成した投票」に保存されます。'
			},
			anonymous: {
				title: '匿名投票',
				text: '投票の際に、名前やメールアドレスは求められません。'
			},
			choice: {
				title: '単一選択と複数選択',
				text: '1つだけ選んでもらうことも、複数選んでもらうこともできます。'
			},
			bots: {
				title: 'ボット対策',
				text: '投票の作成と投票は Cloudflare Turnstile を通じて行われ、自動化された投票を防ぎます。'
			},
			free: {
				title: '無料',
				text: '有料版はなく、投票の作成数にも制限はありません。'
			},
			openSource: {
				title: 'オープンソース',
				text: 'SvelteKit と Cloudflare Workers で作られています。コードは GitHub で公開されています。'
			}
		},
		closingTitle: 'これだけです。',
		closingText: '質問、いくつかの選択肢、共有するリンクがあれば十分です。'
	},
	preview: {
		label: '投票の例',
		badge: 'サンプル投票',
		question: '金曜日のランチ、どこに行く？',
		options: ['角のピザ屋', 'タコス', '寿司', 'どこでもいい、こだわりなし'],
		footer: (count: number) => p(count, { other: '#票 · 結果はリアルタイムで更新' })
	},
	createPoll: {
		metaDescription: '質問を入力し、選択肢をいくつか追加すると、共有用のリンクが手に入ります。',
		intro: '質問を入力して選択肢を追加すると、共有用のリンクが表示されます。',
		question: '質問',
		questionPlaceholder: '何を聞きたいですか？',
		description: '説明',
		optional: '（任意）',
		descriptionPlaceholder: '必要であれば、背景を追加してください。',
		options: '選択肢',
		optionsHint: (min: number, max: number) =>
			`選択肢は ${min} 個以上 ${max} 個以下にしてください。`,
		optionPlaceholder: (position: number) => `選択肢 ${position}`,
		removeOption: (position: number) => `選択肢 ${position} を削除`,
		addOption: '選択肢を追加',
		allowMultiple: '複数選択を許可',
		allowMultipleDescription: '投票する人は、複数の選択肢を選べます。',
		submitting: '投票を作成中…',
		verificationRequired: '先に認証を完了してください。',
		failed: '投票を作成できませんでした。もう一度お試しください。',
		errors: {
			questionRequired: '質問を入力してください',
			optionRequired: '選択肢は空欄にできません',
			tooLong: (max: number) => p(max, { other: '#文字以内で入力してください' }),
			tooFewOptions: (min: number) => p(min, { other: '選択肢は#個以上追加してください' }),
			tooManyOptions: (max: number) => p(max, { other: '選択肢は#個まで追加できます' })
		}
	},
	vote: {
		metaDescription: (title: string) => `Pollmodoro で「${title}」に投票します。`,
		ogDescription: 'この投票に参加して、結果をリアルタイムで確認できます。',
		votesLabel: '票数',
		typeLabel: '種類',
		createdLabel: '作成日',
		multipleChoice: '複数選択',
		singleChoice: '単一選択',
		createdOn: (date: string) => `${date} に作成`,
		pickOneOrMore: '1つ以上の選択肢を選んでください',
		pickOne: '1つの選択肢を選んでください',
		optionVotes: (percentage: string, option: string) => `${option}：得票率 ${percentage}`,
		submit: '投票する',
		submitMany: (count: number) => p(count, { other: '#個の選択肢に投票する' }),
		submitting: '送信中…',
		submittingStatus: '投票を送信しています。',
		cannotVoteStatus: '投票するには、選択肢を選んで認証を完了してください。',
		success: '投票を受け付けました。',
		failed: '投票を送信できませんでした。もう一度お試しください。',
		verification: '人間であることの確認',
		disclaimer:
			'この投票は Pollmodoro のユーザーが作成したものです。その内容は Pollmodoro が作成または承認したものではありません。'
	},
	share: {
		title: 'この投票を共有',
		text: 'リンクを知っている人なら誰でも投票できます。',
		link: '投票のリンク',
		copy: 'コピー',
		copied: 'リンクをクリップボードにコピーしました。',
		copyFailed: 'リンクをコピーできませんでした。',
		emailBody: (url: string) => `この投票に参加してください：${url}`,
		byEmail: 'メールで共有',
		on: (network: string) => `${network} で共有`
	},
	createYourOwn: {
		title: '自分でも投票を作りたいですか？',
		text: '投票は無料で、準備は1分ほどで完了します。アカウントも不要です。'
	},
	pollNotFound: {
		title: '投票が見つかりません',
		text: 'この投票は存在しないか、リンクが間違っている可能性があります。アドレスを確認するか、新しい投票を作成してください。'
	},
	yourPolls: {
		intro:
			'このブラウザで作成した投票の一覧です。一覧はこのブラウザに保存されるため、他の端末には表示されません。ブラウザのデータを削除すると一覧も消えます（投票自体はオンライン上に残ります）。',
		loading: '作成した投票を読み込み中',
		empty: 'このブラウザではまだ投票を作成していません。'
	},
	error: {
		notFoundTitle: 'ページが見つかりません',
		notFoundText:
			'このアドレスにはページがありません。リンクを確認するか、ホームに戻ってください。',
		title: '問題が発生しました',
		serverText: 'サーバーでエラーが発生しました。しばらくしてからもう一度お試しください。',
		text: '予期しないエラーが発生しました。もう一度お試しください。',
		tryAgain: '再試行'
	}
};

export default messages;
