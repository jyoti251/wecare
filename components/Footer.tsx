import Link from "next/link";
import { HeartPulse, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 lg:px-8">
        <div className="md:grid md:grid-cols-4 md:gap-8">
          <div className="col-span-1 mb-8 md:mb-0">
             <Link href="/" className="flex items-center gap-2 group mb-6">
                <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">WeCare</span>
             </Link>
             <p className="text-sm text-slate-400 max-w-xs leading-6">
               Providing compassionate, state-of-the-art healthcare to our community. Your well-being is our greatest priority.
             </p>
             <div className="flex gap-4 mt-6">
                <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                   <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                   <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                   <Linkedin className="h-5 w-5" />
                </a>
             </div>
          </div>
          <div className="col-span-1 border-t border-slate-800 pt-8 md:pt-0 md:border-none">
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">Quick Links</h3>
            <ul role="list" className="space-y-4">
              <li><Link href="/" className="text-sm leading-6 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm leading-6 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm leading-6 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/doctors" className="text-sm leading-6 hover:text-white transition-colors">Our Doctors</Link></li>
            </ul>
          </div>
          <div className="col-span-1 border-t border-slate-800 pt-8 md:pt-0 md:border-none">
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">Services</h3>
            <ul role="list" className="space-y-4">
              <li><Link href="#" className="text-sm leading-6 hover:text-white transition-colors">Cardiology</Link></li>
              <li><Link href="#" className="text-sm leading-6 hover:text-white transition-colors">Neurology</Link></li>
              <li><Link href="#" className="text-sm leading-6 hover:text-white transition-colors">Orthopedics</Link></li>
              <li><Link href="#" className="text-sm leading-6 hover:text-white transition-colors">Pediatrics</Link></li>
            </ul>
          </div>
          <div className="col-span-1 border-t border-slate-800 pt-8 md:pt-0 md:border-none">
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">Contact</h3>
            <ul role="list" className="space-y-4">
              <li className="text-sm leading-6">123 Healing Way</li>
              <li className="text-sm leading-6">Medical District, NY 10001</li>
              <li className="text-sm leading-6">info@wecarehospitals.com</li>
              <li className="text-sm leading-6 text-blue-400 font-medium">1-800-WE-CARE</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-slate-500">
            &copy; {new Date().getFullYear()} WeCare Hospitals. All rights reserved.
          </p>
          <div className="flex gap-6">
             <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
