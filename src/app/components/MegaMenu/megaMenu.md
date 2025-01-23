# MegaMenu Component

A flexible and responsive mega menu component for Next.js applications with multiple variants, animations, and full TypeScript support.

## Features

- 🎨 Multiple variants (default, icons, full-width, full-width-cta)
- 📱 Fully responsive with mobile support
- 🌙 Dark mode support
- 🌐 RTL support
- ✨ Smooth animations using Framer Motion
- 🎯 Accessible by default
- 🔄 State management with React hooks

## Installation

```bash
npm install framer-motion next-themes
```

## Usage

```jsx
import MegaMenu from '@/components/MegaMenu/MegaMenu';

// Basic usage
const MyComponent = () => {
  const menuItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Company',
      dropdown: {
        sections: [
          {
            title: 'About',
            items: [
              { label: 'About Us', href: '/about' },
              { label: 'Careers', href: '/careers' },
            ],
          },
        ],
      },
    },
  ];

  return (
    <MegaMenu variant="default" brandName="Company" menuItems={menuItems} />
  );
};
```

## Props

### MegaMenu Component

| Prop      | Type                                                     | Default   | Description                        |
| --------- | -------------------------------------------------------- | --------- | ---------------------------------- |
| variant   | 'default' \| 'icons' \| 'full-width' \| 'full-width-cta' | 'default' | The style variant of the mega menu |
| logo      | React.ReactNode                                          | undefined | Logo component or image            |
| brandName | string                                                   | undefined | Name of the brand/company          |
| menuItems | MenuItem[]                                               | []        | Array of menu items                |
| darkMode  | boolean                                                  | false     | Enable dark mode                   |
| rtl       | boolean                                                  | false     | Enable RTL support                 |
| className | string                                                   | ''        | Additional CSS classes             |

### MenuItem Type

```typescript
interface MenuItem {
  label: string;
  href?: string;
  dropdown?: {
    items?: DropdownItem[];
    sections?: Section[];
    cta?: CTAItem;
  };
}

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface Section {
  title: string;
  items: DropdownItem[];
}

interface CTAItem {
  title: string;
  description: string;
  label: string;
  href: string;
}
```

## Variants

### Default

Basic dropdown menu with a simple list of items.

### Icons

Dropdown menu with icons next to each item.

### Full Width

Full-width dropdown with multiple sections.

### Full Width with CTA

Full-width dropdown with sections and a call-to-action area.

## Examples

### Icon Menu

```jsx
const iconMenuItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Features',
    dropdown: {
      items: [
        {
          label: 'Analytics',
          href: '/analytics',
          icon: <AnalyticsIcon />,
        },
      ],
    },
  },
];

<MegaMenu variant="icons" brandName="Company" menuItems={iconMenuItems} />;
```

### Full Width with CTA

```jsx
const menuItems = [
  {
    label: 'Company',
    dropdown: {
      sections: [
        {
          title: 'About',
          items: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
          ],
        },
      ],
      cta: {
        title: 'Join Our Team',
        description: 'Looking for talented individuals.',
        label: 'View Positions',
        href: '/careers',
      },
    },
  },
];

<MegaMenu variant="full-width-cta" brandName="Company" menuItems={menuItems} />;
```

## Accessibility

- Fully keyboard navigable
- ARIA labels and roles
- Focus management
- Screen reader friendly

## Mobile Support

The component includes a responsive mobile menu that:

- Transforms into a full-screen overlay on mobile devices
- Maintains all functionality of the desktop version
- Provides smooth animations for menu transitions
- Includes a close button for better UX

## Customization

The component uses Tailwind CSS classes and can be customized by:

1. Overriding the default classes using the `className` prop
2. Modifying the Tailwind theme in your `tailwind.config.js`
3. Creating variant-specific styles in your CSS

## Best Practices

1. Keep menu items concise and clear
2. Limit the number of dropdown items
3. Use icons sparingly and ensure they're meaningful
4. Maintain consistent styling across variants
5. Test keyboard navigation thoroughly
6. Ensure proper contrast ratios for accessibility
