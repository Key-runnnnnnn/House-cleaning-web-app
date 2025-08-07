import { Button } from "@/components/ui/button";
import {
  Clock,
  Mail,
  MapPin,
  Share,
  User,
  Star,
  Phone,
  Award,
  Shield,
} from "lucide-react";
import Image from "next/image";
import React from "react";

function BusinessInfo({ business }) {
  return (
    business?.name && (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100">
        {/* Mobile layout - Stack vertically */}
        <div className="lg:hidden space-y-6">
          {/* Business image and category */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Image
                src={business?.images[0]?.url}
                alt={business.name}
                width={120}
                height={120}
                className="rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                <Award className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {business?.category?.name}
              </span>
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-700">
                  4.8 (124 reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Business details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              {business.name}
            </h1>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-red-100 rounded-lg">
                  <MapPin className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-gray-700 text-sm">
                  {business.address}
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {business.contactPerson}
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-gray-700 text-sm">{business?.email}</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-4 w-4 text-purple-500" />
                </div>
                <span className="text-gray-700 text-sm">
                  Available 8:00 AM to 10:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout - Side by side */}
        <div className="hidden lg:flex gap-8 items-start">
          {/* Left side - Image and basic info */}
          <div className="flex-shrink-0 space-y-4">
            <div className="relative">
              <Image
                src={business?.images[0]?.url}
                alt={business.name}
                width={180}
                height={200}
                className="rounded-2xl object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-lg">
                <Award className="h-5 w-5" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {business?.category?.name}
              </span>
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-700">
                  4.8 (124 reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Details */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">
                {business.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm">Verified Professional</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="p-3 bg-red-100 rounded-xl">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-gray-800 font-medium">
                    {business.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Contact Person
                  </p>
                  <p className="text-gray-800 font-medium">
                    {business.contactPerson}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Mail className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-gray-800 font-medium">{business?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Clock className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Working Hours
                  </p>
                  <p className="text-gray-800 font-medium">
                    8:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 px-6 py-2 rounded-xl transition-all duration-200"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessInfo;
