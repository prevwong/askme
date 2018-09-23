export default {
    Dashboard: { screen: require("./pages/Dashboard").default, },
    Play: { screen: require("./pages/Play").default, },
    Quiz: { screen: require("./pages/Quiz").default, },
    Question: { screen: require("./pages/Quiz/Question").default },
    QuizResult: { screen: require("./pages/Quiz/QuizResult").default },
    LeaderBoard: { screen: require("./pages/LeaderBoard").default }
};