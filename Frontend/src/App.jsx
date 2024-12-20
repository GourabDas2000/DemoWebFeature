import React from "react";
import { Route , Routes } from "react-router-dom";
import { ImageUploading } from "./pages/ImageUploading/ImageUploading";

function App() {
  return (
    <>
    <Routes>
     <Route path="/image"  element={<ImageUploading/>}/>
    </Routes>
    </>
  )
}

export default App
