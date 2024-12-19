import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Capture the first selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file first!');
      return;
    }

    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append('img1', file);
    console.log(file);

    try {
      // Send the FormData via an API call
      const response = await axios.post(
        'https://www.medicoverhospitals.in/apis/webstorysingle',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data.success);
      if (response.data.success === true) {
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button name="submit" type="submit" value="submit">
        Upload File
      </button>
    </form>
  );
}

export default FileUpload;