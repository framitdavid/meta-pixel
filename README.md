# Meta Pixel
Famework agnostic and GDPR Compliance library to track user actions to Meta Pixel.

This library is a wrapper around Meta Pixel. The library does not depend on any frameworks or libraries, and can therefore be used within React, Vue, Angular and all others JS based applications.


## Get started
```
  npm install --save @framit/meta-pixel
```

or

```
  yarn add @framit/meta-pixel
```

### How to use the package
First your need to initialize Pixel with your pixelId.

```typescript
import { Pixel, Config } from '@framit/meta-pixel';

const config: Config = {
    pixelId: 'your-pixel-id',
    autoConfig: true, // Optional, true as default.
    isDebugMode: false; // Optional, false as default.
    disablePushState: false, // Optional, false as default. It's not recommended to disable push state, read more at https://developers.facebook.com/ads/blog/post/2017/05/29/tagging-a-single-page-application-facebook-pixel
    allowDuplicatePageViews: false // Optional, false as default.
} 

Pixel.initialize(config);
```

If you do not initialize Pixel before tracking, you should get an error message within the dev-tools console: “Please initialize Pixel by calling Pixel.initialize({ pixelId: 'your-pixel-id' }) before start tracking.”

### Grant consent
The library does not track any kind of events to Meta Pixel before the user has granted consent to beeing tracked. To tell the library that the user has granted the consents, you need to call the setHasGrantedConsent method, `Pixel.setHasGrantedConsent()`.

### Revoke consent
When calling `Pixel.revokeConsent()`, the tracking will be paused until the consent is granted by the user again. 

### How to do tracking
Make sure you have initialized Pixel by calling `Pixel.initialize({ pixelId: 'your-pixel-id' })`, before tracking user actions.


```typescript
import { Pixel } from '@framit/meta-pixel';

// Example of tracking add item to cart actions
Pixel.trackSingle("your-pixel-id", "AddToCart", {
    content_name: "Dont Make Me Think",
    content_category: "Books > UX",
    content_ids: ["guid-product-id"],
    product_catalog_id: "product-catalog-id"
    content_type: "product",
    value: 199.0,
    currency: "NOK",
});


// Tracking pageView based in history-state
Pixel.pageView();

// Tracking pageView based on custom eventId.
Pixel.pageView('my-awesome-event-id'); 

// Tracking Standard Events, read more at https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking#standard-events
Pixel.track('Purchase', {
  value: 199.0,
  currency: "NOK"
});

// Tracking Standard Events, read more at https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking#standard-events
Pixel.trackSingle('pixel-id','Purchase', {
  value: 199.0,
  currency: "NOK"
});

// Tracking Custom Events, custom events, which are visitor actions that you have defined and that you report by calling a Pixel function
Pixel.trackCustom('RecruitedAFriend', {
  value: 199.0,
  currency: "NOK"
});

// Tracking Custom Events, custom events, which are visitor actions that you have defined and that you report by calling a Pixel function
Pixel.trackSingleCustom('pixel-id','RecruitedAFriend', {
  value: 199.0,
  currency: "NOK"
});
```

## Tip!
To make sure your setup is sending data correctly to Meta, try out Facebook Pixel Helper Chrome Extension, https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc/related