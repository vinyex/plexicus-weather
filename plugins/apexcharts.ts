import VueApexCharts from "vue3-apexcharts";

/**
 * Plugins for Vue Apexcharts
 */
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueApexCharts);
});
