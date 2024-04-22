<template>
	<section class="bg-white dark:bg-gray-900">
		<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
			<h1
				class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
			>
				<slot> Weather App </slot>
			</h1>
			<div class="flex flex-col items-center mb-5">
				<label
					for="email"
					class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
					>Please type your location below.</label
				>
				<input
					type="text"
					id="location"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Enter your location"
					autocomplete="off"
					v-model="inputLocation"
					@change.prevent="findingLocation"
				/>
			</div>
			<Transition>
				<LocationTable
					v-if="store.geoLocations.list.length > 0"
					:items="store.geoLocations.list"
				/>
			</Transition>
		</div>
	</section>
</template>

<script setup lang="ts">
/**
 * composables functions inside useGlobal context
 */
const { findLocation } = useGlobal();

/**
 * global store state
 */
const store = useGlobalStore();

/**
 * v-model for input location
 */
const inputLocation = defineModel();

/**
 * Finding location after input location enter
 */
const findingLocation = async () => {
	await findLocation(inputLocation.value as string);
};
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
