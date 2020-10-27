<template>
  <div id="admin-secciones-extra" class="position-relative" v-if="show">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de Secciones
          </h5>
        </div>
        <button class="btn btn-success" @click="crearValor()">
          Agregar Sección
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-3 pl-1 pr-1">
          Página de la sección
        </div>
        <div class="text col-3 pl-1 pr-1">
          Tipo de sección
        </div>
        <div class="text col-3 pl-1 pr-1">
          Cantidad de campos
        </div>
        <div class="col-3 pl-1 pr-1">
        </div>
      </div>
      <div v-if="listEmpty">
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(seccion, index) in Object.values(dbWeb.Secciones_Extra)" :key="seccion.sec_id" :id="seccion.sec_id" :data-id="`elem${index}`" data-transitioned="false" v-show="index < numElements + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-3 pl-1 pr-1">
            {{seccion.sec_pag}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{seccion.sec_nombre}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{cantSecc(index)}}
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
    
    <section class="translate" id="section1" v-if="showPrev === true" ref="section1">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          
          <!-- Inicio de lista de contenido -->

            <div class="list-db w-95" style = "box-shadow: none !important;">
              <div class="list-header w-100 d-flex flex-row align-items-center justify-content-end">
                <span @click="addField('select', 'contenido')" class="icon p-0 add flaticon-add ml-2 mr-2"></span>
                <div class="ml-2 mr-2" style="width: 21.5px">
                  <span @click="deleteField('select', 'contenido')" class="icon p-0 delete flaticon-minus" v-show="this.cantFields.contenido.numero > 0"></span>
                </div>
              </div>
              <div class="list-header w-100 flex-row d-flex align-items-center justify-content-start">
                <div class="text col-5 pl-1 pr-1 overflow-hidden">
                  Texto de la sección
                </div>
                <div class="col-5 pl-1 pr-1">
                  Imagen
                  <i ref="info" @mouseenter="toggleInfo('info')" @mouseleave="toggleInfo('info')" class="icon info position-relative ml-1 flaticon-question">
                    <div class="info text position-absolute" style="top: auto; bottom: -400% !important; left: -271px; overflow: visible">
                      Marque la opción si quiere que el contenido tenga una imagen
                    </div>
                  </i>
                </div>
                <div class="col-2 pl-1 pr-1">
                  Barra de porcentaje
                  <i ref="info1" @mouseenter="toggleInfo('info1')" @mouseleave="toggleInfo('info1')" class="icon info position-relative ml-1 flaticon-question">
                    <div class="info text position-absolute" style="top: auto; bottom: -400% !important; left: -271px; overflow: visible">
                      Marque la opción si quiere que el contenido tenga una barra de porcentaje
                    </div>
                  </i>
                </div>
              </div>
              <div v-if="cantFields.contenido.numero > 0">
                <ul class="list-item w-100 row align-items-center justify-content-start" v-for="index in cantFields.contenido.numero" :key="index" :id="index" :data-id="`elem${index}`" data-transitioned="false" style="height: auto; overflow:hidden;">
                  <li class="item-element text col-5 pl-1 pr-1 h-100">
                    <textarea type="text" class="info-form-c w-75 h-100 m-0" placeholder="Información" v-model="selectSeccion.contenido[`contenido${index}`].texto"></textarea>
                  </li>
                  <li class="item-element d-flex align-items-start justify-content-center flex-column text col-5 pl-1 pr-1 h-100">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" :id="`imagencontenido${index}`" v-model="selectSeccion.contenido[`contenido${index}`].showImagenContenido" @change="changeCheckbox(selectSeccion.contenido[`contenido${index}`].showImagenContenido, index, 'select')">
                      <label class="custom-control-label text" :for="`imagencontenido${index}`"></label>
                    </div>
                    <div v-if="selectSeccion.contenido[`contenido${index}`].showImagenContenido === true" class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-1">
                      <div class="input-files d-flex w-100 h-100 flex-column align-items-center justify-content-center position-relative" v-if="selectSeccion.imagenes[`imagen${index}`].nombre === undefined || selectSeccion.imagenes[`imagen${index}`].nombre === ''">
                        <input :ref='`file0`' @change="filesVerification($event, index, 'select', 'imagenes')" class="collectionFiles" title="Elija un archivo"  type="file" accept="image/*">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center w-100 h-100 p-2">
                          <i class="icon flaticon-add m-0 p-0"></i>
                        </div>
                      </div>
                      <!-- PREV IMAGENES -->
                      <div  class="uploadCont flex-row align-items-center justify-content-center w-100 h-100" v-else style="display: flex;">
                        <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light h-100']">
                          <!-- MUESTRA DE IMAGEN -->
                          <div class="w-100 d-flex position-relative justify-content-end flex-column h-100">
                            <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined || selecSeccion.imagenes[`imagen${index}`].url !== '')" style="min-height: 80px;">
                              <img :src="(dbImg[index] !== undefined && dbImg[index].url !== undefined)?dbImg[index].url:(selecSeccion.imagenes[`imagen${index}`].url !== '')?selecSeccion.imagenes[`imagen${index}`].url:''" width="100%" height="79.5" style="height: 79.5px; width: 100%; ">
                            </div>
                            <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center" style="min-height: 80px;">
                              <p class="align-self-star" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectSeccion.imagenes[`imagen${index}`].nombre}}</p>
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
                  <li class="item-element text col-2 pl-1 pr-1 d-flex align-items-start justify-content-center flex-column h-100">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" :id="`barracontenido${index}`" v-model="selectSeccion.contenido[`contenido${index}`].showBarra" @change="changeCheckbox(selectSeccion.contenido[`contenido${index}`].showBarra, index, 'select', 'barra')">
                      <label class="custom-control-label text" :for="`barracontenido${index}`"></label>
                    </div>
                    <input v-if="selectSeccion.contenido[`contenido${index}`].showBarra === true" class="w-100 position-relative" ref="nombre" type="text" v-model="selectSeccion.contenido[`contenido${index}`].porcentajeBarra" placeholder="Porcentaje">
                  </li>
                </ul>
              </div>
              <div class="text col-12" v-else>
                No hay elementos creados aún
              </div>
            </div>

          <!-- Fin de lista de contenido -->
            
          <!-- Imagen de la seccion -->

            <div class="col-12 col-sm-6 d-flex flex-column align-items-center justify-content-center">
              <p>Marque la opción si desea que la sección tenga una imagen</p>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" :id="`imagenseccion`" v-model="selectSeccion.showImagenSeccion" @change="changeCheckbox(selectSeccion.showImagenSeccion, 0, 'select', 'imagenes')">
                <label class="custom-control-label text" :for="`imagenseccion`"></label>
              </div>
              <div v-if="selectSeccion.showImagenSeccion === true" class="item-element text w-100 pl-1 pr-1 h-100">
                <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-1">
                  <div class="input-files d-flex w-100 h-100 flex-column align-items-center justify-content-center position-relative" v-if="selectSeccion.imagenes[`imagen0`].nombre === undefined || selectSeccion.imagenes[`imagen0`].nombre === ''">
                    <input :ref='`file0`' @change="filesVerification($event, 0, 'select')" class="collectionFiles" title="Elija un archivo"  type="file" accept="image/*">
                    <div class="button-files d-flex flex-row align-items-center justify-content-center w-100 h-100 p-2">
                      <i class="icon flaticon-add m-0 p-0"></i>
                    </div>
                  </div>
                  <!-- PREV IMAGENES -->
                  <div  class="uploadCont flex-row align-items-center justify-content-center w-100 h-100" v-else style="display: flex;">
                    <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light h-100']">
                      <!-- MUESTRA DE IMAGEN -->
                      <div class="w-100 d-flex position-relative justify-content-end flex-column h-100">
                        <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined || selecSeccion.imagenes[`imagen0`].url !== '')" style="min-height: 80px;">
                          <img :src="(dbImg[index] !== undefined && dbImg[index].url !== undefined)?dbImg[index].url:(selecSeccion.imagenes[`imagen0`].url !== '')?selecSeccion.imagenes[`imagen0`].url:''" width="100%" height="79.5" style="height: 79.5px; width: 100%; ">
                        </div>
                        <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center" style="min-height: 80px;">
                          <p class="align-self-star" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectSeccion.imagenes["imagen0"].nombre}}</p>
                        </div>
                        <!-- ICONO DE QUITAR -->
                        <div @click.prevent="deleteFile(0, 'select')" class="remove position-absolute flaticon-close" style="top:2px; right:3px;"></div>
                        <!-- FIN ICONO DE QUITAR -->
                      </div>
                      <!-- FIN MUESTRA DE IMAGEN -->
                      <!-- BARRA DE PROGRESO -->
                      <div class="progress w-85 mb-2" v-if="dbImg[0] !== undefined">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[0] !== undefined)?dbImg[0].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                      </div>
                      <!-- FIN BARRA DE PROGRESO -->
                    </div>
                  </div>
                </div>
                <!--  Fin de IMAGENES -->
              </div>
            </div>

          <!-- Fin de Imagen de la seccion -->

          <div class="col-12 col-sm-6 d-flex align-items-center justify-content-center flex-column">
            <div class="w-100 d-flex align-items-center justify-content-center">
              <input class="w-100 position-relative" ref="nombre" type="text" v-model="selectSeccion.secnom" placeholder="Nombre de la sección">
            </div>
            <div class="w-100 d-flex align-items-center justify-content-center">
              <div class="select-field">
                <p>Seleccione la opción del comité al que pertenece el profesor</p>
                <select class="custom-select" v-model="selectSeccion.secpag">
                  <option selected>Seleccione una opción</option>
                  <option value="Inicio">Página de Inicio</option>
                  <option value="Nosotros">Página de Nosotros</option>
                  <option value="Juntas">Página de Juntas Directivas</option>
                  <option value="Servicios">Página de Servicios</option>
                  <option value="Comités">Página de Comités</option>
                  <option value="Contacto">Página de Contacto</option>
                  <option v-for="(comite) in Object.values(dbWeb.Comites)" :key="comite.comi_id" :value="comite.comi_nombre">{{comite.comi_nombre}}</option>
                </select>
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
              Actualizar sección
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('select')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section1')">Regresar</button>
        </div>
      </form>
    </section>

    <section class="translate" id="section2" v-if="showCreate" ref="section2">
      <form class="form-class d-flex flex-column justify-content-center align-items-center">
        <div class="file-form">
          
          <!-- Inicio de lista de contenido -->

            <div class="list-db w-95" style = "box-shadow: none !important;">
              <div class="list-header w-100 d-flex flex-row align-items-center justify-content-end">
                <span @click="addField('crear', 'contenido')" class="icon p-0 add flaticon-add ml-2 mr-2"></span>
                <div class="ml-2 mr-2" style="width: 21.5px">
                  <span @click="deleteField('crear', 'contenido')" class="icon p-0 delete flaticon-minus" v-show="this.cantFields.contenido.numero > 0"></span>
                </div>
              </div>
              <div class="list-header w-100 flex-row d-flex align-items-center justify-content-start">
                <div class="text col-5 pl-1 pr-1 overflow-hidden">
                  Texto de la sección
                </div>
                <div class="col-5 pl-1 pr-1">
                  Imagen
                  <i ref="info" @mouseenter="toggleInfo('info')" @mouseleave="toggleInfo('info')" class="icon info position-relative ml-1 flaticon-question">
                    <div class="info text position-absolute" style="top: auto; bottom: -400% !important; left: -271px; overflow: visible">
                      Marque la opción si quiere que el contenido tenga una imagen
                    </div>
                  </i>
                </div>
                <div class="col-2 pl-1 pr-1">
                  Barra de porcentaje
                  <i ref="info1" @mouseenter="toggleInfo('info1')" @mouseleave="toggleInfo('info1')" class="icon info position-relative ml-1 flaticon-question">
                    <div class="info text position-absolute" style="top: auto; bottom: -400% !important; left: -271px; overflow: visible">
                      Marque la opción si quiere que el contenido tenga una barra de porcentaje
                    </div>
                  </i>
                </div>
              </div>
              <div v-if="cantFields.contenido.numero > 0">
                <ul class="list-item w-100 row align-items-center justify-content-start" v-for="index in cantFields.contenido.numero" :key="index" :id="index" :data-id="`elem${index}`" data-transitioned="false" style="height: auto; overflow:hidden;">
                  <li class="item-element text col-5 pl-1 pr-1 h-100">
                    <textarea type="text" class="info-form-c w-75 h-100 m-0" placeholder="Información" v-model="nuevaSeccion.contenido[`contenido${index}`].texto"></textarea>
                  </li>
                  <li class="item-element d-flex align-items-start justify-content-center flex-column text col-5 pl-1 pr-1 h-100">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" :id="`imagencontenido${index}`" v-model="nuevaSeccion.contenido[`contenido${index}`].showImagenContenido" @change="changeCheckbox(nuevaSeccion.contenido[`contenido${index}`].showImagenContenido, index, 'crear')">
                      <label class="custom-control-label text" :for="`imagencontenido${index}`"></label>
                    </div>
                    <div v-if="nuevaSeccion.contenido[`contenido${index}`].showImagenContenido === true" class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-1">
                      <div class="input-files d-flex w-100 h-100 flex-column align-items-center justify-content-center position-relative" v-if="nuevaSeccion.imagenes[`imagen${index}`].nombre === undefined || nuevaSeccion.imagenes[`imagen${index}`].nombre === ''">
                        <input :ref='`file0`' @change="filesVerification($event, index, 'crear', 'imagenes')" class="collectionFiles" title="Elija un archivo"  type="file" accept="image/*">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center w-100 h-100 p-2">
                          <i class="icon flaticon-add m-0 p-0"></i>
                        </div>
                      </div>
                      <!-- PREV IMAGENES -->
                      <div  class="uploadCont flex-row align-items-center justify-content-center w-100 h-100" v-else style="display: flex;">
                        <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light h-100']">
                          <!-- MUESTRA DE IMAGEN -->
                          <div class="w-100 d-flex position-relative justify-content-end flex-column h-100">
                            <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[index] !== undefined)" style="min-height: 80px;">
                              <img :src="(dbImg[index] === undefined)?'':(dbImg[index].url !== undefined)?dbImg[index].url:''" width="100%" height="79.5" style="height: 79.5px; width: 100%; ">
                            </div>
                            <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center" style="min-height: 80px;">
                              <p class="align-self-star" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevaSeccion.imagenes[`imagen${index}`].nombre}}</p>
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
                  <li class="item-element text col-2 pl-1 pr-1 d-flex align-items-start justify-content-center flex-column h-100">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" :id="`barracontenido${index}`" v-model="nuevaSeccion.contenido[`contenido${index}`].showBarra" @change="changeCheckbox(nuevaSeccion.contenido[`contenido${index}`].showBarra, index, 'crear', 'barra')">
                      <label class="custom-control-label text" :for="`barracontenido${index}`"></label>
                    </div>
                    <input v-if="nuevaSeccion.contenido[`contenido${index}`].showBarra === true" class="w-100 position-relative" ref="nombre" type="text" v-model="nuevaSeccion.contenido[`contenido${index}`].porcentajeBarra" placeholder="Porcentaje">
                  </li>
                </ul>
              </div>
              <div class="text col-12" v-else>
                No hay elementos creados aún
              </div>
            </div>

          <!-- Fin de lista de contenido -->
            
          <!-- Imagen de la seccion -->

            <div class="col-12 col-sm-6 d-flex flex-column align-items-center justify-content-center">
              <p>Marque la opción si desea que la sección tenga una imagen</p>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" :id="`imagenseccion`" v-model="nuevaSeccion.showImagenSeccion" @change="changeCheckbox(nuevaSeccion.showImagenSeccion, 0, 'crear', 'imagenes')">
                <label class="custom-control-label text" :for="`imagenseccion`"></label>
              </div>
              <div v-if="nuevaSeccion.showImagenSeccion === true" class="item-element text w-100 pl-1 pr-1 h-100">
                <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-1">
                  <div class="input-files d-flex w-100 h-100 flex-column align-items-center justify-content-center position-relative" v-if="nuevaSeccion.imagenes[`imagen0`].nombre === undefined || nuevaSeccion.imagenes[`imagen0`].nombre === ''">
                    <input :ref='`file0`' @change="filesVerification($event, 0, 'crear')" class="collectionFiles" title="Elija un archivo"  type="file" accept="image/*">
                    <div class="button-files d-flex flex-row align-items-center justify-content-center w-100 h-100 p-2">
                      <i class="icon flaticon-add m-0 p-0"></i>
                    </div>
                  </div>
                  <!-- PREV IMAGENES -->
                  <div  class="uploadCont flex-row align-items-center justify-content-center w-100 h-100" v-else style="display: flex;">
                    <div :class="['prev-container d-flex position-relative flex-column align-items-center justify-content-between w-100 bg-success-light h-100']">
                      <!-- MUESTRA DE IMAGEN -->
                      <div class="w-100 d-flex position-relative justify-content-end flex-column h-100">
                        <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[0] !== undefined)" style="min-height: 80px;">
                          <img :src="(dbImg[0] === undefined)?'':(dbImg[0].url !== undefined)?dbImg[0].url:''" width="100%" height="79.5" style="height: 79.5px; width: 100%; ">
                        </div>
                        <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center" style="min-height: 80px;">
                          <p class="align-self-star" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevaSeccion.imagenes["imagen0"].nombre}}</p>
                        </div>
                        <!-- ICONO DE QUITAR -->
                        <div @click.prevent="deleteFile(0, 'crear')" class="remove position-absolute flaticon-close" style="top:2px; right:3px;"></div>
                        <!-- FIN ICONO DE QUITAR -->
                      </div>
                      <!-- FIN MUESTRA DE IMAGEN -->
                      <!-- BARRA DE PROGRESO -->
                      <div class="progress w-85 mb-2" v-if="dbImg[0] !== undefined">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[0] !== undefined)?dbImg[0].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                      </div>
                      <!-- FIN BARRA DE PROGRESO -->
                    </div>
                  </div>
                </div>
                <!--  Fin de IMAGENES -->
              </div>
            </div>

          <!-- Fin de Imagen de la seccion -->

          <div class="col-12 col-sm-6 d-flex align-items-center justify-content-center flex-column">
            <div class="w-100 d-flex align-items-center justify-content-center">
              <input class="w-100 position-relative" ref="nombre" type="text" v-model="nuevaSeccion.secnom" placeholder="Nombre de la sección">
            </div>
            <div class="w-100 d-flex align-items-center justify-content-center">
              <div class="select-field">
                <p>Seleccione la opción del comité al que pertenece el profesor</p>
                <select class="custom-select" v-model="nuevaSeccion.secpag">
                  <option selected>Seleccione una opción</option>
                  <option value="Inicio">Página de Inicio</option>
                  <option value="Nosotros">Página de Nosotros</option>
                  <option value="Juntas">Página de Juntas Directivas</option>
                  <option value="Servicios">Página de Servicios</option>
                  <option value="Comités">Página de Comités</option>
                  <option value="Contacto">Página de Contacto</option>
                  <option v-for="(comite) in Object.values(dbWeb.Comites)" :key="comite.comi_id" :value="comite.comi_nombre">{{comite.comi_nombre}}</option>
                </select>
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
              Crear sección
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
    name: 'AdminSeccionesExtra',
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
          },
          contenido: {
            numero: 0,
            nombre: 'contenido',
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
        selectSeccion: {
          secpag: 'Seleccione una opción',
          secnom: '',
          contenido:{},
          showImagenSeccion: false,
          imagenes:{
            imagen0: "",
          },
        },
        nuevaSeccion: {
          secpag: 'Seleccione una opción',
          secnom: '',
          contenido:{},
          showImagenSeccion: false,
          imagenes:{
            imagen0: "",
          },
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

          this.cantFields.contenido.numero = this.cantSecc(index);

          this.selectSeccion.secpag = Object.values(this.dbWeb.Secciones_Extra)[index].sec_pag;
          this.selectSeccion.secnom = Object.values(this.dbWeb.Secciones_Extra)[index].sec_nombre;
          this.selectSeccion.secid = Object.values(this.dbWeb.Secciones_Extra)[index].sec_id;
          this.selectSeccion.showImagenSeccion = Object.values(this.dbWeb.Secciones_Extra)[index].sec_imagen_seccion;

          if(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido !== undefined && Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido !== ""){
            for(let i = 0; i < Object.values(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido).length; i++){
              this.$set(this.selectSeccion.contenido, `contenido${i+1}`, Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido[`contenido${i+1}`])
            }
          }

          this.$set(this.selectSeccion.imagenes, `imagen0`, "")

          if(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido !== undefined && Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido !== ""){
            for(let i = 0; i < Object.values(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido).length; i++){
              this.$set(this.selectSeccion.imagenes, `imagen${i+1}`, {})
            }
          }

          for(let i = 0; i < Object.values(Object.values(this.dbWeb.Secciones_Extra)[index].sec_fotos).length; i++){
            this.selectSeccion.imagenes[`imagen${i}`] = Object.values(this.dbWeb.Secciones_Extra)[index].sec_fotos[`imagen${i}`]
          }
          
        }, 900);
        setTimeout(() => {
          this.$refs.section1.classList.toggle('translate')
        }, 950);
      },
      deleteCollection(value){
        if(value === 'crear'){
          this.nuevaSeccion.secpag = 'Seleccione una opción';
          this.nuevaSeccion.secnom = '';
          this.nuevaSeccion.contenido = {};
          this.nuevaSeccion.showImagenSeccion = false,
          this.nuevaSeccion.imagenes = {
            imagen0: "",
          };
        }else if(value === 'select'){
          this.selectSeccion.secpag = 'Seleccione una opción';
          this.selectSeccion.secnom = '';
          this.selectSeccion.contenido = {};
          this.selectSeccion.showImagenSeccion = false,
          this.selectSeccion.imagenes = {
            imagen0: "",
          };
        }

        this.cantFields.contenido.numero = 0;

        this.files = {};
        this.resetDBValues();
      },
      deleteFile(index, val){
        if(val === 'crear'){
          if(index === 0){
            this.nuevaSeccion.imagenes[`imagen${index}`] = "";
          }else if(this.nuevaSeccion.imagenes[`imagen${index}`] !== undefined){
            this.nuevaSeccion.imagenes[`imagen${index}`] = {};
          }
          
        }else if(val === 'select'){
          if(index === 0){
            this.selectSeccion.imagenes[`imagen${index}`] = "";
          }else if(this.selectSeccion.imagenes[`imagen${index}`] !== undefined){
            this.selectSeccion.imagenes[`imagen${index}`] = {};
          }
        }

        delete this.files[`archivo${index}`];
        this.resetDBValues(index);
      },
      addField(val, val2){
        if(val === 'crear'){
          this.$set(this.nuevaSeccion[`${this.cantFields[`${val2}`].nombre}`], `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, {
            showBarra: false,
            showImagenContenido: false,
            porcentajeBarra: "",
            texto: "",
          });
          this.$set(this.nuevaSeccion.imagenes, `imagen${this.cantFields[`${val2}`].numero + 1}`, {});
          this.cantFields[`${val2}`].numero ++;
        }else if(val === 'select'){
          this.$set(this.selectSeccion[`${this.cantFields[`${val2}`].nombre}`], `${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero + 1}`, {
            showBarra: false,
            showImagenContenido: false,
            porcentajeBarra: "",
            texto: "",
          });
          this.$set(this.selectSeccion.imagenes, `imagen${this.cantFields[`${val2}`].numero + 1}`, {});
          this.cantFields[`${val2}`].numero ++;
        }
      },
      deleteField(val, val2){
        if(val === 'crear'){
          this.nuevaSeccion[`${this.cantFields[`${val2}`].nombre}`][`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`] = '';
          delete this.nuevaSeccion[`${this.cantFields[`${val2}`].nombre}`][`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`];
          this.deleteFile(this.cantFields[`${val2}`].numero, val);
          this.cantFields[`${val2}`].numero --;
        }else if(val === 'select'){
          this.selectSeccion[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`] = '';
          delete this.selectSeccion[`${this.cantFields[`${val2}`].nombre}${this.cantFields[`${val2}`].numero}`];
          this.deleteFile(this.cantFields[`${val2}`].numero, val);
          this.cantFields[`${val2}`].numero --;
        }
      },
      submitCollection(value){
        if(value === 'crear'){

          for(let i = 0; i < Object.values(this.nuevaSeccion.imagenes).length; i++){
            if(Object.values(this.nuevaSeccion.imagenes)[i].nombre !== undefined){
              Object.values(this.nuevaSeccion.imagenes)[i].nombre = Object.values(this.nuevaSeccion.imagenes)[i].nombreref;
            }
          } 

          let dataTransfer = {
            archivos: this.files,
            seccion: {
              secpag: this.nuevaSeccion.secpag,
              secnom: this.nuevaSeccion.secnom,
              contenido: this.nuevaSeccion.contenido,
              imagenseccion: this.nuevaSeccion.showImagenSeccion,
              archivos: this.nuevaSeccion.imagenes,
            },
            target: 'Secciones_Extra',
          };
          
          this.crearDB(dataTransfer)

        }else if(value ==='select'){
          
          for(let i = 0; i < Object.values(this.selectSeccion.imagenes).length; i++){
            if(Object.values(this.selectSeccion.imagenes)[i].nombre !== undefined){
              Object.values(this.selectSeccion.imagenes)[i].nombre = Object.values(this.selectSeccion.imagenes)[i].nombreref;
            }
          } 

          let dataTransfer = {
            archivos: this.files,
            seccion: {
              secpag: this.selectSeccion.secpag,
              secnom: this.selectSeccion.secnom,
              id: this.selectSeccion.secid,
              contenido: this.selectSeccion.contenido,
              imagenseccion: this.selectSeccion.showImagenSeccion,
              archivos: this.selectSeccion.imagenes,
            },
            target: 'Secciones_Extra',
          };
          
          this.updateDB(dataTransfer)
        }
      },
      filesVerification(event, index, val2){

        let files = event.target.files[0];

        this.files[`archivo${index}`] = event.target.files[0];

        this.files[`archivo${index}`].id = index;

        if(val2 === 'crear'){
          this.nuevaSeccion.imagenes[`imagen${index}`] = {
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
            ref: 'Secciones_Extra',
            idSt: Object.values(this.dbWeb.Secciones_Extra)[index].sec_id,
            idDb: Object.values(this.dbWeb.Secciones_Extra)[index].sec_id,
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
      regresar(value1){
        this.$refs[`${value1}`].classList.toggle('translate');
        setTimeout(() => {
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
        if(this.dbWeb.Secciones_Extra !== undefined){
          this.listEmpty = true
        }else if(value === false){
          this.listEmpty = false
        }else{
          this.listEmpty = false
        }
      },
      cantSecc(index){
        let count = 0;
        if(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido !== undefined && Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido !== ""){
          for(let i = 0; i < Object.values(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido).length; i++){
            if(Object.values(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido)[i] !== undefined && Object.values(Object.values(this.dbWeb.Secciones_Extra)[index].sec_contenido)[i] !== ""){
              count ++;
            }
          }
        }
        return count;
      },
      toggleInfo(val){
        this.$refs[val].children[0].classList.toggle('show-info')
      },
      changeCheckbox(event, index, val, dataref){
        if(event === false){
          if(val === 'crear'){
            if(dataref === 'imagenes'){
              this.nuevaSeccion.imagenes[`imagen${index}`] = {};
            }else{
              this.nuevaSeccion.contenido[`contenido${index}`].porcentajeBarra = ""
            }
          }else if (val === 'select'){
            if(dataref === 'imagenes'){
              this.selectSeccion.imagenes[`imagen${index}`] = {};
            }else{
              this.selectSeccion.contenido[`contenido${index}`].porcentajeBarra = ""
            }
          }
        }
      },
    },

    created(){
      this.changeSecTitle('Secciones Extra');
    },

    mounted(){

      this.getData().then(()=>{
        this.listDisplay();
        this.show = true;
      })

      this.deleteCollection('crear');

      if(this.dbWeb.Secciones_Extra !== undefined && Object.values(this.dbWeb.Secciones_Extra).length/this.numElements > 1){
        this.number = Math.ceil(Object.values(this.dbWeb.Secciones_Extra).length/this.numElements);
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
        if(this.deletingVal !== null && this.dbWeb.Secciones_Extra !== undefined && Object.values(this.dbWeb.Secciones_Extra).length - 1 === 0){
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
              if(this.dbWeb.Secciones_Extra !== undefined){
                if(Object.values(this.dbWeb.Secciones_Extra).length/this.numElements > 1){
                  this.number = Math.ceil(Object.values(this.dbWeb.Secciones_Extra).length/this.numElements);
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
    min-height: 80px;
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