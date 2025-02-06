'use client';

import React from 'react';
import MegaMenu from './MegaMenu';
const defaultMenuItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Company',
    dropdown: {
      sections: [
        {
          title: 'About',
          items: [
            {
              label: 'About Us',
              href: '/about',
            },
            {
              label: 'Careers',
              href: '/careers',
            },
            {
              label: 'Press',
              href: '/press',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Blog',
              href: '/blog',
            },
            {
              label: 'Newsletter',
              href: '/newsletter',
            },
            {
              label: 'Events',
              href: '/events',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Help Center',
              href: '/help',
            },
            {
              label: 'Contact',
              href: '/contact',
            },
            {
              label: 'Community',
              href: '/community',
            },
          ],
        },
      ],
      cta: {
        title: 'Join Our Team',
        description: 'Looking for talented individuals to join our growing team.',
        label: 'View Open Positions',
        href: '/careers',
      },
    },
  },
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
const iconMenuItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Features',
    dropdown: {
      items: [
        {
          label: 'Analytics',
          href: '/analytics',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" data-oid="ej3r577">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" data-oid="od-rp.q" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" data-oid="i7z.u-5" />
            </svg>
          ),
        },
        {
          label: 'Security',
          href: '/security',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" data-oid="zh0vk46">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
                data-oid="3or4v90"
              />
            </svg>
          ),
        },
        {
          label: 'Automation',
          href: '/automation',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" data-oid="eulxib9">
              <path
                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                data-oid="9m7_bx."
              />
            </svg>
          ),
        },
      ],
    },
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
const DefaultMegaMenu = () => {
  return (
    <div className="default-mega-menu" data-oid="r.4-5kn">
      <h2 className="mb-4 text-xl font-semibold" data-oid="qzg9wr-">
        Default Mega Menu
      </h2>
      <MegaMenu
        variant="default"
        brandName="Company"
        menuItems={defaultMenuItems}
        data-oid="_j:xsl2"
      />
    </div>
  );
};
const IconMegaMenu = () => {
  return (
    <div className="icon-mega-menu" data-oid="q1v5wpb">
      <h2 className="mb-4 text-xl font-semibold" data-oid="kt0rl8s">
        Icon Mega Menu
      </h2>
      <MegaMenu variant="icons" brandName="Company" menuItems={iconMenuItems} data-oid="upprnec" />
    </div>
  );
};
const FullWidthMegaMenu = () => {
  return (
    <div className="full-width-mega-menu" data-oid="fh_bws-">
      <h2 className="mb-4 text-xl font-semibold" data-oid="x1muk8e">
        Full Width Mega Menu
      </h2>
      <MegaMenu
        variant="full-width"
        brandName="Company"
        menuItems={defaultMenuItems}
        data-oid="bsg.v8n"
      />
    </div>
  );
};
const FullWidthCtaMegaMenu = () => {
  return (
    <div className="full-width-cta-mega-menu" data-oid="m6a0osz">
      <h2 className="mb-4 text-xl font-semibold" data-oid="qe8enyf">
        Full Width with CTA
      </h2>
      <MegaMenu
        variant="full-width-cta"
        brandName="Company"
        menuItems={defaultMenuItems}
        data-oid=":ksuik_"
      />
    </div>
  );
};
const MegaMenuDemo = () => {
  return (
    <div className="mega-menu-demo space-y-8" data-oid="h.:j0_3">
      <DefaultMegaMenu data-oid=":31db36" />
      <IconMegaMenu data-oid="hbg9ov3" />
      <FullWidthMegaMenu data-oid="ho5onk-" />
      <FullWidthCtaMegaMenu data-oid="owf1mr_" />
    </div>
  );
};
export default MegaMenuDemo;
