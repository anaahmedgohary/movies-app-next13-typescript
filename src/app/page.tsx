import Image from "next/image";
import Hompage from "./components/hompage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hompage />
    </main>
  );
}
