import { MetaPixel } from './types/pixel';
import {
  doMetaPixelBaseCodeInitialize,
  GenericLogMessage,
  isWindowAvailable,
  log,
} from './utils';

declare var fbq: MetaPixel.Fbq;

type Config = {
  isDebugMode?: boolean;
} & MetaPixel.ConfigOptions;

type MetaPixel = {
  initialize: ({ pixelId, autoConfig, isDebugMode }: Config) => void;
  setHasGrantedConsent: () => void;
  revokeConsent: () => void;
  pageView: () => void;
  track: (title: string, data: MetaPixel.DataCollection) => void;
  trackSingle: (
    pixelId: string,
    event: MetaPixel.EventName,
    data: MetaPixel.DataCollection,
  ) => void;
  trackCustom: (title: string, data: MetaPixel.DataCollection) => void;
  trackSingleCustom: (
    pixelId: string,
    event: string,
    data: MetaPixel.DataCollection,
  ) => void;
};

let isConsentGranted: boolean = false;
let initialized: boolean = false;
let isDebugModeActivated: boolean = false;

const setDebugMode = (isDebugMode: boolean): void => {
  if (isDebugModeActivated === isDebugMode) return;
  isDebugModeActivated = isDebugMode;
  log(`Debug mode is ${isDebugMode ? 'activated' : 'deactivated'}`, 'info');
};

const logIfDebugMode = (message: string): void => {
  if (!isDebugModeActivated || !isConsentGranted) return;
  log(message, 'info');
};

/** To revoke consent to track data using Pixel. Read more at https://developers.facebook.com/docs/meta-pixel/implementation/gdpr */
const revokeConsent = (): void => {
  if (isConsentGranted) {
    isConsentGranted = false;
    fbq('consent', 'revoke');
    logIfDebugMode(`Track fbq("consent", "revoke")`);
  }
};

/** Read more about initializing at https://developers.facebook.com/docs/meta-pixel/get-started */
const initialize = ({ pixelId, autoConfig, isDebugMode = false }: Config): void => {
  if (!isWindowAvailable) return log(GenericLogMessage.WindowNotAvailable);

  const alreadyInitialized = !!window.faq;
  if (alreadyInitialized) return;

  setDebugMode(isDebugMode);
  if (!pixelId)
    return log('Please provide your pixelId to initialize an Meta Pixel instance');

  revokeConsent();
  doMetaPixelBaseCodeInitialize();

  fbq('set', 'autoConfig', !!autoConfig, pixelId);
  logIfDebugMode(`Set, fbq("set", "autoConfig", ${!!autoConfig}, ${pixelId})`);

  fbq('init', pixelId);
  logIfDebugMode(`Init, fbq("init", ${pixelId})`);
  initialized = true;
};

/** To save granted consent to track data using Pixel. Read more at https://developers.facebook.com/docs/meta-pixel/implementation/gdpr */
const setHasGrantedConsent = (): void => {
  if (isConsentGranted) return;
  isConsentGranted = true;
  fbq('consent', 'grant');
  logIfDebugMode(`Track fbq("consent", "grant")`);
};

/** Read more about pageView at https://developers.facebook.com/docs/meta-pixel/get-started */
const pageView = (): void => {
  if (!initialized) return log(GenericLogMessage.PixelNotInitialized);
  fbq('track', 'PageView');
  logIfDebugMode(`Track fbq("track", "PageView")`);
};

/** Read more about tracking at https://developers.facebook.com/docs/meta-pixel/advanced */
const track = (title: string, data: MetaPixel.DataCollection): void => {
  if (!initialized) return log(GenericLogMessage.PixelNotInitialized);
  fbq('track', title, data);
  logIfDebugMode(`Track fbq("track", ${title}, ${JSON.stringify(data)})`);
};

/** Read more about single tracking at https://developers.facebook.com/docs/meta-pixel/advanced */
const trackSingle = (
  pixelId: string,
  event: string,
  data: MetaPixel.DataCollection,
): void => {
  if (!initialized) return log(GenericLogMessage.PixelNotInitialized);
  fbq('trackSingle', pixelId, event, data);
  logIfDebugMode(
    `TrackSingle fbq("TrackSingle", ${pixelId}, ${event}, ${JSON.stringify(data)})`,
  );
};

/** Read more about trackCustom at https://developers.facebook.com/docs/meta-pixel/advanced */
const trackCustom = (title: string, data: MetaPixel.DataCollection): void => {
  if (!initialized) return log(GenericLogMessage.PixelNotInitialized);
  fbq('trackCustom', title, data);
  logIfDebugMode(`TrackCustom fbq("trackCustom", ${title}, ${JSON.stringify(data)})`);
};

/** Read more about trackSingleCustom at https://developers.facebook.com/docs/meta-pixel/advanced */
const trackSingleCustom = (
  pixelId: string,
  event: string,
  data: MetaPixel.DataCollection,
): void => {
  if (!initialized) return log(GenericLogMessage.PixelNotInitialized);
  fbq('trackSingleCustom', pixelId, event, data);
  logIfDebugMode(
    `trackSingleCustom fbq("trackSingleCustom", ${pixelId}, ${event}, ${JSON.stringify(
      data,
    )});`,
  );
};

export const Pixel: MetaPixel = {
  initialize,
  setHasGrantedConsent,
  revokeConsent,
  pageView,
  track,
  trackSingle,
  trackCustom,
  trackSingleCustom,
};
