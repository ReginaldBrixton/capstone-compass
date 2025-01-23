export const announcements = [
  {
    id: 1,
    title: 'End of Semester Examination Schedule',
    content: `The final examination schedule for the Fall semester has been released. Please check your individual course pages for specific dates and times. All examinations will be conducted in person unless otherwise specified.

Key points to note:
- Examinations will run from January 10th to January 24th
- Morning sessions start at 9:00 AM
- Afternoon sessions start at 2:00 PM
- Students must arrive 30 minutes before the scheduled time
- Bring your student ID and necessary stationery`,
    author: 'Academic Office',
    date: 'Dec 20, 2023',
    type: 'urgent',
    attachments: [
      { name: 'Exam_Schedule.pdf', url: '#' },
      { name: 'Exam_Guidelines.pdf', url: '#' },
    ],
  },
  {
    id: 2,
    title: 'Annual Science Fair Registration Open',
    content: `Registration for the Annual Science Fair is now open. Students interested in participating should submit their project proposals by January 15th. This year's theme is 'Innovation for Sustainability'.

Project Categories:
1. Environmental Science
2. Renewable Energy
3. Sustainable Agriculture
4. Waste Management
5. Clean Technology

Prizes:
- First Place: $1000 scholarship
- Second Place: $500 scholarship
- Third Place: $250 scholarship`,
    author: 'Science Department',
    date: 'Dec 19, 2023',
    type: 'event',
    attachments: [
      { name: 'Registration_Form.doc', url: '#' },
      { name: 'Guidelines.pdf', url: '#' },
    ],
  },
  {
    id: 3,
    title: 'Library Hours During Holiday Season',
    content: `The library will have modified hours during the holiday season. From December 24th to January 2nd, the library will be open from 9 AM to 3 PM on weekdays and closed on weekends.

Special Services Available:
- Online resource access 24/7
- Virtual librarian assistance
- Extended book return deadline until January 5th

Regular hours will resume on January 3rd, 2024.`,
    author: 'Library Services',
    date: 'Dec 18, 2023',
    type: 'info',
    attachments: [],
  },
];
