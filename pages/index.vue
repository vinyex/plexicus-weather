<template>
	<div>
		<Jumbotron />
		<Transition>
			<section
				v-if="store.geoLocations.list.length < 1"
				class="flex flex-col justify-center items-center"
			>
				<figure class="max-w-lg">
					<img
						class="h-auto max-w-full rounded-lg"
						src="/empty.png"
						alt="Empty current location"
					/>
					<figcaption
						class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"
					>
						Please type your desire location to track the weather
					</figcaption>
				</figure>
			</section>
		</Transition>
		<Transition>
			<div
				v-if="store.geoLocations.current"
				class="w-full border border-gray-200 shadow"
			>
				<ul
					class="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex"
					id="fullWidthTab"
					data-tabs-toggle="#fullWidthTabContent"
					role="tablist"
				>
					<li
						v-for="(tab, index) in tabs.items"
						:key="`tab-${index}`"
						class="w-full"
					>
						<button
							:id="`${tab.key}-tab`"
							:data-tabs-target="`#${tab.key}`"
							:aria-controls="tab.key"
							:aria-selected="tab.key == tabs.active"
							class="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none"
							:class="{ 'text-blue-600': tab.key == tabs.active }"
							type="button"
							role="tab"
							@click="tabs.active = tab.key"
						>
							{{ tab.value }}
						</button>
					</li>
				</ul>
				<div id="fullWidthTabContent" class="border-t border-gray-200">
					<div
						class="p-4 bg-white rounded-lg md:p-8"
						:class="{ hidden: tabs.active != 'humidity' }"
						id="humidity"
						role="tabpanel"
						aria-labelledby="humidity-tab"
					>
						<ApexChartBar />
					</div>
					<div
						class="p-4 bg-white rounded-lg md:p-8"
						:class="{ hidden: tabs.active != 'temperature' }"
						id="temperature"
						role="tabpanel"
						aria-labelledby="temperature-tab"
					>
						<ApexChartLine />
					</div>
					<div
						class="p-4 bg-white rounded-lg md:p-8"
						:class="{ hidden: tabs.active != 'wind-speed' }"
						id="wind-speed"
						role="tabpanel"
						aria-labelledby="wind-speed-tab"
					>
						<ApexChartRadial />
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
/**
 * Global store management
 */
const store = useGlobalStore();

/**
 * Reactive variables for tabs
 */
const tabs = reactive({
	items: [
		{ key: "humidity", value: "Humidity" },
		{ key: "temperature", value: "Temperature" },
		{ key: "wind-speed", value: "Wind Speed" },
	],
	active: "humidity",
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
