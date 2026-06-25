const Footer = () => {
  return (
    <footer className="bg-[#0b0b0f] text-[#e6d2bf] py-7.5 px-5 pb-10">
      {/* CTA Section */}
      <div className="text-center mb-15 mx-[30vw] max-md:mx-[15vw] max-sm:mx-[10vw]">
        <h1 className="text-[80px] max-md:text-[40px] max-sm:text-[28px] font-black mb-5 tracking-[2px]">
          WHERE TO NEXT?
        </h1>
        <button className="bg-[#ffb300] text-[#111] border-none rounded-[999px] py-3.5 px-7.5 font-semibold cursor-pointer transition duration-300 hover:-translate-y-0.5 max-sm:py-3 max-sm:px-6">
          Reserve A Table
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 my-10" />

      {/* Bottom Layout */}
      <div className="flex justify-between flex-wrap gap-10 max-md:flex-col max-md:text-center max-md:items-center">
        
        {/* Brand */}
        <div className="min-w-37.5">
          <h2 className="text-2xl mb-2.5">THE BUNGALOW</h2>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            © 2026 All rights reserved.
          </p>
        </div>

        {/* Location */}
        <div className="min-w-37.5">
          <h3 className="text-base mb-2.5 text-white">Location</h3>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            767 5th Street
          </p>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            21st Floor, New York, USA
          </p>
        </div>

        {/* Links */}
        <div className="min-w-37.5">
          <h3 className="text-base mb-2.5 text-white">Links</h3>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            About Us
          </p>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            Recipes
          </p>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            News
          </p>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            Contact
          </p>
        </div>

        {/* Legal */}
        <div className="min-w-37.5">
          <h3 className="text-base mb-2.5 text-white">Legal</h3>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            Privacy Policy
          </p>
          <p className="text-sm text-[#a8a8a8] my-1.5 cursor-pointer hover:text-white transition-colors">
            Terms & Conditions
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;