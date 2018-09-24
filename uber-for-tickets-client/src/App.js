import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import LoginPage from './components/login/LoginPage'
// import SignupPage from './components/signup/SignupPage'
// import LogoutPage from './components/logout/LogoutPage'
import './App.css'
// import TopBar from './components/layout/TopBar'

import {apiUrl} from './constants'

import EventsListContainer from './components/EventsListContainer'


class App extends Component {
  render() {
    console.log(`Api base url: ${apiUrl}`)
    return (
      <Router>
        <div className="App">
          {/* <nav>
            <TopBar />
          </nav> */}
          <main style={{marginTop:75}}>
            {/* <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} /> */}
            <Route exact path="/events" component={EventsListContainer} />
            {/* <Route exact path="/events/:id" component={EventDetailsContainer} /> */}
            <Route exact path="/" render={ () => <Redirect to="/events" /> } />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
  