------------------REACT------------------
component :
     nesting - component inside another
     reusability - use it more than once
     configuration - configure it upon creation as per need

parent and child components : 
Props : passing data from parent to child   to customise the child
Eg. 1 <myChildComp author="Sai" age="23"/>
--- inside child comp defn ---
const myChildComp = (props) => {
console.log(props);
return <div> {props.author} - {props.age}</div>
}

Eg. 2  <parentComponent><childComponent>..</childComponent></parentComponent>
 - child component is passed as a prop to the parent, it can be accessed as {props.children}

Functional & Class Based components : 

Functional Component for showing simple content without any logic
const App = () => {
  return <div>Hi</div>;
}

Class Component network req/ respond to user input 
- better code organisation
- has 'state' system
- understands lifecycle event (doing some task when app starts)
class App extends React.Component {
//react says we need to define this, rest of the necessary stuff is taken from React.Component
  render(){
    return <div>hi</div>;
  }
}

--------------------------------------------

State : 
- only usable with class components, we use hooks to do this in functional components
- state is a JS Object which contains data relevent to a component
- updating 'state' on a component causes the component to almost instantly rerender
- must be initialized when coponent is created
- State can only be updated using function setState
1. Initializing state : //only time we do direct assignment to state, everyother time use setState()
  a) constructor(props){
      super(props);
      this.state = { name: "Sai", age: null };
   }
  b) state = { name: "Sai", age: null }; //outside constructor
       
2. Updating state : this.setState({name : "Yo"});

--------------------------------------------

Lifecycle methods : 
       methods called at different times
       1. constructor - good place to do state initialization
          * don't do data loading inside constructor (best practices)
       2. render - avoid doing anything besides returning jsx
       3. componentDidMount - when component first gets loaded - initial data loading, calling external methods
       4. componentDidUpdate - when component updates/ setState called - data loading requests upon user inputs, etc
          * render is called before componentDidUpdate 
       5. componentWillUnmount - anytime we are about to remove component - does clean up
       6. shouldComponentUpdate
       7. getDerivedStateFromProps
       8. getSnapshotBeforeUpdate 
       The last 3 are infrequently used

Passing state as prop - 
Eg. class App extends React.Component {
    state = {name: null}
    componentDidMount(){
      blah blah.. this.setState({name:"Sai"}); 
      //anytime you call setState the component renders itself and also the children it is showing.
      i.e. AnotherComponent in this case.
    }
    render(){
      return <AnotherComponent nameProp = {this.state.name}></AnotherComponent>
    }
}

Default Props:
ComponentName.defaultProps = {
  message: "This is default",
  name: "Sai"
};

--------------------------------------------

Axios vs Fetch
 axios - 3rd party package
 fetch - function build in most browsers

axios
  .get('https://www.api.com/getStuff ',{
    params: {query: myAbc},
    headers: {
      Authorisation: 'client-key'
    }
  })
  .then(response => {
    console.log(response.data.results);
  })

  or 
async onsearch(){
  const response = await axios
                  .get('https://www.api.com/getStuff ',{
                    params: {query: myAbc},
                    headers: {
                      Authorisation: 'client-key'
                    }
                  });
  console.log(response);
}
