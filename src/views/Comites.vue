<template>
  <div class="secP mih">
    <Comites></Comites>
    <Footer></Footer>
  </div>
</template>

<script>

import Comites from '@/components/Comites.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Comites',
  components: {
		Comites,
		Footer,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>
