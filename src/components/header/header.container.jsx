import React from 'react';
import * as compose from 'lodash.flowright'
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import Header from './header.component';

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`

const HeaderContainer = ({ getCartHidden: { cartHidden }, getCurrentUser: { currentUser }}) => (
  <Header hidden={cartHidden} currentUser={currentUser}/>
);

export default compose(
  graphql(GET_CART_HIDDEN, {name: 'getCartHidden'}),
  graphql(GET_CURRENT_USER, {name: 'getCurrentUser'}),
)(HeaderContainer);
