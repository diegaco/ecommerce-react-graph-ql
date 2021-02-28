import React from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { gql } from 'apollo-boost';

import CheckoutItem from './checkout-item.component';

const ADD_ITEM = gql`
  mutation AddItem($item: Item!) {
    addItem(item: $item) @client
  }
`;

const REMOVE_ITEM = gql`
  mutation RemoveItem($item: Item!) {
    removeItem(item: $item) @client
  }
`;

const CLEAR_ITEM = gql`
  mutation ClearItem($item: Item!) {
    clearItem(item: $item) @client
  }
`

const CheckoutItemContainer = ({addItem, removeItem, clearItem, ...otherProps}) => (
  <CheckoutItem
    addItem={ item => addItem({ variables: { item } })}
    removeItem={ item => removeItem({ variables: { item } })}
    clearItem={ item => clearItem({ variables: { item } })}
    {...otherProps}
  />
);

export default compose(
  graphql(ADD_ITEM, {name: 'addItem'}),
  graphql(REMOVE_ITEM, {name: 'removeItem'}),
  graphql(CLEAR_ITEM, {name: 'clearItem'}),
)(CheckoutItemContainer);