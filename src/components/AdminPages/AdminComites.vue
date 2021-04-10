<template>
  <div id="admin-comites" class="position-relative" v-if="show">
    <div class="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{message.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{message.message}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
    <section class="list-db w-auto" v-show="showList === true" ref="section0">
      <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
        <div>
          <h5 style="font-weight: bold;">
            Lista de comités
          </h5>
        </div>
        <button class="btn btn-success" @click="crearValor()">
          Agregar comité
        </button>
      </div>
      <div class="list-header w-100 row align-items-center justify-content-start">
        <div class="text col-3 pl-1 pr-1">
          Nombre del comité
        </div>
        <div class="text col-3 pl-1 pr-1">
          Correo
        </div>
        <div class="text col-2 pl-1 pr-1">
          Fecha de vigencia
        </div>
        <div class="text col-2 pl-1 pr-1">
          Orden
        </div>
        <div class="col-2 pl-1 pr-1">
        </div>
      </div>
      <div v-if="listEmpty">
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(comite, index) in sortArray" :key="comite.comi_id" :id="comite.comi_id" :data-id="`elem${index}`" data-transitioned="false" v-show="index < numElements + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-3 pl-1 pr-1">
            {{comite.comi_nombre}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{comite.comi_correo}}
          </li>
          <li class="item-element text col-2 pl-1 pr-1">
            {{comite.comi_fechavigencia}}
          </li>
          <li class="item-element text col-2 pl-1 pr-1">
            {{comite.comi_importancia}}
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
    
    <section class="translate" id="section1" v-show="showPrev" v-if="dbWeb.Comites !== undefined && selectComite !== ''" ref="section1">
      <form class="form-class d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form">
          <!-- Inicio de la imagen -->
          <div class="row align-items-center justify-content-center p-1">
            <div class="col-12 row align-items-end justify-content-center p-0">
              <div class="col-3 align-items-center justify-content-center p-1">
                <div class="text text-center">
                  El tamaño de la imagen debe ser 360x285 px
                </div>
                <div class="input-files w-100 flex-column align-items-start p-1" style="display: flex;">
                  <div class="w-100 h-100 d-flex align-items-center position-relative">
                    <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                          <i class="flaticon-folder mr-3 d-none d-sm-block"></i>
                          <label for="collectionFiles">Imagen</label>
                        </div>
                        <input :ref='`file0`' @change="filesVerification($event, 0, 'select')" class="collectionFiles"  type="file" accept="image/*">
                    </div>
                  </div>
                </div>
              <!-- PREV IMAGENES -->
              <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="selectComite.archivos.imagen.nombre !== undefined" style="display: flex;">
                <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                  <!-- MUESTRA DE IMAGEN -->
                  <div class="w-100 p-2 d-flex justify-content-end flex-column" style="min-height: 173px">
                    <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[0] !== undefined || selectComite.archivos.imagen.url !== '')">
                      <img :src="(dbImg[0] !== undefined && dbImg[0].url !== undefined)?dbImg[0].url:(selectComite.archivos.imagen.url !== '')?selectComite.archivos.imagen.url:''" width="200" height="auto" style="min-height: 100px; min-width: 200px; ">
                    </div>
                    <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                      <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectComite.archivos.imagen.nombre}}</p>
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
              </div>
              <!--  Fin de IMAGENES -->
              <div class="col-3 align-items-center justify-content-center p-1">
                <div class="input-files  w-100 flex-column align-items-start p-1 pt-3" style="display: flex;">
                  <div class="w-100 h-100 d-flex align-items-center position-relative">
                    <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                          <i class="flaticon-folder mr-3 d-none d-sm-block"></i>
                          <label for="collectionFiles">Reglamento</label>
                        </div>
                        <input :ref='`file1`' @change="filesVerification($event, 1, 'select')" class="collectionFiles"  type="file" accept=".pdf, .doc, .docx">
                    </div>
                  </div>
                </div>
                <!-- PREV IMAGENES -->
                <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="selectComite.archivos.reglamento.nombre !== undefined" style="display: flex;">
                  <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                    <!-- MUESTRA DE IMAGEN -->
                    <div class="w-100 h-100 m-2">
                      <div class="image w-100 h-100 d-flex flex-column align-items-center justify-content-center" >
                        <i class="icon flaticon-file" @click="openFile(selectComite.archivos.reglamento.url)"></i>
                        <p class="col-12 align-self-star ml-2 text-center" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectComite.archivos.reglamento.nombre}}</p>
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
              </div>
              <!--  Fin de IMAGENES -->
              <div class="col-3 align-items-center justify-content-center p-1">
                <div class="input-files w-100 flex-column align-items-start p-1 pt-3" style="display: flex;">
                  <div class="w-100 h-100 d-flex align-items-center position-relative">
                    <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                          <i class="flaticon-folder mr-3 d-none d-sm-block"></i>
                          <label for="collectionFiles">Normativa</label>
                        </div>
                        <input :ref='`file1`' @change="filesVerification($event, 2, 'select')" class="collectionFiles"  type="file" accept=".pdf, .doc, .docx">
                    </div>
                  </div>
                </div>
                <!-- PREV IMAGENES -->
                <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="selectComite.archivos.normativa.nombre !== undefined" style="display: flex;">
                  <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                    <!-- MUESTRA DE IMAGEN -->
                    <div class="w-100 h-100 m-2">
                      <div class="image w-100 h-100 d-flex flex-column align-items-center justify-content-center" >
                        <i class="icon flaticon-file" @click="openFile(selectComite.archivos.normativa.url)"></i>
                        <p class="col-12 align-self-star ml-2 text-center" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{selectComite.archivos.normativa.nombre}}</p>
                      </div>
                      <!-- ICONO DE QUITAR -->
                      <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                        <button @click.prevent="deleteFile(2, 'select')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                      </div>
                        <!-- FIN ICONO DE QUITAR -->
                      </div>
                      <!-- FIN MUESTRA DE IMAGEN -->
                      <!-- BARRA DE PROGRESO -->
                      <div class="progress w-85 mb-2" v-if="dbImg[2] !== undefined && dbImg[2] !== ''">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[2] !== undefined)?dbImg[2].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                      </div>
                      <!-- FIN BARRA DE PROGRESO -->
                    </div>
                  </div>
              </div>
              <!--  Fin de IMAGENES -->
            </div>
            <div class="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center p-0">
              <div class="col-12 col-md-3 align-self-start align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_activo" v-model="selectComite.activo">
                  <label class="custom-control-label text" for="comi_activo">Marque si el comité se encuentra actualmente activo</label>
                </div>
              </div>
              <div class="col-12 col-md-3 align-self-start align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_page" v-model="selectComite.comipage">
                  <label class="custom-control-label text" for="comi_page">Marque si el comité debe tener su propia página</label>
                </div>
              </div>
              <div class="col-12 col-md-3 align-self-start align-items-center justify-content-center p-1" >
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_int_edit" v-model="selectComite.inthpage">
                  <label class="custom-control-label text" for="comi_int_edit" >Marque si desea que el comité aparezca en la página principal</label>
                  <i ref="info" @mouseenter="toggleInfo()" @mouseleave="toggleInfo()" class="icon info position-relative ml-1 flaticon-question">
                    <div class="info text position-absolute" style="top: auto; bottom: -370% !important; left: -271px; overflow: visible">
                      Este campo estará desabilidato cuando existan un máximo de 4 elementos ya seleccionados.
                    </div>
                  </i>
                </div>
              </div>
            </div>
            <div class="col-12 d-flex flex-column flex-wrap flex-md-row align-items-center justify-content-center p-0">
              <div class="col-9 col-sm-3 align-items-center justify-content-center p-1">
                <div class="w-100 d-flex align-items-center justify-content-center">
                  <input class="w-100 position-relative" ref="nombre" type="text" v-model="selectComite.nombre" placeholder="Nombre">
                </div>
              </div>
              <div class="col-9 col-sm-3 align-items-center justify-content-center p-1">
                <div class="w-100 d-flex align-items-center justify-content-center">
                  <input :class="['position-relative', validEmail(selectComite.correo)?'':'error']" ref="coreo" type="text" v-model="selectComite.correo" placeholder="Correo (Ej. ejemplo@direccion.com)">
                  <div class="important-field" v-show="showCreate && !validEmail(selectComite.correo)"></div>
                </div>
              </div>
              <div class="col-9 col-sm-3 align-items-center justify-content-center p-1">
                <input class="w-100 position-relative" ref="ci" type="text" v-model="selectComite.costos" placeholder="Costos">
              </div>
              <div class="col-7 d-flex flex-column align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_redsocial" v-model="selectComite.redsocial.show">
                  <label class="custom-control-label text" for="comi_redsocial">Marque si el comité posee una red social</label>
                </div>
                <div class="col-12 p-0" v-show="selectComite.redsocial.show === true" >
                  <div class="d-flex flex-row align-items-center justify-content-between w-100">
                    <select class="w-25 custom-select" v-model="selectComite.redsocial.nombre">
                      <option value="Instagram" selected>Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                    </select>
                    <input class="w-70 position-relative" ref="redsocial" type="text" v-model="selectComite.redsocial.link" placeholder="Dirección de la red social">
                  </div>
                </div>
              </div>
              <div class="col-3 d-flex flex-column align-items-center justify-content-center p-1">
                <p class="text-center">Orden de importancia</p>
                <input type="number" class="w-75 custom-select p-1" v-model="selectComite.importancia.valor" @blur="importantComi(nuevoComite.importancia.valor)">
              </div>
            </div>
            <textarea type="text" class="info-form-c col-10" placeholder="Descripción" v-model="selectComite.descripcion" style="white-space: pre-wrap"></textarea>
            <input class="w-100 col-3 position-relative align-self-start" ref="vigencia" type="date" v-model="selectComite.fechav" placeholder="Fecha de vigencia">
            <div class="col-4">
              <div class="phones-input row justify-content-between align-items-center" v-for="index in cantFields.integrantes.numero" :key="index">
                  <div class="col-9 p-0 d-flex flex-row align-items-center justify-content-center">
                    <input class="position-relative" ref="integrantes" type="text" v-model="selectComite.integrantes[`${cantFields.integrantes.nombre}${index-1}`]" placeholder="Nombre">
                  </div>
                  <span @click="addField('select', index-1, 'integrantes')" :class="['icon p-0 add flaticon-add', (index-1 > 0)?'col-1':'col-3 pl-2']" v-if="index-1 === cantFields.integrantes.numero - 1"></span>
                  <span @click="deleteField('select', index-1, 'integrantes')" class="icon col-1 p-0 delete flaticon-minus" v-if="index-1 > 0 && index-1 === cantFields.integrantes.numero - 1"></span>
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
              Actualizar comité
            </div>
          </button>
          <button class="btn btn-danger mr-2 ml-2" @click.prevent="deleteCollection('select')">Borrar campos</button>
          <button class="btn btn-dark mr-2 ml-2" @click.prevent="regresar('section1', 'select')">Regresar</button>
        </div>
      </form>
    </section>

    <section class="translate" v-show="showCreate" id="section2" ref="section2">
      <form class="form-class d-flex flex-column justify-content-center align-items-center overflow-hidden">
        <div class="file-form">
          <!-- Inicio de la imagen -->
          <div class="row align-items-center justify-content-center p-1">
            <div class="col-12 row align-items-end justify-content-center p-0">
              <div class="col-3 align-items-center justify-content-center p-1">
                <div class="text text-center">
                  El tamaño de la imagen debe ser 360x285 px
                </div>
                <div class="input-files w-100 flex-column align-items-start p-1" style="display: flex;">
                  <div class="w-100 h-100 d-flex align-items-center position-relative">
                    <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                          <i class="flaticon-folder mr-3 d-none d-sm-block"></i>
                          <label for="collectionFiles">Imagen</label>
                        </div>
                        <input :ref='`file0`' @change="filesVerification($event, 0, 'crear')" class="collectionFiles"  type="file" accept="image/*">
                    </div>
                  </div>
                </div>
              <!-- PREV IMAGENES -->
              <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="nuevoComite.archivos.imagen.nombre !== undefined" style="display: flex;">
                <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                  <!-- MUESTRA DE IMAGEN -->
                  <div class="w-100 p-2 d-flex justify-content-end flex-column" style="min-height: 173px">
                    <div class="d-flex justify-content-center align-items-center" v-if="(dbImg[0] !== undefined)">
                      <img :src="(dbImg[0] === undefined)?'':(dbImg[0].url !== undefined)?dbImg[0].url:''" width="200" height="auto" style="min-height: 100px; min-width: 200px; ">
                    </div>
                    <div v-else class="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                      <p class="align-self-star ml-2" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevoComite.archivos.imagen.nombre}}</p>
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
              </div>
              <!--  Fin de IMAGENES -->
              <div class="col-3 align-items-center justify-content-center p-1">
                <div class="input-files  w-100 flex-column align-items-start p-1 pt-3" style="display: flex;">
                  <div class="w-100 h-100 d-flex align-items-center position-relative">
                    <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                          <i class="flaticon-folder mr-3 d-none d-sm-block"></i>
                          <label for="collectionFiles">Reglamento</label>
                        </div>
                        <input :ref='`file1`' @change="filesVerification($event, 1, 'crear')" class="collectionFiles"  type="file" accept=".pdf, .doc, .docx">
                    </div>
                  </div>
                </div>
                <!-- PREV IMAGENES -->
                <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="nuevoComite.archivos.reglamento.nombre !== undefined" style="display: flex;">
                  <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                    <!-- MUESTRA DE IMAGEN -->
                    <div class="w-100 h-100 m-2">
                      <div class="image w-100 h-100 d-flex flex-column align-items-center justify-content-center" >
                        <i class="icon flaticon-file" @click="openFile(nuevoComite.archivos.reglamento.url)"></i>
                        <p class="col-12 align-self-star ml-2 text-center" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevoComite.archivos.reglamento.nombre}}</p>
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
              </div>
              <!--  Fin de IMAGENES -->
              <div class="col-3 align-items-center justify-content-center p-1">
                <div class="input-files w-100 flex-column align-items-start p-1 pt-3" style="display: flex;">
                  <div class="w-100 h-100 d-flex align-items-center position-relative">
                    <div class="d-flex w-100 flex-column align-items-center justify-content-center">
                        <div class="button-files d-flex flex-row align-items-center justify-content-center bg-success w-100 p-2">
                          <i class="flaticon-folder mr-3 d-none d-sm-block"></i>
                          <label for="collectionFiles">Normativa</label>
                        </div>
                        <input :ref='`file1`' @change="filesVerification($event, 2, 'crear')" class="collectionFiles"  type="file" accept=".pdf, .doc, .docx">
                    </div>
                  </div>
                </div>
                <!-- PREV IMAGENES -->
                <div  class="uploadCont flex-row align-items-center w-100 mt-2" v-show="nuevoComite.archivos.normativa.nombre !== undefined" style="display: flex;">
                  <div :class="['prev-container','d-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'w-100', 'bg-success-light']">
                    <!-- MUESTRA DE IMAGEN -->
                    <div class="w-100 h-100 m-2">
                      <div class="image w-100 h-100 d-flex flex-column align-items-center justify-content-center" >
                        <i class="icon flaticon-file" @click="openFile(nuevoComite.archivos.normativa.url)"></i>
                        <p class="col-12 align-self-star ml-2 text-center" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{nuevoComite.archivos.normativa.nombre}}</p>
                      </div>
                      <!-- ICONO DE QUITAR -->
                      <div class="veri-box w-100 mt-2 d-flex flex-row justify-content-center align-items-center">
                        <button @click.prevent="deleteFile(2, 'crear')" class="btn btn-danger pt-1 pb-1 pr-2 pl-2">Eliminar</button>
                      </div>
                        <!-- FIN ICONO DE QUITAR -->
                      </div>
                      <!-- FIN MUESTRA DE IMAGEN -->
                      <!-- BARRA DE PROGRESO -->
                      <div class="progress w-85 mb-2" v-if="dbImg[2] !== undefined && dbImg[2] !== ''">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${(dbImg[2] !== undefined)?dbImg[2].uploadPercentage: ' '}%; height: 20px; min-height: 20px} !importan; color: black`"></div>
                      </div>
                      <!-- FIN BARRA DE PROGRESO -->
                    </div>
                  </div>
              </div>
              <!--  Fin de IMAGENES -->
            </div>
            <div class="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center p-0">
              <div class="col-12 col-md-3 align-self-start align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_activo" v-model="nuevoComite.activo">
                  <label class="custom-control-label text" for="comi_activo">Marque si el comité se encuentra actualmente activo</label>
                </div>
              </div>
              <div class="col-12 col-md-3 align-self-start align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_page" v-model="nuevoComite.comipage">
                  <label class="custom-control-label text" for="comi_page">Marque si el comité debe tener su propia página</label>
                </div>
              </div>
              <div class="col-12 col-md-3 align-self-start align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_int" v-model="nuevoComite.inthpage">
                  <label class="custom-control-label text" for="comi_int">Marque si desea que el comité aparezca en la página principal</label>
                  <i ref="info" @mouseenter="toggleInfo()" @mouseleave="toggleInfo()" class="icon info position-relative ml-1 flaticon-question">
                    <div class="info text position-absolute" style="left: -271px; top: auto; bottom: -370% !important; overflow: visible;">
                      Este campo estará desabilidato cuando existan un máximo de 4 elementos ya seleccionados.
                    </div>
                  </i>
                </div>
              </div>
            </div>
            <div class="col-12 d-flex flex-column flex-md-row  flex-wrap align-items-center justify-content-center p-0">
              <div class="col-9 col-sm-3 align-items-center justify-content-center p-1">
                <div class="w-100 d-flex align-items-center justify-content-center">
                  <input class="w-100 position-relative" ref="nombre" type="text" v-model="nuevoComite.nombre" placeholder="Nombre">
                </div>
              </div>
              <div class="col-9 col-sm-3 align-items-center justify-content-center p-1">
                <div class="w-100 d-flex align-items-center justify-content-center">
                  <input :class="['position-relative', validEmail(nuevoComite.correo)?'':'error']" ref="coreo" type="text" v-model="nuevoComite.correo" placeholder="Correo (Ej. ejemplo@direccion.com)">
                  <div class="important-field" v-show="showCreate && !validEmail(nuevoComite.correo)"></div>
                </div>
              </div>
              <div class="col-9 col-sm-3 align-items-center justify-content-center p-1">
                <input class="w-100 position-relative" ref="ci" type="text" v-model="nuevoComite.costos" placeholder="Costos">
              </div>
              <div class="col-7 d-flex flex-column align-items-center justify-content-center p-1">
                <div class="custom-control custom-switch d-flex align-items-center justify-content-center">
                  <input type="checkbox" class="custom-control-input" id="comi_redsocial" v-model="nuevoComite.redsocial.show">
                  <label class="custom-control-label text" for="comi_redsocial">Marque si el comité posee una red social</label>
                </div>
                <div class="col-12 p-0" v-show="nuevoComite.redsocial.show === true" >
                  <div class="d-flex flex-row align-items-center justify-content-between w-100">
                    <select class="w-25 custom-select" v-model="nuevoComite.redsocial.nombre">
                      <option value="Instagram" selected>Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                    </select>
                    <input class="w-70 position-relative" ref="redsocial" type="text" v-model="nuevoComite.redsocial.link" placeholder="Dirección de la red social">
                  </div>
                </div>
              </div>
              <div class="col-3 d-flex flex-column align-items-center justify-content-center p-1">
                <p class="text-center">Orden de importancia</p>
                <input type="number" class="w-75 custom-select p-1" v-model="nuevoComite.importancia.valor" @blur="importantComi(nuevoComite.importancia.valor)">
              </div>
            </div>
            <textarea type="text" class="info-form-c col-10" placeholder="Descripción" v-model="nuevoComite.descripcion"></textarea>
            <input class="w-100 col-3 position-relative align-self-start" ref="vigencia" type="date" v-model="nuevoComite.fechav" placeholder="Fecha de vigencia">
            <div class="col-4">
              <div class="phones-input row justify-content-between align-items-center" v-for="index in cantFields.integrantes.numero" :key="index">
                  <div class="col-9 p-0 d-flex flex-row align-items-center justify-content-center">
                    <input class="position-relative" ref="integrantes" type="text" v-model="nuevoComite.integrantes[`${cantFields.integrantes.nombre}${index-1}`]" placeholder="Nombre">
                  </div>
                  <span @click="addField('crear', index-1, 'integrantes')" :class="['icon p-0 add flaticon-add', (index-1 > 0)?'col-1':'col-3 pl-2']" v-if="index-1 === cantFields.integrantes.numero - 1"></span>
                  <span @click="deleteField('crear', index-1, 'integrantes')" class="icon col-1 p-0 delete flaticon-minus" v-if="index-1 > 0 && index-1 === cantFields.integrantes.numero - 1"></span>
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
              Crear comité
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
    name: 'AdminComites',
    data(){
      return {
        cantFields:{
          integrantes: {
            numero: 1,
            nombre: 'integrantes',
          },
        },
        show: false,
        message: {},
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
        indexSelected: '',
        selectComite: '',
        nuevoComite: {
          activo: false,
          comipage: false,
          correo: '',
          costos: '',
          descripcion: '',
          fechav: '',
          inthpage: false,
          integrantes: [],
          nombre: '',
          importancia: {
            valor: '',
            cambiar: {
              show: false,
              comiCambio: '',
              valor: '',
            },
            error: '',
          },
          redsocial: {
            show:false,
            nombre: '',
            direccion: '',
          },
          archivos:{
            imagen: '',
            reglamento: '',
            normativa: '',
          },
        },
        sortArray: {},
      }
    },

    computed:{
      ...mapState(['editContent', 'successUpload', 'dbWeb', 'deletingVal', 'deletingIndex', 'cargarDB', 'crearDBVals', 'dbImg']),
      getFirstAvaImportOrder(){
        let count = 0;
        for(let i = 1; i <= Object.values(this.dbWeb.Comites).length; i++){
          for(let j = 0; j < Object.values(this.dbWeb.Comites).length; j++){
            if(Object.values(this.dbWeb.Comites)[j].comi_importancia === undefined || Object.values(this.dbWeb.Comites)[j].comi_importancia !== undefined && Object.values(this.dbWeb.Comites)[j].comi_importancia !== i){
              count++;
            }
          }
          if(count === Object.values(this.dbWeb.Comites).length){
            return i
          }else{
            count = 0;
          }
        }
      },
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

          this.indexSelected = this.sortArray[index].comi_id;

          this.cantFields.integrantes.numero = Object.values(this.sortArray[index].comi_integrantes).length;

          this.$set(this, 'selectComite', {
            id: this.sortArray[index].comi_id,
            activo: this.sortArray[index].comi_activo,
            comipage: this.sortArray[index].comi_comiPage,
            correo: this.sortArray[index].comi_correo,
            costos: this.sortArray[index].comi_costos,
            descripcion: this.sortArray[index].comi_descripcion,
            fechav: this.sortArray[index].comi_fechavigencia,
            inthpage: this.sortArray[index].comi_int,
            integrantes: this.sortArray[index].comi_integrantes,
            nombre: this.sortArray[index].comi_nombre,
            archivos:{
              imagen: this.sortArray[index].comi_foto,
              reglamento: this.sortArray[index].comi_reglamento,
              normativa: this.sortArray[index].comi_normativa,
            },
          })

          if(this.sortArray[index].comi_importancia === undefined || this.sortArray[index].comi_importancia === ''){
            this.$set(this.selectComite, 'importancia', {
              valor: this.getFirstAvaImportOrder,
              cambiar: {
                show: false,
                comiCambio: '',
                valor: '',
              },
              error: '',
            })
          }else{
            this.$set(this.selectComite, 'importancia', {
              valor: this.sortArray[index].comi_importancia,
              cambiar: {
                show: false,
                comiCambio: '',
                valor: '',
              },
              error: '',
            })
          }

          if(this.sortArray[index].comi_redsocial === undefined){
            this.$set(this.selectComite, 'redsocial', {
              show: false,
              nombre: 'Instagram',
              direccion: '',
            })
          }else{
            this.$set(this.selectComite, 'redsocial', {
              show: this.sortArray[index].comi_redsocial.show,
              nombre: this.sortArray[index].comi_redsocial.nombre,
              direccion: this.sortArray[index].comi_redsocial.direccion,
            }) 
          }
        }, 900);
        setTimeout(() => {
          this.$refs.section1.classList.toggle('translate')
          const comiintedit = document.getElementById('comi_int_edit');
          comiintedit.addEventListener('change', ()=>{
            if(this.selectComite.inthpage === true){
              this.selectComite.inthpage = this.validCant('appears', this.dbWeb.Comites, 'comi_int', true, 4)
            }
          })
        }, 950);
      },
      sortBy(value){
        this.sortArray = Object.values(this.dbWeb.Comites).sort((a, b) => parseFloat(a[`comi_${value}`]) - parseFloat(b[`comi_${value}`]));
      },
      deleteFile(index, val){
        if(val === 'crear'){
          if(index === 0){
            this.nuevoComite.archivo.imagen = '';
          }else if(index === 1){
            this.nuevoComite.archivo.reglamento = '';
          }else if(index === 2){
            this.nuevoComite.archivo.normativa = '';
          }
          delete this.files[`archivo${index}`];
          this.resetDBValues(index);
        }else if(val === 'select'){
          if(index === 0){
            this.selectComite.archivo.imagen = '';
          }else if(index === 1){
            this.selectComite.archivo.reglamento = '';
          }else if(index === 2){
            this.selectComite.archivo.normativa = '';
          }
          delete this.files[`archivo${index}`];
          this.resetDBValues(index);
        }
      },
      deleteCollection(value){
        for(let i = 0; i < Object.values(this.cantFields).length; i++){
          Object.values(this.cantFields)[i].numero = 1;
        }
        if(value === 'crear'){
          this.nuevoComite = {
            activo: false,
            comipage: false,
            correo: '',
            costos: '',
            descripcion: '',
            fechav: '',
            inthpage: false,
            integrantes: [],
            nombre: '',
            importancia: {
              valor: '',
              cambiar: {
                show: false,
                comiCambio: '',
                valor: '',
              },
              error: '',
            },
            redsocial: {
              show: false,
              nombre: 'Instagram',
              direccion: '',
            },
            archivos:{
              imagen: '',
              reglamento: '',
              normativa: '',
            }
          }
        }else if(value === 'select'){
          this.selectComite = {
            activo: false,
            comipage: false,
            correo: '',
            costos: '',
            descripcion: '',
            fechav: '',
            inthpage: false,
            integrantes: [],
            nombre: '',
            importancia: {
              valor: '',
              cambiar: {
                show: false,
                comiCambio: '',
                valor: '',
              },
              error: '',
            },
            redsocial: {
              show: false,
              nombre: 'Instagram',
              direccion: '',
            },
            archivos:{
              imagen: '',
              reglamento: '',
              normativa: '',
            }
          }
        }

        this.files = {};
        this.resetDBValues();
      },
      validEmail(target){
        const exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(exp.test(target) || target === ''){
          return true
        }else{
          return false
        }
      },
      validCant(tipo, ref, busqueda, valor, top){
        if(tipo === 'appears'){
          let count = 0;
          Object.values(ref).forEach(element => {
            if(element[`${busqueda}`] === valor){
              count ++;
            }
          })
          
          if(count === top){
            this.message = {
              message: 'La página principal acepta un máximo de 4 comités para mostrar. Para cambiar los comités que aparecerán en la página principal, deshabilite la opción de "Marque si desea que el comité aparezca en la página principal" en alguno de los comité que posee la opción marcada, guarde los cambios y habilite la opción en el comité que desee.',
              title: 'ERROR',
            }
            $('#exampleModal').modal('show');
            return false
          }else{
            return true
          }
        }
      },
      validAllFields(value){
        let txt = '';
        if(value === 'crear'){
          txt = 'nuevo';
        }else if(value === 'select'){
          txt = 'select'
        }

        if(this.validEmail(this[`${txt}Comite`].correo)){
          return true
        }else{
          return false
        }
      },
      submitCollection(value){
        if(this.validAllFields(value)){
          
          if(value === 'crear'){
            if(this.nuevoComite.archivos.reglamento.nombre !== undefined){
              this.nuevoComite.archivos.reglamento.nombre = `reglamento_${this.nuevoComite.nombre.split(' ').join('_')}`;
            }

            if(this.nuevoComite.archivos.normativa.nombre !== undefined){
              this.nuevoComite.archivos.normativa.nombre = `normativa_${this.nuevoComite.nombre.split(' ').join('_')}`;
            }

            if(this.nuevoComite.archivos.imagen.nombre !== undefined){
              this.nuevoComite.archivos.imagen.nombre = this.nuevoComite.nombre.split(' ').join('_');
            }

            let dataTransfer = {
              archivos: this.files,
              comite: {
                activo: this.nuevoComite.activo,
                comipage: this.nuevoComite.comipage,
                correo: this.nuevoComite.correo,
                costos: this.nuevoComite.costos,
                descripcion: this.nuevoComite.descripcion,
                fechav: this.nuevoComite.fechav,
                inthpage: this.nuevoComite.inthpage,
                nombre: this.nuevoComite.nombre,
                importancia: this.nuevoComite.importancia,
                redsocial: {
                  show: this.nuevoComite.redsocial.show,
                  nombre: this.nuevoComite.redsocial.nombre,
                  direccion: this.nuevoComite.redsocial.direccion,
                },
                archivos:{
                  imagen: this.nuevoComite.archivos.imagen,
                  reglamento: this.nuevoComite.archivos.reglamento,
                  normativa: this.nuevoComite.archivos.normativa,
                },
              },
              target: 'Comites',
            };

            if(Object.values(this.nuevoComite.integrantes).length === 0){
              dataTransfer.comite.integrantes = '';
            }else{
              dataTransfer.comite.integrantes = this.nuevoComite.integrantes;
            }

            this.crearDB(dataTransfer)

          }else if(value ==='select'){

            if(this.selectComite.archivos.reglamento.nombre !== undefined){
              this.selectComite.archivos.reglamento.nombre = `reglamento_${this.selectComite.nombre.split(' ').join('_')}`;
            }

            if(this.nuevoComite.archivos.normativa.nombre !== undefined){
              this.nuevoComite.archivos.normativa.nombre = `normativa_${this.selectComite.nombre.split(' ').join('_')}`;
            }

            if(this.selectComite.archivos.imagen.nombre !== undefined){
              this.selectComite.archivos.imagen.nombre = this.selectComite.nombre.split(' ').join('_')
            };

            let dataTransfer = {
              archivos: this.files,
              comite: {
                activo: this.selectComite.activo,
                comipage: this.selectComite.comipage,
                correo: this.selectComite.correo,
                costos: this.selectComite.costos,
                descripcion: this.selectComite.descripcion,
                fechav: this.selectComite.fechav,
                inthpage: this.selectComite.inthpage,
                nombre: this.selectComite.nombre,
                id: this.selectComite.id,
                importancia: this.selectComite.importancia,
                redsocial: {
                  show: this.selectComite.redsocial.show,
                  nombre: this.selectComite.redsocial.nombre,
                  direccion: this.selectComite.redsocial.direccion,
                },
                archivos:{
                  imagen: this.selectComite.archivos.imagen,
                  reglamento: this.selectComite.archivos.reglamento,
                  normativa: this.selectComite.archivos.normativa,
                },
              },
              target: 'Comites',
            };

            if(Object.values(this.selectComite.integrantes).length === 0){
              dataTransfer.comite.integrantes = '';
            }else{
              dataTransfer.comite.integrantes = this.selectComite.integrantes;
            }
            
            this.updateDB(dataTransfer)
          }else{
          this.error = 'Los campos marcados con * son obligatorios'
          }
        }
      },
      filesVerification(event, val, val2){

        let files = event.target.files[0];

        this.files[`archivo${val}`] = event.target.files[0];

        this.files[`archivo${val}`].id = val

        if(val2 === 'crear'){
          if(val === 0){
            this.nuevoComite.archivos.imagen = [];
            this.nuevoComite.archivos.imagen = {
              nombre: files.name,
              url: '',
              id: val,
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }else if(val === 1){
            this.nuevoComite.archivos.reglamento = [];
            this.nuevoComite.archivos.reglamento = {
              nombre: files.name,
              url: '',
              id: val,
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }else if(val === 2){
            this.nuevoComite.archivos.normativa = [];
            this.nuevoComite.archivos.normativa = {
              nombre: files.name,
              url: '',
              id: val,
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }
        }else if(val2 === 'select'){
          if(val === 0){
            this.selectComite.imagen = [];
            this.$set(this.selectComite.archivos, `imagen`, {
              nombre: files.name,
              url: '',
              id: val,
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            });
          }else if(val === 1){
            this.selectComite.archivos.reglamento = [];
            this.selectComite.archivos.reglamento = {
              nombre: files.name,
              url: '',
              id: val,
              uploadPercentage: 0,
              progressBar: {
                show: true,
              },
            }
          }else if(val === 2){
            this.selectComite.archivos.normativa = [];
            this.selectComite.archivos.normativa = {
              nombre: files.name,
              url: '',
              id: val,
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
            ref: 'Comites',
            idSt: this.sortArray[index].comi_id,
            idDb: this.sortArray[index].comi_id,
            index: index,
            storage: true,
          };


          this.deleteItem(dataTransfer)
        }
      },
      addField(val, index, val2){
        if(val === 'crear'){
          if(this.nuevoComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`] !== undefined && this.nuevoComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`] !== ''){
            this.cantFields[`${val2}`].numero++;
          }else{
            this.error = 'Primero debe registrar el integrante en la casilla vacía'
          }
        }else{
          if(this.selectComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`] !== undefined && this.selectComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`] !== ''){
            this.cantFields[`${val2}`].numero++;
          }else{
            this.error = 'Primero debe registrar el integrante en la casilla vacía'
          }
        }
      },
      deleteField(val, index, val2){
        if(val === 'crear'){
          this.nuevoComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`] = '';
          delete this.nuevoComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`];
          this.cantFields[`${val2}`].numero --;
        }else{
          this.selectComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`] = '';
          delete this.selectComite.integrantes[`${this.cantFields[`${val2}`].nombre}${index}`];
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
        this.nuevoComite.importancia.valor = Object.values(this.dbWeb.Comites).length+1;  
        setTimeout(() => {
          this.showList = false;
          this.showCreate = true;
          const comiint = document.getElementById('comi_int');
          comiint.addEventListener('change', ()=>{
            if(this.nuevoComite.inthpage === true){
              this.nuevoComite.inthpage = this.validCant('appears', this.dbWeb.Comites, 'comi_int', true, 4)
            }
          })
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
            this.indexSelected = '';
          }
        }, 900);
        setTimeout(() => {
          this.$refs.section0.classList.toggle('translate')
        }, 950);
      },
      listDisplay(value){
        if(this.dbWeb.Comites !== undefined){
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
      importantComi(index){
        for(let i = 0; i < Object.values(this.dbWeb.Comites).length; i++){
          if(Object.values(this.dbWeb.Comites)[i].comi_importancia !== undefined && index === Object.values(this.dbWeb.Comites)[i].comi_importancia.toString()){
            if(this.selectComite !== ''){
              if(this.selectComite.id !== Object.values(this.dbWeb.Comites)[i].comi_id){
                this.selectComite.importancia.error = `El ${Object.values(this.dbWeb.Comites)[i].comi_nombre} ya posee este número. Si desea que el comité que se está editando actualmente tenga el número ${index}, guarde o actualice los cambios y se cambiará el valor del ${Object.values(this.dbWeb.Comites)[i].comi_nombre} automáticamente`;
                this.selectComite.importancia.cambiar.comiCambio = Object.values(this.dbWeb.Comites)[i].comi_id;
                if(this.dbWeb.Comites[this.indexSelected].comi_importancia !== undefined){
                  this.selectComite.importancia.cambiar.valor = this.dbWeb.Comites[this.indexSelected].comi_importancia;
                }else{
                  this.selectComite.importancia.cambiar.valor = this.getFirstAvaImportOrder;
                }
                this.selectComite.importancia.cambiar.show = true;

                this.message = {
                  message: `El ${Object.values(this.dbWeb.Comites)[i].comi_nombre} ya posee este número. Si desea que el comité que se está editando actualmente tenga el número ${index}, guarde o actualice los cambios y se cambiará el valor del ${Object.values(this.dbWeb.Comites)[i].comi_nombre} automáticamente`,
                  title: 'Número de orden ya usado',
                }
                $('#exampleModal').modal('show');
  
              }else{
                this.selectComite.importancia.error = '';
                this.selectComite.importancia.cambiar.comiCambio = '';
                this.selectComite.importancia.cambiar.valor = '';
                this.selectComite.importancia.cambiar.show = false;

                return
              }
            }else{
              this.nuevoComite.importancia.error = `El ${Object.values(this.dbWeb.Comites)[i].comi_nombre} ya posee este número. Si desea que el comité que se está editando actualmente tenga este número,guarde o actualice los cambios y se cambiará el valor del ${Object.values(this.dbWeb.Comites)[i].comi_nombre} automáticamente`;
              this.nuevoComite.importancia.cambiar.comiCambio = Object.values(this.dbWeb.Comites)[i].comi_id;
              this.nuevoComite.importancia.cambiar.valor = Object.values(this.dbWeb.Comites).length + 1;
              this.nuevoComite.importancia.cambiar.show = true;

              this.message = {
                message: `El ${Object.values(this.dbWeb.Comites)[i].comi_nombre} ya posee este número. Si desea que el comité que se está editando actualmente tenga el número ${index}, guarde o actualice los cambios y se cambiará el valor del ${Object.values(this.dbWeb.Comites)[i].comi_nombre} automáticamente`,
                title: 'Orden de importancia ya usado',
              }
              $('#exampleModal').modal('show');
              return
            }
          }
        }

        if(this.selectComite !== ''){          
          this.selectComite.importancia.error = '';
          this.selectComite.importancia.cambiar.comiCambio = '';
          this.selectComite.importancia.cambiar.valor = '';
          this.selectComite.importancia.cambiar.show = false;

          return
        }else{
          this.nuevoComite.importancia.error = '';
          this.nuevoComite.importancia.cambiar.comiCambio = '';
          this.nuevoComite.importancia.cambiar.valor = '';
          this.nuevoComite.importancia.cambiar.show = false;

          return
        }
      },
    },

    created(){
      this.changeSecTitle('Comités');
    },

    mounted(){

      this.getData().then(()=>{
        this.listDisplay();
        this.show = true;
        this.sortBy('importancia');
      })

      this.deleteCollection('crear');

      if(this.dbWeb.Comites !== undefined && Object.values(this.dbWeb.Comites).length/this.numElements > 1){
        this.number = Math.ceil(Object.values(this.dbWeb.Comites).length/this.numElements);
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
        if(this.deletingVal !== null && this.dbWeb.Comites !== undefined && Object.values(this.dbWeb.Comites).length - 1 === 0){
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
              this.sortBy('importancia');
              try{
              if(this.dbWeb.Comites !== undefined){
                if(Object.values(this.dbWeb.Comites).length/this.numElements > 1){
                  this.number = Math.ceil(Object.values(this.dbWeb.Comites).length/this.numElements);
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