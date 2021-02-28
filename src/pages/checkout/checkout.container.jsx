import React from 'react';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import CheckoutPage from './checkout.component';

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CART_TOTAL = gql`
  {
    cartTotal @client
  }
`;

const CheckoutContainer = ({getCartItems: {cartItems}, getCartTotal: { cartTotal} }) => (
  // <Query query={GET_CART_ITEMS}>
  //   {
  //     ({ data: { cartItems } }) => (
  //       <Query query={GET_CART_TOTAL}>
  //         {
  //           ({ data: {cartTotal}}) => <CheckoutPage cartItems={cartItems} total={cartTotal} />
  //         }
  //       </Query>
  //     )
  //   }
  // </Query>
   <CheckoutPage cartItems={cartItems} total={cartTotal} />
);

export default compose(
  graphql(GET_CART_ITEMS, { name: 'getCartItems' }),
  graphql(GET_CART_TOTAL, { name: 'getCartTotal'}),
)(CheckoutContainer);