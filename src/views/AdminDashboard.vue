<template>
  <div id="admin-dashboard" class="mih" style="background-color:#f0f2f5;">
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