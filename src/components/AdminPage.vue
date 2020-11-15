<template>
    <div id="admin-page">
    <div class="alert-box position-fixed" ref="alertBox">
      <i class="icon-err flaticon-close"></i> <p>{{error}}</p>
    </div>
    <div class="alert-box position-fixed" ref="alertBoxSucc">
      <i class="icon-succ flaticon-check"></i> <p>{{succ}}</p>
    </div>
        <div class="v-wrapper">
            <div class="v-container">
                <h4>{{ title }}</h4>
                <form>
                    <input type="email" :class="!validEmail?'error':' '" placeholder="Correo" v-model="form.email">
                    <input type="password" v-if="this.form.type == 0" :class="!validPass?'error':' '" placeholder="Contraseña" v-model="form.pass">
                    <div class="button-box">
                        <a href="javascript:void(0)" @click="form.type = 1" v-if="form.type == 0">Recuperar contraseña</a>
                        <a href="javascript:void(0)" @click="form.type = 0" v-if="form.type == 1">Iniciar sesión</a>
                        <button class="v-btn v-btn-blue" v-if="form.type == 0" @click.prevent="sendForm()">Iniciar sesión</button>
                        <button class="v-btn v-btn-blue" v-if="form.type == 1" @click.prevent="resetPass()">Recuperar contraseña</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import firebase from 'firebase'
    import db from '@/firebase/init.js'

    export default {
        name: 'AdminPage',

        data(){
            return {
                valid_pass: false,
                error: null,
                succ: null,
                form:{
                    email: '', // 0: Iniciar sesion 1: Recuperar contraseña
                    pass: '',
                    type: 0,
                }
            }
        },

        beforeCreate(){
            const user = firebase.auth().currentUser;
            if(user){
                this.$router.push({name: 'AdminDashboard', params:{id: 'admin-dashboard'} })
            }
        },

        methods:{
            sendForm(){
                if(this.validType()){
                    firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.pass)
                        .then(user => {
                            this.$router.push({name: 'AdminDashboard', params:{id: 'admin-dashboard'} })
                        }).catch(error => {
                            if(error.code === 'auth/wrong-password'){
                                this.error = 'La contraseña es incorrecta'
                            }else{
                                this.error = 'El usuario es incorrecto'
                            }
                        })
                }else if(this.validType()){
                    if(this.form.type === 0){
                        this.error = 'Alguno de los campos es incorrecto'
                    }else{
                        this.error = 'El correo no está registrado'
                    }
                }
            },
            resetPass(){
                if(this.validType()){
                    firebase.auth().sendPasswordResetEmail(this.form.email).then(() => {
                        this.succ = 'Se ha enviado el correo exitosamente'
                    }).catch(err => {
                        if(err.code === 'auth/user-not-found'){
                            this.error = 'No existe usuario registrado con ese correo'
                        }
                    });
                }else{
                    this.error = 'El correo no es válido'
                }
            },
            validType(){
                if(this.form.type === 0 && this.validEmail && this.validPass){
                    return true;
                }else if(this.form.type === 1 && this.validEmail){
                    return true;
                } else{
                    return false;
                }
            },
        },

        computed:{
            validEmail(){
                const exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                if(exp.test(this.form.email)){
                    return true
                }else{
                    return false
                }
            },
            validPass(){
                const exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
                if(exp.test(this.form.pass)){
                    return true
                }else{
                    return false
                }
            },
            title(){
                return (this.form.type==0)?'Login':'Recuperar contraseña';
            }
        },
        watch:{
            error(){
                if(this.error !== null){
                this.$refs.alertBox.classList.add('alert-show')
                setTimeout(() => {
                    this.$refs.alertBox.classList.remove('alert-show');
                }, 3000);
                setTimeout(() => {
                    this.error = null;
                }, 3600);
                }
            },
            succ(){
                if(this.succ !== null){
                this.$refs.alertBoxSucc.classList.add('alert-show')
                setTimeout(() => {
                    this.$refs.alertBoxSucc.classList.remove('alert-show');
                }, 3000);
                setTimeout(() => {
                    this.succ = null;
                }, 3600);
                }
            },
        },
    }
</script>

<style scoped>

.alert-box{
    top: 50%;
}

</style>