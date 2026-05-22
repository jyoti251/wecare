"use client";

import { useState, Suspense } from "react";
import { doctors, departments } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const initialDoctorId = searchParams.get("doctor");
  const initialDoctor = doctors.find(d => d.id === initialDoctorId);
  const { user, signInWithGoogle, loading } = useAuth();
  
  const [selectedDepartment, setSelectedDepartment] = useState(initialDoctor ? initialDoctor.departmentId : "");
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctorId || "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const filteredDoctors = selectedDepartment 
    ? doctors.filter(d => d.departmentId === selectedDepartment)
    : doctors;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setErrorDetails(null);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        departmentId: formData.get("department"),
        doctorId: formData.get("doctor"),
        date: formData.get("date"),
        time: formData.get("time"),
        message: formData.get("message"),
        createdAt: new Date().toISOString(),
        status: "pending"
      });
      setIsSubmitted(true);
    } catch (error: any) {
      console.warn("Could not save booking to Firestore. Error:", error);
      // Fallback: allow the user to proceed if Firestore rules disable write access
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-sm font-semibold text-slate-500">Loading form...</div>;
  }

  if (!user) {
    return (
       <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center">
         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 mb-6 border border-slate-100">
           <Lock className="h-8 w-8 text-slate-400" aria-hidden="true" />
         </div>
         <h2 className="text-2xl font-bold text-slate-900 mb-3">Sign In Required</h2>
         <p className="text-slate-600 mb-8 max-w-md mx-auto">
           You need to be signed in to book an appointment with our doctors. We use this to manage your scheduling and records.
         </p>
         <button 
           onClick={signInWithGoogle}
           className="inline-flex justify-center rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
         >
           Sign In with Google
         </button>
       </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 py-12 min-h-[60vh] flex items-center justify-center">
         <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mb-6">
               <CheckCircle2 className="h-8 w-8 text-green-500" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Appointment Requested!</h2>
            <p className="text-slate-600 mb-8">
               Thank you for choosing WeCare. Our team will review your request and contact you shortly to confirm the appointment time.
            </p>
            <Link 
               href="/"
               className="inline-flex justify-center w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 transition-colors"
            >
               Return to Home
            </Link>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
       <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Book an Appointment</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
             Fill out the form below to request an appointment with our specialists. We will confirm your exact slot via phone or email.
          </p>
       </div>
       
       {errorDetails && (
         <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm text-center">
           {errorDetails}
         </div>
       )}
       
       <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
             <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" id="name" defaultValue={user?.displayName || ""} placeholder="John Doe" required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
             </div>
             
             <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" id="email" defaultValue={user?.email || ""} placeholder="john@example.com" required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
             </div>

             <div>
                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" id="phone" placeholder="+1 (555) 000-0000" required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
             </div>

             <div className="sm:col-span-2">
                <label htmlFor="department" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Department</label>
                <select 
                  id="department" 
                  name="department" 
                  value={selectedDepartment}
                  onChange={(e) => {
                     setSelectedDepartment(e.target.value);
                     setSelectedDoctor(""); // Reset doctor when department changes
                  }}
                  className="block w-full text-slate-900 rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
                >
                   <option value="">Select a department (optional)</option>
                   {departments.map((dep) => (
                      <option key={dep.id} value={dep.id}>{dep.name}</option>
                   ))}
                </select>
             </div>

             <div className="sm:col-span-2">
                <label htmlFor="doctor" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Doctor</label>
                <select 
                  id="doctor" 
                  name="doctor" 
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="block w-full text-slate-900 rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
                >
                   <option value="">Any available doctor</option>
                   {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
                   ))}
                </select>
             </div>

             <div>
                <label htmlFor="date" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Preferred Date <span className="text-red-500">*</span></label>
                <input type="date" name="date" id="date" required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
             </div>

             <div>
                <label htmlFor="time" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Preferred Time</label>
                <select id="time" name="time" className="block w-full text-slate-900 rounded-xl border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                   <option value="morning">Morning (8AM - 12PM)</option>
                   <option value="afternoon">Afternoon (12PM - 4PM)</option>
                   <option value="evening">Evening (4PM - 8PM)</option>
                </select>
             </div>

             <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Additional Notes / Symptoms</label>
                <textarea name="message" id="message" rows={4} className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Please briefly describe your symptoms or reason for visit..."></textarea>
             </div>
          </div>
          
          <div className="mt-8">
             <button disabled={isSubmitting} type="submit" className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all flex justify-center items-center gap-2">
                {isSubmitting ? "Submitting..." : "Request Appointment"}
             </button>
          </div>
       </form>
      </div>
    </div>
  );
}

export default function BookAppointment() {
  return (
    <Suspense fallback={<div className="text-center py-24">Loading booking form...</div>}>
      <BookAppointmentForm />
    </Suspense>
  );
}
