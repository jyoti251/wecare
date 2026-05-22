import { departments } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Departments() {
  return (
    <div className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">Our Departments</h2>
          <p className="text-lg leading-8 text-slate-600">
            We offer a wide range of specialized medical departments, each staffed by expert professionals and equipped with modern medical technology.
          </p>
        </div>
        <ul role="list" className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {departments.map((department) => (
            <li key={department.id} className="group flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-blue-100 transition-all duration-300">
              <div className="h-56 relative overflow-hidden bg-slate-200">
                <Image
                   src={department.image}
                   alt={department.name}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{department.name}</h3>
                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{department.description}</p>
                <div className="mt-8">
                  <Link href={`/doctors?department=${department.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View Doctors <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
