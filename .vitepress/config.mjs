import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/notes",
	title: "Notes",
	description: "Wiki, docs, notes",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{
				text: "My Interact",
				items: [
					{
						text: "Working on smart forms",
						link: "/my_interact/working-on-smart-forms.md",
					},
					{
						text: "Events list asset",
						link: "/my_interact/events-list-asset.md",
					},
				],
			},
		],

		// sidebar: [
		//   {
		//     text: 'Examples',
		//     items: [
		//       { text: 'Markdown Examples', link: '/markdown-examples' },
		//       { text: 'Runtime API Examples', link: '/api-examples' }
		//     ]
		//   }
		// ],

		// socialLinks: [
		//   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		// ]
	},
})
