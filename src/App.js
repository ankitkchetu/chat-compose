import React from 'react'
import Home from './components/Home'
import {Route, Switch } from 'react-router-dom';




import './asserts/styles.css';
import './asserts/flowy.min.css';
class App extends React.Component {
  render() {
    return (
      <main>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
      </main> 
    )
  }
}

export default App;
