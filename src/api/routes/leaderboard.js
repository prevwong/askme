import firebase from 'react-native-firebase';

const getLeaderBoard = () => {
	return new Promise((resolve, reject) => {
		let leaderBoard = [];
		firebase.firestore().collection("leaderboard").get().then((lb) => {
			if(lb.length === 0) {
				reject("Leaderboard not available");
			}
			else {
				resolve(lb);
			}
		});
	});
}

export default {
	getLeaderBoard
}