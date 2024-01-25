/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  corePlugins: {
    preflight: false,
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust as necessary based on your project structure

  // ... other Tailwind config options
};
