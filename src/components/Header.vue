<template>
  <div id="header" style="max-height: 130px">

    <div class="v-social-header" ref="socialHeader">
        <div class="v-social-leftbox">
          <div class="item contP">
            <p>Contáctanos</p>
          </div>
          <div class="item">
            <a class="icon flaticon-phone-call" href="tel: +582129851038"></a>
            <a class="v-social-leftTxt" href="tel: +582129851038"> +58.212.985.1038 </a>
          </div>
          <div class="item">
            <a class="icon flaticon-email" href="mailto: info@clubsantapaula.net"></a>
            <a class="v-social-leftTxt" href="mailto: info@clubsantapaula.net"> info@clubsantapaula.net</a>
          </div>
        </div>
      <div class="v-social-rightbox">
          <div class="v-social-right-container">
            <p>Síguenos en </p>
            <div style="display: flex; flex-direction: row; justify-content: flex-start">
              <div class="item">
                <a title="Facebook" href="https://www.facebook.com/Club-Santa-Paula-298392530588034/?__xts__[0]=68.ARDBzo-RGGkBG2HPpJxccWxgxlyL6km99x7__SBWkgUw8LixjgDI87BzXrBlfzzPwketujNaMOOtnJ_LcI6IsbeBNexdENGbC22NGo_9Ga5Qh46R-LDTetq0ZQ76yXYJL2-Rk5nqGzKbdvsUZCvUYTa79WuvOCBENAGa8yRQrn3RVDM4GLNdYNFzXYW4mYt-nKcvYiijMYcbZ6crFI31Ik_xFwi4ZOinlQ-WEP5Nn9rj33YIFlr3J7SMPomlPCqtnVeLlMGMwSiS65efXlg6vFsszdJG5Ul2m-L5xsSwb7snaCKYkna9_7puGa91icoJW_xgigl55rjRp4kM8CRDRRI" target="blank" class="icon flaticon-facebook"></a>
              </div>
              <div class="item">
                <a title="Twitter" href="https://twitter.com/santapaulaclub?lang=es" target="blank" class="icon flaticon-twitter"></a>
              </div>
              <div class="item">
                <a title="Instagram" href="https://www.instagram.com/clubsantapaulaccs/?hl=es-la" target="blank" class="icon flaticon-instagram"></a>
              </div>
            </div>
          </div>          
        </div>
    </div>
    
    <nav class="v-navbar" ref="navBar">
      <div class="v-social-brand">
        <router-link class="v-brand-info" :to="{name: 'Home'}">
            <img src="@/assets/images/logos/logo_220x115.png" alt="CSP Logo" loading="lazy" style="height: auto; width: 160px;">
        </router-link>
      </div>

      <div class="v-collapse v-navbar-collapse" ref="vCollapse">
        <ul class="v-navbar-nav">
          
          <li class="v-nav-item" id="home">
            <div class="v-nav-menu">
              <router-link  id="home-page"  class="v-menu-txt" :to="{name:'Home'}" exact>Home</router-link>
            </div>
          </li>
          
          <li class="v-nav-item" id="us" @mouseover="dropDownMenuOn('us')" @mouseout="dropDownMenuOff('us')">
            <router-link class="v-menu-txt" :to="{name:'Nosotros'}">Nosotros</router-link>
            <ul class="v-dropdown-menu" ref="us">
              <li class="v-dropdown-item">
                <router-link :to="{name:'Nosotros'}"> Historia </router-link> 
              </li>
              <li class="v-dropdown-item">
                <router-link :to="{name:'Nosotros'}"> Juntas Directivas </router-link>
              </li>
              <li class="v-dropdown-item">
                <router-link :to="{name:'Nosotros'}"> Reglamentos </router-link>
              </li>
              <li class="v-dropdown-item">
                <router-link :to="{name:'Nosotros'}"> Normativas </router-link>  
              </li>
              <li class="v-dropdown-item">
                <router-link :to="{name:'Nosotros'}"> Instalaciones </router-link>        
              </li>                                                   
            </ul>
          <i @click="toggleDrop('us')" ref="usIcon" class="flaticon-sort-down"></i>
          </li>

          <li class="v-nav-item" id="serv" @mouseover="dropDownMenuOn('serv')" @mouseout="dropDownMenuOff('serv')">
            <router-link class="v-menu-txt" :to="{name:'Servicios'}">Servicios</router-link>
              <ul class="v-dropdown-menu" ref="serv">
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Servicios'}"> Salón de Belleza </router-link>
                </li>
                <li class="v-dropdown-item"> 
                  <router-link :to="{name:'Servicios'}"> Consecionario </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Servicios'}"> Alquiler de Salones </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Servicios'}"> Enfermería </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Servicios'}"> Sauna </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Servicios'}"> GYM </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Servicios'}"> Tienda de Conveniencias </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Servicios'}"> Tienda Deportiva </router-link>
                </li>                                                   
              </ul>
            <i @click="toggleDrop('serv')" ref="servIcon" class="flaticon-sort-down"></i>
          </li>
          
          <li class="v-nav-item" id="com" @mouseover="dropDownMenuOn('com')" @mouseout="dropDownMenuOff('com')">
            <router-link class="v-menu-txt" :to="{name:'Comites'}">Comités</router-link>
              <ul class="v-dropdown-menu" ref="com">
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Comites'}"> Comités </router-link>
                </li>
                <li class="v-dropdown-item"> 
                  <router-link :to="{name:'Comites'}"> Instructores </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Comites'}"> Reglamentos </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Comites'}"> Normativas y Costos </router-link>
                </li>
                <li class="v-dropdown-item">
                  <router-link :to="{name:'Comites'}"> Gelería </router-link>
                </li>                                                   
              </ul>
            <i @click="toggleDrop('com')" ref="comIcon" class="flaticon-sort-down"></i>
          </li>
          
          <li class="v-nav-item" id="cont">
            <div class="v-nav-menu">
              <router-link class="v-menu-txt" :to="{name:'Contacto'}">Contacto</router-link>
            </div>
          </li>
         
          <!-- <li class="v-nav-item">
            <a class="v-menu-txt" href="http://clubsantapaula.dyndns.org:1081/user/auth/login#no-back-button" target="blank">Autogestión</a>
          </li> -->
          
          
        </ul>
      </div>
      <div class="toggle-menu" @click="toggleMenu()" ref="toggleMenu">
        <i ref="toggleMenuIcon" class="flaticon-menu"></i>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Header',
  data(){
    return {
      toggleValues: ['com', 'serv', 'us']
    }
  },
  methods:{
    addGlowClassButton(id){
      $(`#${id}`)[0].classList.add('v-btn-menu-on');
    },
    removeGlowClassButton(id){
      setTimeout(function() {
        $(`#${id}`)[0].classList.remove('v-btn-menu-on');
      }, 100);
    },
    buttonUrlRedirect(){
      const url = event.target.dataset.url
      window.open(`${url}`, '_blank')
    },
    dropDownMenuOn(target){
      if(window.innerWidth > 600){
        this.$refs[`${target}`].classList.add('v-dropdown-menu-on')
      }
    },
    dropDownMenuOff(target){
      if(window.innerWidth > 600){
        this.$refs[`${target}`].classList.remove('v-dropdown-menu-on')
      }
    },
    toggleMenu(){
      this.$refs.vCollapse.classList.toggle("show");
      if(this.$refs.vCollapse.classList.contains('show')){
        this.$refs.toggleMenuIcon.setAttribute('class', 'flaticon-close')
      }else{
        this.toggleValues.forEach(element =>{
        this.$refs[`${element}`].classList.remove('v-dropdown-menu-on');
        this.$refs[`${element}Icon`].setAttribute('class', 'flaticon-sort-down')
        })
        this.$refs.toggleMenuIcon.setAttribute('class', 'flaticon-menu')
      }
    },
    toggleDrop(target){
      this.toggleValues.forEach(element =>{
        if(target !== element){
          this.$refs[`${element}`].classList.remove('v-dropdown-menu-on');
          this.$refs[`${element}Icon`].setAttribute('class', 'flaticon-sort-down')
        }
      })
      this.$refs[`${target}`].classList.toggle('v-dropdown-menu-on')
      if(this.$refs[`${target}`].classList.contains('v-dropdown-menu-on')){
        this.$refs[`${target}Icon`].setAttribute('class', 'flaticon-arrowhead-pointing-to-the-right')
      }else{
        this.$refs[`${target}Icon`].setAttribute('class', 'flaticon-sort-down')
      }
    },
    toggleHide(target){
      this.$refs[`${target}`].classList.remove('v-dropdown-menu-on')
      this.$refs[`${target}Icon`].setAttribute('class', 'flaticon-sort-down')
    }
  },
  mounted(){

    /* Agregando STICKY al header */
    const navbar = document.querySelector('.v-navbar')
    const vnavItem = document.querySelectorAll('.v-nav-item')
    const stickyOn = navbar.offsetTop
    let homeLink = document.getElementById('home-page')

    window.addEventListener('scroll',  () =>{
      if(window.innerWidth > 600){
        if(window.pageYOffset >= stickyOn){
          navbar.style.backgroundColor = "rgba(255,255,255,1)"
          navbar.style.top = "0" 
          navbar.style.position = "fixed"
        }else {
          if(homeLink.classList.contains('router-link-active')){
            navbar.style.backgroundColor = "rgba(255,255,255,0.85)"
            navbar.style.top = null
            navbar.style.position = "absolute"
          }else{
            navbar.style.backgroundColor = "rgba(255,255,255)"
            navbar.style.top = '0px'
            navbar.style.position = "relative"
          }
        }
      }
    })

    /* Animando el dropdown menu */
    
    const navItems = document.querySelectorAll('.v-nav-item')
    const dropItems = document.querySelectorAll('.v-dropdown-menu')
    let dropIds = []
    let navIds = []

    /* Width de los iconos del menu */

    let menuWidth = (window.innerWidth*0.65-10*navItems.length)/navItems.length
    
    if(window.innerWidth > 600){
      for(let i = 0; i < navItems.length; i++){
        navItems[i].style.width = `${menuWidth}px`
      }
    }else{
      for(let i = 0; i < navItems.length; i++){
        navItems[i].style.width = `100%`
      }
    }

    window.addEventListener('resize', ()=>{
      menuWidth = (window.innerWidth*0.65-10*navItems.length)/navItems.length

      if(window.innerWidth > 600){
        for(let i = 0; i < navItems.length; i++){
          navItems[i].style.width = `${menuWidth}px`
        }
      }else{
        for(let i = 0; i < navItems.length; i++){
          navItems[i].style.width = `100%`
        }
      }
    })

    /**
    ====================================
    Menu Toggle
    ====================================
    **/
    const collapseMenu = document.querySelector('.v-collapse')
    const dropDownMenu = document.querySelectorAll('.v-dropdown-menu')

    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 600){
        collapseMenu.classList.remove("show");
        if(this.$refs.toggleMenuIcon !== undefined){
          this.$refs.toggleMenuIcon.setAttribute('class', "flaticon-menu");
          this.$refs.usIcon.setAttribute('class', "flaticon-sort-down");
          this.$refs.comIcon.setAttribute('class', "flaticon-sort-down");
          this.$refs.servIcon.setAttribute('class', "flaticon-sort-down");
        }
        for(let i = 0; i < dropDownMenu.length; i++){
          dropDownMenu[i].classList.remove("v-dropdown-menu-on");
        }
      }
    })
  }
}
</script>