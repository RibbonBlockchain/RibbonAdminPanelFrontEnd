import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		// container: {
		// 	center: true,
		// 	padding: "2rem",
		// 	screens: {
		// 		"2xl": "1400px",
		// 	},
		// },
		extend: {
			colors: {
				primary: {
					DEFAULT: "#714EE7",
					900: "#34246B",
					500: "#7C56FE",
					50: "#F2EEFF",
				},
				secondary: {
					DEFAULT: "#D6CBFF",
				},
				black: {
					DEFAULT: "#110D1B",
					primary: "#110D1B",
					neutral: "#626262",
				},
				golden: {
					DEFAULT: "#F59E0B",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/container-queries"),
	],
} satisfies Config;

export default config;
