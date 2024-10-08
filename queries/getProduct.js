export const GET_PRODUCTS = `
  query($number: Int) {
    products(first: $number) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          metafields(identifiers: [
            {key: "short_description", namespace: "custom"},
            {key: "paymentoption", namespace: "custom"},
            {key: "shippingandreturn", namespace: "custom"},
            {key: "sustainability", namespace: "custom"},
            {key: "stylewith", namespace: "custom"},
            {key: "comingsoon", namespace: "custom"},
            {key: "sizeguide", namespace: "custom"},
          ]) {
              id
              key
              value
              reference {
                      ... on MediaImage {
                          id
                          image {
                              src
                          }
                      }
              }
          }

          variants(first: 10) {
            nodes {
              price {
                amount
                currencyCode
              }
                selectedOptions {
                    name
                    value
            }
            }
          }
          images(first: 10) {
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
`;

export const GET_PRODUCT_BY_HANDLE = `
query($handle: String!) {
  productByHandle(handle: $handle) {
    availableForSale
    descriptionHtml
    handle
    id
    title
    trackingParameters
    totalInventory
    updatedAt
    seo {
      description
      title
    }
    metafields(identifiers: [
      {key: "short_description", namespace: "custom"},
      {key: "paymentoption", namespace: "custom"},
      {key: "shippingandreturn", namespace: "custom"},
      {key: "sustainability", namespace: "custom"},
      {key: "stylewith", namespace: "custom"},
      {key: "comingsoon", namespace: "custom"},
      {key: "sizeguide", namespace: "custom"},
    ]) {
        id
        key
        value
        reference {
                ... on MediaImage {
                    id
                    image {
                        src
                    }
                }
        }
    }
    images(first: 10) {
        edges {
            node {
                src
            }
        }
    }
    variants(first: 10) {
      nodes {
        availableForSale
                      price {
                amount
                currencyCode
              }
                selectedOptions {
                    name
                    value
            }

        image {
          src
        }
        id
      }
    }
  }
}
`;

export const GET_PRODUCTS_BY_ID = `
  query($ids: [ID!]!  ) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        description
        availableForSale
            metafields(identifiers: [
      {key: "short_description", namespace: "custom"},
      {key: "paymentoption", namespace: "custom"},
      {key: "shippingandreturn", namespace: "custom"},
      {key: "sustainability", namespace: "custom"},
      {key: "stylewith", namespace: "custom"},
      {key: "comingsoon", namespace: "custom"},
      {key: "sizeguide", namespace: "custom"},
    ]) {
        id
        key
        value
        reference {
                ... on MediaImage {
                    id
                    image {
                        src
                    }
                }
        }
    }

        images(first: 10) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 10) {
          nodes {
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;
