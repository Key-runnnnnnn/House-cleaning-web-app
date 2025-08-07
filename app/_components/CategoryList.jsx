import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
            Browse Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of professional home services
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {categoryList.length > 0
            ? categoryList.map((category, index) => (
                <Link
                  href={"/search/" + category.name}
                  key={index}
                  className="group relative flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl border border-gray-100 hover:border-blue-200 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  {/* Icon container */}
                  <div className="relative z-10 p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors duration-300">
                    <Image
                      src={category.icon.url}
                      alt="icon"
                      width={32}
                      height={32}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Category name */}
                  <h3 className="relative z-10 text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-center leading-tight">
                    {category.name}
                  </h3>
                </Link>
              ))
            : // Loading skeleton
              [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[120px] w-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-8 h-8 bg-gray-400 rounded-lg animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-400 rounded animate-pulse"></div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryList;
