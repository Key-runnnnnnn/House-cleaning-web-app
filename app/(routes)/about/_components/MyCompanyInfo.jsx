import React from "react";
import Image from "next/image"; // Import for optimized images

const AboutUs = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="lg:flex items-center">
        <div className="lg:w-1/2 p-8 lg:p-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg">
              <Image
                className="rounded-2xl object-cover"
                src={"/about.png"}
                alt="About Us Image"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 p-8 lg:p-12">
          <div className="space-y-6">
            <div>
              <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full mb-4">
                ABOUT US
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Our Company
                </span>
              </h1>
            </div>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Welcome to{" "}
                <span className="font-semibold text-blue-600">HomeShine</span>,
                where we redefine clean living. With a passion for pristine
                spaces and a commitment to exceptional service, we are your
                trusted partner in maintaining the cleanliness and comfort of
                your home.
              </p>

              <p>
                Our team of dedicated professionals brings years of expertise
                and a meticulous attention to detail to every cleaning project,
                ensuring that your space is not just clean, but truly
                revitalized.
              </p>

              <p>
                From regular maintenance to deep cleans, we tailor our services
                to meet your unique needs, leaving no corner untouched.
                Experience the difference with{" "}
                <span className="font-semibold text-blue-600">HomeShine</span> –
                where cleanliness meets perfection.
              </p>
            </div>

            {/* Stats or features */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600 font-medium">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">5+</div>
                <div className="text-sm text-gray-600 font-medium">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
