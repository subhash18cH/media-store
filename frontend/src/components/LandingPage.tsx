import { Upload, Play, Database } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-yellow-700">

      <section className="text-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-6xl font-bold mb-8  leading-tight">
            Professional Media Management Platform
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-12 leading-relaxed">
            A comprehensive solution for uploading, organizing, and managing your digital assets.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={"/register"} className="text-white bg-yellow-700 px-10 font-semibold py-4 rounded-xl hover:bg-yellow-600 transition-all text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl shadow-2xl text-center bg-zinc-800 border border-zinc-700 hover:border-yellow-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-yellow-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Upload className="text-white" size={36} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-yellow-700">Efficient Upload</h3>
              <p className="text-gray-300 leading-relaxed">
                Easily upload and organize your images and videos, all in one place.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-2xl text-center bg-zinc-800 border border-zinc-700 hover:border-yellow-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-yellow-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Database className="text-white" size={36} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-yellow-700">Secure Storage</h3>
              <p className="text-gray-300 leading-relaxed">
                Keep your media safe with secure storage and organized file details.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-2xl text-center bg-zinc-800 border border-zinc-700 hover:border-yellow-700 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-yellow-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Play className="text-white" size={36} />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-yellow-700">Instant Access</h3>
              <p className="text-gray-300 leading-relaxed">
               Preview and play your media instantly, no matter the format.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-center items-center py-12 px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold  mb-4">
            Try MediaStore Today
          </h1>
          <p className=" mb-6 text-xl">
            Store all your images and videos in one place, viewable and shareable instantly.
          </p>
          <Link
            to={"/register"}
            className="bg-yellow-700 hover:bg-yellow-600 text-white px-6 rounded-md py-3 text-lg font-semibold transition-colors"
          >
            Try it  NOW!
          </Link>
        </div>
      </section>

    </div >
  );
};

export default LandingPage;