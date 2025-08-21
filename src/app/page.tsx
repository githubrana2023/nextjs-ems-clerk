import {  CreateOrganization, UserButton } from "@clerk/clerk-react";
import { MobileNavbar } from "../components/navbar";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <MobileNavbar/>
    </div>
  );
}
