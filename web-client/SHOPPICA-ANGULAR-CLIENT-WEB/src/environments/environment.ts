// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userServiceUrl: 'https://aspnetclusters-37619-0.cloudclusters.net',
  orderServiceUrl: 'https://aspnetclusters-37670-0.cloudclusters.net',
  productServiceUrl: 'https://javaclusters-38542-0.cloudclusters.net',
  recommendationServiceUrl: 'https://shopica-recommendation.herokuapp.com',
  messageServiceUrl: 'https://aspnetclusters-37333-0.cloudclusters.net',
  imageAnalyzerUrl: 'https://ec2-13-212-161-115.ap-southeast-1.compute.amazonaws.com/api/image-analyzer',
  localUserServiceUrl: 'https://localhost:5001',
  localOrderServiceUrl: 'https://localhost:5002',
  localMessageServiceUrl: 'https://localhost:5003',
  ghnAPIUrl: 'https://dev-online-gateway.ghn.vn/shiip/public-api',
  tokenKey: 'token',
  emailToken: 'emailToken',
  databaseToken: 'databaseToken',
  cartKey: 'cart',
  shippingAddressKey: 'shippingAddressKey',
  ghnToken: 'aa3d5553-73e6-11eb-8be2-c21e19fc6803',
  loginMethod: 'loginMethod',
  USDToVND: 23000,
  uploadFileUrl: "https://backend-java-api.herokuapp.com",
  backendDomain: [
    'aspnetclusters-37619-0.cloudclusters.net',
    'aspnetclusters-37670-0.cloudclusters.net',
    "javaclusters-38542-0.cloudclusters.net",
    "aspnetclusters-37333-0.cloudclusters.net",
    "backend-java-api.herokuapp.com",
    'localhost:5001',
    'localhost:5002',
    'localhost:5003'
  ],
  social: {
    google: {
      clientId: '775013219718-ctvm42dg7sg8m0p0ceocd0eg7msqof3h.apps.googleusercontent.com'
    },
    facebook: {
      clientID: '4903591429710865'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
