<template>
  <div id="admin-edit">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': errorUpload?'icon-err flaticon-close':''"></i> <p>{{error?error:successUpload?successUpload:errorUpload?errorUpload:''}}</p>
    </div>
      <form class="p-3" @submit.prevent="isUserDiff(tipo)">
        <div class="v-admin-username w-100">
          <p class="title-text">NOMBRE DE USUARIO</p>
          <div class="v-admin-namevalues w-100">
            <input class="v-input-text" id="name" type="text" v-model="user.nombre" :placeholder="user.nombre?user.nombre:'Nombre'"> 
            <input class="v-input-text" id="last-name" type="text" v-model="user.apellido" :placeholder="user.apellido?user.apellido:'Apellido'">
          </div>
        </div>
        <div class="v-admin-userrank d-flex flex-row align-items-center justify-content-center">
          <div class="d-flex w-100 flex-column justify-content-center align-items-center" style="margin: 2px;">
            <p class="title-text">CARGO</p>
            <div class="v-admin-rankvalues w-100">
              <input class="v-input-text w-100" type="text" v-model="user.cargo" :placeholder="user.cargo?user.cargo:'Cargo'">
            </div>
          </div>
          <div class="d-flex w-100 flex-column justify-content-center align-items-center" style="margin: 2px;">
            <p class="title-text">CORREO ELECTRÓNICO</p>
            <div class="v-admin-emailvalues w-100">
              <input class="v-input-text w-100" type="text" v-model="user.correo" :placeholder="user.correo?user.correo:'Correo'" disabled>
            </div>
          </div>
        </div>
        <div class="v-admin-nivelautori d-flex flex-row align-items-center justify-content-between">
          <div class="w-25" style="margin: 2px;">
            <p class="title-text">NIVEL DE AUTORIZACIÓN</p>
            <div class="v-checked-container">
              <div class="v-checked-selector text position-relative">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="masterautori" v-model="masterAutori" disabled>
                  <label class="custom-control-label text" for="masterautori">Nivel Master</label>
                </div>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="adminautori" v-model="adminAutori" disabled>
                  <label class="custom-control-label text" for="adminautori">Nivel Admin</label>
                </div>
              </div>
            </div>
          </div>
          <div class="v-admin-accion w-25">
            <div class="d-flex w-50  flex-column justify-content-center align-items-center" style="margin: 2px;">
              <p class="title-text">ACCIÓN</p>
              <div class="w-100">
                <input class="v-input-text w-100" type="text" v-model="user.accion" :placeholder="user.accion?user.accion:'Acción'">
              </div>
            </div>
          </div>
          <div class="v-admin-accion w-25">
            <div class="d-flex flex-column justify-content-center align-items-center" style="margin: 2px;">
              <p class="title-text">TELÉFONO</p>
              <div class="w-100">
                <input :class="['v-input-text w-100', validPhone(user.telefono)?'':'error']" v-model="user.telefono" :placeholder="(user.telefono === '')?'Teléfono (Ej. +581234567)':user.telefono">
              </div>
            </div>
          </div>
        </div>
        <div class="submit-button d-flex justify-content-end align-items-center">
          <button class="btn btn-success mt-5">
            <div v-if="actUser === true" class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <p v-else>
              Salvar cambios
            </p>
          </button>
        </div>
      </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'AdminEditUser',

  data(){
    return {
      userVal: {
        name: [
          '',
          ''
        ],
      },
      error: null,
      tipo: {
        tipo: '0'
      },
      masterAutori: false,
      adminAutori: false,
    }
  },

  computed:{
    ...mapState(['user', 'successUpload', 'errorUpload', 'actUser']),
  },

  methods:{
    ...mapMutations(['isUserDiff', 'setRefUser', 'successAdvise', 'changeSecTitle']),
    validPhone(target){
      const exp = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/g;
      if(exp.test(target) || target === ''){
        return true
      }else{
        return false
      }
    },
  },

  created(){
    this.changeSecTitle('Editar Perfil');
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
  },

  mounted(){
    if(this.user.autori === 'Master'){
      this.masterAutori = true;
    }

    if(this.user.autori === 'Admin'){
      this.adminAutori = true;
    }
  },
}
</script>

<style scoped>

#admin-edit form{
  margin: 10px 5px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
  box-shadow: 0 0 7px rgba(0,0,0,.5);
}

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

.btn.btn-success p{
  color: inherit;
  font-weight: inherit;
}

</style>