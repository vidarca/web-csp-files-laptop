import Vue from 'vue'
import Vuex from 'vuex'
import firebase, { auth } from 'firebase'
import { data } from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    secTitle: 'Dashboard',
    successUpload: null,
    cargarDB: false,
    crearDBVals: false,
    errorUpload: null,
    deletingVal: null,
    loadEdit: false,
    deletingIndex: '',
    actUser: null,
    dbWeb:[],
    dpResponsive: false,
    headerView: 0,
    formtipo: 0,
    user: {
      activo: '',
      apellido: '',
      autori: '',
      cargo: '',
      correo: '',
      correoVeri: '',
      fotoUrl: '',
      id: '',
      nombre: '',
      telefono: '',
      accion: '',
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
    users:{
      userRefer: false,
      createUser:{
        formUpload: {
          activo: '',
          apellido: '',
          cargo: '',
          correo: '',
          correoVeri: '',
          fotoUrl: '',
          id: '',
          nombre: '',
          telefono: '',
          create: false,
          pass: '',
        },
      },
    },
    deleteContent:{
      formUpload: {
        id: '',
        tipo: false,
      },
    },
    dbImg: [],
    dbFiles: [],
  },
  mutations: {
    dataWeb(state, baseDatos){
      state.dbWeb = baseDatos[0]
      if(baseDatos[1] !== undefined){
        baseDatos[1] = true;
      }
    },
    changeSecTitle(state, value){
      state.secTitle = value
    },
    setUser(state, user){
      state.users.userRefer = false;
      
      state.user = {
        activo: user.activo,
        apellido: user.apellido,
        autori: user.autori,
        cargo: user.cargo,
        correo: user.correo,
        correoVeri: user.correoVeri,
        fotoUrl: user.fotoUrl,
        id: user.id,
        nombre: user.nombre,
        telefono: user.telefono,
        accion: user.accion,
      }

      state.refUser = {
        activo: user.activo,
        apellido: user.apellido,
        autori: user.autori,
        cargo: user.cargo,
        correo: user.correo,
        correoVeri: user.correoVeri,
        fotoUrl: user.fotoUrl,
        id: user.id,
        nombre: user.nombre,
        telefono: user.telefono,
        accion: user.accion,
      }
    },
    dbUserVal(state, value){
      const valuesRef = {
        user_activo: true,
        user_apellido: value.apellido,
        user_autori: value.autori,
        user_cargo: value.cargo,
        user_correo: value.correo,
        user_correoVeri: value.correoVeri,
        user_fotoUrl: `${value.fotoUrl}`,
        user_id: value.id,
        user_nombre: value.nombre,
        user_telefono: `${value.telefono}`,
        user_accion: `${value.accion}`,
      }
      const dbRef = firebase.database().ref('Usuarios');
      dbRef.child(valuesRef.user_id).set(valuesRef).then(()=>{
        this.commit('setUser', Object.values(valuesRef));
      })
    },
    createUser(state, value){
      state.users.userRefer = true;
      const config = {
        apiKey: "AIzaSyCpsNVtsACCeS-amNprGUh0vGOE-SD9y5Q",
        authDomain: "web-database-66842.firebaseapp.com",
        databaseURL: "https://web-database-66842.firebaseio.com",
      }
      const secondaryApp = firebase.initializeApp(config, "Secondary");
      
      secondaryApp.auth().createUserWithEmailAndPassword(state.users.createUser.formUpload.correo, state.users.createUser.formUpload.pass).then(user => {
          const valuesRef = {
            correo: user.user.email,
            correoVeri: user.user.emailVerified,
            nombre: user.user.displayName,
            apellido: '',
            autori: '',
            fotoUrl: '',
            telefono: '',
            cargo: '',
            id: user.user.uid,
            activo: '',
            accion: '',
          }
          secondaryApp.auth().signOut();
          secondaryApp.delete()
          const success = {
            0: 'successUpload',
            1: 'Se ha creado exitosamente'
          };
          this.commit('successAdvise', success);
          const valuesDb = {
            user_correo: user.user.email,
            user_correoVeri: user.user.emailVerified,
            user_nombre: user.user.displayName,
            user_apellido: '',
            user_autori: '',
            user_fotoUrl: '',
            user_telefono: '',
            user_cargo: '',
            user_id: user.user.uid,
            user_activo: '',
            user_accion: '',
          }
          this.commit('dbUserVal', valuesRef);
          state.dbWeb.Usuarios[`${valuesDb.id}`] = valuesDb;
        }).catch(err => {
          state.users.userRefer = false;
          secondaryApp.delete();
          if(err.message === 'The email address is already in use by another account.'){
            const success = {
              0: 'errorUpload',
              1: 'El correo ya está en uso'
            };
            this.commit('successAdvise', success);
          }
        })
    },
    updateUser(state, value){
      if(value.tipo === '1'){
        const valuesRef = {
          user_id: value.id,
          user_correo: value.correo,
          user_correoVeri: value.correoVeri,
          user_accion: value.accion,
          user_telefono: value.telefono,
          user_nombre: value.nombre,
          user_apellido: value.apellido,
          user_activo: value.activo,
          user_fotoUrl: value.fotoUrl,
          user_autori: value.autori,
          user_cargo: value.cargo,
        }

        const dbRef = firebase.database().ref('Usuarios');
        dbRef.child(valuesRef.user_id).set(valuesRef).then(()=>{
          // Aqui debo poner para quitar el cargador
          this.commit('setUser', value);
          state.actUser = null;
          const success = {
            0: 'successUpload',
            1: 'Se ha actualizado exitosamente'
          };
          this.commit('successAdvise', success);
        })
      }else{
        const user = firebase.auth().currentUser;
        if(user){
          // Aqui debo poner el activador para el cargador
          
          user.updateProfile({
            displayName: value.nombre,
            email: value.correo,
            phoneNumber: value.telefono,
          }).then(() =>{
            const valuesRef = {
              user_correo: value.correo,
              user_correoVeri: value.correoVeri,
              user_nombre: value.nombre,
              user_apellido: value.apellido,
              user_autori: value.autori,
              user_fotoUrl: value.fotoUrl,
              user_telefono: value.telefono,
              user_cargo: value.cargo,
              user_id: value.id,
              user_activo: value.activo,
              user_accion: value.accion,
            }
            const dbRef = firebase.database().ref('Usuarios');
            dbRef.child(value.id).set(valuesRef).then(()=>{
              // Aqui debo poner para quitar el cargador
              this.commit('setUser', value);
              state.actUser = null;
              const success = {
                0: 'successUpload',
                1: 'Se ha actualizado exitosamente'
              };
              this.commit('successAdvise', success);
            })
          })
        }
      }
    },
    isUserDiff(state, value){
      if(value.tipo === '0'){
        for(let i = 0; i < Object.values(state.user).length; i++){
          if(Object.values(state.user)[i] !== Object.values(state.refUser)[i]){
            state.actUser = true;
            return this.commit('updateUser', state.user);
          }
        }
      }else{
        state.actUser = true;
        this.commit('updateUser', value);
      }
    },
    deleteItem(state, value){
      state.deletingVal = true;
      state.deletingIndex = value.index;

      if(value.storage === false){
        firebase.database().ref(`${value.ref}/${value.idDb}`).remove().then(()=>{
          state.deletingVal = false;
          state.deletingIndex = '';
          const success = {
            0: 'successUpload',
            1: 'Se ha eliminado exitosamente'
          }
          this.commit('successAdvise', success)
          }
        )
      }else if(value.storage === true){
        try{
          let storageRef = firebase.storage().ref(`/${value.ref}/${value.idSt}`)
          storageRef.listAll().then(prom => {
            if(prom.items.length !== 0){
              prom.items.forEach(element => {
                storageRef.child(element.name).delete().then( err => {
                  if(err !== undefined){
                    console.log(err)
                  }else{
                    firebase.database().ref(`${value.ref}/${value.idDb}`).remove().then(()=>{
                      state.deletingVal = false;
                      state.deletingIndex = '';
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
            }else{
              firebase.database().ref(`${value.ref}/${value.idDb}`).remove().then(()=>{
                state.deletingVal = false;
                state.deletingIndex = '';
                const success = {
                  0: 'successUpload',
                  1: 'Se ha eliminado exitosamente'
                }
                this.commit('successAdvise', success)
                }
              )
            }
          })
        }catch(err){console.log(err)}
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
      }else if(val === 3){
        state.users = {
          userRefer: false,
          createUser:{
            formUpload: {
              activo: '',
              apellido: '',
              cargo: '',
              correo: '',
              correoVeri: '',
              fotoUrl: '',
              id: '',
              nombre: '',
              telefono: '',
              create: false,
              pass: '',
            },
          },
        };
      }
    },
    successAdvise(state, data){
      state[`${data[0]}`] = data[1];
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
    crearDB(state, data){
      state.crearDBVals = true;
      if(data.target === 'Juntas'){
        
        if(Object.values(data.archivos).length !== 0){
          for(let i = 0; i < Object.values(data.junta.integrantes).length; i++){
            state.dbImg[i] = [];
            state.dbImg[i] = Object.values(data.junta.integrantes)[i].image;
          }
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let j = 0;
        let n = 0;

        const dbRef = firebase.database().ref(`${data.target}`);
        const pushdbRef = dbRef.push();

        let dataRef = {
          junt_id: pushdbRef.key,
        }


        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.junt_id}/${data.junta.integrantes[`${element.id}`].cargo.split(' ').join('_')}`);
          task[`${element.id}`] = storageRef.put(element);
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{
  
              dataRef.junt_periodo = `${data.junta.inicio}-${data.junta.fin}`;
              dataRef.junt_activa = data.junta.junta_actual;
              dataRef.junt_integrantes = [];
  
              for(let i = 0; i < Object.values(data.junta.integrantes).length; i++){
                dataRef.junt_integrantes[i] = [];
                dataRef.junt_integrantes[i].juin_cargo = Object.values(data.junta.integrantes)[i].cargo
                dataRef.junt_integrantes[i].juin_nombre = Object.values(data.junta.integrantes)[i].nombre
                dataRef.junt_integrantes[i].juin_apellido = Object.values(data.junta.integrantes)[i].apellido
                dataRef.junt_integrantes[i].juin_correo = Object.values(data.junta.integrantes)[i].correo
                dataRef.junt_integrantes[i].juin_foto = []
                dataRef.junt_integrantes[i].juin_activo = Object.values(data.junta.integrantes)[i].activo
                dataRef.junt_integrantes[i].juin_crear = Object.values(data.junta.integrantes)[i].crear
              }
  
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.junt_id}/${data.junta.integrantes[`${order[j]}`].cargo.split(' ').join('_')}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.dbImg[val].url = url;
                state.dbImg[val].nombre = `${data.junta.integrantes[`${order[n]}`].cargo.split(' ').join('_')}`;
                n ++;
                if(n >= order.length){
                  i = 0;
                  Object.values(dataRef.junt_integrantes).forEach(element => {
                    if(state.dbImg[i].nombre !== undefined && state.dbImg[i].url !== undefined){
                      element.juin_foto.nombre = state.dbImg[i].nombre;
                      element.juin_foto.url = state.dbImg[i].url;
                    }else{
                      element.juin_foto = "";
                    }
                    i ++;
                    if(n >= Object.values(data.archivos).length){
                      pushdbRef.set(dataRef);
                      state.crearDBVals = false;
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
          })
        }else{

          dataRef.junt_periodo = `${data.junta.inicio}-${data.junta.fin}`;
          dataRef.junt_activa = data.junta.junta_actual;
          dataRef.junt_integrantes = [];

          for(let i = 0; i < Object.values(data.junta.integrantes).length; i++){
            dataRef.junt_integrantes[i] = [];
            dataRef.junt_integrantes[i].juin_cargo = Object.values(data.junta.integrantes)[i].cargo
            dataRef.junt_integrantes[i].juin_nombre = Object.values(data.junta.integrantes)[i].nombre
            dataRef.junt_integrantes[i].juin_apellido = Object.values(data.junta.integrantes)[i].apellido
            dataRef.junt_integrantes[i].juin_correo = Object.values(data.junta.integrantes)[i].correo
            dataRef.junt_integrantes[i].juin_foto = Object.values(data.junta.integrantes)[i].image
            dataRef.junt_integrantes[i].juin_activo = Object.values(data.junta.integrantes)[i].activo
            dataRef.junt_integrantes[i].juin_crear = Object.values(data.junta.integrantes)[i].crear
          }

          pushdbRef.set(dataRef);
          state.crearDBVals = false;
          const success = {
            0: 'successUpload',
            1: 'Se ha creado exitosamente'
          }
          this.commit('successAdvise', success)
        }
      }else if(data.target === 'Servicios'){

        if(Object.values(data.archivos).length !== 0){
          state.dbImg = [];
          state.dbImg[0] = data.servicio.image;
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let n = 0;

        const dbRef = firebase.database().ref(`${data.target}`);
        const pushdbRef = dbRef.push();

        let dataRef = {
          serv_id: pushdbRef.key,
        }


        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.serv_id}/${data.servicio.nombre.split(' ').join('_')}`);
          task[`${element.id}`] = storageRef.put(element);
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              dataRef = {
                serv_activo: data.servicio.activo,
                serv_cierre: data.servicio.fin,
                serv_contacto: data.servicio.contacto,
                serv_descripcion: data.servicio.descripcion,
                serv_id: pushdbRef.key,
                serv_inicio: data.servicio.inicio,
                serv_nombre: data.servicio.nombre,
                serv_foto: [],
              }

              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.serv_id}/${data.servicio.nombre.split(' ').join('_')}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.dbImg[val].url = url;
                state.dbImg[val].nombre = `${data.servicio.nombre.split(' ').join('_')}`;
                n ++;
                if(n >= order.length){
                  dataRef.serv_foto.nombre = state.dbImg[0].nombre;
                  dataRef.serv_foto.url = state.dbImg[0].url;
                  if(n >= Object.values(data.archivos).length){
                    pushdbRef.set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
            })
          })
        }else{
          dataRef = {
            serv_activo: data.servicio.activo,
            serv_cierre: data.servicio.fin,
            serv_contacto: data.servicio.contacto,
            serv_descripcion: data.servicio.descripcion,
            serv_id: pushdbRef.key,
            serv_inicio: data.servicio.inicio,
            serv_nombre: data.servicio.nombre,
            serv_foto: data.servicio.image,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            pushdbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Gerencia'){

        if(Object.values(data.archivos).length !== 0){
          state.dbImg = [];
          state.dbImg[0] = data.integrante.image;
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let n = 0;

        const dbRef = firebase.database().ref(`${data.target}`);
        const pushdbRef = dbRef.push();

        let dataRef = {
          gr_id: pushdbRef.key,
        }

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.gr_id}/${data.integrante.cargo.split(' ').join('_')}`);
          task[`${element.id}`] = storageRef.put(element);
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              dataRef = {
                gr_correo: data.integrante.correo,
                gr_nombre: data.integrante.nombre,
                gr_cargo: data.integrante.cargo,
                gr_id: pushdbRef.key,
                gr_foto: [],
              }

              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.gr_id}/${data.integrante.cargo.split(' ').join('_')}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.dbImg[val].url = url;
                state.dbImg[val].nombre = `${data.integrante.cargo.split(' ').join('_')}`;
                n ++;
                if(n >= order.length){
                  dataRef.gr_foto.nombre = state.dbImg[0].nombre;
                  dataRef.gr_foto.url = state.dbImg[0].url;
                  if(n >= Object.values(data.archivos).length){
                    pushdbRef.set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
            })
          })
        }else{
          dataRef = {
            gr_correo: data.integrante.correo,
            gr_nombre: data.integrante.nombre,
            gr_cargo: data.integrante.cargo,
            gr_id: pushdbRef.key,
            gr_foto: data.integrante.image,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            pushdbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Profesores'){
        
        state.dbImg = [];

        if(data.archivos['archivo0'] !== undefined){
          state.dbImg[0] = data.profesor.archivos.image;
        }

        if(data.archivos['archivo1'] !== undefined){
          state.dbImg[1] = data.profesor.archivos.cv;
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let n = 0;
        let j = 0;

        const dbRef = firebase.database().ref(`${data.target}`);
        const pushdbRef = dbRef.push();

        let dataRef = {
          prof_id: pushdbRef.key,
        }

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.prof_id}/${Object.values(data.profesor.archivos)[i].nombre}`);
          task[`${element.id}`] = storageRef.put(element);
          i++;
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              dataRef = {
                comi_id: data.profesor.coid,
                prof_cv: [],
                prof_ci: data.profesor.ci,
                prof_correo: data.profesor.correo,
                prof_fechadenacimiento: data.profesor.nacimiento,
                prof_foto: [],
                prof_id: pushdbRef.key,
                prof_nombre: data.profesor.nombre,
                prof_telefonos:data.profesor.telefonos,
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.prof_id}/${Object.values(data.profesor.archivos)[order[j]].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                if(val === 0){
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `${data.profesor.id}`;
                }else{
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `c_v_${data.profesor.id}`;
                }
                n ++;
                if(n >= Object.values(data.archivos).length){
                  dataRef.prof_foto.nombre = state.dbImg[0].nombre;
                  dataRef.prof_foto.url = state.dbImg[0].url;
                  dataRef.prof_cv.nombre = state.dbImg[1].nombre;
                  dataRef.prof_cv.url = state.dbImg[1].url;

                  if(n >= Object.values(data.archivos).length){
                    pushdbRef.set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
              j++;
            })
          })
        }else{

          dataRef = {
            comi_id: data.profesor.coid,
            prof_cv: [],
            prof_ci: data.profesor.ci,
            prof_correo: data.profesor.correo,
            prof_fechadenacimiento: data.profesor.nacimiento,
            prof_foto: [],
            prof_id: pushdbRef.key,
            prof_nombre: data.profesor.nombre,
            prof_telefonos:data.profesor.telefonos,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            pushdbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Comites'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.comite.archivos).length; k++){
          if(Object.values(data.comite.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.comite.archivos)[k].id] = Object.values(data.comite.archivos)[k];
          }else{
            state.dbImg[k] = '';
          }
        }
        
        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let n = 0;
        let j = 0;

        const dbRef = firebase.database().ref(`${data.target}`);
        const pushdbRef = dbRef.push();

        let dataRef = {
          comi_id: pushdbRef.key,
        }

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.comi_id}/${Object.values(data.comite.archivos)[element.id].nombre}`);
          task[`${element.id}`] = storageRef.put(element);
          i++;
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              dataRef = {
                comi_id: pushdbRef.key,
                comi_activo: data.comite.activo,
                comi_comiPage: data.comite.comipage,
                comi_correo: data.comite.correo,
                comi_costos: data.comite.costos,
                comi_descripcion: data.comite.descripcion,
                comi_fechavigencia: data.comite.fechav,
                comi_foto: [],
                comi_int: data.comite.inthpage,
                comi_integrantes: data.comite.integrantes,
                comi_nombre: data.comite.nombre,
                comi_normativa: [],
                comi_reglamento: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.comi_id}/${Object.values(data.comite.archivos)[`${order[j]}`].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                console.log(val);
                for(let m = 0; m < Object.values(data.comite.archivos).length; m++){
                  if(Object.values(data.comite.archivos)[m].id !== undefined && val === Object.values(data.comite.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.comite.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){
                  if(state.dbImg[0].nombre !== undefined){
                    dataRef.comi_foto = {
                      nombre: state.dbImg[0].nombre,
                      url: state.dbImg[0].url,
                    } 
                  }else{
                    dataRef.comi_foto = '';
                  }

                  if(state.dbImg[1].nombre !== undefined){
                    dataRef.comi_reglamento = {
                      nombre: state.dbImg[1].nombre,
                      url: state.dbImg[1].url,
                    }
                  }else{
                    dataRef.comi_reglamento = '';
                  }

                  if(state.dbImg[2].nombre !== undefined){
                    dataRef.comi_normativa = {
                      nombre: state.dbImg[2].nombre,
                      url: state.dbImg[2].url,
                    }
                  }else{
                    dataRef.comi_normativa = '';
                  }

                  if(n >= Object.values(data.archivos).length){
                    pushdbRef.set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
              j++;
            })
          })
        }else{

          dataRef = {
            comi_id: pushdbRef.key,
            comi_activo: data.comite.activo,
            comi_comiPage: data.comite.comipage,
            comi_correo: data.comite.correo,
            comi_costos: data.comite.costos,
            comi_descripcion: data.comite.descripcion,
            comi_fechavigencia: data.comite.fechav,
            comi_foto: data.comite.archivos.imagen,
            comi_int: data.comite.inthpage,
            comi_integrantes: data.comite.integrantes,
            comi_nombre: data.comite.nombre,
            comi_normativa: data.comite.archivos.normativa,
            comi_reglamento: data.comite.archivos.reglamento,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            pushdbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Anunciantes'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.anunciante.archivos).length; k++){
          if(Object.values(data.anunciante.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.anunciante.archivos)[k].id] = Object.values(data.anunciante.archivos)[k];
          }else{
            state.dbImg[k] = '';
          }
        }
        
        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let n = 0;
        let j = 0;

        const dbRef = firebase.database().ref(`${data.target}`);
        const pushdbRef = dbRef.push();

        let dataRef = {
          anun_id: pushdbRef.key,
        }

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.anun_id}/${Object.values(data.anunciante.archivos)[element.id].nombre}`);
          task[`${element.id}`] = storageRef.put(element);
          i++;
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              dataRef = {
                anun_id: pushdbRef.key,
                anun_url: data.anunciante.anunurl,
                anun_activo: data.anunciante.activo,
                anun_nombre: data.anunciante.nombre,
                anun_nombrecontacto: data.anunciante.nombrecon,
                anun_correo: data.anunciante.correo,
                anun_essocio: {
                  anun_essocio_socio: data.anunciante.essocio.socio,
                  anun_essocio_accion: data.anunciante.essocio.accion,
                },
                anun_fechavigencia: data.anunciante.fechav,
                anun_foto: [],
                anun_telefonos: data.anunciante.telefonos,
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.anun_id}/${Object.values(data.anunciante.archivos)[`${order[j]}`].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                console.log(val);
                for(let m = 0; m < Object.values(data.anunciante.archivos).length; m++){
                  if(Object.values(data.anunciante.archivos)[m].id !== undefined && val === Object.values(data.anunciante.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.anunciante.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){
                  if(state.dbImg[0].nombre !== undefined){
                    dataRef.anun_foto = {
                      nombre: state.dbImg[0].nombre,
                      url: state.dbImg[0].url,
                    } 
                  }else{
                    dataRef.anun_foto = '';
                  }

                  if(n >= Object.values(data.archivos).length){
                    pushdbRef.set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
              j++;
            })
          })
        }else{

          dataRef = {
            anun_id: pushdbRef.key,
            anun_url: data.anunciante.anunurl,
            anun_activo: data.anunciante.activo,
            anun_nombre: data.anunciante.nombre,
            anun_nombrecontacto: data.anunciante.nombrecon,
            anun_correo: data.anunciante.correo,
            anun_essocio: {
              anun_essocio_socio: data.anunciante.essocio.socio,
              anun_essocio_accion: data.anunciante.essocio.accion,
            },
            anun_fechavigencia: data.anunciante.fechav,
            anun_foto: data.anunciante.archivos.imagen,
            anun_telefonos: data.anunciante.telefonos,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            pushdbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }
    },
    updateDB(state, data){
      state.crearDBVals = true;
      if(data.target === 'Juntas'){
        
        if(Object.values(data.archivos).length !== 0){
          for(let i = 0; i < Object.values(data.junta.integrantes).length; i++){
            state.dbImg[i] = [];
            state.dbImg[i] = Object.values(data.junta.integrantes)[i].image;
          }
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let j = 0;
        let n = 0;

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${data.junta.id}/${data.junta.integrantes[`${element.id}`].cargo.split(' ').join('_')}`);
          task[`${element.id}`] = storageRef.put(element);
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{
  
              let dataRef = [];
              dataRef.junt_periodo = `${data.junta.inicio}-${data.junta.fin}`;
              dataRef.junt_id = data.junta.id;
              dataRef.junt_activa = data.junta.junta_actual;
              dataRef.junt_integrantes = [];
  
              for(let i = 0; i < Object.values(data.junta.integrantes).length; i++){
                dataRef.junt_integrantes[i] = [];
                dataRef.junt_integrantes[i].juin_cargo = Object.values(data.junta.integrantes)[i].cargo
                dataRef.junt_integrantes[i].juin_nombre = Object.values(data.junta.integrantes)[i].nombre
                dataRef.junt_integrantes[i].juin_apellido = Object.values(data.junta.integrantes)[i].apellido
                dataRef.junt_integrantes[i].juin_correo = Object.values(data.junta.integrantes)[i].correo
                dataRef.junt_integrantes[i].juin_foto = []
                dataRef.junt_integrantes[i].juin_activo = Object.values(data.junta.integrantes)[i].activo
                dataRef.junt_integrantes[i].juin_crear = Object.values(data.junta.integrantes)[i].crear
              }
  
              let storageRef= firebase.storage().ref(`/${data.target}/${data.junta.inicio}/${data.junta.integrantes[`${order[j]}`].cargo.split(' ').join('_')}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.dbImg[val].url = url;
                state.dbImg[val].nombre = `${data.junta.integrantes[`${order[n]}`].cargo.split(' ').join('_')}`;
                n ++;
                if(n >= order.length){
                  i = 0;
                  Object.values(dataRef.junt_integrantes).forEach(element => {
                    if(state.dbImg[i].nombre !== undefined && state.dbImg[i].url !== undefined){
                      element.juin_foto.nombre = state.dbImg[i].nombre;
                      element.juin_foto.url = state.dbImg[i].url;
                    }else{
                      element.juin_foto = "";
                    }
                    i ++;
                    if(n >= Object.values(data.archivos).length){
                      const dbRef = firebase.database().ref(`${data.target}`);
                      dbRef.child(`${data.junta.id}`).set(dataRef);
                      state.crearDBVals = false;
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
          })
        }else{
          let dataRef = [];
          dataRef.junt_periodo = `${data.junta.inicio}-${data.junta.fin}`;
          dataRef.junt_id = data.junta.id;
          dataRef.junt_activa = data.junta.junta_actual;
          dataRef.junt_integrantes = [];

          for(let i = 0; i < Object.values(data.junta.integrantes).length; i++){
            dataRef.junt_integrantes[i] = [];
            dataRef.junt_integrantes[i].juin_cargo = Object.values(data.junta.integrantes)[i].cargo
            dataRef.junt_integrantes[i].juin_nombre = Object.values(data.junta.integrantes)[i].nombre
            dataRef.junt_integrantes[i].juin_apellido = Object.values(data.junta.integrantes)[i].apellido
            dataRef.junt_integrantes[i].juin_correo = Object.values(data.junta.integrantes)[i].correo
            dataRef.junt_integrantes[i].juin_foto = Object.values(data.junta.integrantes)[i].image
            dataRef.junt_integrantes[i].juin_activo = Object.values(data.junta.integrantes)[i].activo
            dataRef.junt_integrantes[i].juin_crear = Object.values(data.junta.integrantes)[i].crear
          }

          const dbRef = firebase.database().ref(`${data.target}`);
          dbRef.child(`${data.junta.id}`).set(dataRef);
          state.crearDBVals = false;
          const success = {
            0: 'successUpload',
            1: 'Se ha creado exitosamente'
          }
          this.commit('successAdvise', success)
        }
      }else if(data.target === 'Servicios'){

        if(Object.values(data.archivos).length !== 0){
          state.dbImg = [];
          state.dbImg[0] = data.servicio.image;
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let n = 0;

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${data.servicio.id}/${data.servicio.nombre.split(' ').join('_')}`);
          task[`${element.id}`] = storageRef.put(element);
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              let dataRef = {
                serv_activo: data.servicio.activo,
                serv_cierre: data.servicio.fin,
                serv_contacto: data.servicio.contacto,
                serv_descripcion: data.servicio.descripcion,
                serv_id: data.servicio.id,
                serv_inicio: data.servicio.inicio,
                serv_nombre: data.servicio.nombre,
                serv_foto: [],
              }

              let storageRef= firebase.storage().ref(`/${data.target}/${data.servicio.id}/${data.servicio.nombre.split(' ').join('_')}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.dbImg[val].url = url;
                state.dbImg[val].nombre = `${data.servicio.nombre.split(' ').join('_')}`;
                n ++;
                if(n >= order.length){
                  dataRef.serv_foto.nombre = state.dbImg[0].nombre;
                  dataRef.serv_foto.url = state.dbImg[0].url;
                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}`);
                    dbRef.child(`${data.servicio.id}`).set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
            })
          })
        }else{
          let dataRef = {
            serv_activo: data.servicio.activo,
            serv_cierre: data.servicio.fin,
            serv_contacto: data.servicio.contacto,
            serv_descripcion: data.servicio.descripcion,
            serv_id: data.servicio.id,
            serv_inicio: data.servicio.inicio,
            serv_nombre: data.servicio.nombre,
            serv_foto: data.servicio.image,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}`);
            dbRef.child(`${data.servicio.id}`).set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Gerencia'){

        if(Object.values(data.archivos).length !== 0){
          state.dbImg = [];
          state.dbImg[0] = data.integrante.image;
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let n = 0;

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${data.integrante.id}/${data.integrante.cargo.split(' ').join('_')}`);
          task[`${element.id}`] = storageRef.put(element);
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              let dataRef = {
                gr_correo: data.integrante.correo,
                gr_nombre: data.integrante.nombre,
                gr_cargo: data.integrante.cargo,
                gr_id: data.integrante.id,
                gr_foto: [],
              }

              let storageRef= firebase.storage().ref(`/imagenes/${data.target}/${data.integrante.id}/${data.integrante.cargo.split(' ').join('_')}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.dbImg[val].url = url;
                state.dbImg[val].nombre = `${data.integrante.cargo.split(' ').join('_')}`;
                n ++;
                if(n >= order.length){
                  dataRef.gr_foto.nombre = state.dbImg[0].nombre;
                  dataRef.gr_foto.url = state.dbImg[0].url;
                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}`);
                    dbRef.child(`${data.integrante.id}`).set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
            })
          })
        }else{
          let dataRef = {
            gr_correo: data.integrante.correo,
            gr_nombre: data.integrante.nombre,
            gr_cargo: data.integrante.cargo,
            gr_id: data.integrante.id,
            gr_foto: data.integrante.image,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}`);
            dbRef.child(`${data.integrante.id}`).set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Profesores'){
        
        state.dbImg = [];

        if(data.archivos['archivo0'] !== undefined){
          state.dbImg[0] = data.profesor.archivos.image;
        }

        if(data.archivos['archivo1'] !== undefined){
          state.dbImg[1] = data.profesor.archivos.cv;
        }

        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let n = 0;
        let j = 0;

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${data.profesor.id}/${Object.values(data.profesor.archivos)[i].nombre}`);
          task[`${element.id}`] = storageRef.put(element);
          i++;
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              let dataRef = {
                comi_id: data.profesor.coid,
                prof_cv: [],
                prof_ci: data.profesor.ci,
                prof_correo: data.profesor.correo,
                prof_fechadenacimiento: data.profesor.nacimiento,
                prof_foto: [],
                prof_id: data.profesor.id,
                prof_nombre: data.profesor.nombre,
                prof_telefonos:data.profesor.telefonos,
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.profesor.id}/${Object.values(data.profesor.archivos)[order[j]].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                if(val === 0){
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `${data.profesor.id}`;
                }else{
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `c_v_${data.profesor.id}`;
                }
                n ++;
                if(n >= Object.values(data.archivos).length){
                  dataRef.prof_foto.nombre = state.dbImg[0].nombre;
                  dataRef.prof_foto.url = state.dbImg[0].url;
                  dataRef.prof_cv.nombre = state.dbImg[1].nombre;
                  dataRef.prof_cv.url = state.dbImg[1].url;

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}`);
                    dbRef.child(`${data.profesor.id}`).set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
              j++;
            })
          })
        }else{

          let dataRef = {
            comi_id: data.profesor.coid,
            prof_cv: [],
            prof_ci: data.profesor.ci,
            prof_correo: data.profesor.correo,
            prof_fechadenacimiento: data.profesor.nacimiento,
            prof_foto: [],
            prof_id: data.profesor.id,
            prof_nombre: data.profesor.nombre,
            prof_telefonos:data.profesor.telefonos,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}`);
            dbRef.child(`${data.profesor.id}`).set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Comites'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.comite.archivos).length; k++){
          if(Object.values(data.comite.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.comite.archivos)[k].id] = Object.values(data.comite.archivos)[k];
          }else{
            state.dbImg[k] = '';
          }
        }
        
        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let n = 0;
        let j = 0;

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${data.comite.id}/${Object.values(data.comite.archivos)[element.id].nombre}`);
          task[`${element.id}`] = storageRef.put(element);
          i++;
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              let dataRef = {
                comi_id: data.comite.id,
                comi_activo: data.comite.activo,
                comi_comiPage: data.comite.comipage,
                comi_correo: data.comite.correo,
                comi_costos: data.comite.costos,
                comi_descripcion: data.comite.descripcion,
                comi_fechavigencia: data.comite.fechav,
                comi_foto: [],
                comi_int: data.comite.inthpage,
                comi_integrantes: data.comite.integrantes,
                comi_nombre: data.comite.nombre,
                comi_normativa: [],
                comi_reglamento: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.comite.id}/${Object.values(data.comite.archivos)[`${order[j]}`].nombre}`);
              _
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                console.log(val);
                for(let m = 0; m < Object.values(data.comite.archivos).length; m++){
                  if(Object.values(data.comite.archivos)[m].id !== undefined && val === Object.values(data.comite.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.comite.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){
                  if(state.dbImg[0].nombre !== undefined){
                    dataRef.comi_foto = {
                      nombre: state.dbImg[0].nombre,
                      url: state.dbImg[0].url,
                    } 
                  }else{
                    dataRef.comi_foto = '';
                  }

                  if(state.dbImg[1].nombre !== undefined){
                    dataRef.comi_reglamento = {
                      nombre: state.dbImg[1].nombre,
                      url: state.dbImg[1].url,
                    }
                  }else{
                    dataRef.comi_reglamento = '';
                  }

                  if(state.dbImg[2].nombre !== undefined){
                    dataRef.comi_normativa = {
                      nombre: state.dbImg[2].nombre,
                      url: state.dbImg[2].url,
                    }
                  }else{
                    dataRef.comi_normativa = '';
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.comite.id}`);
                    dbRef.set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
              j++;
            })
          })
        }else{

          let dataRef = {
            comi_id: data.comite.id,
            comi_activo: data.comite.activo,
            comi_comiPage: data.comite.comipage,
            comi_correo: data.comite.correo,
            comi_costos: data.comite.costos,
            comi_descripcion: data.comite.descripcion,
            comi_fechavigencia: data.comite.fechav,
            comi_foto: data.comite.archivos.imagen,
            comi_int: data.comite.inthpage,
            comi_integrantes: data.comite.integrantes,
            comi_nombre: data.comite.nombre,
            comi_normativa: data.comite.archivos.normativa,
            comi_reglamento: data.comite.archivos.reglamento,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}/${data.comite.id}`);
            dbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Anunciantes'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.anunciante.archivos).length; k++){
          if(Object.values(data.anunciante.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.anunciante.archivos)[k].id] = Object.values(data.anunciante.archivos)[k];
          }else{
            state.dbImg[k] = '';
          }
        }
        
        let storageRef = [];
        let percentage = [];
        let order = [];
        let task = {};
        let i = 0;
        let n = 0;
        let j = 0;

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${data.anunciante.id}/${Object.values(data.anunciante.archivos)[element.id].nombre}`);
          task[`${element.id}`] = storageRef.put(element);
          i++;
        })
        
        if(Object.values(task).length !== 0){
          Object.values(data.archivos).forEach(element => {
            task[`${element.id}`].on('state_changed', snapshot => {
              percentage[snapshot.task.blob_.data_.id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage = percentage[snapshot.task.blob_.data_.id];
              if(state.dbImg[snapshot.task.blob_.data_.id].uploadPercentage === 100 && order.length < Object.values(data.archivos).length){
                order.push(snapshot.task.blob_.data_.id)
              }
            }, error => {
              console.log(error.message);
            }, () =>{

              let dataRef = {
                anun_id: data.anunciante.id,
                anun_url: data.anunciante.anunurl,
                anun_activo: data.anunciante.activo,
                anun_nombre: data.anunciante.nombre,
                anun_nombrecontacto: data.anunciante.nombrecon,
                anun_correo: data.anunciante.correo,
                anun_essocio: {
                  anun_essocio_socio: data.anunciante.essocio.socio,
                  anun_essocio_accion: data.anunciante.essocio.accion,
                },
                anun_fechavigencia: data.anunciante.fechav,
                anun_foto: [],
                anun_telefonos: data.anunciante.telefonos,
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.anunciante.id}/${Object.values(data.anunciante.archivos)[`${order[j]}`].nombre}`);
              _
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                console.log(val);
                for(let m = 0; m < Object.values(data.anunciante.archivos).length; m++){
                  if(Object.values(data.anunciante.archivos)[m].id !== undefined && val === Object.values(data.anunciante.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.comite.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){
                  if(state.dbImg[0].nombre !== undefined){
                    dataRef.anun_foto = {
                      nombre: state.dbImg[0].nombre,
                      url: state.dbImg[0].url,
                    } 
                  }else{
                    dataRef.anun_foto = '';
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.anunciante.id}`);
                    dbRef.set(dataRef);
                    state.crearDBVals = false;
                    const success = {
                      0: 'successUpload',
                      1: 'Se ha creado exitosamente'
                    }
                    this.commit('successAdvise', success)
                  }
                }
              })
              j++;
            })
          })
        }else{

          let dataRef = {
            anun_id: data.anunciante.id,
            anun_url: data.anunciante.anunurl,
            anun_activo: data.anunciante.activo,
            anun_nombre: data.anunciante.nombre,
            anun_nombrecontacto: data.anunciante.nombrecon,
            anun_correo: data.anunciante.correo,
            anun_essocio: {
              anun_essocio_socio: data.anunciante.essocio.socio,
              anun_essocio_accion: data.anunciante.essocio.accion,
            },
            anun_fechavigencia: data.anunciante.fechav,
            anun_foto: data.anunciante.archivos.imagen,
            anun_telefonos: data.anunciante.telefonos,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}/${data.anunciante.id}`);
            dbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }
    },
    resetDBValues(state, value){
      if(value === undefined){
        state.successUpload = null;
        state.deletingVal = null;
        state.dbImg = [];
      }else if(state.dbImg[`${value}`] !== undefined){
        state.dbImg[`${value}`] = [];
      }
    },
    falseCargarDB(state){
      state.cargarDB = false;
    },
  },
  actions: {
    getData: async function({commit}, val){
      let tryAgain = true;
      while(tryAgain){
        try{
          tryAgain = false;
          const data = await fetch("https://web-database-66842.firebaseio.com/.json");
          const dbWeb = await data.json();
          const value = {
            0: dbWeb,
            1: val,
          }
          commit('dataWeb', value)
        }catch(err){
          setTimeout(() => {
            tryAgain = true;
          }, 10000);
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
