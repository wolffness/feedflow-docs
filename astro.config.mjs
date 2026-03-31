// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.feed-flow.app',
	integrations: [
		starlight({
			title: 'FeedFlow',
			logo: {
				src: './src/assets/logo-icon.svg',
				alt: 'FeedFlow',
			},
			defaultLocale: 'pt-br',
			locales: {
				'pt-br': { label: 'Português', lang: 'pt-BR' },
			},
			sidebar: [
				{
					label: 'Começando',
					autogenerate: { directory: 'pt-br/getting-started' },
				},
				{
					label: 'Plataformas',
					autogenerate: { directory: 'pt-br/platform-setup' },
				},
				{
					label: 'Funcionalidades',
					autogenerate: { directory: 'pt-br/features' },
				},
				{
					label: 'Guias',
					autogenerate: { directory: 'pt-br/guides' },
				},
				{ label: 'FAQ', link: '/pt-br/faq/' },
				{ label: 'Novidades', link: '/pt-br/changelog/' },
			],
			components: {
				SocialIcons: './src/components/SocialIcons.astro',
			},
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: '',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
					},
				},
			],
		}),
	],
});
