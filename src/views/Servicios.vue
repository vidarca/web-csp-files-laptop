<template>
  <div class="secP">
    <Services></Services>
  </div>
</template>

<script>

import Services from '@/components/Services.vue'

export default {
	name: 'Home',
  components: {
		Services,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>