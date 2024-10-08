export const GET_METAOBJECT = `
    query($handle: String!, $type: String!) {
        metaobject(handle: {handle: $handle, type: $type}) {
            fields{
                key
                reference {
                    ... on GenericFile {
                    id
                    url
                    }
                    ... on Metaobject {
                    fields {
                        key
                        type
                        value
                    }
                        handle
                        id
                        }
                    ... on MediaImage {
                    id
                    image {
                        src
                    }
                    }
                    ... on Video {
                    id
                    sources {
                        url
                    }
                    }
                }
                value
                type
            }
            handle
            id
        }
        }
`;

export const GET_METAOBJECTS = `
    query($type: String!) {
          metaobjects(type: $type, first: 250) {
            nodes {
            fields {
                key
                type
                value
                reference {
                ... on GenericFile {
                    id
                    url
                }
                ... on MediaImage {
                    id
                    image {
                        src
                    }
                }
                ...on Metaobject {
                    id
                    handle                    
                }
                ... on Video {
                    id
                    sources {
                    url
                    }
                }
            }
            }
            handle
            id
            }
        }
    }
`;
