import Link from "next/link";
import Image from "next/image";
import { departments } from "@/lib/data";
import { Stethoscope, Activity, Baby, Activity as Bone, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    "Cardiology": <Activity className="h-6 w-6 text-blue-600" />,
    "Neurology": <Stethoscope className="h-6 w-6 text-blue-600" />,
    "Pediatrics": <Baby className="h-6 w-6 text-blue-600" />,
    "Orthopedics": <Bone className="h-6 w-6 text-blue-600" />
  };

  return (
    <div className="bg-slate-50 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0 mb-16 px-4">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Our Medical Services</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We provide specialized care across various departments using state-of-the-art facilities and a multidisciplinary approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {departments.map((dep) => (
             <div key={dep.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group overflow-hidden flex flex-col">
                <div className="aspect-[16/9] relative bg-slate-200 overflow-hidden">
                   {dep.image && (
                     <Image 
                       src={dep.image} 
                       alt={dep.name} 
                       fill 
                       className="object-cover group-hover:scale-105 transition-transform duration-500" 
                     />
                   )}
                   <div className="absolute top-4 left-4 bg-white p-2 rounded-xl shadow-sm">
                     {iconMap[dep.name] || <Activity className="h-6 w-6 text-blue-600" />}
                   </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{dep.name}</h3>
                  <p className="text-slate-600 mb-8 flex-1">{dep.description}</p>
                  <div className="border-t border-slate-100 pt-6 mt-auto">
                     <Link href={`/doctors?department=${dep.id}`} className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-2">
                       Find a specialist <ArrowRight className="h-4 w-4" />
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
