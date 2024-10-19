export const GET_CUSTOMER = `
query ($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
  id
    firstName
    lastName
    email
    numberOfOrders
    phone
    acceptsMarketing
    metafields(identifiers:[
      {key: "title", namespace: "custom"},{key: "birth_date", namespace: "facts"}]){
      id
      key
      value
      }
    orders(first: 50) {
      nodes {
        canceledAt
        name
        orderNumber
        totalPriceV2 {
          amount
          currencyCode
        }
      }
    }
    addresses(first: 10) {
      nodes {
        address1
        city
        company
        country
        countryCode
        firstName
        lastName
        id
        name
        phone
      }
    }
  }
}`;
export const GET_CUSTOMER_v2 = `
query ($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    firstName
    lastName
    email
    numberOfOrders
    orders(first: 50) {
      nodes {
        name
        orderNumber
        processedAt
        financialStatus 
        totalPriceV2 {
          amount
          currencyCode
        }
        lineItems(first: 5) {
          edges {
            node {
              title
              quantity
              variant {
                image {
                  originalSrc
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
export const GET_PRODUCT_BY_TITLE = `
query ($title: String!) {
  products(first: 5, query: $title) {
    edges {
      node {
        id
        title
        handle
        variants(first: 1) {
          id  # Get variant ID if available
          image {
            url
          }
        }
      }
    }
  }
}
`;
