"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_component/BookingHistoryList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";

function MyBooking() {
  const { data } = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(() => {
    data && GetUserBookingHistory();
  }, [data]);

  // Add interval refresh to keep data updated
  useEffect(() => {
    if (!data) return;

    // Refresh data every 30 seconds when the component is mounted
    const interval = setInterval(() => {
      GetUserBookingHistory();
    }, 30000);

    return () => clearInterval(interval);
  }, [data]);

  // Add visibility change listener to refresh data when user returns to the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && data) {
        // Refresh data when page becomes visible again
        GetUserBookingHistory();
      }
    };

    const handleFocus = () => {
      if (data) {
        GetUserBookingHistory();
      }
    };

    // Check for recent booking flag in localStorage
    const checkForRecentBooking = () => {
      const recentBooking = localStorage.getItem("recentBooking");
      if (recentBooking && data) {
        const bookingTime = parseInt(recentBooking);
        const now = Date.now();
        // If booking was made in the last 5 minutes, refresh data
        if (now - bookingTime < 5 * 60 * 1000) {
          GetUserBookingHistory();
          localStorage.removeItem("recentBooking"); // Clear the flag
          toast.success("Your recent booking has been loaded!");
        }
      }
    };

    checkForRecentBooking();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [data]);

  /**
   * Used to Get User Booking History
   */
  const GetUserBookingHistory = () => {
    if (!data?.user?.email) return;

    setIsLoading(true);
    GlobalApi.GetUserBookingHistory(data.user.email)
      .then((resp) => {
        setBookingHistory(resp.bookings);
        setLastRefresh(Date.now());
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking history:", error);
        toast.error("Failed to load booking history");
        setIsLoading(false);
      });
  };

  const handleRefresh = () => {
    GetUserBookingHistory();
  };

  const filterData = (type) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    const result = bookingHistory.filter((item) => {
      const bookingDate = new Date(item.date);
      bookingDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

      return type == "booked"
        ? bookingDate >= today // Future or today's bookings
        : bookingDate < today; // Past bookings
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📋 My Bookings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your service appointments and history
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isLoading ? "animate-spin text-blue-600" : "text-gray-600"
                  }`}
                />
                <span className="font-medium">
                  {isLoading ? "Refreshing..." : "Refresh"}
                </span>
              </Button>
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                🕒 Last updated: {new Date(lastRefresh).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && bookingHistory.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Loading your bookings...
              </h3>
              <p className="text-gray-500 mt-2">
                Please wait while we fetch your appointments
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <Tabs defaultValue="booked" className="w-full">
              <TabsList className="w-full justify-start bg-gray-50 p-2 rounded-none border-b border-gray-100">
                <TabsTrigger
                  value="booked"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg px-6 py-3 font-medium transition-all duration-200"
                >
                  <span className="text-green-600">🟢</span>
                  <span>Upcoming</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                    {filterData("booked").length}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg px-6 py-3 font-medium transition-all duration-200"
                >
                  <span className="text-blue-600">🔵</span>
                  <span>Completed</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
                    {filterData("completed").length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="booked" className="mt-0">
                  <BookingHistoryList
                    bookingHistory={filterData("booked")}
                    type="booked"
                    onBookingUpdate={handleRefresh}
                  />
                </TabsContent>
                <TabsContent value="completed" className="mt-0">
                  <BookingHistoryList
                    bookingHistory={filterData("completed")}
                    type="completed"
                    onBookingUpdate={handleRefresh}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
