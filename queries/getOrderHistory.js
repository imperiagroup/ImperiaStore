export const GET_ORDER_FOR_CUSTOMER = `query getCustomerOrderHistory($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    orders(first: 50) {
      nodes {
        name
        orderNumber
        processedAt
        fulfillmentStatus
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
              variant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  src
                }
                product {
                  title
                  images(first: 1) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

`;
