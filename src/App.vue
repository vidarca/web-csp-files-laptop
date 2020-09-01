<template>
  <div id="app" class="main">
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  methods:{
    ...mapMutations(['isResponsive']),
    ...mapActions(['getData']),
  },
  created(){
    this.isResponsive()
    window.addEventListener('resize', ()=>{
      this.isResponsive()
    })
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