<template>
  <div id="header">

    <div class="v-social-header">
        <div class="v-social-leftbox">
          <div class="item">
            <div class="icon flaticon-telephone"></div>
            <a href="tel: +582129851038" style="color: black; font-size: 15px; line-height: 40px; margin-left: 5px; font-weight: bolder; ">Telf: +58.212.985.1038 </a>
          </div>
          <div class="item">
            <div class="icon flaticon-email"></div>
            <a href="mailto: info@clubsantapaula.net" style="color: black; font-size: 15px; line-height: 40px; margin-left: 5px; font-weight: bolder; ">Correo: info@clubsantapaula.net</a>
          </div>
        </div>
      <div class="v-social-midbox">
          <img src="@/assets/logo_215x60.png" width="115" height="115" alt="" loading="lazy" style="align-self: center">
          <div style="color:#09197d; text-align:center"> <p style="line-height: 100%; font-size: 30px; margin: 0;">Club Santa Paula</p> <i style="height: 100%; line-height: 0px; font-size:20px; margin: 0;"> 40 años </i> </div>
      </div>
      <div class="v-social-rightbox">
          <div class="v-social-right-container">
            <p>Síguenos en </p>
            <div style="width: 50%; display: flex; flex-direction: row; justify-content: space-between">
              <div class="item">
                <a title="Facebook" href="https://www.facebook.com/Club-Santa-Paula-298392530588034/?__xts__[0]=68.ARDBzo-RGGkBG2HPpJxccWxgxlyL6km99x7__SBWkgUw8LixjgDI87BzXrBlfzzPwketujNaMOOtnJ_LcI6IsbeBNexdENGbC22NGo_9Ga5Qh46R-LDTetq0ZQ76yXYJL2-Rk5nqGzKbdvsUZCvUYTa79WuvOCBENAGa8yRQrn3RVDM4GLNdYNFzXYW4mYt-nKcvYiijMYcbZ6crFI31Ik_xFwi4ZOinlQ-WEP5Nn9rj33YIFlr3J7SMPomlPCqtnVeLlMGMwSiS65efXlg6vFsszdJG5Ul2m-L5xsSwb7snaCKYkna9_7puGa91icoJW_xgigl55rjRp4kM8CRDRRI" target="blank" class="icon fa fa-facebook"></a>
              </div>
              <div class="item">
                <a title="Twitter" href="https://twitter.com/santapaulaclub?lang=es" target="blank" class="icon fa fa-twitter"></a>
              </div>
              <div class="item">
                <a title="Instagram" href="https://www.instagram.com/clubsantapaulaccs/?hl=es-la" target="blank" class="icon fab fa-instagram"></a>
              </div>
            </div>
          </div>          
        </div>
    </div>

    <nav class="v-navbar d-flex col-auto">
        <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <div class="v-collapse v-navbar-collapse">
          <ul class="v-navbar-nav">
            <div class="v-vr"></div>
            <li class="v-nav-item" id="home">
            <div class="v-nav-menu">
              <router-link class="v-main-item" :to="{name:'Home'}" exact>
                <div class="v-menu-txt">Home</div>
              </router-link>
            </div>
            </li>
            <div class="v-vr"></div>
            <li class="v-nav-item" id="us">
              <div class="v-nav-menu">
                <router-link class="v-main-item" :to="{name:'Nosotros'}">
                  <div class="v-menu-txt">Nosotros</div> 
                </router-link>
                  <div class="v-dropdown-menu" id="us">
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
                  </div>
              </div>
            </li>
            <div class="v-vr"></div>
            <li class="v-nav-item" id="serv">
            <div lass="v-nav-menu" >
              <router-link class="v-main-item" :to="{name:'Servicios'}">
                <div class="v-menu-txt">Servicios</div> 
              </router-link>
                <div class="v-dropdown-menu" id="serv">
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
                </div>

            </div>
            </li>
            <div class="v-vr"></div>
            <li class="v-nav-item" id="com">
            <div lass="v-nav-menu" >
              <router-link class="v-main-item" :to="{name:'Comites'}">
                <div class="v-menu-txt">Comités</div> 
              </router-link>
                <div class="v-dropdown-menu" id="com">
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
                </div>
            </div>
            </li>
            <div class="v-vr"></div>
            <li class="v-nav-item" id="act">
            <div class="v-nav-menu">
              <router-link class="v-main-item" :to="{name:'Actualidad'}">
                <div class="v-menu-txt">Actualidad</div> 
              </router-link>
            </div>
            </li>
            <div class="v-vr"></div>
            <li class="v-nav-item" id="cont">
            <div class="v-nav-menu">
              <router-link class="v-main-item" :to="{name:'Contacto'}">
                <div class="v-menu-txt">Contacto</div> 
              </router-link>
            </div>
            </li>
            <div class="v-vr"></div>
            <li class="v-nav-item">
              <button  class="v-btn v-btn-menu" id="menu-btn" data-url="http://clubsantapaula.dyndns.org:1081/user/auth/login#no-back-button" @click="buttonUrlRedirect('menu-btn')" @mousedown="addGlowClassButton('menu-btn')" @mouseup="removeGlowClassButton('menu-btn')"  @mouseleave="removeGlowClassButton('menu-btn')">Iniciar Seción</button>
            </li>
            <div class="v-vr"></div>
            
          </ul>
        </div>
      </nav>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Header',
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
  }

  },
  mounted(){

    /* Agregando STICKY al header */
    const navbar = document.querySelector('.v-navbar')
    const vnavItem = document.querySelectorAll('.v-nav-item')
    const stickyOn = navbar.offsetTop
    window.addEventListener('scroll',  () =>{
      if(window.pageYOffset >= stickyOn){
        navbar.style.backgroundColor = "rgba(255,255,255,1)"
        navbar.style.top = "0" 
        navbar.style.position = "fixed"
      }else {
        navbar.style.backgroundColor = "rgba(255,255,255,0.85)"
        navbar.style.top = null
        navbar.style.position = null
      }
    })

    /* Animando el dropdown menu */
    
    const navItems = document.querySelectorAll('.v-nav-item')
    const dropItems = document.querySelectorAll('.v-dropdown-menu')
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

    /* Width de los iconos del menu */

    const menuTxt = document.querySelectorAll('.v-menu-txt')
    let menuWidth = (window.innerWidth*0.65-10*navItems.length)/navItems.length
    
    for(let i = 0; i < menuTxt.length; i++){
      menuTxt[i].style.width = `${menuWidth}px`
    }

    for(let i = 0; i < navItems.length; i++){
      navItems[i].style.width = `${menuWidth}px`
    }

    window.addEventListener('resize', ()=>{
      menuWidth = (window.innerWidth*0.65-10*navItems.length)/navItems.length

      for(let i = 0; i < menuTxt.length; i++){
        menuTxt[i].style.width = `${menuWidth}px`
      }

      for(let i = 0; i < navItems.length; i++){
        navItems[i].style.width = `${menuWidth}px`
      }
      })
  }
}
</script>