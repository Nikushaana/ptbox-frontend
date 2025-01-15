import React from "react";
import animationData from "../../lottieAnimations/Animation - 1736604317686.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

export default function Header() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="px-[100px] max-lg:px-[50px] max-sm:px-[16px] z-[10] sticky top-0 backdrop-blur-lg border-b-[1px] border-gray-700">
      <div className="w-[80px]">
        <Link to="/">
          <Lottie options={defaultOptions} height={80} width={80} />
        </Link>
      </div>
    </div>
  );
}
