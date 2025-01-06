import React from "react";
import { ToastContainer } from "react-toastify";
import './index.css';
import { Route , Routes } from "react-router-dom";
import { ImageUploading } from "./pages/ImageUploading/ImageUploading.jsx";
import { DemoPage } from "./pages/DemoPage/DemoPage.jsx";
import FileUpload from "./pages/FileUpload/FileUpload.jsx";
function App() {
  return (
    <>
    <Routes>
     <Route path="/" element={<DemoPage/>}/>
     <Route path="/image"  element={<ImageUploading/>}/>
     <Route path="/fileUpload" element={<FileUpload/>} />
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
