import React from "react";
import { Route , Routes } from "react-router-dom";
import { ImageUploading } from "./pages/ImageUploading/ImageUploading.jsx";
import { DemoPage } from "./pages/DemoPage/DemoPage.jsx";
function App() {
  return (
    <>
    <Routes>
     <Route path="/" element={<DemoPage/>}/>
     <Route path="/image"  element={<ImageUploading/>}/>
    </Routes>
    </>
  )
}

export default App
