'use client'
import { useSession } from "next-auth/react";

export default function useUser() {
  const userData = useSession();
  const user = userData?.data?.user;
   
  return user;
 
}


  