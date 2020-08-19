<template>
  <div class="secP">
	  	<UsPage></UsPage>
		<Footer></Footer>
  </div>
</template>


<script>
import UsPage from '@/components/UsPage.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Nosotros',
  	components: {
		UsPage,
		Footer,
  	},
}
</script>