import Image from "next/image";
import { CheckCircle2, Award, Users, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-slate-50 py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=2000&auto=format&fit=crop"
            alt="Hospital building"
            fill
            referrerPolicy="no-referrer"
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center border-b border-slate-200/50 pb-20">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
            About WeCare Hospitals
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 max-w-2xl mx-auto font-medium">
            Providing exceptional medical care with compassion, innovation, and expertise since 1995.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 mb-6">
              At WeCare Hospitals, our mission is to deliver comprehensive, high-quality healthcare services to our community. We believe in treating not just the illness, but the whole person, prioritizing physical, mental, and emotional well-being.
            </p>
            <ul className="space-y-4">
              {[
                "Patient-first approach in all our practices",
                "Continuous innovation in medical technology",
                "Fostering a culture of empathy and respect",
                "Engaging in community health education"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
             <Image 
               src="https://images.unsplash.com/photo-1538108149393-cebb60cbd040?q=80&w=1600&auto=format&fit=crop"
               alt="Medical team"
               fill
               referrerPolicy="no-referrer"
               className="object-cover"
             />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Core Values</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                 <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                   <Award className="h-8 w-8 text-blue-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Excellence</h3>
                 <p className="text-slate-600">We strive for the highest standards in clinical quality and patient safety.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                 <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                   <Users className="h-8 w-8 text-blue-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Compassion</h3>
                 <p className="text-slate-600">We treat every individual with kindness, empathy, and respect.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                 <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                   <Shield className="h-8 w-8 text-blue-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Integrity</h3>
                 <p className="text-slate-600">We adhere to the highest moral and ethical principles in everything we do.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
