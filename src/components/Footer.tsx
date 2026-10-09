import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/images/Compressed/Local Pros Studio logo transparent.png';
import { whatsAppUrlForPath } from '../whatsapp';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();

  const services = [
    { name: 'Review Collection', href: '/reviews' },
    { name: 'Social Media Posting', href: '/social-media-posting-service' },
    { name: 'Web Design', href: '/website-design-package' },
    { name: 'R2,500 Plan', href: '/special-offer-bundle' },
  ];

  const legal = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Refunds & Cancellations', href: '/refunds-cancellations' },
    { name: 'Website Terms & FAQ', href: '/website-faq' },
  ];

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="container-lg section-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="Local Pros Studio"
                className="h-8 w-auto"
                width="120"
                height="32"
              />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Helping South African contractors get more reviews and build their brand on social media.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsAppUrlForPath(pathname)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  +27 83 233 6716
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@localpros.co.za"
                  className="flex items-center text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  hello@localpros.co.za
                </a>
              </li>
              <li className="flex items-start text-neutral-400 text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <span>South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {currentYear} Local Pros Studio. All rights reserved.
            </p>
            <Link
              to="/about"
              className="text-neutral-500 hover:text-white transition-colors text-sm"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
