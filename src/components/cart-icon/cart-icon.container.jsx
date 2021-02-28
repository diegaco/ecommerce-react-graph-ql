import React from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright'; // compose was remove from react-apollo, instead use this originally by loadash
import { gql } from 'apollo-boost';
import CartIcon from './cart-icon.component';


const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS_COUNT = gql`
  {
    itemsCount @client
  }
`;

const CartIconContainer = ({ data: { itemsCount}, toggleCartHidden }) => (
    <CartIcon toggleCartHidden={toggleCartHidden} itemsCount={itemsCount} />
  // Traditional Way
  // <Mutation mutation={TOGGLE_CART_HIDDEN}>
  //   {
  //     toggleCartHidden => (
  //       <Query query={GET_CART_ITEMS_COUNT}>
  //         {
  //           ({ data: { itemsCount } }) => (
  //             <CartIcon toggleCartHidden={toggleCartHidden} itemsCount={itemsCount} />
  //           )
  //         }
  //       </Query>
  //     )
  //   }
  // </Mutation>
);

// Using compose to get a cleaner code but Apollo recommmend using
// Mutation and Query Components
export default compose(
  graphql(GET_CART_ITEMS_COUNT),
  graphql(TOGGLE_CART_HIDDEN, {
    // we pass this name because by default the return name is "mutate"
    name: 'toggleCartHidden'
  })
)( CartIconContainer );