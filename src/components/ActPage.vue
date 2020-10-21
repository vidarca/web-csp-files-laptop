<template>
  <div id="actualidad" :class="(reverseArray[0] === undefined || reverseArray[0] === '')?'mih w-100 d-flex align-items-end justify-content-center':''">
    <!-- Seccion de Actualidad -->
    <section id="section1" ref="section1" class="v-act-wrapper justify-content-center align-items-center" v-show="reverseArray[0] !== undefined && showMin">
      <div class="ext-wrapper w-75 m-auto">
          <!-- Titulo de seccion -->
          <div class="row">
          <!-- Bloque de Notica -->
            <div class="noti-block col-lg-12 col-sm-12 align-items-center" ref="anuncios" v-for="(anuncio, index) in reverseArray" :key="anuncio.noti_id" :id="anuncio.noti_seccion" data-transitioned="false" :data-index="index" v-show="index < numElements + showIndex && index >= showIndex" style="display: flex">
                <div :class="['inner-box w-100 d-flex justify-content-center align-items-center', flexAndCliWidth(index)]" :data-index="index" :data-src="anuncio.noti_fotos['imagen1'].url"  ref="elLazy" >
                  <div class="image w-100 d-flex align-items-center justify-content-center">
                    <img  src=" " :ref="`foto${index}`"/>
                  </div>
                    <div class="lower-content w-100">
                      <div class="upper-box">
                        <h5>{{anuncio.noti_titulo}}</h5>
                        <div class="text text-left w-100">{{anuncio.noti_prev}}</div>
                        <div :class="['d-flex justify-content-between align-items-center w-100', (index % 2 === 0)?'flex-row':'flex-row-reverse']">
                          <div class="d-inline-block">
                            <div :class="['icon d-inline-block', iconAnun(index)]"></div>
                            <div class="text ml-2 mr-1 d-inline-block">
                              {{calcTime(anuncio.noti_fecha)}}
                            </div>
                          </div>
                          <a class="align-self-end" @click="anunSelected(index)">Leer más...</a>
                        </div>
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
    <!-- Fin Seccion Actualidad -->
    <section id="section2" ref="section2" class="selected-anun translate" v-show="!showMin">
      <div class="w-100 position-relative" v-if="!showMin">
        <div class="w-100 d-flex flex-row justify-content-between">
          <img :src="reverseArray[anunSelecIndex].noti_fotos.imagen0.url" width="100%" height="auto" style="min-height: 300px; max-height: 600px">
        </div>
        <div class="info-container w-95">
          <h5 class="w-100">{{reverseArray[anunSelecIndex].noti_titulo}}</h5>
          <img class="mr-3" :src="reverseArray[anunSelecIndex].noti_fotos.imagen1.url" align="left" width="360px" height="auto" style="max-height: 260px;">
          <div>
            <div v-if="reverseArray[anunSelecIndex].noti_fotos.imagen2" v-for="(item, index) in reverseArray[anunSelecIndex].noti_info.split(/[\r\n]+/)" :key="index">
              <div class="text" v-if="parrShow(index, '0')">
                {{item}}
              </div>
            </div>
            <div else class="text">
              {{reverseArray[anunSelecIndex].noti_info}}
            </div>
          </div>
          <img v-if="reverseArray[anunSelecIndex].noti_fotos.imagen2" class="ml-3" :src="reverseArray[anunSelecIndex].noti_fotos.imagen2.url" align="right" width="360px" height="auto" style="max-height: 260px;">
          <div v-for="(item, index) in reverseArray[anunSelecIndex].noti_info.split(/[\r\n]+/)" :key="item">
            <div class="text" v-if="parrShow(index, '1')">
              {{item}}
            </div>
          </div>
        </div>
      </div>
      <div class="w-95 d-flex flex-row justify-content-end align-items-center m-auto">
        <button class="btn btn-dark text-right mb-3 mt-3" @click="regresar()">Regresar <i class="icon flaticon-back-arrow ml-1"></i></button>
      </div>
    </section>
    <AutogestionSpan class="w-100"></AutogestionSpan>
  </div>
</template>

<script>
import AutogestionSpan from '@/components/AutogestionSpan.vue'
import {mapState, mapMutations} from 'vuex'

export default {
    name: 'ActPage',
    data(){
      return {
        showMin: true,
        showSelect: false,
        number: 0,
        showIndex: 0,
        currentIndex: 1,
        anunSelecIndex: false,
        numElements: 5,
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
            console.log(array);
            return array.reverse()
            }else{
            let array = []
            return array
            }
        },
  },
  methods:{
    ...mapMutations(['selectItemSelect', 'resetItemSelect']),
    iconAnun(index){
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
    translateRight(){
      if(this.currentIndex <= 5*((this.$refs.innerContainer.children.length/5)-1)){
        this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) - 45}px)`
        this.currentIndex ++;
      }
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
		    window.scrollTo(0, 0);
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
    anunSelected(val){
      this.anunSelecIndex = val;
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
    parrShow(index, val){
      if(val === '0'){
        if(index < this.reverseArray[this.anunSelecIndex].noti_info.split(/[\r\n]+/).length/2){
          return true
        }else{return false}
      }else if( val === '1'){
        if(index >= this.reverseArray[this.anunSelecIndex].noti_info.split(/[\r\n]+/).length/2){
          return true
        }else{return false}
      }
    },
    flexAndCliWidth(index){
      if(window.innerWidth >= 720){
        if(index % 2 === 0){
          return 'flex-row'
        }else{
          return 'flex-row-reverse right'
        }
      }else{
        return 'flex-column center'
      }
    },
  },

  mounted(){

    if(this.itemSelect !== false){
      this.$refs.section1.classList.add('translate')
      this.$refs.section2.classList.toggle('translate')
      this.showMin = false;
      this.anunSelecIndex = this.itemSelect;
    }

    /**
      OBSERVERS
    **/
    const lazyImgs = this.$refs.elLazy;

    if(lazyImgs !== undefined && lazyImgs !== ''){
      const ops = {
        root: null,
        threshold: 0,
        rootMargin: '-50px'
      };
  
      const observer = new IntersectionObserver(
        function(entries, observer){
          entries.forEach(entry => {
            if(!entry.isIntersecting){
              return;
            }
            entry.target.children[0].children[0].src = entry.target.dataset.src;
            entry.target.children[0].children[0].classList.toggle('lazy-show');
            observer.unobserve(entry.target)
          });
        }, ops);
      
      lazyImgs.forEach(element => {
        observer.observe(element)
      })
    }


    /**
     EXTRAS
    **/

    window.addEventListener('resize', () => {
      this.$refs.elLazy.forEach(element => {
        if(window.innerWidth < 720){
          if(element.dataset.index % 2 === 0){
            element.classList.remove('flex-row')
          }else{
            element.classList.remove('flex-row-reverse')
            element.classList.remove('right')
          }
          element.classList.add('flex-column')
          element.classList.add('center')
        }else{
        if(window.innerWidth >= 720){
          if(element.dataset.index % 2 === 0){
            element.classList.add('flex-row')
          }else{
            element.classList.add('flex-row-reverse')
            element.classList.add('right')
          }
          element.classList.remove('flex-column')
          element.classList.remove('center')
        }
        }
      })
    })

    if(this.reverseArray !== undefined && this.reverseArray.length/numElements > 1){
      this.number = Math.ceil(this.reverseArray.length/numElements);
      this.showSelect = true;
    }
    
    try{
      this.$refs.innerContainer.style.transform = `translateX(${(45/2)*(this.$refs.innerContainer.children.length - 5)}px)`
    }catch{}

  },
}
</script>