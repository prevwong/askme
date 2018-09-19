import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

const obj = {
    auth: createBottomTabNavigator({
        SignIn: {
            screen: require("./auth/SignIn").default,
            navigationOptions: {
                title: 'Sign In',
            }
        },
        SignUp: {
            screen: require("./auth/SignUp").default,
            navigationOptions: {
                title: "Sign Up"
            }
        }
    }, {
            tabBarPosition: 'bottom',
            tabBarOptions: {
                showLabel: true,
                labelStyle: {
                    fontSize: 12
                },
                style: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    paddingBottom: 3
                },
            }
        }),
    user: createStackNavigator({
        Landing: { screen: require("./user/Landing").default, },
        Dashboard: { screen: require("./user/Dashboard").default, },
        VerifyEmail: { screen: require("./user/VerifyEmail").default, },
        GetUserInfo: { screen: require("./user/GetUserInfo").default, },
    }, {
            initialRouteName: "Landing"
        })
}


export default obj;