<template>
  <div class="secP mih">
    <ComitesPage></ComitesPage>
  </div>
</template>

<script>

import ComitesPage from '@/components/ComitesPage.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Comites',
  components: {
		ComitesPage,
		Footer,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>
