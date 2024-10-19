export const LOGIN = `
  mutation Login($email: String!, $password: String!) {
    customerAccessTokenCreate(input: {email: $email, password: $password}) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
      userErrors {
        field
        message
      }
    }
}`;

export const LOGOUT = `
  mutation Logout ($customerAccessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
    deletedAccessToken
    deletedCustomerAccessTokenId
    userErrors {
      field
      message
    }
  }
  }
`;

export const RESET_PASSWORD = `
mutation resetPassword($email: String!) {
  customerRecover(email: $email) {
    userErrors {
      field
      message
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`;
export const GET_CUSTOMER_ID_BY_EMAIL = `
query getCustomerIdByEmail($email: String!) {
  customers(first: 1, query: $email) {
    edges {
      node {
        id
      }
    }
  }
}
`;

export const UPDATE_NEW_PASSWORD = `
mutation updateNwwPassword($password: String!, $resetUrl: URL!) {
  customerResetByUrl(password: $password, resetUrl: $resetUrl) {
    customerUserErrors {
      code
      field
      message
    }  
      userErrors {  
        field
        message
      }
  }
}
`;

export const ADD_NEW_ADDRESS = `
mutation addNewAddress($address: MailingAddressInput!, $customerAccessToken: String!) {
  customerAddressCreate(
    address: $address,
    customerAccessToken: $customerAccessToken
  ) {
    customerAddress {
      id
      address1
      city
      country
      province
      zip
    }
    userErrors {
      field
      message
    }
  }
}

`;

export const CUSTOMER_UPDATE = `mutation UPDATE_CUSTOMER_METAFIELDS($metafields: [MetafieldsInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
      id
      key
      namespace
      value
    }
    userErrors {
      field
      message
    }
  }
}


`;

export const UPDATE_CUSTOMER_PROFILE = `mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
  customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
    customer {
      id
      phone
      firstName
      lastName
      acceptsMarketing
    }
    customerUserErrors {
      field
      message
    }
    userErrors {
      field
      message
    }
  }
}`;
export const CREATE_CUSTOMER = `
  mutation createCustomer ($email: String!, $password: String!, $firstName: String!, $lastName: String!, $acceptsMarketing: Boolean!) {
    customerCreate(
      input: {email: $email, password: $password, firstName: $firstName, lastName: $lastName, acceptsMarketing: $acceptsMarketing}
    ) {
      userErrors {
        field
        message
      }
    }
  }
`;

//Only identifier

export const UPDATE_CUSTOMER_METAFIELD = `mutation UPDATE_CUSTOMER_METAFIELDS($customerAccessToken: String!, $customer: CustomerUpdateInput!) {   
  customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
    customer {
      id
      metafields {
        namespace
        key
        value
        id
      }
    }
    userErrors {
      field
      message
    }
  }
}`;

export const UPDATE_CUSTOMER_METAFIELD_v2 = `mutation UPDATE_CUSTOMER_METAFIELDS($customerAccessToken: String!, $customer: CustomerUpdateInput!) {   
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          metafields(identifiers: [{ namespace: "custom", key: "title" }, { namespace: "facts", key: "birth_date" }]) {
            namespace
            key
            value
            id
          }
        }
        userErrors {
          field
          message
        }
      }
    }`;

export const CUSTOMER_PROFILE = `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
        updatedAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export const GET_RESETURL = `mutation GenerateAccountActivationUrl($customerID:String!) {
  customerGenerateAccountActivationUrl(customerId:$customerID) {
    accountActivationUrl
    userErrors {
      field
      message
    }
  }
}`;

export const Delete_address = `mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
  customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
    deletedCustomerAddressId
    userErrors {
      field
      message
    }
  }
}`;
