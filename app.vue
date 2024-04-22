<script setup lang="ts">
/**
 * Define template for SEO title on page
 */
useHead({
	titleTemplate: (titleChunk?: string) => {
		return titleChunk ? `${titleChunk} - Weather App` : "Weather App";
	},
});
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
