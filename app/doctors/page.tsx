import Link from "next/link";
import Image from "next/image";
import { doctors } from "@/lib/data";
import { Star } from "lucide-react";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ department?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedDepartmentId = resolvedSearchParams.department;

  const filteredDoctors = selectedDepartmentId 
    ? doctors.filter(doc => doc.departmentId === selectedDepartmentId)
    : doctors;

  return (
    <div className="bg-slate-50 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0 mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Our Specialists</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Meet our team of experienced and dedicated medical professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
             <div key={doc.id} className="group relative bg-white flex flex-col rounded-3xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300">
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
                   <div className="mt-6 pt-6 border-t border-slate-100 flex-1 flex items-end">
                      <Link 
                         href={`/book?doctor=${doc.id}`}
                         className="w-full text-center rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors"
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
  );
}
