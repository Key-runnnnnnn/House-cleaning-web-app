import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

function BookingHistoryList({ bookingHistory, type, onBookingUpdate }) {
  const [updatedBookingHistory, setUpdatedBookingHistory] =
    useState(bookingHistory);

  // Update local state when bookingHistory prop changes
  useEffect(() => {
    setUpdatedBookingHistory(bookingHistory);
  }, [bookingHistory]);

  const cancelAppointment = (booking) => {
    GlobalApi.deleteBooking(booking.id)
      .then((resp) => {
        if (resp) {
          // Remove the canceled appointment from the list
          const updatedList = updatedBookingHistory.filter(
            (item) => item.id !== booking.id
          );
          setUpdatedBookingHistory(updatedList);
          toast("Booking Deleted Successfully!");

          // Call parent callback to refresh data
          if (onBookingUpdate) {
            onBookingUpdate();
          }
        }
      })
      .catch((error) => {
        toast("Error while canceling booking!");
        console.error(error);
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {updatedBookingHistory.length > 0 ? (
        updatedBookingHistory.map((booking, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex gap-4">
              {booking?.businessList?.name && (
                <div className="relative">
                  <Image
                    src={booking?.businessList?.images[0]?.url}
                    alt="service image"
                    width={120}
                    height={120}
                    className="rounded-xl object-cover shadow-md border-2 border-white"
                  />
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    {type === "booked" ? "🟢 Active" : "✅ Done"}
                  </div>
                </div>
              )}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {booking.businessList.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium">
                      {booking.businessList.contactPerson}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">
                      {booking.businessList.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm">
                      Service on:{" "}
                      <span className="font-semibold text-gray-800">
                        {booking.date}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-sm">
                      Time:{" "}
                      <span className="font-semibold text-gray-800">
                        {booking.time}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {type === "booked" && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200 font-medium"
                    >
                      <span className="flex items-center gap-2">
                        🗑️ Cancel Appointment
                      </span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl border-2">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-lg">
                        ⚠️ Cancel Appointment?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-600">
                        Are you sure you want to cancel this appointment? This
                        action cannot be undone and will permanently remove your
                        booking.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-2 border-gray-300 hover:border-gray-400">
                        Keep Appointment
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => cancelAppointment(booking)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium"
                      >
                        Yes, Cancel It
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="col-span-full">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">
                No {type} appointments found
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {type === "booked"
                  ? "🎯 Ready to book your first service? Browse our amazing services and schedule an appointment that fits your schedule!"
                  : "📚 Your completed appointments will appear here once you've used our services."}
              </p>
              {type === "booked" && (
                <Button className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium px-8 py-3 rounded-xl shadow-lg">
                  <span className="flex items-center gap-2">
                    ✨ Book Your First Service
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingHistoryList;
