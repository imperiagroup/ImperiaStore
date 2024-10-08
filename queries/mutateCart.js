export const CREAT_CART = `
    mutation cartCreate {
    cartCreate {
        cart {
        id
        lines(first: 5) {
            edges {
            node {
                merchandise {
                ... on ProductVariant {
                    title
                }
                }
                quantity
            }
            }
        }
        }
    }
    }

`;

export const ADD_TO_CART = `mutation AddToCard($cartId: ID!, $merchandiseId: ID!) {
  cartLinesAdd(
    cartId: $cartId
    lines: {merchandiseId: $merchandiseId, quantity: 1}
  ) {
    cart {
      id
      createdAt
    }
  }
}
`;

export const REMOVE_ITEM = `
mutation removeItem($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    userErrors {
      code
      field
    }
  }
}
`;

export const BUYER_INFO_UPDATE = `
mutation buyerInfoUpdate($cartId: ID!, $address: BuyerIdentityDeliveryAddressInput!) {
    cartBuyerIdentityUpdate(
    buyerIdentity: {deliveryAddressPreferences: {deliveryAddress: $address}}add
    cartId: $cartId
  )
}
`;