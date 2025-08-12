import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/appContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function StudentDashboard() {
  const [classList, setClassList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    classId: "",
    image: null,
    address: "",
    rollNo: "",
    marks: "",
    parentName: "",
    parentPh: "",
  });

  const { url, studentList } = useAuth();

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/get-class`);
      if (res.data.success) {
        setClassList(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/v1/delete-student/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchStudents();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete student.");
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudentId(student._id);
    const cleanData = {
      name: student.name || "",
      email: student.email || "",
      classId: student.class?._id || "",
      address: student.address || "",
      rollNo: student.rollNo || "",
      marks: student.marks || "",
      parentName: student.parentName || "",
      parentPh: student.parentPh || "",
    };
    setOriginalData(cleanData);
    setFormData({ ...cleanData, image: null });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e, close) => {
    e.preventDefault();

    const isFormSame =
      originalData &&
      Object.keys(originalData).every(
        (key) => originalData[key] === formData[key]
      );

    if (!formData.image && isFormSame) {
      toast.info("No updated data found.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) form.append(key, value);
    });

    try {
      const res = await axios.put(
        `${url}/api/v1/update-student/${selectedStudentId}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Student updated successfully!");
        fetchStudents();
        close();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="max-w-[90%] mx-auto mt-10 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow overflow-x-auto">
      <h2 className="text-2xl text-center text-blue-600 mb-6 font-semibold">
        Student List
      </h2>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, Roll no, Address..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="px-4 py-2 border bg-blue-300 border-gray-300 rounded-md w-full max-w-xs focus:outline-none focus:ring focus:ring-blue-600 text-center placeholder-gray-600"
        />
      </div>

      {studentList.length === 0 ? (
        <p className="text-center text-gray-600 py-4">No students found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-[1000px] w-full  border-collapse">
            <thead>
              <tr className="bg-[#6A64F1] text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Roll No</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Marks</th>
                <th className="py-3 px-4 text-left">Class</th>
                <th className="py-3 px-4 text-left">Parent Name</th>
                <th className="py-3 px-4 text-left">Parent Phone</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentList
                .filter((student) => {
                  const term = searchItem.toLowerCase();
                  return (
                    student.name?.toLowerCase().includes(term) ||
                    student.rollNo?.toLowerCase().includes(term) ||
                    student.class?.className?.toLowerCase().includes(term) ||
                    student.parentName?.toLowerCase().includes(term) ||
                    student.parentPh?.toLowerCase().includes(term) ||
                    student.address?.toLowerCase().includes(term)
                  );
                })
                .map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">{student.rollNo}</td>
                    <td className="py-2 px-4">{student.address}</td>
                    <td className="py-2 px-4">{student.marks}</td>
                    <td className="py-2 px-4">{student.class?.className}</td>
                    <td className="py-2 px-4">{student.parentName}</td>
                    <td className="py-2 px-4">{student.parentPh}</td>
                    <td className="py-2 px-4">
                      <img
                        src={student.imageUrl}
                        alt={student.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 text-center">
                      <Popup
                        trigger={
                          <button
                            className="p-2 hover:bg-gray-200"
                            title="Edit"
                          >
                            <FaEdit className="text-blue-600 text-lg" />
                          </button>
                        }
                        modal
                        nested
                        onOpen={() => handleUpdate(student)}
                      >
                        {(close) => (
                          <div className="bg-white p-6  w-full max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
                            <h3 className="text-xl font-semibold text-center text-blue-600 mb-4">
                              Edit Student
                            </h3>
                            <form
                              onSubmit={(e) => handleFormSubmit(e, close)}
                              className="space-y-4"
                            >
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Name"
                                className="w-full p-3 border border-gray-300 rounded-md"
                              />
                              <input
                                type="text"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleFormChange}
                                placeholder="Roll No"
                                className="w-full p-3 border border-gray-300 rounded-md"
                              />
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                placeholder="Address"
                                className="w-full p-3 border border-gray-300 rounded-md"
                              />
                              <input
                                type="number"
                                name="marks"
                                value={formData.marks}
                                onChange={handleFormChange}
                                placeholder="Marks"
                                className="w-full p-3 border border-gray-300 rounded-md"
                              />
                              <select
                                name="classId"
                                value={formData.classId}
                                onChange={handleFormChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                              >
                                <option value="">Select Class</option>
                                {classList.map((cls) => (
                                  <option key={cls._id} value={cls._id}>
                                    {cls.className}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="text"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleFormChange}
                                placeholder="Parent Name"
                                className="w-full p-3 border border-gray-300 rounded-md"
                              />
                              <input
                                type="text"
                                name="parentPh"
                                value={formData.parentPh}
                                onChange={handleFormChange}
                                placeholder="Parent Phone"
                                className="w-full p-3 border border-gray-300 rounded-md"
                              />
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFormChange}
                                className="w-full"
                              />
                              <div className="flex gap-4 pt-2">
                                <button
                                  type="submit"
                                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  onClick={close}
                                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </Popup>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="p-2 rounded hover:bg-gray-200 ml-2"
                        title="Delete"
                      >
                        <FaTrash className="text-red-600 text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
