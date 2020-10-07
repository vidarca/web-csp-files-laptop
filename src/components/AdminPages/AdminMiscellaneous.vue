<template>
  <div id="admin-miscellaneous" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section id="section0" class="p-3" ref="section0">
      <form class="form-class d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form d-flex flex-row align-items-start justify-content-center p-1">
           <div class="col-6 p-1 h-100 d-flex flex-column align-items-center justify-content-center">
              <!-- IMAGEN LOGO -->
              <div class="h-100 w-100 d-flex flex-row align-items-center justify-content-start p-1">
                <div class="input-files d-flex w-auto h-100 flex-column align-items-center justify-content-center position-relative" v-if="miscellaneous.logo.nombre === undefined || miscellaneous.logo.nombre === ''">
                  <input :ref='`file0`' @change="filesVerification($event, 0, 'crear')" class="collectionFiles" title="Elija un archivo"  type="file" accept=".png">
                  <div class="button-files d-flex flex-row align-items-center justify-content-center">
                    <i class="icon flaticon-add m-0 p-0"></i>
                  </div>
                </div>
                <!-- PREV IMAGENES -->
                <div  class="uploadCont flex-row align-items-center justify-content-start" v-else style="display: flex;">
                  <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between', (miscellaneous.logo.url === '' || miscellaneous.logo.url === undefined && dbImg[0] === undefined || dbImg[0] === '')?'bg-success-light':(miscellaneous.logo.url !== '' && miscellaneous.logo.url !== undefined || dbImg[0].url !== undefined && dbImg[0].url !== '')?'bg-white':'bg-success-light']">
                    <!-- MUESTRA DE IMAGEN -->
                    <div class="w-100 d-flex position-relative justify-content-end flex-column h-100">
                      <div class="d-flex h-100 w-100 justify-content-center align-items-center" v-if="(dbImg[0] !== undefined || miscellaneous.logo.url !== '')">
                        <img :src="(dbImg[0] !== undefined && dbImg[0].url !== undefined)?dbImg[0].url:(miscellaneous.logo.url !== '')?miscellaneous.logo.url:''"  >
                      </div>
                      <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                        <p class="align-self-star" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{miscellaneous.logo.nombre}}</p>
                      </div>
                      <!-- ICONO DE QUITAR -->
                      <div @click.prevent="deleteFile(0, 'crear')" title="Eliminar" class="remove position-absolute flaticon-close" style="top:-10px; right:-7px;"></div>
                        <!-- FIN ICONO DE QUITAR -->
                    </div>
                      <!-- FIN MUESTRA DE IMAGEN -->
                  </div>
                </div>
                <p class="text pl-2">
                  Seleccione el logo de la página SIN TEXTO en formato PNG
                </p>
              </div>
              <!--  Fin de IMAGEN LOGO -->
               <textarea type="text" class="info-form-c w-100" placeholder="Dirección de contacto" v-model="miscellaneous.direccion" style="height: 100px"></textarea>
               <p class="text mt-2">
                    Haga clic en cualquiera de los íconos para activar o desactivar el campo correspondiente
                </p>
               <div class="redes d-flex align-items-center justify-content-between flex-row w-100">
                   <div class="w-100 d-flex flex-column align-items-center justify-content-center col-6 col-md-4">
                        <i :class="['icon flaticon-instagram', (miscellaneous.redes.instagram.activo === true)?'active':'']" @click="disableRS('instagram')"></i>
                        <input class="w-100" ref="inputinstagram" type="text" v-model="miscellaneous.redes.instagram.link" placeholder="Link del perfil">
                   </div>
                   <div class="w-100 d-flex flex-column align-items-center justify-content-center col-6 col-md-4">
                        <i :class="['icon flaticon-twitter', (miscellaneous.redes.twitter.activo === true)?'active':'']" @click="disableRS('twitter')"></i>
                        <input class="w-100" ref="inputtwitter" type="text" v-model="miscellaneous.redes.twitter.link" placeholder="Link del perfil">
                   </div>
                   <div class="w-100 d-flex flex-column align-items-center justify-content-center col-6 col-md-4">
                        <i :class="['icon flaticon-facebook', (miscellaneous.redes.facebook.activo === true)?'active':'']" @click="disableRS('facebook')"></i>
                        <input class="w-100" ref="inputfacebook" type="text" v-model="miscellaneous.redes.facebook.link" placeholder="Link del perfil">
                   </div>
               </div>
           </div>
           <div class="col-6 p-1 d-flex flex-column align-items-center justify-content-center" style="min-height: 400px">
               <div class="w-100" style="min-height: 200px;">
                    <div class=" w-100 phones-input row justify-content-between align-items-center" v-for="index in cantFields.telefonos.numero" :key="`telefono${index}`" style="margin-top: 5px;">
                        <div class="col-9 p-0 d-flex flex-row align-items-center justify-content-center">
                            <input :class="['position-relative', validPhone(miscellaneous.telefonos[`telefonos${index}`], (index))?'':'error']" ref="phone" type="text" v-model="miscellaneous.telefonos[`telefonos${index}`]" placeholder="Télefono (Ej. +581112223333)">
                            <div class="important-field" v-show="!validPhone(miscellaneous.telefonos[`telefonos${index}`], (index))"></div>
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
        files: {},
        valores: ['telefonos', 'correos', 'direccion', 'redes', 'logo', 'id'],
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
            logo: '',
        }
      },
      deleteFile(index, val){
        this.miscellaneous.logo = '';
        delete this.files[`archivo${index}`];
        this.resetDBValues(index);
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
      validAllFields(){
        let ref = false;

        for(let i = 1; i <= this.cantFields.telefonos.numero; i++){
          if(this.validPhone(this.miscellaneous.telefonos[`telefonos${i}`], i) === false){
            this.error = 'Los campos marcados con * son obligatorios';
            return false
          }
        }

        for(let i = 1; i <= this.cantFields.correos.numero; i++){
          if(this.validPhone(this.miscellaneous.correos[`correos${i}`], i)){
            this.error = 'Los campos marcados con * son obligatorios';
            return false
          }
        }

        return true
      },
      submitCollection(value){
        if(this.validAllFields()){
            if(this.miscellaneous.logo.id !== undefined){
              this.miscellaneous.logo.nombre = this.miscellaneous.logo.nombreref;
            }

            let dataTransfer = {
              archivos: this.files,
              miscellaneous: {
                correos: this.miscellaneous.correos,
                direccion: this.miscellaneous.direccion,
                redes: this.miscellaneous.redes,
                telefonos: this.miscellaneous.telefonos,
                logo: this.miscellaneous.logo,
                id: this.miscellaneous.id,
              },
              target: 'Miscellaneous',
            };

            console.log(dataTransfer);
            
            this.updateDB(dataTransfer);
        }
      },
      filesVerification(event, index, val2){

        let files = event.target.files[0];

        this.files[`archivo${index}`] = event.target.files[0];

        this.files[`archivo${index}`].id = index;

        this.miscellaneous.logo = {
          nombre: files.name,
          url: '',
          id: index,
          nombreref: `logo_png`,
          uploadPercentage: 0,
          progressBar: {
            show: true,
          },
        }

        event.target.value = ''
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
                if(Object.values(this.miscellaneous[`${this.cantFields[val2].nombre}`])[i] === undefined || Object.values(this.miscellaneous[`${this.cantFields[val2].nombre}`])[i] === ''){
                    return this.error = 'Primero debe llenar la casilla vacía'
                }
            }
            for(let i = 1; i <= this.cantFields[val2].numero; i++){
              if(val2 === 'telefonos'){
                if(this.validPhone(this.miscellaneous[`${this.cantFields[val2].nombre}`][`${this.cantFields[val2].nombre}${i}`], i) === false){
                  return this.error = 'Primero debe llenar correctamente la casilla'
                }
              }else if(val2 === 'correos'){
                if(this.validEmail(this.miscellaneous[`${this.cantFields[val2].nombre}`][`${this.cantFields[val2].nombre}${i}`], i) === false){
                  return this.error = 'Primero debe llenar correctamente la casilla'
                }
              }
            }
        }
        this.$set(this.miscellaneous[`${this.cantFields[`${val2}`].nombre}`], `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, '');
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
        this.files = {};
        if(this.dbWeb.Miscellaneous !== undefined){
          const id = Object.values(this.dbWeb.Miscellaneous)[0].misc_id;
          this.miscellaneous.id = Object.values(this.dbWeb.Miscellaneous)[0].misc_id;
            for(let i = 0; i < this.valores.length; i++){
                if(this.dbWeb.Miscellaneous[`${id}`][`misc_${this.valores[i]}`] !== undefined){
                    this.$set(this.miscellaneous, `${this.valores[i]}`,  this.dbWeb.Miscellaneous[`${id}`][`misc_${this.valores[i]}`]);
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
    height: 100px;
    width: 100px;
    border-radius: 50%;
    font-weight: 400;
    cursor: pointer;
    transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  .input-files .button-files .icon{
    position: relative;
    line-height: 100px !important;
    height: 100px !important;
    width: 100px !important;
    min-width: 100px !important;
  }

  .input-files .button-files .icon::before{
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    color: white;
    background-color: rgba(150, 150, 150);
    border-radius: 50%;
    height: 100px !important;
    line-height: 100px !important;
    width: 100px !important;
    min-width: 100px !important;
    font-size: 25px !important;
    cursor: pointer;
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
    z-index: 5000;
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
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .prev-container img{
    border: 1px transparent;
    height: 70px;
    width: 70px;
  }

  .prev-container .remove::before{
    cursor: pointer;
    border-radius: 50%;
    font-size: 13px !important;
    color: rgb(110, 110, 110);
    padding: 5px 5px 5px 5px;
    border: 1px solid rgba(0,0,0,.6);
    transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
  }

  .prev-container .remove:hover::before{
    color: rgb(85, 85, 85);
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