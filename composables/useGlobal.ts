export default function useGlobal() {
	/**
	 * Get nuxt app context data
	 */
	const nuxtApp = useNuxtApp();

	/**
	 * Get the config variables
	 */
	const publicVars = nuxtApp.$config.public;

	/**
	 * Global store
	 */
	const globalStore = useGlobalStore();

	/**
	 * Find location of geolocation before it can get to weather API
	 * @param query search query
	 */
	async function findLocation(query: string) {
		const response = await $fetch(publicVars.apiGeolocationUrl, {
			query: {
				// city name
				q: query,
				// api key
				appid: publicVars.apiGeolocationKey,
				limit: 5,
			},
		}).catch((err) => {
			globalStore.mutateGeoLocations("current", null);
			globalStore.mutateGeoLocations("list", []);
		});

		globalStore.mutateGeoLocations("current", null);
		globalStore.mutateGeoLocations(
			"list",
			maping.mappingGeoLocationData(response as Array<GeoLocationData>)
		);
	}

	/**
	 * Find weather of selected location
	 * @param query search query for the city name
	 */
	async function findWeather(query: string) {
		const date = new Date();
		const formatter = new Intl.DateTimeFormat("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		const formattedDate = formatter.format(date);
		const arrayFormattedDate = formattedDate.split("/");

		const response = await $fetch(publicVars.apiWeatherUrl, {
			query: {
				// api key
				key: publicVars.apiWeatherKey,
				// city name
				q: query,
				// date time
				dt: `${arrayFormattedDate[2]}-${arrayFormattedDate[0]}-${arrayFormattedDate[1]}`,
			},
		}).catch((err) => globalStore.mutateGeoLocations("current", null));

		globalStore.mutateGeoLocations("current", response);
	}

	return { findLocation, findWeather };
}
