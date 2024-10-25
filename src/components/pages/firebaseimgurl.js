import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAUfNf_FAVHNdADM_yLXWRgMNR-_mEYhWw",
    authDomain: "webstories-c2648.firebaseapp.com",
    projectId: "webstories-c2648",
    storageBucket: "webstories-c2648.appspot.com",
    messagingSenderId: "483580632450",
    appId: "1:483580632450:web:81e152a40b90f386f4839b",
    measurementId: "G-0SNZEJE3MK"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const MyForm = () => {
    const [image, setImage] = useState(null);

    const [generatedurl,setgeneratedurl] = useState()

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
            setgeneratedurl(imageUrl)
            alert('Image uploaded successfully! URL:-- ' + imageUrl);
            setImage(null); // Reset the input
        } catch (error) {
            console.error("Error uploading image: ", error);
            alert(`Error uploading image: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
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
            { generatedurl ? <h5 className=''>generated url: -- {generatedurl}</h5> : ''}
        </form>
    </div>
    );
};

export default MyForm;
