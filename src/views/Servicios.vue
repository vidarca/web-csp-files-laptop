<template>
  <div class="secP mih">
    <Services></Services>
  </div>
</template>

<script>

import Services from '@/components/Services.vue'

export default {
	name: 'Servicios',
  components: {
		Services,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>