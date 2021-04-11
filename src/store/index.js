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
    itemSelect: false,
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
      
      state.user = {
        activo: user.activo,
        apellido: user.apellido,
        autori: user.autori,
        cargo: user.cargo,
        correo: user.correo,
        correoVeri: user.correoVeri,
        fotos: user.fotos,
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
        fotos: user.fotos,
        id: user.id,
        nombre: user.nombre,
        telefono: user.telefono,
        accion: user.accion,
      }
    },
    registrarUser(state, value){

      const config = {
        apiKey: "AIzaSyCpsNVtsACCeS-amNprGUh0vGOE-SD9y5Q",
        authDomain: "web-database-66842.firebaseapp.com",
        databaseURL: "https://web-database-66842.firebaseio.com",
      }
      const secondaryApp = firebase.initializeApp(config, "Secondary");
      
      secondaryApp.auth().createUserWithEmailAndPassword(value.correo, value.pass).then(user => {

          const valuesRef = {
            usuario:{
              correo: user.user.email,
              correoVeri: user.user.emailVerified,
              nombre: '',
              apellido: '',
              autori: '',
              foto: '',
              telefono: '',
              cargo: '',
              id: user.user.uid,
              activo: true,
              accion: '',
            },
            target: 'Usuarios',
          }
          secondaryApp.auth().signOut();
          secondaryApp.delete()
          this.commit('crearDB', valuesRef);
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
    updateUser(state){

      state.actUser = true;

      let refValues = {
        user_activo: state.user.activo,
        user_apellido: state.user.apellido,
        user_autori: state.user.autori,
        user_cargo: state.user.cargo,
        user_correo: state.user.correo,
        user_correoVeri: state.user.correoVeri,
        user_fotos: state.user.fotos,
        user_id: state.user.id,
        user_nombre: state.user.nombre,
        user_telefono: state.user.telefono,
        user_accion: state.user.accion,
      }

      const dbRef = firebase.database().ref('Usuarios');
      dbRef.child(refValues.user_id).set(refValues).then(()=>{
        const success = {
          0: 'successUpload',
          1: 'Se ha actualizado exitosamente'
        };
        this.commit('successAdvise', success);

        state.actUser = null;
      })
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
                prof_tipoent: data.profesor.tipoent,
                prof_telefonos:data.profesor.telefonos,
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.prof_id}/${Object.values(data.profesor.archivos)[order[j]].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                if(val === 0){
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `${data.profesor.archivos.image.nombre}`;
                }else{
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `c_v_${data.profesor.archivos.cv.nombre}`;
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
            prof_tipoent: data.profesor.tipoent,
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
                comi_redsocial: data.comite.redsocial,
                comi_importancia: data.comite.importancia.valor,
                comi_integrantes: data.comite.integrantes,
                comi_nombre: data.comite.nombre,
                comi_normativa: [],
                comi_reglamento: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.comi_id}/${Object.values(data.comite.archivos)[`${order[j]}`].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
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
                    if(data.comite.importancia.cambiar.show === true){
                      const chImp = firebase.database().ref(`${data.target}/${data.comite.importancia.cambiar.comiCambio}/comi_importancia`);
                      chImp.set(data.comite.importancia.cambiar.valor);
                    }
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
            comi_redsocial: data.comite.redsocial,
            comi_importancia: data.comite.importancia.valor,
            comi_integrantes: data.comite.integrantes,
            comi_nombre: data.comite.nombre,
            comi_normativa: data.comite.archivos.normativa,
            comi_reglamento: data.comite.archivos.reglamento,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            pushdbRef.set(dataRef);
            if(data.comite.importancia.cambiar.show === true){
              const chImp = firebase.database().ref(`${data.target}/${data.comite.importancia.cambiar.comiCambio}/comi_importancia`);
              chImp.set(data.comite.importancia.cambiar.valor);
            }
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
      }else if(data.target === 'Banners'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.banner.archivos).length; k++){
          if(Object.values(data.banner.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.banner.archivos)[k].id] = Object.values(data.banner.archivos)[k];
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
          bann_id: pushdbRef.key,
        }

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.bann_id}/${data.banner.archivos[`${data.name_archivos}${element.id}`].nombre}`);
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
                bann_id: pushdbRef.key,
                bann_activo: data.banner.activo,
                bann_bannerid: data.banner.bannerid,
                bann_fechaedicion: data.banner.fechaed,
                bann_seccion: data.banner.seccion,
                bann_slides: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.bann_id}/${data.banner.archivos[`${data.name_archivos}${order[j]}`].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                for(let m = 0; m < Object.values(data.banner.archivos).length; m++){
                  if(Object.values(data.banner.archivos)[m].id !== undefined && val === Object.values(data.banner.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.banner.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){

                  for(let i = 1; i <= Object.values(state.dbImg).length; i++){
                    dataRef.bann_slides[`slides${i}`] = {
                      nombre: state.dbImg[i].nombre,
                      url: state.dbImg[i].url,
                      info: data.banner.archivos[`slides${i}`].info,
                      urlText: data.banner.archivos[`slides${i}`].urlText
                    }
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
            bann_id: pushdbRef.key,
            bann_activo: data.banner.activo,
            bann_bannerid: data.banner.bannerid,
            bann_fechaedicion: data.banner.fechaed,
            bann_seccion: data.banner.seccion,
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
      }else if(data.target === 'Noticias'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.noticia.archivos).length; k++){
          if(Object.values(data.noticia.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.noticia.archivos)[k].id] = Object.values(data.noticia.archivos)[k];
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
          noti_id: pushdbRef.key,
        }

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.noti_id}/${data.noticia.archivos[`${data.name_archivos}${element.id}`].nombre}`);
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
                noti_id: pushdbRef.key,
                noti_titulo: data.noticia.titulo,
                noti_info: data.noticia.info,
                noti_fecha: data.noticia.fechaed,
                noti_prev: data.noticia.infocort,
                noti_publicar: data.noticia.activo,
                noti_seccion: data.noticia.seccion,
                noti_fotos: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.noti_id}/${data.noticia.archivos[`${data.name_archivos}${element.id}`].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                for(let m = 0; m < Object.values(data.noticia.archivos).length; m++){
                  if(Object.values(data.noticia.archivos)[m].id !== undefined && val === Object.values(data.noticia.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.noticia.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){
                  for(let i = 0; i < Object.values(state.dbImg).length; i++){
                    if(state.dbImg[i].nombre !== undefined){
                      dataRef.noti_fotos[`imagen${i}`] = {
                        nombre: state.dbImg[i].nombre,
                        url: state.dbImg[i].url,
                      }
                    }else{
                      dataRef.noti_fotos[`imagen${i}`] = '';
                    }
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
            noti_id: pushdbRef.key,
            noti_titulo: data.noticia.titulo,
            noti_info: data.noticia.info,
            noti_fecha: data.noticia.fechaed,
            noti_prev: data.noticia.infocort,
            noti_publicar: data.noticia.activo,
            noti_seccion: data.noticia.seccion,
            noti_fotos: data.noticia.archivos,
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
      }else if(data.target === 'Secciones_Extra'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.seccion.archivos).length; k++){
          if(Object.values(data.seccion.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.seccion.archivos)[k].id] = Object.values(data.seccion.archivos)[k];
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
          sec_id: pushdbRef.key,
        }

        Object.values(data.archivos).forEach(element => {
          storageRef= firebase.storage().ref(`/${data.target}/${dataRef.sec_id}/${data.seccion.archivos[`imagen${element.id}`].nombre}`);
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
                sec_id: pushdbRef.key,
                sec_pag: data.seccion.secpag,
                sec_nombre: data.seccion.secnom,
                sec_contenido: data.seccion.contenido,
                sec_imagen_seccion: data.seccion.imagenseccion,
                sec_fotos: [],
                sec_value: data.seccion.secval
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${dataRef.sec_id}/${data.seccion.archivos[`imagen${element.id}`].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                for(let m = 0; m < Object.values(data.seccion.archivos).length; m++){
                  if(Object.values(data.seccion.archivos)[m].id !== undefined && val === Object.values(data.seccion.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.seccion.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){

                  for(let i = 0; i < Object.values(state.dbImg).length; i++){
                    if(state.dbImg[i].nombre !== undefined){
                      dataRef.sec_fotos[`imagen${state.dbImg[i].id}`] = {
                        nombre: state.dbImg[i].nombre,
                        url: state.dbImg[i].url,
                      }
                    }else{
                      dataRef.sec_fotos[`imagen${i}`] = '';
                    }
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
            sec_id: pushdbRef.key,
            sec_pag: data.seccion.secpag,
            sec_nombre: data.seccion.secnom,
            sec_contenido: data.seccion.contenido,
            sec_imagen_seccion: data.seccion.imagenseccion,
            sec_fotos: data.seccion.archivos,
            sec_value: data.seccion.secval
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
      }else if(data.target === 'Usuarios'){

        let dataRef = {
          user_activo: data.usuario.activo,
          user_apellido: data.usuario.apellido,
          user_autori: data.usuario.autori,
          user_cargo: data.usuario.cargo,
          user_correo: data.usuario.correo,
          user_correoVeri: data.usuario.correoVeri,
          user_foto: data.usuario.foto,
          user_id: data.usuario.id,
          user_nombre: data.usuario.nombre,
          user_telefono: data.usuario.telefono,
          user_accion: data.usuario.accion,
        }

        const dbRef = firebase.database().ref(`${data.target}/${data.usuario.id}`);
        dbRef.set(dataRef);
        state.crearDBVals = false;
        const success = {
          0: 'successUpload',
          1: 'Se ha creado exitosamente'
        }
        this.commit('successAdvise', success)
        
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
  
              let storageRef= firebase.storage().ref(`/${data.target}/${data.junta.id}/${data.junta.integrantes[`${order[j]}`].cargo.split(' ').join('_')}`);
              
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

              let storageRef= firebase.storage().ref(`/${data.target}/${data.integrante.id}/${data.integrante.cargo.split(' ').join('_')}`);
              
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
                prof_tipoent: data.profesor.tipoent,
                prof_telefonos:data.profesor.telefonos,
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.profesor.id}/${Object.values(data.profesor.archivos)[order[j]].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                if(val === 0){
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `${data.profesor.archivos.image.nombre}`;
                }else{
                  state.dbImg[val].url = url;
                  state.dbImg[val].nombre = `c_v_${data.profesor.archivos.cv.nombre}`;
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
            prof_cv: data.profesor.archivos.cv,
            prof_ci: data.profesor.ci,
            prof_correo: data.profesor.correo,
            prof_fechadenacimiento: data.profesor.nacimiento,
            prof_foto: data.profesor.archivos.image,
            prof_id: data.profesor.id,
            prof_nombre: data.profesor.nombre,
            prof_tipoent: data.profesor.tipoent,
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
                comi_redsocial: data.comite.redsocial,
                comi_importancia: data.comite.importancia.valor,
                comi_integrantes: data.comite.integrantes,
                comi_nombre: data.comite.nombre,
                comi_normativa: [],
                comi_reglamento: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.comite.id}/${Object.values(data.comite.archivos)[`${order[j]}`].nombre}`);
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
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
                    if(data.comite.archivos.imagen.url !== undefined){
                      dataRef.comi_foto = {
                        nombre: data.comite.archivos.imagen.nombre,
                        url: data.comite.archivos.imagen.url,
                      } 
                    }else{
                      dataRef.comi_foto = '';
                    }
                  }

                  if(state.dbImg[1].nombre !== undefined){
                    dataRef.comi_reglamento = {
                      nombre: state.dbImg[1].nombre,
                      url: state.dbImg[1].url,
                    }
                  }else{
                    if(data.comite.archivos.reglamento.url !== undefined){
                      dataRef.comi_reglamento = {
                        nombre: data.comite.archivos.reglamento.nombre,
                        url: data.comite.archivos.reglamento.url,
                      } 
                    }else{
                      dataRef.comi_reglamento = '';
                    }
                  }

                  if(state.dbImg[2].nombre !== undefined){
                    dataRef.comi_normativa = {
                      nombre: state.dbImg[2].nombre,
                      url: state.dbImg[2].url,
                    }
                  }else{
                    if(data.comite.archivos.normativa.url !== undefined){
                      dataRef.comi_normativa = {
                        nombre: data.comite.archivos.normativa.nombre,
                        url: data.comite.archivos.normativa.url,
                      } 
                    }else{
                      dataRef.comi_normativa = '';
                    }
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.comite.id}`);
                    dbRef.set(dataRef);
                    if(data.comite.importancia.cambiar.show === true){
                      const chImp = firebase.database().ref(`${data.target}/${data.comite.importancia.cambiar.comiCambio}/comi_importancia`);
                      chImp.set(data.comite.importancia.cambiar.valor)
                    }
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
            comi_redsocial: data.comite.redsocial,
            comi_importancia: data.comite.importancia.valor,
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
            if(data.comite.importancia.cambiar.show === true){
              const chImp = firebase.database().ref(`${data.target}/${data.comite.importancia.cambiar.comiCambio}/comi_importancia`);
              chImp.set(data.comite.importancia.cambiar.valor);
            }
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
              
              storageRef.getDownloadURL().then(url => {
                let val = order[n];
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
      }else if(data.target === 'Banners'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.banner.archivos).length; k++){
          if(Object.values(data.banner.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.banner.archivos)[k].id] = Object.values(data.banner.archivos)[k];
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
          storageRef= firebase.storage().ref(`/${data.target}/${data.banner.id}/${data.banner.archivos[`${data.name_archivos}${element.id}`].nombre}`);
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
                bann_id: data.banner.id,
                bann_activo: data.banner.activo,
                bann_bannerid: data.banner.bannerid,
                bann_fechaedicion: data.banner.fechaed,
                bann_seccion: data.banner.seccion,
                bann_slides: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.banner.id}/${data.banner.archivos[`${data.name_archivos}${element.id}`].nombre}`);

              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                for(let m = 0; m < Object.values(data.banner.archivos).length; m++){
                  if(Object.values(data.banner.archivos)[m].id !== undefined && val === Object.values(data.banner.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.banner.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){

                  for(let i = 1; i <= Object.values(data.banner.archivos).length; i++){
                    if(data.banner.archivos[`slides${i}`].id !== undefined){
                      dataRef.bann_slides[`slides${i}`] = {
                        nombre: state.dbImg[i].nombre,
                        url: state.dbImg[i].url,
                        info: data.banner.archivos[`slides${i}`].info,
                        urlText: data.banner.archivos[`slides${i}`].urlText
                      } 
                    }else{
                      dataRef.bann_slides[`slides${i}`] = data.banner.archivos[`slides${i}`];
                    }
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.banner.id}`);
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
            bann_id: data.banner.id,
            bann_activo: data.banner.activo,
            bann_bannerid: data.banner.bannerid,
            bann_fechaedicion: data.banner.fechaed,
            bann_seccion: data.banner.seccion,
            bann_slides: data.banner.archivos,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}/${data.banner.id}`);
            dbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Noticias'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.noticia.archivos).length; k++){
          if(Object.values(data.noticia.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.noticia.archivos)[k].id] = Object.values(data.noticia.archivos)[k];
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
          storageRef= firebase.storage().ref(`/${data.target}/${data.noticia.id}/${data.noticia.archivos[`${data.name_archivos}${element.id}`].nombre}`);
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
                noti_id: data.noticia.id,
                noti_titulo: data.noticia.titulo,
                noti_info: data.noticia.info,
                noti_fecha: data.noticia.fechaed,
                noti_prev: data.noticia.infocort,
                noti_publicar: data.noticia.activo,
                noti_seccion: data.noticia.seccion,
                noti_fotos: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.noticia.id}/${data.noticia.archivos[`${data.name_archivos}${element.id}`].nombre}`);

              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                for(let m = 0; m < Object.values(data.noticia.archivos).length; m++){
                  if(Object.values(data.noticia.archivos)[m].id !== undefined && val === Object.values(data.noticia.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.noticia.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){

                  for(let i = 0; i < Object.values(state.dbImg).length; i++){
                    if(state.dbImg[i].nombre !== undefined){
                      dataRef.noti_fotos[`imagen${i}`] = {
                        nombre: state.dbImg[i].nombre,
                        url: state.dbImg[i].url,
                      }
                    }else{
                      dataRef.noti_fotos[`imagen${i}`] = '';
                    }
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.noticia.id}`);
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
            noti_id: data.noticia.id,
            noti_titulo: data.noticia.titulo,
            noti_info: data.noticia.info,
            noti_fecha: data.noticia.fechaed,
            noti_prev: data.noticia.infocort,
            noti_publicar: data.noticia.activo,
            noti_seccion: data.noticia.seccion,
            noti_fotos: data.noticia.archivos,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}/${data.noticia.id}`);
            dbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Miscellaneous'){
        
        state.dbImg = [];

        if(Object.values(data.archivos).length !== 0){
          for(let j = 0; j < Object.values(data.archivos).length; j++){
            for(let i = 0; i < Object.values(data.miscellaneous.archivos).length; i++){
              if(Object.values(data.miscellaneous.archivos)[i].id !== undefined && Object.values(data.miscellaneous.archivos)[i].id === Object.values(data.archivos)[j].id){
                state.dbImg[Object.values(data.archivos)[j].id] = Object.values(data.miscellaneous.archivos)[i];
              }
            }
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
          storageRef= firebase.storage().ref(`/${data.target}/${data.miscellaneous.id}/${data.miscellaneous.archivos[`archivo${element.id}`].nombre}`);
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
                misc_id: data.miscellaneous.id,
                misc_telefonos: data.miscellaneous.telefonos,
                misc_correos: data.miscellaneous.correos,
                misc_direccion: data.miscellaneous.direccion,
                misc_redes: data.miscellaneous.redes,
                misc_inicio: data.miscellaneous.inicio,
                misc_fin: data.miscellaneous.fin,
                misc_logo: [],
                misc_archivos:[],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.miscellaneous.id}/${data.miscellaneous.archivos[`archivo${order[j]}`].nombre}`);

              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                state.dbImg[val].url = url;
                state.dbImg[val].nombre = data.miscellaneous.archivos[`archivo${val}`].nombre
                n ++;
                if(n >= Object.values(data.archivos).length){

                  for(let i = 0; i < Object.values(data.miscellaneous.archivos).length; i++){
                    if(Object.values(data.miscellaneous.archivos)[i] === ''){
                      if(i === 0){
                        dataRef.misc_logo = '';
                      }else{
                        dataRef.misc_archivos[`archivo${i}`] = {};
                      }
                    }else if(Object.values(data.miscellaneous.archivos)[i].id === undefined){
                      if(i === 0){
                        dataRef.misc_logo = data.miscellaneous.archivos.archivo0;
                      }else{
                        dataRef.misc_archivos[`archivo${i}`] = data.miscellaneous.archivos[`archivo${i}`];
                      }
                    }else{
                      if(Object.values(data.miscellaneous.archivos)[i].id === 0){
                        dataRef.misc_logo = {
                          nombre: state.dbImg[`${Object.values(data.miscellaneous.archivos)[i].id}`]. nombre,
                          nombreCampo: state.dbImg[`${Object.values(data.miscellaneous.archivos)[i].id}`]. nombreCampo,
                          url: state.dbImg[`${Object.values(data.miscellaneous.archivos)[i].id}`]. url,
                        }
                      }else{
                        dataRef.misc_archivos[`archivo${Object.values(data.miscellaneous.archivos)[i].id}`] = {
                          nombre: state.dbImg[`${Object.values(data.miscellaneous.archivos)[i].id}`]. nombre,
                          nombreCampo: state.dbImg[`${Object.values(data.miscellaneous.archivos)[i].id}`]. nombreCampo,
                          url: state.dbImg[`${Object.values(data.miscellaneous.archivos)[i].id}`]. url
                        }
                      }
                    }
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.miscellaneous.id}`);
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
            misc_id: data.miscellaneous.id,
            misc_telefonos: data.miscellaneous.telefonos,
            misc_correos: data.miscellaneous.correos,
            misc_direccion: data.miscellaneous.direccion,
            misc_redes: data.miscellaneous.redes,
            misc_logo: data.miscellaneous.archivos.archivo0,
            misc_inicio: data.miscellaneous.inicio,
            misc_fin: data.miscellaneous.fin,
            misc_archivos:{},
          }

          for(let i = 1; i < Object.values(data.miscellaneous.archivos).length; i++){
            if(Object.values(data.miscellaneous.archivos)[i] !== undefined && Object.values(data.miscellaneous.archivos)[i].url !== undefined){
              dataRef.misc_archivos[`archivo${i}`] = Object.values(data.miscellaneous.archivos)[i]
            }
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}/${data.miscellaneous.id}`);
            dbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Secciones_Extra'){
        
        state.dbImg = [];

        if(Object.values(data.archivos).length !== 0){
          for(let k = 0; k < Object.values(data.seccion.archivos).length; k++){
            if(Object.values(data.seccion.archivos)[k].id !== undefined){
              state.dbImg[Object.values(data.seccion.archivos)[k].id] = Object.values(data.seccion.archivos)[k];
            }else{
              state.dbImg[k] = '';
            }
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
          storageRef= firebase.storage().ref(`/${data.target}/${data.seccion.id}/${data.seccion.archivos[`imagen${element.id}`].nombre}`);
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
                sec_id: data.seccion.id,
                sec_pag: data.seccion.secpag,
                sec_nombre: data.seccion.secnom,
                sec_contenido: data.seccion.contenido,
                sec_imagen_seccion: data.seccion.imagenseccion,
                sec_fotos: [],
                sec_value: data.seccion.secval
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.seccion.id}/${data.seccion.archivos[`imagen${element.id}`].nombre}`);

              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                for(let m = 0; m < Object.values(data.seccion.archivos).length; m++){
                  if(Object.values(data.seccion.archivos)[m].id !== undefined && val === Object.values(data.seccion.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.seccion.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){

                  for(let i = 0; i < Object.values(state.dbImg).length; i++){
                    if(state.dbImg[i].nombre !== undefined){
                      dataRef.sec_fotos[`imagen${state.dbImg[i].id}`] = {
                        nombre: state.dbImg[i].nombre,
                        url: state.dbImg[i].url,
                      }
                    }else{
                      dataRef.sec_fotos[`imagen${i}`] = '';
                    }
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.seccion.id}`);
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
            sec_id: data.seccion.id,
            sec_pag: data.seccion.secpag,
            sec_nombre: data.seccion.secnom,
            sec_contenido: data.seccion.contenido,
            sec_imagen_seccion: data.seccion.imagenseccion,
            sec_fotos: data.seccion.archivos,
            sec_value: data.seccion.secval
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}/${data.seccion.id}`);
            dbRef.set(dataRef);
            state.crearDBVals = false;
            const success = {
              0: 'successUpload',
              1: 'Se ha creado exitosamente'
            }
            this.commit('successAdvise', success)
          }
        }
      }else if(data.target === 'Usuarios'){
        
        state.dbImg = [];

        for(let k = 0; k < Object.values(data.usuario.archivos).length; k++){
          if(Object.values(data.usuario.archivos)[k].id !== undefined){
            state.dbImg[Object.values(data.usuario.archivos)[k].id] = Object.values(data.usuario.archivos)[k];
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
          storageRef= firebase.storage().ref(`/${data.target}/${data.usuario.id}/${data.usuario.archivos[`imagen${element.id}`].nombre}`);
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
                user_id: data.usuario.id,
                user_apellido: data.usuario.apellido,
                user_nombre: data.usuario.nombre,
                user_accion: data.usuario.accion,
                user_autori: data.usuario.autori,
                user_cargo: data.usuario.cargo,
                user_correo: data.usuario.correo,
                user_correoVeri: data.usuario.correoVeri,
                user_activo: data.usuario.activo,
                user_telefono: data.usuario.telefono,
                user_fotos: [],
              }
              
              let storageRef= firebase.storage().ref(`/${data.target}/${data.usuario.id}/${data.usuario.archivos[`imagen${element.id}`].nombre}`);

              storageRef.getDownloadURL().then(url => {
                let val = order[n];
                for(let m = 0; m < Object.values(data.usuario.archivos).length; m++){
                  if(Object.values(data.usuario.archivos)[m].id !== undefined && val === Object.values(data.usuario.archivos)[m].id){
                    state.dbImg[val].url = url;
                    state.dbImg[val].nombre = Object.values(data.usuario.archivos)[m].nombre
                  }
                }
                n ++;
                if(n >= Object.values(data.archivos).length){

                  for(let i = 0; i < Object.values(state.dbImg).length; i++){
                    if(state.dbImg[i].nombre !== undefined){
                      dataRef.user_fotos[`imagen${state.dbImg[i].id}`] = {
                        nombre: state.dbImg[i].nombre,
                        url: state.dbImg[i].url,
                      }
                    }else{
                      dataRef.user_fotos[`imagen${i}`] = '';
                    }
                  }

                  if(n >= Object.values(data.archivos).length){
                    const dbRef = firebase.database().ref(`${data.target}/${data.usuario.id}`);
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
            user_id: data.usuario.id,
            user_apellido: data.usuario.apellido,
            user_nombre: data.usuario.nombre,
            user_accion: data.usuario.accion,
            user_cargo: data.usuario.cargo,
            user_correo: data.usuario.correo,
            user_autori: data.usuario.autori,
            user_correoVeri: data.usuario.correoVeri,
            user_activo: data.usuario.activo,
            user_fotos: data.usuario.archivos,
            user_telefono: data.usuario.telefono,
          }

          n++;
          if(n >= Object.values(data.archivos).length){
            const dbRef = firebase.database().ref(`${data.target}/${data.usuario.id}`);
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
    selectItemSelect(state, val){
      state.itemSelect = val;
    },
    resetItemSelect(state){
      state.itemSelect = false;
    }
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
