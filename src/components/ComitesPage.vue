<template>
  <div id="comites" :class="(Object.values(dbWeb.Comites)[0] === undefined || Object.values(dbWeb.Comites)[0] === '')?'mih w-100 d-flex align-items-end justify-content-center':''">
    <div class="w-95 m-auto">
      <!-- Seccion de Comites -->
        <section id="section1" class="premium-section" v-show="showMin === true" ref="section1">
          <div class="pattern-layer"></div>
          <div class="auto-container">
            <!-- Titulo de seccion -->
            
            <div class="row clearfix justify-content-center">
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-6" v-for="(comite, index) in Object.values(dbWeb.Comites)" :key="comite.comi_nombre" v-show="comite.comi_comiPage">
                <div class="inner-box">
                  <div class="image">
                    <img :src="(comite.comi_foto !== undefined && comite.comi_foto !== '')?comite.comi_foto:'_'" />
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div :class="['icon mr-1', iconSelect(index)]"></div>
                      <h5 class="ml-1">{{comite.comi_nombre}}</h5>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
        </section>
        <!-- Fin Seccion Comites -->

        <section id="section2" ref="section2" class="selected-comi translate" v-show="!showMin">

        </section>
    </div>
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
        anunSelecIndex: false,
        numElements: 5,
      }
    },
    components: {
        AutogestionSpan,
    },

    computed:{
		  ...mapState(['dbWeb', 'itemSelect'])
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
        this.$refs.section2.classList.toggle('translate');
        setTimeout(() => {
          this.showMin = true;
          this.anunSelecIndex = false;
          this.resetItemSelect();
        }, 700);
        setTimeout(() => {
        window.scrollTo(0, 0);
          this.$refs.section1.classList.toggle('translate');
        }, 800);
      },
    },

    mounted() {
      if(this.itemSelect !== false){
        this.$refs.section1.classList.add('translate')
        this.$refs.section2.classList.toggle('translate')
        this.showMin = false;
        this.anunSelecIndex = this.itemSelect;
      }
    },
}
</script>