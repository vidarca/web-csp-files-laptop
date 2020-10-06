<template>
  <div id="admin-miscellaneous" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section id="section0" ref="section0">
      <form class="form-class d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form d-flex flex-row align-items-start justify-content-center p-1">
           <div class="col-6 p-1 h-100 d-flex flex-column align-items-center justify-content-center">
               <textarea type="text" class="info-form-c w-100" placeholder="Dirección de contacto" v-model="miscellaneous.direccion" style="height: 200px"></textarea>
               <p class="text mt-2">
                    Haga clic en cualquiera de los íconos para activar o desactivar el campo correspondiente
                </p>
               <div class="redes d-flex align-items-center justify-content-between flex-row w-100">
                   <div class="w-100 d-flex flex-column align-items-center justify-content-center col-6 col-md-4">
                        <i class="icon flaticon-instagram" @click="disableRS('instagram')"></i>
                        <input class="w-100" ref="inputinstagram" type="text" v-model="miscellaneous.redes.instagram.link" placeholder="Link del perfil">
                   </div>
                   <div class="w-100 d-flex flex-column align-items-center justify-content-center col-6 col-md-4">
                        <i class="icon flaticon-twitter" @click="disableRS('twitter')"></i>
                        <input class="w-100" ref="inputtwitter" type="text" v-model="miscellaneous.redes.twitter.link" placeholder="Link del perfil">
                   </div>
                   <div class="w-100 d-flex flex-column align-items-center justify-content-center col-6 col-md-4">
                        <i class="icon flaticon-facebook" @click="disableRS('facebook')"></i>
                        <input class="w-100" ref="inputfacebook" type="text" v-model="miscellaneous.redes.facebook.link" placeholder="Link del perfil">
                   </div>
               </div>
           </div>
           <div class="col-6 p-1 d-flex flex-column align-items-center justify-content-center" style="min-height: 400px">
               <div class="w-100" style="min-height: 200px;">
                    <div class=" w-100 phones-input row justify-content-between align-items-center" v-for="index in cantFields.telefonos.numero" :key="`telefono${index}`" style="margin-top: 5px;">
                        <div class="col-9 p-0 d-flex flex-row align-items-center justify-content-center">
                            <input :class="['position-relative', validPhone(miscellaneous.telefonos[`telefono${index}`], (index))?'':'error']" ref="phone" type="text" v-model="miscellaneous.telefonos[`telefono${index}`]" placeholder="Télefono (Ej. +581112223333)">
                            <div class="important-field" v-show="!validPhone(miscellaneous.telefonos[`telefono${index}`], (index))"></div>
                        </div>
                        <span @click="addField('crear', 'telefonos', false)" :class="['icon p-0 add flaticon-add', (index-1 > 0)?'col-1 pl-1 pr-1':'col-3 pl-2']" v-if="index === cantFields.telefonos.numero"></span>
                        <span @click="deleteField('crear', 'telefonos', false)" class="icon col-1 p-0 pl-2 delete flaticon-minus" v-if="index > 1 && index === cantFields.telefonos.numero"></span>
                    </div>
               </div>
                <div class="w-100" style="min-height: 200px;">
                    <div class=" w-100 phones-input row justify-content-between align-items-center" v-for="index in cantFields.correos.numero" :key="`correo${index}`" style="margin-top: 5px;">
                        <div class="col-9 p-0 d-flex flex-row align-items-center justify-content-center">
                            <input :class="['position-relative', validEmail(miscellaneous.correos[`correos${index}`], index)?'':'error']" ref="correo" type="text" v-model="miscellaneous.correos[`correos${index}`]" placeholder="Correo (Ej. ejemplo@direccion.com)">
                            <div class="important-field" v-show="!validEmail(miscellaneous.correos[`correos${index}`], index)"></div>
                        </div>
                        <span @click="addField('crear', 'correos', false)" :class="['icon p-0 add flaticon-add', (index-1 > 0)?'col-1 pl-1 pr-1':'col-3 pl-2']" v-if="index === cantFields.correos.numero"></span>
                        <span @click="deleteField('crear', 'correos', false)" class="icon col-1 p-0 pl-2 delete flaticon-minus" v-if="index > 1 && index === cantFields.correos.numero"></span>
                    </div>
                </div>
           </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('crear')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Actualizar datos
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('crear')">Borrar campos</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    name: 'AdminMiscellaneous',
    data(){
      return {
        cantFields:{
          integrantes: {
            numero: 1,
            nombre: 'integrantes',
          },
          telefonos: {
            numero: 1,
            nombre: 'telefonos',
          },
          slides: {
            numero: 0,
            nombre: 'slides',
          },
          correos: {
            numero: 1,
            nombre: 'correos',
          }
        },
        show: false,
        error: null,
        valores: ['telefonos', 'correos', 'direccion', 'redes'],
        redes: ['instagram', 'facebook', 'twitter'],
        miscellaneous: {
        },
      }
    },

    computed:{
      ...mapState(['editContent', 'successUpload', 'dbWeb', 'deletingVal', 'deletingIndex', 'cargarDB', 'crearDBVals', 'dbImg']),
    },
    
    methods:{
      ...mapMutations(['resetDBValues', 'successAdvise', 'deletedEl', 'changeSecTitle', 'crearDB', 'falseCargarDB', 'deleteItem', 'updateDB']),
      ...mapActions(['getData']),
      deleteCollection(value){
        for(let i = 0; i < Object.values(this.cantFields).length; i++){
          Object.values(this.cantFields)[i].numero = 0;
        }
        this.miscellaneous = {
            telefonos: {},
            redes: {},
            correos: {},
            direccion: '',
        }
      },
      validPhone(target, index){
        const exp = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/g;
        if(index === 1){
          if(exp.test(target) || target === '' || target === undefined){
            return true
          }else{
            return false
          }
        }else{
          if(exp.test(target)){
            return true
          }else{
            return false
          }
        }
      },
      validEmail(target, index){
        const exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(index === 1){
          if(exp.test(target) || target === '' || target === undefined){
            return true
          }else{
            return false
          }
        }else{
          if(exp.test(target)){
            return true
          }else{
            return false
          }
        }
      },
      validAllFields(value){
        let txt = '';
        if(value === 'crear'){
          txt = 'nuevo';
        }else if(value === 'select'){
          txt = 'select'
        }

        let err = {};

        if(this.validSelection('Seleccione una opción', this[`${txt}Banner`].seccion)){
          for(let i = 0; i < Object.values(this[`${txt}Banner`].archivos).length; i++){
            if(Object.values(this[`${txt}Banner`].archivos)[i] === undefined || Object.values(this[`${txt}Banner`].archivos)[i] === ''){
              this.error = 'Todas los slides o diapositivas deben tener una imagen'
              return false
            }
          }
          'Todas los slides o diapositivas deben tener una imagen'
          if(this.dbWeb.Banners !== undefined){
            for(let i = 0; i < Object.values(this.dbWeb.Banners).length; i++){
              if(Object.values(this.dbWeb.Banners)[i].bann_bannerid === this[`${txt}Banner`].seccion.toLowerCase().split(' ').join('_') && txt !== 'select'){
                this.error = 'El sitio ya posee su banner. Si desea crear otro, elimine el banner ya existente y cree uno nuevo'
                return false
              }
            }
          }
          return true
        }else{
          this.error = 'Los campos marcados con * son obligatorios'
          return false
        }
      },
      submitCollection(value){
        if(this.validAllFields(value)){
          
          if(value === 'crear'){

            const d = new Date();
            const date = Date.parse(d)


            if(Object.values(this.files).length !== 0){
              for(let i = 0; i < Object.values(this.nuevoBanner.archivos).length; i++){
                Object.values(this.nuevoBanner.archivos)[i].nombre = Object.values(this.nuevoBanner.archivos)[i].nombreref;
              }
            }

            let dataTransfer = {
              archivos: this.files,
              name_archivos: this.cantFields.slides.nombre,
              banner: {
                activo: this.nuevoBanner.activo,
                fechaed: date,
                seccion: this.nuevoBanner.seccion,
                bannerid: this.nuevoBanner.seccion.toLowerCase().split(' ').join('_'),
                archivos:{},
              },
              target: 'Banners',
            };

            if(Object.values(this.files).length !== 0){
              for(let i = 0; i < Object.values(this.nuevoBanner.archivos).length; i++){
                dataTransfer.banner.archivos[`slides${i+1}`] = Object.values(this.nuevoBanner.archivos)[i];
                dataTransfer.banner.archivos[`slides${i+1}`].info = Object.values(this.nuevoBanner.info)[i];
              }
            }
            
            this.crearDB(dataTransfer)

          }else if(value ==='select'){

            const d = new Date();
            const date = Date.parse(d)


            if(Object.values(this.files).length !== 0){
              for(let i = 0; i < Object.values(this.files).length; i++){
                if(this.selectBanner.archivos[`slides${Object.values(this.files)[i].id}`].nombre !== `slides${Object.values(this.files)[i].id}`){
                  this.selectBanner.archivos[`slides${Object.values(this.files)[i].id}`].nombre = this.selectBanner.archivos[`slides${Object.values(this.files)[i].id}`].nombreref;
                }
              }
            }

            let dataTransfer = {
              archivos: this.files,
              name_archivos: this.cantFields.slides.nombre,
              banner: {
                activo: this.selectBanner.activo,
                fechaed: date,
                id: this.selectBanner.id,
                seccion: this.selectBanner.seccion,
                bannerid: this.selectBanner.seccion.toLowerCase().split(' ').join('_'),
                archivos: this.selectBanner.archivos,
              },
              target: 'Banners',
            };

            if(this.selectBanner.archivos[`slides1`] !== undefined){
              for(let i = 1; i <= Object.values(this.selectBanner.archivos).length; i++){
                dataTransfer.banner.archivos[`slides${i}`].info = this.selectBanner.info[`info${i}`];
              }
            }


            console.log(dataTransfer);
            
            this.updateDB(dataTransfer)

          }
        }
      },
      deleteElement(index){
        let dataTransfer = [];
        if(this.deletingVal === null && this.successUpload === null){
          dataTransfer = {
            ref: 'Banners',
            idSt: Object.values(this.dbWeb.Banners).reverse()[index].bann_id,
            idDb: Object.values(this.dbWeb.Banners).reverse()[index].bann_id,
            index: index,
            storage: true,
          };


          this.deleteItem(dataTransfer)
        }
      },
      addField(val, val2, val3){
        if(Object.values(this.miscellaneous[`${this.cantFields[val2].nombre}`]).length === 0){
            return this.error = 'Primero debe llenar la casilla vacía'
        }else{
            for(let i = 0; i < Object.values(this.miscellaneous[`${this.cantFields[val2].nombre}`]).length; i++){
                console.log((Object.values(this.miscellaneous[`${this.cantFields[val2]}`])[i]))
                if(Object.values(this.miscellaneous[`${this.cantFields[val2]}`])[i] === undefined || Object.values(this.miscellaneous[`${this.cantFields[val2]}`])[i] === ''){
                    return this.error = 'Primero debe llenar la casilla vacía'
                }
            }
        }
        this.$set(this.miscellaneous, `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, '');
        this.cantFields[`${val2}`].numero++;
      },
      deleteField(val, val2, val3){
        this.miscellaneous[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`] = '';
        delete this.miscellaneous[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`];
        this.cantFields[`${val2}`].numero --;
      },
      toggleInfo(){
        this.$refs.info.children[0].classList.toggle('show-info')
      },
      disableRS(ref){
        if(ref === 'all'){
            for(let i = 0; i < this.redes.length; i++){
                if(this.miscellaneous.redes[`${this.redes[i]}`].activo === false){
                    this.$refs[`input${this.redes[i]}`].disabled = true;
                }else{
                    this.$refs[`input${this.redes[i]}`].disabled = false;
                }
            }
        }else{
            this.miscellaneous.redes[ref].activo = !this.miscellaneous.redes[ref].activo;
            if(this.miscellaneous.redes[ref].activo === false){
                this.miscellaneous.redes[ref].link = '';
                this.$refs[`input${ref}`].disabled = true;
                this.$refs[`input${ref}`].parentNode.children[0].classList.remove('active');
            }else{
                this.miscellaneous.redes[ref].link = '';
                this.$refs[`input${ref}`].disabled = false;
                this.$refs[`input${ref}`].parentNode.children[0].classList.add('active');
            }
        }
      },
      getDB(){
        if(this.dbWeb.Miscellaneous !== undefined){
            for(let i = 0; i < this.valores.length; i++){
                if(this.dbWeb.Miscellaneous[`${this.valores[i]}`] !== undefined){
                    this.$set(this.miscellaneous, `${this.valores[i]}`,  this.dbWeb.Miscellaneous[`${this.valores[i]}`]);
                    if(this.valores[i] === 'redes'){
                        for(let j = 0; j < this.redes.length; j++){
                            if(this.miscellaneous.redes[this.redes[j]] === undefined){
                                this.$set(this.miscellaneous[`${this.valores[i]}`], `${this.redes[j]}`,  {});
                                this.$set(this.miscellaneous[`${this.valores[i]}`][`${this.redes[j]}`], `activo`,  false);
                                this.$set(this.miscellaneous[`${this.valores[i]}`][`${this.redes[j]}`], `link`,  '');
                            }
                        }
                    }
                }else{
                    this.$set(this.miscellaneous, `${this.valores[i]}`,  '');
                    if(this.valores[i] === 'redes'){
                        for(let j = 0; j < this.redes.length; j++){
                            this.$set(this.miscellaneous[`${this.valores[i]}`], `${this.redes[j]}`,  {});
                            this.$set(this.miscellaneous[`${this.valores[i]}`][`${this.redes[j]}`], `activo`,  false);
                            this.$set(this.miscellaneous[`${this.valores[i]}`][`${this.redes[j]}`], `link`,  '');
                        }
                    }
                }
            }
        }else{
            for(let i = 0; i < this.valores.length; i++){
                if(this.valores[i] === 'direccion'){
                    this.$set(this.miscellaneous, `${this.valores[i]}`,  '');
                }else if (this.valores[i] === 'redes'){
                    this.$set(this.miscellaneous, `${this.valores[i]}`,  {});
                    for(let j = 0; j < this.redes.length; j++){
                        this.$set(this.miscellaneous[`${this.valores[i]}`], `${this.redes[j]}`,  {});
                        this.$set(this.miscellaneous[`${this.valores[i]}`][`${this.redes[j]}`], `activo`,  false);
                        this.$set(this.miscellaneous[`${this.valores[i]}`][`${this.redes[j]}`], `link`,  '');
                    }
                }else{
                    this.$set(this.miscellaneous, `${this.valores[i]}`,  {});
                }
            }
        }
        console.log(this.miscellaneous);
      },
    },

    created(){
      this.changeSecTitle('Miscellaneous');
    },

    mounted(){

      this.getData().then(()=>{
        this.getDB();
        this.show = true;
        this.$nextTick(() =>{
            this.disableRS('all');
        })
      })
    },

    watch:{
      error(){
        if(this.error !== null){
          this.$refs.alertBox.classList.add('alert-show')
          setTimeout(() => {
            try {
            this.$refs.alertBox.classList.remove('alert-show');}catch{}
          }, 3000);
          setTimeout(() => {
            this.error = null;
          }, 3600);
        }
      },
      successUpload(){
        let n = {
        0: 0,
        1: null,
        }
        this.deletedEl(n)
        
        setTimeout(() => {
          if(this.successUpload !== null){
            this.getData().then(()=>{
              try{
                this.$refs.alertBox.classList.add('alert-show')
              }catch{}
              setTimeout(() => {
                try {
                this.$refs.alertBox.classList.remove('alert-show');}catch{}
              }, 1500);
              setTimeout(() => {
                const data = {
                  0: 'successUpload',
                  1: null
                }
                this.successAdvise(data)
              }, 1600);
            })
          }
        }, 1500);
      },
      deletingVal(){
        if(this.deletingVal === null){
          setTimeout(() => {
            let m = {
              0: 1,
              1: '',
            }
            this.deletedEl(m)
          }, 1000);
        }
      },
      cargarDB(){
        if(this.cargarDB === true){
          this.getData().then(()=>{
            this.falseCargarDB();
          })
        }
      }
    }
}
</script>

<style scoped>
  section{
    transition: all .9s ease;
    -moz-transition: all .9s ease;
    -o-transition: all .9s ease;
    -webkit-transition: all .9s ease;
  }

  section#section2, section#section1, section#section0{
    margin: 10px 5px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 5px;
    box-shadow: 0 0 7px rgba(0,0,0,.5);
  }

  p{
    color: black !important;
    font-size: 15px;
    font-weight: bold;
    white-space: normal;
  }

  .v-wrapper{
    display: block;
    margin: auto;
    width: auto;
    height: auto;
    margin: 30px 0;
  }

  .form-class{
    width: 100%;
    height: 100%;
  }

  .form-class .file-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 5px 0;
  }

  .form-class input[type="text"], .form-class textarea, .form-class input[type="email"], .form-class input[type="date"]{
    font-size: 14px;
    width: 100%;
    border: 0.5px solid black;
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }

  .form-class input[type="time"]{
    font-size: 14px;
    border: 0.5px solid black;
    padding: 5px;
    border-radius: 5px;
  }

  .form-class textarea{
    min-height: 150px;
    resize: none;
    overflow: auto;
  }

  .form-class textarea.info-form-c{
    min-height: 75px;
    resize: none;
    overflow: auto;
  }

  .form-class .file-form .redes .icon{
    cursor: pointer;
    font-size: 24px;
    padding: 8px 8px;
    border-radius: 50%;
    background-color: grey;
    color: rgb(65, 65, 65);
    transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  .form-class .file-form .redes .icon.flaticon-instagram.active{
    background-color: rgba(212, 47, 138);
    color: white;
  }

  .form-class .file-form .redes .icon.flaticon-facebook.active{
    background-color: rgba(24, 119, 242);
    color: white;
  }

  .form-class .file-form .redes .icon.flaticon-twitter.active{
    background-color: rgba(29, 161, 242);
    color: white;
  }

  .form-class .file-form .redes .icon:hover{
    box-shadow: 0 0 5px black;
  }

  textarea::-webkit-scrollbar {
    width: 15px;
  }

  textarea::-webkit-scrollbar-button:start:decrement,
  textarea::-webkit-scrollbar-button:end:increment  {
    height: 10px;
    background-color: transparent;
  }

  textarea::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  textarea::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .uploadCont p{
    color: white;
    font-size: 13px;
    font-weight: 400;
  }

  .input-files{
    height: auto;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .input-files .button-files, .input-files label{
    cursor: pointer;
  }

  .input-files .button-files{
    color: white;
    background-color: rgb(190, 190, 190);
    height: 100%;
    border-radius: 10px;
    font-weight: 400;
    cursor: pointer;
    transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  .input-files .button-files .icon::before{
    color: white;
    background-color: rgba(150, 150, 150);
    border-radius: 50%;
    font-size: 25px !important;
    cursor: pointer;
    padding: 15px 15px 16px 15px;
    transition: all .2s ease;
    -moz-transition: all 29s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  .input-files:hover  .button-files{
    background-color: rgb(170, 170, 170);
  }

  .input-files:hover .button-files .icon::before{
    background-color: rgba(130, 130, 130);
  }

  .input-files .collectionFiles{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }

  .input-files .collectionFiles::after{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
    content: ' ';
  }

  .prev-container{
    height: auto;
    border-radius: 10px;
  }

  .prev-container img{
    border-radius: 10px;
    border: 1px transparent;
  }

  .prev-container .remove::before{
    cursor: pointer;
    border-radius: 50%;
    font-size: 13px !important;
    color: rgb(136, 136, 136);
    padding: 5px 5px 6px 5px;
    transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  .prev-container .remove:hover::before{
    color: rgb(115, 115, 115);
  }

  .uploadCont .prev-container .image .icon{
    font-size: 70px;
    cursor: pointer;
    padding: 22.5px 0px;
    margin: 10px;
    color: black;
    transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  .uploadCont .prev-container .image .icon:hover{
    transform: scale(1.1);
    color: rgb(15, 15, 15);
  }

  .icon.flaticon-checked{
    color: rgba(0,150,0);
    font-size: 30px;
    margin: 0 10px;
  }

  .veri-box .icon{
    color: white;
    font-size: 14px;
    background-color: rgb(200, 0, 0);
    border: 0.5px solid rgb(120, 0, 0);
    padding: 2.5px 7px;
    border-radius: 5px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.40);;
  }
  
  .select-field{
    margin: 5px 0;
  }

  .list-db{
    margin: 10px 5px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 5px;
    box-shadow: 0 0 7px rgba(0,0,0,.5);
  }

  .list-db .list-header .icon::before{
    border-radius: 50%;
    padding: 4px 4px 4px 4.5px;
    color: white;
    font-size: 12px;
    cursor: pointer;
    transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  .list-db .list-header .icon.add::before{
    background-color: rgba(5, 1, 224);
  }

  .list-db .list-header .icon.add:hover::before{
    background-color: rgba(5, 1, 200);
  }
  
  .list-db .list-header .icon.delete::before{
    background-color: rgba(70, 70, 70);
  }

  .list-db .list-header .icon.delete:hover::before{
    background-color: rgba(51, 51, 51);
  }

  .list-db .list-header{
    text-overflow: ellipsis;
    font-weight: bold;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(215, 215, 215);
  }
  
  .list-db .list-header .text{
    font-size: 14px;
    overflow: visible;
    text-overflow: ellipsis;
  }

  .list-db .list-item{
    position: relative;
    width: 100%;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
    transition: all .9s ease;
    -moz-transition: all .9s ease;
    -o-transition: all .9s ease;
    -webkit-transition: all .9s ease;
  }

  .list-db .list-item::before{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0);
  }

  .list-db .list-item:hover::before{
    background-color: rgba(0,0,0,.05);
  }

  .list-db .list-item:nth-child(odd){
    background-color: rgb(245, 245, 245); 
  }

  .list-db .list-item .item-element .icon{
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    margin: 0 5px;
    padding: .5px 4px .5px 5px;
    color: white;
    transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    -webkit-transition: all .5s ease;
  }

  .list-db .list-item .item-element .icon.edit:hover{
    background-color: rgb(247, 226, 43);
  }

  .list-db .list-item .item-element .icon.delete:hover{
    background-color: #fd364a;
  }

  .list-db .list-item .item-element .icon.edit{
    background-color: rgb(228, 207, 25);
    border: 0.3px solid  rgb(228, 207, 25);
  }

  .list-db .list-item .item-element .icon.delete{
    background-color: #ce3140;
    border: 0.3px solid  #ce3140;
  }

  .list-db .list-item .item-element.text{
    font-size: 13px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }

  .phones-input{
    margin: 0;
  }

  .phones-input .icon::before{
    cursor: pointer;
    font-size: 12px;
    border: 0.05em solid black;
    border-radius: 50%;
    color: white;
    max-height: 24px;
    transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  .phones-input .icon.delete::before{
    padding: 4px 4.5px 4px 5px;
    background-color: #ce3140;
    border: 0.3px solid  #ce3140;
  }

  .phones-input .icon.delete:hover::before{
    background-color: #fd364a;
  }

  .phones-input .icon.add::before{
    padding: 4px 4.5px 4px 5px;
    background-color: #27913e;
    border: 0.3px solid  #27913e;
  }

  .phones-input .icon.add:hover::before{
    background-color: #2dac49;
  }
</style>