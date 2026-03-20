import { uploadCertificates } from "../../../api/builder";



export default function BuilderCertificates() {

  const handleUpload = async (e) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) {
      return;
    }
    
    const file = files[0];
    const slug = localStorage.getItem('slug');
    
    if (!slug) {
      alert("User slug not found. Please log in again.");
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);

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
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="portfolio-image-upload" className="block mb-2">
            Upload portfolio image
          </label>
          <input
            id="portfolio-image-upload"
            type="file"
            onChange={handleUpload}
            accept="image/*"
          />
        </form>
      </div>
    </section>
  )
}

