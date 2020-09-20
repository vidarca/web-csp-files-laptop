<template>
  <div id="app" class="main w-100" v-if="loaded">
    <Header></Header>
    <transition name="fade-down" mode="out-in">
      <router-view/>
    </transition>
	  <Footer></Footer>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import firebase from 'firebase'

export default {
  components:{
		Header,
		Footer,
  },
  data(){
    return {
      loaded: false,
      transitionName: '',
    } 
  },
  methods:{
    ...mapMutations(['isResponsive']),
    ...mapActions(['getData']),
  },

  created(){
    this.getData().then(() => {
      this.loaded = true
    })
  

    /* this.isResponsive()
    window.addEventListener('resize', ()=>{
      this.isResponsive()
    }) */
  },

  updated(){
    let homeLink = document.getElementById('home-page')
    let navBar = document.querySelector('.v-navbar')
    let socialHeader = document.querySelector('.v-social-header')
    
    setTimeout(() => {
      if(homeLink.classList.contains('router-link-active')){
        navBar.style.position = 'absolute'
        navBar.style.backgroundColor = "rgba(255,255,255,0.85)"
        navBar.style.top = "30px"
        socialHeader.style.position = 'absolute'
        socialHeader.style.backgroundColor = "rgba(255,255,255,0.85)"
      }else{
        navBar.style.position = 'relative'
        navBar.style.backgroundColor = "rgba(255,255,255)"
        navBar.style.top = "0"
        socialHeader.style.position = 'relative'
        socialHeader.style.backgroundColor = "rgba(255,255,255)"
      }
    }, 800);

    const href = window.location.href
    const hrefSplice = href.split('/')
    for(let i = 0; i < hrefSplice.length; i++){
      if(hrefSplice[i] === 'v-admin'){
        let header = document.getElementById('header')
        let footer = document.getElementById('footer')
        
        header.style.display = "none"
        footer.style.display = "none"
      }
    }

  },
}
</script>

<style>
  @import './assets/css/style.css';
  @import './assets/css/animate.css';

  /**
  ==============================================
  Vue Transitions
  ==============================================
  **/

</style>