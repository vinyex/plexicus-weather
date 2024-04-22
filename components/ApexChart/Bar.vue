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
		text: "Humidity by Hour",
		align: "left",
	},
	chart: {
		type: "bar",
	},
	xaxis: { categories: [] },
	plotOptions: {
		bar: {
			borderRadius: 10,
			borderRadiusApplication: "around",
		},
	},
});

/**
 * Data series chart
 */
const series = ref([
	{
		name: "Humidity",
		data: [],
	},
]);

/**
 * Trigger function to update chart
 */
const updateChart = () => {
	// Get data current location weather per 24 hour (if all hours possible)
	const data = store.geoLocations.current.forecast.forecastday[0].hour.map(
		(item: any) => item.humidity
	);

	options.value = {
		...options.value,
		xaxis: {
			// Get label current location weather tiem per 24 hour (if all hours possible)
			categories: store.geoLocations.current.forecast.forecastday[0].hour.map(
				(item: any) => item.time
			),
		},
	};
	series.value = [
		{
			name: "Humidity",
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
