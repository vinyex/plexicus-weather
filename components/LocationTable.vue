<template>
	<div class="relative overflow-x-auto">
		<table
			class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
		>
			<thead
				class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th scope="col" align="center" class="px-6 py-3">City</th>
					<th scope="col" align="center" class="px-6 py-3">Detail city</th>
					<th scope="col" align="center" class="px-6 py-3">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in items"
					:key="`location-${index}`"
					class="border-b border-gray-700"
					:class="{
						'bg-green-400 text-white': item.state === activeCurrent,
						'bg-gray-800': item.state !== activeCurrent,
					}"
				>
					<th
						scope="row"
						class="text-center px-6 py-4 font-medium whitespace-nowrap text-white"
					>
						{{ item.name }}
					</th>
					<td class="text-center text-white px-6 py-4">{{ item.state }}</td>
					<td class="text-center px-6 py-4">
						<button
							class="inline-flex justify-center items-center py-2 px-2 md:py-3 md:px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
							@click="findingWeather(item, index)"
						>
							Get weather
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
/**
 * Define props for location table componenet
 */
defineProps({
	items: Array<GeoLocationData>,
});

/**
 * Define active location
 */
const activeCurrent = ref();

/**
 * composables functions inside useGlobal context
 */
const { findWeather } = useGlobal();

/**
 * Finding weather after clicked button
 */
const findingWeather = async (item: any) => {
	activeCurrent.value = item.state;
	await findWeather(item.name);
};
</script>
