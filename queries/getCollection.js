export const GET_COLLECTION = `
    query($handle: String!) {
        collectionByHandle(handle: $handle) {
            title
            products(first: 10) {
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
        }
`

export const GET_ALL_COLLECTIONS = `
    query {
        collections(first: 250) {
            edges {
                node {
                    id
                    title
                    handle
                    image {
                        src
                    }
                    metafields(identifiers: {namespace: "custom", key: "isbig"}) {
                        key
                        value
                    }   
                }
            }
        }
    }
`;