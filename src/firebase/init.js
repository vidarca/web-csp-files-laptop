import firebase from 'firebase'
import firestore from 'firebase/firestore'
 
const firebaseConfig = {
    apiKey: "AIzaSyCpsNVtsACCeS-amNprGUh0vGOE-SD9y5Q",
    authDomain: "web-database-66842.firebaseapp.com",
    databaseURL: "https://web-database-66842.firebaseio.com",
    projectId: "web-database-66842",
    storageBucket: "web-database-66842.appspot.com",
    messagingSenderId: "632332486857",
    appId: "1:632332486857:web:4eafbbcf38663cfed76518",
    measurementId: "G-NTJRG68DC9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
