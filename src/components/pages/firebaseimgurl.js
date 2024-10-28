// MyForm.js
import React, { useState } from 'react';
import { storage } from './firebaseConfig'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const MyForm = () => {
    const [image, setImage] = useState(null);
    const [generatedUrl, setGeneratedUrl] = useState('');

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please upload an image.");
            return;
        }

        try {
            const imageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            setGeneratedUrl(imageUrl);
            alert('Image uploaded successfully! URL: ' + imageUrl);
            setImage(null); // Reset the input
        } catch (error) {
            console.error("Error uploading image: ", error);
            alert(`Error uploading image: ${error.message}`);
        }
    };

    return (

        <div className="container mt-5" style={{border:'2px solid red'}}>
            <h2 className="mb-4">Upload Image</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <div className="mb-3">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="form-control-file"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Upload Image</button>
                {generatedUrl && <h5>Generated URL: {generatedUrl}</h5>}
            </form>
            
        </div>
    );
};

export default MyForm;
