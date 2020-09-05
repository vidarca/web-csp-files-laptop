<template>
  <div class="secP">
	  	<UsPage></UsPage>
  </div>
</template>


<script>
import UsPage from '@/components/UsPage.vue'

export default {
	name: 'Nosotros',
  	components: {
		UsPage,
	},
	mounted() {
		window.scrollTo(0, 0);
	},  
}
</script>