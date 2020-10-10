<template>
  <div id="contact">
    
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'ContactPage',
    components: {
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