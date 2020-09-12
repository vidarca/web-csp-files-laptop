<template>
  <div id="admin-crear" class="position-relative">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
      <div  class="v-wrapper">
        <form action="" class="form-class d-flex flex-column justify-content-center align-items-center">
          <div class="file-form">
            <div class="d-flex flex-row align-items-center justify-content-center w-100">
              <div class="input-files position-relative bg-success d-flex align-items-center p-3">
                <div class="button-files d-flex flex-column align-items-center justify-content-center">
                  <label for="collectionFiles">Seleccionar imágenes</label>
                  <i class="flaticon-folder"></i>
                </div>
                <input ref="collectionFiles" id="collectionFiles" alt=" " title=" " type="file" accept="image/*" @change="filesVerification($event)" multiple>
              </div>
            </div>
            <div  class="uploadCont d-flex flex-column justify-content-between align-items-center w-100">
              <div class="prev-files d-flex flex-row align-items-center w-85 m-2" v-for="(image, index) in imagesData" :key="index">
                <div :class="['prev-container','d-flex', 'flex-row', 'align-items-center', 'justify-content-between', 'w-100', 'h-100', !image?' ': (image.collectionVeri[0] === undefined)?'bg-success-light': 'bg-danger']">
                  <div  class="col-7 d-flex flex-column">
                    <img class="p-1 align-self-center" v-if="!(formUpload.images[index] === undefined)" :src="!(formUpload.images[index] === undefined)?formUpload.images[index].url : ' '" width="100" height="100" style="min-height: 100px; min-width: 100px;">
                    <p v-else class="align-self-star">{{image.name}}</p>
                  </div>
                  <div class="progress w-85" v-show="!(formUpload.images[index] === undefined)?formUpload.images[index].progressBar.show: false">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${!(formUpload.images[index] === undefined)?formUpload.images[index].uploadPercentage: ' '}%; height: ${!(formUpload.images[index] === undefined)?formUpload.images[index].progressBar.height: ' '} !importan; color: black`"></div>
                  </div>
                  
                  <div :class="['veri-box', 'd-flex',' flex-row', 'justify-content-center', 'align-items-center', !(image.collectionVeri[0] === undefined)? 'col-5': 'col-auto']">
                    <p v-show="!(image.collectionVeri[0] === undefined)" class="mr-2 ml-2">
                      {{image.collectionVeri[0]}}
                    </p>
                    <a @click.prevent="deleteFile($event, index)" class="icon flaticon-close mr-1 ml-auto" v-if="formUpload.images[index] === undefined"></a>
                  </div>
                </div>
                <div class="icon flaticon-checked" v-show="image.collectionVeri[0] === undefined && formUpload.images[index] === undefined"></div>
              </div>
            </div>
          </div>
          <div class="select-field">
            <p>Seleccione una de las secciones para subir la información</p>
            <select class="custom-select" v-model="formUpload.seccion">
              <option selected>Seleccione una opción</option>
              <option value="Actualidad">Actualidad</option>
              <option value="Tenis">Tenis</option>
              <option value="Natación">Natación</option>
            </select>
          </div>
          <input type="text" placeholder="Título" v-model="formUpload.titulo">
          <textarea type="text" class="info-form" placeholder="Información" v-model="formUpload.info"></textarea>
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
        imagesData: [],
        files: [],
        secSelect: '',
        dataTransfer: [],
      }
    },

    computed:{
      ...mapState(['formUpload', 'successUpload'])
    },
    
    methods:{
      ...mapMutations(['filesUpload', 'resetCreateContentValues', 'deleteFileState', 'successAdvise']),
      deleteFile(event, index){
        if(this.formUpload.images[index]){

        }else{
          this.imagesData.splice(index, 1);
          this.files.splice(index, 1);
          this.verfication()
        }
      },
      deleteCollection(){
        this.imagesData = [];
        this.resetCreateContentValues()
      },
      validacion(){
        let cout = 0;

        for(let i = 0; i < this.imagesData.length; i++){
          if(this.imagesData[i].collectionVeri[0] !== undefined){
            cout ++;
          }
        }

        if(this.formUpload.titulo !== '' && this.formUpload.info !== '' && this.formUpload.seccion !== 'Seleccione una opción' && cout === 0 && this.imagesData[0] !== undefined){
          return true
        }
      },
      submitCollection(){
        if(this.validacion()){
          this.dataTransfer.push(this.imagesData)
          this.dataTransfer.push(this.files)
          this.filesUpload(this.dataTransfer)
        }else{
          this.error = 'Todos los campos deben estar llenos'
        }
        
      },
      filesVerification(event){

        this.imagesData = []

        let files = event.target.files;

        let k = 0;

        files.forEach(element => {
          this.files[k] = event.target.files[k];
          element['id'] = `${k}`
          this.imagesData.push({
            name: element.name,
            url: '',
            uploadPercentage: 0,
            progressBar: {
              show: true,
              height: '20px',
            },
            collectionVeri: [],
          })
          k ++;
        })

        this.verfication()
        
        this.$refs.collectionFiles.value = ''
      },
      verfication(){
        for(let i = 0; i < this.files.length; i++){
            this.imagesData[i].collectionVeri = []
          }
        // Determinar si son más de 3 elementos
        
        if(this.files.length > 3){
          for(let i = 0; i < this.files.length; i++){
            this.imagesData[i].collectionVeri.push('No pueden ser más de 3 archivos')
          }
        }

        //Deterpminar si tiene espacios en blanco

        let splittedWhiteSpace = [];
        let splittedWhiteSpaceCount = 0;

        for (let i = 0; i < this.files.length; i++) {
          splittedWhiteSpace.push(this.files[i].name.split(' '))
          splittedWhiteSpaceCount += splittedWhiteSpace[i].length
        }
        
        if(splittedWhiteSpaceCount > splittedWhiteSpace.length){
          for(let i = 0; i < splittedWhiteSpace.length; i++){
            if(splittedWhiteSpace[i].length > 1){
              this.imagesData[i].collectionVeri.push('Los nombres de las imágenes no pueden tener espacios en blanco')
            }
          }
        }
      },
    },

    created(){
      this.resetCreateContentValues();
    },

    watch:{
      error(){
        if(this.error !== null){
          this.$refs.alertBox.classList.add('alert-show')
          setTimeout(() => {
            this.$refs.alertBox.classList.remove('alert-show');
          }, 3000);
          setTimeout(() => {
            this.error = null;
          }, 3600);
        }
      },
      successUpload(){
        this.$refs.alertBox.classList.add('alert-show')
          setTimeout(() => {
            this.$refs.alertBox.classList.remove('alert-show');
          }, 3000);
          setTimeout(() => {
            const data = {
              var: 'successUpload',
              message: null
            }
            this.successAdvise(data)
          }, 3600);
      }
    }
}
</script>

<style scoped>
  p{
    color: black;
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
    height: 60px;
    border-radius: 10px;
  }

  .input-files .button-files, .input-files label{
    cursor: pointer;
  }

  .input-files .button-files{
    color: white;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
  }

  .input-files #collectionFiles{
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }

  .input-files #collectionFiles::after{
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;
    cursor: pointer;
    content: ' ';
  }

  .prev-files .prev-container{
    height: auto;
    min-height: 60px;
  }

  .prev-container{
    border-radius: 10px;
  }

  .icon.flaticon-checked{
    color: rgba(0,150,0);
    font-size: 30px;
    margin: 0 10px;
  }

  .btn-success{
    border: 1px solid rgb(0, 75, 0);
  }

  .btn-danger{
    border: 1px solid rgb(120, 0, 0);
  }

  .bg-success{
    border: 1px solid rgb(0, 75, 0);
  }

  .bg-success-light{
    color: black;
    border: 1px solid rgb(0, 75, 0);
  }

  .bg-success-light p{
    color: black;
  }

  .bg-danger{
    border: 1px solid rgb(120, 0, 0);
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

  .alert-box{
    z-index: 9999999;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    right: 0;
    max-width: 200px;
    height: auto;
    margin-right: 10px;
    border: 0.5px solid black;
    padding: 5px;
    border-radius: 15px;
    box-shadow: 0 0 6px black;
    transition: all 0.6s ease;
    transform: translateX(200px);
    opacity: 0;
  }
  
  .select-field{
    margin: 5px 0;
  }

  .alert-box .icon-err{
    color: white;
    font-size: 15px;
    font-weight: bolder;
    background-color: rgb(200, 0, 0);
    padding: 6px 9px 6px 10px;
    border-radius: 50%;
    margin-left: 5px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.40);;
  }

  .alert-box .icon-succ{
    color: white;
    font-size: 17px;
    font-weight: bolder;
    background-color: rgb(0, 150, 0);
    padding: 6px 9px 3px 10px;
    border-radius: 50%;
    margin-left: 5px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.40);;
  }

  .alert-box p{
    font-size: 13px;
    font-weight: bolder;
    margin: 0 5px;
    text-align: center;
  }

  .alert-show{
    transform: translateX(0px) !important;
    opacity: 1 !important;
  }

  /* .form-class .info-label{
    position: absolute;
    left: 5px;
    top: 0;
  } */


</style>