import React from 'react';
import { useEffect } from "react"; // Keep useEffect as it was in the user's provided AdminDashboard structure

// Individual Student Profile Card Component
// This component displays the details of a single student.
// It accepts a 'student' object as a prop.
const StudentProfileCard = ({ student }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 w-full border border-gray-200">
            {/* Header for the individual student's profile card */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">
                    {student.firstName} {student.lastName}'s Profile
                </h2>
                
            </div>

            {/* Student Information Section, arranged in a responsive flex row */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Student Picture */}
                <div className="flex-shrink-0">
                    <img src={student.Picture || "https://placehold.co/150x150/AEC6CF/FFFFFF?text=No+Image"}
                         alt="Student Profile Picture"
                         className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"/>
                </div>

                {/* Flex container for displaying student's personal details, allowing items to wrap */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 w-full">
                    {/* Full Name */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Full Name:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.firstName} {student.lastName}</span>
                    </div>
                    {/* Student ID */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Student ID:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.studentId}</span>
                    </div>
                    {/* Date of Birth */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Date of Birth:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.dateOfBirth}</span>
                    </div>
                    {/* Gender */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Gender:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.gender}</span>
                    </div>
                    {/* Phone Number */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Phone Number:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.phoneNumber}</span>
                    </div>
                    {/* Email (using N/A if not provided) */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Email:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.email || 'N/A'}</span>
                    </div>
                    {/* Account Status, with dynamic color based on isActive */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Account Status:</span>
                        <span className={`text-lg font-semibold ${student.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    {/* Guardian Name */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Guardian Name:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.guardianName}</span>
                    </div>
                    {/* Guardian Contact */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Guardian Contact:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.guardianContact}</span>
                    </div>
                    {/* Address - can span more width if available */}
                    <div className="flex items-baseline flex-grow"> {/* Use flex-grow to allow address to take more space */}
                        <span className="text-sm font-medium text-gray-500 mr-2">Address:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.address}</span>
                    </div>
                    {/* Enrollment Date */}
                    <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-500 mr-2">Enrollment Date:</span>
                        <span className="text-lg font-semibold text-gray-900">{student.enrollmentDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Admin Dashboard Component
// This is the main component that orchestrates the display of overall stats and individual student profiles.
export default function AdminDashboard() {
    // Sample student data array
    const studentsData = [
        {
            Picture: "https://placehold.co/150x150/AEC6CF/FFFFFF?text=Alice",
            studentId: "S001",
            firstName: "Alice",
            lastName: "Smith",
            dateOfBirth: "2005-03-15",
            password: "hashed_password_1", // Password is not displayed for security
            gender: "Female",
            phoneNumber: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            enrollmentDate: "2023-09-01",
            guardianName: "John Smith",
            guardianContact: "987-654-3210",
            isActive: true,
            email: "alice.smith@example.com" // Added email for display
        },
        {
            Picture: "https://placehold.co/150x150/FFD1DC/333333?text=Bob",
            studentId: "S002",
            firstName: "Bob",
            lastName: "Johnson",
            dateOfBirth: "2004-11-22",
            password: "hashed_password_2",
            gender: "Male",
            phoneNumber: "234-567-8901",
            address: "456 Oak Ave, Otherville, USA",
            enrollmentDate: "2023-09-01",
            guardianName: "Jane Johnson",
            guardianContact: "876-543-2109",
            isActive: true,
            email: "bob.johnson@example.com"
        },
    ];

    // Calculate total number of students dynamically from the data array
    const totalStudents = studentsData.length;

    // General Stat Card Component for displaying dashboard statistics
    const StatCard = ({ title, value, icon, bgColor }) => (
        <div
            className={`rounded-xl shadow-lg p-6 flex items-center justify-between text-white transform hover:scale-105 transition-transform duration-300 ${bgColor}`}
        >
            <div>
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-lg opacity-90">{title}</p>
            </div>
            <div className="text-6xl">{icon}</div>
        </div>
    );

    return (
        <div className="w-screen min-h-screen bg-gray-100 p-4 flex flex-col gap-9 font-inter">
            {/* Main Dashboard Title */}
            <h1 className="text-4xl font-bold text-center text-blue-600">
                Admin Dashboard
            </h1>

            {/* Statistics Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <StatCard
                    title="Total Students"
                    value={totalStudents} // Dynamic value for total students
                    icon="👨‍🎓"
                    bgColor="bg-blue-600"
                />
                <StatCard
                    title="Total Teachers"
                    value={10} // Placeholder value
                    icon="👩‍🏫"
                    bgColor="bg-red-600"
                />
                <StatCard
                    title="Total Classes"
                    value={5} // Placeholder value
                    icon="🏫"
                    bgColor="bg-yellow-600"
                />
            </div>

            {/* Section for displaying individual student profiles */}
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Student Details</h2>
            {/* Responsive grid to show multiple student profile cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Map over the studentsData array to render a StudentProfileCard for each student */}
                {studentsData.map((student, index) => (
                    <StudentProfileCard key={student.studentId || index} student={student} />
                ))}
            </div>
        </div>
    );
}
