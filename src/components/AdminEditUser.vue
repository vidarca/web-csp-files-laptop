<template>
  <div id="admin-edit" v-if="loader">
      <form @submit.prevent="isUserDiff(userVal)">
        <div class="v-admin-username w-100">
          <p class="title-text">NOMBRE DE USUARIO</p>
          <div class="v-admin-namevalues w-100">
            <input class="v-input-text" id="name" type="text" v-model="userVal.name[0]" :placeholder="userVal.name[0]?userVal.name[0]:'Nombre'"> 
            <input class="v-input-text" id="name" type="text" v-model="userVal.name[1]" :placeholder="userVal.name[1]?userVal.name[1]:'Apellido'">
          </div>
        </div>
        <div class="v-admin-userrank">
          <p class="title-text">CARGO</p>
          <div class="v-admin-rankvalues">
            <input class="v-input-text w-100" type="text" v-model="userVal.rank" :placeholder="userVal.rank?userVal.rank:'Cargo'">
          </div>
        </div>
        <div class="v-admin-useremail">
          <p class="title-text">CORREO ELECTRÓNICO</p>
          <div class="v-admin-emailvalues">
            <input class="v-input-text w-100" type="text" v-model="userVal.email" :placeholder="userVal.email?userVal.email:'Correo'">
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
      loader: false,
    }
  },

  computed:{
    ...mapState(['user']),
  },

  methods:{
    ...mapMutations(['isUserDiff', 'setRefUser']),
  },

  mounted(){
    setTimeout(() => {
      if(this.user){
        const splittedName = this.user.displayName.split('|');
        if(this.user.displayName && splittedName[0]){
          this.userVal.name[0] = splittedName[0]
          this.userVal.name[1] = splittedName[1]
          console.log(this.userVal.name[0]);
        }else if(this.user.displayName){
          this.userVal.name = this.user.displayName.split(' ');
        }

        this.userVal.email = this.user.email;

        if(this.user.displayName && splittedName[2]){
          this.userVal.rank = splittedName[2]
        }
        this.loader = true
      }
    }, 500);
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

.v-input-text#name{
  width: calc(100%/2 - 2*2px);
}

</style>