import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Star, Share2, Globe, Megaphone, Users, Layout, Image } from 'lucide-react';

const LandingPagesDirectory = () => {
  const pageCategories = [
    {
      title: 'Home Pages',
      icon: Home,
      pages: [
        { name: 'Home (Original)', href: '/', description: 'Main homepage with services' },
      ]
    },
    {
      title: 'Reviews & Reputation',
      icon: Star,
      pages: [
        { name: 'Reviews', href: '/reviews', description: 'Main review collection page' },
        { name: 'Reviews Pro', href: '/reviews-pro', description: 'Pro version of reviews page' },
        { name: 'Reviews Pro (Clienti)', href: '/reviews-clienti', description: 'Clienti-style reviews page' },
      ]
    },
    {
      title: 'Services',
      icon: Globe,
      pages: [
        { name: 'Social Media', href: '/social-media-posting-service', description: 'Social media posting service' },
        { name: 'Web Design', href: '/web-design', description: 'Main web design page (dark portfolio page with site navigation)' },
        { name: 'Web Design (Archived)', href: '/web-design-archive', description: 'Previous web design page, archived 1 Oct 2026' },
        { name: 'Web Design SA (Google Ads LP, portfolio)', href: '/website-opus5', description: 'Ad landing page version of /web-design: no site navigation' },
        { name: 'Web Design SA - Light (Google Ads LP, portfolio)', href: '/website-opus5-light', description: 'Light-mode version of the portfolio ad landing page' },
        { name: 'Web Design Alt', href: '/web-design-alt', description: 'Alternative web design page' },
        { name: 'Google Ads', href: '/google-ads', description: 'Google Ads service page' },
      ]
    },
    {
      title: 'Products',
      icon: Layout,
      pages: [
        { name: 'FieldCard', href: '/fieldcard', description: 'FieldCard product page' },
        { name: 'ReachMax', href: '/reachmax', description: 'ReachMax product page' },
      ]
    },
    {
      title: 'Other Pages',
      icon: Users,
      pages: [
        { name: 'About', href: '/about', description: 'About Local Pros Studio' },
        { name: 'Gallery', href: '/gallery', description: 'Image gallery' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-400 text-xs tracking-[3px] uppercase mb-4">Internal Directory</p>
          <h1 className="font-['Bricolage_Grotesque'] text-3xl md:text-5xl font-bold text-white mb-4">
            All Landing Pages
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Quick access to all page versions and landing pages for development and testing.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-8 md:gap-10">
          {pageCategories.map((category) => (
            <div key={category.title} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h2 className="font-['Bricolage_Grotesque'] text-xl md:text-2xl font-bold text-white">
                  {category.title}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.pages.map((page) => (
                  <Link
                    key={page.href}
                    to={page.href}
                    className="group flex items-center justify-between bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 hover:border-neutral-600 rounded-xl px-4 py-3 transition-all"
                  >
                    <div>
                      <p className="text-white font-medium group-hover:text-amber-400 transition-colors">
                        {page.name}
                      </p>
                      <p className="text-neutral-500 text-sm">
                        {page.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPagesDirectory;
