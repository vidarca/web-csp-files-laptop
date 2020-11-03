<template>
  <div id="nosotros">
    <!-- Banner con bootstrap -->
        <section class="banner-section">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" v-if="selectBanners">
            <div class="carousel-inner">
                <div :class="['carousel-item', (index === 0)?'active':'']" v-for="(slide, index) in Object.values(bannersList[0].bann_slides)" :key="index" ref="carouselitems">
                    <img :src="slide.url">
                    <div v-if="slide.info !== '' && slide.info !== undefined" :class="['textcontainer', (index % 2 === 0)?'textcontainerpos1':'textcontainerpos2']">
                        {{slide.info}}
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            </div>
        </section>
    <!-- Fin del banner -->
    <!-- Seccion Destacados -->
    <section class="featured-section">
        <div class="auto-wrapper ">
            <div class="inner-container ">
                
                <div class="clearfix row m-auto align-items-center justify-content-center" style="width:100%">
                    
                    <!-- Featured Block -->
                    <div class="featured-block col-lg-6	col-md-6 col-sm-12">
                        <div class="inner-box">
                            <div class="content">
                                <div class="icon-box">
                                    <span class="icon flaticon-newspaper"></span>
                                </div>
                                <h5><router-link :to="{name: 'Actualidad'}">Actualidad</router-link></h5>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Featured Block -->
                    <div class="featured-block col-lg-6 col-md-6 col-sm-12" id="second-featured">
                        <div class="inner-box">
                            <div class="content">
                                <div class="icon-box">
                                    <span class="icon flaticon-key"></span>
                                </div>
                                <h5><a href="http://clubsantapaula.dyndns.org:1081/user/auth/login">Autogestión</a></h5>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </section>
    <!-- Seccion Destacados -->
    <div class="w-95 m-auto">
        <h3 class="w-100 text-center border-bottom" style="padding: 40px 0 20px 0;">¿Quiénes somos?</h3>
        <h4 class="w-75 text-center m-auto" style="padding: 20px 0 60px 0;">El Club Santa Paula es un club social interdisciplinario enfocado en el deporte. Entre nuestras actividades deportivas se encuentran tenis, karate, squash y natación.</h4>
    </div>

    <section class="featured-section-three">
		<div class="auto-container">
				<div class="inner-container d-flex flex-column flex-lg-row align-items-center justify-content-center w-95 m-auto">

                    <div class="icons-container">
                        <!-- Featured Block Three -->
                        <div class="featured-block-three style-two right-corner">
                            <div class="inner-box wow fadeInLeft">
                                <div class="icon-box">
                                    <span class="icon flaticon-objetivo"></span>
                                </div>
                                <div>
                                    <h5>Misión</h5>
                                    <div class="text">El objetivo primordial del Club Santa Paula es proporcionar a sus socios actividades sociales, culturales, deportivas, de recreación y esparcimiento.</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Featured Block Three -->
                        <div class="featured-block-three color-two bottom-corner">
                            <div class="inner-box wow fadeInLeft">
                                <div class="icon-box">
                                    <span class="icon flaticon-vision"></span>
                                </div>
                                <div>
                                    <h5>Visión</h5>
                                    <div class="text">Ser reconocida como una institución líder en recreación y deportes, participando en torneos y competencias deportivas de las diversas Asociaciones de Clubes.</div>
                                </div>
                            </div>
                        </div>

                        <!-- Featured Block Three -->
                        <div class="featured-block-three  top-corner">
                            <div class="inner-box wow fadeInRight">
                                <div class="icon-box flaticon-objetivo-1"></div>
                                <div>
                                    <h5>Objetivos</h5>
                                    <div class="text">
                                        Ser líder absoluto entre los clubes de ciudad, al brindar la mejor opción de entretenimiento y descanso para los citadinos. Ser el club de referencia y colocarse entre los primeros en cuanto al control interno administrativo.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="extra"></div>
                    </div>
					
					<!-- Icon Column -->
					<div class="w-75 center-column m-auto">
                        <div class="circle-one"></div>
                        <div class="circle-two"></div>
                        <div class="circle-three"></div>
                        <div class="icon flaticon-seguro-de-hogar"></div>
					</div>
					
				</div>
		</div>
	</section>

    
	<!-- Seccion de Autogestion -->
		<AutogestionSpan></AutogestionSpan>
	<!-- Fin Seccion Autogestion -->

    <section class="junta-directiva w-95 m-auto"  v-if="getJuntaActual">
        <h3 class="w-100 text-center border-bottom" style="padding: 40px 0 20px 0;">Junta Directiva Actual</h3>
        <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center flex-wrap" style="padding: 40px 0 20px 0;">
            <div v-for="(integrante, index) in juntaActual.junt_integrantes" :key="integrante.juin_cargo" v-show="index < maxShowJuin" :class="['juin-container flex-column align-items-center justify-content-start pt-3 pb-3 col-12', (index === 0 || index === 1)?'col-sm-6':(index >= 1 && index < 5)?'col-sm-4':(index >= 5 && index < 9)?'col-sm-3':'col-sm-6']" style="display:  flex;">
                <div class="imagen">
                    <img :src="(integrante.juin_foto !== '' && integrante.juin_foto !== undefined)?integrante.juin_foto:'https://firebasestorage.googleapis.com/v0/b/web-database-66842.appspot.com/o/transparent.png?alt=media&token=533f3017-de64-49b5-8ee9-cb8950445931'" class="juin-foto">
                    <i :class="[(integrante.juin_foto === '' || integrante.juin_foto === undefined)?'icon flaticon-user':'']"></i>
                </div>
                <div class="text">{{integrante.juin_cargo}}</div>
                <div class="text">{{integrante.juin_nombre}} {{integrante.juin_apellido}}</div>
                <div class="text">{{integrante.juin_correo}}</div>
            </div>
            <h5 class="w-100 text text-center pb-3">
                <router-link :to="{name:'HistorialDeJuntas'}"> Ver todas las juntas directivas </router-link>
            </h5>
        </div>
    </section>

    <section class="reglamento-normativas w-95 m-auto">
        <h3 class="w-100 text-center border-bottom" style="padding: 40px 0 20px 0;">Reglamentos y Normativas</h3>
        <div class="file-download-container radial-circle d-flex align-items-center justify-content-center">
            <div class="w-60 d-flex flex-column flex-md-row align-items-center justify-content-md-between justify-content-center m-auto">
                <div class="btn-download" @click="openFile($event, Object.values(dbWeb.Miscellaneous)[0].misc_reglamentos.url)" data-animated="false">
                    <div class="text noselect">
                        Reglamentos
                    </div>
                </div>
                <div class="btn-download" @click="openFile($event, Object.values(dbWeb.Miscellaneous)[0].misc_normativas.url)" data-animated="false">
                    <div class="text noselect">
                        Normativas
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import AutogestionSpan from '@/components/AutogestionSpan.vue'

export default {
    name: 'UsPage',
    data(){
        return {
            juntaActual: [],
            maxShowJuin: 11,
            smScreen: false,
        }
    },
    components:{
        AutogestionSpan
    },

    computed:{
        ...mapState(['dbWeb']),
        getJuntaActual(){
            const d = new Date();
            const dString = d.toString();
            const dStringSplitted = dString.split(' ');
            const actualDate = dStringSplitted[3]
            if(this.dbWeb.Juntas !== undefined){
                for(let i = 0; i < Object.values(this.dbWeb.Juntas).length; i++){
                    if(Object.values(this.dbWeb.Juntas)[i].junt_periodo.split('-')[1] === actualDate){
                        this.juntaActual = Object.values(this.dbWeb.Juntas)[i];
                        return true
                    }
                }
                return false
            }
        },
        selectBanners(){
			if(this.dbWeb.Banners !== undefined){
				for(let i = 0; i < Object.values(this.dbWeb.Banners).length; i++){
					if(Object.values(this.dbWeb.Banners)[i].bann_seccion.toLowerCase() === "nosotros"){
						this.bannersList.push(Object.values(this.dbWeb.Banners)[i]);
						return true;
					}
					return false;
				}
				return false;
			}
		}
    },

    methods:{
        openFile(event, url){
            if(url !== '' && url !== undefined){
                window.open(url,'_blank');
            }
      },
    },

    created(){
        if(window.innerWidth <= 768){
            this.maxShowJuin = 5;
        }else{
            this.maxShowJuin = 11;
        }
        if(window.innerWidth <= 576){
            this.smScreen = true;
        }

        window.addEventListener('resize', ()=>{
            if(window.innerWidth <= 768){
                this.maxShowJuin = 5;
            }else{
                this.maxShowJuin = 11;
            }
            if(window.innerWidth <= 576){
                this.smScreen = true;
            }
        })
    },

    mounted(){
        this.$nextTick(() =>{
		
            if(this.$refs.carouselitems !== undefined){
                
                /* Textos del banner */

                const carouseli = this.$refs.carouselitems;
                
                carouseli.forEach(item => {
                    if(item.classList.contains('active')){
                        item.children[1].classList.add('toggle-mheight-opacity');
                    }
                })

                
                carouseli[0].addEventListener("transitionend", ()=> {
                    carouseli.forEach(item => {
                        if(item.classList.contains('active')){
                            item.children[1].classList.add('toggle-mheight-opacity');
                        }else{
                            item.children[1].classList.remove('toggle-mheight-opacity');
                        }
                    })
                })
            }
            
        })
    }
}
</script>