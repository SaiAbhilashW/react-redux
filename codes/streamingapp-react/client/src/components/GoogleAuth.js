import React from 'react';

class GoogleAuth extends React.Component{
    //initialize component level state
    currentComponent = this;
    //when implementing redux, isSignedIn is moved to redux store so that all the components can access it
    state = { isSignedIn : null};

componentDidMount(){
    console.log('inside componentDidMount')
    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: '278709796472-6f1jbller9oqufk24v6a2ham2khkr558.apps.googleusercontent.com',
            scope: 'email'
        }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            console.log(`Sign in status : ${this.auth.isSignedIn.get()}`);
            this.auth.isSignedIn.listen(this.onAuthChange);
            this.setState({isSignedIn: this.auth.isSignedIn.get()}); //component level state
        });
    });

    //this.setState(this.auth.isSignedIn.get();
}

onAuthChange=()=>{
    this.setState({isSignedIn:this.auth.isSignedIn.get()});
}

onSignInClick = () => {
    this.auth.signIn();
}

onSignOutClick = () => {
    this.auth.signOut();
}

renderAuthButton=()=>{
    if(this.state.isSignedIn === null){
        return null;
    } else if(this.state.isSignedIn === true){
        return (
            <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />Sign Out
            </button>
        );
    } else {
        return <button onClick={this.onSignInClick} className="ui red google button">
            <i className="google icon" />Sign in with Google
            </button>
    }
}

    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;


/**
 * Learnings : 
 * 
 * Sign in and sign out functions are asynchronous and return promises, so use then()
 * 
 * setState() and render() shouldn't be written such that they call each other.
 * So setState() should always be called on an event like button click here and not inside render() or functions which are called by render() 
 * 
 * toggleSign = this.toggleSign.bind(this); to bind component's member vars in toggleSign, so that those vars can be accessed by this.something()
 */