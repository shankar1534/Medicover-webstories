import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import Header from "./header";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [sidemarginLeft, setsideMarginLeft] = useState("250px");
  const [showstories, setshowstories] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/images");

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        setImages(data);
        console.log("story data", data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 700) {
      setsideMarginLeft("100px");
    } else {
      setsideMarginLeft("250px");
    }
  };

  useEffect(() => {
    // Set initial margin
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const showallstories = () => {
    setshowstories(!showstories);
  };
  return (
    <div>
      <Header />

      <div className="mt-5 " style={{ marginLeft: sidemarginLeft }}>
        <h2 className="text-center mb-4">Image Gallery</h2>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-xl-flex m-auto">
          <div class="card2 col-12 col-md-5" href="#">
            <h3>Uploaded Stories:</h3>
            <p class="small">Card description</p>

            <div class="go-corner">
              <div class="go-arrow">
                <h3> {images.length}</h3>
              </div>
            </div>
          </div>
          <div class="card2 col-12 col-md-5">
            <h3>Uploaded Stories:</h3>
            <p class="small">Card description</p>

            <div class="go-corner" href="#">
              <div class="go-arrow">
                <h3>{images.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className="btn btn-success my-5" onClick={showallstories}>
            All added stories
          </button>
        </div>

        {showstories ? (
          <div className="row">
            {images.map((image, index) => (
              <div className="col-md-4 mb-4" key={image._id}>
                <div className="card">
                  <img
                    src={image.images[0]?.url}
                    className="card-img-top"
                    style={{ height: "200px" }}
                    alt={image.images[0]?.description}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{image.storyName}</h5>
                    <img
                      src={image.images[2]?.url}
                      className="card-img-top"
                      style={{ height: "200px" }}
                      alt={image.images[0]?.description}
                    />
                    {image.images.map((img, imgIndex) => (
                      <p className="card-text" key={imgIndex}>
                        {img.description}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dashboard;
