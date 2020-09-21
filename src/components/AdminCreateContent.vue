<template>
  <div id="admin-crear" class="position-relative">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
      <div  class="v-wrapper">
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
                  <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', image.length === 0?' ': (image.collectionVeri[0] === undefined)?'bg-success-light': 'bg-danger']">
                    <!-- MUESTRA DE IMAGEN -->
                    <div class="w-100 h-100 m-2">
                      <div class="d-flex justify-content-center align-items-center" v-if="!(createContent.formUpload.images[index] === undefined)">
                        <img :src="!(createContent.formUpload.images[index] === undefined)?createContent.formUpload.images[index].url : ' '" width="200" height="200" style="min-height: 200px; min-width: 200px; ">
                      </div>
                      <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                        <p class="align-self-star ml-2" style="text-overflow: ellipsis;">{{image.name}}</p>
                        <!-- ICONO DE QUITAR -->
                        <div class="veri-box ml-2 mr-2">
                          <a @click.prevent="deleteFile(index)" class="icon flaticon-close mr-1 ml-auto" v-show="createContent.formUpload.images[index] === undefined"></a>
                        </div>
                        <!-- FIN ICONO DE QUITAR -->
                      </div>
                    </div>
                    <!-- FIN MUESTRA DE IMAGEN -->
                    <!-- BARRA DE PROGRESO -->
                    <div class="progress w-85 mb-2" v-show="!(createContent.formUpload.images[index] === undefined)?createContent.formUpload.images[index].progressBar.show: false">
                      <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${!(createContent.formUpload.images[index] === undefined)?createContent.formUpload.images[index].uploadPercentage: ' '}%; height: ${!(createContent.formUpload.images[index] === undefined)?createContent.formUpload.images[index].progressBar.height: ' '} !importan; color: black`"></div>
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
            <select class="custom-select" v-model="createContent.formUpload.seccion">
              <option selected>Seleccione una opción</option>
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
          <input type="text" placeholder="Título" v-model="createContent.formUpload.titulo">
          <textarea type="text" class="info-form-c" placeholder="Información corta" v-model="createContent.formUpload.prev"></textarea>
          <textarea type="text" class="info-form" placeholder="Información" v-model="createContent.formUpload.info"></textarea>
          <div class="d-flex flex-row justify-content-between align-items-center m-3">
            <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection()">Crear noticia</button>
            <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection()">Borrar campos</button>
          </div>
        </form>
      </div>
  </div>
</template>

<script>

import {mapState, mapMutations} from 'vuex'

export default {
    name: 'AdminCreateContent',
    data(){
      return {
        error: null,
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
        secSelect: '',
        dataTransfer: [],
      }
    },

    computed:{
      ...mapState(['createContent', 'successUpload'])
    },
    
    methods:{
      ...mapMutations(['filesUpload', 'resetContentValues', 'deleteFileState', 'successAdvise']),
      deleteFile(index){
        this.imagesData[index] = [];
        this.files[index] = [];
      },
      deleteCollection(){
        this.imagesData = {
          0: [],
          1: [],
          2: [],
        };
        this.files = {
          0: [],
          1: [],
          2: [],
        }
        this.resetContentValues(0)
      },
      validacion(){
        if(this.createContent.formUpload.titulo !== '' && this.createContent.formUpload.info !== '' && this.createContent.formUpload.seccion !== 'Seleccione una opción' && this.imagesData[0].length !== 0 && this.imagesData[1].length !== 0){
          return true
        }
      },
      submitCollection(){
        if(this.validacion()){
          let imagenes = [];
          let archivos = [];
          this.dataTransfer = [];

          for(let i = 0; i < 3; i++){
            if(this.imagesData[i].length !== 0){
              imagenes.push(this.imagesData[i])
              archivos.push(this.files[i])
            }
          }

          let tipoSol = 0;

          this.dataTransfer.push(imagenes)
          this.dataTransfer.push(archivos)
          this.dataTransfer.push(tipoSol)
          this.filesUpload(this.dataTransfer)
        }else{
          this.error = 'Todos los campos deben estar llenos'
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
          collectionVeri: [],
          }
        
        event.target.value = ''
      },
      verfication(val){
        
      },
    },

    created(){
      this.resetContentValues(0);
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

  .form-class textarea.info-form-c{
    min-height: 75px;
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

  /* .form-class .info-label{
    position: absolute;
    left: 5px;
    top: 0;
  } */


</style>



