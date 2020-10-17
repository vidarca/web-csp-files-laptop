<template>
  <div id="juntas-directivas">
    <!-- Banner con bootstrap -->
    <section class="banner-section">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="@/assets/images/background/BannerSlide01.jpg" alt="...">
            </div>
            <div class="carousel-item">
                <img src="@/assets/images/background/BannerSlide01.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="@/assets/images/background/BannerSlide01.jpg" class="d-block w-100" alt="...">
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

    <h4 class="w-100 text-center text pt-4">Aquí podrás ver todas las juntas directivas que han formado parte de nuestro Club Santa Paula. <br> Puedes verlas a más detalle haciendo clic sobre cualquiera de ellas</h4>
    <section class="juntas-todas w-85 m-auto pb-4" ref="section0" v-show="showList">
        <div class="cada-junta d-flex align-items-center justify-content-center flex-column flex-sm-row pb-4 pt-4">
            <div v-for="(junta, index) in dbWeb.Juntas" :key="junta.junt_id">
                <div class="junta-container d-flex flex-column align-items-center justify-content-center col-12 col-sm-4 col-md-3 p-0">
                    <div class="imagen" @click="selecJunta(index)">
                        <img class="junta-foto" :src="(junta.junt_integrantes[0].juin_foto !== '' && junta.junt_integrantes[0].juin_foto !== undefined)?junta.junt_integrantes[0].juin_foto:'https://firebasestorage.googleapis.com/v0/b/web-database-66842.appspot.com/o/transparent.png?alt=media&token=533f3017-de64-49b5-8ee9-cb8950445931'">
                        <i :class="[(junta.junt_integrantes[0].juin_foto === '' || junta.junt_integrantes[0].juin_foto === undefined)?'icon':'']"></i>
                    </div>
                </div>
                <div class="text text-center pt-2">
                    Período: {{junta.junt_periodo}}
                </div>
            </div>
        </div>
        <div class="bot-selectors d-flex flex-row align-items-center justify-content-center position-relative align-self-end" v-if="showSelect === true">
          <div class="position-relative" style="width: 25px; height: 25px;">
            <i class="icon left-arrow flaticon-arrowhead-pointing-to-the-right" style="transform: rotate(180deg);" @click="translateLeft()"></i>
          </div>
          <div class="bot-container">
            <div class="inner-container d-flex flex-row justify-content-center align-items-center" ref="innerContainer">
              <div v-for="index in number" :key="index">
                <div :class="['circle', (index === 1)?'active':'']" :ref="`bot${index}`" :id="index">
                  <div class="text" @click="changeIndex(index)">{{index}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="position-relative" style="width: 25px; height: 25px;">
            <i class="icon right-arrow flaticon-arrowhead-pointing-to-the-right" @click="translateRight()"></i>
          </div>
        </div>
    </section>

    <section class="junta-directiva w-95 m-auto translate" ref="section1"  v-show="showJunta">
        <h3 class="w-100 text-center border-bottom" style="padding: 40px 0 20px 0;">Junta Directiva {{juntaSelect.junt_periodo}}</h3>
        <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center flex-wrap" style="padding: 40px 0 20px 0;">
            <div v-for="(integrante, index) in juntaSelect.junt_integrantes" :key="integrante.juin_cargo" v-show="index < maxShowJuin" :class="['juin-container flex-column align-items-center justify-content-start pt-3 pb-3 col-12', (index === 0 || index === 1)?'col-sm-6':(index >= 1 && index < 5)?'col-sm-4':(index >= 5 && index < 9)?'col-sm-3':'col-sm-6']" style="display:  flex;">
                <div class="imagen">
                    <img :src="(integrante.juin_foto !== '' && integrante.juin_foto !== undefined)?integrante.juin_foto:'https://firebasestorage.googleapis.com/v0/b/web-database-66842.appspot.com/o/transparent.png?alt=media&token=533f3017-de64-49b5-8ee9-cb8950445931'" class="juin-foto">
                    <i :class="[(integrante.juin_foto === '' || integrante.juin_foto === undefined)?'icon flaticon-user':'']"></i>
                </div>
                <div class="text">{{integrante.juin_cargo}}</div>
                <div class="text">{{integrante.juin_nombre}} {{integrante.juin_apellido}}</div>
                <div class="text">{{integrante.juin_correo}}</div>
            </div>
            <button class="btn btn-dark" @click="regresar()">Regresar</button>
        </div>
    </section>
  </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
    name: 'JuntasHistorial',
    data(){
        return {
            juntaSelect: [],
            maxShowJuin: 11,
            smScreen: false,
            showJunta: false,
            showSelect: false,
            showList: true,
            number: 0,
        }
    },

    computed:{
        ...mapState(['dbWeb']),
    },

    methods:{
        getJuntaSelect(index){
            this.juntaSelect = this.dbWeb.Juntas[index];
            this.showJunta = true;
        },
        translateLeft(){
            if(this.currentIndex > 1){
                this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) + 45}px)`
                this.currentIndex --;
            }
        },
        changeIndex(val){
            this.$refs.anuncios.forEach(element => {
                element.dataset.transitioned = 'true';
                if(element.dataset.index % 2 === 0){
                element.classList.toggle('translate');
                }else{
                element.classList.toggle('translate-left');
                }
            })
            setTimeout(() => {
                this.showIndex = this.numElements*(val-1);
            }, 700);
            setTimeout(() => {
                this.$refs.anuncios.forEach(element => {
                element.dataset.transitioned = 'false';
                if(element.dataset.index % 2 === 0){
                    element.classList.toggle('translate');
                }else{
                    element.classList.toggle('translate-left');
                }
                })
            }, 800);
            this.$refs.innerContainer.children.forEach(element => {
                if(parseInt(element.children[0].id) !== val){
                element.children[0].classList.remove('active');
                }else if(parseInt(element.children[0].id) === val){
                element.children[0].classList.add('active');
                }
            })
        },
        translateRight(){
            if(this.currentIndex <= 5*((this.$refs.innerContainer.children.length/5)-1)){
                this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) - 45}px)`
                this.currentIndex ++;
            }
        },
        selecJunta(index){
            this.$refs.section0.classList.toggle('translate');
            setTimeout(() => {
                this.showList = false;
                this.showJunta = true;
                this.juntaSelect = this.dbWeb.Juntas[index];
            }, 900);
            setTimeout(() => {
                this.$refs.section1.classList.toggle('translate')
            }, 950);
        },
        regresar(){
            this.$refs.section1.classList.toggle('translate');
            setTimeout(() => {
                this.showJunta = false;
                this.showList = true;
                this.juntaSelect = [];
            }, 900);
            setTimeout(() => {
                this.$refs.section0.classList.toggle('translate')
            }, 950);
        }
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
        if(window.innerWidth >= 576 && window.innerWidth < 768){
            if(Object.values(this.dbWeb.Juntas).length/6 > 1){
                this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/6);
                this.showSelect = true;
            }
        }else if(window.innerWidth >= 768){
            if(Object.values(this.dbWeb.Juntas).length/8 > 1){
                this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/8);
                this.showSelect = true;
            }
        }else{
            if(Object.values(this.dbWeb.Juntas).length/5 > 1){
                this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/5);
                this.showSelect = true;
            }
        }

        window.addEventListener('resize', ()=>{
            if(window.innerWidth >= 576 && window.innerWidth < 768){
                if(Object.values(this.dbWeb.Juntas).length/6 > 1){
                    this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/6);
                    this.showSelect = true;
                }
            }else if(window.innerWidth >= 768){
                if(Object.values(this.dbWeb.Juntas).length/8 > 1){
                    this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/8);
                    this.showSelect = true;
                }
            }else{
                if(Object.values(this.dbWeb.Juntas).length/5 > 1){
                    this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/5);
                    this.showSelect = true;
                }
            }
        })
    },
}
</script>