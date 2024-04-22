<template>
	<div>
		<ClientOnly>
			<apexchart
				:key="series"
				height="400"
				width="100%"
				:options="options"
				:series="series"
			></apexchart>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
/**
 * Global store
 */
const store = useGlobalStore();

/**
 * Options chart
 */
const options = ref({
	title: {
		text: "Wind Speed by Hour",
		align: "left",
	},
	chart: {
		type: "radialBar",
	},
	plotOptions: {
		radialBar: {
			dataLabels: {
				name: {
					fontSize: "22px",
				},
				value: {
					fontSize: "16px",
				},
				total: {
					show: true,
					label: "Total",
					formatter: function () {
						// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
						return 249;
					},
				},
			},
		},
	},
	labels: [],
});

/**
 * Data series chart
 */
const series = ref([]);

/**
 * Trigger function to update chart
 */
const updateChart = () => {
	// Get data current location weather per 24 hour (if all hours possible)
	const data = store.geoLocations.current.forecast.forecastday[0].hour
		.filter((_: any, idx: number) => [0, 6, 12, 18].includes(idx))
		.map((item: any) => item.wind_mph);
	options.value = {
		...options.value,
		plotOptions: {
			radialBar: {
				dataLabels: {
					name: {
						fontSize: "22px",
					},
					value: {
						fontSize: "16px",
					},
					total: {
						show: true,
						label: "Max Wind Speed (MpH)",
						formatter: function () {
							// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
							return store.geoLocations.current.forecast.forecastday[0].day
								.maxwind_mph;
						},
					},
				},
			},
		},
		labels: store.geoLocations.current.forecast.forecastday[0].hour
			.filter((_: any, idx: number) => [0, 6, 12, 18].includes(idx))
			.map((item: any) => item.time),
	};
	series.value = data;
};

/**
 * Mounted lifecycle
 */
onMounted(() => {
	updateChart();
});

/**
 * Trigger watcher on updated store
 */
watch(
	() => store.geoLocations.current,
	() => {
		updateChart();
	},
	{ deep: true }
);
</script>
