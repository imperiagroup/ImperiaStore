export const GET_CART = `
  query ($id: ID!) {
    cart(id: $id) {
    id
    createdAt
    updatedAt
    checkoutUrl
    lines(first: 250) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              product {
                title
              }
              image {
                src
              }
              priceV2 {
                amount
                currencyCode
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
      deliveryAddressPreferences {
        ... on MailingAddress {
          address1
          address2
          city
          provinceCode
          countryCodeV2
          zip
        }
      }
      preferences {
        delivery {
          deliveryMethod
        }
      }
    }
}
    }
`;
