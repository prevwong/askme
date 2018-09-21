import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

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
    })
}


export default obj;