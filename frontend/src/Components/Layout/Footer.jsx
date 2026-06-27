import { MapPin, ArrowRight, ExternalLink, Shield, FileText, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0f] text-[#e6d2bf] py-7.5 px-5 pb-10 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ffd72f]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ffd72f]/20 to-transparent"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-[#ffd72f] rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-[20%] w-1.5 h-1.5 bg-[#ffd72f] rounded-full animate-[float_8s_ease-in-out_infinite_1s]"></div>
        <div className="absolute bottom-40 left-[30%] w-1 h-1 bg-[#ffd72f] rounded-full animate-[float_7s_ease-in-out_infinite_2s]"></div>
        <div className="absolute bottom-20 right-[10%] w-2 h-2 bg-[#ffd72f] rounded-full animate-[float_9s_ease-in-out_infinite_0.5s]"></div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-15 mx-[5vw] sm:mx-[10vw] md:mx-[20vw] lg:mx-[30vw] relative z-10">
        <div className="relative inline-block">
          {/* Glow effect behind heading */}
          <div className="absolute -inset-4 sm:-inset-6 md:-inset-10 bg-[radial-gradient(ellipse,rgba(255,215,47,0.08)_0%,transparent_70%)] blur-2xl animate-[pulse_3s_ease-in-out_infinite]"></div>
          
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-black mb-4 sm:mb-5 tracking-[1px] sm:tracking-[2px] bg-linear-to-r from-[#feefdb] via-[#ffd72f] to-[#feefdb] bg-size-[200%_auto] text-transparent bg-clip-text animate-[shimmer_4s_linear_infinite] transition-all duration-700 hover:scale-105 cursor-default">
            WHERE TO NEXT?
          </h1>
        </div>
        
        <button className="relative bg-linear-to-br from-[#ffd72f] to-[#ffb300] text-[#111] border-none rounded-[999px] py-3 sm:py-3.5 px-6 sm:px-7.5 font-semibold cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_15px_rgba(255,215,47,0.3)] overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(255,215,47,0.5)] active:translate-y-px active:scale-[0.98] text-sm sm:text-base">
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></span>
          <span className="relative flex items-center justify-center gap-2">
            Reserve A Table
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </button>
      </div>

      {/* Decorative Divider */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-4 my-8 sm:my-10 md:my-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-white/10"></div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ffd72f] animate-[pulse_1.5s_ease-in-out_infinite]"></span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ffd72f] animate-[pulse_1.5s_ease-in-out_infinite_0.5s]"></span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ffd72f] animate-[pulse_1.5s_ease-in-out_infinite_1s]"></span>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-white/10 to-white/10"></div>
      </div>

      {/* Bottom Layout */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-8 sm:gap-10 relative z-10 max-w-7xl mx-auto">
        
        {/* Brand */}
        <div className="min-w-50 sm:min-w-37.5 text-center sm:text-left group">
          <div className="relative inline-block sm:block">
            <h2 className="text-xl sm:text-2xl mb-2 font-bold bg-linear-to-r from-[#feefdb] to-[#ffd72f] bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 group-hover:tracking-wider">
              THE BUNGALOW
            </h2>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffd72f] transition-all duration-500 group-hover:w-full sm:block hidden"></span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ffd72f] transition-all duration-300 group-hover:scale-125 group-hover:text-[#ffb300]" />
            <p className="text-xs sm:text-sm text-[#a8a8a8] my-1.5 cursor-pointer transition-all duration-300 hover:text-[#ffd72f] hover:translate-x-2 inline-block">
              © 2026 All rights reserved.
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="min-w-50 sm:min-w-37.5 text-center sm:text-left group">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2.5">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffd72f] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
            <h3 className="text-sm sm:text-base text-white transition-all duration-500 group-hover:text-[#ffd72f] group-hover:scale-105">
              Location
            </h3>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs sm:text-sm text-[#a8a8a8] cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2 inline-block sm:block group/location">
              <span className="inline-block transition-all duration-300 group-hover/location:mr-2">📍</span>
              767 5th Street
            </p>
            <p className="text-xs sm:text-sm text-[#a8a8a8] cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2 inline-block sm:block group/location">
              <span className="inline-block transition-all duration-300 group-hover/location:mr-2">📍</span>
              21st Floor, New York, USA
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="min-w-50 sm:min-w-37.5 text-center sm:text-left group">
          <h3 className="text-sm sm:text-base mb-2.5 text-white transition-all duration-500 group-hover:text-[#ffd72f] group-hover:scale-105 inline-block sm:block">
            Links
          </h3>
          <div className="space-y-1.5">
            {['About Us', 'Recipes', 'News', 'Contact'].map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer group/link"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ExternalLink className="w-3 h-3 text-[#a8a8a8] transition-all duration-300 group-hover/link:text-[#ffd72f] group-hover/link:rotate-45" />
                <p className="text-xs sm:text-sm text-[#a8a8a8] transition-all duration-300 group-hover/link:text-white group-hover/link:translate-x-1">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="min-w-50 sm:min-w-37.5 text-center sm:text-left group">
          <h3 className="text-sm sm:text-base mb-2.5 text-white transition-all duration-500 group-hover:text-[#ffd72f] group-hover:scale-105 inline-block sm:block">
            Legal
          </h3>
          <div className="space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer group/legal">
              <Shield className="w-3 h-3 text-[#a8a8a8] transition-all duration-300 group-hover/legal:text-[#ffd72f] group-hover/legal:scale-110" />
              <p className="text-xs sm:text-sm text-[#a8a8a8] transition-all duration-300 group-hover/legal:text-white group-hover/legal:translate-x-1">
                Privacy Policy
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer group/legal">
              <FileText className="w-3 h-3 text-[#a8a8a8] transition-all duration-300 group-hover/legal:text-[#ffd72f] group-hover/legal:scale-110" />
              <p className="text-xs sm:text-sm text-[#a8a8a8] transition-all duration-300 group-hover/legal:text-white group-hover/legal:translate-x-1">
                Terms & Conditions
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom decorative line */}
      <div className="relative mt-8 sm:mt-10 md:mt-12 h-px overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#ffd72f]/20 to-transparent"></div>
      </div>

      {/* Mobile bottom note */}
      <div className="text-center mt-6 sm:hidden">
        <p className="text-[10px] text-[#a8a8a8]">
          © 2026 THE BUNGALOW. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;