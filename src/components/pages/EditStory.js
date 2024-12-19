import React, { useState, useEffect } from "react";
import '../styles/editstory.css'
// import { styled } from "@mui/material";

const AddStory = ({foreditId}) => {
  // const [singlestorydata, setsinglestorydata] = useState("");
  const [userName,setuserName] = useState()
  const [categories, setCategories] = useState();


  useEffect(() => {
    setuserName(JSON.parse(sessionStorage.getItem('user')))
     
  }, []);
  const [stories, setStories] = useState([
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
  ]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, index, field) => {
    const updatedStories = [...stories];
    updatedStories[index][field] = field === "image" ? e.target.files[0] : e.target.value;
    setStories(updatedStories);
    console.log('lllllllllllllllllllllllllaaaaa',stories)
  };
let thestoryidis = foreditId
  useEffect(() => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaasdfsdfsdfs',foreditId)

    fetch(`https://www.medicoverhospitals.in/apis/get_story?storyid=${thestoryidis}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const fetchedData = data.data;

        // Map API data to state
        // setsinglestorydata(fetchedData);
// console.log('adfasfdddddddddddddddddddddddd',fetchedData)
        // Set SEO fields
        setSeoTitle(fetchedData.title || "");
        setSeoDescription(fetchedData.description || "");
        setCategory(fetchedData.category || "");
        setUrl(fetchedData.url || "");

        // Map images and their respective titles and descriptions into stories
        setStories([
          {
            image: fetchedData.img1,
            title: fetchedData.img1t || "",
            description: fetchedData.img1d || "",
          },
          {
            image: fetchedData.img2,
            title: fetchedData.img2t || "",
            description: fetchedData.img2d || "",
          },
          {
            image: fetchedData.img3,
            title: fetchedData.img3t || "",
            description: fetchedData.img3d || "",
          },
          {
            image: fetchedData.img4,
            title: fetchedData.img4t || "",
            description: fetchedData.img4d || "",
          },
          {
            image: fetchedData.img5,
            title: fetchedData.img5t || "",
            description: fetchedData.img5d || "",
          },
        ]);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate Stories
    stories.forEach((story, index) => {
      if (!story.title) {
        validationErrors[`storyTitle${index}`] = "Title is required.";
      }
      if (!story.description) {
        validationErrors[`storyDescription${index}`] = "Description is required.";
      }
      // if (!story.image) {
      //   validationErrors[`storyImage${index}`] = "Image is required.";
      // }
    });

    // Validate SEO Title
    if (!seoTitle) {
      validationErrors.seoTitle = "SEO Title is required.";
    }

    // Validate SEO Description
    if (!seoDescription) {
      validationErrors.seoDescription = "SEO Description is required.";
    }

    // Validate Category
    if (!category) {
      validationErrors.category = "Category is required.";
    }

    // Validate URL
    const urlPattern = /^(https?:\/\/)?([a-z0-9]+[.]){1,2}[a-z]{2,5}(\/[^\s]*)?$/i;
    if (!url) {
      validationErrors.url = "URL is required.";
    } else if (!urlPattern.test(url)) {
      validationErrors.url = "Please enter a valid URL.";
    }

    // Set errors if any
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please correct the highlighted errors.");
      return;
    }

    // Clear errors and proceed
    setErrors({});
    alert("Form submitted successfully!");

console.log('asdfasdfllllllllllllllllllllll',stories[0].title,

  seoTitle,
  seoDescription,
  category,
  url)

    try {
      const response = await fetch("https://www.medicoverhospitals.in/apis/webstory_update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( 
          {storyid:thestoryidis,
          img1:stories[0].image,
          img1t:stories[0].title,
          img1d:stories[0].description,
          img2:stories[1].image,
          img2t:stories[1].title,
          img2d:stories[1].description,
          img3:stories[2].image,
          img3t:stories[2].title,
          img3d:stories[2].description,
          img4:stories[3].image,
          img4t:stories[3].title,
          img4d:stories[3].description,
          img5:stories[4].image,
          img5t:stories[4].title,
          img5d:stories[4].description,
          title:seoTitle,
          description:seoDescription,
          // time:"asdfasdf",
          user:userName,
          url:url,
          }),
      });
      console.log("Response received:sssssssssssssssssssssssssssss", stories[0].image);


      // Handle response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();

    } catch (error) {
      console.error("Error submitting data:rrrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
    }


    console.log("Form Data:", { stories, seoTitle, seoDescription, category, url });
  };


  console.log("Form Data:", {
    ...stories.reduce((acc, story, index) => {
      acc[`story${index + 1}`] = story.title; 
      return acc;
    }, {}),
    seoTitle,
    seoDescription,
    category,
    url
  });
  
  console.log('asdasdf,',stories)







  useEffect(() => {
    const fetchCategories = async () => {
        const apiUrl = "https://www.medicoverhospitals.in/apis/category";

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data.data); // Store data in state
        } catch (error) {
            console.log(error.message); // Handle error
        }
    };

    fetchCategories();
}, []); // Empty dependency array ensures the effect runs only once







  return (
    <div className="container my-4">
      <h3>Edit Stories</h3>
      <div className="row">
        {stories.map((story, index) => (
          <div key={index} className="col-12 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Story {index + 1}</h5>
              </div>
              <div className="card-body">
                <div className="row gy-3">
                                 <div className="col-md-1 d-flex justify-content-center align-items-center">
                                      <img   src={story.image instanceof File
                                       ? URL.createObjectURL(story.image)
                                       : `https://www.medicoverhospitals.in/apis/uploads/${story.image}`}  style={{width:'40px',height:'40px'}}/>
                                      
                                  </div>
                                  <div className="col-md-2">
                                  <label className="form-label">Add Image </label>
                                  <input
                                    type="file"
                                    className="form-control custom-file-input-unique"
                                    onChange={(e) => handleInputChange(e, index, "image")} 
                                  /> 
                                  
                                  
                                </div>
                                 
                               

                                
                  <div className="col-md-4">
                    <label className="form-label">Title Text</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Short Title"
                      value={story.title}
                      onChange={(e) => handleInputChange(e, index, "title")}
                    />
                    {errors[`storyTitle${index}`] && (
                      <small className="text-danger">{errors[`storyTitle${index}`]}</small>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Short Description"
                      value={story.description}
                      onChange={(e) => handleInputChange(e, index, "description")}
                    />
                    {errors[`storyDescription${index}`] && (
                      <small className="text-danger">{errors[`storyDescription${index}`]}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">SEO ELEMENTS</h5>
            </div>
            <div className="card-body">
              <div className="row gy-3">
                <div className="col-6">
                  <label className="form-label">Title Text</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="SEO Title"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                  />
                  {errors.seoTitle && <small className="text-danger">{errors.seoTitle}</small>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                      {categories?.map((category, index) => (
                      <option key={index} className="category-item">
                          
                          {category?.category}
                      </option>
                      ))}
                  </select>
                  {errors.category && <small className="text-danger">{errors.category}</small>}
                </div>
                <div className="col-lg-6">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="SEO Description"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                  ></textarea>
                  {errors.seoDescription && (
                    <small className="text-danger">{errors.seoDescription}</small>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="form-label">URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  {errors.url && <small className="text-danger">{errors.url}</small>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddStory;
