<template>
  <div id="admin-edit">
      <form @submit.prevent="isUserDiff(userVal)">
        <div class="v-admin-username w-100">
          <p class="title-text">NOMBRE DE USUARIO</p>
          <div class="v-admin-namevalues w-100">
            <input class="v-input-text" id="name" type="text" v-model="user.name" :placeholder="user.name?user.name:'Nombre'"> 
            <input class="v-input-text" id="last-name" type="text" v-model="user.apellido" :placeholder="user.apellido?user.apellido:'Apellido'">
          </div>
        </div>
        <div class="v-admin-userrank">
          <p class="title-text">CARGO</p>
          <div class="v-admin-rankvalues">
            <input class="v-input-text w-100" type="text" v-model="user.cargo" :placeholder="user.cargo?user.cargo:'Cargo'">
          </div>
        </div>
        <div class="v-admin-useremail">
          <p class="title-text">CORREO ELECTRÓNICO</p>
          <div class="v-admin-emailvalues">
            <input class="v-input-text w-100" type="text" v-model="user.correo" :placeholder="user.correo?user.correo:'Correo'">
          </div>
        </div>
        <button class="btn btn-success mt-5 float-right">Salvar cambios</button>
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
    }
  },

  computed:{
    ...mapState(['user']),
  },

  methods:{
    ...mapMutations(['isUserDiff', 'setRefUser']),
  },

  mounted(){
    /* setTimeout(() => {
      if(this.user){
        const splittedName = this.user.displayName.split('|');
        if(this.user.displayName && splittedName[0]){
          this.userVal.name[0] = splittedName[0]
          this.userVal.name[1] = splittedName[1]
        }else if(this.user.displayName){
          this.userVal.name = this.user.displayName.split(' ');
        }

        this.userVal.email = this.user.email;

        if(this.user.displayName && splittedName[2]){
          this.userVal.rank = splittedName[2]
        }
        this.loader = true
      }
    }, 500); */
  },

}
</script>

<style scoped>

.title-text{
  font-size: 15px;
  font-weight: bold;
  margin: 15px 0 0 0;
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

</style>