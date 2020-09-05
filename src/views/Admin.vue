<template>
  <div id="admin">
    <AdminPage></AdminPage>
  </div>
</template>

<script>

import AdminPage from '@/components/AdminPage.vue'

export default {
	name: 'Admin',
    components: {
		AdminPage,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>