import React, { useCallback, useState } from "react";
import DropBox from "./DropBox";
import ShowImage from "./ShowImage";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages(() => [{ id: index, src: e.target.result }]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  return (
    <div className="App">
      <DropBox onDrop={onDrop}></DropBox>
      {/* <FileUploader handleChange={onDrop} name="file" types={fileTypes} /> */}
      <ShowImage images={images}></ShowImage>
    </div>
  );
}
export default DragDrop;

// referensi: https://blog.logrocket.com/create-drag-and-drop-component-react-dropzone/
// https://www.npmjs.com/package/react-drag-drop-files
