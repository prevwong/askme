const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp();

// const redundant_users = {
//     reminders: {
//         notifications: {
//             users: true
//         },
//         users: true
//     },
//     projects: {
//         users: true
//     }
// }

// const redundant_update = (obj, collections) => {
//     if ( !collections ) collections = [];
//     Object.keys(obj).forEach((key) => {
//         if ( typeof(obj[key]) === "object" ) {
//             redundant_update(obj[key], [...collections, key]);
//         } else {
//             if ( obj[key] === true ) {
//                 collections.forEach((collection) => {
//                     firebase.firestore().collection(collection).get().then((querySnapshot) => {
//                         querySnapshot.forEach(doc => {

//                         });
//                     });
//                 })
//             }
//         }
//     });
// }

function updateCollectionUser(collection, property, uid, data) {

    admin.firestore().collection(collection).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            if ( doc.exists ) {
                const doc_data = doc.data();
                if ( doc_data[property][uid] ) {
                    doc_data[property][uid] = Object.assign(doc_data[property][uid], data);
                    
                    admin.firestore().doc(`${collection}/${doc.id}`).update(doc_data);
                }
            }
        });
    })
}

exports.updateProfile = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();

        const { first_name, last_name } = newValue;
        const { first_name: old_first_name, last_name: old_last_name } = oldValue;

        if ( first_name !== old_first_name || last_name !== old_last_name ) {
            const data = {
                displayName: `${first_name} ${last_name}`
            };

            updateCollectionUser("reminders", "users", context.params.userId, data);
            
            return admin.auth().updateUser(context.params.userId, data);
        }
    });