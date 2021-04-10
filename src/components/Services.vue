<template>
  <div id="services" ref="fullContent" :class="(dbWeb.Servicios === undefined || dbWeb.Servicios === '')?'mih w-100 d-flex align-items-end justify-content-center':''">
    <div class="w-95 m-auto" v-if="dbWeb.Servicios !== undefined && dbWeb.Servicios !== ''">
      <!-- Seccion de Actualidad -->
        <section class="premium-section">
          <div class="pattern-layer"></div>
          <div class="auto-container">
            <!-- Titulo de seccion -->
            
            <div class="row clearfix">
              
              <!-- Bloque de Notica -->
              <div class="col-xl-4 col-md-6 col-sm-6 m-auto" v-for="(servicio, index) in dbWeb.Servicios" :key="index">
                <div class="security-block">
                  <div class="inner-box">
                    <div class="image">
                      <img :src="(servicio.serv_foto !== undefined && servicio.serv_foto.url !== '') ? servicio.serv_foto.url : ''" />
                    </div>
                    <div class="lower-content">
                      <div class="hover-bg-color"></div>
                      <div class="upper-box">
                        <h5>{{servicio.serv_nombre}}</h5>
                      </div>
                      <div class="d-flex align-items-center justify-content-center flex-row flex-wrap" style="height: 70%">
                        <div class="text col-12 p-0">
                          Horario de atención:
                          <span v-if="servicio.serv_inicio.length !== 0">{{servicio.serv_inicio}}am - </span>
                          <span v-if="servicio.serv_cierre.length !== 0">{{servicio.serv_cierre}}pm</span>
                          <span v-if="servicio.serv_inicio.length === 0 && servicio.serv_cierre.length === 0">todo el día</span>
                        </div>
                        <div class="text col-12 p-0">
                          {{servicio.serv_descripcion}}
                        </div>
                      </div>
                      
                      <div class="open-box">
                        <div v-if="!calcTime(servicio.serv_inicio, servicio.serv_cierre) || !servicio.serv_activo" class="icon icon-close flaticon-dry-clean"> 
                          <div class="text">Cerrado</div>
                        </div>
                        <div v-else class="icon icon-open flaticon-dry-clean">
                          <div class="text">Abierto</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Fin Seccion Actualidad -->
    </div>
    <AutogestionSpan class="w-100"></AutogestionSpan>
  </div>
</template>

<script>
import AutogestionSpan from '@/components/AutogestionSpan.vue'
import {mapState} from 'vuex'
import * as moment from 'moment'

export default {
    name: 'Services',
    components: {
        AutogestionSpan,
    },
    computed:{
		  ...mapState(['dbWeb'])
	  },
    methods:{
      calcTime(start,end){
        if(start.length === 0){
          return true
        };
        
        const startTime = moment(start, 'h:mm').fromNow().indexOf('ago');
        const endTime = moment(end, 'h:mm').fromNow().indexOf('ago');

        if(startTime >= 0 && endTime < 0){ 
          return true
        };

        if(endTime >= 0){
          false
        };
        
      },
      iconSelect(index){
        if(this.dbWeb.Servicios[index].serv_nombre === 'Canchas de Tenis'){
          return 'flaticon-racket-and-tennis-ball'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'Consecionario'){
          return 'flaticon-restaurant'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'Alquiler de Salones'){
          return 'flaticon-cheers'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'Salón de Belleza'){
          return 'flaticon-hair-cut-tool'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'Enfermería'){
          return 'flaticon-nurse'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'Sauna'){
          return 'flaticon-person-silhouette-in-sauna'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'GYM'){
          return 'flaticon-barbell'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'Tienda de Conveniencias'){
          return 'flaticon-shop'
        }else if(this.dbWeb.Servicios[index].serv_nombre === 'Tienda Deportiva'){
          return 'flaticon-store'
        }else{
          return ''
        }
      },
    },
}
</script>