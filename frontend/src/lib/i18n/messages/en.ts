import { plural } from '../plural';

const p = plural('en');

/**
 * The English messages. They are the source of truth: every other language
 * file is typed against this one, so a missing or extra message fails
 * type-checking.
 *
 * Conventions for translations:
 * - `{author}` in a string is a placeholder that the component replaces with a
 *   link. Keep it, but move it wherever the grammar needs it.
 * - Counts go through `p(count, { one, few, many, other, ... })`, with `#` for
 *   the number. Use the plural categories the language has (see
 *   https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html).
 * - "Pollmodoro" is a name and is never translated.
 */
const messages = {
	common: {
		createPoll: 'Create poll',
		createAPoll: 'Create a poll',
		goHome: 'Go home',
		loading: 'Loading',
		opensInNewTab: '(opens in a new tab)',
		votes: (count: number) => p(count, { one: '# vote', other: '# votes' })
	},
	layout: {
		skipToContent: 'Skip to main content'
	},
	header: {
		mainNavigation: 'Main navigation',
		home: 'Pollmodoro home',
		yourPolls: 'Your polls',
		toggleTheme: 'Toggle dark mode',
		language: 'Language'
	},
	footer: {
		builtBy: 'Built with 🍅 by {author}',
		source: 'Source on GitHub'
	},
	home: {
		metaTitle: 'Pollmodoro · Quick polls, no sign-up',
		metaDescription:
			'Pollmodoro is a free poll maker with no sign-up. Write a question, share the link, and watch the results update live.',
		ogDescription:
			'Write a question, share the link, and watch the results update live. Free, no account needed.',
		heroTitle: 'Make a poll. Share a link. See the votes.',
		heroText:
			'Pollmodoro is a free poll maker with no sign-up. Write a question, add up to ten options, and send the link to whoever needs to answer. Results update live as votes come in.',
		seeExample: 'See an example poll',
		howItWorks: 'How it works',
		steps: {
			write: {
				title: 'Write the question',
				text: 'Add a title, an optional description, and two to ten options. Decide whether people can pick more than one.'
			},
			share: {
				title: 'Share the link',
				text: 'Every poll gets its own link. Paste it in a chat, an email, or a post. Nobody needs an account to vote.'
			},
			watch: {
				title: 'Watch the results',
				text: 'Votes show up as they come in, with counts and percentages. Keep the page open and it stays up to date.'
			}
		},
		goodToKnow: 'Good to know',
		details: {
			noAccounts: {
				title: 'No accounts',
				text: 'Nothing to sign up for. Polls you create are remembered in this browser under "Your polls".'
			},
			anonymous: {
				title: 'Anonymous voting',
				text: "Voting doesn't ask for a name or an email address."
			},
			choice: {
				title: 'Single or multiple choice',
				text: 'Let people pick one option, or as many as they like.'
			},
			bots: {
				title: 'Bot protection',
				text: 'Creating a poll and voting go through Cloudflare Turnstile to keep automated votes out.'
			},
			free: {
				title: 'Free',
				text: 'There is no paid version and no limit on the number of polls.'
			},
			openSource: {
				title: 'Open source',
				text: 'Built with SvelteKit and Cloudflare Workers. The code is on GitHub.'
			}
		},
		closingTitle: "That's all there is to it.",
		closingText: 'A question, a few options, and a link to share.'
	},
	preview: {
		label: 'Example of a poll',
		badge: 'Example poll',
		question: 'Where should we go for lunch on Friday?',
		options: ['The pizza place around the corner', 'Tacos', 'Sushi', "Whatever, I'm not picky"],
		footer: (count: number) =>
			p(count, { one: '# vote · results update live', other: '# votes · results update live' })
	},
	createPoll: {
		metaDescription: 'Write a question, add a few options, and get a link to share.',
		intro: "Ask a question, add some options, and you'll get a link to share.",
		question: 'Question',
		questionPlaceholder: 'What do you want to ask?',
		description: 'Description',
		optional: '(optional)',
		descriptionPlaceholder: 'Add some context, if it helps.',
		options: 'Options',
		optionsHint: (min: number, max: number) =>
			`Between ${min} and ${max} options for people to choose from.`,
		optionPlaceholder: (position: number) => `Option ${position}`,
		removeOption: (position: number) => `Remove option ${position}`,
		addOption: 'Add option',
		allowMultiple: 'Allow multiple selections',
		allowMultipleDescription: 'Voters can pick more than one option.',
		submitting: 'Creating poll…',
		verificationRequired: 'Please complete the verification first.',
		failed: 'The poll could not be created. Please try again.',
		errors: {
			questionRequired: 'A question is required',
			optionRequired: 'An option cannot be empty',
			tooLong: (max: number) =>
				p(max, { one: 'Keep it under # character', other: 'Keep it under # characters' }),
			tooFewOptions: (min: number) =>
				p(min, { one: 'Add at least # option', other: 'Add at least # options' }),
			tooManyOptions: (max: number) =>
				p(max, { one: 'You can add up to # option', other: 'You can add up to # options' })
		}
	},
	vote: {
		metaDescription: (title: string) => `Vote on "${title}" on Pollmodoro.`,
		ogDescription: 'Vote on this poll and see the results live.',
		votesLabel: 'Votes',
		typeLabel: 'Type',
		createdLabel: 'Created',
		multipleChoice: 'Multiple choice',
		singleChoice: 'Single choice',
		createdOn: (date: string) => `Created ${date}`,
		pickOneOrMore: 'Pick one or more options',
		pickOne: 'Pick one option',
		optionVotes: (percentage: string, option: string) => `${percentage} of votes for ${option}`,
		submit: 'Vote',
		submitMany: (count: number) =>
			p(count, { one: 'Vote for # option', other: 'Vote for # options' }),
		submitting: 'Submitting…',
		submittingStatus: 'Submitting your vote.',
		cannotVoteStatus: 'Pick an option and complete the verification to vote.',
		success: 'Your vote is in.',
		failed: 'Your vote could not be submitted. Please try again.',
		verification: 'Verification that you are human',
		disclaimer:
			'This poll was written by a Pollmodoro user. Its content is not created or endorsed by Pollmodoro.'
	},
	share: {
		title: 'Share this poll',
		text: 'Anyone with the link can vote.',
		link: 'Poll link',
		copy: 'Copy',
		copied: 'Link copied to clipboard.',
		copyFailed: 'The link could not be copied.',
		emailBody: (url: string) => `Vote on this poll: ${url}`,
		byEmail: 'Share by email',
		on: (network: string) => `Share on ${network}`
	},
	createYourOwn: {
		title: 'Have a question of your own?',
		text: 'Polls are free and take about a minute to set up. No account needed.'
	},
	pollNotFound: {
		title: 'Poll not found',
		text: "This poll doesn't exist, or the link is wrong. Double-check the address, or create a new poll."
	},
	yourPolls: {
		intro:
			"Polls you've created in this browser. The list is saved locally, so it won't show up on other devices, and clearing your browser data removes it (the polls themselves stay online).",
		loading: 'Loading your polls',
		empty: "You haven't created any polls in this browser yet."
	},
	error: {
		notFoundTitle: 'Page not found',
		notFoundText: "There's nothing at this address. Check the link, or head back home.",
		title: 'Something went wrong',
		serverText: 'The server hit an error. Please try again in a moment.',
		text: 'An unexpected error happened. Please try again.',
		tryAgain: 'Try again'
	}
};

export type Messages = typeof messages;

export default messages;
