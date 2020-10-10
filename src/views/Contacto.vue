<template>
  <div class="secP mih">
    <ContactPage></ContactPage>
  </div>
</template>

<script>

import ContactPage from '@/components/ContactPage.vue'

export default {
	name: 'Contacto',
  components: {
		ContactPage,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>