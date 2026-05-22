import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, ShieldPlus, Heart, Users, Star, ArrowUpRight, PhoneCall } from "lucide-react";
import { doctors } from "@/lib/data";

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Hero section */}
      <div className="relative bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pb-14 pt-20 sm:pb-20 md:pb-28 lg:w-full lg:max-w-2xl lg:pb-40 xl:pb-48 px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                Top Regional Healthcare Provider
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                Advanced Healthcare with <span className="text-blue-600">Compassion.</span>
              </h1>
              <p className="text-lg leading-8 text-slate-600 mb-10 max-w-xl">
                Experience world-class medical expertise and state-of-the-art technology in a caring, patient-first environment. Your health is our greatest priority.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book"
                  className="rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
            alt="Modern hospital facility interior"
            fill
            referrerPolicy="no-referrer"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Services/Why Choose Us section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl">
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose WeCare</h2>
          <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Comprehensive care under one roof
          </p>
          <p className="mt-4 text-lg text-slate-600">
            We offer advanced medical procedures, modern facilities, and a collaborative team of experts committed to your recovery.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-4">
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-100">
              <div className="rounded-xl bg-blue-50 p-4 mb-6">
                <Activity className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <dt className="text-lg font-semibold leading-7 text-slate-900 mb-2">Advanced Tech</dt>
              <dd className="leading-7 text-slate-600 text-sm">
                Equipped with the latest medical technology for precise diagnosis and effective treatments.
              </dd>
            </div>
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-100">
              <div className="rounded-xl bg-blue-50 p-4 mb-6">
                <Users className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <dt className="text-lg font-semibold leading-7 text-slate-900 mb-2">Expert Staff</dt>
              <dd className="leading-7 text-slate-600 text-sm">
                Our multidisciplinary team consists of highly qualified, world-renowned medical professionals.
              </dd>
            </div>
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-100">
              <div className="rounded-xl bg-blue-50 p-4 mb-6">
                <ShieldPlus className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <dt className="text-lg font-semibold leading-7 text-slate-900 mb-2">24/7 Emergency</dt>
              <dd className="leading-7 text-slate-600 text-sm">
                Round-the-clock emergency and trauma care services to handle critical situations.
              </dd>
            </div>
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-100">
              <div className="rounded-xl bg-blue-50 p-4 mb-6">
                <Heart className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <dt className="text-lg font-semibold leading-7 text-slate-900 mb-2">Patient-Centric</dt>
              <dd className="leading-7 text-slate-600 text-sm">
                A compassionate healing environment focused on your comfort and peace of mind.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Featured Doctors Section */}
      <div className="bg-white py-24 sm:py-32 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Specialists</h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Meet our top doctors
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doc) => (
               <div key={doc.id} className="group relative bg-slate-50 flex flex-col rounded-3xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-200">
                     <Image 
                        src={doc.image} 
                        alt={doc.name} 
                        fill 
                        referrerPolicy="no-referrer"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                     />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                     <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                           {doc.experience}
                        </span>
                        <div className="flex text-yellow-400">
                           {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {doc.name}
                     </h3>
                     <p className="text-blue-600 text-sm font-medium mt-1">{doc.specialization}</p>
                     <div className="mt-6 pt-6 border-t border-slate-200 flex-1 flex items-end">
                        <Link 
                           href={`/book?doctor=${doc.id}`}
                           className="w-full text-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                           Book Appointment
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
