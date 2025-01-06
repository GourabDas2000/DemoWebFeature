import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FileUpload = () => {
  const [Error, setError] = useState(false);
  const [EMessage, setEMessage] = useState([]);
  const [file, setfile] = useState([]);
  const url = import.meta.env.VITE_PROD_URL;
  const handleFile = (e) => {
    const errorMessages = [];
    const validFiles = [];
    const files = Array.from(e.target.files);

    const minSize = 50 * 1024; // 50 KB
    const maxSize = 1024 * 1024; // 1 MB
    const maxFiles = 5;

    if (files.length === 0) {
      errorMessages.push(
        "No files selected. Please upload at least one image."
      );
    } else if (files.length > maxFiles) {
      errorMessages.push(`You can upload up to ${maxFiles} files at a time.`);
    }

    files.forEach((file) => {
      const { name, size, type } = file;

      if (size < minSize || size > maxSize) {
        errorMessages.push(
          `${name}: File size should be between 50 KB and 1 MB.`
        );
      } else if (!type.startsWith("image/")) {
        errorMessages.push(`${name}: Only image files are accepted.`);
      } else {
        validFiles.push(file); // Add valid file objects directly
      }
    });

    // Update state based on validation results
    if (errorMessages.length > 0) {
      setError(true);
      setEMessage([...new Set(errorMessages)]); // Remove duplicates for clarity
    } else {
      setError(false);
      setfile(validFiles); // Save valid File objects for upload
    }
  };


  const HandleDiscard = (e) => {
    e.preventDefault();
    setfile([]);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      file.forEach((f) => formData.append("files", f));
      console.log(formData);
      const response = await axios.post(`${url}file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message, { autoClose: 1000 });
      setfile([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="h-4/5 border-[.1rem] border-black w-4/5 m-auto rounded-lg grid grid-flow-row grid-rows-[20%_auto]">
        <div className="flex flex-col items-center gap-3">
          <label
            htmlFor="select_file"
            className=" cursor-pointer h-15 w-32 text-center text-xs p-2 mt-3 font-normal bg-slate-400 rounded-lg hover:bg-black hover:text-white hover:animate-pulse "
          >
            Select File
          </label>
          <input
            id="select_file"
            className="hidden"
            onChange={handleFile}
            multiple
            type="file"
            name="select_file"
          />
        </div>
        <div
          id="showPicture"
          className="border-t-2 border-black border-dotted  flex items-center flex-col"
        >
          <p className="text-justify text-xl">UPLOADED PICTURE</p>
          <div className="flex flex-col items-start">
            <span className="pl-5 text-sm decoration-yellow-600 underline">
              NOTE:
            </span>
            <li className="text-sm font-normal ">
              File size should be between 500kb to 1024kb
            </li>
            <li className="text-sm font-normal ">
              You can choose atmost 5 file at a time
            </li>
          </div>
          {Error &&
            [...new Set(EMessage)].forEach((message) => {
              toast.error(message, { autoClose: 3000 });
            })}
          {file && file.length > 0 ? (
            <div className="h-full flex flex-col border-blue-50 p-4 gap-4">
              <div className="h-[70%] flex justify-evenly items-center gap-4 ">
                {file.map((item, key) => (
                  <div key={key}>
                    <img
                      src={URL.createObjectURL(item)}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <span className="mt-2 text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-evenly">
                <button
                  type="submit"
                  className="pl-4 pr-4 bg-black text-white pt-2 pb-2 rounded-xl"
                  onClick={(e) => {
                    HandleSubmit(e);
                  }}
                >
                  Submit
                </button>
                <button
                  type="cancel"
                  className="pl-4 pr-4 bg-black text-white pt-2 pb-2 rounded-xl"
                  onClick={(e) => {
                    HandleDiscard(e);
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 flex justify-center">
              No files uploaded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
