<template>
  <div id="admin-editar" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <div class="v-wrapper">
        <p>Seleccione una de las secciones</p>
        <select class="custom-select" v-model="editContent.formUpload.seccion" @change="filterChangeHandler()">
          <option selected>Todas las secciones</option>
          <option value="Actualidad">Actualidad</option>
          <option value="Tenis">Tenis</option>
          <option value="Natación">Natación</option>
          <option value="Actualidad">Artes Marciales</option>
          <option value="Tenis">Comunicaciones</option>
          <option value="Natación">Cultura</option>
          <option value="Actualidad">Dominó</option>
          <option value="Tenis">Bailoterapia</option>
          <option value="Natación">Squash</option>
          <option value="Actualidad">TRX</option>
        </select>
    </div>
    <div ref="anuncios" class="position-relative w-100">
      <div class="anun-container d-flex flex-row align-items-center justify-content-center w-100" v-for="(anuncio, index) in reverseArray" v-if="anuncio !== undefined" :key="anuncio.noti_id" :id="anuncio.noti_seccion" data-transitioned="false">
        <div :key="index"  :class="['transitioned d-flex flex-row align-items-center justify-content-between mt-1 mb-1 mr-1', (showPrev === false)?'col-10':'col-9']" :ref="anuncio.noti_seccion" style="height: 55px;" :id="`anun${index}`" @click="anunSelected($event, index)">
          <span class="text-uppercase text-center col-3" id="val1">{{anuncio.noti_seccion}}</span>
          <span class="text-uppercase text-center col-4" id="val2">{{anuncio.noti_titulo}}</span>
          <span class="text-center col-4" id="val3">{{fechaAnuncio[index]}}</span>
        </div>
        <button class="btn btn-danger p-2 ml-3" @click="deleteElement(index)">
          <div v-if="deletingVal === true && deletingIndex === index" class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <i class=" flaticon-close" v-else></i>
        </button>
        <button v-show="showPrev === true" class="btn btn-dark ml-3" @click="filterChangeHandler()">Regresar</button>
      </div>
    </div>
    <div v-show="showPrev">
      <form action="" class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <div class="row align-items-start justify-content-between w-100 m-2">
            <div class="input-files col-lg-4 col-sm-6 d-flex flex-column align-items-start p-1" v-for="(image, index) in imagesData" :key="index">
              <div class="w-100 h-100 d-flex align-items-center position-relative">
                <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                  <i class="flaticon-folder mr-3"></i>
                  <label for="collectionFiles">{{`Imagen 0${parseInt(index) + 1}`}}</label>
                </div>
                <input :ref='`file${index}`' @change="filesVerification($event, index)" class="collectionFiles"  type="file" accept="image/*">
              </div>
            <!-- PREV IMAGENES -->
              <div  class="uploadCont d-flex flex-row align-items-center w-100 mt-2" v-if="image.length !== 0">
                <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                  <!-- MUESTRA DE IMAGEN -->
                  <div class="w-100 h-100 m-2">
                    <div class="d-flex justify-content-center align-items-center" v-if="!(image.url === '')">
                      <img :src="image.url" width="200" height="200" style="min-height: 200px; min-width: 200px; ">
                    </div>
                    <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                      <p class="align-self-star ml-2">{{image.name}}</p>
                    </div>
                    <!-- ICONO DE QUITAR -->
                    <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                      <button @click.prevent="deleteFile(index)" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                    </div>
                    <!-- FIN ICONO DE QUITAR -->
                  </div>
                  <!-- FIN MUESTRA DE IMAGEN -->
                  <!-- BARRA DE PROGRESO -->
                  <div class="progress w-85 mb-2" v-if="(editContent.formUpload.images[index] !== undefined)?true:false">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${!(editContent.formUpload.images[index] === undefined)?editContent.formUpload.images[index].uploadPercentage: ' '}%; height: ${(editContent.formUpload.images[index].progressBar !== undefined)? editContent.formUpload.images[index].progressBar.height: ' '} !importan; color: black`"></div>
                  </div>
                  <!-- FIN BARRA DE PROGRESO -->
                </div>
              </div>
            <!--  Fin de IMAGENES -->
          </div>
          </div>
        </div>
        <div class="select-field">
          <p>Seleccione una de las secciones para subir la información</p>
          <select class="custom-select" v-model="seccion">
            <option value="Actualidad">Actualidad</option>
            <option value="Tenis">Tenis</option>
            <option value="Natacion">Natación</option>
            <option value="Artes Marciales">Artes Marciales</option>
            <option value="Comunicaciones">Comunicaciones</option>
            <option value="Cultura">Cultura</option>
            <option value="Domino">Dominó</option>
            <option value="Bailoterapia">Bailoterapia</option>
            <option value="Squash">Squash</option>
            <option value="TRX">TRX</option>
          </select>
        </div>
        <input type="text" placeholder="Título" v-model="titulo">
        <textarea type="text" class="info-form" placeholder="Información" v-model="info"></textarea>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection()">Crear noticia</button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection()">Borrar campos</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    name: 'AdminEditContent',
    data(){
      return {
        show: false,
        error: null,
        displayArr: false,
        tipoSol: 0,
        seccion: '',
        titulo: '',
        info: '',
        dbVal: [],
        imagesData: {
          0: [],
          1: [],
          2: [],
        },
        files: {
          0: [],
          1: [],
          2: [],
        },
        dataTransfer: [{
          0:{
            imagenes: [],
            id: [],
            fecha: [],
            seccion: [],
            info: [],
            titulo: [],
          },
          1: [],
          2: [],
          3: [],
          4: [],
        }],
        changeDB: false,
        changePics: false,
        showPrev: false,
      }
    },

    computed:{
      ...mapState(['editContent', 'successUpload', 'dbWeb', 'deletingVal', 'deletingIndex', 'loadEdit']),
      ...mapActions(['getData']),
      reverseArray(){
        if(this.dbWeb.Noticias !== undefined){
          let array = Object.values(this.dbWeb.Noticias);
          return array.reverse()
        }else{
          let array = []
          return array
        }
      },
      fechaAnuncio(){
        let splittedDate = [];
        let joinedDate = [];
        let i = 0;
        this.reverseArray.forEach(element => {
          splittedDate.push(element.noti_fecha.split('|'));
        })
        splittedDate.forEach(element => {
          joinedDate.push(element.join(' '))
        })
        return joinedDate
      },
    },
    
    methods:{
      ...mapMutations(['filesUpload', 'resetContentValues', 'deleteFileState', 'successAdvise', 'deletedEl']),
      filterChangeHandler(){
        const waiting = setInterval(() => {
          for(let i = 0; i < this.$refs.anuncios.children.length; i++) {
            if(this.$refs.anuncios.children[i].dataset.transitioned === 'true'){
              return false
            }else{
              this.filterChange()
              clearInterval(waiting)
            }
          }
        }, 100);
      },
      filterChange(){
        this.showPrev = false
        if(this.editContent.formUpload.seccion !== 'Todas las secciones'){
          for(let i = 0; i < this.$refs.anuncios.children.length; i++) {
            setTimeout(() => {
              this.$refs.anuncios.children[i].classList.add('slide-list');
              this.$refs.anuncios.children[i].dataset.transitioned = 'true'
            }, 50*i);
            if(this.$refs.anuncios.children[i].id !== this.editContent.formUpload.seccion){
              setTimeout(() => {
                this.$refs.anuncios.children[i].classList.add('hide-list');
                this.$refs.anuncios.children[i].dataset.transitioned = 'false'
              }, 1000 + 50*i);
            }else{
              setTimeout(() => {
                this.$refs.anuncios.children[i].classList.remove('slide-list');
                this.$refs.anuncios.children[i].classList.remove('hide-list');
                this.$refs.anuncios.children[i].dataset.transitioned = 'false'
              }, 1000 + 50*i);
            }
          }
        }else{
          let i = 0;
          this.$refs.anuncios.children.forEach(element => {
            setTimeout(() => {
              element.classList.add('slide-list');
              element.dataset.transitioned = 'true'
            }, 50*i);
            setTimeout(() => {
              element.classList.remove('slide-list');
              element.classList.remove('hide-list');
              element.dataset.transitioned = 'false'
            }, 1000 + 50*i);
            i ++;
          })
        }
      },
      anunSelected(value, index){
        let count = 0;
        let root = document.documentElement;
        let j = 0;

        for(let i = 0; i < this.$refs.anuncios.children.length; i++) {
          setTimeout(() => {
            this.$refs.anuncios.children[i].classList.add('slide-list');
          }, 50*i);
          if(this.$refs.anuncios.children[i].children[0].id !== value.target.parentNode.id){
            setTimeout(() => {
              this.$refs.anuncios.children[i].classList.add('hide-list');
            }, 900 + 50*i);
          }
          if(i === this.$refs.anuncios.children.length-1){
            setTimeout(() => {
              this.$refs.anuncios.children[index].classList.remove('slide-list');
              this.$refs.anuncios.children[index].classList.remove('hide-list');
            }, 900 + 50*i + 100);
          }
          j ++;
          if(j === this.$refs.anuncios.children.length){
            setTimeout(() => {
              for(let k = 0; k < this.reverseArray[index].noti_imagenes.length; k++){
                  this.imagesData[k] = this.reverseArray[index].noti_imagenes[k];
                  this.dbVal = this.reverseArray[index];
                  this.seccion = this.reverseArray[index].noti_seccion;
                  this.info = this.reverseArray[index].noti_info;
                  this.titulo = this.reverseArray[index].noti_titulo;
              }
              this.showPrev = true
            }, 900 + 50*j + 300);
          }
        }
      },
      deleteFile(index){
        this.imagesData[index] = [];
        this.files[index] = [];
      },
      deleteCollection(){
        this.imagesData = {
          0: [],
          1: [],
          2: [],
        }
        this.info = '';
        this.titulo = '';
        this.seccion = '';
      },
      validacion(){
        this.changeDB = false;
        this.changePics = false;

        if(this.titulo !== this.dbVal.noti_titulo || this.info !== this.dbVal.noti_info || this.seccion !== this.dbVal.noti_seccion){
          this.changeDB = true;
          return true
        }else{
          let ref = Object.values(this.imagesData).length;
          for(let i = 0; i <  ref; i++){
            if(this.imagesData[i].uploadPercentage !== undefined){
              this.changePics = true;
              return true
            }
          }
        }
      },
      submitCollection(){
        
        if(this.validacion()){
          let imagenes = [];
          let archivos = [];
          this.dataTransfer = {
          0:{
            imagenes: [],
            id: [],
            fecha: [],
            seccion: [],
            info: [],
            titulo: [],
          },
          1: [],
          2: '',
          3: '',
          4: '',
          };

          for(let i = 0; i < 3; i++){
            if(this.imagesData[i].length !== 0){
              imagenes.push(this.imagesData[i])
              if(this.files[i] !== undefined){ 
                archivos.push(this.files[i])
              }
            }
          }

          this.tipoSol = 1;

          this.dataTransfer[0].imagenes = imagenes;
          this.dataTransfer[0].id = this.dbVal.noti_id;
          this.dataTransfer[0].titulo = this.titulo;
          this.dataTransfer[0].info = this.info;
          this.dataTransfer[0].fecha = this.dbVal.noti_fecha;
          this.dataTransfer[0].seccion = this.seccion;
          this.dataTransfer[1] = archivos;
          this.dataTransfer[2] = tipoSol;
          this.dataTransfer[3] = this.changePics;
          this.dataTransfer[4] = this.changeDB;

          this.filesUpload(this.dataTransfer)
        }else{
          this.error = 'Primero debe hacer cambios'
        }
      },
      filesVerification(event, val){

        this.imagesData[val] = []

        let files = event.target.files[0];

        this.files[val] = event.target.files[0];

        this.files[val].id = val
        this.imagesData[val] = {
          name: files.name,
          url: '',
          uploadPercentage: 0,
          progressBar: {
            show: true,
            height: '20px',
          },
        }
        
        event.target.value = ''
      },
      deleteElement(index){
        if(this.deletingVal === null){
          if(!this.showPrev){
            this.dataTransfer = {
            0: [],
            1: '',
            2: '',
            3: '',
            4: '',
            };
            this.dataTransfer[0] = this.reverseArray[index].noti_id;
            this.dataTransfer[2] = 2;
            this.dataTransfer[3] = index;

            this.filesUpload(this.dataTransfer)
          }
        }
      },
    },

    created(){
      try{
      this.getData()
      } catch{this.show = true}
    },

    mounted(){
      this.resetContentValues(1);
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
        if(this.successUpload !== null){
          this.$refs.alertBox.classList.add('alert-show')
          setTimeout(() => {
            try {
            this.$refs.alertBox.classList.remove('alert-show');}catch{}
          }, 3000);
          setTimeout(() => {
            const data = {
              0: 'successUpload',
              1: null
            }
            this.successAdvise(data)
          }, 3600);
        }
      },
      deletingVal(){
        let n = {
          0: 0,
          1: null,
        } 

        if(this.deletingVal === false){
          this.deletedEl(n)
        }else if(this.deletingVal === null){
          this.$refs.anuncios.children[`${this.deletingIndex}`].classList.add('slide-list');
          this.$refs.anuncios.children[`${this.deletingIndex}`].dataset.transitioned = 'true'
          setTimeout(() => {
            let m = {
              0: 1,
              1: '',
            }
            this.$refs.anuncios.children[`${this.deletingIndex}`].classList.add('deleted');
            this.deletedEl(m)
          }, 1000);
        }
      }
    }
}
</script>

<style scoped>
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

  .form-class input[type="text"], .form-class textarea {
    font-size: 14px;
    width: 100%;
    border: 0.5px solid black;
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }

  .form-class textarea{
    min-height: 150px;
    resize: none;
    overflow: auto;
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
  }

  .input-files .button-files, .input-files label{
    cursor: pointer;
  }

  .input-files .button-files{
    color: white;
    height: 100%;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
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
    /* display: none; */
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

  .anun-container{
    max-width: 100%;
    max-height: 600px;
    opacity: 1;
    height: auto; 
    transition: transform 1s ease, opacity 0.8s ease-in, top 1s ease;
    overflow: hidden;
    top: auto;
  }

  .transitioned{
    cursor: pointer;
    position: relative;
    border-radius: 15px;
    border: 1px solid black;
    padding: 0 15px;
    transition: background-color 0.15s ease-in;
    background-color: white;
  }

  .transitioned::before{
    position: absolute;
    content: ' ';
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    border: 1px transparent;
    border-radius: 15px;
  }

  .transitioned span{
    cursor: pointer;
    font-weight: bold;
    transition: color 0.15s ease-in;
  }

  .anun-container .btn-danger{
    width: 50px;
    height: auto;
    border: none;
    font-size: 14px;
  }

  .transitioned:hover{
    background-color: #FE5D25;
  }

  .transitioned:hover span{
    color: white;
  }

  /* .form-class .info-label{
    position: absolute;
    left: 5px;
    top: 0;
  } */


</style>