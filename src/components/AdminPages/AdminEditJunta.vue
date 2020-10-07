<template>
  <div id="admin-editar" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de Juntas
          </h5>
        </div>
        <button class="btn btn-success" @click="crearValor()">
          Crear Junta
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-10 pl-1 pr-1">
          Período de la junta
        </div>
        <div class="col-2 pl-1 pr-1">
        </div>
      </div>
      <div v-if="listEmpty">
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(junta, index) in Object.values(dbWeb.Juntas).reverse()" :key="junta.id" :id="junta.id" :data-id="`elem${index}`" data-transitioned="false" v-show="index < numElements + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-10 pl-1 pr-1">
            {{junta.junt_periodo.split('_').join(' - ')}}
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
    
    <section ref='section1' id="section1" class="translate p-3" v-if="dbWeb.Juntas !== undefined && selectJunta !== ''" v-show="showPrev">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <div class="d-flex w-100 flex-row align-items-center justify-content-center position-relative m-2">
            <h6 class="pr-2">Período de la Junta: Desde </h6>
            <input class= "col-1 position-relative" ref="inputYear0" type="text" v-model="selectJunta.inicio" placeholder="Año">
            <h6 class="pr-2 pl-2"> hasta </h6>
            <input class="col-1 position-relative" ref="inputYear1" type="text" v-model="selectJunta.fin" placeholder="Año">
          </div>
          <div class="custom-control custom-switch">
            <input type="checkbox" @change="disableYearCrear('selectJunta')" class="custom-control-input" id="junta_activa" v-model="selectJunta.junta_actual">
            <label class="custom-control-label text" for="junta_activa">Marque si es la junta actual</label>
          </div>
          <div class="row align-items-start justify-content-between w-100 m-2">
            <h5>Integrantes de la Junta</h5>
            <div class="row align-items-start justify-content-between">
              
              <div class="col-4 col-lg-3 mt-2" v-for="(integrante, index) in Object.values(Object.values(dbWeb.Juntas).reverse()[indexSelected].junt_integrantes)" :key="integrante.juin_id">
                <div class="text text-center">{{integrante.juin_cargo}}</div>
                <div class="d-flex flex-column align-items-center justify-content-center">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" :id="`crear${index}`" v-model="integrante.juin_crear">
                    <label class="custom-control-label text" :for="`crear${index}`"></label>
                  </div>
                  <div class="input-files w-100 flex-column align-items-start p-1" v-show="integrante.juin_crear === true" style="display: flex;">
                    <div class="w-100 h-100 d-flex align-items-center position-relative">
                      <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                          <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                            <i class="flaticon-folder mr-3"></i>
                            <label for="collectionFiles">Imagen</label>
                          </div>
                          <input :ref='`file${index}`' @change="filesVerification($event, index, 'select')" class="collectionFiles"  type="file" accept="image/*">
                      </div>
                    </div>
                  </div>
                  <!-- PREV IMAGENES -->
                  <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="integrante.juin_foto !== '' && integrante.juin_crear" style="display: flex;">
                    <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                      <!-- MUESTRA DE IMAGEN -->
                      <div class="w-100 h-100 m-2">
                        <div class="d-flex justify-content-center align-items-center" v-if="(integrante.juin_foto.url !== '' || dbImg[index] !== undefined)">
                          <img :src="(dbImg[index] !== undefined && dbImg[index].url !== undefined)?dbImg[index].url:(integrante.juin_foto.url !== undefined)?integrante.juin_foto.url:''" width="100" height="100" style="min-height: 100px; min-width: 100px; ">
                        </div>
                        <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                          <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{integrante.juin_foto.nombre}}</p>
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
                <input type="text" v-model="integrante.juin_nombre" placeholder="Nombre" v-show="integrante.juin_crear === true">
                <input type="text" v-model="integrante.juin_apellido" placeholder="Apellido" v-show="integrante.juin_crear === true">
                <input type="email" v-model="integrante.juin_correo" placeholder="Correo" v-show="integrante.juin_crear === true">
                <div class="custom-control custom-switch" v-show="integrante.juin_crear === true">
                  <input type="checkbox" class="custom-control-input" :id="`activo${index}`" v-model="integrante.juin_activo">
                  <label class="custom-control-label text" :for="`activo${index}`">Activo</label>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center m-3">
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('select')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Actualizar junta
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('select')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section1', 'selectJunta')">Regresar</button>
        </div>
      </form>
    </section>

    <section class="translate p-3" id="section2" v-show="showCreate" ref="section2">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <div class="d-flex w-100 flex-row align-items-center justify-content-center position-relative m-2">
            <h6 class="pr-2">Período de la Junta: Desde </h6>
            <input class="col-1 position-relative" ref="inputYear0" type="text" v-model="nuevaJunta.inicio" placeholder="Año">
            <h6 class="pr-2 pl-2"> hasta </h6>
            <input class="col-1 position-relative" ref="inputYear1" type="text" v-model="nuevaJunta.fin" placeholder="Año">
          </div>
          <div class="custom-control custom-switch">
            <input type="checkbox" @change="disableYearCrear('nuevaJunta')" class="custom-control-input" id="junta_activa" v-model="nuevaJunta.junta_actual">
            <label class="custom-control-label text" for="junta_activa">Marque si es la junta actual</label>
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
                  <div class="input-files w-100 flex-column align-items-start p-1" v-show="integrante.crear === true" style="display: flex;">
                    <div class="w-100 h-100 d-flex align-items-center position-relative">
                      <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                          <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                            <i class="flaticon-folder mr-3"></i>
                            <label for="collectionFiles">Imagen</label>
                          </div>
                          <input :ref='`file${index}`' @change="filesVerification($event, index, 'crear')" class="collectionFiles"  type="file" accept="image/*">
                      </div>
                    </div>
                  </div>
                  <!-- PREV IMAGENES -->
                  <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="integrante.image.nombre !== undefined" style="display: flex;">
                    <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                      <!-- MUESTRA DE IMAGEN -->
                      <div class="w-100 h-100 m-2">
                        <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined)">
                          <img :src="(dbImg[index] === undefined)?'':(dbImg[index].url !== undefined)?dbImg[index].url:''" width="100" height="100" style="min-height: 100px; min-width: 100px; ">
                        </div>
                        <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                          <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{integrante.image.nombre}}</p>
                        </div>
                        <!-- ICONO DE QUITAR -->
                        <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                          <button @click.prevent="deleteFile(index, 'crear')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
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
          <button class="btn btn-success mr-2 ml-2" @click.prevent="submitCollection('crear')">
            <div v-if="crearDBVals" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              Crear junta
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
    name: 'AdminEditContent',
    data(){
      return {
        show: false,
        error: null,
        showIndex: 0,
        showSelect: false,
        showList: true,
        showCreate: false,
        listEmpty: false,
        indexSelected: '',
        number: 0,
        files: {
        },
        changeDB: false,
        changePics: false,
        showPrev: false,
        numElements: 10,
        selectJunta: '',
        nuevaJunta: {
          inicio: '',
          fin: '',
          junta_actual: false,
          integrantes:{
            presi: {
              crear: false,
              cargo: 'Presidente',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            v_presi: {
              crear: false,
              cargo: 'Vice Presidente',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            teso: {
              crear: false,
              cargo: 'Tesorero',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            secre: {
              crear: false,
              cargo: 'Secretario',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            direc_prin: {
              crear: false,
              cargo: 'Director Principal',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            direc_1: {
              crear: false,
              cargo: 'Director 1',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            direc_2: {
              crear: false,
              cargo: 'Director 2',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            direc_3: {
              crear: false,
              cargo: 'Director 3',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            direc_4: {
              crear: false,
              cargo: 'Director 4',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            comi: {
              crear: false,
              cargo: 'Comisario',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
            comi_sup: {
              crear: false,
              cargo: 'Comisario Suplente',
              nombre: '',
              apellido: '',
              correo: '',
              image:'',
              activo: false,
              },
          }
        },
      }
    },

    computed:{
      ...mapState(['editContent', 'successUpload', 'dbWeb', 'deletingVal', 'deletingIndex', 'cargarDB', 'dbImg', 'crearDBVals']),
    },
    
    methods:{
      ...mapMutations(['resetDBValues', 'successAdvise', 'deletedEl', 'changeSecTitle', 'crearDB', 'falseCargarDB', 'deleteItem', 'updateDB']),
      ...mapActions(['getData']),
      itemSelected(index){
        this.resetDBValues();
        this.$refs.section0.classList.toggle('translate');
        setTimeout(() => {
          this.indexSelected = index;

          this.showList = false;
          this.showPrev = true;
          const splittedPer = Object.values(this.dbWeb.Juntas).reverse()[index].junt_periodo.split('-');

          this.selectJunta = {
            fin: splittedPer[1],
            inicio: splittedPer[0],
            junta_actual: Object.values(this.dbWeb.Juntas).reverse()[index].junt_activa,
            id: Object.values(this.dbWeb.Juntas).reverse()[index].junt_id,
            integrantes: [],
          };
        }, 900);
        setTimeout(() => {
          if(this.selectJunta.junta_actual === true){
            this.disableYearCrear('selectJunta');
          }
          this.$refs.section1.classList.toggle('translate')
        }, 950);
      },
      deleteFile(index,val){
        if(val === 'crear'){
          Object.values(this.nuevaJunta.integrantes)[index].image = '';
          delete this.files[index];
          this.resetDBValues(index);
        }else if(val === 'select'){
          Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[index].juin_foto = '';
          delete this.files[index];
          this.resetDBValues(index);
        }
      },
      deleteCollection(value){
        if(value === 'crear'){
          this.nuevaJunta.inicio = '';
          this.nuevaJunta.fin = '';
          this.nuevaJunta.junta_actual = false;
          for(let i = 0; i < Object.values(this.nuevaJunta.integrantes).length; i++){
            Object.values(this.nuevaJunta.integrantes)[i].crear = false;
            Object.values(this.nuevaJunta.integrantes)[i].image = '';
            Object.values(this.nuevaJunta.integrantes)[i].activo = false;
            Object.values(this.nuevaJunta.integrantes)[i].nombre = '';
            Object.values(this.nuevaJunta.integrantes)[i].apellido = '';
            Object.values(this.nuevaJunta.integrantes)[i].correo = '';
          }
        }else if(value === 'select'){
          this.selectJunta.inicio = '';
          this.selectJunta.fin = '';
          this.selectJunta.junta_actual = false;
          for(let i = 0; i <  Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes).length; i++){
             Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_crear = false;
             Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_foto = '';
             Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_activo = false;
             Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_nombre = '';
             Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_apellido = '';
             Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_correo = '';
          }
        }
        this.files = {};
        this.resetDBValues();
      },
      disableYearCrear(value){
        const d = new Date();
        const dsplit = d.toString().split(' ');
        if(this[`${value}`].junta_actual === true){
          this[`${value}`].fin = dsplit[3];
          this.$refs.inputYear1.disabled = true;
          this.$refs.inputYear1.classList.remove('error');
        }else{
          this[`${value}`].fin = '';
          this.$refs.inputYear1.disabled = false;
        }
      },
      submitCollection(value){

        if(value === 'crear'){
          let dataTransfer = {
          archivos: [],
          junta: {
            inicio: '',
            fin: '',
            integrantes: {},
          },
        };

        dataTransfer.archivos = this.files;
        dataTransfer.junta.inicio = this.nuevaJunta.inicio;
        dataTransfer.junta.fin = this.nuevaJunta.fin;
        dataTransfer.junta.junta_actual = this.nuevaJunta.junta_actual;
        dataTransfer.target = 'Juntas';

        for(let i = 0; i < Object.values(this.nuevaJunta.integrantes).length; i++){
          dataTransfer.junta.integrantes[i] = {},
          dataTransfer.junta.integrantes[i].cargo = Object.values(this.nuevaJunta.integrantes)[i].cargo
          dataTransfer.junta.integrantes[i].nombre = Object.values(this.nuevaJunta.integrantes)[i].nombre
          dataTransfer.junta.integrantes[i].apellido = Object.values(this.nuevaJunta.integrantes)[i].apellido
          dataTransfer.junta.integrantes[i].correo = Object.values(this.nuevaJunta.integrantes)[i].correo
          dataTransfer.junta.integrantes[i].image = Object.values(this.nuevaJunta.integrantes)[i].image
          dataTransfer.junta.integrantes[i].activo = Object.values(this.nuevaJunta.integrantes)[i].activo
          dataTransfer.junta.integrantes[i].crear = Object.values(this.nuevaJunta.integrantes)[i].crear
        }

        this.crearDB(dataTransfer)

        }else if(value === 'select'){
          let dataTransfer = {
          archivos: [],
          junta: {
            inicio: '',
            fin: '',
            integrantes: {},
          },
        };

        dataTransfer.archivos = this.files;
        dataTransfer.junta.inicio = this.selectJunta.inicio;
        dataTransfer.junta.fin = this.selectJunta.fin;
        dataTransfer.junta.id = this.selectJunta.id;
        dataTransfer.junta.junta_actual = this.selectJunta.junta_actual;
        dataTransfer.target = 'Juntas';

        for(let i = 0; i < Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes).length; i++){
          dataTransfer.junta.integrantes[i] = {},
          dataTransfer.junta.integrantes[i].cargo = Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_cargo
          dataTransfer.junta.integrantes[i].nombre = Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_nombre
          dataTransfer.junta.integrantes[i].apellido = Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_apellido
          dataTransfer.junta.integrantes[i].correo = Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_correo
          dataTransfer.junta.integrantes[i].image = Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_foto
          dataTransfer.junta.integrantes[i].activo = Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_activo
          dataTransfer.junta.integrantes[i].crear = Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[i].juin_crear
        }

        this.updateDB(dataTransfer)
        }
        
      },
      filesVerification(event, val, val2){
        
        
        let files = event.target.files[0];

        this.files[val] = event.target.files[0];

        if(val2 === 'crear'){
          Object.values(this.nuevaJunta.integrantes)[val].image = [];
          this.files[val].id = val
          Object.values(this.nuevaJunta.integrantes)[val].image = {
            nombre: files.name,
            url: '',
            uploadPercentage: 0,
            progressBar: {
              show: true,
            },
          }
        }else if(val2 === 'select'){
           Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[val].juin_foto = [];
          this.files[val].id = val
           Object.values(Object.values(this.dbWeb.Juntas).reverse()[this.indexSelected].junt_integrantes)[val].juin_foto = {
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
            ref: 'Juntas',
            idSt: Object.values(this.dbWeb.Juntas).reverse()[index].junt_id,
            idDb: Object.values(this.dbWeb.Juntas).reverse()[index].junt_id,
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
            this.showPrev = false;
          }
        }, 900);
        setTimeout(() => {
          this.$refs.section0.classList.toggle('translate')
        }, 950);
      },
      listDisplay(value){
        if(this.dbWeb.Juntas !== undefined){
          this.listEmpty = true
        }else if(value === false){
          this.listEmpty = false
        }else{
          this.listEmpty = false
        }
      },
    },

    created(){
      this.changeSecTitle('Juntas Directivas');
    },

    mounted(){
      
      this.getData().then(()=>{
        this.listDisplay()
        this.show = true;
      })

      this.deleteCollection('crear');

      if(this.dbWeb.Juntas !== undefined && Object.values(this.dbWeb.Juntas).length/this.numElements > 1){
        this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/this.numElements);
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
        if(this.deletingVal !== null && this.dbWeb.Juntas !== undefined && Object.values(this.dbWeb.Juntas).length - 1 === 0){
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

              this.listDisplay()

              if(this.dbWeb.Servicios !== undefined){
                try{
                if(Object.values(this.dbWeb.Juntas).length/this.numElements > 1){
                  this.number = Math.ceil(Object.values(this.dbWeb.Juntas).length/this.numElements);
                  this.showSelect = true;
                }}catch{}
              }
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