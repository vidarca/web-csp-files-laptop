<template>
  <div class="secP mih" style="background-color: #f0f2f5;">
    <JuntasHistorial></JuntasHistorial>
  </div>
</template>

<script>

import JuntasHistorial from '@/components/JuntasHistorial.vue'

export default {
	name: 'JuntasDirectivas',
  components: {
		JuntasHistorial,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>