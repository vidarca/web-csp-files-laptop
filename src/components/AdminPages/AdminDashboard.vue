<template>
  <div id="admin-dashboard" v-if="show">
      <h4>DASHBOARD</h4>
  </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    name: 'AdminDashboard',

    data(){
      return{
        show: false,
      }
    },

    computed:{
      ...mapState(['dbWeb']),
    },

    methods:{
      ...mapMutations(['changeSecTitle']),
      ...mapActions(['getData']),
    },

    created(){
      this.changeSecTitle('Dashboard')
    },

    mounted(){
      this.getData().then(() => {
        this.show = true;
      })
    },
}
</script>