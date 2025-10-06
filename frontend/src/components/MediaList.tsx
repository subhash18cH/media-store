import { Clock, FileVideo, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import api from "./Api";

export default function MediaList() {
  const [files, setFiles] = useState<any[]>([]);
  const fetchMedia = async () => {
    try {
      const response = await api.get("/media");
      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (files.length === 0) {
    return (
      <div className="bg-zinc-800 max-w-2xl flex flex-col justify-center items-center mx-auto mt-10 text-yellow-700 rounded-lg shadow-md p-12  text-center">
        <div className=" mb-4">
          <FileVideo className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">
          No media files yet
        </h3>
        <p className="text-white">
          Upload your first image or video to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 text-yellow-700 rounded-2xl shadow-lg shadow-yellow-900/20 p-8 mt-10">
      <h2 className="text-3xl font-extrabold mb-8 tracking-wide pb-3">
        Your Media Library
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {files.map((file) => (
          <div>
            <a
              key={file._id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-yellow-700/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="aspect-video flex items-center justify-center overflow-hidden relative">
                {file.type === "image" ? (
                  <img
                    src={file.url}
                    alt={file.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-zinc-900">
                    <video
                      src={file.url}
                      className="w-full h-full object-cover opacity-90"
                      preload="metadata"
                    />
                    <div className="absolute">
                      <FileVideo className="h-12 w-12 text-yellow-600 opacity-80" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold truncate flex-1 text-white text-lg">
                    {file.title}
                  </h3>
                  <span className="ml-2 flex-shrink-0">
                    {file.type === "image" ? (
                      <ImageIcon className="h-5 w-5 text-white" />
                    ) : (
                      <FileVideo className="h-5 w-5 text-white" />
                    )}
                  </span>
                </div>

                {file.description && (
                  <p className="text-sm text-zinc-300 mb-4 leading-relaxed line-clamp-2">
                    {file.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(file.createdAt)}</span>
                  </div>
                </div>
              </div>

            </a>
          </div>
        ))}
      </div>
    </div>
  );


}
