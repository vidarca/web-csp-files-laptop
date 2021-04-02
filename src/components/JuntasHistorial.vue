<template>
  <div id="juntas-directivas">

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

    <h4 class="w-100 text-center text pt-4">Aquí podrás ver todas las juntas directivas que han formado parte de nuestro Club Santa Paula. <br> Puedes verlas a más detalle haciendo clic sobre cualquiera de ellas</h4>
    <section class="juntas-todas w-85 m-auto pb-4" ref="section0" v-show="showList">
        <div class="cada-junta d-flex align-items-center justify-content-between flex-row pb-4 pt-4">
            <div class="col-12 col-sm-4 col-md-3 outer-container" v-for="(junta, index) in Object.values(dbWeb.Juntas)" :key="junta.junt_id" ref="juntaList" v-show="index < numElements + showIndex && index >= showIndex">
                <div class="junta-container m-auto d-block p-0">
                    <div class="imagen" @click="selecJunta(index)">
                        <img class="junta-foto" :src="(junta.junt_integrantes[0].juin_foto !== '' && junta.junt_integrantes[0].juin_foto !== undefined)?junta.junt_integrantes[0].juin_foto:'https://firebasestorage.googleapis.com/v0/b/web-database-66842.appspot.com/o/transparent.png?alt=media&token=533f3017-de64-49b5-8ee9-cb8950445931'">
                        <i class="icon"></i>
                    </div>
                </div>
                <div class="text text-center d-block pt-2">
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
            <div v-for="(integrante, index) in juntaSelect.junt_integrantes" :key="integrante.juin_cargo" v-show="index < maxShowJuin && integrante.juin_activo === true" :class="['juin-container flex-column align-items-center justify-content-start pt-3 pb-3 col-12', (index === 0 || index === 1)?'col-sm-6':(index >= 1 && index < 5)?'col-sm-4':(index >= 5 && index < 9)?'col-sm-3':'col-sm-6']" style="display:  flex;">
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
			numElements: 4,
			showIndex: 0,
            currentIndex: 1
        }
    },

    computed:{
        ...mapState(['dbWeb']),
        selectBanners(){
			if(this.dbWeb.Banners !== undefined){
				for(let i = 0; i < Object.values(this.dbWeb.Banners).length; i++){
					if(Object.values(this.dbWeb.Banners)[i].bann_seccion.toLowerCase() === "juntas"){
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
            this.$refs.juntaList.forEach(element => {
                element.dataset.transitioned = 'true';
                element.classList.toggle('hide-opacity');
            })
            setTimeout(() => {
                this.showIndex = this.numElements*(val);
            }, 400);
            setTimeout(() => {
                this.$refs.juntaList.forEach(element => {
                element.dataset.transitioned = 'false';
                element.classList.toggle('hide-opacity');
                })
            }, 550);
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
        changeListNumElem(){
            let innerW = window.innerWidth;

            if(innerW >= 768 && this.numElements !== 4){
                this.numElements = 4;
            }

            if(768 > innerW && innerW >= 576 && this.numElements !== 3){
                this.numElements = 3;
            }

            if(576 > innerW && this.numElements !== 1){
                this.numElements = 1;
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
        this.changeListNumElem();

        let innerW = window.innerWidth;
        
        if(innerW >= 768){
            if(Object.values(this.dbWeb.Juntas).length/4 > 1){
                this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/4);
                this.showSelect = true;
            }
        }
        
        if(768 > innerW && innerW >= 576){
            if(Object.values(this.dbWeb.Juntas).length/3 > 1){
                this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/3);
                this.showSelect = true;
            }
        }

        if(576 > innerW){
            if(Object.values(this.dbWeb.Juntas).length > 1){
                this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length);
                this.showSelect = true;
            }
        }

        window.addEventListener('resize', ()=>{
            let innerW = window.innerWidth;

            if(innerW >= 768){
                if(Object.values(this.dbWeb.Juntas).length/4 > 1){
                    this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/4);
                    this.showSelect = true;
                }
            }
                
            if(768 > innerW && innerW >= 576){
                if(Object.values(this.dbWeb.Juntas).length/3 > 1){
                    this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/3);
                    this.showSelect = true;
                }
            }

            if(576 > innerW){
                if(Object.values(this.dbWeb.Juntas).length > 1){
                    this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length);
                    this.showSelect = true;
                }
            }

        });

        this.$nextTick(() =>{
            if(this.number >= 7){
                this.$refs.innerContainer.style.transform = `translateX(${45*((this.number-5)/2)}px)`;
            }
		
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

        window.addEventListener('resize', () => {
            this.changeListNumElem();
        })
    },
}
</script>