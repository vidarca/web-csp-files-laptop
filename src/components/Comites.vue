<template>
  <div id="comites">
    <div class="w-95 m-auto">
      <!-- Seccion de Actualidad -->
        <section class="premium-section">
          <div class="pattern-layer"></div>
          <div class="auto-container">
            <!-- Titulo de seccion -->
            
            <div class="row clearfix justify-content-center">
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-6" v-for="(comite, index) in dbWeb.Comites" :key="comite.comi_name" v-if="comite.comi_comiPage === true">
                <div class="inner-box">
                  <div class="image">
                    <img :src="comite.comi_fotoUrl" />
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div :class="['icon mr-1', iconSelect(index)]"></div>
                      <h5 class="ml-1">{{comite.comi_name}}</h5>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
        </section>
        <!-- Fin Seccion Actualidad -->
    </div>
    <AutogestionSpan></AutogestionSpan>
  </div>
</template>

<script>
import AutogestionSpan from '@/components/AutogestionSpan.vue'
import {mapState} from 'vuex'

export default {
    name: 'Comites',
    components: {
        AutogestionSpan,
    },
    computed:{
		  ...mapState(['dbWeb'])
	  },
    methods:{
      iconSelect(index){
        if(this.dbWeb.Comites[index].comi_name === 'Comité de Tenis'){
          return 'flaticon-racket-and-tennis-ball'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Alimentos y Bebidas'){
          return 'flaticon-restaurant'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Gimnasio'){
          return 'flaticon-barbell'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Admisión'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Artes Marciales'){
          return 'flaticon-store'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Comunicaciones'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Cultura'){
          return 'flaticon-store'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Dominó'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité Juvenil'){
          return 'flaticon-store'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Bailoterapia'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Natación'){
          return 'flaticon-store'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Squash'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Guardería'){
          return 'flaticon-store'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité Social'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de TRX'){
          return 'flaticon-store'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Infraestructura'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Finanzas'){
          return 'flaticon-store'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Reforma de Estatutos'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Comites[index].comi_name === 'Comité de Tribunal Disciplinario'){
          return 'flaticon-store'
        }else{
          return ''
        }
      },
    }
}
</script>