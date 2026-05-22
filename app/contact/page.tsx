"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send api request here
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="relative bg-slate-50 py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop"
            alt="Hospital reception desk"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center border-b border-slate-200/50 pb-20">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Contact Us
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 max-w-2xl mx-auto font-medium">
            We are here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="rounded-3xl bg-slate-50 p-10 border border-slate-100 space-y-10">
              <div className="flex gap-4">
                 <div className="bg-blue-100 p-3 rounded-full h-fit">
                   <MapPin className="h-6 w-6 text-blue-600" />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-slate-900">Our Location</h3>
                   <p className="mt-2 text-slate-600">123 Healing Way<br/>Medical District, NY 10001</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-blue-100 p-3 rounded-full h-fit">
                   <Phone className="h-6 w-6 text-blue-600" />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-slate-900">Phone Number</h3>
                   <p className="mt-2 text-slate-600">1-800-WE-CARE<br/>(1-800-932-273)</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-blue-100 p-3 rounded-full h-fit">
                   <Mail className="h-6 w-6 text-blue-600" />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-slate-900">Email Address</h3>
                   <p className="mt-2 text-slate-600">info@wecarehospitals.com<br/>support@wecarehospitals.com</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-blue-100 p-3 rounded-full h-fit">
                   <Clock className="h-6 w-6 text-blue-600" />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-slate-900">Working Hours</h3>
                   <p className="mt-2 text-slate-600">Emergency: 24/7<br/>Outpatient: Mon-Sat, 8AM - 8PM</p>
                 </div>
              </div>
            </div>
          </div>

          <div>
             {submitted ? (
                <div className="bg-green-50 p-10 rounded-3xl border border-green-100 text-center text-green-800 h-full flex flex-col items-center justify-center">
                   <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                   <p>Thank you for reaching out. We will get back to you shortly.</p>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
                   <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h3>
                   <div className="space-y-6">
                      <div>
                         <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900 mb-2">Your Name</label>
                         <input type="text" name="name" id="name" required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600" />
                      </div>
                      <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900 mb-2">Email Address</label>
                         <input type="email" name="email" id="email" required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600" />
                      </div>
                      <div>
                         <label htmlFor="subject" className="block text-sm font-medium leading-6 text-slate-900 mb-2">Subject</label>
                         <input type="text" name="subject" id="subject" required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600" />
                      </div>
                      <div>
                         <label htmlFor="message" className="block text-sm font-medium leading-6 text-slate-900 mb-2">Message</label>
                         <textarea name="message" id="message" rows={4} required className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"></textarea>
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">
                         Send Message
                      </button>
                   </div>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
