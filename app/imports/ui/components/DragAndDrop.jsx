import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Upload, BoxArrowInDown } from 'react-bootstrap-icons';

const DragAndDrop = ({ onUpload }) => {
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.items == null) {
      // console.log('something went wrong');
      return;
    }
    if (e.dataTransfer.items.length > 1) {
      // console.log('too many files', e.dataTransfer.items.length);
      return;
    }
    if (e.dataTransfer.items[0].kind !== 'file') {
      // console.log('please drop file');
      return;
    }
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    setDrag(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
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
      // console.log('Too many files');
      return;
    }
    if (e.target.files.length < 1) {
      // console.log('No file Selected');
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onUpload(file);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
  };

  const getStyle = () => {
    const style = {
      overflow: 'hidden',
      height: '250px',
    };
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
      id="dragAndDrop"
    >
      <input
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {drag ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            opacity: '.6',
            pointerEvents: 'none',
            position: 'absolute',
          }}
        >
          <h5 style={{ color: 'white' }}>Drop File Here</h5>
        </div>
      ) : null}

      {file ? (
        <div className="text-center">
          <Upload
            size={80}
            className="mt-5"
            style={{ pointerEvents: 'none' }}
          />
          <div style={{ pointerEvents: 'none' }}>
            {file.name}
          </div>
          <Button className="mx-2" onClick={handleUpload}>Upload</Button>
          <Button className="mx-2" onClick={handleCancel}>Cancel</Button>
        </div>
      ) :
        (
          <div className="text-center" style={{ pointerEvents: 'none' }}>
            <BoxArrowInDown
              size={80}
              className="mt-5"
            />
            <div>Drag And Drop Files Here</div>
          </div>
        )}

    </Card>
  );
};

DragAndDrop.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default DragAndDrop;
