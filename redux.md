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




https://www.youtube.com/watch?v=OxxpIhDplY0

