"use client"
import Sidebar from "@/components/custom/Sidebar"
import { useRouter } from "next/navigation";
import { useEffect } from "react"


function page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/booking');
  }, []);
}

export default page