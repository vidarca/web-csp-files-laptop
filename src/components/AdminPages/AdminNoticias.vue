<template>
  <div id="admin-noticias" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de noticias
          </h5>
        </div>
        <button class="btn btn-success" @click="crearValor()">
          Agregar noticia
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-3 pl-1 pr-1">
          Sección de la noticia
        </div>
        <div class="text col-4 pl-1 pr-1">
          Título de noticia
        </div>
        <div class="text col-3 pl-1 pr-1">
          Fecha de creación
        </div>
        <div class="col-2 pl-1 pr-1">
        </div>
      </div>
      <div v-if="listEmpty">
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(noticia, index) in Object.values(dbWeb.Noticias).reverse()" :key="noticia.noti_id" :id="noticia.noti_id" :data-id="`elem${index}`" data-transitioned="false" v-show="index < numElements + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-3 pl-1 pr-1">
            {{noticia.noti_seccion}}
          </li>
          <li class="item-element text col-4 pl-1 pr-1">
            {{noticia.noti_titulo}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{getDate(index)}}
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
    
    <section class="translate" id="section1" v-show="showPrev" v-if="dbWeb.Noticias !== undefined && selectNoticia !== ''" ref="section1">
      <form class="form-class p-4 d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form">
            <div class="row align-items-start justify-content-center w-100">
                <div class="input-files col-md-5 col-12 d-flex flex-column justify-content-center align-items-center ml-3 mr-3" v-for="(imagen, index) in Object.values(selectNoticia.archivos)" :key="index">
                    <div class="w-100 h-100 d-flex align-items-center position-relative">
                        <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                            <div class="text d-flex align-items-center justify-content-center" style="text-align: center;">
                                {{(index === 0)?'El tamaño de la imagen debe ser 1260x460 px':'El tamaño de la imagen debe ser 360x260 px'}}
                                <div class="important-field" v-show="!validFields(selectNoticia.archivos[`imagen${index}`]) && index < 2"></div>
                            </div>
                            <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                                <i class="flaticon-folder mr-3"></i>
                                <label for="collectionFiles">{{`Imagen ${index + 1}`}}</label>
                            </div>
                            <input :ref='`file${index}`' @change="filesVerification($event, index, 'select')" class="collectionFiles"  type="file" accept="image/*">
                        </div>
                    </div>
                    <!-- PREV IMAGENES -->
                    <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="imagen.nombre !== undefined" style="display: flex;">
                        <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light']">
                            <!-- MUESTRA DE IMAGEN -->
                            <div class="w-100 p-2 d-flex justify-content-end flex-column" style="min-height: 173px">
                                <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined || selectNoticia.archivos[`imagen${index}`].url !== '')">
                                    <img :src="(dbImg[index] !== undefined && dbImg[index].url !== undefined)?dbImg[index].url:(selectNoticia.archivos[`imagen${index}`].url !== '')?selectNoticia.archivos[`imagen${index}`].url:''" width="200" height="auto" style="min-height: 100px; min-width: 200px; ">
                                </div>
                                <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                                    <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{imagen.nombre}}</p>
                                </div>
                                <!-- ICONO DE QUITAR -->
                                <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                                    <button @click.prevent="deleteFile(index, 'select')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                                </div>
                                <!-- FIN ICONO DE QUITAR -->
                            </div>
                            <!-- FIN MUESTRA DE IMAGEN -->
                            <!-- BARRA DE PROGRESO -->
                            <div class="progress w-85 mb-2" v-if="dbImg[index] !== undefined && dbImg[index] !== ''">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[index] !== undefined)?dbImg[index].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                                </div>
                            <!-- FIN BARRA DE PROGRESO -->
                            </div>
                        </div>
                        <!--  Fin de IMAGENES -->
                    </div>
                </div>
            </div>
            <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                <input type="checkbox" class="custom-control-input" id="noti_activo" v-model="selectNoticia.activo">
                <label class="custom-control-label text" for="noti_activo">Marque si desea que la noticia esté publicada</label>
            </div>
            <div class="select-field">
                <p>Seleccione una de las secciones para subir la información</p>
                <select class="custom-select" v-model="selectNoticia.seccion">
                <option selected>Seleccione una opción</option>
                <option value="Actualidad">Actualidad</option>
                <option v-for="comite in dbWeb.Comites" :value="comite.comi_nombre" :key="comite.comi_id" v-show="comite.comi_comiPage">{{comite.comi_nombre}}</option>
                </select>
            </div>
        <input type="text" placeholder="Título" v-model="selectNoticia.titulo">
        <textarea type="text" class="info-form-c" placeholder="Información corta" v-model="selectNoticia.infocort"></textarea>
        <textarea type="text" class="info-form" placeholder="Información" v-model="selectNoticia.info"></textarea>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('select')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Actualizar noticia
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('select')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section1')">Regresar</button>
        </div>
      </form>
    </section>

    <section id="section2" class="translate" v-if="showCreate" ref="section2">
      <form class="form-class p-4 d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form">
            <div class="row align-items-start justify-content-center w-100">
                <div class="input-files col-md-5 col-12 d-flex flex-column justify-content-center align-items-center ml-3 mr-3" v-for="(imagen, index) in Object.values(nuevaNoticia.archivos)" :key="index">
                    <div class="w-100 h-100 d-flex align-items-center position-relative">
                        <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                            <div class="text d-flex align-items-center justify-content-center" style="text-align: center;">
                                {{(index === 0)?'El tamaño de la imagen debe ser 1260x460 px':'El tamaño de la imagen debe ser 360x260 px'}}
                                <div class="important-field" v-show="!validFields(nuevaNoticia.archivos[`imagen${index}`]) && index < 2"></div>
                            </div>
                            <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                                <i class="flaticon-folder mr-3"></i>
                                <label for="collectionFiles">{{`Imagen ${index + 1}`}}</label>
                            </div>
                            <input :ref='`file${index}`' @change="filesVerification($event, index, 'crear')" class="collectionFiles"  type="file" accept="image/*">
                        </div>
                    </div>
                    <!-- PREV IMAGENES -->
                    <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="imagen.id !== undefined" style="display: flex;">
                        <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light']">
                            <!-- MUESTRA DE IMAGEN -->
                            <div class="w-100 p-2 d-flex justify-content-end flex-column" style="min-height: 173px">
                                <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined && dbImg[index].id !== undefined)">
                                    <img :src="(dbImg[index] === undefined)?'':(dbImg[index].url !== undefined)?dbImg[index].url:''" width="200" height="auto" style="min-height: 100px; min-width: 200px; ">
                                </div>
                                <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                                    <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{imagen.nombre}}</p>
                                </div>
                                <!-- ICONO DE QUITAR -->
                                <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                                    <button @click.prevent="deleteFile(index, 'crear')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                                </div>
                                <!-- FIN ICONO DE QUITAR -->
                            </div>
                            <!-- FIN MUESTRA DE IMAGEN -->
                            <!-- BARRA DE PROGRESO -->
                            <div class="progress w-85 mb-2" v-if="dbImg[index] !== undefined && dbImg[index].id !== undefined">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[index] !== undefined)?dbImg[index].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                                </div>
                            <!-- FIN BARRA DE PROGRESO -->
                            </div>
                        </div>
                        <!--  Fin de IMAGENES -->
                    </div>
                </div>
            </div>
            <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                <input type="checkbox" class="custom-control-input" id="noti_activo" v-model="nuevaNoticia.activo">
                <label class="custom-control-label text" for="noti_activo">Marque si desea que la noticia esté publicada</label>
            </div>
            <div class="select-field">
                <p>Seleccione una de las secciones para subir la información</p>
                <select class="custom-select" v-model="nuevaNoticia.seccion">
                <option selected>Seleccione una opción</option>
                <option value="Actualidad">Actualidad</option>
                <option v-for="comite in dbWeb.Comites" :value="comite.comi_nombre" :key="comite.comi_id" v-show="comite.comi_comiPage">{{comite.comi_nombre}}</option>
                </select>
            </div>
        <input type="text" placeholder="Título" v-model="nuevaNoticia.titulo">
        <textarea type="text" class="info-form-c" placeholder="Información corta" v-model="nuevaNoticia.infocort"></textarea>
        <textarea type="text" class="info-form" placeholder="Información" v-model="nuevaNoticia.info"></textarea>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('crear')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Crear noticia
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
    name: 'AdminNoticias',
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
        selectNoticia: '',
        nuevaNoticia: {
          activo: false,
          archivos:{
            imagen0:{},
            imagen1:{},
            imagen2:{},
          },
          fechaed: '',
          info: '',
          infocort: '',
          titulo: '',
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
        this.deleteCollection();
        this.$refs.section0.classList.toggle('translate');
        setTimeout(() => {
          this.showList = false;
          this.showPrev = true;
          this.selectNoticia = {
            activo: Object.values(this.dbWeb.Noticias).reverse()[index].noti_publicar,
            archivos:{
                imagen0: Object.values(this.dbWeb.Noticias).reverse()[index].noti_fotos.imagen0,
                imagen1: Object.values(this.dbWeb.Noticias).reverse()[index].noti_fotos.imagen1,
                imagen2: Object.values(this.dbWeb.Noticias).reverse()[index].noti_fotos.imagen2,
            },
            fechaed: Object.values(this.dbWeb.Noticias).reverse()[index].noti_fecha,
            info: Object.values(this.dbWeb.Noticias).reverse()[index].noti_info,
            id: Object.values(this.dbWeb.Noticias).reverse()[index].noti_id,
            infocort: Object.values(this.dbWeb.Noticias).reverse()[index].noti_prev,
            titulo: Object.values(this.dbWeb.Noticias).reverse()[index].noti_titulo,
            seccion: Object.values(this.dbWeb.Noticias).reverse()[index].noti_seccion,
          }
        }, 900);
        setTimeout(() => {
          this.$refs.section1.classList.toggle('translate')
        }, 950);
      },
      deleteFile(index, val){
        if(val === 'crear'){
          if(this.nuevaNoticia.archivos[`imagen${index}`] !== undefined && this.nuevaNoticia.archivos[`imagen${index}`] !== ''){
            this.nuevaNoticia.archivos[`imagen${index}`] = '';
          }
          delete this.files[`archivo${index}`];
          this.resetDBValues(index);
        }else if(val === 'select'){
          if(this.selectNoticia.archivos[`imagen${index}`] !== undefined && this.selectNoticia.archivos[`imagen${index}`] !== ''){
            this.selectNoticia.archivos[`imagen${index}`] = '';
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
          this.nuevaNoticia = {
            activo: false,
            archivos:{
                imagen0:{},
                imagen1:{},
                imagen2:{},
            },
            fechaed: '',
            info: '',
            infocort: '',
            titulo: '',
            seccion: 'Seleccione una opción',
          }
        }else if(value === 'select'){
          this.selectNoticia = {
            activo: false,
            archivos:{
                imagen0:{},
                imagen1:{},
                imagen2:{},
            },
            fechaed: '',
            info: '',
            infocort: '',
            titulo: '',
            seccion: 'Seleccione una opción',
          }
        }

        this.files = {};
        this.resetDBValues();
      },
      validFields(ref){
        if(ref.nombre !== '' && ref.nombre !== undefined){
            return true
        }else{
            return false
        }
      },
      validAllFields(value){
        let txt = '';
        if(value === 'crear'){
          txt = 'nueva';
        }else if(value === 'select'){
          txt = 'select'
        }

        for(let i = 0; i < 2; i++){
            if(!this.validFields(Object.values(this[`${txt}Noticia`].archivos)[i])){
                this.error = 'Los campos marcados con * son obligatorios'
                return false
            }
        }
        return true
      },
      submitCollection(value){
        if(this.validAllFields(value)){
          
          if(value === 'crear'){

            const d = new Date();
            const date = Date.parse(d)

            let dataTransfer = {
              archivos: this.files,
              name_archivos: 'imagen',
              noticia: { 
                activo: this.nuevaNoticia.activo,
                archivos:{
                },
                fechaed: date,
                info: this.nuevaNoticia.info,
                infocort: this.nuevaNoticia.infocort,
                titulo: this.nuevaNoticia.titulo,
                seccion: this.nuevaNoticia.seccion,
              },
              target: 'Noticias',
            };

            for(let i = 0; i < Object.values(this.nuevaNoticia.archivos).length; i++){
                Object.values(this.nuevaNoticia.archivos)[i].nombre = `imagen${i}`
                dataTransfer.noticia.archivos[`imagen${i}`] = Object.values(this.nuevaNoticia.archivos)[i];
            }
            
            this.crearDB(dataTransfer)

          }else if(value ==='select'){


            const d = new Date();
            const date = Date.parse(d)

            let dataTransfer = {
              archivos: this.files,
              name_archivos: 'imagen',
              noticia: { 
                activo: this.selectNoticia.activo,
                archivos:{
                },
                fechaed: this.selectNoticia.fechaed,
                id: this.selectNoticia.id,
                info: this.selectNoticia.info,
                infocort: this.selectNoticia.infocort,
                titulo: this.selectNoticia.titulo,
                seccion: this.selectNoticia.seccion,
              },
              target: 'Noticias',
            };

            for(let i = 0; i < Object.values(this.selectNoticia.archivos).length; i++){
                if(Object.values(this.selectNoticia.archivos)[i].id !== undefined){
                    Object.values(this.selectNoticia.archivos)[i].nombre = `imagen${i}`
                    dataTransfer.noticia.archivos[`imagen${i}`] = Object.values(this.selectNoticia.archivos)[i];
                }else{
                    dataTransfer.noticia.archivos[`imagen${i}`] = Object.values(this.selectNoticia.archivos)[i];
                }
            }
            
            console.log(dataTransfer);
            this.updateDB(dataTransfer)

          }
        }
      },
      filesVerification(event, index, val2){

        let files = event.target.files[0];

        this.files[`archivo${index}`] = event.target.files[0];

        this.files[`archivo${index}`].id = index

        if(val2 === 'crear'){
          this.nuevaNoticia.archivos[`imagen${index}`] = {}
          this.nuevaNoticia.archivos[`imagen${index}`] = {
            nombre: files.name,
            url: '',
            id: index,
            uploadPercentage: 0,
            progressBar: {
              show: true,
            },
          }
        }else if(val2 === 'select'){
          this.selectNoticia.archivos[`imagen${index}`] = {
            nombre: files.name,
            url: '',
            id: index,
            nombreref: `imagen${index}`,
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
            ref: 'Noticias',
            idSt: Object.values(this.dbWeb.Noticias).reverse()[index].noti_id,
            idDb: Object.values(this.dbWeb.Noticias).reverse()[index].noti_id,
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
        if(this.dbWeb.Noticias !== undefined){
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
        const d = new Date(Object.values(this.dbWeb.Noticias).reverse()[index].noti_fecha);
        const dsplitted = d.toString().split(' ');
        const djoin = dsplitted[1] + ' ' + dsplitted[2] + ' ' + dsplitted[3];
        return djoin
      },
    },

    created(){
      this.changeSecTitle('Noticias');
    },

    mounted(){

      this.getData().then(()=>{
        this.listDisplay();
        this.show = true;
      })

      this.deleteCollection('crear');

      if(this.dbWeb.Noticias !== undefined && Object.values(this.dbWeb.Noticias).length/this.numElements > 1){
        this.number = Math.ceil(Object.values(this.dbWeb.Noticias).length/this.numElements);
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
        if(this.deletingVal !== null && this.dbWeb.Noticias !== undefined && Object.values(this.dbWeb.Noticias).length - 1 === 0){
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
              if(this.dbWeb.Noticias !== undefined){
                if(Object.values(this.dbWeb.Noticias).length/this.numElements > 1){
                  this.number = Math.ceil(Object.values(this.dbWeb.Noticias).length/this.numElements);
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