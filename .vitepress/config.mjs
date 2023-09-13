import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Notes",
	description: "Wiki, docs, notes and ramblings.",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Notes", link: "/my_interact/working-on-smart-forms.md" },
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
