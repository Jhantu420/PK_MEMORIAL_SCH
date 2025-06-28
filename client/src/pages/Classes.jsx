import React from 'react';

// Main App component
const Classes = () => {
    // This data would typically come from an API call or a database
    const classesData = [
        {
            id: 'NUR-A',
            name: 'Nursery - Section A',
            code: 'NUR-A',
            academicYear: '2024-2025',
            teacher: 'Ms. Emily Watson',
            schedule: 'Mon, Wed, Fri (9:00 AM - 12:00 PM)',
            room: 'Nursery Room 1',
            enrollment: '18/20 Students', // Example: Current/Max
            status: 'Enrollment Open' // Dynamic status based on enrollment
        },
        {
            id: 'LKG-B',
            name: 'LKG - Section B',
            code: 'LKG-B',
            academicYear: '2024-2025',
            teacher: 'Mr. David Lee',
            schedule: 'Tue, Thu (9:00 AM - 1:00 PM)',
            room: 'LKG Hall 2',
            enrollment: '22/25 Students',
            status: 'Few Seats Left'
        },
        {
            id: 'UKG-C',
            name: 'UKG - Section C',
            code: 'UKG-C',
            academicYear: '2024-2025',
            teacher: 'Mrs. Sarah Johnson',
            schedule: 'Mon-Fri (1:00 PM - 4:00 PM)',
            room: 'UKG Classroom 3',
            enrollment: '20/20 Students',
            status: 'Class Full' // Example: Full class
        },
        {
            id: 'G1-A',
            name: 'Grade 1 - Section A',
            code: 'G1-A',
            academicYear: '2024-2025',
            teacher: 'Mr. Robert Brown',
            schedule: 'Mon-Fri (8:30 AM - 3:00 PM)',
            room: 'Primary Block 101',
            enrollment: '28/30 Students',
            status: 'Enrollment Open'
        },
        {
            id: 'G2-A',
            name: 'Grade 2 - Section A',
            code: 'G2-A',
            academicYear: '2024-2025',
            teacher: 'Mr. Robert Brown',
            schedule: 'Mon-Fri (8:30 AM - 3:00 PM)',
            room: 'Primary Block 101',
            enrollment: '28/30 Students',
            status: 'Enrollment Open'
        },
        {
            id: 'G3-A',
            name: 'Grade 3 - Section A',
            code: 'G3-A',
            academicYear: '2024-2025',
            teacher: 'Mr. Robert Brown',
            schedule: 'Mon-Fri (8:30 AM - 3:00 PM)',
            room: 'Primary Block 101',
            enrollment: '28/30 Students',
            status: 'Enrollment Open'
        },
        {
            id: 'G4-A',
            name: 'Grade 4 - Section A',
            code: 'G4-A',
            academicYear: '2024-2025',
            teacher: 'Mr. Robert Brown',
            schedule: 'Mon-Fri (8:30 AM - 3:00 PM)',
            room: 'Primary Block 101',
            enrollment: '28/30 Students',
            status: 'Enrollment Open'
        },
        {
            id: 'G5-A',
            name: 'Grade 5 - Section A',
            code: 'G5-A',
            academicYear: '2024-2025',
            teacher: 'Mr. Robert Brown',
            schedule: 'Mon-Fri (8:30 AM - 3:00 PM)',
            room: 'Primary Block 101',
            enrollment: '28/30 Students',
            status: 'Enrollment Open'
        },
        // Add more class data here as needed
    ];

    return (
        <div className="font-['Inter'] bg-gray-50 min-h-screen flex flex-col items-center p-4">
            {/* Main Content Section */}
            <main className="w-full max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section className="text-center mb-12 p-6 bg-[#6A64F1] rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-6xl font-extrabold text-yellow-500  mb-4 tracking-tight font-pacifico text-shadow-2xs">Our Academic Classes</h2>
                    <p className="text-xl text-yellow-300 max-w-3xl mx-auto leading-relaxed">
                        A simplified overview of the classes offered, designed to be clear and easy to navigate for all users.
                    </p>
                </section>

                {/* Classes Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-8">
                    {classesData.map((classItem) => (
                        <div
                            key={classItem.id}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden
                                       transform hover:scale-[1.02] transition duration-300 ease-in-out
                                       flex flex-col"
                        >
                            {/* Image Placeholder Area (similar to the 400x300 box) */}
                            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                                Class Visual (e.g., Icon/Image)
                                {/* "Sale" like tag - dynamic status */}
                                {classItem.status && (
                                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                                        ${classItem.status === 'Class Full' ? 'bg-red-500 text-white' :
                                          classItem.status === 'Few Seats Left' ? 'bg-orange-500 text-white' :
                                          'bg-green-500 text-white'}`}
                                    >
                                        {classItem.status}
                                    </span>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-5 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-tight font-roboto">{classItem.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">{classItem.code} | {classItem.academicYear}</p>

                                <div className="space-y-2 text-gray-700 text-base mb-6 flex-grow">
                                    <p><span className="font-semibold text-gray-800 font-roboto">Teacher:</span> {classItem.teacher}</p>
                                    <p><span className="font-semibold text-gray-800 font-roboto">Schedule:</span> {classItem.schedule}</p>
                                    <p><span className="font-semibold text-gray-800 font-roboto">Room:</span> {classItem.room}</p>
                                    <p className="mt-2 text-indigo-700 font-bold text-lg font-roboto"><span className="text-gray-800 text-base font-semibold">Enrollment:</span> {classItem.enrollment}</p>
                                </div>

                                {/* Button (similar to Add to Cart) */}
                                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                                                   hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer font-roboto">
                                    Contact us....
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Classes;
