<template>
<div>
	<Header></Header>
	<HomePage></HomePage>
	<Footer></Footer>
</div>
	
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Home',
  	components: {
		HomePage,
		Header,
		Footer,
  	},
}
</script>
