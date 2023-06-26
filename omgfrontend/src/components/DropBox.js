import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { InputLabel } from "@mui/material";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
function DropBox({ onDrop }) {
  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop,
    noClick: true,
    noKeyboard: true,
  });
  return (
    <>
      {" "}
      <section className="dropbox">
        <Container
          className="dropbox"
          {...getRootProps({ isDragAccept, isFocused, isDragReject })}
        >
          <input {...getInputProps()} />
          <Typography variant="h6">Seret gambar kesini</Typography>
          <Typography variant="caption">atau</Typography>
          <button type="button" className="btn" onClick={open}>
            Klik untuk memilih file
          </button>
        </Container>
      </section>
      <aside>
        <InputLabel id="demo-simple-select-helper-label" sx={{ mt: 2 }}>
          Preview
        </InputLabel>
        {/* <p>{lists}</p> */}
      </aside>
    </>
  );
}
export default DropBox;

// referensi: https://blog.logrocket.com/create-drag-and-drop-component-react-dropzone/
