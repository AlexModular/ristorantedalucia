import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

const PixelTracker = () => {
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    if (!pixelId) {
      console.warn("Facebook Pixel ID is not set in environment variables.");
    } else {
      ReactPixel.init(pixelId);
      console.log("Facebook Pixel initialized with ID:", pixelId);
      ReactPixel.pageView();
    }
  }, []);
  return null;
};

export default PixelTracker;
