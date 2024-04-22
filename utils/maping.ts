import type { GeoLocationData, WeatherCurrentData } from "./interfaces";

/**
 * Mapping data function for GeoLocation response
 * @param data Array GeoLocation data
 * @returns Array mapping GeoLocation
 */
const mappingGeoLocationData = (data: Array<GeoLocationData>) => {
	return data.map((dt) => ({
		name: dt.name,
		state: [dt.country, dt.state].filter((x) => x).join(", "),
		lat: dt.lat,
		lon: dt.lon,
	}));
};

/**
 * Mapping current selected city weather
 * @param data current weather city data
 * @returns data current city weather
 */
const mappingCurrentWeatherData = (data: WeatherCurrentData) => {
	return {
		temperature: [data.temp_c, "Celcius"].join(" "),
		humidity: data.humidity,
		windSpeed: [data.wind_mph, "mph"].join(" "),
	};
};

export default { mappingGeoLocationData, mappingCurrentWeatherData };
