import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";
import {
  isPastDate,
  isPastTimeSlot,
  isValidBookingDateTime,
} from "@/lib/utils";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && BusinessBookedSlot();
    // Clear selected time if the new date makes it invalid
    if (selectedTime && isPastTimeSlot(selectedTime, date)) {
      setSelectedTime("");
    }
  }, [date]);

  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(
      business.id,
      moment(date).format("DD-MMM-yyyy")
    ).then((resp) => {
      console.log(resp);
      setBookedSlot(resp.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    // Comprehensive validation before booking
    const validation = isValidBookingDateTime(date, selectedTime);
    if (!validation.valid) {
      toast(validation.message);
      return;
    }

    setIsLoading(true);
    GlobalApi.createNewBooking(
      business.id,
      moment(date).format("DD-MMM-yyyy"),
      selectedTime,
      data.user.email,
      data.user.name
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          // Clear selection
          setSelectedTime("");
          // Refresh booked slots to show updated availability
          BusinessBookedSlot();
          // Set flag for recent booking to trigger refresh in MyBooking component
          localStorage.setItem("recentBooking", Date.now().toString());
          toast("Service Booked successfully!");
          // Close the booking sheet after a short delay
          setTimeout(() => {
            setIsOpen(false);
          }, 1500);
        }
        setIsLoading(false);
      },
      (e) => {
        toast("Error while creating booking");
        setIsLoading(false);
      }
    );
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((item) => item.time == time);
  };

  const isSlotDisabled = (time) => {
    return isSlotBooked(time) || isPastTimeSlot(time, date) || isLoading;
  };
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild onClick={() => setIsOpen(true)}>
          {children}
        </SheetTrigger>
        <SheetContent className="overflow-auto bg-gradient-to-br from-blue-50 to-indigo-50 w-full max-w-2xl">
          <SheetHeader className="text-center pb-6">
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              📅 Book Your Service
            </SheetTitle>
            <SheetDescription className="text-gray-600 text-base">
              Choose your preferred date and time slot for the best service
              experience
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            {/* Date Picker Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-base font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Select Date
                  </h3>
                  <p className="text-sm text-gray-500">
                    🗓️ Choose any date from today onwards
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {/* Calendar Grid to match time slot style */}
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full"
                  disabled={isPastDate}
                  fromDate={new Date()}
                  components={{
                    Day: ({ date: dayDate, ...props }) => {
                      const isSelected =
                        date && moment(dayDate).isSame(moment(date), "day");
                      const isToday = moment(dayDate).isSame(moment(), "day");
                      const isPast = moment(dayDate).isBefore(moment(), "day");
                      const isDisabled = isPast;

                      return (
                        <Button
                          variant="outline"
                          className={`relative border-2 rounded-xl p-3 font-medium transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md h-12 w-full
                            ${
                              isSelected
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500 shadow-lg shadow-blue-200 scale-105"
                                : isDisabled
                                ? "opacity-40 cursor-not-allowed bg-gray-100 border-gray-200 transform-none hover:scale-100"
                                : "bg-white border-gray-300 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
                            }`}
                          onClick={() =>
                            !isDisabled && setDate && setDate(dayDate)
                          }
                          disabled={isDisabled}
                          {...props}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-bold">
                              {dayDate.getDate()}
                            </span>
                            {isToday && !isSelected && (
                              <span className="text-xs text-yellow-600 font-medium mt-1 bg-yellow-100 px-1 py-0.5 rounded-full">
                                Today
                              </span>
                            )}
                            {isPast && (
                              <span className="text-xs text-gray-400 mt-1">
                                Past
                              </span>
                            )}
                          </div>
                        </Button>
                      );
                    },
                  }}
                />
              </div>

              {/* Selected Date Display */}
              {date && (
                <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">📅</span>
                    <span className="text-lg font-bold text-blue-700">
                      Selected: {moment(date).format("dddd, MMMM Do, YYYY")}
                    </span>
                  </div>
                  {moment(date).isSame(moment(), "day") && (
                    <p className="text-center text-sm text-blue-600 mt-2 font-medium">
                      ⚡ Booking for today - some time slots may be unavailable
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Time Slot Picker Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Select Time Slot
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    {moment(date).isSame(moment(), "day") ? (
                      <>
                        🕐 Today's available slots
                        <span className="text-amber-600 font-medium">
                          (past slots disabled)
                        </span>
                      </>
                    ) : (
                      <>
                        🕐 Available slots for{" "}
                        <span className="font-semibold text-blue-600">
                          {moment(date).format("MMMM Do, YYYY")}
                        </span>
                      </>
                    )}
                    {isLoading && (
                      <span className="text-blue-600 animate-pulse ml-2 font-medium">
                        ⟳ Updating...
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    disabled={isSlotDisabled(item.time)}
                    variant="outline"
                    className={`relative border-2 rounded-xl p-4 font-medium transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md
                      ${
                        selectedTime == item.time
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500 shadow-lg shadow-blue-200 scale-105"
                          : isSlotDisabled(item.time)
                          ? "opacity-40 cursor-not-allowed bg-gray-100 border-gray-200 transform-none hover:scale-100"
                          : "bg-white border-gray-300 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
                      }`}
                    onClick={() =>
                      !isSlotDisabled(item.time) && setSelectedTime(item.time)
                    }
                    title={
                      isSlotBooked(item.time)
                        ? "🚫 Already booked"
                        : isPastTimeSlot(item.time, date)
                        ? "⏰ Past time slot"
                        : "✅ Available"
                    }
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold">{item.time}</span>
                      {isSlotBooked(item.time) && (
                        <span className="text-xs text-red-500 font-medium mt-1 bg-red-100 px-2 py-0.5 rounded-full">
                          Booked
                        </span>
                      )}
                      {isPastTimeSlot(item.time, date) &&
                        !isSlotBooked(item.time) && (
                          <span className="text-xs text-gray-400 mt-1">
                            Past
                          </span>
                        )}
                    </div>
                  </Button>
                ))}
              </div>

              {/* Enhanced Legend */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  📋 Slot Status Legend:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1 bg-white rounded-lg p-2 border border-blue-200">
                    <div className="w-6 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md shadow-sm"></div>
                    <span className="font-semibold text-gray-700">
                      Selected
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white rounded-lg p-2 border border-gray-200">
                    <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-md"></div>
                    <span className="font-medium text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white rounded-lg p-2 border border-gray-200">
                    <div className="w-5 h-5 bg-gray-200 rounded-md opacity-60"></div>
                    <span className="font-medium text-gray-500">
                      Unavailable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter className="bg-white border-t-2 border-gray-100 p-6 mt-8 rounded-t-2xl shadow-xl">
            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                className="flex-1 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl py-3 font-semibold"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                ❌ Cancel
              </Button>

              <Button
                className={`flex-1 font-bold transition-all duration-200 rounded-xl py-3 ${
                  selectedTime && date && !isLoading
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-xl shadow-green-200 hover:shadow-2xl transform hover:scale-105"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!(selectedTime && date) || isLoading}
                onClick={() => saveBooking()}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Booking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    ✨ Book Service
                    {selectedTime && date && (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {moment(date).format("MMM Do")} at {selectedTime}
                      </span>
                    )}
                  </span>
                )}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
