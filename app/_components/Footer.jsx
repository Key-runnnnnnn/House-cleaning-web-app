import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/h2.jpg"
                alt="logo"
                width={40}
                height={40}
                className="rounded-lg border-2 border-white shadow-lg"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                HomeShine
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for professional home services. Connect with
              verified experts for all your home maintenance and repair needs.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-blue-400 rounded-lg transition-colors duration-200"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-pink-600 rounded-lg transition-colors duration-200"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Home
              </Link>
              <Link
                href="/search/Cleaning"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
              <Link
                href="/mybooking"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                My Bookings
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Popular Services
            </h3>
            <div className="space-y-2">
              <Link
                href="/search/Cleaning"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                House Cleaning
              </Link>
              <Link
                href="/search/Plumbing"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Plumbing Services
              </Link>
              <Link
                href="/search/Electrical"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Electrical Work
              </Link>
              <Link
                href="/search/Painting"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Painting Services
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  support@homeshine.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Service Street
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2024 HomeShine™. All Rights Reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-current" />{" "}
              for better home services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
