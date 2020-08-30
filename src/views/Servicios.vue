<template>
  <div class="secP">
    <Services></Services>
    <Footer></Footer>
  </div>
</template>

<script>

import Services from '@/components/Services.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Home',
  components: {
		Services,
		Footer,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>