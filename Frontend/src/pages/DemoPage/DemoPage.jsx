import React from 'react'
import { useNavigate } from 'react-router-dom';

export const DemoPage = () => {
  const navigate = useNavigate();
  return (
    <div >
        <button onClick={(e) => {
          e.preventDefault();
          navigate("/fileUpload");
        }}>For FileUpload</button>
        <p>Test the uploading File into Cloudinary</p>
    </div>
  )
}
