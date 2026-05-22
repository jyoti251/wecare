"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { HeartPulse, Calendar, Clock, User, Phone, Edit, Trash2 } from "lucide-react";
import { departments, doctors } from "@/lib/data";

export default function MyBookingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setFetching(true);
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }));
      bookingsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setBookings(bookingsList);
      setFetching(false);
      setError(null);
    }, (err: any) => {
      console.error("Error fetching bookings:", err);
      if (err?.code === 'permission-denied' || err?.message?.includes('permissions')) {
        setError("Your Firebase security rules do not allow reading bookings. Please update your firestore.rules to allow read access to the 'bookings' collection.");
      } else {
        setError("Failed to load your bookings.");
      }
      setBookings([]);
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: "cancelled" });
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: "cancelled" } : b));
    } catch (err) {
      console.error("Error cancelling booking:", err);
      // Fallback: If update fails (e.g. permission issues), we'll attempt delete
      try {
        await deleteDoc(doc(db, "bookings", bookingId));
        setBookings(bookings.filter(b => b.id !== bookingId));
      } catch (deleteErr) {
        alert("Failed to cancel booking. Please try again.");
      }
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Bookings</h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage your upcoming hospital appointments
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
             <button
                onClick={() => router.push('/book')}
                className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                Book New Appointment
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 mb-8">
            {error}
          </div>
        )}

        {bookings.length === 0 && !error ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 mb-6">
              <Calendar className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No bookings found</h3>
            <p className="mt-2 text-slate-500 max-w-sm mx-auto">
              You don&apos;t have any upcoming appointments. Use the button to book your first visit.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const department = departments.find(d => d.id === booking.departmentId);
              const doctor = doctors.find(d => d.id === booking.doctorId);
              
              return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                        <HeartPulse className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {department ? department.name : "General"}
                        </h3>
                        <p className="text-sm font-medium text-slate-600">
                          {doctor ? doctor.name : "Any Available Doctor"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-slate-700">
                        <Calendar className="h-5 w-5 text-slate-400" />
                        <span className="text-sm">{new Date(booking.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <Clock className="h-5 w-5 text-slate-400" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <User className="h-5 w-5 text-slate-400" />
                        <span className="text-sm">{booking.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <Phone className="h-5 w-5 text-slate-400" />
                        <span className="text-sm">{booking.phone}</span>
                      </div>
                    </div>
                    
                    {booking.message && (
                      <div className="mt-4 bg-slate-50 p-4 rounded-2xl">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Message / Reason for visit</p>
                        <p className="text-sm text-slate-700">{booking.message}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 mt-6 sm:mt-0 pt-6 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-2">
                       <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                         booking.status === 'cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                         booking.status === 'completed' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                         booking.status === 'confirmed' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                         'bg-amber-50 text-amber-700 ring-amber-600/20'
                       }`}>
                          {booking.status === 'cancelled' ? 'Cancelled' : booking.status === 'completed' ? 'Completed' : booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                       </span>
                    </div>
                    
                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-50 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
