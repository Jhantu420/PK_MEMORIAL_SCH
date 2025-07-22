import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/appContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function ClassDashboard() {
  const [classList, setClassList] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    className: "",
    subjects: "",
    image: null,
  });
  const [selectedClassId, setSelectedClassId] = useState(null);
  const { url } = useAuth();
  const fetchClass = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/get-class`, {
        withCredentials: true,
      });
      //   console.log("response", response.data.data);
      if (response.data.success) {
        setClassList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch classes.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unexpected fetch error.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/v1/delete-class/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchClass();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete class.");
    }
  };

  const handleUpdate = (cls) => {
    setSelectedClassId(cls._id);
    const cleanData = {
      className: cls.className,
      subjects: Array.isArray(cls.subjects)
        ? cls.subjects.join(", ")
        : cls.subjects,
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

  // Normalize and prepare data for comparison
  const currentData = {
    className: formData.className.trim(),
    subjects: formData.subjects
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(", "),
    image: formData.image, // can be null
  };

  const original = {
    ...originalData,
    className: originalData.className.trim(),
    subjects: originalData.subjects
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(", "),
    image: null, // image is always null in originalData
  };

  const isEqual =
    currentData.className === original.className &&
    currentData.subjects === original.subjects &&
    !currentData.image; // image must be null to be considered unchanged

  if (isEqual) {
    toast.info("No changes detected. Nothing to update.");
    return;
  }

  const form = new FormData();
  form.append("className", formData.className);
  form.append("subjects", formData.subjects);
  if (formData.image) {
    form.append("image", formData.image);
  }

  try {
    const res = await axios.put(
      `${url}/api/v1/update-class/${selectedClassId}`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success("Class updated successfully!");
      setSelectedClassId(null);
      setFormData({ className: "", subjects: "", image: null });
      fetchClass();
      close();
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Update failed.");
  }
};


  useEffect(() => {
    fetchClass();
  }, []);

  return (
    <div className="max-w-[90%] mx-auto mt-10 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow overflow-x-auto">
      <h2 className="text-2xl text-center text-blue-600 mb-6 font-semibold">
        Class List
      </h2>

      {classList.length === 0 ? (
        <p className="text-center text-gray-600 text-base py-4">
          No classes found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mt-5">
            <thead>
              <tr className="bg-[#6A64F1] text-white">
                <th className="text-left py-3 px-4">Class Name</th>
                <th className="text-left py-3 px-4">Subjects</th>
                <th className="text-left py-3 px-4">Image</th>
                <th className="text-center py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classList.map((cls) => (
                <tr key={cls._id} className="border-b">
                  <td className="py-2 px-4">{cls.className}</td>
                  <td className="py-2 px-4">
                    {cls.subjects && cls.subjects.length > 0
                      ? cls.subjects.join(", ")
                      : "No subjects"}
                  </td>

                  <td className="py-2 px-4">
                    <img
                      src={cls.imageUrl}
                      alt={cls.className}
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
                      onOpen={() => handleUpdate(cls)}
                    >
                      {(close) => (
                        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
                          <h3 className="text-xl font-semibold text-center text-blue-600 mb-4">
                            Edit Class
                          </h3>
                          <form
                            onSubmit={(e) => handleFormSubmit(e, close)}
                            className="space-y-4"
                          >
                            <input
                              type="text"
                              name="className"
                              value={formData.className}
                              onChange={handleFormChange}
                              placeholder="Class Name"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                            />
                            <input
                              type="text"
                              name="subjects"
                              value={formData.subjects}
                              onChange={handleFormChange}
                              placeholder="Subjects"
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
                      onClick={() => handleDelete(cls._id)}
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

export default ClassDashboard;
