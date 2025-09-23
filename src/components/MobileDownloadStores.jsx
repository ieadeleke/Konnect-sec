import React from "react";
import google_play from "../assets/images/homepage/google-play.png";
import apple from "../assets/images/homepage/apple.png";

const MobileDownloadStores = () => {
  return (
    <div className="flex  gap-5 mt-3">
      <a
        target="_blank"
        href="https://play.google.com/store/apps/details?id=com.wnapp.id1695026422582"
        rel="noreferrer"
      >
        <div className="flex gap-3 rounded-xl items-center bg-black text-white py-3 px-5">
          <div>
            <img
              className="shrink-0 h-5 w-5 lg:w-5 lg:h-5 "
              src={google_play}
              alt="download on google play store"
            />
          </div>
          <div className={"downloadStoreText"}>
            <p className="text-xs">Android app on</p>
            <p className="text-base">Google Play</p>
          </div>
        </div>
      </a>
      <a
        target="_blank"
        href="https://apps.apple.com/app/konnect-ws/id6504823567"
        rel="noreferrer"
      >
        <div className="flex gap-2 rounded-xl  items-center  bg-black text-white py-3 px-3">
          <img
            className="h-6 w-6 shrink-0 lg:w-6 lg:h-6"
            src={apple}
            alt="download on apple store"
          />
          <div className={"downloadStoreText"}>
            <p className="text-xs">Available on the iPhone</p>
            <p className="text-base">Apple Store</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MobileDownloadStores;
