import firebase from "react-native-firebase";

// const addNumber = ({ number }) => {
//     const { displayName, photoURL } = firebase.auth().currentUser;
//     const id = firebase.auth().currentUser.uid;
//     firebase.firestore().collection("quiz").get().then()
// }

const getQuestions = () => {
    return new Promise((resolve, reject) => {
        let questions = []
        firebase.firestore().collection("questions").get().then((questions) => {
            // snapshot.forEach(question => {
            //     console.log(question.data())
            // })
            if (questions.length == 0){
                reject("No questions in database")
            } else {
                // console.log(questions)
                // questions.forEach((q) => {
                //     console.log(q.id, "=>", q.data())
                // })
                resolve(questions)
            }
        });
        
    });
}
export default {
    getQuestions
}