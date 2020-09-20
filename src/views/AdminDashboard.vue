<template>
  <div id="admin-dashboard" class="mih">
    <AdminDashboardPage></AdminDashboardPage>
  </div>
</template>

<script>

import AdminDashboardPage from '@/components/AdminDashboardPage.vue'

export default {
	name: 'AdminDashboard',
    components: {
		AdminDashboardPage,
	},
	mounted() {
		window.scrollTo(0, 0);
	},
}
</script>