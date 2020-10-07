<template>
  <div id="admin-banners" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de banners de la página
          </h5>
        </div>
        <button class="btn btn-success" @click="crearValor()">
          Agregar banner
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-3 pl-1 pr-1">
          Página del banner
        </div>
        <div class="text col-3 pl-1 pr-1">
          Cantidad de slides
        </div>
        <div class="text col-3 pl-1 pr-1">
          Última edición
        </div>
        <div class="col-3 pl-1 pr-1">
        </div>
      </div>
      <div v-if="listEmpty">
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(banner, index) in Object.values(dbWeb.Banners).reverse()" :key="banner.bann_id" :id="banner.bann_id" :data-id="`elem${index}`" data-transitioned="false" v-show="index < numElements + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-3 pl-1 pr-1">
            {{banner.bann_seccion}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{(banner.bann_slides === undefined)?'0':Object.values(banner.bann_slides).length}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{getDate(index)}}
          </li>
          <li class="item-element text col-3 d-flex flex-sm-row flex-column justify-content-end align-items-center pl-sm-1 pr-sm-1">
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
    
    <section class="translate" id="section1" v-show="showPrev" v-if="dbWeb.Banners !== undefined && selectBanner !== ''" ref="section1">
      <form class="form-class d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form">
          <div class="list-db w-95" style = "box-shadow: none !important;">
            <div class="list-header w-100 d-flex flex-row align-items-center justify-content-end">
              <span @click="addField('select', 'slides', true)" class="icon p-0 add flaticon-add ml-2 mr-2"></span>
              <div class="ml-2 mr-2" style="width: 21.5px">
                <span @click="deleteField('select', 'slides', true)" class="icon p-0 delete flaticon-minus" v-show="this.cantFields.slides.numero > 0"></span>
              </div>
            </div>
            <div class="list-header w-100 row align-items-center justify-content-start">
              <div class="text col-5 pl-1 pr-1 overflow-hidden">
                Texto del banner
              </div>
              <div class="text col-2 pl-1 pr-1 overflow-hidden">
                Slides
              </div>
              <div class="col-5 pl-1 pr-1">
                Imagen
                <i ref="info" @mouseenter="toggleInfo()" @mouseleave="toggleInfo()" class="icon info position-relative ml-1 flaticon-question">
                  <div class="info text position-absolute" style="top: auto; bottom: -400% !important; left: -271px; overflow: visible">
                    El tamaño de las imágenes debe ser de 1500x900 px
                  </div>
                </i>
              </div>
            </div>
            <div v-if="cantFields.slides.numero > 0">
              <ul class="list-item w-100 row align-items-center justify-content-start" v-for="index in cantFields.slides.numero" :key="index" :id="index" :data-id="`elem${index}`" data-transitioned="false" style="height: 110px; overflow:hidden;">
                <li class="item-element text col-5 pl-1 pr-1 h-100">
                  <textarea type="text" class="info-form-c w-75 h-100 m-0" placeholder="Información" v-model="selectBanner.info[`info${index}`]"></textarea>
                </li>
                <li class="item-element text col-2 pl-1 pr-1">
                  {{`Slide${index}`}}
                </li>
                <li class="item-element text col-5 pl-1 pr-1 h-100">
                  <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-1">
                    <div class="input-files d-flex w-100 h-100 flex-column align-items-center justify-content-center position-relative" v-if="selectBanner.archivos[`slides${index}`].nombre === undefined || selectBanner.archivos[`slides${index}`].nombre === ''">
                      <input :ref='`file0`' @change="filesVerification($event, index, 'select')" class="collectionFiles" title="Elija un archivo"  type="file" accept="image/*">
                      <div class="button-files d-flex flex-row align-items-center justify-content-center w-100 h-100 p-2">
                        <i class="icon flaticon-add m-0 p-0"></i>
                      </div>
                    </div>
                    <!-- PREV IMAGENES -->
                    <div  class="uploadCont flex-row align-items-center justify-content-center w-100 h-100" v-else style="display: flex;">
                      <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light h-100']">
                        <!-- MUESTRA DE IMAGEN -->
                        <div class="w-100 d-flex position-relative justify-content-end flex-column h-100">
                          <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined || selectBanner.archivos[`slides${index}`].url !== '')">
                            <img :src="(dbImg[index] !== undefined && dbImg[index].url !== undefined)?dbImg[index].url:(selectBanner.archivos[`slides${index}`].url !== '')?selectBanner.archivos[`slides${index}`].url:''" width="100%" height="79.5" style="height: 79.5px; width: 100%; ">
                          </div>
                          <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                            <p class="align-self-star" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectBanner.archivos[`slides${index}`].nombre}}</p>
                          </div>
                          <!-- ICONO DE QUITAR -->
                          <div @click.prevent="deleteFile(index, 'select')" class="remove position-absolute flaticon-close" style="top:2px; right:3px;"></div>
                            <!-- FIN ICONO DE QUITAR -->
                        </div>
                          <!-- FIN MUESTRA DE IMAGEN -->
                          <!-- BARRA DE PROGRESO -->
                        <div class="progress w-85 mb-2" v-if="dbImg[index] !== undefined">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[index] !== undefined)?dbImg[index].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                        </div>
                          <!-- FIN BARRA DE PROGRESO -->
                      </div>
                    </div>
                  </div>
                  <!--  Fin de IMAGENES -->
                </li>
              </ul>
            </div>
            <div class="text col-12" v-else>
              No hay elementos creados aún
            </div>
          </div>
          <!-- Inicio de la imagen -->
          <div class="d-flex flex-column align-items-center justify-content-center p-1">
              <div class="w-85 d-flex align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="bann_activo" v-model="selectBanner.activo">
                  <label class="custom-control-label text" for="bann_activo">Marque si desea mostrar el banner en la página correspondiente</label>
                </div>
              </div>
              <hr>
              <div class="mb-1 d-flex justify-content-center align-items-center">
                <p>
                  El sitio de los banners ya creado no puede ser modificado
                </p>
                <div class="important-field" v-show="!validSelection('Seleccione una opción', selectBanner.seccion)"></div>
              </div>

              <select class="w-85 custom-select mt-1" @change="validSelection('Seleccione una opción', selectBanner.seccion)" v-model="selectBanner.seccion" disabled>
                <option selected>Seleccione una opción</option>
                <option value="Inicio">Página de Inicio</option>
                <option v-for="(comite) in Object.values(dbWeb.Comites)" :key="comite.comi_id" :value="comite.comi_nombre">{{comite.comi_nombre}}</option>
              </select>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('select')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Actualizar banner
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('select')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section1')">Regresar</button>
        </div>
      </form>
    </section>

    <section id="section2" class="translate" v-if="showCreate" ref="section2">
      <form class="form-class d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form">
          <div class="list-db w-95" style = "box-shadow: none !important;">
            <div class="list-header w-100 d-flex flex-row align-items-center justify-content-end">
              <span @click="addField('crear', 'slides', true)" class="icon p-0 add flaticon-add ml-2 mr-2"></span>
              <div class="ml-2 mr-2" style="width: 21.5px">
                <span @click="deleteField('crear', 'slides', true)" class="icon p-0 delete flaticon-minus" v-show="this.cantFields.slides.numero > 0"></span>
              </div>
            </div>
            <div class="list-header w-100 row align-items-center justify-content-start">
              <div class="text col-5 pl-1 pr-1 overflow-hidden">
                Texto del banner
              </div>
              <div class="text col-2 pl-1 pr-1 overflow-hidden">
                Slides
              </div>
              <div class="col-5 pl-1 pr-1">
                Imagen
                <i ref="info" @mouseenter="toggleInfo()" @mouseleave="toggleInfo()" class="icon info position-relative ml-1 flaticon-question">
                  <div class="info text position-absolute" style="top: auto; bottom: -400% !important; left: -271px; overflow: visible">
                    El tamaño de las imágenes debe ser de 1500x900 px
                  </div>
                </i>
              </div>
            </div>
            <div v-if="cantFields.slides.numero > 0">
              <ul class="list-item w-100 row align-items-center justify-content-start" v-for="index in cantFields.slides.numero" :key="index" :id="index" :data-id="`elem${index}`" data-transitioned="false" style="height: 110px; overflow:hidden;">
                <li class="item-element text col-5 pl-1 pr-1 h-100">
                  <textarea type="text" class="info-form-c w-75 h-100 m-0" placeholder="Información" v-model="nuevoBanner.info[`info${index}`]"></textarea>
                </li>
                <li class="item-element text col-2 pl-1 pr-1">
                  {{`Slide${index}`}}
                </li>
                <li class="item-element text col-5 pl-1 pr-1 h-100">
                  <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-1">
                    <div class="input-files d-flex w-100 h-100 flex-column align-items-center justify-content-center position-relative" v-if="nuevoBanner.archivos[`slides${index}`].nombre === undefined || nuevoBanner.archivos[`slides${index}`].nombre === ''">
                      <input :ref='`file0`' @change="filesVerification($event, index, 'crear')" class="collectionFiles" title="Elija un archivo"  type="file" accept="image/*">
                      <div class="button-files d-flex flex-row align-items-center justify-content-center w-100 h-100 p-2">
                        <i class="icon flaticon-add m-0 p-0"></i>
                      </div>
                    </div>
                    <!-- PREV IMAGENES -->
                    <div  class="uploadCont flex-row align-items-center justify-content-center w-100 h-100" v-else style="display: flex;">
                      <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light h-100']">
                        <!-- MUESTRA DE IMAGEN -->
                        <div class="w-100 d-flex position-relative justify-content-end flex-column h-100">
                          <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined)">
                            <img :src="(dbImg[index] === undefined)?'':(dbImg[index].url !== undefined)?dbImg[index].url:''" width="100%" height="79.5" style="height: 79.5px; width: 100%; ">
                          </div>
                          <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                            <p class="align-self-star" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevoBanner.archivos[`slides${index}`].nombre}}</p>
                          </div>
                          <!-- ICONO DE QUITAR -->
                          <div @click.prevent="deleteFile(index, 'crear')" class="remove position-absolute flaticon-close" style="top:2px; right:3px;"></div>
                            <!-- FIN ICONO DE QUITAR -->
                        </div>
                          <!-- FIN MUESTRA DE IMAGEN -->
                          <!-- BARRA DE PROGRESO -->
                        <div class="progress w-85 mb-2" v-if="dbImg[index] !== undefined">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[index] !== undefined)?dbImg[index].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                        </div>
                          <!-- FIN BARRA DE PROGRESO -->
                      </div>
                    </div>
                  </div>
                  <!--  Fin de IMAGENES -->
                </li>
              </ul>
            </div>
            <div class="text col-12" v-else>
              No hay elementos creados aún
            </div>
          </div>
          <!-- Inicio de la imagen -->
          <div class="d-flex flex-column align-items-center justify-content-center p-1">
              <div class="w-85 d-flex align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="bann_activo" v-model="nuevoBanner.activo">
                  <label class="custom-control-label text" for="bann_activo">Marque si desea mostrar el banner en la página correspondiente</label>
                </div>
              </div>
              <hr>
              <div class="mb-1 d-flex justify-content-center align-items-center">
                <p>
                  Seleccione el sitio donde quiere que se muestre el banner
                </p>
                <div class="important-field" v-show="showCreate && !validSelection('Seleccione una opción',nuevoBanner.seccion)"></div>
              </div>

              <select class="w-85 custom-select mt-1" v-model="nuevoBanner.seccion">
                <option selected>Seleccione una opción</option>
                <option value="Inicio">Página de Inicio</option>
                <option v-for="(comite) in Object.values(dbWeb.Comites)" :key="comite.comi_id" :value="comite.comi_nombre">{{comite.comi_nombre}}</option>
              </select>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('crear')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Crear banner
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
    name: 'AdminBanners',
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
          }
        },
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
        selectBanner: '',
        nuevoBanner: {
          activo: false,
          info: {},
          archivos:{},
          fechaed: '',
          seccion: 'Seleccione una opción',
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
          if(Object.values(this.dbWeb.Banners).reverse()[index].bann_slides !== undefined){
            this.cantFields.slides.numero = Object.values(Object.values(this.dbWeb.Banners).reverse()[index].bann_slides).length;
          }
          this.selectBanner = Object.assign({}, this.selectBanner, {
            activo: Object.values(this.dbWeb.Banners).reverse()[index].bann_activo,
            fechaed: Object.values(this.dbWeb.Banners).reverse()[index].bann_fechaedicion,
            seccion: Object.values(this.dbWeb.Banners).reverse()[index].bann_seccion,
            id: Object.values(this.dbWeb.Banners).reverse()[index].bann_id,
            archivos:{},
            info:{},
          })
          if(Object.values(this.dbWeb.Banners).reverse()[index].bann_slides !== undefined){
            for(let i = 0; i < Object.values(Object.values(this.dbWeb.Banners).reverse()[index].bann_slides).length; i++){
              this.$set(this.selectBanner.info, `info${i+1}`, Object.values(Object.values(this.dbWeb.Banners).reverse()[index].bann_slides)[i].info); 
              this.$set(this.selectBanner.archivos, `slides${i+1}`, Object.values(this.dbWeb.Banners).reverse()[index].bann_slides[`slides${i+1}`]); 
            }
          }
        }, 900);
        setTimeout(() => {
          this.$refs.section1.classList.toggle('translate')
        }, 950);
      },
      deleteFile(index, val){
        if(val === 'crear'){
          if(this.nuevoBanner.archivos[`slides${index}`] !== undefined && this.nuevoBanner.archivos[`slides${index}`] !== ''){
            this.nuevoBanner.archivos[`slides${index}`] = '';
          }
          delete this.files[`archivo${index}`];
          this.resetDBValues(index);
        }else if(val === 'select'){
          if(this.selectBanner.archivos[`slides${index}`] !== undefined && this.selectBanner.archivos[`slides${index}`] !== ''){
            this.selectBanner.archivos[`slides${index}`] = '';
          }
          delete this.files[`archivo${index}`];
          this.resetDBValues(index);
        }
      },
      deleteCollection(value){
        for(let i = 0; i < Object.values(this.cantFields).length; i++){
          Object.values(this.cantFields)[i].numero = 0;
        }
        if(value === 'crear'){
          this.nuevoBanner = {
            activo: false,
            info: {},
            archivos:{
            },
            fechaed: '',
            seccion: 'Seleccione una opción',
          }
        }else if(value === 'select'){
          this.selectBanner = {
            activo: false,
            info: {},
            archivos:{
            },
            fechaed: '',
            seccion: 'Seleccione una opción',
          }
        }

        this.files = {};
        this.resetDBValues();
      },
      validSelection(selection, val){
        if(val !== selection){
          return true
        }else{
          return false
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
            
            this.updateDB(dataTransfer)

          }
        }
      },
      filesVerification(event, index, val2){

        let files = event.target.files[0];

        this.files[`archivo${index}`] = event.target.files[0];

        this.files[`archivo${index}`].id = index

        if(val2 === 'crear'){
          this.nuevoBanner.archivos[`slides${index}`] = {
            nombre: files.name,
            url: '',
            id: index,
            nombreref: `slides${index}`,
            uploadPercentage: 0,
            progressBar: {
              show: true,
            },
          }
        }else if(val2 === 'select'){
          this.selectBanner.archivos[`slides${index}`] = {
            nombre: files.name,
            url: '',
            id: index,
            nombreref: `slides${index}`,
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
        if(val === 'crear'){
          if(this.cantFields[`${val2}`].numero > 0){
            for(let i = 0; i < Object.values(this.nuevoBanner.archivos).length; i++){
              if(Object.values(this.nuevoBanner.archivos)[i] === undefined || Object.values(this.nuevoBanner.archivos)[i] === ''){
                return this.error = 'Primero debe seleccionar la imagen de la casilla vacía'
              }
            }
            this.$set(this.nuevoBanner.archivos, `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, '');
            this.$set(this.nuevoBanner.info, `info${this.cantFields[`${val2}`].numero + 1}`, '');
            this.cantFields[`${val2}`].numero++;
          }else{
            this.$set(this.nuevoBanner.archivos, `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, '');
            this.$set(this.nuevoBanner.info, `info${this.cantFields[`${val2}`].numero + 1}`, '');
            this.cantFields[`${val2}`].numero++;
          }
        }else{
          if(this.cantFields[`${val2}`].numero > 0){
            for(let i = 0; i < Object.values(this.selectBanner.archivos).length; i++){
              if(Object.values(this.selectBanner.archivos)[i] === undefined || Object.values(this.selectBanner.archivos)[i] === ''){
                return this.error = 'Primero debe seleccionar la imagen de la casilla vacía'
              }
            }
            this.$set(this.selectBanner.archivos, `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, '');
            this.$set(this.selectBanner.info, `info${this.cantFields[`${val2}`].numero + 1}`, '');
            this.cantFields[`${val2}`].numero++;
          }else{
            this.$set(this.selectBanner.archivos, `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, '');
            this.$set(this.selectBanner.info, `info${this.cantFields[`${val2}`].numero + 1}`, '');
            this.cantFields[`${val2}`].numero++;
          }
        }
      },
      deleteField(val, val2, val3){
        if(val === 'crear'){
          this.nuevoBanner.archivos[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`] = '';
          delete this.nuevoBanner.archivos[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`];
          delete this.nuevoBanner.info[`info${this.cantFields[`${val2}`].numero}`];
          if(val3 === true){
            this.deleteFile((this.cantFields[`${val2}`].numero), val)
          }
          this.cantFields[`${val2}`].numero --;
        }else{
          this.selectBanner.archivos[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`] = '';
          delete this.selectBanner.archivos[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`];
          delete this.selectBanner.info[`info${this.cantFields[`${val2}`].numero}`];
          if(val3 === true){
            this.deleteFile((this.cantFields[`${val2}`].numero), val)
          }
          this.cantFields[`${val2}`].numero --;
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
            this.showPrev = false;
          }
        }, 900);
        setTimeout(() => {
          this.$refs.section0.classList.toggle('translate')
        }, 950);
      },
      listDisplay(value){
        if(this.dbWeb.Banners !== undefined){
          this.listEmpty = true
        }else if(value === false){
          this.listEmpty = false
        }else{
          this.listEmpty = false
        }
      },
      openFile(url){
        if(url !== '' && url !== undefined){
          window.open(url,'_blank');
        }else{
          this.error = 'Primero debe "Crear" o "Actualizar" el perfil'
        }
      },
      toggleInfo(){
        this.$refs.info.children[0].classList.toggle('show-info')
      },
      getDate(index){
        const d = new Date(Object.values(this.dbWeb.Banners).reverse()[index].bann_fechaedicion);
        const dsplitted = d.toString().split(' ');
        const djoin = dsplitted[1] + ' ' + dsplitted[2] + ' ' + dsplitted[3];
        return djoin
      },
    },

    created(){
      this.changeSecTitle('Banners');
    },

    mounted(){

      this.getData().then(()=>{
        this.listDisplay();
        this.show = true;
      })

      this.deleteCollection('crear');

      if(this.dbWeb.Banners !== undefined && Object.values(this.dbWeb.Banners).length/this.numElements > 1){
        this.number = Math.ceil(Object.values(this.dbWeb.Banners).length/this.numElements);
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
        if(this.deletingVal !== null && this.dbWeb.Banners !== undefined && Object.values(this.dbWeb.Banners).length - 1 === 0){
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
              if(this.dbWeb.Banners !== undefined){
                if(Object.values(this.dbWeb.Banners).length/this.numElements > 1){
                  this.number = Math.ceil(Object.values(this.dbWeb.Banners).length/this.numElements);
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
    border: 1px solid rgb(20, 20, 20, 0.3);
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