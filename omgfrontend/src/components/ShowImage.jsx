import React from "react";
import Image from "./Image";
const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} />;
  };
  return <div>{images.map(show)}</div>;
};
export default ShowImage;

// referensi: https://blog.logrocket.com/create-drag-and-drop-component-react-dropzone/
