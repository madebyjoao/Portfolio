import { useState } from 'react';
import { uploadCertificates } from "../../../api/builder";

export default function BuilderCertificates() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !title || !info) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const slug = localStorage.getItem('slug');
    if (!slug) {
      alert("User slug not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('info', info);

    try {
      await uploadCertificates(slug, formData);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      const errorMessage = error.response?.data?.message || error.message || "Upload failed";
      alert(`Upload failed: ${errorMessage}`);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-[rgb(24,61,61)]">Portfolio Builder</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="certificate-image-upload" className="block mb-2">
              Upload Certificate Image
            </label>
            <input
              id="certificate-image-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label htmlFor="certificate-title-upload" className="block mb-2">
              Certificate Title
            </label>
            <input
              id="certificate-title-upload"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="certificate-info-upload" className="block mb-2">
              Certificate Information
            </label>
            <input
              id="certificate-info-upload"
              type="text"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Certificate
          </button>
        </form>
      </div>
    </section>
  );
}