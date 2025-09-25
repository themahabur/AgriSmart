"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  const handleGoogleLogin = async (payload) => {
    const result = await signIn(payload, { callbackUrl: "/" ,redirect:false});
    console.log(result);
  };

  return (
    <button
      onClick={() => handleGoogleLogin("google")}
      className="w-full flex items-center gap-2 px-4 py-3 border rounded-full justify-center hover:bg-gradient-to-r from-green-600 to-green-700 transition hover:text-white"
    >
      <FcGoogle className="text-2xl" />
      <span className="font-medium">Continue with Google</span>
    </button>
  );
}
