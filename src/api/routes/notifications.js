import firebase from "react-native-firebase";

let notificationDisplayedListener = null,
    notificationListener = null;

const checkNotifications = async() => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        const channel = new firebase.notifications.Android.Channel('remindus-channel', 'Remind-Us Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('RemindUs notification channel');

        firebase.notifications().onNotificationDisplayed((notification));
        return {
            onNotificationDisplayed: firebase.notifications().onNotificationDisplayed,
            onNotification: firebase.notifications().onNotification,
        }
    } else {
        console.log("no permission, requesting...")
        try {
            await firebase.messaging().requestPermission();
            checkNotifications(); // retry
        } catch (error) {
            console.log("notification request error", error);
        }
    }

}

export default {
    checkNotifications
}