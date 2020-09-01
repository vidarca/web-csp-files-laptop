<template>
  <div id="services">
	<Header></Header>

    <AutogestionSpan></AutogestionSpan>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AutogestionSpan from '@/components/AutogestionSpan.vue'

export default {
    name: 'Services',
    components: {
        Header,
        AutogestionSpan,
	},
}
</script>

<style>

</style>