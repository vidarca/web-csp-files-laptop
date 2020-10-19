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
              <div class="security-block col-lg-6 col-md-6 col-sm-6" v-for="(servicio, index) in dbWeb.Servicios" :key="index">
                <div class="inner-box">
                  <div class="image">
                    <img :src="servicio.serv_fotoUrl" />
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div :class="['icon', iconSelect(index)]"></div>
                      <h5>{{servicio.serv_nombre}}</h5>
                    </div>
                    <div class="text">
                      Horario de atención: {{servicio.serv_inicio}}am - {{servicio.serv_cierre}}pm
                    </div>
                      <div class="open-box">
                        <div v-if="calcTime(servicio.serv_inicio, servicio.serv_cierre)" class="icon icon-open flaticon-dry-clean">
                          <div class="text">Abierto</div>
                        </div>
                        <div v-else class="icon icon-close flaticon-dry-clean"> 
                          <div class="text">Cerrado</div>
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

        let d = new Date();
        let dString = d.toString()
        const splittedDate = dString.split(' ');
        let splittedToStart = splittedDate;
        let splittedToEnd = splittedDate;

        let timeStartString = `${start}:00`;
        splittedToStart[4] = timeStartString;
        let joinedStartDate = splittedToStart.join(' ')
        
        let endTime = end.split(':')
        endTime[0] = parseInt(endTime[0]) + 12
        endTime[0] = endTime[0].toString()
        let joinedEndTime = endTime.join(':')
        let timeEndString =  `${joinedEndTime}:00`;
        splittedToEnd[4] = timeEndString;
        let joinedEndDate = splittedToEnd.join(' ')

        let miliEnd = Date.parse(joinedEndDate);
        let miliStart = Date.parse(joinedStartDate);
        let miliCurrent = Date.parse(dString);
        let miliDif = miliEnd-miliStart

        if (miliCurrent >= miliEnd && miliCurrent <= miliStart){
          return true
        }else {
          return false
        }
        
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