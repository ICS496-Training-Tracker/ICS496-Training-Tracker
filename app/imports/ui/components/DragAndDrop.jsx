import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const DragAndDrop = () => {
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.items == null) {
      console.log('something went wrong');
      return;
    }
    if (e.dataTransfer.items.length > 1) {
      console.log('too many files', e.dataTransfer.items.length);
      return;
    }
    if (e.dataTransfer.items[0].kind !== 'file') {
      console.log('please drop file');
      return;
    }
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    setDrag(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    setDrag(false);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHover(true);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHover(false);
  };

  const handleOnClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleChange = (e) => {
    if (e.target.files.length > 1) {
      console.log('Too many files');
      return;
    }
    setFile(e.target.files[0]);
  };

  const getStyle = () => {
    const style = { overflow: 'hidden' };
    if (hover) style.borderWidth = '3px';
    return style;
  };

  return (
    <Card
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
      style={getStyle()}
      className="text-center p-0"
    >
      <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleChange} />
      {drag ? (
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: '.3', pointerEvents: 'none', position: 'absolute' }}
        >
          drop here
        </div>
      ) : null}
      Upload here {file ? file.name : null}
    </Card>
  );
};

export default DragAndDrop;
