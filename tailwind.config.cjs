/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui"),
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: { fontSize: theme("fontSize.2xl") },
                h2: { fontSize: theme("fontSize.xl") },
                h3: { fontSize: theme("fontSize.lg") },
            });
        }),
    ],
};
