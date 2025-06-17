module.exports = {
	content: [
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
	theme: {
		latex: {
			footnotes: true,
			syntax: true,
		},
	},
	variants: {},
	plugins: [require("./plugin")],
};
