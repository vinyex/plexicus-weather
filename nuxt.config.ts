// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
	plugins: [{ src: "~/plugins/apexcharts.ts", mode: "client" }],
	runtimeConfig: {
		public: {
			apiWeatherKey: process.env.API_WEATHER_KEY,
			apiWeatherUrl: process.env.API_WEATHER_URL,
			apiGeolocationUrl: process.env.API_GEOLOCATION_URL,
			apiGeolocationKey: process.env.API_GEOLOCATION_KEY,
		},
	},
});
