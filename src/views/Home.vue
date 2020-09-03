<template>
<div>
	<HomePage></HomePage>
	<Footer></Footer>
</div>
	
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Home',
  	components: {
		HomePage,
		Footer,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>
