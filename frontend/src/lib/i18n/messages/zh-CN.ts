import { plural } from '../plural';
import type { Messages } from './en';

const p = plural('zh-CN');

const messages: Messages = {
	common: {
		createPoll: '创建投票',
		createAPoll: '创建一个投票',
		goHome: '返回首页',
		loading: '加载中',
		opensInNewTab: '（在新标签页中打开）',
		votes: (count: number) => p(count, { other: '# 票' })
	},
	layout: {
		skipToContent: '跳至主要内容'
	},
	header: {
		mainNavigation: '主导航',
		home: 'Pollmodoro 首页',
		yourPolls: '我的投票',
		toggleTheme: '切换深色模式',
		language: '语言'
	},
	footer: {
		builtBy: '由 {author} 用 🍅 打造',
		source: '在 GitHub 上查看源代码'
	},
	home: {
		metaTitle: 'Pollmodoro · 快速投票，无需注册',
		metaDescription:
			'Pollmodoro 是一款免费的投票工具，无需注册。写下问题，分享链接，实时查看投票结果。',
		ogDescription: '写下问题，分享链接，实时查看投票结果。免费使用，无需账户。',
		heroTitle: '创建投票，分享链接，查看票数。',
		heroText:
			'Pollmodoro 是一款免费的投票工具，无需注册。写下问题，最多添加十个选项，然后把链接发给需要参与的人。投票时结果会实时更新。',
		seeExample: '查看投票示例',
		howItWorks: '使用方法',
		steps: {
			write: {
				title: '撰写问题',
				text: '添加标题、可选的描述，以及两到十个选项。可以决定是否允许多选。'
			},
			share: {
				title: '分享链接',
				text: '每个投票都有自己的链接。可以粘贴到聊天、电子邮件或帖子中。投票无需账户。'
			},
			watch: {
				title: '查看结果',
				text: '票数会随着投票实时出现，并显示数量和百分比。保持页面打开，结果会自动更新。'
			}
		},
		goodToKnow: '小贴士',
		details: {
			noAccounts: {
				title: '无需账户',
				text: '无需注册。你创建的投票会保存在此浏览器的“我的投票”中。'
			},
			anonymous: {
				title: '匿名投票',
				text: '投票时不需要提供姓名或邮箱地址。'
			},
			choice: {
				title: '单选或多选',
				text: '可以让参与者只选一个选项，也可以允许他们多选。'
			},
			bots: {
				title: '机器人防护',
				text: '创建投票和投票都会经过 Cloudflare Turnstile 验证，以阻止自动化投票。'
			},
			free: {
				title: '免费',
				text: '没有付费版本，投票数量也没有限制。'
			},
			openSource: {
				title: '开源',
				text: '使用 SvelteKit 和 Cloudflare Workers 构建。代码已在 GitHub 上公开。'
			}
		},
		closingTitle: '就这么简单。',
		closingText: '一个问题、几个选项，再加一个可以分享的链接。'
	},
	preview: {
		label: '投票示例',
		badge: '示例投票',
		question: '周五中午我们去哪里吃饭？',
		options: ['街角的披萨店', '墨西哥卷饼', '寿司', '都行，我不挑'],
		footer: (count: number) => p(count, { other: '# 票 · 结果实时更新' })
	},
	createPoll: {
		metaDescription: '写下问题，添加几个选项，然后获得一个可以分享的链接。',
		intro: '提出一个问题，添加一些选项，就能获得一个可以分享的链接。',
		question: '问题',
		questionPlaceholder: '你想问什么？',
		description: '描述',
		optional: '（可选）',
		descriptionPlaceholder: '如有需要，可以补充一些背景信息。',
		options: '选项',
		optionsHint: (min: number, max: number) => `可供选择的选项数量为 ${min} 到 ${max} 个。`,
		optionPlaceholder: (position: number) => `选项 ${position}`,
		removeOption: (position: number) => `删除选项 ${position}`,
		addOption: '添加选项',
		allowMultiple: '允许多选',
		allowMultipleDescription: '投票者可以选择多个选项。',
		submitting: '正在创建投票…',
		verificationRequired: '请先完成验证。',
		failed: '投票无法创建，请重试。',
		errors: {
			questionRequired: '请填写问题',
			optionRequired: '选项不能为空',
			tooLong: (max: number) => p(max, { other: '请将内容控制在 # 个字符以内' }),
			tooFewOptions: (min: number) => p(min, { other: '至少添加 # 个选项' }),
			tooManyOptions: (max: number) => p(max, { other: '最多只能添加 # 个选项' })
		}
	},
	vote: {
		metaDescription: (title: string) => `在 Pollmodoro 上为“${title}”投票。`,
		ogDescription: '参与投票，并实时查看结果。',
		votesLabel: '票数',
		typeLabel: '类型',
		createdLabel: '创建时间',
		multipleChoice: '多选',
		singleChoice: '单选',
		createdOn: (date: string) => `创建于 ${date}`,
		pickOneOrMore: '请选择一个或多个选项',
		pickOne: '请选择一个选项',
		optionVotes: (percentage: string, option: string) => `投给 ${option} 的票数占 ${percentage}`,
		submit: '投票',
		submitMany: (count: number) => p(count, { other: '为 # 个选项投票' }),
		submitting: '正在提交…',
		submittingStatus: '正在提交你的投票。',
		cannotVoteStatus: '请选择一个选项并完成验证后再投票。',
		success: '你的投票已记录。',
		failed: '投票无法提交，请重试。',
		verification: '确认你是真人的验证',
		disclaimer: '此投票由 Pollmodoro 用户创建，其内容并非由 Pollmodoro 制作或认可。'
	},
	share: {
		title: '分享此投票',
		text: '拥有链接的任何人都可以投票。',
		link: '投票链接',
		copy: '复制',
		copied: '链接已复制到剪贴板。',
		copyFailed: '无法复制链接。',
		emailBody: (url: string) => `请参与此投票：${url}`,
		byEmail: '通过邮件分享',
		on: (network: string) => `分享到 ${network}`
	},
	createYourOwn: {
		title: '也想问一个问题？',
		text: '投票免费，设置只需约一分钟，无需账户。'
	},
	pollNotFound: {
		title: '找不到该投票',
		text: '该投票不存在，或者链接有误。请检查地址，或创建一个新投票。'
	},
	yourPolls: {
		intro:
			'这里是你在此浏览器中创建的投票。列表保存在本地，因此不会显示在其他设备上；清除浏览器数据会将其删除（投票本身仍会保留在线上）。',
		loading: '正在加载你的投票',
		empty: '你在此浏览器中还没有创建过任何投票。'
	},
	error: {
		notFoundTitle: '找不到页面',
		notFoundText: '此地址没有内容。请检查链接，或返回首页。',
		title: '出了点问题',
		serverText: '服务器出错了，请稍后再试。',
		text: '发生了意外错误，请重试。',
		tryAgain: '重试'
	}
};

export default messages;
