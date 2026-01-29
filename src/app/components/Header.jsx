import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Image src="/assets/tinywinslogo.png" width={150} height={150} alt="" />
      <h1>Header Component</h1>
    </header>
  );
}
