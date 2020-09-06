<template>
    <div id="admin-page">
        <div class="v-wrapper">
            <div class="v-container">
                <h4>{{ title }}</h4>
                <form @submit.prevent="sendForm()">
                    <input type="email" :class="{'error': validEmail}"  placeholder="Correo" v-model="form.email">
                    <input type="password" v-if="this.form.type == 0" :class="{'error': validPass}" placeholder="Contraseña" v-model="form.pass">
                    <div class="button-box">
                        <a href="javascript:void(0)" @click="form.type = 1" v-if="form.type == 0">Recuperar contraseña</a>
                        <a href="javascript:void(0)" @click="form.type = 0" v-if="form.type == 1">Iniciar sesión</a>
                        <button class="v-btn v-btn-blue" v-if="form.type == 0">Iniciar sesión</button>
                        <button class="v-btn v-btn-blue" v-if="form.type == 1">Recuperar contraseña</button>
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
                form:{
                    email: '', // 0: Iniciar sesion 1: Recuperar contraseña
                    pass: '',
                    type: 0,
                    error: ''
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
                        }).catch(
                            this.form.error = 'Ha ocurrido un error con el usuario o la contraseña'
                        )
                    console.log(this.form);
                }else{
                    if(this.form.type === 0){
                        this.form.error = 'Alguno de los campos es incorrecto'
                    }else{
                        this.form.error = 'El correo no está registrado'
                    }
                }
            },
            validType(){
                if(this.form.type == 0 && !this.validEmail && !this.validPass){
                    return true;
                }else if(this.form.type == 1 && !this.validEmail){
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
                    return false
                }else{
                    return true
                }
            },
            validPass(){
                const exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
                if(exp.test(this.form.pass)){
                    return false
                }else{
                    return true
                }
            },
            title(){
                return (this.form.type==0)?'Login':'Recuperar contraseña';
            }
        }
    }
</script>

<style scoped>



</style>