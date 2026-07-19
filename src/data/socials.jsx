import React from 'react';

/**
 * Single source of truth for the social / contact channels.
 * Both the floating CTA rail and the footer render from this list, so the two
 * can never drift apart in icon set, order, or destination.
 */

const svg = {
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false
};

const LinkedInIcon = () => (
  <svg {...svg}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg {...svg}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TikTokIcon = () => (
  <svg {...svg}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const InstagramIcon = () => (
  <svg {...svg}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const socials = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    // TODO: replace with the real company page once available.
    href: '#',
    Icon: LinkedInIcon
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/6285184611918',
    Icon: WhatsAppIcon
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    href: 'https://tiktok.com/@kriyakayunusantara',
    Icon: TikTokIcon
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/kriyakayunusantara',
    Icon: InstagramIcon
  }
];
