import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/appContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function TeacherDashboard() {
  const [teacherList, setTeacherList] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    image: null,
  });
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const { url } = useAuth();

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/get-teacher`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setTeacherList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch teachers.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unexpected fetch error.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/v1/delete-teacher/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchTeachers();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete teacher.");
    }
  };

  const handleUpdate = (teacher) => {
    setSelectedTeacherId(teacher._id);
    const cleanData = {
      name: teacher.name || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      address: teacher.address || "",
      qualification: teacher.qualification || "",
      image: null,
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

    // Compare only text fields (excluding image)
    const isFormSame = Object.keys(originalData).every(
      (key) => originalData[key] === formData[key]
    );

    // If form is unchanged and no image uploaded
    if (isFormSame && !formData.image) {
      toast.info("No updated data found.");
      return;
    }

    // Prepare form data
    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.put(
        `${url}/api/v1/update-teacher/${selectedTeacherId}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Teacher updated successfully!");
        fetchTeachers();
        close();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="max-w-[90%] mx-auto mt-10 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow overflow-x-auto">
      <h2 className="text-2xl text-center text-blue-600 mb-6 font-semibold">
        Teacher List
      </h2>

      {teacherList.length === 0 ? (
        <p className="text-center text-gray-600 text-base py-4">
          No teachers found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mt-5">
            <thead>
              <tr className="bg-[#6A64F1] text-white">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Phone</th>
                <th className="text-left py-3 px-4">Address</th>
                <th className="text-left py-3 px-4">Qualification</th>
                <th className="text-left py-3 px-4">Image</th>
                <th className="text-center py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher) => (
                <tr key={teacher._id} className="border-b">
                  <td className="py-2 px-4">{teacher.name}</td>
                  <td className="py-2 px-4">{teacher.email}</td>
                  <td className="py-2 px-4">{teacher.phone}</td>
                  <td className="py-2 px-4">{teacher.address}</td>
                  <td className="py-2 px-4">{teacher.qualification}</td>
                  <td className="py-2 px-4">
                    <img
                      src={teacher.imageUrl}
                      alt={teacher.name}
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
                      onOpen={() => handleUpdate(teacher)}
                    >
                      {(close) => (
                        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
                          <h3 className="text-xl font-semibold text-center text-blue-600 mb-4">
                            Edit Teacher
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
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              placeholder="Email"
                              className="w-full p-3 border border-gray-300 rounded-md"
                            />
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              placeholder="Phone"
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
                              type="text"
                              name="qualification"
                              value={formData.qualification}
                              onChange={handleFormChange}
                              placeholder="Qualification"
                              className="w-full p-3 border border-gray-300 rounded-md"
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
                                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                onClick={close}
                                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </Popup>
                    <button
                      onClick={() => handleDelete(teacher._id)}
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

export default TeacherDashboard;
