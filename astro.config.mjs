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
					items: [
						{ label: 'Visão Geral', slug: 'getting-started' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Conceitos Principais', slug: 'getting-started/core-concepts' },
					],
				},
				{
					label: 'Plataformas',
					items: [
						{ label: 'Nuvemshop', slug: 'platform-setup/nuvemshop' },
					],
				},
				{
					label: 'Feeds & Anúncios',
					items: [
						{ label: 'Feeds XML', slug: 'features/feeds' },
						{ label: 'Monitoramento de Plataformas', slug: 'features/platform-monitoring' },
						{ label: 'Proteção do Feed', slug: 'features/feed-protection' },
					],
				},
				{
					label: 'Filtros & Categorias',
					items: [
						{ label: 'Filtros', slug: 'features/filters' },
						{ label: 'Categorias Google', slug: 'features/google-categories' },
					],
				},
				{
					label: 'Otimização de Produtos',
					items: [
						{ label: 'Custom Labels', slug: 'features/custom-labels' },
						{ label: 'Title Builder', slug: 'features/title-builder' },
						{ label: 'Preço Dinâmico', slug: 'features/dynamic-pricing' },
					],
				},
				{
					label: 'Qualidade & Compliance',
					items: [
						{ label: 'Feed Quality Score', slug: 'features/compliance' },
					],
				},
				{
					label: 'Conta & Equipe',
					items: [
						{ label: 'Planos e Limites', slug: 'features/plan-limits' },
						{ label: 'Equipe e Permissões', slug: 'features/team-management' },
						{ label: 'Dados Fiscais', slug: 'features/fiscal-data' },
					],
				},
				{
					label: 'Guias Práticos',
					items: [
						{ label: 'Black Friday com FeedFlow', slug: 'guides/black-friday' },
						{ label: 'Segmentação por Preço', slug: 'guides/price-segmentation' },
						{ label: 'Otimizar Feed Quality', slug: 'guides/optimize-feed-quality' },
						{ label: 'Títulos para Google Shopping', slug: 'guides/google-titles' },
						{ label: 'Alertas via Slack', slug: 'guides/slack-integration' },
					],
				},
				{
					label: 'Referência',
					items: [
						{ label: 'FAQ', slug: 'faq' },
						{ label: 'Troubleshooting', slug: 'troubleshooting' },
						{ label: 'Glossário', slug: 'glossary' },
						{ label: 'Novidades', slug: 'changelog' },
					],
				},
			],
			components: {
				SocialIcons: './src/components/SocialIcons.astro',
			},
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'script',
					content: `
						// Force light theme as default (match feed-flow.app)
						if (!localStorage.getItem('starlight-theme')) {
							document.documentElement.setAttribute('data-theme', 'light');
							localStorage.setItem('starlight-theme', 'light');
						}
					`,
				},
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
