import React from 'react';
import axios from 'axios';

export const ImageUploading = () => {
  return (
    <div>
      <div>
        <label for ="imagetag">Select Image</label>
        <input type='file' id="imagetag" accept='image/*' />
      </div>
      <button type='submit'>Upload</button>
    </div>
  )
}
