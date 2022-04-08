# Meta Pixel
Simple, framework agnostic and GDPR Compliance library to track data to Meta

This library is a wrapper for Meta Pixel that can be used with React, Angular, Vue and all JS based applications. This library does not depend on any frameworks or libraries. The Library does support both JS and TypeScript

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

If you do not provide your PixelId, you should get an error message within the Dev-tools console: “Please initialize Pixel by calling Pixel.initialize(your-pixel-id: string) before start tracking.”

### Grant consent
The library does not send any kind of data to Meta Pixel before the user has granted consent to beeing tracked.

### Revoke consent
When calling `Pixel.revokeConsent()`, the tracking will be stopped. 

### Tracking
Example of tracking data to Meta Pixel.

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

The following events are supported to be tracked:

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