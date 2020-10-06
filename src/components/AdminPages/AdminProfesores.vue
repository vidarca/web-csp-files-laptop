<template>
  <div id="admin-profesores" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de profesores
          </h5>
        </div>
        <button class="btn btn-success" @click="crearValor()">
          Agregar profesor
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-3 pl-1 pr-1">
          Nombre del profesor
        </div>
        <div class="text col-3 pl-1 pr-1">
          Correo
        </div>
        <div class="text col-3 pl-1 pr-1">
          Telefonos
        </div>
        <div class="col-3 pl-1 pr-1">
        </div>
      </div>
      <div v-if="listEmpty">
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(profesor, index) in Object.values(dbWeb.Profesores).reverse()" :key="profesor.gr_id" :id="profesor.gr_id" :data-id="`elem${index}`" data-transitioned="false" v-show="index < numElements + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-3 pl-1 pr-1">
            {{profesor.prof_nombre}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{profesor.prof_correo}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            <div v-for="(telefono, index) in profesor.prof_telefonos" :key="index">
              {{telefono}}
            </div>
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
    
    <section class="translate" v-show="showPrev" v-if="dbWeb.Profesores !== undefined && selectProfesor !== ''" ref="section1">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <!-- Inicio de la imagen -->
          <div class="row align-items-center justify-content-center">
            <div class="col-5 mr-1 ml-1">
              <div class="text text-center">
                El tamaño de la imagen debe ser 220x260 px
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
              <div  class="uploadCont flex-row align-items-center w-100 mt-3" v-show="selectProfesor.imagen.nombre !== undefined" style="display: flex;">
                <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                  <!-- MUESTRA DE IMAGEN -->
                  <div class="w-100 h-100 m-2">
                    <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[0] !== undefined || selectProfesor.imagen.url !== '')">
                      <img :src="(dbImg[0] !== undefined && dbImg[0].url !== undefined)?dbImg[0].url:(selectProfesor.imagen.url !== '')?selectProfesor.imagen.url:''" width="220" height="260" style="min-height: 220px; min-width: 260px; ">
                    </div>
                    <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                      <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectProfesor.imagen.nombre}}</p>
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
              <div class="input-files w-100 flex-column align-items-start p-1 pt-3" style="display: flex;">
                <div class="w-100 h-100 d-flex align-items-center position-relative">
                  <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                      <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                        <i class="flaticon-folder mr-3"></i>
                        <label for="collectionFiles">Currículum</label>
                      </div>
                      <input :ref='`file1`' @change="filesVerification($event, 1, 'select')" class="collectionFiles"  type="file" accept=".pdf, .doc, .docx">
                  </div>
                </div>
              </div>
              <!-- PREV IMAGENES -->
              <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="selectProfesor.cv.nombre !== undefined" style="display: flex;">
                <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                  <!-- MUESTRA DE IMAGEN -->
                  <div class="w-100 h-100 m-2">
                    <div class="image w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                      <i class="icon flaticon-file" @click="openFile(selectProfesor.cv.url)"></i>
                      <p class="col-12 align-self-star ml-2 text-center" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: 260px">{{selectProfesor.cv.nombre}}</p>
                    </div>
                    <!-- ICONO DE QUITAR -->
                    <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                      <button @click.prevent="deleteFile(1, 'select')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                    </div>
                      <!-- FIN ICONO DE QUITAR -->
                    </div>
                    <!-- FIN MUESTRA DE IMAGEN -->
                    <!-- BARRA DE PROGRESO -->
                    <div class="progress w-85 mb-2" v-if="dbImg[1] !== undefined && dbImg[1] !== ''">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[1] !== undefined)?dbImg[1].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                    </div>
                    <!-- FIN BARRA DE PROGRESO -->
                  </div>
                </div>
              <!--  Fin de IMAGENES -->
            </div>
            <div class="col-5 mr-1 ml-1">
              <div class="w-100 d-flex align-items-center justify-content-center">
                <input class="w-100 position-relative" ref="nombre" type="text" v-model="selectProfesor.nombre" placeholder="Nombre">
              </div>
              <input class="w-100 position-relative" ref="ci" type="text" v-model="selectProfesor.ci" placeholder="Cédula de identidad">
              <div class="w-100 d-flex align-items-center justify-content-center">
                <input :class="['position-relative', validEmail(selectProfesor.correo)?'':'error']" ref="coreo" type="text" v-model="selectProfesor.correo" placeholder="Correo">
                <div class="important-field" v-show="showCreate && !validEmail(selectProfesor.correo)"></div>
              </div>
              <input class="w-100 position-relative" ref="nacimiento" type="date" v-model="selectProfesor.nacimiento" placeholder="Fecha de nacimiento">
              <div class="select-field">
              <p>Seleccione la opción del comité al que pertenece el profesor</p>
              <select class="custom-select" v-model="selectProfesor.coid">
                <option selected>Seleccione una opción</option>
                <option v-for="(comite) in Object.values(dbWeb.Comites)" :key="comite.comi_id" :value="comite.comi_nombre">{{comite.comi_nombre}}</option>
              </select>
              <div class="phones-input row justify-content-between align-items-center" v-for="index in cantTelf" :key="index" style="margin-top: 5px">
                <div class="col-9 p-0 d-flex flex-row align-items-center justify-content-center">
                  <input :class="['position-relative', validPhone(selectProfesor.telefonos[`telefono${index-1}`], (index-1))?'':'error']" ref="phone" type="text" v-model="selectProfesor.telefonos[`telefono${index-1}`]" placeholder="Telefono">
                  <div class="important-field" v-show="showCreate && !validPhone(selectProfesor.telefonos[`telefono${index-1}`], (index-1))"></div>
                </div>
                <span @click="addPhone('select', index-1)" :class="['icon p-0 add flaticon-add', (index-1 > 0)?'col-1':'col-3 pl-2']" v-if="index-1 === cantTelf-1"></span>
                <span @click="deletePhone('select', index-1)" class="icon col-1 p-0 delete flaticon-minus" v-if="index-1 > 0 && index-1 === cantTelf-1"></span>
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
              Actualizar profesor
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('select')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section1')">Regresar</button>
        </div>
      </form>
    </section>

    <section class="translate" v-show="showCreate" ref="section2">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          <!-- Inicio de la imagen -->
          <div class="row align-items-center justify-content-center">
            <div class="col-5 mr-1 ml-1">
              <div class="text text-center">
                El tamaño de la imagen debe ser 220x260 px
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
              <div  class="uploadCont flex-row align-items-center w-100 mt-3" v-show="nuevoProfesor.imagen.nombre !== undefined" style="display: flex;">
                <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                  <!-- MUESTRA DE IMAGEN -->
                  <div class="w-100 h-100 m-2">
                    <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[0] !== undefined)">
                      <img :src="(dbImg[0] === undefined)?'':(dbImg[0].url !== undefined)?dbImg[0].url:''" width="220" height="260" style="min-height: 220px; min-width: 260px; ">
                    </div>
                    <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                      <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevoProfesor.imagen.nombre}}</p>
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
              <div class="input-files w-100 flex-column align-items-start p-1 pt-3" style="display: flex;">
                <div class="w-100 h-100 d-flex align-items-center position-relative">
                  <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                      <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                        <i class="flaticon-folder mr-3"></i>
                        <label for="collectionFiles">Currículum</label>
                      </div>
                      <input :ref='`file1`' @change="filesVerification($event, 1, 'crear')" class="collectionFiles"  type="file" accept=".pdf, .doc, .docx">
                  </div>
                </div>
              </div>
              <!-- PREV IMAGENES -->
              <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="nuevoProfesor.cv.nombre !== undefined" style="display: flex;">
                <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                  <!-- MUESTRA DE IMAGEN -->
                  <div class="w-100 h-100 m-2">
                    <div class="image w-100 h-100 d-flex flex-column align-items-center justify-content-center" >
                      <i class="icon flaticon-file" @click="openFile(nuevoProfesor.cv.url)"></i>
                      <p class="col-12 align-self-star ml-2 text-center" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevoProfesor.cv.nombre}}</p>
                    </div>
                    <!-- ICONO DE QUITAR -->
                    <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                      <button @click.prevent="deleteFile(1, 'crear')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                    </div>
                      <!-- FIN ICONO DE QUITAR -->
                    </div>
                    <!-- FIN MUESTRA DE IMAGEN -->
                    <!-- BARRA DE PROGRESO -->
                    <div class="progress w-85 mb-2" v-if="dbImg[1] !== undefined && dbImg[1] !== ''">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[1] !== undefined)?dbImg[1].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                    </div>
                    <!-- FIN BARRA DE PROGRESO -->
                  </div>
                </div>
              <!--  Fin de IMAGENES -->
            </div>
            <div class="col-5 mr-1 ml-1">
              <div class="w-100 d-flex align-items-center justify-content-center">
                <input class="w-100 position-relative" ref="nombre" type="text" v-model="nuevoProfesor.nombre" placeholder="Nombre">
              </div>
              <input class="w-100 position-relative" ref="ci" type="text" v-model="nuevoProfesor.ci" placeholder="Cédula de identidad">
              <div class="w-100 d-flex align-items-center justify-content-center">
                <input :class="['position-relative', validEmail(nuevoProfesor.correo)?'':'error']" ref="coreo" type="text" v-model="nuevoProfesor.correo" placeholder="Correo">
                <div class="important-field" v-show="showCreate && !validEmail(nuevoProfesor.correo)"></div>
              </div>
              <input class="w-100 position-relative" ref="nacimiento" type="date" v-model="nuevoProfesor.nacimiento" placeholder="Fecha de nacimiento">
              <div class="select-field">
              <p>Seleccione la opción del comité al que pertenece el profesor</p>
              <select class="custom-select" v-model="nuevoProfesor.coid">
                <option selected>Seleccione una opción</option>
                <option v-for="(comite) in Object.values(dbWeb.Comites)" :key="comite.comi_id" :value="comite.comi_nombre">{{comite.comi_nombre}}</option>
              </select>
              <div class="phones-input row justify-content-between align-items-center" v-for="index in cantTelf" :key="index" style="margin-top: 5px">
                <div class="col-9 p-0 d-flex flex-row align-items-center justify-content-center">
                  <input :class="['position-relative', validPhone(nuevoProfesor.telefonos[`telefono${index-1}`], (index-1))?'':'error']" ref="phone" type="text" v-model="nuevoProfesor.telefonos[`telefono${index-1}`]" placeholder="Telefono">
                  <div class="important-field" v-show="showCreate && !validPhone(nuevoProfesor.telefonos[`telefono${index-1}`], (index-1))"></div>
                </div>
                <span @click="addPhone('crear', index-1)" :class="['icon p-0 add flaticon-add', (index-1 > 0)?'col-1':'col-3 pl-2']" v-if="index-1 === cantTelf-1"></span>
                <span @click="deletePhone('crear', index-1)" class="icon col-1 p-0 delete flaticon-minus" v-if="index-1 > 0 && index-1 === cantTelf-1"></span>
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
              Crear profesor
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
    name: 'AdminProfesores',
    data(){
      return {
        cantTelf: 1,
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
        selectProfesor: '',
        nuevoProfesor: {
          coid: 'Seleccione una opción',
          id: '',
          ci: '',
          nacimiento: '',
          correo: '',
          imagen: '',
          nombre: '',
          telefonos: [],
          cv: '',
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

          if(Object.values(Object.values(this.dbWeb.Profesores).reverse()[index].prof_telefonos).length !== 0){
            this.cantTelf = Object.values(Object.values(this.dbWeb.Profesores).reverse()[index].prof_telefonos).length
          }

          this.selectProfesor = {
            coid: Object.values(this.dbWeb.Profesores).reverse()[index].comi_id,
            id: Object.values(this.dbWeb.Profesores).reverse()[index].prof_id,
            ci: Object.values(this.dbWeb.Profesores).reverse()[index].prof_ci,
            nacimiento: Object.values(this.dbWeb.Profesores).reverse()[index].prof_fechadenacimiento,
            correo: Object.values(this.dbWeb.Profesores).reverse()[index].prof_correo,
            imagen: Object.values(this.dbWeb.Profesores).reverse()[index].prof_foto,
            nombre: Object.values(this.dbWeb.Profesores).reverse()[index].prof_nombre,
            telefonos: Object.values(this.dbWeb.Profesores).reverse()[index].prof_telefonos,
            cv: Object.values(this.dbWeb.Profesores).reverse()[index].prof_cv,
          };
        }, 900);
        setTimeout(() => {
          this.$refs.section1.classList.toggle('translate')
        }, 950);
      },
      deleteFile(index, val){
        if(val === 'crear'){
          if(index === 0){
            this.nuevoProfesor.imagen = '';
          }else if(index === 1){
            this.nuevoProfesor.cv = '';
          }
          delete this.files[`archivo${index}`];
          this.resetDBValues(index);
        }else if(val === 'select'){
          if(index === 0){
            this.selectProfesor.imagen = '';
          }else if(index === 1){
            this.selectProfesor.cv = '';
          }
          delete this.files[`archivo${index}`];
          this.resetDBValues(index);
        }
      },
      deleteCollection(value){
        this.cantTelf = 1;
        if(value === 'crear'){
          this.nuevoProfesor.correo = '';
          this.nuevoProfesor.imagen = '';
          this.nuevoProfesor.coid = 'Seleccione una opción';
          this.nuevoProfesor.nombre = '';
          this.nuevoProfesor.nacimiento = '';
          this.nuevoProfesor.telefonos = [];
          this.nuevoProfesor.cv = '';
          this.nuevoProfesor.id = '';
          this.nuevoProfesor.ci = '';
        }else if(value === 'select'){
          this.selectProfesor.correo = '';
          this.selectProfesor.imagen = '';
          this.selectProfesor.coid = 'Seleccione una opción';
          this.selectProfesor.nombre = '';
          this.selectProfesor.nacimiento = '';
          this.selectProfesor.telefonos = [];
          this.selectProfesor.cv = '';
          this.selectProfesor.id = '';
          this.selectProfesor.ci = '';
        }

        this.files = {};
        this.resetDBValues();
      },
      validPhone(target, index){
        const exp = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/g;
        if(index === 0){
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
      validEmail(target){
        const exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(exp.test(target) || target === ''){
          return true
        }else{
          return false
        }
      },
      validNoEmpty(target){
        if(target !== '' && target !== undefined){
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

        if(this.validEmail(this[`${txt}Profesor`].correo)){
          for(let i = 0; i < this.cantTelf; i++){
            if(!this.validPhone(Object.values(this[`${txt}Profesor`].telefonos)[i], i)){
              return false
            }
          }
          return true
        }else{
          return false
        }
      },
      addPhone(val, index){
        if(val === 'crear'){
          if(this.nuevoProfesor.telefonos[`telefono${index}`] !== undefined && this.nuevoProfesor.telefonos[`telefono${index}`] !== ''){
            this.cantTelf++;
          }else{
            this.error = 'Primero debe registrar el teléfono en la casilla vacía'
          }
        }else{
          if(this.selectProfesor.telefonos[`telefono${index}`] !== undefined && this.selectProfesor.telefonos[`telefono${index}`] !== ''){
            this.cantTelf++;
          }else{
            this.error = 'Primero debe registrar el teléfono en la casilla vacía'
          }
        }
      },
      deletePhone(val, index){
        if(val === 'crear'){
          this.nuevoProfesor.telefonos[`telefono${index}`] = '';
          delete this.nuevoProfesor.telefonos[`telefono${index}`];
          this.cantTelf--;
        }else{
          this.selectProfesor.telefonos[`telefono${index}`] = '';
          delete this.selectProfesor.telefonos[`telefono${index}`];
          this.cantTelf--;
        }
      },
      submitCollection(value){
        if(this.validAllFields(value)){
          
          if(value === 'crear'){
            if(this.nuevoProfesor.cv.nombre !== undefined){
              this.nuevoProfesor.cv.nombre = `c_v_${this.nuevoProfesor.nombre.split(' ').join('_')}`;
            }

            if(this.nuevoProfesor.imagen.nombre !== undefined){
              this.nuevoProfesor.imagen.nombre = this.nuevoProfesor.nombre.split(' ').join('_');
            }

            let dataTransfer = {
              archivos: this.files,
              profesor: {
                coid: this.nuevoProfesor.coid,
                ci: this.nuevoProfesor.ci,
                nacimiento: this.nuevoProfesor.nacimiento,
                correo: this.nuevoProfesor.correo,
                archivos:{
                  image: this.nuevoProfesor.imagen,
                  cv: this.nuevoProfesor.cv,
                },
                nombre: this.nuevoProfesor.nombre,
              },
              target: 'Profesores',
            };

            if(this.nuevoProfesor.coid === 'Seleccione una opción'){
              dataTransfer.profesor.coid = '';
            }else{
              dataTransfer.profesor.coid = this.nuevoProfesor.coid;
            }

            if(Object.values(this.nuevoProfesor.telefonos).length !== 0){
              dataTransfer.profesor.telefonos = this.nuevoProfesor.telefonos;
            }else{
              dataTransfer.profesor.telefonos = '';
            }
            
            this.crearDB(dataTransfer)

          }else if(value ==='select'){
            if(this.selectProfesor.cv.nombre !== undefined){
              this.selectProfesor.cv.nombre = `c_v_${this.selectProfesor.nombre.split(' ').join('_')}`;
            }

            if(this.selectProfesor.imagen.nombre !== undefined){
              this.selectProfesor.imagen.nombre = this.selectProfesor.nombre.split(' ').join('_');
            }
            
            let dataTransfer = {
              archivos: this.files,
              profesor: {
                coid: this.selectProfesor.coid,
                id: this.selectProfesor.id,
                ci: this.selectProfesor.ci,
                nacimiento: this.selectProfesor.nacimiento,
                correo: this.selectProfesor.correo,
                archivos:{
                  image: this.selectProfesor.imagen,
                  cv: this.selectProfesor.cv,
                },
                nombre: this.selectProfesor.nombre,
              },
              target: 'Profesores',
            };

            if(this.selectProfesor.coid === 'Seleccione una opción'){
              dataTransfer.profesor.coid = '';
            }else{
              dataTransfer.profesor.coid = this.selectProfesor.coid;
            }

            if(Object.values(this.selectProfesor.telefonos).length !== 0){
              dataTransfer.profesor.telefonos = this.selectProfesor.telefonos;
            }else{
              dataTransfer.profesor.telefonos = '';
            }
            
            this.updateDB(dataTransfer)
          }
        }else{
          this.error = 'Los campos marcados con * son obligatorios'
        }
      },
      filesVerification(event, val, val2){

        let files = event.target.files[0];

        this.files[`archivo${val}`] = event.target.files[0];

        this.files[`archivo${val}`].id = val

        if(val2 === 'crear'){
          if(val === 0){
            this.nuevoProfesor.imagen = [];
            this.nuevoProfesor.imagen = {
              nombre: files.name,
              url: '',
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }else if(val === 1){
            this.nuevoProfesor.cv = [];
            this.nuevoProfesor.cv = {
              nombre: files.name,
              url: '',
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }
        }else if(val2 === 'select'){
          if(val === 0){
            this.selectProfesor.imagen = [];
            this.selectProfesor.imagen = {
              nombre: files.name,
              url: '',
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }else if(val === 1){
            this.selectProfesor.cv = [];
            this.selectProfesor.cv = {
              nombre: files.name,
              url: '',
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }
        }

        event.target.value = ''
      },
      deleteElement(index){
        let dataTransfer = [];
        if(this.deletingVal === null && this.successUpload === null){
          dataTransfer = {
            ref: 'Profesores',
            idSt: Object.values(this.dbWeb.Profesores).reverse()[index].prof_id,
            idDb: Object.values(this.dbWeb.Profesores).reverse()[index].prof_id,
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
        if(this.dbWeb.Profesores !== undefined){
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
      }
    },

    created(){
      this.changeSecTitle('Profesores');
    },

    mounted(){

      this.getData().then(()=>{
        this.listDisplay();
        this.show = true;
      })

      this.deleteCollection('crear');

      if(this.dbWeb.Profesores !== undefined && Object.values(this.dbWeb.Profesores).length/this.numElements > 1){
        this.number = Math.ceil(Object.values(this.dbWeb.Profesores).length/this.numElements);
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
        if(this.deletingVal !== null && this.dbWeb.Profesores !== undefined && Object.values(this.dbWeb.Profesores).length - 1 === 0){
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
              if(this.dbWeb.Profesores !== undefined){
                if(Object.values(this.dbWeb.Profesores).length/this.numElements > 1){
                  this.number = Math.ceil(Object.values(this.dbWeb.Profesores).length/this.numElements);
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
    padding: 4px 5px 4px 5px;
    background-color: #ce3140;
    border: 0.3px solid  #ce3140;
  }

  .phones-input .icon.delete:hover::before{
    background-color: #fd364a;
  }

  .phones-input .icon.add::before{
    padding: 4px 5px 4px 5px;
    background-color: #27913e;
    border: 0.3px solid  #27913e;
  }

  .phones-input .icon.add:hover::before{
    background-color: #2dac49;
  }
</style>