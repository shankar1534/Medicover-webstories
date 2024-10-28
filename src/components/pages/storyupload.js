import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Spinner } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { storage } from './firebaseConfig'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageUpload = () => {
    const [storyName, setStoryName] = useState("");
    const [uploads, setUploads] = useState([
        { description: "", image: null },
        { description: "", image: null },
        { description: "", image: null }
    ]);
    const [response, setResponse] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const [sidemarginLeft, setsideMarginLeft] = useState('250px');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urls = [];

        setLoading(true); 

        try {
            for (const upload of uploads) {
                if (upload.image) {
                    const imageRef = ref(storage, `images/${upload.image.name}`);
                    await uploadBytes(imageRef, upload.image);
                    const imageUrl = await getDownloadURL(imageRef);
                    urls.push({ description: upload.description, url: imageUrl });
                }
            }

            const res = await fetch("http://localhost:5000/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ storyName, images: urls }),
            });

            const data = await res.json();
            setResponse(`${data.message} - Story Name: ${data.storyName}`);
            setIsSuccess(true);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
            setIsSuccess(false);
        } finally {
            setLoading(false); 
            setShowModal(true);
            setStoryName("");
            setUploads([
                { description: "", image: null },
                { description: "", image: null },
                { description: "", image: null }
            ]);
        }
    };

    const handleChange = (index, field, value) => {
        const newUploads = [...uploads];
        newUploads[index][field] = value;
        setUploads(newUploads);
    };

    const handleResize = () => {
        if (window.innerWidth < 700) {
            setsideMarginLeft('100px');
        } else {
            setsideMarginLeft('250px');
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <Header />
            <div className="mt-5 px-3" style={{ marginLeft: sidemarginLeft }}>
                <h3 className="text-center">Upload Stories</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Story Name"
                            value={storyName}
                            onChange={(e) => setStoryName(e.target.value)}
                            required
                        />
                    </div>
                    {uploads.map((upload, index) => (
                        <div key={index} className="mb-4">
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    placeholder={`Image Description ${index + 1}`}
                                    value={upload.description}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="file"
                                    className="form-control-file"
                                    accept="image/*"
                                    onChange={(e) => handleChange(index, 'image', e.target.files[0])}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Upload'}
                    </button>
                </form>

                {/* Modal for response */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isSuccess ? "Success" : "Error"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {response}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ImageUpload;
