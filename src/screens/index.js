import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

const obj = {
    Auth: createBottomTabNavigator({
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
    UserLanding: createStackNavigator({
        Landing: { screen: require("./user/index.js").default, },
    }),
}


export default obj;