import React from 'react';
import { Link } from 'react-router';
import logoImg from '../assets/logo.png';
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';

const FooterLayout = () => {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 sm:py-20">
        
        {/* Exact 4-Column Layout from Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Logo, Tagline & Social Icons */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <Link to="/" className="inline-block mb-3">
              <img
                src={logoImg}
                alt="Logoipsum"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed max-w-xs mb-5 font-normal">
              An online platform for generating paystubs, W-2s, 1099s and direct deposit slips.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-slate-800">
              <a
                href="#linkedin"
                className="hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-slate-900 text-sm mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-600">
              <li>
                <a href="#paystub-generator" className="hover:text-secondary transition-colors">
                  Paystub Generator
                </a>
              </li>
              <li>
                <a href="#w2-generator" className="hover:text-secondary transition-colors">
                  W-2 Generator
                </a>
              </li>
              <li>
                <a href="#1099-generator" className="hover:text-secondary transition-colors">
                  1099 Generator
                </a>
              </li>
              <li>
                <a href="#direct-deposit-slip" className="hover:text-secondary transition-colors">
                  Direct Deposit Slip
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-secondary transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 text-sm mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-600">
              <li>
                <a href="#about-us" className="hover:text-secondary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contracts" className="hover:text-secondary transition-colors">
                  Contracts
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 text-sm mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-600">
              <li>
                <a href="#terms-conditions" className="hover:text-secondary transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy-policy" className="hover:text-secondary transition-colors">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default FooterLayout;
