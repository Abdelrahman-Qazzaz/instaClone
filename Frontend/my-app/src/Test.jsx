import React, { useState } from 'react';
import { FilePond, registerPlugin } from "react-filepond"
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import axios from 'axios';

function Test() {

registerPlugin(FilePondPluginFileEncode);

const [files, setFiles] = useState([]);
const handleFileSelection = (items) => {
    const encodedFiles = items.map((item) => {
      const encodedData = item.getFileEncodeDataURL(); // Get base64 encoded data
      const encodedType = item.type; // Get file type (e.g., image/jpeg)

      // You can now process the encoded data (e.g., send it to backend)
      console.log(`Encoded Data: ${encodedData}`);
      console.log(`Encoded Type: ${encodedType}`);

      return { encodedData, encodedType };
    });

    setFiles(encodedFiles);
  };

  async function send(){
    await axios.post("http://localhost:4000/test",files)
  }

  return (

      <FilePond
        files={files}
        onupdatefiles={handleFileSelection}
        allowEncoding={true} // Enable encoding
        labelIdle='Drag & drop your images or videos here or <span class="filepond--label-action">Browse</span>'
        name="file" // Name attribute for the form field
      />

    
  )
}

export default Test






