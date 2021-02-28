import { gql } from 'apollo-boost';
import { addItemToCart, getCartItemsCount, getCartTotal, removeItemFromCart, clearItem } from './cart.utils';

export const typeDefs = gql`

  extend type Item {
    quantity: Int
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItem(item: Item!): [Item]!
    RemveItem(item: Item!): [Item]!
    SetCurrentUser(user: User!): User!
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS_COUNT = gql`
  {
    itemsCount @client
  }
`;

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

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`

const updateCartItemsRelatedQueries = (cache, newCartItems) => {
  cache.writeQuery({
    query: GET_CART_ITEMS_COUNT,
    data: { itemsCount: getCartItemsCount(newCartItems) }
  });

  cache.writeQuery({
    query: GET_CART_TOTAL,
    data: { cartTotal: getCartTotal(newCartItems) }
  });

  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCartItems }
  });
};

export const resolvers = {
  Mutation: {
    // toggleCartHidden: (_root, _args, _context, _info) => {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
        // variables: {}
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },

    addItem: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    removeItem: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = removeItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    clearItem: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = clearItem(cartItems, item);
      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    setCurrentUser: (_root, { user }, { cache }) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user }
      });

      return user;
    }
  }
}