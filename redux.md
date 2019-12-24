Redux :
	state management library
	makes creating complex apps easy
	Not required to create a react app
	Not explicitly designed for React, can work with others also

Redux Cycle = Action Creator -> Action -> Dispatch -> Reducers -> State

------------------	 -----------------
|	  STORE		  |  |Action Creators|
| --------------- |	 -----------------
| |  Reducers	| |
| --------------- |
|  				  |
-------------------

Named vs Default Exports : 
--------------------------

export const abc = () => {}; //Named export, while importing somewhere do - import {abc} from ....

const abc = () => {}; 
export default abc;  //Default export, while importing do - import abc from ....


Action creator is the only way we can change the data in redux. It is given to dispatch() and data is changed

Provider -> App -> Connect -> SongList

Provider and connect are components, implemented by react-redux
We create instances of them and pass some props to them

We take the Store and pass it as a prop to the Provider.
Connect - communicates with the Provider using the context system. 
connect sends a message to provider telling it to notify if any change occurs in songList
	if yes then it takes it and passes it as a prop to the songList component


How connect works ?
-------------------- 

function connect() {
	return function (name) {return 'Hi there! ' + name;}
}

So when you call connect()('Sai'); you get 'Hi there! Sai'

const mapStateToProps = (state) => {return {songs:state.songs}}
connect(mapStateToProps)(SongList);
0. Import connect from react-redux
1. Connect always asks whether there is any change in the store
2. If a change happens then it executes mapStateToProps which then maps the new change in data
   to the props of the component given to connect
3. This component is again re-rendered using the new data that it has in its props.

--------------------------------------------------
How to call Action Creators inside the components?

1. Import action creator (which is basically a function) into component
2. inside connect : connect(mapStateToProps, {myActionCreator})(myComponent);
3. This then maps the action creator fn to the props of that component, so use it as this.props.myActionCreator();

Why do this, instead of directly calling the action creator fn after importing?

Because if you call the fn directly, there is no code to contact redux store and give the generated action to it in the creator defn
So when you pass the action creator to connect, it checks for all the functions/action creators given to it, it automatically calls them, takes their output and passes this output to the dispatch function.

Remeber, dispatch fn is inbuild in redux and is the only way to update the store.

* Never pass irrelevant store values inside a Component
	eg. If a component wants to show user details, pass only the details of user to be shown and not the list of all users
		from which component will need to filter out specifics.
		Where to do it then? - In the mapStateToProps() in the component
		- mapStateToProps(state, ownProps){
			//use ownProps.soemthing to access the component xprops
			//filter and pass only required info in the props
		  }

* Good practice to make action creators always responsible to manage state changes

Redux-Thunk - middleware functions
-----------

Why is it needed? 
- Eg. When we are making api calls we would write something like this in our action creator :
	const fetchPosts = async () => {
		const response = await giveMeMagicJSON.get('/posts'); //async request to some api

		return {
			type: 'FETCH_POSTS',
			payload: response
		}
	} 
	//put this code to babel and enable all the presets to see the switch case stuff mentioned below

	It might look like correct code but it's not. Why?
	Because when this code compiles to ES2015 we face 2 problems : 
		1. Action creators must return plain JS objects with type property (and we're are not doing so)
		2. By the time our action gets to the reducer, we wouldn't have fetched our data
	
	When we are using the async/await syntax, it compiles to a switch case,one of which returns a resp which isn't a pojo,
	the dispatcher sends this to store, 1. isn't satisfied and error is shown.

Rules with Redux-Thunk
- Action creators can return action objects or can also return functions
- if an action object is returned, it must have a payload


Action creator --something--> Dispatch fn ---> Middleware(Thunk) --object?---> passes to Reducers
								|								 --function?-> Invokes the fn and passes the dispatch & getState 
								|								    args, --> waits for response
				manually dipatches it to dispatcher<------------<-----------------------------

dispatch - changes data in store, getState - get data from store

* What does thunk do? 
	- Waits for an api request to get completed and gets the response
	- Manually sends the response(action) to the dispatch fn



Rules of Reducers : 
1	 - Must return values other than undefined, if you forget return statement, by default js returns undefined
	 - When we first start up a redux app, each reducer is called one time
2	 - First time it is initialized, it recieves (undefined, some action object) 
	 (undefined, action#1) -> Reducer -> State v1
	 - Next time it is initialized : 
	 (state v1, action#2) -> Reducer -> State v2

	 We don't want undefined, so (selectedSong = null, action#1).. this is null only during startup and selectedSong value from previous state is taken every subsequent time.

3	 - Should only use state + action arguements and not call any outside resource like api request etc

4	 -  Do not mutate the state arguement! (You can but shouldn't)
		Why? //https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts
		- var hasChanged ( bool telling if state of entire app has changed)
		- if hasChanged == true -> new state is returned and react app re-renders else it doesn't
		- Our reducer gets state arg, we mutate it, return it, it is compared with the state in combineReducers fn
		- both the states point to the same addr, so comparision is always true -> hasChanged = false always
		- App never re-renders and your mutations are never visible.

What to do when you want to modify the state?
---------------------------------------------

BAD WAY
state.push('abc'), state.pop(), state[0] = 'abc' 
//all modifying the same state obj in memory -> As per Rule 4. hasChanged will be false -> app doesn't re-render, modifications not visible

GOOD WAY
//just make a new state obj, modify it and return it.
1.Array Push operation --> [...state, 'newItem']
2.Array Pop operation --> state.filter(element => element!='hi')
3.Replace element in array --> state.map(e => e === 'hi' ? 'bye' : e)

1.Updating prop in obj --> {...state, name:'abhi'}
2.Adding prop in obj --> {..state, age:30}
3.Delete prop from obj --> Use loadash, _.omit(state,'name')



REACT ROUTER:
-------------

* Import BrowserRouter and Route components from 'react-router-dom'

- When we create an instance of BrowserRouter, it makes a history object.
- history obj extracts the url path : '/home' of 'localhost:3000/home' and sends it to BrowserRouter
- BrowserRouter sends these path to individual Route components, which show themselves if the paths match
- <Route path='/home' component={homeComp}/>

* How to not navigate in React Apps : 
	- Don't use <a /> tags for navigation
	- When you use it, the deployement server responds with index.html file, dumps the old file it was showing
	  and along with it all the redux/react state data is deleted
* Use <Link to="/home" /> instead : 
	- React Router prevents browser from fetching the index.html file again
	- It sees the url in link -> sends it to history obj -> BrowserRouter shows appropriate component, url on browser also changes

* Any component which isn't a child of BrowserRouter cannot use react router components like Link. So place everything inside BrowserRouter



Authentication in React (Using Google OAuth) :
----------------------------------------------
278709796472-6f1jbller9oqufk24v6a2ham2khkr558.apps.googleusercontent.com


///////////////////////////////////////////////////////
Mutations in Javascript : 
-------------------------
Arrays and Objects are mutable
Strings and numbers are immutable

const str = 'hi';
str[0] = 'b';
console.log(str) // 'hi'

const myArray = ['red', 'green'];
//mutation
myArray.push('yellow') // ['red', 'green', 'yellow']
myArray.pop() //['green', 'yellow']
myArray[0] = 'black' //['black', 'yellow']

const myObj = {name: 'sai'};
//mutation
myObj.name = 'abhi'; {name:'abhi'}
myObj.age = 30; {name:'abhi',age:30}


Equality in Javascript :
------------------------
1 === 1 , 'hi' === 'hi' //give true, value comparision
const nums = [1,2]; nums === nums //gives true
nums === [1,2];//gives false, because comparision of where 
data is stored in memory (address) happens and not the value







toshal
mahantesh
rakshit
senko 
savin
sakar
ashish