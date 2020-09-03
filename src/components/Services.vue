<template>
  <div id="services">
    <Header></Header>
      <!-- Seccion de Actualidad -->
        <section class="premium-section">
          <div class="pattern-layer"></div>
          <div class="auto-container">
            <!-- Titulo de seccion -->
            
            <div class="row clearfix">
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-6">
                <div class="inner-box">
                  <div class="image">
                    <img src="https://via.placeholder.com/360x260" alt="" />
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div class="icon flaticon-racquet"></div>
                      <h5>{{dbWeb.Servicios[0].serv_nombre}}</h5>
                    </div>
                    <div class="text">
                      Horario de atención: {{dbWeb.Servicios[0].serv_inicio}}am - {{dbWeb.Servicios[0].serv_cierre}}pm
                    </div>
                      <div class="open-box">
                        <div class="icon fa fa-circle"><div class="text">Abierto</div></div>
                      </div>
                  </div>
                </div>
              </div>
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div class="icon flaticon-lcd"></div>
                      <h5><a href="service-detail">Theft Protection</a></h5>
                    </div>
                    <div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
                  </div>
                </div>
              </div>
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div class="icon flaticon-alarm-1"></div>
                      <h5><a href="service-detail">Fire Alarm Systems</a></h5>
                    </div>
                    <div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
                  </div>
                </div>
              </div>
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div class="icon flaticon-keyboard"></div>
                      <h5><a href="service-detail">Touchscreen Keypads</a></h5>
                    </div>
                    <div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
                  </div>
                </div>
              </div>
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div class="icon flaticon-bell"></div>
                      <h5><a href="service-detail">Doorbell Cameras</a></h5>
                    </div>
                    <div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
                  </div>
                </div>
              </div>
              
              <!-- Bloque de Notica -->
              <div class="security-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
                  </div>
                  <div class="lower-content">
                    <div class="hover-bg-color"></div>
                    <div class="upper-box">
                      <div class="icon flaticon-telephone-1"></div>
                      <h5><a href="service-detail">Home Automation</a></h5>
                    </div>
                    <div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
        </section>
        <!-- Fin Seccion Actualidad -->
    <AutogestionSpan></AutogestionSpan>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AutogestionSpan from '@/components/AutogestionSpan.vue'
import {mapState} from 'vuex'

export default {
    name: 'Services',
    components: {
        Header,
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

        if (miliEnd >= miliStart && miliEnd <= miliEnd){
          return true
        }else {
          return false
        }
        
      }
    }
}
</script>

<style>

</style>