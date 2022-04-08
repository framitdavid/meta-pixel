# Meta Pixel
Typesafe wrapper for Meta Pixel that can be used with React, Angular, Vue and all JS based applications. This library does not depend on any frameworks or libraries. This Library do support both JS and TypeScript.

## Who can use it?
Write more... 


## Get started
```
  npm install --save @framitdavid/meta-pixel
```

or

```
  yarn add @framitdavid/meta-pixel
```

### How to use the package
First your need to initialize Pixel with your pixelId.

```typescript
import Pixel, { Config } from 'js-meta-pixel';

const config: Config = {
    pixelId: 'your-pixel-id',
    autoConfig: true,
    isDebugMode: false;
}

Pixel.initialize(config);
```

### Grant consent
Write more about consent here


### Revoke consent
Write more about revoke consent

### Tracking
Write more about tracking here.

```typescript
import Pixel from 'js-meta-pixel';

Pixel.trackSingle("1234", "AddToCart", {
    content_name: "Dont Make Me Think",
    content_category: "Books > UX",
    content_ids: ["guid-product-id"],
    content_type: "product",
    value: 199.0,
    currency: "NOK",
});
```

### Events to track
Write more about the events that can be tracked. 

```typescript
  type EventName =
    | 'AddPaymentInfo'
    | 'AddToCart'
    | 'AddToWishlist'
    | 'CompleteRegistration'
    | 'Contact'
    | 'CustomizeProduct'
    | 'Donate'
    | 'FindLocation'
    | 'InitiateCheckout'
    | 'Lead'
    | 'PageView'
    | 'Purchase'
    | 'Schedule'
    | 'Search'
    | 'StartTrial'
    | 'SubmitApplication'
    | 'Subscribe'
    | 'ViewContent';

```
