<template>
  <div id="admin-users" v-if="loader">
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
            <input class="w-75" type="email" :class="!validEmail?'error':' '" placeholder="Correo (Ej. ejemplo@direccion.com)" v-model="users.createUser.formUpload.correo">
            <div class="w-100 d-flex flex-row align-items-center justify-content-start">
              <input class="w-75" type="password" :class="!validPass?'error':' '" placeholder="Contraseña" v-model="users.createUser.formUpload.pass">
              <i ref="info" @mouseenter="toggleInfo()" @mouseleave="toggleInfo()" class="icon info position-relative flaticon-question">
                <div class="info text position-absolute">
                  La contraseña debe ser de un máximo de 15 caracteres y debe contener sólamente un(1) caracter especial ('*', '$', '#', '@', '!', '?') y, al menos, una letra mayúscula y un caracter numérico.
                </div>
              </i>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click.prevent="sendForm()">
              <div v-if="users.userRefer" class="spinner-border text-light" role="status">
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
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': errorUpload?'icon-err flaticon-close':''"></i> <p>{{error?error:successUpload?successUpload:errorUpload?errorUpload:''}}</p>
    </div>
    <section id="section1" class="w-100" v-show="Object.values(dbWeb.Usuarios)[0] !== undefined && showPrev === false" ref="section1">
      <div class="list-db w-auto">
        <div class="list-header w-100 d-flex flex-row align-items-center justify-content-between">
          <div>
            <h5>
              Lista de Usuarios
            </h5>
          </div>
          <button class="btn btn-success" data-toggle="modal" data-target="#createUser">
            Crear Usuario
          </button>
        </div>
        <div class="list-header w-100 row align-items-center justify-content-start">
          <div class="text col-3 pl-1 pr-1">
            Nombre
          </div>
          <div class="text col-3 pl-1 pr-1">
            Correo
          </div>
          <div class="text col-2 pl-1 pr-1">
            Acción
          </div>
          <div class="text col-2 pl-1 pr-1">
            Autorización
          </div>
          <div class="col-2 pl-1 pr-1">
          </div>
        </div>
        <ul class="list-item w-100 row align-items-center justify-content-start" v-for="(usuario, index) in Object.values(dbWeb.Usuarios)" :key="usuario.user_id" v-show="index < 10 + showIndex && index >= showIndex" ref="listElements">
          <li class="item-element text col-3 pl-1 pr-1">
            {{usuario.user_nombre}} {{usuario.user_apellido}}
          </li>
          <li class="item-element text col-3 pl-1 pr-1">
            {{usuario.user_correo}}
          </li>
          <li class="item-element text col-2 pl-1 pr-1">
            {{usuario.user_accion}}
          </li>
          <li class="item-element text col-2 pl-1 pr-1">
            {{usuario.user_autori}}
          </li>
          <li class="item-element text col-2 d-flex flex-sm-row flex-column justify-content-end align-items-center pl-sm-1 pr-sm-1">
            <i class="icon edit flaticon-edit mt-1 mb-1" title="Editar" @click="itemListSelected(index)"></i>
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
      </div>      
    </section>
    <section id="section2" class="translate p-3" v-show="showPrev" ref="section2">
      <form v-if="itemSelected !== ''">
        <div class="v-admin-username w-100">
          <p class="title-text">NOMBRE DE USUARIO</p>
          <div class="v-admin-namevalues w-100">
            <input class="v-input-text" id="name" type="text" v-model="dbWeb.Usuarios[`${itemSelected}`].user_nombre" :placeholder="dbWeb.Usuarios[`${itemSelected}`].user_nombre?dbWeb.Usuarios[`${itemSelected}`].user_nombre:'Nombre'"> 
            <input class="v-input-text" id="last-name" type="text" v-model="dbWeb.Usuarios[`${itemSelected}`].user_apellido" :placeholder="dbWeb.Usuarios[`${itemSelected}`].user_apellido?dbWeb.Usuarios[`${itemSelected}`].user_apellido:'Apellido'">
          </div>
        </div>
        <div class="v-admin-userrank d-flex flex-row align-items-center justify-content-center">
          <div class="d-flex w-100 flex-column justify-content-center align-items-center" style="margin: 2px;">
            <p class="title-text">CARGO</p>
            <div class="v-admin-rankvalues w-100">
              <input class="v-input-text w-100" type="text" v-model="dbWeb.Usuarios[`${itemSelected}`].user_cargo" :placeholder="dbWeb.Usuarios[`${itemSelected}`].user_cargo?dbWeb.Usuarios[`${itemSelected}`].user_cargo:'Cargo'">
            </div>
          </div>
          <div class="d-flex w-100 flex-column justify-content-center align-items-center" style="margin: 2px;">
            <p class="title-text">CORREO ELECTRÓNICO</p>
            <div class="v-admin-emailvalues w-100">
              <input class="v-input-text w-100" type="text" v-model="dbWeb.Usuarios[`${itemSelected}`].user_correo" :placeholder="dbWeb.Usuarios[`${itemSelected}`].user_correo?dbWeb.Usuarios[`${itemSelected}`].user_correo:'Correo'" disabled>
            </div>
          </div>
        </div>
        <div class="v-admin-nivelautori d-flex flex-row align-items-center justify-content-between">
          <div class="w-25" style="margin: 2px;">
            <p class="title-text">NIVEL DE AUTORIZACIÓN</p>
            <div class="v-checked-container">
              <div class="v-checked-selector text position-relative">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="masterautori" v-model="masterAutori">
                  <label class="custom-control-label text" for="masterautori">Nivel Master</label>
                </div>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="adminautori" v-model="adminAutori">
                  <label class="custom-control-label text" for="adminautori">Nivel Admin</label>
                </div>
              </div>
            </div>
          </div>
          <div class="v-admin-accion w-25">
            <div class="d-flex w-50  flex-column justify-content-center align-items-center" style="margin: 2px;">
              <p class="title-text">ACCIÓN</p>
              <div class="w-100">
                <input class="v-input-text w-100" type="text" v-model="dbWeb.Usuarios[`${itemSelected}`].user_accion" :placeholder="dbWeb.Usuarios[`${itemSelected}`].user_accion?dbWeb.Usuarios[`${itemSelected}`].user_accion:'Acción'">
              </div>
            </div>
          </div>
          <div class="v-admin-accion w-25">
            <div class="d-flex flex-column justify-content-center align-items-center" style="margin: 2px;">
              <p class="title-text">TELÉFONO</p>
              <div class="w-100">
                <input :class="['v-input-text w-100', validPhone(dbWeb.Usuarios[`${itemSelected}`].user_telefono)?'':'error']" v-model="dbWeb.Usuarios[`${itemSelected}`].user_telefono" :placeholder="(dbWeb.Usuarios[`${itemSelected}`].user_telefono === '')?'Teléfono (Ej. +581234567)':dbWeb.Usuarios[`${itemSelected}`].user_telefono">
              </div>
            </div>
          </div>
        </div>
        <div class="submit-button mt-5 w-100 d-flex flex-row align-items-center justify-content-end">
          <button class="btn btn-success mr-3" @click.prevent="actUserFunc()">
            <div v-if="actUser === true" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <p v-else>
              Salvar cambios
            </p>
          </button>
          <button class="btn btn-dark ml-3" @click.prevent="returnList()">
            Regresar
          </button>
        </div>
      </form>
    </section>  
  </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    name: 'AdminUsers',

    data(){
      return{
        error: null,
        showPrev: false,
        showSelect: false,
        number: 0,
        showIndex:0,
        numElements: 10,
        itemSelected: '',
        masterAutori: false,
        adminAutori: false,
        loader: false,
      }
    },

    computed:{
      ...mapState(['dbWeb', 'users', 'successUpload', 'secTitle', 'errorUpload', 'actUser', 'deletingIndex', 'deletingVal']),
      validEmail(){
        const exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(exp.test(this.users.createUser.formUpload.correo)){
          return true
        }else{
          return false
        }
      },
      validPass(){
        const exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
        if(exp.test(this.users.createUser.formUpload.pass)){
          return true
        }else{
          return false
        }
      },
    },

    methods:{
      ...mapMutations(['createUser', 'isUserDiff', 'successAdvise', 'changeSecTitle', 'resetContentValues']),
      ...mapActions(['getData']),
      filterChangeHandler(){
        if(this.$refs.anuncios !== undefined){
          const waiting = setInterval(() => {
            for(let i = 0; i < this.$refs.anuncios.children.length; i++) {
              if(this.$refs.anuncios.children[i].dataset.transitioned === 'true'){
                return false
              }else{
                this.filterChange()
                clearInterval(waiting)
              }
            }
          }, 100);
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
          if(element.dataset.index % 2 === 0){
            element.classList.toggle('translate');
          }else{
            element.classList.toggle('translate-left');
          }
        })
        setTimeout(() => {
          this.showIndex = this.numElements*(val-1);
        }, 700);
        setTimeout(() => {
          this.$refs.listElements.forEach(element => {
            element.dataset.transitioned = 'false';
            if(element.dataset.index % 2 === 0){
              element.classList.toggle('translate');
            }else{
              element.classList.toggle('translate-left');
            }
          })
        }, 800);
        this.$refs.innerContainer.children.forEach(element => {
          if(parseInt(element.children[0].id) !== val){
            element.children[0].classList.remove('active');
          }else if(parseInt(element.children[0].id) === val){
            element.children[0].classList.add('active');
          }
        })
      },
      itemListSelected(val){
        if(Object.values(this.dbWeb.Usuarios)[val].user_autori === 'Master'){
          this.masterAutori = true;
        }

        if(Object.values(this.dbWeb.Usuarios)[val].user_autori === 'Admin'){
          this.adminAutori = true;
        }

        this.$refs.section1.classList.toggle('translate');
        setTimeout(() => {
          this.showPrev = true;
          this.itemSelected = Object.values(this.dbWeb.Usuarios)[val].user_id;
        }, 700);
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.$refs.section2.classList.toggle('translate');
        }, 800);
      },
      returnList(){
        this.masterAutori = false;
        this.adminAutori = false;

        this.$refs.section2.classList.toggle('translate');
        setTimeout(() => {
          this.showPrev = false;
          this.itemSelected = '';
        }, 700);
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.$refs.section1.classList.toggle('translate');
        }, 800);
      },
      regresar(){
        this.$refs.section2.classList.toggle('translate');
        setTimeout(() => {
          this.showPrev = false;
          this.itemSelected = '';
        }, 700);
        setTimeout(() => {
        window.scrollTo(0, 0);
          this.$refs.section1.classList.toggle('translate');
        }, 800);
      },
      sendForm(){
        if(this.validType()){
          this.createUser()
        }else{
        }
      },
      validType(){
        if(this.validEmail && this.validPass){
          return true;
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
      actUserFunc(){
        if(this.validPhone(this.dbWeb.Usuarios[`${this.itemSelected}`].user_telefono) === true){
          const values = {
            id: this.itemSelected,
            correo: this.dbWeb.Usuarios[`${this.itemSelected}`].user_correo,
            correoVeri: this.dbWeb.Usuarios[`${this.itemSelected}`].user_correoVeri,
            accion: this.dbWeb.Usuarios[`${this.itemSelected}`].user_accion,
            telefono: this.dbWeb.Usuarios[`${this.itemSelected}`].user_telefono,
            nombre: this.dbWeb.Usuarios[`${this.itemSelected}`].user_nombre,
            apellido: this.dbWeb.Usuarios[`${this.itemSelected}`].user_apellido,
            activo: this.dbWeb.Usuarios[`${this.itemSelected}`].user_activo,
            fotoUrl: this.dbWeb.Usuarios[`${this.itemSelected}`].user_fotoUrl,
            cargo: this.dbWeb.Usuarios[`${this.itemSelected}`].user_cargo,
            tipo: '1',
          }
          if(this.masterAutori === true){
            values.autori = 'Master';
          }else if(this.adminAutori === true){
            values.autori = 'Admin';
          }else{
            values.autori = 'Normal';
          }
          
          this.isUserDiff(values)
        }else{
          this.error = 'Revise los campos'
        }
      },
      toggleInfo(){
        this.$refs.info.children[0].classList.toggle('show-info')
      },
    },

    watch:{
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
      errorUpload(){
        if(this.errorUpload !== null){
          this.$refs.alertBox.classList.add('alert-show')
          setTimeout(() => {
            try {
            this.$refs.alertBox.classList.remove('alert-show');}catch{}
          }, 3000);
          setTimeout(() => {
            const data = {
              0: 'errorUpload',
              1: null
            }
            this.successAdvise(data)
          }, 3600);
        }
      },
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
    },

    created(){
      this.changeSecTitle('Usuarios');
    },

    mounted(){
      
      this.getData().then(() => {
        this.loader = true;
      })
      
      const waiting = setTimeout(() => {
        if(this.loader === true){
          
          this.resetContentValues(3)
    
          if(Object.values(this.dbWeb.Usuarios).length/10 > 1){
            this.number = Math.ceil(Object.values(this.dbWeb.Usuarios).length/10);
            this.showSelect = true;
          }

          clearInterval(waiting)
        }
      }, 500);
    },
}
</script>

<style scoped>

  section{
    transition: all .9s ease;
    -moz-transition: all .9s ease;
    -o-transition: all .9s ease;
    -webkit-transition: all .9s ease;
  }

  section#section2{
    margin: 10px 5px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 5px;
    box-shadow: 0 0 7px rgba(0,0,0,.5);
  }

  .list-db{
    margin: 10px 5px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 5px;
    box-shadow: 0 0 7px rgba(0,0,0,.5);
  }

  .list-db h5{
    font-weight: bold;
  }

  .list-db .list-header{
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(215, 215, 215);
  }
  
  .list-db .list-header .text{
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-db .list-item{
    position: relative;
    width: 100%;
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
  }

  .modal-body input{
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 5px;
  }

  /* Parte de edicion de usuario */

  .title-text{
    font-size: 15px;
    font-weight: bold;
    margin: 15px 0 0 0;
    text-align: left;
    width: 100%;
  }

  .v-input-text{
    border: 0.5px solid rgba(54, 54, 54);
    border-radius: 0.5em;
    padding: 5px;
    margin: 2px;
  }

  .v-input-text#name, .v-input-text#last-name{
    width: calc(100%/2 - 2*2px);
  }

  .btn.btn-success{
    border: none;
  }

  .btn.btn-success p{
    color: inherit;
    font-weight: inherit;
  }
</style>