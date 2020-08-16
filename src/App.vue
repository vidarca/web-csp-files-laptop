<template>
  <div id="app">

    <div class="v-social-header">
      <div class="v-social-container">
        <div class="v-social-leftbox">
          <div class="item">
            <div class="icon flaticon-telephone"></div>
            <a href="tel: +582129851038">Telf: +58.212.985.1038 </a>
          </div>
          <div class="item">
            <div class="icon flaticon-email"></div>
            <a href="mailto: info@clubsantapaula.net">Correo: info@clubsantapaula.net</a>
          </div>
        </div>
        <div class="v-social-rightbox">
          <div class="v-social-right-container">
            <p>Síguenos en: </p>
            <div class="item">
              <a href="https://www.facebook.com/Club-Santa-Paula-298392530588034/?__xts__[0]=68.ARDBzo-RGGkBG2HPpJxccWxgxlyL6km99x7__SBWkgUw8LixjgDI87BzXrBlfzzPwketujNaMOOtnJ_LcI6IsbeBNexdENGbC22NGo_9Ga5Qh46R-LDTetq0ZQ76yXYJL2-Rk5nqGzKbdvsUZCvUYTa79WuvOCBENAGa8yRQrn3RVDM4GLNdYNFzXYW4mYt-nKcvYiijMYcbZ6crFI31Ik_xFwi4ZOinlQ-WEP5Nn9rj33YIFlr3J7SMPomlPCqtnVeLlMGMwSiS65efXlg6vFsszdJG5Ul2m-L5xsSwb7snaCKYkna9_7puGa91icoJW_xgigl55rjRp4kM8CRDRRI" target="blank" class="icon fa fa-facebook"></a>
            </div>
            <div class="item">
              <a href="https://twitter.com/santapaulaclub?lang=es" target="blank" class="icon fa fa-twitter"></a>
            </div>
            <div class="item">
              <a href="https://www.instagram.com/clubsantapaulaccs/?hl=es-la" target="blank" class="icon fab fa-instagram"></a>
            </div>
          </div>          
        </div>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg">
      <div class="d-flex flex-row">
        <img src="@/assets/logo_215x60.png" width="100" alt="" loading="lazy" style="max-height:100px; align-self: center">
        <div class="m-0" style="padding-bottom: 20px; max-height:120px; color:#09197d"> <p style="max-height: 50px; line-height: 100px; font-size: 40px; margin: 0;">Club Santa Paula</p> <br> <i style="height: 100%; line-height: 0px; text-align:left; font-size:20px; margin: 0;"> 40 años </i> </div>
      </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" id="home">
              <router-link class="v-nav-item" :to="{name:'Home'}" exact>
                Home
              </router-link>
            </li>
            <li class="nav-item" id="us">
              <router-link class="v-nav-item" :to="{name:'Nosotros'}">
                Nosotros
                <div class="v-dropdown-menu" id="us">
                  <li class="v-dropdown-item">
                    <a href=""> Historia </a>
                  </li>
                  <li class="v-dropdown-item"> 
                    <a href=""> Juntas Directivas </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Reglamentos </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Normativas </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Instalaciones </a>
                  </li>
                </div>
              </router-link>
            </li>
            <li class="nav-item" id="serv">
              <router-link class="v-nav-item"  :to="{name:'Servicios'}">
                Servicios
                <div class="v-dropdown-menu" id="serv">
                  <li class="v-dropdown-item">
                    <a href=""> Salón de Belleza </a>
                  </li>
                  <li class="v-dropdown-item"> 
                    <a href=""> Consecionario </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Alquiler de Salones </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Enfermería </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Sauna </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> GYM </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Tienda de Conveniencias </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Tienda Deportiva </a>
                  </li>
                </div>
              </router-link>
            </li>
            <li class="nav-item" id="com">
              <router-link class="v-nav-item"  :to="{name:'Comites'}">
                Comités
                <div class="v-dropdown-menu" id="com">
                  <li class="v-dropdown-item">
                    <a href=""> Comités </a>
                  </li>
                  <li class="v-dropdown-item"> 
                    <a href=""> Instructores </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Reglamentos </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Normativas y Costos </a>
                  </li>
                  <li class="v-dropdown-item">
                    <a href=""> Gelería </a>
                  </li>
                </div>
              </router-link>
            </li>
            <li class="nav-item" id="act">
              <router-link class="v-nav-item"  :to="{name:'Actualidad'}">
                Actualidad
              </router-link>
            </li>
            <li class="nav-item" id="cont">
              <router-link class="v-nav-item"  :to="{name:'Contacto'}">
                Contacto
              </router-link>
            </li>
            <li class="nav-item" style="align-self:center">
              <a class="btn btn-success" href="http://clubsantapaula.dyndns.org:1081/user/auth/login#no-back-button" target="blank">Iniciar Seción</a>
            </li>
          </ul>
        </div>
      </nav>

    <router-view/>

  </div>
</template>

<script>
export default {
  methods:{
  },
  mounted(){

    /* Agregando STICKY al header */
    const navbar = document.querySelector('.navbar')
    const vnavItem = document.querySelectorAll('.v-nav-item')
    const stickyOn = navbar.offsetTop
    window.addEventListener('scroll',  () =>{
      if(window.pageYOffset >= stickyOn){
        navbar.style.opacity = "0.8"
        navbar.style.zIndex ="2" 
        navbar.style.top = "0" 
        navbar.style.position = "fixed"
        navbar.style.height = "110px"
        vnavItem.forEach(element =>{
          element.style.lineHeight = "110px"
        })
      }else {
        navbar.style.opacity = null
        navbar.style.zindex = null
        navbar.style.top = null
        navbar.style.position = null
        navbar.style.height = "120px"
        vnavItem.forEach(element =>{
          element.style.lineHeight = "120px"
        })
      }
    })

    /* Animando el dropdown menu */
    
    const navItems = document.querySelectorAll('.nav-item')
    const dropItems = document.querySelectorAll('.v-dropdown-menu')
    console.log(dropItems[0].children)
    let dropIds = []
    let navIds = []

    dropItems.forEach(element =>{
      dropIds.push(element.id)
    })

    navItems.forEach(element =>{
      navIds.push(element.id)
    })
    
    for(let i = 0; i < navIds.length; i++){
        for(let j = 0; j < dropIds.length; j++){
          if(navIds[i] === dropIds[j]){
            navItems[i].addEventListener('mouseover', ()=>{
              dropItems[j].classList.add('v-dropdown-menu-on')
            })
            navItems[i].addEventListener('mouseout', ()=>{
              dropItems[j].classList.remove('v-dropdown-menu-on')
            })
          }
        }
    }

  }
}
</script>

<style>
  @import './assets/css/style.css';
  @import './assets/css/animate.css';
</style>
