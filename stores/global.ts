export const useGlobalStore = defineStore("global", () => {
	/**
	 * Define state geoLocations
	 */
	const geoLocations = reactive<any>({
		list: [],
		current: null,
	});

	/**
	 * Mutations from geoLocations state
	 * @param key string
	 * @param payload anything value to be changed by key
	 */
	function mutateGeoLocations(key: string, payload: any) {
		geoLocations[key] = payload;
	}

	return { geoLocations, mutateGeoLocations };
});
