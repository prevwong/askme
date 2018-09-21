# Askme
##### Because we kinda have 4 more days to finish this shit

# Architecture
- __UI KIT__ : native-base
- __Backend__: Firebase via *react-native-firebase*
- __Navigation__ : *react-navigation*
- __State management__ : *react-redux*
- __Store persistence__ : *redux-persist*
- __Forms__ : *formik*

# Google Sign In __DEVELOPER_ERROR__
If you received the __DEVELOPER_ERROR__ message when signing in, then you will need to add your SHA-1 fingerprint to the Firebase app.

- Retrieve your SHA-1 fingerprint by following one of the answers [here](https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate/33479550#33479550) depending on your OS 
- On your firebase askme app console, navigate to Project Settings > General. Scroll all the way down, you should see "Your Apps"
- On "Askme Android (com.askme)", click "Add fingerprint"; and add your fingerprint you retrieved earlier

# Wtf is inside /src
- /api/
  - /paths/
    - put your API functions here, preferably in identifiable files
  - index.js
    - bootstraps all your API functions from /paths into a single callable `api(path/fn)` function.
- /components
  - Keep your general components here
- /screens
  - /auth/
    - contains screens required in authentication; when the user is not logged in 
  - /user
    - contains screens to display to the logged-in user
  - index.js
    - specifies "routing" to the screens in /auth and /user.
- /store 
  - /actions
    - contains redux actions
  - /reducers
    - contains reducers
  - index.js
    - exports redux store
- /utils
  - contains helper functions

# Adding new screens
- Since y'all will be adding screens related to when an user is authenticated, add your screens to screens/user/pages (try to create folders to avoid clutter, eg: Keep your Quiz related screens in screens/user/pages/Quiz). 
- Then add a route at the `UserPages` property in screens/user/index.js, like so:
```js
 UserPages: createDrawerNavigator({
    Dashboard: { screen: require("./user/Dashboard").default, },
}, {
   ...
})
```
- When you need to route to another screen, you can do so by calling the "key" of which your registered your screen to. Take the above example which I registered my Dashboard screen at the `Dashboard` key. So when you need to navigate to this screen from elsewhere, you can do `this.props.navigation.navigate('Dashboard')`

# Using APIs
- You should add API functions into the /src/api/routes folder. Look at the existing files in that folder for reference. If you want to create another file in the routes folder, then make sure to link that file in the `paths` object at /src/api/index.js like so:
```js
const paths = {
    notifications: require("./routes/notifications").default,
    users: require("./routes/users").default
}
```
- In order to use the API in your component, you will need to call the `api(file/method)` where `method` is the name of the API function and `file` is name of the file in src/api/routes where the method is located. So for example I added a new API function called `getUsers` in src/api/routes/users, then I will call `api(user/getUsers)`
```
import api from "api"
class Example extends Component {
  myMethod(){
    api("file/method", {params}).then(res => {

    }).catch(err => {

    })
  }
  ...
}
