"use client";

import { useEffect } from "react";

const BASE_URL = "https://chat.bevatel.com";
const WEBSITE_TOKEN = "jt1XoePxNBfjVAcH3Yg2YNAW";

type BevatelWindow = Window & {
  socialAppSDK?: {
    run: (options: { websiteToken: string; baseUrl: string }) => void;
  };
};

export default function BevatelChat() {
  useEffect(() => {
    const bevatelWindow = window as BevatelWindow;
    const startChat = () => bevatelWindow.socialAppSDK?.run({ websiteToken: WEBSITE_TOKEN, baseUrl: BASE_URL });
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-bevatel-sdk="true"]');

    if (bevatelWindow.socialAppSDK) {
      startChat();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", startChat, { once: true });
      return () => existingScript.removeEventListener("load", startChat);
    }

    const script = document.createElement("script");
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.defer = true;
    script.async = true;
    script.dataset.bevatelSdk = "true";
    script.addEventListener("load", startChat, { once: true });
    document.head.appendChild(script);

    return () => script.removeEventListener("load", startChat);
  }, []);

  return null;
}
