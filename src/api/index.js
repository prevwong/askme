const paths = {
    notifications: require("./routes/notifications").default,
    users: require("./routes/users").default,
    questions: require("./routes/questions").default,
    leaderboard: require("./routes/leaderboard").default
}
export default api = async (path, params) => {
    const path0 = path.split('/')[0];
    const path1 = path.split('/')[1];

    try {
        const res = await paths[path0][path1](params);
        return Promise.resolve(res);
    } catch (err) {
        // if (err.message.contains("default.auth().currentUser.uid")) {
        //     // user not yet login, but no need to throw error
        //     return Promise.resolve(false);
        // }
        let message = "Something went wrong, please try again later."
        if (err.response) {
            if (err.response.data.message) {
                message = err.response.data.message;
            }
        }

        // Toast.fail(message, 1);

        return Promise.reject(err);
    }
};
