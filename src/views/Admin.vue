<template>
  <div id="admin" class="mih">
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