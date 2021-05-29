import firebase from 'firebase'
import {USER_STATE_CHANGE} from '../constants/index'


export function fetchUser(){
    return ((dispacth) => {
        firebase.firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uir)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                console.log(snapshot.data)
                dispatch({
                    type: USER_STATE_CHANGE, 
                    currentUser: snapshot.data()
                }) 
            }else{
                console.log('does not exist')
            }
        })
    }) 
}