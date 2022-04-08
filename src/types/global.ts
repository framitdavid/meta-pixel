import { MetaPixel } from './pixel';

declare global {
  interface Window {
    faq: MetaPixel.Fbq;
  }
}
