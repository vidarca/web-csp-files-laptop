<template>
  <div id="admin-services" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de Servicios
          </h5>
        </div>
        <button class="btn btn-success" @click="crearValor()">
          Crear Servicio
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-10 pl-1 pr-1">
          Nombre del servicio
        </div>
        <div class="col-2 pl-1 pr-1">
        </div>
      </div>
      <div v-if="listEmpty">
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(servicio, index) in Object.values(dbWeb.Servicios).reverse()" :key="servicio.serv_id" :id="servicio.serv_id" :data-id="`elem${index}`" data-transitioned="false" v-show="index < numElements + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-10 pl-1 pr-1">
            {{servicio.serv_nombre}}
          </li>
          <li class="item-element text col-2 d-flex flex-sm-row flex-column justify-content-end align-items-center pl-sm-1 pr-sm-1">
            <i class="icon edit flaticon-edit mt-1 mb-1" title="Editar" :data-id="`elem${index}`" @click="itemSelected(index)"></i>
            <div class="icon delete mt-1 mb-1" title="Eliminar" :data-index="index" @click="deleteElement(index)" v-show="showPrev === false" :ref='`spinner${index}`'>
              <div class="spinner-border text-light" v-if="deletingVal === true && index === deletingIndex" role="status" style="width: 14px; height: 14px; margin-bottom: 2px">
                <span class="sr-only">Loading...</span>
              </div>
              <i class="flaticon-close" v-else></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="text col-12" v-else>
        No hay elementos creados aún
      </div>
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
    
    <section class="translate p-3" id="section1" v-show="showPrev" v-if="dbWeb.Servicios !== undefined && selectServicio !== ''" ref="section1">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <!-- Inicio de la imagen -->
          <div class="text text-center">
            El tamaño de la imagen debe ser 360x260 px
          </div>
          <div class="input-files w-100 flex-column align-items-start p-1" style="display: flex;">
            <div class="w-100 h-100 d-flex align-items-center position-relative">
              <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                  <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                    <i class="flaticon-folder mr-3"></i>
                    <label for="collectionFiles">Imagen</label>
                  </div>
                  <input :ref='`file0`' @change="filesVerification($event, 0, 'select')" class="collectionFiles"  type="file" accept="image/*">
              </div>
            </div>
          </div>
          <!-- PREV IMAGENES -->
          <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="selectServicio.imagen.nombre !== undefined" style="display: flex;">
            <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
              <!-- MUESTRA DE IMAGEN -->
              <div class="w-100 h-100 m-2">
                <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[0] !== undefined || selectServicio.imagen.url !== '')">
                  <img :src="(dbImg[0] !== undefined && dbImg[0].url !== undefined)?dbImg[0].url:(selectServicio.imagen.url !== undefined)?selectServicio.imagen.url:''" width="360" height="260" style="min-height: 360px; min-width: 260px; ">
                </div>
                <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                  <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectServicio.imagen.nombre}}</p>
                </div>
                <!-- ICONO DE QUITAR -->
                <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                  <button @click.prevent="deleteFile(0, 'select')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                </div>
                  <!-- FIN ICONO DE QUITAR -->
                </div>
                <!-- FIN MUESTRA DE IMAGEN -->
                <!-- BARRA DE PROGRESO -->
                <div class="progress w-85 mb-2" v-if="dbImg[0] !== undefined && dbImg[0] !== ''">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[0] !== undefined)?dbImg[0].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                </div>
                <!-- FIN BARRA DE PROGRESO -->
              </div>
            </div>
          <!--  Fin de IMAGENES -->
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="activo" v-model="selectServicio.activo">
            <label class="custom-control-label text" for="activo">Marque si es el servicio se encuentra actualmente en funcionamiento</label>
          </div>
          <input class="w-50 position-relative" ref="nombre" type="text" v-model="selectServicio.nombre" placeholder="Nombre">
          <textarea type="text" class="info-form-c" placeholder="Descripción" v-model="selectServicio.descripcion"></textarea>
          <div class="row align-items-center justify-content-between">
            <div class="col-9 text d-flex flex-row align-items-center justify-content-center">
              Horario de trabajo: Desde 
              <input class="ml-2 mr-2 position-relative" ref="nombre" type="time" v-model="selectServicio.inicio" placeholder="Apertura">
               hasta 
              <input class="ml-2 mr-2 position-relative" ref="nombre" type="time" v-model="selectServicio.fin" placeholder="Cierre">
            </div>
            <input :class="['col-3 position-relative', validPhone(selectServicio.contacto)?'':'error']" ref="nombre" type="text" v-model="selectServicio.contacto" placeholder="Telefono">
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('select')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Actualizar servicio
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('select')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section1')">Regresar</button>
        </div>
      </form>
    </section>

    <section class="translate p-3" id="section2" v-show="showCreate" ref="section2">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <!-- Inicio de la imagen -->
          <div class="text text-center">
            El tamaño de la imagen debe ser 360x260 px
          </div>
          <div class="input-files w-100 flex-column align-items-start p-1" style="display: flex;">
            <div class="w-100 h-100 d-flex align-items-center position-relative">
              <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                  <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                    <i class="flaticon-folder mr-3"></i>
                    <label for="collectionFiles">Imagen</label>
                  </div>
                  <input :ref='`file0`' @change="filesVerification($event, 0, 'crear')" class="collectionFiles"  type="file" accept="image/*">
              </div>
            </div>
          </div>
          <!-- PREV IMAGENES -->
          <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="nuevoServicio.imagen.nombre !== undefined" style="display: flex;">
            <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
              <!-- MUESTRA DE IMAGEN -->
              <div class="w-100 h-100 m-2">
                <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[0] !== undefined)">
                  <img :src="(dbImg[0] === undefined)?'':(dbImg[0].url !== undefined)?dbImg[0].url:''" width="360" height="260" style="min-height: 360px; min-width: 260px; ">
                </div>
                <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                  <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevoServicio.imagen.nombre}}</p>
                </div>
                <!-- ICONO DE QUITAR -->
                <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                  <button @click.prevent="deleteFile(0, 'crear')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                </div>
                  <!-- FIN ICONO DE QUITAR -->
                </div>
                <!-- FIN MUESTRA DE IMAGEN -->
                <!-- BARRA DE PROGRESO -->
                <div class="progress w-85 mb-2" v-if="dbImg[0] !== undefined && dbImg[0] !== ''">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[0] !== undefined)?dbImg[0].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                </div>
                <!-- FIN BARRA DE PROGRESO -->
              </div>
            </div>
          <!--  Fin de IMAGENES -->
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="activo" v-model="nuevoServicio.activo">
            <label class="custom-control-label text" for="activo">Marque si es el servicio se encuentra actualmente en funcionamiento</label>
          </div>
          <input class="w-50 position-relative" ref="nombre" type="text" v-model="nuevoServicio.nombre" placeholder="Nombre">
          <textarea type="text" class="info-form-c" placeholder="Descripción" v-model="nuevoServicio.descripcion"></textarea>
          <div class="row align-items-center justify-content-between">
            <div class="col-9 text d-flex flex-row align-items-center justify-content-center">
              Horario de trabajo: Desde 
              <input class="ml-2 mr-2 position-relative" ref="nombre" type="time" v-model="nuevoServicio.inicio" placeholder="Apertura">
               hasta 
              <input class="ml-2 mr-2 position-relative" ref="nombre" type="time" v-model="nuevoServicio.fin" placeholder="Cierre">
            </div>
            <input :class="['col-3 position-relative', validPhone(nuevoServicio.contacto)?'':'error']" ref="nombre" type="text" v-model="nuevoServicio.contacto" placeholder="Telefono">
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('crear')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Crear servicio
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('crear')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section2')">Regresar</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    name: 'AdminServices',
    data(){
      return {
        show: false,
        error: null,
        showIndex: 0,
        showSelect: false,
        showList: true,
        listEmpty: true,
        showCreate: false,
        number: 0,
        files: {
        },
        changeDB: false,
        changePics: false,
        showPrev: false,
        numElements: 10,
        selectServicio: '',
        nuevoServicio: {
          inicio: '',
          fin: '',
          activo: false,
          imagen: '',
          contacto: '',
          descripcion: '',
          id: '',
          nombre: '',
        },
      }
    },

    computed:{
      ...mapState(['editContent', 'successUpload', 'dbWeb', 'deletingVal', 'deletingIndex', 'cargarDB', 'crearDBVals', 'dbImg']),
    },
    
    methods:{
      ...mapMutations(['resetDBValues', 'successAdvise', 'deletedEl', 'changeSecTitle', 'crearDB', 'falseCargarDB', 'deleteItem', 'updateDB']),
      ...mapActions(['getData']),
      itemSelected(index){
        this.resetDBValues();
        this.$refs.section0.classList.toggle('translate');
        setTimeout(() => {
          this.showList = false;
          this.showPrev = true;

          this.selectServicio = {
            inicio: Object.values(this.dbWeb.Servicios).reverse()[index].serv_inicio,
            fin: Object.values(this.dbWeb.Servicios).reverse()[index].serv_cierre,
            activo: Object.values(this.dbWeb.Servicios).reverse()[index].serv_activo,
            imagen: Object.values(this.dbWeb.Servicios).reverse()[index].serv_foto,
            contacto: Object.values(this.dbWeb.Servicios).reverse()[index].serv_contacto,
            descripcion: Object.values(this.dbWeb.Servicios).reverse()[index].serv_descripcion,
            id: Object.values(this.dbWeb.Servicios).reverse()[index].serv_id,
            nombre: Object.values(this.dbWeb.Servicios).reverse()[index].serv_nombre,
          };

        }, 900);
        setTimeout(() => {
          this.$refs.section1.classList.toggle('translate')
        }, 950);
      },
      deleteFile(index, val){
        if(val === 'crear'){
          this.nuevoServicio.imagen = '';
          this.files = {};
          this.resetDBValues(index);
        }else if(val === 'select'){
          this.selectServicio.imagen = '';
          this.files = {};
          this.resetDBValues(index);
        }
      },
      deleteCollection(value){
        if(value === 'crear'){
          this.nuevoServicio.inicio = '';
          this.nuevoServicio.imagen = '';
          this.nuevoServicio.activo = false;
          this.nuevoServicio.nombre = '';
          this.nuevoServicio.fin = '';
          this.nuevoServicio.correo = '';
          this.nuevoServicio.descripcion = '';
          this.nuevoServicio.contacto = '';
        }else if(value === 'select'){
          this.selectServicio.inicio = '';
          this.selectServicio.imagen = '';
          this.selectServicio.activo = false;
          this.selectServicio.nombre = '';
          this.selectServicio.fin = '';
          this.selectServicio.correo = '';
          this.selectServicio.descripcion = '';
          this.selectServicio.contacto = '';
        }

        this.files = {};
        this.resetDBValues();
      },
      validDateFields(value){
        const split = value.split('')
        const exp = /\d/g;
        if(exp.test(value) && split.length === 4){
          return true
        }else{
          return false
        }
      },
      validPhone(target){
        const exp = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/g;
        if(exp.test(target) || target === ''){
          return true
        }else{
          return false
        }
      },
      submitCollection(value){
        
        if(value === 'crear'){
          let dataTransfer = {
            archivos: this.files,
            servicio: {
              inicio: this.nuevoServicio.inicio,
              fin: this.nuevoServicio.fin,
              activo: this.nuevoServicio.activo,
              image: this.nuevoServicio.imagen,
              contacto: this.nuevoServicio.contacto,
              descripcion: this.nuevoServicio.descripcion,
              nombre: this.nuevoServicio.nombre,
            },
            target: 'Servicios',
          };
  
          this.crearDB(dataTransfer)
        }else if(value ==='select'){
          let dataTransfer = {
            archivos: this.files,
            servicio: {
              inicio: this.selectServicio.inicio,
              fin: this.selectServicio.fin,
              activo: this.selectServicio.activo,
              image: this.selectServicio.imagen,
              contacto: this.selectServicio.contacto,
              descripcion: this.selectServicio.descripcion,
              id: this.selectServicio.id,
              nombre: this.selectServicio.nombre,
            },
            target: 'Servicios',
          };

          this.updateDB(dataTransfer)
        }
      },
      filesVerification(event, val, val2){
        
        this.nuevoServicio.imagen = [];

        let files = event.target.files[0];

        this.files[val] = event.target.files[0];

        this.files[val].id = val
        if(val2 === 'crear'){
          this.nuevoServicio.imagen = {
            nombre: files.name,
            url: '',
            uploadPercentage: 0,
            progressBar: {
              show: true,
            },
          }
        }else if(val2 === 'select'){
          this.selectServicio.imagen = {
            nombre: files.name,
            url: '',
            uploadPercentage: 0,
            progressBar: {
              show: true,
            },
          }
        }

        event.target.value = ''
      },
      deleteElement(index){
        let dataTransfer = [];
        if(this.deletingVal === null && this.successUpload === null){
          dataTransfer = {
            ref: 'Servicios',
            idSt: Object.values(this.dbWeb.Servicios).reverse()[index].serv_id,
            idDb: Object.values(this.dbWeb.Servicios).reverse()[index].serv_id,
            index: index,
            storage: true,
          };

          this.deleteItem(dataTransfer)
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
      crearValor(){
        this.deleteCollection('crear')
        this.$refs.section0.classList.toggle('translate');
        setTimeout(() => {
          this.showList = false;
          this.showCreate = true;
        }, 900);
        setTimeout(() => {
          this.$refs.section2.classList.toggle('translate')
        }, 950);
      },
      regresar(value1, value2){
        this.$refs[`${value1}`].classList.toggle('translate');
        setTimeout(() => {
          this[`${value2}`] = '';
          this.showList = true;
          if(value1 === 'section2'){
            this.showCreate = false;
          }else if(value1 === 'section1'){
            this.showPrev === false;
          }
        }, 900);
        setTimeout(() => {
          this.$refs.section0.classList.toggle('translate')
        }, 950);
      },
      listDisplay(value){
        if(this.dbWeb.Servicios !== undefined){
          this.listEmpty = true
        }else if(value === false){
          this.listEmpty = false
        }else{
          this.listEmpty = false
        }
      },
    },

    created(){
      this.changeSecTitle('Servicios');
    },

    mounted(){

      this.getData().then(()=>{
        this.listDisplay();
        this.show = true;
      })

      this.deleteCollection('crear');

      if(this.dbWeb.Servicios !== undefined && Object.values(this.dbWeb.Servicios).length/this.numElements > 1){
        this.number = Math.ceil(Object.values(this.dbWeb.Servicios).length/this.numElements);
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
        if(this.deletingVal !== null && this.dbWeb.Servicios !== undefined && Object.values(this.dbWeb.Servicios).length - 1 === 0){
          this.listEmpty = false;
          let n = {
            0: 0,
            1: null,
          }
          this.deletedEl(n)
        }else{
          let n = {
            0: 0,
            1: null,
          }
          this.deletedEl(n)
        }
        setTimeout(() => {
          if(this.successUpload !== null){
            this.getData().then(()=>{
              this.listDisplay();
              try{
              if(this.dbWeb.Servicios !== undefined){
                if(Object.values(this.dbWeb.Servicios).length/this.numElements > 1){
                  this.number = Math.ceil(Object.values(this.dbWeb.Servicios).length/this.numElements);
                  this.showSelect = true;
                }
              }}catch{}
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

  section#section2, section#section1{
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

  .form-class input[type="text"], .form-class textarea, .form-class input[type="email"]{
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