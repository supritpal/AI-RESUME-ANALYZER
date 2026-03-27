import { useState } from "react";
import "../styles/UploadBox.css";
import axios from "axios";
import toast from "react-hot-toast";

const UploadBox = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Select file first");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Please login first");
    }

    const formData = new FormData();
    formData.append("resume", file);

    setUploading(true); // 🔥 START LOADING

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/resume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.setItem("resumeId", res.data.resume._id);

      toast.success(" resume uploaded successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false); // 🔥 STOP LOADING
    }
  };

  return (
    <div className="upload-box">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      {file && <p className="file-name">📄 {file.name}</p>}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
};

export default UploadBox;
