import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Header from "./header";


const ImageUpload = () => {

  
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const [sidemarginLeft, setsideMarginLeft] = useState('250px');

    // useEffect(() => {
    //     const sessionUserData = JSON.parse(sessionStorage.getItem('user'));
    //     if (sessionUserData) {
    //         navigate('/header');
    //     }else{
    //         navigate('/');
    //     }
    // }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const res = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setResponse(`${data.message} - Image URL: ${data.url}`);
            setIsSuccess(true);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
            setIsSuccess(false);
        }
    };


    
  const handleResize = () => {
    if (window.innerWidth < 700) {
        setsideMarginLeft('100px');
    } else {
        setsideMarginLeft('250px');
    }
};

useEffect(() => {
    // Set initial margin
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);

    return (

        <div>
            <Header />
            <div className="mt-5 px-3 " style={{marginLeft:sidemarginLeft}} >
                <h1 className="text-center">Upload Story</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Image Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control-file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Upload
                    </button>
                </form>
                {response && (
                    <div
                        className={`alert mt-4 ${isSuccess ? "alert-success" : "alert-danger"
                            }`}
                        role="alert"
                    >
                        {response}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
