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
		text: "Temperature by Hour",
		align: "left",
	},
	xaxis: { categories: [] },
	chart: {
		type: "line",
	},
	stroke: {
		curve: "straight",
	},
	grid: {
		row: {
			colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
			opacity: 0.5,
		},
	},
});

/**
 * Data series chart
 */
const series = ref([
	{
		name: "Celcius",
		data: [],
	},
]);

/**
 * Trigger function to update chart
 */
const updateChart = () => {
	// Get data current location weather per 24 hour (if all hours possible)
	const data = store.geoLocations.current.forecast.forecastday[0].hour.map(
		(item: any) => item.temp_c
	);

	options.value = {
		...options.value,
		title: {
			text: "Temperature by Hour",
			align: "left",
		},
		xaxis: {
			// Get label current location weather tiem per 24 hour (if all hours possible)
			categories: store.geoLocations.current.forecast.forecastday[0].hour.map(
				(item: any) => item.time
			),
		},
	};
	series.value = [
		{
			name: "Celcius",
			data: data,
		},
	];
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
