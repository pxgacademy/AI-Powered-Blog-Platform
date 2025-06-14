//

import Link from "next/link";
import { Button } from "./ui/button";
import ProfileIcon from "./ProfileIcon";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-md fixed w-full">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-semibold">
            Magical Blogs
          </Link>
        </div>

        <div>
          <ProfileIcon />
        </div>
      </div>
    </nav>
  );
}
