import Image from "next/image";
import Link from "next/link";
function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 mt-auto">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link href={"/"} className="hover:underline">
            A1-Maids Cleaning Service LLC™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;