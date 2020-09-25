<template>
  <div id="admin-editar" class="position-relative" v-if="show">
    <!-- Modal -->
    <div class="modal fade" id="createUser" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Crear Usuario</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex flex-column align-items-start justify-content-start">
            <input class="w-75" type="email" :class="!validEmail?'error':' '" placeholder="Correo" v-model="nuevaJunta.correo">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click.prevent="sendForm()">
              <div v-if="nuevaJunta.userRefer" class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div v-else>
                Crear Usuario
              </div>
          </button>
          </div>
        </div>
      </div>
    </div>
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-if="reverseArray[0] !== undefined" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de Noticias
          </h5>
        </div>
        <button class="btn btn-success" @click="crearJunta()">
          Crear Usuario
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-3 pl-1 pr-1">
          Sección
        </div>
        <div class="text col-5 pl-1 pr-1">
          Título de Noticia
        </div>
        <div class="text col-2 pl-1 pr-1 text-center">
          Fecha de Creación
        </div>
        <div class="col-2 pl-1 pr-1">
        </div>
      </div>
      <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(anuncio, index) in reverseArray" :key="anuncio.noti_id" :id="anuncio.noti_seccion" :data-id="`anun${index}`" data-transitioned="false" v-show="index < 4 + showIndex && index >= showIndex" ref="listElements">
        <li class="item-element text col-3 pl-1 pr-1">
          {{anuncio.noti_seccion}}
        </li>
        <li class="item-element text col-5 pl-1 pr-1">
          {{anuncio.noti_titulo}}
        </li>
        <li class="item-element text col-2 pl-1 pr-1 text-center">
          {{fechaAnuncio[index]}}
        </li>
        <li class="item-element text col-2 d-flex flex-sm-row flex-column justify-content-end align-items-center pl-sm-1 pr-sm-1">
          <i class="icon edit flaticon-edit mt-1 mb-1" title="Editar" :data-id="`anun${index}`" @click="anunSelected($event, index)"></i>
          <div class="icon delete mt-1 mb-1" title="Eliminar" :data-index="index" @click="deleteElement(index)" v-show="showPrev === false" :ref='`spinner${index}`'>
            <div class="spinner-border text-light" v-if="deletingVal === true && index === deletingIndex" role="status" style="width: 14px; height: 14px; margin-bottom: 2px">
              <span class="sr-only">Loading...</span>
            </div>
            <i class="flaticon-close" v-else></i>
          </div>
          <i class="icon btn-dark flaticon-back-arrow mt-1 mb-1" title="Editar" v-show="showPrev === true" @click="filterChangeHandler()"></i>
        </li>
      </ul>
      <div style="min-height: 46px; height: 46px;">
        <div class="bot-selectors h-100 d-flex flex-row align-items-center justify-content-center position-relative align-self-end" v-if="showSelect === true">
          <div class="position-relative" style="width: 25px; height: 25px;">
            <i class="icon left-arrow flaticon-arrowhead-pointing-to-the-right" style="transform: rotate(180deg);" @click="translateLeft()"></i>
          </div>
          <div class="bot-container">
            <div class="inner-container d-flex flex-row justify-content-center align-items-center" ref="innerContainer">
              <div v-for="index in number" :key="index">
                <div :class="['circle', (index === 1)?'active':'']" :ref="`bot${index}`" :id="index">
                  <div class="text" @click="changeIndex(index)">{{index}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="position-relative" style="width: 25px; height: 25px;">
            <i class="icon right-arrow flaticon-arrowhead-pointing-to-the-right" @click="translateRight()"></i>
          </div>
        </div>
      </div>
    </section>
    
    

    <section class="translate" v-show="showCreate" ref="section2">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <div class="d-flex w-100 flex-row align-items-center justify-content-center m-2">
            <h6 class="pr-2">Período de la Junta: Desde </h6>
            <input class="col-1 " type="text" v-model="nuevaJunta.inicio" placeholder="Año">
            <h6 class="pr-2 pl-2"> hasta </h6>
            <input class="col-1 " type="text" v-model="nuevaJunta.fin" placeholder="Año">
          </div>
          <div class="row align-items-start justify-content-between w-100 m-2">
            <h5>Integrantes de la Junta</h5>
            <div class="row align-items-start justify-content-between">
              <div class="col-4 col-lg-3 mt-2" v-for="(integrante, index) in Object.values(nuevaJunta.integrantes)" :key="index">
                <div class="text text-center">{{integrante.cargo}}</div>
                <div class="d-flex flex-column align-items-center justify-content-center">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" :id="`crear${index}`" v-model="integrante.crear">
                    <label class="custom-control-label text" :for="`crear${index}`"></label>
                  </div>
                  <div class="input-files w-100 d-flex flex-column align-items-start p-1" v-show="integrante.crear === true">
                    <div class="w-100 h-100 d-flex align-items-center position-relative">
                      <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                          <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                            <i class="flaticon-folder mr-3"></i>
                            <label for="collectionFiles">Imagen</label>
                          </div>
                          <input :ref='`file${index}`' @change="filesVerification($event, index)" class="collectionFiles"  type="file" accept="image/*">
                        </div>
                    </div>
                </div>
                <input type="text" v-model="integrante.nombre" placeholder="Nombre" v-show="integrante.crear === true">
                <input type="text" v-model="integrante.apellido" placeholder="Apellido" v-show="integrante.crear === true">
                <input type="email" v-model="integrante.correo" placeholder="Correo" v-show="integrante.crear === true">
                <div class="custom-control custom-switch" v-show="integrante.crear === true">
                  <input type="checkbox" class="custom-control-input" :id="`activo${index}`" v-model="integrante.activo">
                  <label class="custom-control-label text" :for="`activo${index}`">Activo</label>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection()">Crear junta</button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection()">Borrar campos</button>
        </div>
      </form>
    </section>
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
        showIndex: 0,
        showSelect: false,
        showList: true,
        showCreate: false,
        number: 0,
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
        numElements: 10,
        juntas: [],
        nuevaJunta: {
          integrantes:{
            presi: {
              crear: false,
              cargo: 'Presidente',
              },
            v_presi: {
              crear: false,
              cargo: 'Vice Presidente',
              },
            teso: {
              crear: false,
              cargo: 'Tesorero',
              },
            secre: {
              crear: false,
              cargo: 'Secretario',
              },
            direc_prin: {
              crear: false,
              cargo: 'Director Principal',
              },
            direc_1: {
              crear: false,
              cargo: 'Director',
              },
            direc_2: {
              crear: false,
              cargo: 'Director',
              },
            direc_3: {
              crear: false,
              cargo: 'Director',
              },
            direc_4: {
              crear: false,
              cargo: 'Director',
              },
            comi: {
              crear: false,
              cargo: 'Comisario',
              },
            comi_sup: {
              crear: false,
              cargo: 'Comisario Suplente',
              },
          }
        },
      }
    },

    computed:{
      ...mapState(['editContent', 'successUpload', 'dbWeb', 'deletingVal', 'deletingIndex']),
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
      validEmail(){
        const exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(exp.test(this.nuevaJunta.correo)){
          return true
        }else{
          return false
        }
      },
    },
    
    methods:{
      ...mapMutations(['filesUpload', 'resetContentValues', 'deleteFileState', 'successAdvise', 'deletedEl', 'changeSecTitle']),
      ...mapActions(['getData']),
      anunSelected(value, index){
        let count = 0;
        let j = 0;

        for(let i = 0; i < this.$refs.listElements.length; i++) {
          setTimeout(() => {
            this.$refs.listElements[i].classList.add('slide-list');
          }, 50*i);
          if(this.$refs.listElements[i].dataset.id !== value.target.dataset.id){
            setTimeout(() => {
              this.$refs.listElements[i].classList.add('hide-list');
            }, 900 + 1*i);
          }
          if(i === this.$refs.listElements.length-1){
            setTimeout(() => {
              this.$refs.listElements[index].classList.remove('slide-list');
              this.$refs.listElements[index].classList.remove('hide-list');
            }, 900 + 1*i + 100);
          }
          j ++;
          if(j === this.$refs.listElements.length){
            setTimeout(() => {
              for(let k = 0; k < this.reverseArray[index].noti_imagenes.length; k++){
                  this.imagesData[k] = this.reverseArray[index].noti_imagenes[k];
                  this.dbVal = this.reverseArray[index];
                  this.seccion = this.reverseArray[index].noti_seccion;
                  this.info = this.reverseArray[index].noti_info;
                  this.titulo = this.reverseArray[index].noti_titulo;
                  this.prev = this.reverseArray[index].noti_prev;
              }
              this.showPrev = true
            }, 900 + 1*j + 300);
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
          this.dataTransfer[0].prev = this.prev;
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
      translateRight(){
        if(this.currentIndex <= 5*((this.$refs.innerContainer.children.length/5)-1)){
          this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) - 45}px)`
          this.currentIndex ++;
        }
      },
      translateLeft(){
        if(this.currentIndex > 1){
          this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) + 45}px)`
          this.currentIndex --;
        }
      },
      changeIndex(val){
        this.$refs.listElements.forEach(element => {
          element.dataset.transitioned = 'true';
          element.classList.toggle('translate');
        })
        setTimeout(() => {
          this.showIndex = this.numElements*(val-1);
        }, 700);
        setTimeout(() => {
          this.$refs.listElements.forEach(element => {
            element.dataset.transitioned = 'false';
            element.classList.toggle('translate');
          })
        }, 900);
        this.$refs.innerContainer.children.forEach(element => {
          if(parseInt(element.children[0].id) !== val){
            element.children[0].classList.remove('active');
          }else if(parseInt(element.children[0].id) === val){
            element.children[0].classList.add('active');
          }
        })
      },
      crearJunta(){
        this.$refs.section0.classList.toggle('translate');
        setTimeout(() => {
          this.showList = false;
          this.showCreate = true;
          this.$refs.section2.classList.toggle('translate')
        }, 900);
      },
    },

    created(){
      this.changeSecTitle('Juntas Directivas');
    },

    mounted(){
      
      this.getData().then(()=>{
        this.show = true;
        this.juntas = this.dbWeb.Integrantes_junta;
      })

      this.resetContentValues(1);

      if(this.reverseArray.length/this.numElements > 1){
        this.number = Math.ceil(this.reverseArray.length/this.numElements);
        this.showSelect = true;
      }
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
          this.$refs.listElements[`${this.deletingIndex}`].classList.add('slide-list');
          setTimeout(() => {
            let m = {
              0: 1,
              1: '',
            }
            try{
              this.$refs.listElements[`${this.deletingIndex}`].classList.add('deleted');
            }catch{}
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

  .form-class input[type="text"], .form-class textarea, .form-class input[type="email"]{
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

  .list-db{
    margin: 10px 5px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 5px;
    box-shadow: 0 0 7px rgba(0,0,0,.5);
  }

  .list-db .list-header{
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(215, 215, 215);
  }
  
  .list-db .list-header .text{
    font-size: 14px;
    overflow: hidden;
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


</style>