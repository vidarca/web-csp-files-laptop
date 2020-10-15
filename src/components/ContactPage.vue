<template>
  <div id="contact" class="mih">
    <div class="w-95 m-auto">
      <h1 class="w-100 text-center border-bottom" style="padding: 40px 0 20px 0;">Contacto</h1>
    </div>
    <h4 class="w-75 text-center m-auto" style="padding: 20px 0 60px 0;">No dudes en escribirnos a cualquiera de nuestras redes, correos o teléfonos, responderemos a la brevedad</h4>
    <div class="d-flex flex-column flex-md-row justify-content-center align-items-center w-75 m-auto" style="padding-bottom: 60px;">
      <form class="col-md-6 p-1 d-flex flex-column align-items-center justify-content-center">
        <div class="form-group w-100 d-flex flex-row align-items-center justify-content-center">
          <input type="text" name="name" placeholder="Nombre" v-model="form.nombre">
          <div class="important-field" v-show="!validEmpty(form.nombre)"></div>
        </div>
        <div class="form-group w-100 d-flex flex-row align-items-center justify-content-center">
          <input type="email" name="email" placeholder="Correo (Ej. ejemplo@direccion.com)" v-model="form.email">
          <div class="important-field" v-show="!validEmail(form.email)"></div>
        </div>
        <div class="form-group w-100 d-flex flex-row align-items-center justify-content-center">
          <textarea name="texto" v-model="form.texto"></textarea>
          <div class="important-field" v-show="!validEmpty(form.texto)"></div>
        </div>
        <div class="w-100">
          <button :class="['btn', (response.status === null)?'btn-dark':(response.status === false)?'btn-danger-light box-shadow-none cursor-normal':'btn-success-light box-shadow-none cursor-normal']" @click.prevent="sendMail()">
            <div class="spinner-border text-light" v-if="sending === true" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
              <transition name="fade" mode="out-in">
                <div v-if="response.status === true" key="text1">{{response.value}}</div>
                <div v-else-if="response.status === false" key="text2">{{response.value}}</div>
                <div v-else key="text3">Enviar correo</div>
              </transition>
            </div>
          </button>
        </div>
      </form>
      <div class="col-md-6 p-1 d-flex flex-column align-items-center justify-content-center">
        <div class="p-1 mt-2 mb-2 d-flex align-items-center justify-content-between w-75 w-lg-50" style="height: 60px !important;">
          <i class="icon flaticon-location-pin" style="min-width: 50px !important; max-width: 50px !important"></i>
          <div class="text-center w-75" v-for="dir in Object.values(dbWeb.Miscellaneous)[0].misc_direccion" :key="dir">{{dir}}</div>
        </div>
        <div class="p-1 mt-2 mb-2 d-flex align-items-center justify-content-between w-75 w-lg-50" style="height: 60px !important;">
          <i class="icon flaticon-phone-call" style="min-width: 50px !important; max-width: 50px !important"></i>
          <div class="w-75 ml-3" v-for="telf in Object.values(dbWeb.Miscellaneous)[0].misc_telefonos" :key="telf">
            <a class="text w-100 text-center" :href="`tel: ${telf}`">{{telf}}</a>
          </div>
        </div>
        <div class="p-1 mt-2 mb-2 d-flex align-items-center justify-content-between w-75 w-lg-50" style="height: 60px !important;">
          <i class="icon flaticon-email" style="min-width: 50px !important; max-width: 50px !important"></i>
          <div class="w-75 ml-3" v-for="mail in Object.values(dbWeb.Miscellaneous)[0].misc_correos" :key="mail">
            <a class="text text-center " :href="`mailto: ${mail}`">{{mail}}</a>
          </div>
        </div>
        <div class="w-75">
          <div class="border-bottom"></div>
        </div>
        <div class="w-75 mt-2 mb-2 d-flex flex-row align-items-center justify-content-center">
          <a :href="red.link" target="blank" :class="['icon ml-2 mr-2', `${index}`, selectIcon(index)]" v-for="(red, index) in Object.values(dbWeb.Miscellaneous)[0].misc_redes" :key="index" v-show="red.activo === true">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios';
import vueAxios from 'vue-axios';

export default {
    name: 'ContactPage',

    data(){
      return{
        form: {
          email: '',
          nombre: '',
          texto: '',
        },
        sending: false,
        response: {
          status: null,
          value: '',
        }
      }
    },

    components: {
    },
    computed:{
		  ...mapState(['dbWeb'])
	  },
    methods:{
      sendMail(){
        if(this.response.status === null){
          if(this.validAllFields()){
            this.sending = true;
            axios.post('http://localhost:3000/send-email', {
              form: this.form
            }).then(response => {
              if(response.status === 200){
                setTimeout(() => {
                  this.sending = false;
                  this.response.status = true;
                  this.response.value = "Se ha enviado exitosamente"
                }, 1000);
                return 
              }
              setTimeout(() => {
                this.sending = false;
                this.response.status = false;
                this.response.value = "Ha ocurrido un error, intente nuevamente"
                return        
              }, 1000);
            })
          }else{
            this.response.status = false;
            this.response.value = "Todos los campos marcados con * son obligatorios"
          }
        }
      },
      validAllFields(){
        if(this.validEmail(this.form.email) && this.validEmpty(this.form.nombre) && this.validEmpty(this.form.texto)){
          return true
        }else{
          return false
        }
      },
      validEmail(target){
        const exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(exp.test(target)){
          return true
        }else{
          return false
        }
      },
      validEmpty(target){
        if(target === ''){
          return false
        }else{
          return true
        }
      },
      selectIcon(value){
        if(value === "facebook"){
          return 'flaticon-facebook'
        }else if(value === "instagram"){
          return 'flaticon-instagram'
        }else if(value === 'twitter'){
          return 'flaticon-twitter'
        }
      }
    },

    watch:{
      "response.status"(){
        if(this.response.status !== null){
          setTimeout(() => {
            if(this.response.status === true){
              this.form.email = '';
              this.form.nombre = '';
              this.form.texto = '';
            }
            this.response.status = null;
            this.response.value = '';
          }, 2000);
        }
      },
    },

    mounted(){
    }
}
</script>

<style scoped>
  button{
    transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
    transition-delay: 0.3s;
  }

  .icon{
    position: relative;
    width: 50px !important;
    height: 50px !important;
  }

  .icon::before{
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    color: white;
    border-radius: 50%;
    background-color: black;
    box-shadow: 0 0 8px rgba(0,0,0,.7);
    transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  .flaticon-location-pin::before{
    padding-left: 8px;
  }

  a{
    transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -webkit-transition: all .2s ease;
  }

  a:hover{
    color:  #FE5D25;
  }

  a.icon.facebook:hover::before{
    background-color: rgba(24, 119, 242);
  }

  a.icon.twitter:hover::before{
    background-color: rgba(29, 161, 242);
  }

  a.icon.instagram:hover::before{
    background-color: rgba(212, 47, 138);
  }
</style>