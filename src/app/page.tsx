import Image from "next/image";
import Hompage from "./components/hompage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hompage />
    </main>
  );
}
