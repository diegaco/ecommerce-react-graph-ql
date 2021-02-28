import React from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { gql } from 'apollo-boost';

import App from './App';

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const AppContainer = ({ getCurrentUser: { currentUser }, setCurrentUser, ...otherProps }) =>
  <App
    currentUser={currentUser}
    setCurrentUser={user => setCurrentUser({ variables: { user } })}
    {...otherProps}
  />;

export default compose(
  graphql(GET_CURRENT_USER, {name: 'getCurrentUser'}),
  graphql(SET_CURRENT_USER, {name: 'setCurrentUser'})
)(AppContainer);