import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageUpload() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textRotation, setTextRotation] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [modifiedImages, setModifiedImages] = useState([]);
  const imgRef = useRef(null); // Ref to the selected image for size calculations

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.map(file => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  // Handle image click to select
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setText(''); // Reset text when a new image is selected
    setTextColor('#000000'); // Reset text color when a new image is selected
    setTextRotation(0); // Reset rotation when a new image is selected
    setPosition({ x: 50, y: 50 }); // Reset position when a new image is selected
  };

  // Handle remove image
  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Handle text dragging
  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const startPos = { ...position };

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      // Calculate new position, ensuring it stays inside the image bounds
      const imgWidth = imgRef.current ? imgRef.current.width : 0;
      const imgHeight = imgRef.current ? imgRef.current.height : 0;

      setPosition({
        x: Math.min(Math.max(startPos.x + dx, 0), imgWidth),
        y: Math.min(Math.max(startPos.y + dy, 0), imgHeight),
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Update the selected image with the text applied
  const applyTextToImage = () => {
    if (!selectedImage || !text) return;

    // Create a new image object
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Apply text to canvas
      ctx.font = '30px Arial';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.save();

      // Calculate the adjusted position for the text
      const adjustedX = position.x - canvas.width / 2;
      const adjustedY = position.y - canvas.height / 2;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((textRotation * Math.PI) / 180);
      ctx.fillText(text, adjustedX, adjustedY);
      ctx.restore();

      // Create final image
      const modifiedImageURL = canvas.toDataURL();
      setModifiedImages((prevImages) => [...prevImages, modifiedImageURL]);
    };
  };

  // Function to upload the image to the backend
  const uploadModifiedImage = async (modifiedImageURL) => {
    console.log(modifiedImageURL);
    try {
      const response = await fetch('YOUR_BACKEND_URL/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: modifiedImageURL, // Send the base64 image string
          text: text,              // You can also send other data if necessary
        }),
      });

      // const data = await response.json();
      // if (data.success) {
      //   alert('Image uploaded successfully!');
      // } 
      // else {
      //   alert('Failed to upload image.');
      // }
    } 
    catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Left Column: Image upload */}
        <div className="col-md-3">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="form-control mb-3"
          />
          <div
            className="border-dashed p-4 text-center mb-4"
            style={{ border: '2px dashed #ccc', width: '100%' }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files);
              const imageFiles = files.map(file => URL.createObjectURL(file));
              setImages((prevImages) => [...prevImages, ...imageFiles]);
            }}
          >
            <p>Drag images here</p>
          </div>

          <div className="row">
            {images.map((image, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="position-relative">
                  <img
                    src={image}
                    alt={`selected-${index}`}
                    className="img-fluid rounded"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(image)}
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="position-absolute top-0 end-0 btn btn-danger btn-sm rounded-circle"
                    style={{
                      padding: '5px 8px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Image with Text Options */}
        <div className="col-md-6">
          {selectedImage ? (
            <div className="text-center">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  ref={imgRef}
                  src={selectedImage}
                  alt="Selected"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    position: 'relative',
                  }}
                />
                {/* Text displayed over the selected image */}
                {text && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      cursor: 'move',
                      fontSize: '30px',
                      color: textColor,
                      transform: `rotate(${textRotation}deg)`,
                      userSelect: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    {text}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="mt-3">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text"
                  className="form-control mb-2"
                />

                {/* Text Color Picker */}
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="form-control mb-2"
                />

                {/* Text Rotation */}
                <input
                  type="number"
                  value={textRotation}
                  onChange={(e) => setTextRotation(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Rotation Angle"
                />
              </div>
            </div>
          ) : (
            <p className="text-center">Click an image to view it here</p>
          )}
        </div>
      </div>

      {/* Apply Changes Button */}
      <div className="mt-3 text-center">
        <button onClick={applyTextToImage} className="btn btn-primary">
          Apply Changes
        </button>
      </div>

      {/* Modified Images */}
      <div className="mt-5">
        {modifiedImages.map((modifiedImage, index) => (
          <div key={index} className="mb-3">
            <img
              src={modifiedImage}
              alt={`modified-${index}`}
              className="img-fluid rounded"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
