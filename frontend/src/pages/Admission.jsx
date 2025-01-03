import React, { useState } from 'react';
import Modal from './GradesModal'; // Import the Modal component

const AcademicRecords = () => {
  // Sample data for academic records (students with courses, year, section, and grades)
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      course: 'Computer Science',
      year: 'First Year',
      section: '1-1',
      grades: { 'Year 1 Sem 1': 85, 'Year 1 Sem 2': 90 },
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Computer Science',
      year: 'Second Year',
      section: '2-3',
      grades: { 'Year 2 Sem 1': 88, 'Year 2 Sem 2': 92 },
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mark Lee',
      course: 'Computer Science',
      year: 'Irregular',
      section: 'Irregular',
      grades: { 'Year 3 Sem 1': 80, 'Year 3 Sem 2': 85 },
      status: 'Inactive',
    },
    // Add more students as needed
  ]);

  // States for search, sorting, and filtering
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by student name
  const [yearSectionFilter, setYearSectionFilter] = useState('All'); // All or specific year-section filter

  // Handle search and filtering
  const filteredStudents = students
    .filter((student) => {
      return (
        student.name.toLowerCase().includes(search.toLowerCase()) &&
        (yearSectionFilter === 'All' ||
          `${student.year} ${student.section}` === yearSectionFilter)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'year') {
        return a.year.localeCompare(b.year);
      }
      return 0;
    });

  // Calculate average grade for each semester
  const calculateAverageGrade = (grades) => {
    const gradeValues = Object.values(grades);
    const total = gradeValues.reduce((acc, grade) => acc + grade, 0);
    return (total / gradeValues.length).toFixed(2); // Round to 2 decimal places
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Academic Records</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Student Name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Year & Section Filter Dropdown */}
        <div className="mb-4">
          <select
            value={yearSectionFilter}
            onChange={(e) => setYearSectionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="All">All Years & Sections</option>
            <option value="First Year 1-1">First Year 1-1</option>
            <option value="First Year 1-2">First Year 1-2</option>
            <option value="First Year 1-3">First Year 1-3</option>
            <option value="First Year 1-4">First Year 1-4</option>
            <option value="First Year 1-5">First Year 1-5</option>
            <option value="Second Year 2-1">Second Year 2-1</option>
            <option value="Second Year 2-2">Second Year 2-2</option>
            <option value="Second Year 2-3">Second Year 2-3</option>
            <option value="Second Year 2-4">Second Year 2-4</option>
            <option value="Second Year 2-5">Second Year 2-5</option>
            <option value="Irregular">Irregular</option>
            {/* Add more sections as needed */}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="name">Sort by Student Name</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>

        {/* Table */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left border border-gray-300">Student Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Course</th>
              <th className="px-4 py-2 text-left border border-gray-300">Year & Section</th>
              <th className="px-4 py-2 text-left border border-gray-300">Semester Grades</th>
              <th className="px-4 py-2 text-left border border-gray-300">Average Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                <td className="px-4 py-2 border border-gray-300">{student.course}</td>
                <td className="px-4 py-2 border border-gray-300">{`${student.year} ${student.section}`}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {Object.keys(student.grades).map((semester) => (
                    <div key={semester}>
                      {semester}: {student.grades[semester]}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {calculateAverageGrade(student.grades)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicRecords;
