import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Filter, Plus, Eye, Pencil, Trash } from "react-bootstrap-icons";
import categoryimg1 from "../../assets/images/story1.png";
import { Link } from "react-router-dom";
import "../styles/unpublished.css";

const UnpublishedStory = ({ setforedIt, setstoryZindex }) => {
  const [storyData, setStoryData] = useState([]);
  const [error, setError] = useState(null);
  const [realsdata, setRealsdata] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const itemsPerPage = 4; // Number of stories per page

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          "https://www.medicoverhospitals.in/apis/getallstories",
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Fetched Story Data:", data);
        setStoryData(data.data);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError(err.message);
      }
    };

    fetchStories();
  }, []);

  const statusClick = async (id, storystatus, e) => {
    const newStatus = e.target.checked ? "active" : "In-Active";
    try {
      const response = await fetch(
        "https://www.medicoverhospitals.in/apis/webstory_update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storyid: id,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response received:", data);

      setStoryData((prevData) =>
        prevData.map((story) =>
          story.storyid === id ? { ...story, status: newStatus } : story
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const editClick = async (id) => {
    setforedIt(id);
    try {
      const response = await fetch(
        `https://www.medicoverhospitals.in/apis/get_story?storyid=${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log("Fetched story details:", data);
      setRealsdata(data.data);
    } catch (error) {
      console.error("Error fetching story details:", error);
    }
  };

  const closeClick = () => {
    setRealsdata("");
  };

  useEffect(() => {
    setstoryZindex(realsdata !== "");
  }, [realsdata, setstoryZindex]);

  const totalPages = Math.ceil(
    storyData
      .filter(
        (story) =>
          story.status === "In-Active" &&
          story.title.toLowerCase().includes(searchTerm.toLowerCase()) // Include search filter
      )
      .length / itemsPerPage
  );

  const paginatedStories = storyData
    .filter(
      (story) =>
        story.status === "In-Active" &&
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) // Include search filter
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center" style={{ padding: "2rem" }}>
        <Card
          className="custom-card-style"
          style={{ width: "100%", maxWidth: "85rem" }}
        >
          <div className="custom-btn-container d-flex justify-content-end align-items-center p-3 w-100">
            <Button
              variant="outline-primary"
              size="sm"
              className="me-3 custom-btn"
            >
              <Filter className="me-2" /> Filter
            </Button>

            <Link
              to="/add-story"
              type="button"
              className="btn btn-primary radius-8 px-3 py-1"
            >
              <Plus className="me-2" />
              Add New Story
            </Link>

            <div
              className="d-flex justify-content-center"
              style={{ flexGrow: 1 }}
            >
              <Form.Control
                type="text"
                placeholder="Search"
                style={{ width: "190px" }}
                className="me-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </div>
          </div>

          <hr />

          <div className="table-responsive">
            <Table bordered className="mx-auto">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Story Name</th>
                  <th>Status</th>
                  <th>Active / Inactive</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStories.map((storydata, id) => (
                  <tr key={id}>
                    <td>
                      <img
                        src={categoryimg1}
                        alt="Story"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{storydata.title || "N/A"}</td>
                    <td>{storydata.status || "Un-Published"}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        checked={storydata.status === "active"}
                        onChange={(e) =>
                          statusClick(storydata.storyid, storydata.status, e)
                        }
                      />
                    </td>
                    <td className="d-flex justify-content-around">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => editClick(storydata.storyid)}
                      >
                        <Eye />
                      </Button>
                      <Link
                        to="/edit-story"
                        className="mx-2"
                        onClick={() => editClick(storydata.storyid)}
                      >
                        <Pencil />
                      </Link>
                      <Button variant="outline-danger" size="sm">
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between paginations align-items-center py-3 px-4">
            <span>
              Showing {currentPage} of {totalPages}
            </span>
            <div className="pagination-buttons d-flex" style={{ gap: "5px" }}>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                {"<"}
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                {">"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      {realsdata!=="" && 
  
  <amp-story
            standalone
            publisher="Your Website"
            publisher-logo-src="https://example.com/logo.png"
            poster-portrait-src="https://example.com/poster.jpg"
        ><h3 className="close-button" onClick={closeClick}>x</h3>
            <amp-story-page id="tip-1:-drink-water-1" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src={`https://www.medicoverhospitals.in/apis/uploads/${realsdata.img1}`}
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Drink Water"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical">
                <div className='content-section'>
                    <h1 className="story-title">{realsdata.img1t}</h1>
                    <p>{realsdata.img1d}</p>
                    </div>

                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-page id="tip-2:-exercise-regularly-2" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src={`https://www.medicoverhospitals.in/apis/uploads/${realsdata.img2}`}
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Exercise Regularly"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical">
                <div className='content-section'>
                    <h1 className="story-title">{realsdata.img2t}</h1>
                    <p>{realsdata.img2d}</p>
                </div>
                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-page id="tip-3:-sleep-well-3" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src={`https://www.medicoverhospitals.in/apis/uploads/${realsdata.img3}`}
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Sleep Well"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical"  style={{color:'white'}} className="content-bottom">
                    
                <div className='content-section'>
                  <h1 className="story-title">{realsdata.img3t}</h1>
                    <p>{realsdata.img3d}</p>
                    </div>

                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-page id="tip-4:-sleep-well-4" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src={`https://www.medicoverhospitals.in/apis/uploads/${realsdata.img4}`}
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Sleep Well"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical"  style={{color:'white'}} className="content-bottom">
                  <div className='content-section'>
                    <h1 className="story-title">{realsdata.img3t}</h1>
                    <p>{realsdata.img3d}</p>
                  </div>
                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-page id="tip-5:-sleep-well-5" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src={`https://www.medicoverhospitals.in/apis/uploads/${realsdata.img5}`}
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Sleep Well"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical"  style={{color:'white'}} className="content-bottom">
                <div className='content-section'>
                    <h1 className="story-title">{realsdata.img3t}</h1>
                    <p>{realsdata.img3d}</p>
                </div>
                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-bookend src="https://example.com/bookend.json" layout="nodisplay"></amp-story-bookend>
            <amp-story-share-menu></amp-story-share-menu>
        </amp-story>}
    </>
  );
};

export default UnpublishedStory;
