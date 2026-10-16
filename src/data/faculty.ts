import type { FacultyMember } from '../types';

// Numerical asset imports from src/assets/ (1.png through 18.png)
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img9 from '../assets/9.png';
import img10 from '../assets/10.png';
import img11 from '../assets/11.png';
import img12 from '../assets/12.png';
import img13 from '../assets/13.png';
import img14 from '../assets/14.png';
import img15 from '../assets/15.png';
import img16 from '../assets/16.png';
import img17 from '../assets/17.png';
import img18 from '../assets/18.png';

export const facultyData: FacultyMember[] = [
  // ROW 1: 1 Member (Standalone Lead)
  {
    id: "fac-01",
    positionNumber: 1,
    name: "Dr. Sivaprakash C",
    designation: "Professor & Head",
    department: "AI&ML",
    image: img1,
    featured: true,
  },

  // ROW 2: 5 Members
  {
    id: "fac-02",
    positionNumber: 2,
    name: "Dr. Rupa Ezhil Arasi P",
    designation: "Professor",
    department: "AI&ML",
    image: img2,
  },
  {
    id: "fac-03",
    positionNumber: 3,
    name: "Mr. Vanarasan S",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img3,
  },
  {
    id: "fac-04",
    positionNumber: 4,
    name: "Mr. Kalidass M",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img4,
  },
  {
    id: "fac-05",
    positionNumber: 5,
    name: "Mrs. R Tharani",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img5,
  },
  {
    id: "fac-06",
    positionNumber: 6,
    name: "Mrs. Linija Shylin K P",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img6,
  },

  // ROW 3: 5 Members
  {
    id: "fac-07",
    positionNumber: 7,
    name: "Mrs. Nancy Vaish",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img7,
  },
  {
    id: "fac-08",
    positionNumber: 8,
    name: "Mrs. Divyashri",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img8,
  },
  {
    id: "fac-09",
    positionNumber: 9,
    name: "Mrs. Sathiya A",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img9,
  },
  {
    id: "fac-10",
    positionNumber: 10,
    name: "Mrs. Pramila R",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img10,
  },
  {
    id: "fac-11",
    positionNumber: 11,
    name: "Mrs. Revathi B",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img11,
  },

  // ROW 4: 4 Members
  {
    id: "fac-12",
    positionNumber: 12,
    name: "Mrs. Reshma Farhin J",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img12,
  },
  {
    id: "fac-13",
    positionNumber: 13,
    name: "Mrs. Lavanya D",
    designation: "Assistant Professor",
    department: "AI&ML",
    image: img13,
  },
  {
    id: "fac-14",
    positionNumber: 14,
    name: "Mrs. Kanimozhi M",
    designation: "ASSISTANT PROFESSOR",
    department: "AI&ML",
    image: img14,
  },
  {
    id: "fac-15",
    positionNumber: 15,
    name: "Mrs. Shanmugavalli A",
    designation: "ASSISTANT PROFESSOR",
    department: "AI&ML",
    image: img15,
  },

  // ROW 5: 3 Members (Centered)
  {
    id: "fac-16",
    positionNumber: 16,
    name: "Mrs. Archana Devi M",
    designation: "Lab Instructor",
    department: "AI&ML",
    image: img16,
  },
  {
    id: "fac-17",
    positionNumber: 17,
    name: "Mr. Shrinivasa N",
    designation: "Attender",
    department: "AI&ML",
    image: img17,
  },
  {
    id: "fac-18",
    positionNumber: 18,
    name: "Ranjitha J",
    designation: "SUPPORTING FACULTY",
    department: "AI&ML",
    image: img18,
  },
];

export const facultyRowGroups = {
  row1: facultyData.slice(0, 1),   // Faculty 01 (Image 1 - Dr. Sivaprakash C)
  row2: facultyData.slice(1, 6),   // Faculty 02 - 06 (Images 2 - 6)
  row3: facultyData.slice(6, 11),  // Faculty 07 - 11 (Images 7 - 11)
  row4: facultyData.slice(11, 15), // Faculty 12 - 15 (Images 12 - 15)
  row5: facultyData.slice(15, 18), // Faculty 16 - 18 (Images 16 - 18)
};

export default facultyData;
