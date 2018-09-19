# Askme
## Because we kinda have 4 more days to finish this shit

# Architecture
- __UI KIT__ : native-base
- __Backend__: Firebase via *react-native-firebase*
- __Navigation__ : *react-navigation*
- __State management__ : *react-redux*
- __Store persistence__ : *redux-persist*
- __Forms__ : *formik*


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