import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Star, MapPin, User, DollarSign } from "lucide-react";

function BusinessList({ businessList, title }) {
  return (
    <section className="py-16 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            Professional services you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {businessList.length > 0
            ? businessList.map((business, index) => (
                <Link
                  href={"/details/" + business.id}
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-[1.02] border border-gray-100 overflow-hidden"
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={business?.images[0].url}
                      alt={business.name}
                      width={500}
                      height={240}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        {business.category.name}
                      </span>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-semibold text-gray-700">
                        4.8
                      </span>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Business name */}
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {business.name}
                    </h3>

                    {/* Contact person */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        {business.contactPerson}
                      </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm line-clamp-1">
                        {business.address}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-lg font-bold text-green-600">
                        {business.price}
                      </span>
                    </div>

                    {/* Book Now Button */}
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200 transform group-hover:scale-105 mt-4">
                      Book Now
                    </Button>
                  </div>
                </Link>
              ))
            : // Loading skeleton
              [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-300 rounded-xl mt-4"></div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default BusinessList;
