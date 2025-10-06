import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import api from './Api';
import toast from 'react-hot-toast';

export default function FileUpload() {
  interface UploadFormData {
    title: string;
    description: string;
    file: File | null;
  }
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    file: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });

      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || !formData.title) return;

    setIsUploading(true);
    try {
      console.log(formData);
      const response = await api.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(formData);

      if (response.status === 200) {
        toast.success("File Uploaded successfully")
        setFormData({ title: '', description: '', file: null });
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFormData({ ...formData, file: null });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-zinc-800 pt-8 rounded-lg shadow-md p-6 text-yellow-700 max-w-2xl flex flex-col  justify-center items-center mx-auto ">

      <h2 className="text-3xl font-bold mb-5 ">Upload Media</h2>

      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div>
          <label className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2  rounded-lg bg-zinc-700 outline-none text-white"
            placeholder="Enter File Title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium  mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2  rounded-lg bg-zinc-700
                 outline-none text-white"
            placeholder="Enter File Description"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Media File * (Image or Video)
          </label>
          <div className="mt-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              required
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full px-4 py-8  rounded-lg cursor-pointer  bg-zinc-700 outline-none text-white "
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12" />
                <p className="mt-2 text-sm ">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs ">
                  Images and videos supported
                </p>
              </div>
            </label>
          </div>
        </div>

        {preview && formData.file && (
          <div className="relative bg-zinc-700 rounded-lg p-4">
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-500 transition"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-4">
              {formData.file.type.startsWith('image/') ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded"
                />
              ) : (
                <video
                  src={preview}
                  className="w-24 h-24 object-cover rounded"
                  controls={false}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">
                  {formData.file.name}
                </p>
                <p className="text-sm text-white">
                  {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!formData.file || !formData.title || isUploading}
          className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg disabled:cursor-not-allowed transition"
        >
          {isUploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </form>

    </div>
  );
}
