import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/appContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function StudentDashboard() {
  const [studentList, setStudentList] = useState([]);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
    image: null,
  });
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const { url } = useAuth();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/get-students`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setStudentList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch students.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unexpected fetch error.");
    }
  };

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
      name: student.name,
      email: student.email,
      class: student.class?._id,
      address: student.address,
      rollNo: student.rollNo,
      marks: student.marks,
      parentName: student.parentName,
      parentPh: student.parentPh,
    };
    setOriginalData(cleanData);
    setFormData({ ...cleanData, image: null }); // exclude image from originalData
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

    const isFormSame = Object.keys(originalData).every(
      (key) => originalData[key] === formData[key]
    );

    // Only block submission if nothing changed and no new image
    if (!formData.image && isFormSame) {
      toast.info("No updated data found.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("class", formData.class);
    form.append("address", formData.address);
    form.append("rollNo", formData.rollNo);
    form.append("marks", formData.marks);
    form.append("parentName", formData.parentName);
    form.append("parentPh", formData.parentPh);
    if (formData.image) {
      form.append("image", formData.image);
    }

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

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="max-w-[90%] mx-auto mt-10 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow overflow-x-auto">
      <h2 className="text-2xl text-center text-blue-600 mb-6 font-semibold">
        Student List
      </h2>

      {studentList.length === 0 ? (
        <p className="text-center text-gray-600 text-base py-4">
          No students found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mt-5">
            <thead>
              <tr className="bg-[#6A64F1] text-white">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Roll No</th>
                <th className="text-left py-3 px-4">Address</th>
                <th className="text-left py-3 px-4">Marks</th>
                <th className="text-left py-3 px-4">Class</th>
                <th className="text-left py-3 px-4">Parent Name</th>
                <th className="text-left py-3 px-4">Parent Phone</th>
                <th className="text-left py-3 px-4">Image</th>

                <th className="text-center py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
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
                  <td className="py-2 px-4 text-center whitespace-nowrap">
                    <Popup
                      trigger={
                        <button
                          className="p-2 rounded hover:bg-gray-200"
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
                        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
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
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />

                            <input
                              type="text"
                              name="rollNo"
                              value={formData.rollNo}
                              onChange={handleFormChange}
                              placeholder="Roll No"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleFormChange}
                              placeholder="Address"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />
                            <input
                              type="number"
                              name="marks"
                              value={formData.marks}
                              onChange={handleFormChange}
                              placeholder="Marks"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />
                            <input
                              type="text"
                              name="class"
                              value={formData.class}
                              onChange={handleFormChange}
                              placeholder="Class ID"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />
                            <input
                              type="text"
                              name="parentName"
                              value={formData.parentName}
                              onChange={handleFormChange}
                              placeholder="Parent Name"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />
                            <input
                              type="text"
                              name="parentPh"
                              value={formData.parentPh}
                              onChange={handleFormChange}
                              placeholder="Parent Phone"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={handleFormChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />

                            <div className="flex justify-between gap-4 pt-2">
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
