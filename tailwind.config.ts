import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { miausu } from './miausu';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: {
				// Use CSS variables for theme colors
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				background: 'var(--color-background)',
				text: 'var(--color-text)'
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{ name: 'skeleton', enhancements: true },
					{ name: 'modern', enhancements: true },
					{ name: 'rocket', enhancements: true },
					{ name: 'wintry', enhancements: true },
					{ name: 'vintage', enhancements: true },
					{ name: 'seafoam', enhancements: true },
					{ name: 'hamlindigo', enhancements: true },
					{ name: 'crimson', enhancements: true},
					{ name: 'gold-nouveau', enhancements: true}
				],
				custom: [
					miausu
				]
			}
		})
	]
} satisfies Config;