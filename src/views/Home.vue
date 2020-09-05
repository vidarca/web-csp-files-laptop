<template>
<div>
	<HomePage></HomePage>
</div>
	
</template>

<script>
import HomePage from '@/components/HomePage.vue'

export default {
	name: 'Home',
  	components: {
		HomePage,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>
