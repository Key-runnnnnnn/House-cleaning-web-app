import { Button } from "@/components/ui/button";
import React from "react";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex items-center gap-6 flex-col justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero content */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Find House Cleaning
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
                Service/Repair
              </span>
              <span className="block text-gray-800">Near You</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              🏠 Explore Best Home Service & Repair near you with{" "}
              <span className="font-semibold text-blue-600">
                trusted professionals
              </span>
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <span className="text-sm font-medium text-gray-700">
                ✅ Verified Professionals
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <span className="text-sm font-medium text-gray-700">
                ⚡ Quick Booking
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <span className="text-sm font-medium text-gray-700">
                💰 Best Prices
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-200 transform hover:scale-105 transition-all duration-200 text-lg">
              🔍 Browse Services
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
            >
              📞 Contact Us
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full max-w-4xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600 font-medium mt-1">
              Happy Customers
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-green-600">50+</div>
            <div className="text-gray-600 font-medium mt-1">
              Service Providers
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600 font-medium mt-1">Support</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-orange-600">5★</div>
            <div className="text-gray-600 font-medium mt-1">Average Rating</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
