export const profileConstants = {
  imageSize: {
    desktop: {
      min: 120,
      max: 180,
    },
    mobile: {
      min: 100,
      max: 150,
    },
  },
  breakpoints: {
    mobile: 768,
    tablet: 992,
    desktop: 1200,
  },
  defaultImage: '/images/default-avatar.svg',
};

export const formFields = [
  { id: 'name', label: 'Full Name', type: 'text', required: true },
  { id: 'email', label: 'Email Address', type: 'email', required: true },
  { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
  {
    id: 'grade',
    label: 'Grade Level',
    type: 'select',
    required: true,
    options: ['9th Grade', '10th Grade', '11th Grade', '12th Grade'],
  },
];
