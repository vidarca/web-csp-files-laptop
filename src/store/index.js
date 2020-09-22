import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { data } from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    successUpload: null,
    deletingVal: null,
    loadEdit: false,
    deletingIndex: '',
    actUser: null,
    dbWeb:[],
    dpResponsive: false,
    headerView: 0,
    formtipo: 0,
    user: {
      email: '',
      displayName: ''
    },
    refUser: {},
    createContent:{
      formUpload: {
        titulo: '',
        info: '',
        prev: '',
        fecha: '',
        id: '',
        seccion: 'Seleccione una opción',
        images: [],
        tipo: false,
      },
    },
    editContent:{
      formUpload: {
        titulo: '',
        info: '',
        prev: '',
        fecha: '',
        id: '',
        seccion: '',
        images: [],
        tipo: false,
        uploadImages: false,
        uploadDataBase: false,
      },
    },
    deleteContent:{
      formUpload: {
        id: '',
        tipo: false,
      },
    },
  },
  mutations: {
    dataWeb(state, baseDatos){
      state.dbWeb = baseDatos[0]
      if(baseDatos[1] !== undefined){
        baseDatos[1] = true;
      }
    },
    isResponsive(state){
      if(window.innerWidth >= 768){
        state.dpResponsive = false
      }else if(window.innerWidth < 768){
        state.dpResponsive = true
      }
    },
    setUser(state, user){
      state.user = {
        activo: user[0],
        apellido: user[1],
        autori: user[2],
        cargo: user[3],
        correo: user[4],
        correoVeri: user[5],
        fotoUrl: user[6],
        id: user[7],
        name: user[8],
        telefono: user[9],
      }
      state.refUser = {
        activo: user[0],
        apellido: user[1],
        autori: user[2],
        cargo: user[3],
        correo: user[4],
        correoVeri: user[5],
        fotoUrl: user[6],
        id: user[7],
        name: user[8],
        telefono: user[9],
      }
    },
    updateUser(state, value){
      const user = firebase.auth().currentUser;
      if(user){
        // Aqui debo poner el activador para el cargador
        
        user.updateProfile({
          displayName: value.name,
          email: value.correo
        }).then(() =>{
          const valuesRef = {
            uadmin_correo: value.correo,
            uadmin_correoVeri: value.correoVeri,
            uadmin_nombre: value.name,
            uadmin_apellido: value.apellido,
            uadmin_autori: value.autori,
            uadmin_fotoUrl: value.fotoUrl,
            uadmin_telefono: value.telefono,
            uadmin_cargo: value.cargo,
            uadmin_id: value.id,
            uadmin_activo: value.activo,
          }
          const dbRef = firebase.database().ref('Usuarios_admin');
          dbRef.child(value.id).set(valuesRef).then(()=>{
            // Aqui debo poner para quitar el cargador
            this.commit('setUser', Object.values(value));
            state.actUser = null;
            const success = {
              0: 'successUpload',
              1: 'Se ha actualizado exitosamente'
            };
            this.commit('successAdvise', success);
          })
        })
      }
    },
    dbUserVal(state, value){
      const valuesRef = {
        uadmin_activo: true,
        uadmin_apellido: '',
        uadmin_autori: '',
        uadmin_cargo: '',
        uadmin_correo: value[0],
        uadmin_correoVeri: value[1],
        uadmin_fotoUrl: `${value[2]}`,
        uadmin_id: value[3],
        uadmin_nombre: value[4],
        uadmin_telefono: `${value[5]}`,
      }
      const dbRef = firebase.database().ref('Usuarios_admin');
      dbRef.child(valuesRef.uadmin_id).set(valuesRef).then(()=>{
        this.commit('setUser', Object.values(valuesRef));
      })
    },
    isUserDiff(state){
      for(let i = 0; i < Object.values(state.user).length; i++){
        if(Object.values(state.user)[i] !== Object.values(state.refUser)[i]){
          state.actUser = true;
          return this.commit('updateUser', state.user);
        }
      }
    },
    deletedEl(state, value){
      if(value[0] === 0){
        state.deletingVal = value[1];
      }
      if(value[0] === 1){
        state.deletingIndex = value[1];
      }
    },
    resetContentValues(state, val){
      if(val === 0){
        state.createContent.formUpload.titulo = '';
        state.createContent.formUpload.info = '';
        state.createContent.formUpload.prev = '';
        state.createContent.formUpload.images = [];
        state.createContent.formUpload.fecha = '';
        state.createContent.formUpload.id = '';
        state.createContent.formUpload.seccion = 'Seleccione una opción';
      }else if(val === 1){
        state.editContent.formUpload.titulo = '';
        state.editContent.formUpload.info = '';
        state.editContent.formUpload.prev = '';
        state.editContent.formUpload.images = [];
        state.editContent.formUpload.fecha = '';
        state.editContent.formUpload.id = '';
        state.editContent.formUpload.seccion = 'Todas las secciones';
      }
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

      if(state.createContent.formUpload.tipo === true){
        files.forEach(element => {
          storageRef= firebase.storage().ref(`/imagenes/noticias/${state.createContent.formUpload.id}/foto${element.id}`);
          task[i] = storageRef.put(element);
          i++;
        })
  
        for(let i = 0; i < files.length; i++){
          task[i].on('state_changed', snapshot => {
            percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            state.createContent.formUpload.images[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
            m ++;
            if(state.createContent.formUpload.images[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < files.length){
              order.push(snapshot.task.blob_.data_.id)
            }
          }, error => {
            console.log(error.message);
          }, () =>{
            let dataRef = {
              noti_titulo: state.createContent.formUpload.titulo,
              noti_info: state.createContent.formUpload.info,
              noti_fecha: state.createContent.formUpload.fecha,
              noti_id: state.createContent.formUpload.id,
              noti_prev: state.createContent.formUpload.prev,
              noti_publicar: true,
              noti_seccion: state.createContent.formUpload.seccion,
              noti_imagenes: [],
            }
            let storageRef = firebase.storage().ref(`/imagenes/noticias/${state.createContent.formUpload.id}/foto${order[j]}`);
            storageRef.getDownloadURL().then(url => {
              let val = order[n];
              state.createContent.formUpload.images[val].url = url;
              state.createContent.formUpload.images[val].name = `foto${val}`;
              n ++;
              if(n >= state.createContent.formUpload.images.length){
                n = 0;
                state.createContent.formUpload.images.forEach(element => {
                  dataRef.noti_imagenes.push({});
                  dataRef.noti_imagenes[n].nombre = state.createContent.formUpload.images[n].name;
                  dataRef.noti_imagenes[n].url = state.createContent.formUpload.images[n].url;
                  n ++;
                  if(n >= state.createContent.formUpload.images.length){
                    const dbRef = firebase.database().ref('Noticias');
                    dbRef.child(state.createContent.formUpload.id).set(dataRef);
                    state.createContent.formUpload.tipo = false;
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
      }else if(state.editContent.formUpload.tipo === true){

        if(state.editContent.formUpload.uploadImages === true){
          files.forEach(element => {
            storageRef= firebase.storage().ref(`/imagenes/noticias/${state.editContent.formUpload.id}/foto${element.id}`);
            task[i] = storageRef.put(element);
            i++;
          })

          for(let i = 0; i < files.length; i++){
            task[i].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.editContent.formUpload.images[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];;
              m ++;
              if(state.editContent.formUpload.images[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < files.length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{
              let dataRef = {
                noti_titulo: state.editContent.formUpload.titulo,
                noti_info: state.editContent.formUpload.info,
                noti_fecha: state.editContent.formUpload.fecha,
                noti_id: state.editContent.formUpload.id,
                noti_prev: state.editContent.formUpload.prev,
                noti_publicar: true,
                noti_seccion: state.editContent.formUpload.seccion,
                noti_imagenes: [],
              }
              let storageRef = firebase.storage().ref(`/imagenes/noticias/${state.editContent.formUpload.id}/foto${order[j]}`);
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.editContent.formUpload.images[val].url = url;
                state.editContent.formUpload.images[val].name = `foto${val}`;
                n ++;
                if(n >= state.editContent.formUpload.images.length){
                  n = 0;
                  state.editContent.formUpload.images.forEach(element => {
                    dataRef.noti_imagenes.push({});
                    dataRef.noti_imagenes[n].nombre = state.editContent.formUpload.images[n].name;
                    dataRef.noti_imagenes[n].url = state.editContent.formUpload.images[n].url;
                    n ++;
                    if(n >= state.editContent.formUpload.images.length){
                      const dbRef = firebase.database().ref('Noticias');
                      dbRef.child(state.editContent.formUpload.id).set(dataRef);
                      state.editContent.formUpload.tipo = false;
                      const success = {
                        0: 'successUpload',
                        1: 'Se ha actualizado exitosamente'
                      }
                      this.commit('successAdvise', success)
                    }
                  })
                }
              })
              j ++;
            })
          }
        }else{
          let dataRef = {
            noti_titulo: state.editContent.formUpload.titulo,
            noti_info: state.editContent.formUpload.info,
            noti_fecha: state.editContent.formUpload.fecha,
            noti_id: state.editContent.formUpload.id,
            noti_prev: state.editContent.formUpload.prev,
            noti_publicar: true,
            noti_seccion: state.editContent.formUpload.seccion,
            noti_imagenes: state.editContent.formUpload.images,
          }
          const dbRef = firebase.database().ref('Noticias');
          dbRef.child(state.editContent.formUpload.id).set(dataRef);
          state.editContent.formUpload.tipo = false;
          const success = {
            0: 'successUpload',
            1: 'Se ha actualizado exitosamente'
          }
          this.commit('successAdvise', success)
        }
      }else if(state.deleteContent.formUpload.tipo === true){
        try{
          let storageRef = firebase.storage().ref(`/imagenes/noticias/${state.deleteContent.formUpload.id}`)
          storageRef.listAll().then(prom => {
            prom.items.forEach(element => {
              storageRef.child(element.name).delete().then( err => {
                if(err !== undefined){
                  console.log(err)
                }else{
                  firebase.database().ref(`Noticias/${state.deleteContent.formUpload.id}`).remove().then(()=>{
                      state.deletingVal = false;
                      state.deleteContent.formUpload.tipo = false;
                      const success = {
                        0: 'successUpload',
                        1: 'Se ha eliminado exitosamente'
                      }
                      this.commit('successAdvise', success)
                    }
                  )
                }
              })
            });
          })
        }catch(err){console.log(err)}
      }
    },
    filesUpload(state, data){

      state.formtipo = data[2]

      if(state.formtipo === 0){
        let d = new Date();
        const miliSec = Date.parse(d);
        let dString = d.toString();
        const splittedDate = dString.split(' ');
        const joinedDate = [];
        for(let i = 1; i < 5; i++){
          joinedDate.push(splittedDate[i]);
        }
        const joined = joinedDate.join('|');
        
        state.createContent.formUpload.tipo = true
        state.createContent.formUpload.fecha = joined;
        state.createContent.formUpload.images = data[0];
        state.createContent.formUpload.id = miliSec;
  
        this.commit('handleUpload', data[1])
      }else if(state.formtipo === 1){
        state.editContent.formUpload.tipo = true;
        state.editContent.formUpload.fecha = data[0].fecha;
        state.editContent.formUpload.images = data[0].imagenes;
        state.editContent.formUpload.id = data[0].id;
        state.editContent.formUpload.titulo = data[0].titulo;
        state.editContent.formUpload.info = data[0].info;
        state.editContent.formUpload.prev = data[0].prev;
        state.editContent.formUpload.seccion = data[0].seccion;
        state.editContent.formUpload.uploadImages = data[3];
        state.editContent.formUpload.uploadDataBase = data[4];
  
        this.commit('handleUpload', data[1])
      }else if(state.formtipo === 2){
        state.deleteContent.formUpload.id = data[0];
        state.deleteContent.formUpload.tipo = true;
        state.deletingVal = true;
        state.deletingIndex = data[3];

        this.commit('handleUpload', data[1])
      }
      
    },
  },
  actions: {
    getData: async function({commit}, val){
      let tryAgain = true;
      while(tryAgain){
        try{
          const data = await fetch("https://web-database-66842.firebaseio.com/.json");
          const dbWeb = await data.json();
          const value = {
            0: dbWeb,
            1: val,
          }
          tryAgain = false;
          commit('dataWeb', value)
        }catch(err){
          setTimeout(() => {
            console.log('Error');
          }, 2000);
        }
      }
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
