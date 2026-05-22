"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { HeartPulse, Calendar, Clock, User, Phone, CheckCircle, Trash2, ShieldAlert } from "lucide-react";
import { departments, doctors } from "@/lib/data";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/sign-in");
      } else if (user.email !== 'darshjainteam@gmail.com') {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.email !== 'darshjainteam@gmail.com') return;

    setFetching(true);
    const q = query(collection(db, "bookings"));
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
        setError("Your Firebase security rules do not allow reading bookings as admin. Please update your rules in the Firebase Console to allow admin access.");
      } else {
        setError("Failed to load bookings.");
      }
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status });
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking?")) return;
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      setBookings(bookings.filter(b => b.id !== bookingId));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking.");
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user || user.email !== 'darshjainteam@gmail.com') {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-red-100 text-red-600 rounded-xl">
               <ShieldAlert className="h-8 w-8" />
             </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage all hospital appointments
              </p>
            </div>
          </div>
          <div>
            <button
               onClick={() => router.push('/book')}
               className="inline-flex items-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
               >
               Create New Booking
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
            <h3 className="text-lg font-semibold text-slate-900">No bookings in system</h3>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Department / Doctor</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {bookings.map((booking) => {
                      const department = departments.find(d => d.id === booking.departmentId);
                      const doctor = doctors.find(d => d.id === booking.doctorId);
                      
                      return (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{booking.name}</div>
                            <div className="text-sm text-slate-500">{booking.phone}</div>
                            <div className="text-xs text-slate-400 mt-1">{booking.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{department ? department.name : "General"}</div>
                            <div className="text-sm text-slate-500">{doctor ? doctor.name : "Any Available"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">{new Date(booking.date).toLocaleDateString()}</div>
                            <div className="text-sm text-slate-500">{booking.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                              booking.status === 'cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                              booking.status === 'completed' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                              booking.status === 'confirmed' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                              'bg-amber-50 text-amber-700 ring-amber-600/20'
                            }`}>
                               {booking.status === 'cancelled' ? 'Cancelled' : booking.status === 'completed' ? 'Completed' : booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                               {booking.status === 'pending' && (
                                 <button onClick={() => handleUpdateStatus(booking.id, 'confirmed')} className="text-blue-600 hover:text-blue-900 p-1.5 hover:bg-blue-50 rounded-lg text-xs border border-blue-200" title="Confirm Booking">Confirm</button>
                               )}
                               {booking.status === 'confirmed' && (
                                 <button onClick={() => handleUpdateStatus(booking.id, 'completed')} className="text-green-600 hover:text-green-900 p-1.5 hover:bg-green-50 rounded-lg text-xs border border-green-200" title="Mark Completed">Complete</button>
                               )}
                               {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                 <button onClick={() => handleUpdateStatus(booking.id, 'cancelled')} className="text-orange-600 hover:text-orange-900 p-1.5 hover:bg-orange-50 rounded-lg text-xs border border-orange-200" title="Cancel Booking">Cancel</button>
                               )}
                               <button onClick={() => handleDelete(booking.id)} className="text-red-600 hover:text-red-900 p-1.5 hover:bg-red-50 rounded-lg" title="Delete record entirely"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
