import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import Header from './Header'
import StreamList from './streams/StreamList'
import StreamCreate from './streams/StreamCreate'
import StreamShow from './streams/StreamShow'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import history from '../history'

const App = () => {
  return (
    <div className="ui container">

      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:streamId" exact component={StreamEdit} />
          <Route path="/streams/delete/:streamId" exact component={StreamDelete} />
          <Route path="/streams/:streamId" exact component={StreamShow} />
        </Switch>
      </Router>
    </div>
  )
}

export default App