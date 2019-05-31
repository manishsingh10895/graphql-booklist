import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/booklist';
import AddBook from './components/addBook';

// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:4500/graphql'
});

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
        <h1>Reading List</h1>
          <BookList></BookList>

          <AddBook></AddBook>
        </div>
      </ApolloProvider>
    )

  }
}

export default App;
