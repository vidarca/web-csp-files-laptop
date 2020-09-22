<template>
  <div id="admin-edit">
    <div class="alert-box position-fixed" ref="alertBox">
      <i :class="error?'icon-err flaticon-close':successUpload?'icon-succ flaticon-check': ' '"></i> <p>{{error?error:successUpload?successUpload:' '}}</p>
    </div>
      <form @submit.prevent="isUserDiff()">
        <div class="v-admin-username w-100">
          <p class="title-text">NOMBRE DE USUARIO</p>
          <div class="v-admin-namevalues w-100">
            <input class="v-input-text" id="name" type="text" v-model="user.name" :placeholder="user.name?user.name:'Nombre'"> 
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
              <input class="v-input-text w-100" type="text" v-model="user.correo" :placeholder="user.correo?user.correo:'Correo'">
            </div>
          </div>
        </div>
        <div class="submit-button">
          <button class="btn btn-success mt-5 float-right">
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
    }
  },

  computed:{
    ...mapState(['user', 'successUpload', 'actUser']),
  },

  methods:{
    ...mapMutations(['isUserDiff', 'setRefUser', 'successAdvise',]),
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
}
</script>

<style scoped>

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