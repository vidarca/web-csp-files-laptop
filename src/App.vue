<template>
  <div id="app" class="main w-100" v-if="loaded" style="background-color: rgb(240, 242, 245);">
    <div class="preloaderini" ref="loaderSpinner" v-if="showSpinner">
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <Header></Header>
    <transition name="fade-down" mode="out-in">
      <router-view/>
    </transition>
    <div class="back-btn">
      <button @click="goToTop()" class="icon"><i class="flaticon-up-chevron"></i></button>
    </div>
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
      showSpinner: true,
      transitionName: '',
    } 
  },
  methods:{
    ...mapActions(['getData']),
    goToTop(){
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		},
  },

  mounted(){
    this.getData().then(() => {
      this.loaded = true;
      setTimeout(() => {
        this.$refs.loaderSpinner.classList.add('hide-opacity');
      }, 1000);
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000);
    })
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
        
        header.style.display = 'none'
        footer.style.display = 'none'

        return
      }else{
        let header = document.getElementById('header')
        let footer = document.getElementById('footer')
        
        header.style.display = "block"
        footer.style.display = "block"
      }
    }

  },
}
</script>

<style>
  @import './assets/css/style.css';
  @import './assets/css/animate.css';

  .preloaderini{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 99999999999;
    top: 0;
    left: 0;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    -webkit-transition: opacity 1s ease-out;
    -ms-transition: opacity 1s ease-out;
    -o-transition: opacity 1s ease-out;
    -moz-transition: opacity 1s ease-out;
    transition: opacity 1s ease-out;
  }

</style>