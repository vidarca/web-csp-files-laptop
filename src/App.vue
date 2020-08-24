<template>
  <div id="app" class="main">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions(['getData'])
  },
  mounted() {
    this.getData()
  },
}
</script>

<style>
  @import './assets/css/style.css';
  @import './assets/css/animate.css';
</style>