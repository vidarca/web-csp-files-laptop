import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { data } from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    successUpload: null,
    dbWeb:[],
    dpResponsive: false,
    headerView: 0,
    user: {
      email: '',
      displayName: ''
    },
    refUser: {},
    formUpload: {
      titulo: '',
      info: '',
      fecha: '',
      id: '',
      seccion: 'Seleccione una opción',
      images: [],
    },
  },
  mutations: {
    dataWeb(state, baseDatos){
      state.dbWeb = baseDatos
    },
    isResponsive(state){
      if(window.innerWidth >= 768){
        state.dpResponsive = false
      }else if(window.innerWidth < 768){
        state.dpResponsive = true
      }
    },
    setUser(state, user){
      state.user.email = user.email;
      state.user.displayName = user.displayName
    },
    isUserDiff(state, value){
      state.refUser.email = state.user.email;
      const splittedName = state.user.displayName.split('|');
      if(state.user.displayName && splittedName[0]){
        state.refUser.name = splittedName[0].split(' ')
      }else if(state.user.displayName){
        state.refUser.name = state.user.displayName.split(' ');
      }
      if(state.user.displayName && splittedName[1]){
        state.refUser.rank = splittedName[1]
      }else {
        state.refUser.rank = ''
      }

      if(state.refUser.name[0] !== value.name[0] || state.refUser.name[1] !== value.name[1] || state.refUser.email !== value.email || state.refUser.rank !== value.rank){
        this.commit('updateUser', value)
      }
    },
    resetCreateContentValues(state){
      state.formUpload.titulo = '';
      state.formUpload.info = '';
      state.formUpload.images = [];
      state.formUpload.fecha = '';
      state.formUpload.id = '';
      state.formUpload.seccion = 'Seleccione una opción';
    },
    successAdvise(state, data){
      state[`${data[0]}`] = data[1]
    },
    handleUpload(state, files){


      
      let storageRef = [];
      let percentage = [];
      let order = [];
      let task = {};
      let i = 0;
      let j = 0;
      let m = 0;
      let n = 0;

      files.forEach(element => {

        storageRef= firebase.storage().ref(`/imagenes/actualidad/${state.formUpload.id}/foto${element.id}`);
        task[i] = storageRef.put(element);
        i++;
      })

      for(let i = 0; i < files.length; i++){
        task[i].on('state_changed', snapshot => {
          percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          state.formUpload.images[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
          m ++;
          if(state.formUpload.images[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < files.length){
            order.push(snapshot.task.blob_.data_.id)
          }
        }, error => {
          console.log(error.message);
        }, () =>{
          let dataRef = {
            noti_titulo: state.formUpload.titulo,
            noti_info: state.formUpload.info,
            noti_fecha: state.formUpload.fecha,
            noti_id: state.formUpload.id,
            noti_publicar: false,
            noti_seccion: state.formUpload.seccion,
            noti_imagenes: [],
          }
          let storageRef = firebase.storage().ref(`/imagenes/actualidad/${state.formUpload.id}/foto${order[j]}`);
          storageRef.getDownloadURL().then(url => {
            let val = order[n];
            state.formUpload.images[val].url = url;
            state.formUpload.images[val].name = `foto${val}`;
            n ++;
            if(n >= state.formUpload.images.length){
              n = 0;
              state.formUpload.images.forEach(element => {
                dataRef.noti_imagenes.push({});
                dataRef.noti_imagenes[n].nombre = state.formUpload.images[n].name;
                dataRef.noti_imagenes[n].url = state.formUpload.images[n].url;
                n ++;
                if(n >= state.formUpload.images.length){
                  const dbRef = firebase.database().ref('Noticias');
                  const newDb = dbRef.push();
                  newDb.set(dataRef)
                  const success = {
                    0: 'successUpload',
                    1: 'Se ha creado exitosamente'
                  }
                  this.commit('successAdvise', success)
                }
              })
            }
          })
          j ++;
        })
      }
    },
    deleteFileState(){

    },
    filesUpload(state, data){
      
      let d = new Date();
      const miliSec = Date.parse(d);
      let dString = d.toString();
      const splittedDate = dString.split(' ');
      const joinedDate = [];
      for(let i = 1; i < 5; i++){
        joinedDate.push(splittedDate[i]);
      }
      const joined = joinedDate.join('|');

      state.formUpload.fecha = joined;
      state.formUpload.images = data[0];
      state.formUpload.id = miliSec;

      this.commit('handleUpload', data[1])
    },
    updateUser(state, value){
      const user = firebase.auth().currentUser;
      if(user){
        // Aqui debo poner el activador para el cargador
        
        user.updateProfile({
          displayName: value.name[0] + '|' + value.name[1] + '|' + value.rank,
          email: value.email
        }).then(() =>{
          // Aqui debo poner para quitar el cargador
          /* state.user = {...state.user, user} */
          state.user.displayName = user.displayName
          state.user.email = user.email
        })
      }
    },
  },
  actions: {
    getData: async function({commit}){
      const data = await fetch("https://web-database-66842.firebaseio.com/.json");
      const dbWeb = await data.json();
      commit('dataWeb', dbWeb)
    },
  },
  modules: {
  },
  getters: {
    userUpdate: state => {
      return state.user;
    },
  }
})
