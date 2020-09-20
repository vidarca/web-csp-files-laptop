<template>
  <div class="comites mih">
    <ActPage></ActPage>
  </div>
</template>

<script>
import ActPage from '@/components/ActPage.vue'

export default {
	name: 'Admin',
    components: {
		ActPage,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>