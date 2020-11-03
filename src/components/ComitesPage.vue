<template>
  <div id="comites" :class="(Object.values(dbWeb.Comites)[0] === undefined || Object.values(dbWeb.Comites)[0] === '')?'mih w-100 d-flex align-items-end justify-content-center':''">
      <!-- Seccion de Comites -->
        <section id="section1" class="premium-section" v-show="showMin === true" ref="section1">
          <div class="w-95 m-auto">
            <div class="auto-container">
              <!-- Titulo de seccion -->
              
              <div class="d-flex flex-row flex-wrap clearfix justify-content-center">
                
                <!-- Bloque de Notica -->
                <div class="security-block col-lg-4 col-md-6 col-sm-6" ref="comites" v-for="(comite, index) in Object.values(dbWeb.Comites)" :key="comite.comi_nombre" v-show="comite.comi_comiPage && index < numElementsSection1 + showIndexSection1 && index >= showIndexSection1">
                  <div class="inner-box">
                    <div class="image">
                      <img :src="(comite.comi_foto !== undefined && comite.comi_foto !== '')?comite.comi_foto:'_'" />
                    </div>
                    <div class="lower-content">
                      <div class="hover-bg-color"></div>
                      <div class="upper-box">
                        <div :class="['icon mr-1', iconSelect(index)] " @click="comiSelected(index)"></div>
                        <h5 class="ml-1" @click="comiSelected(index)">{{comite.comi_nombre}}</h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bot-selectors w-100 d-flex flex-row align-items-center justify-content-center position-relative align-self-center" v-if="showSelectSection1 === true">
                  <div class="position-relative" style="width: 25px; height: 25px;">
                    <i class="icon left-arrow flaticon-arrowhead-pointing-to-the-right" style="transform: rotate(180deg);" @click="translateLeft('section1')"></i>
                  </div>
                  <div class="bot-container">
                    <div class="inner-container d-flex flex-row justify-content-center align-items-center" ref="innerContainerSection1">
                      <div v-for="index in numberSection1" :key="index">
                        <div :class="['circle', (index === 1)?'active':'']" :ref="`bot${index}`" :id="index">
                          <div class="text" @click="changeIndex(index, 'section1')">{{index}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="position-relative" style="width: 25px; height: 25px;">
                    <i class="icon right-arrow flaticon-arrowhead-pointing-to-the-right" @click="translateRight('section1')"></i>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
        <!-- Fin Seccion Comites -->

        <section id="section2" ref="section2" class="selected-comi translate" v-show="!showMin">

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
          <section class="featured-section m-0">
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

            <!-- Seccion de Informacion -->

            <section class="comi-info overflow-hidden" v-if="comiSelecIndex !== false && Object.values(dbWeb.Comites)[comiSelecIndex].comi_info !== undefined && Object.values(dbWeb.Comites)[comiSelecIndex].comi_info !== ''">

              <h3 class="mb-2 w-100 text-center" id="beforeNoti">
                {{Object.values(dbWeb.Comites)[comiSelecIndex].comi_nombre}}
              </h3>

              <div class="d-flex flex-row align-items-center justify-content-center w-100">
                <div class="text text-center col-6 p-0">
                  {{Object.values(dbWeb.Comites)[comiSelecIndex].comi_info}}
                </div>
                <img :src="Object.values(dbWeb.Comites)[comiSelecIndex].comi_foto" class="col-6 p-0">
              </div>

            </section>

            <!-- Fin de Seccion de Informacion -->

            <!-- Seccion de Noticias -->
            <section class="comi-noticias overflow-hidden" v-if="comiSelecIndex !== false && showNoticias(comiSelecIndex)">
              
              <h3 class="mb-2 w-100 text-center" id="beforeNoti">
                Noticias del {{Object.values(dbWeb.Comites)[comiSelecIndex].comi_nombre}}
              </h3>

              <div class="ext-wrapper w-100 m-auto">
                <!-- Bloque de Notica -->
                <div class="d-flex align-items-center justify-content-center flex-row clearfix">
      
                  <!-- Bloque de Notica -->
                  <div class="security-block col-md-3 col-6" ref="anuncios" v-for="(noticia, index) in reverseArray" :key="noticia.noti_id" :data-index="index" v-show="index < numElements + showIndex && index >= showIndex && anuncio.noti_seccion === Object.values(dbWeb.Comites)[comiSelecIndex].comi_nombre">
                    <div class="inner-box">
                    <div class="image">
                      <img :src="noticia.noti_fotos.imagen1.url" />
                    </div>
                    <div class="lower-content d-flex flex-column align-items-center justify-content-center">
                      <div class="hover-bg-color"></div>
                      <div class="upper-box">
                        <div :class="['icon mr-1', iconSelectNoticia(index)]"></div>
                        <h5 class="ml-1 w-100 text-left">{{noticia.noti_titulo}}</h5>
                      </div>
                      <div class="lower-box">
                        <div class="align-self-end text" style="width: auto; font-size: 13px">
                          {{calcTime(noticia.noti_fecha)}}
                        </div>
                        <div class="text text-center">
                          {{noticia.noti_prev}}
                        </div>
                        <a class="align-self-end" @click="selectAnun(index)" style=" font-size: 13px">Leer más ...</a>
                      </div>
                    </div>
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
              </div>
              
            </section>

            <!-- Fin de Seccion de Noticias -->

            <!-- Seccion de profesores -->

            <section class="comi-profesores overflow-hidden" v-if="comiSelecIndex !== false && showProfesores(comiSelecIndex)">

              <h3 class="mb-2 w-100 text-center" id="beforeProfe">
                Instructores Asociados al {{Object.values(dbWeb.Comites)[comiSelecIndex].comi_nombre}}
              </h3>

              <div class="ext-wrapper w-100 m-auto">
                <div class="d-flex align-items-center justify-content-center flex-row clearfix">
      
                  <div class="security-block col-md-4 col-6" ref="anuncios" v-for="(profesor, index) in Object.values(dbWeb.Profesores)" :key="profesor.prof_id" :data-index="index" v-show="index < numElements + showIndex && index >= showIndex && profesor.comi_id === Object.values(dbWeb.Comites)[comiSelecIndex].comi_nombre">
                    <div class="inner-box">
                    <div class="image">
                      <img :src="profesor.prof_foto.url" />
                    </div>
                    <div class="lower-content d-flex flex-column align-items-center justify-content-center">
                      <div class="hover-bg-color"></div>
                      <div class="upper-box">
                        <div :class="['icon mr-1', iconSelectProfesor(index)]"></div>
                        <div class="pl-2 d-flex flex-column align-items-center justify-content-center w-100">
                          <h5 class="ml-1 w-100 text-left">{{profesor.prof_nombre}}</h5>
                          <div class="text text-left w-100">
                            Entrenador de {{profesor.prof_tipoent.toLowerCase()}}
                          </div>
                        </div>
                      </div>
                      <div class="lower-box">
                        <div class="text text-center" @click="openFile(profesor.prof_cv.url)" style="cursor: pointer">
                          Clic aquí para descagargar el currículum del profesor
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

                <div class="bot-selectors w-100 d-flex flex-row align-items-center justify-content-center position-relative align-self-center" v-if="showSelectProfesores === true">
                  <div class="position-relative" style="width: 25px; height: 25px;">
                    <i class="icon left-arrow flaticon-arrowhead-pointing-to-the-right" style="transform: rotate(180deg);" @click="translateLeft('profesores')"></i>
                  </div>
                  <div class="bot-container">
                    <div class="inner-container d-flex flex-row justify-content-center align-items-center" ref="innerContainerProfesores">
                      <div v-for="index in numberProfesores" :key="index">
                        <div :class="['circle', (index === 1)?'active':'']" :ref="`bot${index}`" :id="index">
                          <div class="text" @click="changeIndex(index, 'profesores')">{{index}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="position-relative" style="width: 25px; height: 25px;">
                    <i class="icon right-arrow flaticon-arrowhead-pointing-to-the-right" @click="translateRight('profesores')"></i>
                  </div>
                </div>
              </div>

            </section>

            <!-- Fin de Seccion de profesores -->

            <div class="w-100 d-flex flex-row justify-content-end align-items-center m-auto">
              <button class="btn btn-dark text-right mb-3 mt-3" @click="regresar()">Regresar <i class="icon flaticon-back-arrow ml-1"></i></button>
            </div>
          </div>

        </section>
    <AutogestionSpan></AutogestionSpan>
  </div>
</template>

<script>
import AutogestionSpan from '@/components/AutogestionSpan.vue'
import {mapState, mapMutations} from 'vuex'

export default {
    name: 'ComitesPage',
    data(){
      return {
        showMin: true,
        showSelect: false,
        number: 0,
        showIndex: 0,
        currentIndex: 1,
        numElements: 4,
        showIndexSection1: 0,
        showSelectSection1: false,
        numberSection1: 0,
        numElementsSection1: 6,
        currentIndexSection1: 1,
        showIndexProfesores: 0,
        showSelectProfesores: false,
        numberProfesores: 0,
        numElementsProfesores: 6,
        currentIndexProfesores: 1,
        comiSelecIndex: false,
      }
    },
    components: {
        AutogestionSpan,
    },

    computed:{
      ...mapState(['dbWeb', 'itemSelect']),
      reverseArray(){
        if(this.dbWeb.Noticias !== undefined){
          let array = Object.values(this.dbWeb.Noticias);
          return array.reverse()
        }else{
          let array = []
          return array
        }
      },
      selectBanners(){
        if(this.dbWeb.Banners !== undefined){
          for(let i = 0; i < Object.values(this.dbWeb.Banners).length; i++){
            if(Object.values(this.dbWeb.Banners)[i].bann_seccion.toLowerCase() === "comités"){
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
      ...mapMutations(['selectItemSelect', 'resetItemSelect']),
      iconSelect(index){
        if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Tenis'){
          return 'flaticon-racket-and-tennis-ball'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Alimentos y Bebidas'){
          return 'flaticon-restaurant'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Gimnasio'){
          return 'flaticon-barbell'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Admisión'){
          return 'flaticon-lista-de-verificacion'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Artes Marciales'){
          return 'flaticon-martial-arts'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Comunicaciones'){
          return 'flaticon-megafono'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Cultura'){
          return 'flaticon-mascaras-felices-y-tristes'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Dominó'){
          return 'flaticon-domino'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité Juvenil'){
          return 'flaticon-chico'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Bailoterapia'){
          return 'flaticon-baile'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Natación'){
          return 'flaticon-swimming'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Squash'){
          return 'flaticon-squash-rackets'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Guardería'){
          return 'flaticon-chupete'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité Social'){
          return 'flaticon-asistencia-social'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de TRX'){
          return 'flaticon-suspension'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Infraestructura'){
          return 'flaticon-edificio'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Finanzas'){
          return 'flaticon-ahorrar-dinero'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Reforma de Estatutos'){
          return 'flaticon-libro-de-leyes'
        }else if(Object.values(this.dbWeb.Comites)[index].comi_nombre === 'Comité de Tribunal Disciplinario'){
          return 'flaticon-subasta'
        }else{
          return ''
        }
      },
      iconSelectProfesor(index){
        if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Tenis'){
          return 'flaticon-racket-and-tennis-ball'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Alimentos y Bebidas'){
          return 'flaticon-restaurant'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Gimnasio'){
          return 'flaticon-barbell'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Admisión'){
          return 'flaticon-lista-de-verificacion'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Artes Marciales'){
          return 'flaticon-martial-arts'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Comunicaciones'){
          return 'flaticon-megafono'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Cultura'){
          return 'flaticon-mascaras-felices-y-tristes'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Dominó'){
          return 'flaticon-domino'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité Juvenil'){
          return 'flaticon-chico'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Bailoterapia'){
          return 'flaticon-baile'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Natación'){
          return 'flaticon-swimming'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Squash'){
          return 'flaticon-squash-rackets'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Guardería'){
          return 'flaticon-chupete'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité Social'){
          return 'flaticon-asistencia-social'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de TRX'){
          return 'flaticon-suspension'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Infraestructura'){
          return 'flaticon-edificio'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Finanzas'){
          return 'flaticon-ahorrar-dinero'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Reforma de Estatutos'){
          return 'flaticon-libro-de-leyes'
        }else if(Object.values(this.dbWeb.Profesores)[index].comi_id === 'Comité de Tribunal Disciplinario'){
          return 'flaticon-subasta'
        }else{
          return ''
        }
      },
      iconSelectNoticia(index){
        if(this.reverseArray[index].noti_seccion === 'Comité de Tenis'){
          return 'flaticon-racket-and-tennis-ball'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Alimentos y Bebidas'){
          return 'flaticon-restaurant'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Gimnasio'){
          return 'flaticon-barbell'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Admisión'){
          return 'flaticon-lista-de-verificacion'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Artes Marciales'){
          return 'flaticon-martial-arts'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Comunicaciones'){
          return 'flaticon-megafono'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Cultura'){
          return 'flaticon-mascaras-felices-y-tristes'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Dominó'){
          return 'flaticon-domino'
        }else if(this.reverseArray[index].noti_seccion === 'Comité Juvenil'){
          return 'flaticon-chico'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Bailoterapia'){
          return 'flaticon-baile'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Natación'){
          return 'flaticon-swimming'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Squash'){
          return 'flaticon-squash-rackets'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Guardería'){
          return 'flaticon-chupete'
        }else if(this.reverseArray[index].noti_seccion === 'Comité Social'){
          return 'flaticon-asistencia-social'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de TRX'){
          return 'flaticon-suspension'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Infraestructura'){
          return 'flaticon-edificio'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Finanzas'){
          return 'flaticon-ahorrar-dinero'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Reforma de Estatutos'){
          return 'flaticon-libro-de-leyes'
        }else if(this.reverseArray[index].noti_seccion === 'Comité de Tribunal Disciplinario'){
          return 'flaticon-subasta'
        }else{
          return ''
        }
      },
      comiSelected(val){
        this.comiSelecIndex = val;
        this.$refs.section1.classList.toggle('translate');
        setTimeout(() => {
          this.showMin = false;

        }, 700);
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.$refs.section2.classList.toggle('translate');
        }, 800);
      },
      regresar(){
        if(this.itemSelect !== false){
          this.resetItemSelect();
          this.$router.back()
        }else{
          this.$refs.section2.classList.toggle('translate');
          setTimeout(() => {
            this.showMin = true;
            this.anunSelecIndex = false;
          }, 700);
          setTimeout(() => {
          window.scrollTo(0, 0);
            this.$refs.section1.classList.toggle('translate');
          }, 800);
        }
      },
      showNoticias(val){
        if(this.dbWeb.Noticias !== undefined){
          let count = 0;
          for(let i = 0; i < Object.values(this.dbWeb.Noticias).length; i++){
            if(Object.values(this.dbWeb.Noticias)[i].noti_seccion === Object.values(this.dbWeb.Comites)[val].comi_nombre){
              count ++;
            }
          }
          if(count/this.numElements > 1){
            this.number = Math.ceil(count/this.numElements);
            this.showSelect = true;
          }
          for(let i = 0; i < Object.values(this.dbWeb.Noticias).length; i++){
            if(Object.values(this.dbWeb.Noticias)[i].noti_seccion === Object.values(this.dbWeb.Comites)[val].comi_nombre){
              return true
            }
            return false
          }
        }
      },
      showProfesores(val){
        if(this.dbWeb.Profesores !== undefined){
          let count = 0;
          for(let i = 0; i < Object.values(this.dbWeb.Profesores).length; i++){
            if(Object.values(this.dbWeb.Profesores)[i].comi_id === Object.values(this.dbWeb.Comites)[val].comi_nombre){
              count ++;
            }
          }
          if(count/this.numElementsProfesores > 1){
            this.numberProfesores = Math.ceil(count/this.numElementsProfesores);
            this.showSelectProfesores = true;
          }
          for(let i = 0; i < Object.values(this.dbWeb.Profesores).length; i++){
            if(Object.values(this.dbWeb.Profesores)[i].comi_id === Object.values(this.dbWeb.Comites)[val].comi_nombre){
              return true
            }
            return false
          }
        }
      },
      selectAnun(val){
        this.selectItemSelect(val)
        this.$router.push({name:'Actualidad'})
      },
      calcTime(val){
        const p = new Date(val);
        const pSplitted = p.toString().split(' ');
        let mm = '';
        if(pSplitted[1] === "Jan"){
          mm = "01";
        }else if(pSplitted[1] === "Feb"){
          mm = "02";
        }else if(pSplitted[1] === "Mar"){
          mm = "03";
        }else if(pSplitted[1] === "Apr"){
          mm = "04";
        }else if(pSplitted[1] === "May"){
          mm = "05";
        }else if(pSplitted[1] === "Jun"){
          mm = "06";
        }else if(pSplitted[1] === "Jul"){
          mm = "07";
        }else if(pSplitted[1] === "Ago"){
          mm = "08";
        }else if(pSplitted[1] === "Sep"){
          mm = "09";
        }else if(pSplitted[1] === "Oct"){
          mm = "10";
        }else if(pSplitted[1] === "Nov"){
          mm = "11";
        }else if(pSplitted[1] === "Dic"){
          mm = "12";
        }

        return `${pSplitted[2]}/${mm}/${pSplitted[3]}`
      },
      translateRight(val){
        if(val === "section1"){
          if(this.currentIndexSection1 <= 5*((this.$refs.innerContainerSection1.children.length/5)-1)){
            this.$refs.innerContainerSection1.style.transform = `translateX(${parseFloat(this.$refs.innerContainerSection1.style.transform.split('(')[1].split(')')[0]) - 45}px)`
            this.currentIndexSection1 ++;
          }
        }else if(val === "profesores"){
          if(this.currentIndexProfesores <= 5*((this.$refs.innerContainerProfesores.children.length/5)-1)){
            this.$refs.innerContainerProfesores.style.transform = `translateX(${parseFloat(this.$refs.innerContainerProfesores.style.transform.split('(')[1].split(')')[0]) - 45}px)`
            this.currentIndexProfesores ++;
          }
        }else{
          if(this.currentIndex <= 5*((this.$refs.innerContainer.children.length/5)-1)){
            this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) - 45}px)`
            this.currentIndex ++;
          }
        }
      },
      translateLeft(val){
        if(val === "section1"){
          if(this.currentIndexSection1 > 1){
            this.$refs.innerContainerSection1.style.transform = `translateX(${parseFloat(this.$refs.innerContainerSection1.style.transform.split('(')[1].split(')')[0]) + 45}px)`
            this.currentIndexSection1 --;
          }
        }else if(val === "profesores"){
          if(this.currentIndexProfesores > 1){
            this.$refs.innerContainerProfesores.style.transform = `translateX(${parseFloat(this.$refs.innerContainerProfesores.style.transform.split('(')[1].split(')')[0]) + 45}px)`
            this.currentIndexProfesores --;
          }
        }else{
          if(this.currentIndex > 1){
            this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) + 45}px)`
            this.currentIndex --;
          }
        }
      },
      changeIndex(val, val2){
        if(val2 === "section1"){
          this.$refs.comites.forEach(element => {
            element.dataset.transitioned = 'true';
            element.classList.toggle('translate');
          })
          setTimeout(() => {
            this.showIndexSection1 = this.numElementsSection1*(val-1);
          }, 700);
          setTimeout(() => {
            window.scrollTo(0,0)
            this.$refs.comites.forEach(element => {
              element.dataset.transitioned = 'false';
              element.classList.toggle('translate');
            })
          }, 800);
          this.$refs.innerContainerSection1.children.forEach(element => {
            if(parseInt(element.children[0].id) !== val){
              element.children[0].classList.remove('active');
            }else if(parseInt(element.children[0].id) === val){
              element.children[0].classList.add('active');
            }
          })
        }else if(val2 === "profesores"){
          this.$refs.comites.forEach(element => {
            element.dataset.transitioned = 'true';
            element.classList.toggle('translate');
          })
          setTimeout(() => {
            this.showIndexProfesores = this.numElementsProfesores*(val-1);
          }, 700);
          setTimeout(() => {
            window.scrollTo(0,0)
            this.$refs.comites.forEach(element => {
              element.dataset.transitioned = 'false';
              element.classList.toggle('translate');
            })
          }, 800);
          this.$refs.innerContainerProfesores.children.forEach(element => {
            if(parseInt(element.children[0].id) !== val){
              element.children[0].classList.remove('active');
            }else if(parseInt(element.children[0].id) === val){
              element.children[0].classList.add('active');
            }
          })
        }else{
          this.$refs.anuncios.forEach(element => {
            element.dataset.transitioned = 'true';
            element.classList.toggle('translate');
          })
          setTimeout(() => {
            this.showIndex = this.numElements*(val-1);
          }, 700);
          setTimeout(() => {
            location.href = "#beforeNoti"
            this.$refs.anuncios.forEach(element => {
              element.dataset.transitioned = 'false';
              element.classList.toggle('translate');
            })
          }, 800);
          this.$refs.innerContainer.children.forEach(element => {
            if(parseInt(element.children[0].id) !== val){
              element.children[0].classList.remove('active');
            }else if(parseInt(element.children[0].id) === val){
              element.children[0].classList.add('active');
            }
          })
        }
      },
      openFile(url){
        if(url !== '' && url !== undefined){
          window.open(url,'_blank');
        }
      }
    },

    mounted() {
      if(this.itemSelect !== false){
        this.$refs.section1.classList.add('translate')
        this.$refs.section2.classList.toggle('translate')
        this.showMin = false;
        this.comiSelecIndex = this.itemSelect;
      }

      if(this.dbWeb.Comites !== undefined && Object.values(this.dbWeb.Comites).length/this.numElementsSection1 > 1){
        this.numberSection1 = Math.ceil(Object.values(this.dbWeb.Comites).length/this.numElementsSection1);
        this.showSelectSection1 = true;
      }

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
    },
}
</script>

<style scoped>
  .premium-section .security-block .inner-box .lower-content .upper-box .icon, .premium-section .security-block .inner-box .lower-content .upper-box h5{
    cursor: pointer;
  }

  section{
    transition: all 900ms ease;
    -moz-transition: all 900ms ease;
    -o-transition: all 900ms ease;
    -webkit-transition: all 900ms ease;
  }

  #section2 section{
    margin: 30px 0;
  }
</style>