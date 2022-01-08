# Create React App Template for Microsoft Graph and MUI 

This project is [Create React App](https://github.com/facebook/create-react-app) template for 
building SPA which utilize [Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) and 
[MUA](https://mui.com/).

## Prerequisites

To get access token for Microsoft graph, this project requires 
Azure AD application which enable authorization code flow with PKCE.
To register Azure AD application, 
follow [the instruction](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration).

## Configuration

Create .env file in the root directory of the project with following content. 

```
REACT_APP_AAD_CLIENT_ID=[Your Client Id of Azure AD application]
REACT_APP_HOST=http://localhost:3000/
REACT_APP_AAD_TENANT_ID=[Your Id of Azure AD Tenant]
```