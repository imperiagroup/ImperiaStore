export const SEARCH_QUERY = `
    query searchProducts($query: String!, $first: Int) {
        search(query: $query, first: $first, types: PRODUCT) {
            edges {
            node {
                ... on Product {
                id
                title
                handle
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
}
`;
