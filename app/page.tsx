import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  // await db.set("hello", "hello")
  
  return (
    <main>
      <p className="text-red-500">Veste a calça saint tropez</p>
    </main>
  );
}
