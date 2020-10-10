<template>
  <div class="comites mih">
    <ActPage></ActPage>
  </div>
</template>

<script>
import ActPage from '@/components/ActPage.vue'

export default {
	name: 'Actualidad',
    components: {
		ActPage,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>