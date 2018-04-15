import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import axios from 'axios';

import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
});

axios.get('https://api.github.com/users/lexcorp16').then(data => {
  console.log(data.data);
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
