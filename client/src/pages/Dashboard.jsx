import React, { useState, useEffect } from "react";
// Recharts for charting
// Note: For a production MERN app, you would typically `npm install recharts`
// and import them directly, rather than using a CDN script tag.

// Define the main App component
const Dashboard = () => {
  // State for navigation
  const [currentPage, setCurrentPage] = useState("dashboard"); // Default to dashboard view
  // Role is fixed to 'admin' for this specific request
  const currentRole = "admin";

  // Static Data Initialization
  // Added more variety for better chart representation
  const [students, setStudents] = useState(
    [
      {
        id: "s1",
        name: "Alice Smith",
        grade: "10",
        attendance: {
          "2025-06-01": "P",
          "2025-06-02": "A",
          "2025-06-03": "P",
          "2025-06-04": "P",
          "2025-06-05": "P",
        },
      },
      {
        id: "s2",
        name: "Bob Johnson",
        grade: "9",
        attendance: {
          "2025-06-01": "P",
          "2025-06-02": "P",
          "2025-06-03": "A",
          "2025-06-04": "P",
          "2025-06-05": "A",
        },
      },
      {
        id: "s3",
        name: "Charlie Brown",
        grade: "11",
        attendance: {
          "2025-06-01": "P",
          "2025-06-02": "P",
          "2025-06-03": "P",
          "2025-06-04": "P",
          "2025-06-05": "P",
        },
      },
      {
        id: "s4",
        name: "Diana Prince",
        grade: "10",
        attendance: {
          "2025-06-01": "A",
          "2025-06-02": "P",
          "2025-06-03": "P",
          "2025-06-04": "P",
          "2025-06-05": "P",
        },
      },
      {
        id: "s5",
        name: "Ethan Hunt",
        grade: "12",
        attendance: {
          "2025-06-01": "P",
          "2025-06-02": "P",
          "2025-06-03": "P",
          "2025-06-04": "A",
          "2025-06-05": "P",
        },
      },
      {
        id: "s6",
        name: "Fiona Gallagher",
        grade: "9",
        attendance: {
          "2025-06-01": "P",
          "2025-06-02": "P",
          "2025-06-03": "P",
          "2025-06-04": "P",
          "2025-06-05": "P",
        },
      },
      {
        id: "s7",
        name: "George Costanza",
        grade: "10",
        attendance: {
          "2025-06-01": "P",
          "2025-06-02": "A",
          "2025-06-03": "P",
          "2025-06-04": "P",
          "2025-06-05": "A",
        },
      },
    ].sort((a, b) => a.name.localeCompare(b.name))
  );

  const [teachers, setTeachers] = useState(
    [
      {
        id: "t1",
        name: "Ms. Emily White",
        subject: "Mathematics",
        email: "emily.white@school.com",
        taughtClasses: ["c1", "c4"],
      },
      {
        id: "t2",
        name: "Mr. David Green",
        subject: "Science",
        email: "david.green@school.com",
        taughtClasses: ["c2"],
      },
      {
        id: "t3",
        name: "Dr. Sarah Lee",
        subject: "History",
        email: "sarah.lee@school.com",
        taughtClasses: ["c3", "c5"],
      },
    ].sort((a, b) => a.name.localeCompare(b.name))
  );

  const [classes, setClasses] = useState(
    [
      {
        id: "c1",
        name: "Algebra I",
        teacherId: "t1",
        teacherName: "Ms. Emily White",
        studentsEnrolled: ["s1", "s4", "s7"],
      },
      {
        id: "c2",
        name: "Biology Basics",
        teacherId: "t2",
        teacherName: "Mr. David Green",
        studentsEnrolled: ["s2", "s6"],
      },
      {
        id: "c3",
        name: "World History",
        teacherId: "t3",
        teacherName: "Dr. Sarah Lee",
        studentsEnrolled: ["s3", "s5"],
      },
      {
        id: "c4",
        name: "Geometry",
        teacherId: "t1",
        teacherName: "Ms. Emily White",
        studentsEnrolled: ["s2", "s5"],
      },
      {
        id: "c5",
        name: "Ancient Civilizations",
        teacherId: "t3",
        teacherName: "Dr. Sarah Lee",
        studentsEnrolled: ["s1", "s4"],
      },
    ].sort((a, b) => a.name.localeCompare(b.name))
  );

  // Navigation Bar (Updated for Admin with management links)
  const Navbar = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          School Admin Dashboard
        </h1>
        <div className="flex space-x-6">
          <NavLink page="dashboard" label="Overview" />
          <NavLink page="students" label="Students" />
          <NavLink page="teachers" label="Teachers" />
          <NavLink page="classes" label="Classes" />
        </div>
      </div>
    </nav>
  );

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
        ${
          currentPage === page
            ? "bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm shadow-md text-blue-900" // Active state: light background, dark text
            : "text-white hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-900" // Inactive state: white text normally, on hover: light background, dark text
        }`}
    >
      {label}
    </button>
  );

  // General Stat Card Component
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

  // Admin Overview Component (formerly AdminDashboard content)
  const AdminOverview = () => {
    // Data for "Students by Grade" Pie Chart
    const studentsByGradeMap = students.reduce((acc, student) => {
      acc[student.grade] = (acc[student.grade] || 0) + 1;
      return acc;
    }, {});
    const gradePieChartData = Object.keys(studentsByGradeMap)
      .map((grade) => ({
        name: `Grade ${grade}`,
        value: studentsByGradeMap[grade],
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Data for "Overall Distribution" Pie Chart
    const totalEntitiesData = [
      { name: "Students", value: students.length },
      { name: "Teachers", value: teachers.length },
      { name: "Classes", value: classes.length },
    ];

    // Colors for the pie charts (more distinct colors for better visualization)
    const PIE_COLORS_GRADES = [
      "#4CAF50",
      "#2196F3",
      "#FFC107",
      "#E91E63",
      "#9C27B0",
      "#00BCD4",
    ];
    const PIE_COLORS_ENTITIES = ["#FF6384", "#36A2EB", "#FFCE56"];

    return (
      <div className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Admin Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard
            title="Total Students"
            value={students.length}
            icon="👨‍🎓"
            bgColor="bg-blue-500"
          />
          <StatCard
            title="Total Teachers"
            value={teachers.length}
            icon="👩‍🏫"
            bgColor="bg-green-500"
          />
          <StatCard
            title="Total Classes"
            value={classes.length}
            icon="🏫"
            bgColor="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Students by Grade Distribution
            </h3>
            {typeof Recharts !== "undefined" && Recharts.PieChart ? (
              <Recharts.ResponsiveContainer width="100%" height={300}>
                <Recharts.PieChart>
                  <Recharts.Pie
                    data={gradePieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100} // Increased outer radius for better visibility
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {gradePieChartData.map((entry, index) => (
                      <Recharts.Cell
                        key={`cell-${index}`}
                        fill={
                          PIE_COLORS_GRADES[index % PIE_COLORS_GRADES.length]
                        }
                      />
                    ))}
                  </Recharts.Pie>
                  <Recharts.Tooltip />
                  <Recharts.Legend />
                </Recharts.PieChart>
              </Recharts.ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center">Loading chart...</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Overall Entity Distribution
            </h3>
            {typeof Recharts !== "undefined" && Recharts.PieChart ? (
              <Recharts.ResponsiveContainer width="100%" height={300}>
                <Recharts.PieChart>
                  <Recharts.Pie
                    data={totalEntitiesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100} // Increased outer radius for better visibility
                    fill="#82ca9d"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {totalEntitiesData.map((entry, index) => (
                      <Recharts.Cell
                        key={`cell-entity-${index}`}
                        fill={
                          PIE_COLORS_ENTITIES[
                            index % PIE_COLORS_ENTITIES.length
                          ]
                        }
                      />
                    ))}
                  </Recharts.Pie>
                  <Recharts.Tooltip />
                  <Recharts.Legend />
                </Recharts.PieChart>
              </Recharts.ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center">Loading chart...</p>
            )}
          </div>
        </div>
        <p className="mt-8 text-sm text-gray-600 text-center">
          Note: This is a static dashboard. Data is hardcoded and changes will
          not persist upon refresh.
        </p>
      </div>
    );
  };

  // Student Management Component (adapted to static data)
  const StudentManagement = () => {
    const [newStudentName, setNewStudentName] = useState("");
    const [newStudentGrade, setNewStudentGrade] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const addStudent = () => {
      if (!newStudentName.trim() || !newStudentGrade.trim()) {
        console.error("Student name and grade cannot be empty.");
        return;
      }
      const newId = `s${Date.now()}`; // Simple ID generation for static data
      const newStudent = {
        id: newId,
        name: newStudentName.trim(),
        grade: newStudentGrade.trim(),
        createdAt: new Date(),
        attendance: {}, // Initialize empty attendance for new students
      };
      setStudents((prevStudents) =>
        [...prevStudents, newStudent].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );
      setNewStudentName("");
      setNewStudentGrade("");
      console.warn(
        "Student added locally. This change will NOT persist on page refresh."
      );
    };

    const confirmDeleteStudent = (student) => {
      setStudentToDelete(student);
      setShowConfirmModal(true);
    };

    const deleteStudent = () => {
      setStudents((prevStudents) =>
        prevStudents.filter((s) => s.id !== studentToDelete.id)
      );
      setShowConfirmModal(false);
      setStudentToDelete(null);
      console.warn(
        "Student deleted locally. This change will NOT persist on page refresh."
      );
    };

    return (
      <div className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Student Management
        </h2>

        {/* Add Student Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Student
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Student Name"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Grade"
              value={newStudentGrade}
              onChange={(e) => setNewStudentGrade(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addStudent}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105"
            >
              Add Student
            </button>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Current Students ({students.length})
          </h3>
          {students.length === 0 ? (
            <p className="text-gray-500 italic">No students added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {student.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => confirmDeleteStudent(student)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <Modal
            title="Confirm Deletion"
            message={`Are you sure you want to delete student "${studentToDelete?.name}"? This action cannot be undone.`}
            onConfirm={deleteStudent}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    );
  };

  // Teacher Management Component (adapted to static data)
  const TeacherManagement = () => {
    const [newTeacherName, setNewTeacherName] = useState("");
    const [newTeacherSubject, setNewTeacherSubject] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);

    const addTeacher = () => {
      if (!newTeacherName.trim() || !newTeacherSubject.trim()) {
        console.error("Teacher name and subject cannot be empty.");
        return;
      }
      const newId = `t${Date.now()}`; // Simple ID generation for static data
      const newTeacher = {
        id: newId,
        name: newTeacherName.trim(),
        subject: newTeacherSubject.trim(),
        createdAt: new Date(),
        taughtClasses: [], // Initialize empty taughtClasses for new teachers
      };
      setTeachers((prevTeachers) =>
        [...prevTeachers, newTeacher].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );
      setNewTeacherName("");
      setNewTeacherSubject("");
      console.warn(
        "Teacher added locally. This change will NOT persist on page refresh."
      );
    };

    const confirmDeleteTeacher = (teacher) => {
      setTeacherToDelete(teacher);
      setShowConfirmModal(true);
    };

    const deleteTeacher = () => {
      setTeachers((prevTeachers) =>
        prevTeachers.filter((t) => t.id !== teacherToDelete.id)
      );
      setShowConfirmModal(false);
      setTeacherToDelete(null);
      console.warn(
        "Teacher deleted locally. This change will NOT persist on page refresh."
      );
    };

    return (
      <div className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Teacher Management
        </h2>

        {/* Add Teacher Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Teacher
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Teacher Name"
              value={newTeacherName}
              onChange={(e) => setNewTeacherName(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Subject"
              value={newTeacherSubject}
              onChange={(e) => setNewTeacherSubject(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTeacher}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105"
            >
              Add Teacher
            </button>
          </div>
        </div>

        {/* Teachers List */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Current Teachers ({teachers.length})
          </h3>
          {teachers.length === 0 ? (
            <p className="text-gray-500 italic">No teachers added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {teacher.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {teacher.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => confirmDeleteTeacher(teacher)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <Modal
            title="Confirm Deletion"
            message={`Are you sure you want to delete teacher "${teacherToDelete?.name}"? This action cannot be undone.`}
            onConfirm={deleteTeacher}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    );
  };

  // Class Management Component (adapted to static data)
  const ClassManagement = () => {
    const [newClassName, setNewClassName] = useState("");
    const [newClassTeacherId, setNewClassTeacherId] = useState(""); // Stores teacher ID
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [classToDelete, setClassToDelete] = useState(null);

    const addClass = () => {
      if (!newClassName.trim() || !newClassTeacherId.trim()) {
        console.error("Class name and teacher must be selected.");
        return;
      }
      // Get the teacher's name based on the selected ID for display
      const selectedTeacher = teachers.find((t) => t.id === newClassTeacherId);
      if (!selectedTeacher) {
        console.error("Selected teacher not found.");
        return;
      }

      const newId = `c${Date.now()}`; // Simple ID generation for static data
      const newClass = {
        id: newId,
        name: newClassName.trim(),
        teacherId: newClassTeacherId,
        teacherName: selectedTeacher.name, // Store teacher's name for easier display
        createdAt: new Date(),
        studentsEnrolled: [], // Initialize empty enrolled students for new classes
      };
      setClasses((prevClasses) =>
        [...prevClasses, newClass].sort((a, b) => a.name.localeCompare(b.name))
      );
      // Also update the teacher's taughtClasses
      setTeachers((prevTeachers) =>
        prevTeachers.map((t) =>
          t.id === newClassTeacherId
            ? { ...t, taughtClasses: [...t.taughtClasses, newId] }
            : t
        )
      );
      setNewClassName("");
      setNewClassTeacherId("");
      console.warn(
        "Class added locally. This change will NOT persist on page refresh."
      );
    };

    const confirmDeleteClass = (c) => {
      // Renamed 'class' to 'c' to avoid keyword conflict
      setClassToDelete(c);
      setShowConfirmModal(true);
    };

    const deleteClass = () => {
      // Remove class from any teacher's taughtClasses list
      setTeachers((prevTeachers) =>
        prevTeachers.map((t) => ({
          ...t,
          taughtClasses: t.taughtClasses.filter(
            (classId) => classId !== classToDelete.id
          ),
        }))
      );
      setClasses((prevClasses) =>
        prevClasses.filter((c) => c.id !== classToDelete.id)
      );
      setShowConfirmModal(false);
      setClassToDelete(null);
      console.warn(
        "Class deleted locally. This change will NOT persist on page refresh."
      );
    };

    return (
      <div className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Class Management
        </h2>

        {/* Add Class Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Class
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Class Name (e.g., Grade 1A)"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newClassTeacherId}
              onChange={(e) => setNewClassTeacherId(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} ({teacher.subject})
                </option>
              ))}
            </select>
            <button
              onClick={addClass}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105"
            >
              Add Class
            </button>
          </div>
        </div>

        {/* Classes List */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Current Classes ({classes.length})
          </h3>
          {classes.length === 0 ? (
            <p className="text-gray-500 italic">No classes added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                      Class Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Teacher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classes.map(
                    (
                      c // Renamed 'class' to 'c'
                    ) => (
                      <tr key={c.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {c.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {c.teacherName || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => confirmDeleteClass(c)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <Modal
            title="Confirm Deletion"
            message={`Are you sure you want to delete class "${classToDelete?.name}"? This action cannot be undone.`}
            onConfirm={deleteClass}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    );
  };

  // Generic Modal Component for Confirmations
  const Modal = ({ title, message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  return (
    <div className="font-sans antialiased bg-gray-100">
      {/* Tailwind CSS and Recharts CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.1.8/recharts.min.js"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        /* Basic Tailwind setup in case it's not fully loaded by default */
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .min-h-screen { min-height: 100vh; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .text-xl { font-size: 1.25rem; }
        .font-semibold { font-weight: 600; }
        .text-gray-700 { color: #374151; }
        .container { max-width: 1280px; margin-left: auto; margin-right: auto; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .p-4 { padding: 1rem; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-green-500 { background-color: #22c55e; }
        .bg-purple-500 { background-color: #a855f7; }
        .text-white { color: #ffffff; }
        .transform { transform: var(--tw-transform); }
        .hover\\:scale-105:hover { --tw-scale-x: 1.05; --tw-scale-y: 1.05; transform: var(--tw-transform); }
        .transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }
        .text-6xl { font-size: 3.75rem; }
        .font-extrabold { font-weight: 800; }
        .text-gray-800 { color: #1f2937; }
        .mb-8 { margin-bottom: 2rem; }
        .text-center { text-align: center; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .gap-8 { gap: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .min-h-\\[calc\\(100vh-80px\\)\\] { min-height: calc(100vh - 80px); }
        .max-w-xl { max-width: 36rem; }
        .max-w-4xl { max-width: 56rem; }
        .p-6 { padding: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .flex-col { flex-direction: column; }
        .gap-4 { gap: 1rem; }
        .flex-grow { flex-grow: 1; }
        .p-3 { padding: 0.75rem; }
        .border { border-width: 1px; }
        .border-gray-300 { border-color: #d1d5db; }
        .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
        .focus\\:ring-2:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
        .focus\\:ring-blue-500:focus { --tw-ring-color: #3b82f6; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .bg-blue-600 { background-color: #2563eb; }
        .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
        .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .text-red-600 { color: #dc2626; }
        .hover\\:text-red-900:hover { color: #7f1d1d; }
        .text-sm { font-size: 0.875rem; }
        .font-medium { font-weight: 500; }
        .hover\\:underline:hover { text-decoration-line: underline; }
        .fixed { position: fixed; }
        .inset-0 { top: 0px; right: 0px; bottom: 0px; left: 0px; }
        .bg-gray-600 { background-color: #4b5563; }
        .bg-opacity-50 { background-color: rgba(75, 85, 99, 0.5); }
        .z-50 { z-index: 50; }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .w-full { width: 100%; }
        .justify-end { justify-content: flex-end; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .border-gray-300 { border-color: #d1d5db; }
        .hover\\:bg-gray-100:hover { background-color: #f3f4f6; }
        .text-gray-500 { color: #6b7280; }
        .italic { font-style: italic; }
        .overflow-x-auto { overflow-x: auto; }
        .min-w-full { min-width: 100%; }
        .divide-y > :not([hidden]) ~ :not([hidden]) { --tw-divide-y-reverse: 0; border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse))); border-bottom-width: calc(1px * var(--tw-divide-y-reverse)); }
        .divide-gray-200 { border-color: #e5e7eb; }
        .whitespace-nowrap { white-space: nowrap; }
        .text-gray-900 { color: #111827; }
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.05em; }
        .rounded-tl-lg { border-top-left-radius: 0.5rem; }
        .rounded-tr-lg { border-top-right-radius: 0.5rem; }
        .space-x-3 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(0.75rem * var(--tw-space-x-reverse)); margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse))); }
        .space-y-3 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0.75rem * var(--tw-space-y-reverse)); }


        @media (min-width: 768px) { /* md breakpoint */
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .md\\:flex-row { flex-direction: row; }
        }
        @media (min-width: 1024px) { /* lg breakpoint */
            .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>
      <Navbar />
      <main>
        {/* Render content based on currentPage state */}
        {(() => {
          switch (currentPage) {
            case "dashboard":
              return <AdminOverview />; // This is the charts view
            case "students":
              return <StudentManagement />;
            case "teachers":
              return <TeacherManagement />;
            case "classes":
              return <ClassManagement />;
            default:
              return <AdminOverview />;
          }
        })()}
      </main>
    </div>
  );
};

// Generic Modal Component for Confirmations
const Modal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
