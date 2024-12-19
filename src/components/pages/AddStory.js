import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/addstory.css'

function Addstory() {
  // Initial state with one story field
  const [stories, setStories] = useState([{ file: null, title: '', description: '' }]);
  const [seo, setSeo] = useState({
    stitle: '',
    sdec: '',
    sschema: '',
    scategory: '',
    surl: '',
  });

  const [userName,setuserName] = useState()
  const [categories, setCategories] = useState();
 

  useEffect(() => {
    setuserName(JSON.parse(sessionStorage.getItem('user')))
     
  }, []);

  // Function to handle adding new story fields
  const handleAddStory = () => {
    if (stories.length < 5) {
      setStories([...stories, { file: null, title: '', description: '' }]);
    }
  };

  // Handle file, title, and description change
  const handleInputChange = (event, index, field) => {
    const updatedStories = [...stories];
    updatedStories[index][field] = event.target.type === 'file' ? event.target.files[0] : event.target.value;
    setStories(updatedStories);
  };

  // Handle SEO field changes
  const handleSeoChange = (event) => {
    setSeo({ ...seo, [event.target.name]: event.target.value });
  };

  // const formattedDateTime = new Date().toISOString(); 
  const idGenerate = Date.now(); 

  // Handle form submission
  const handleSubmit = async (event) => {

    event.preventDefault();



console.log('sssssssssssssss',userName,idGenerate)
    // Check if all story fields are filled
    if (stories.some((story) => !story.file || !story.title || !story.description)) {
      alert(`Please fill all fields for stories!`);
      return;
    }

    // Check if all SEO fields are filled
    if (Object.values(seo).some((value) => !value)) {
      alert('Please fill all SEO fields!');
      return;
    }

    // Create FormData to send
    const formData = new FormData();
    stories.forEach((story, index) => {
      formData.append(`img${index + 1}`, story.file);
      formData.append(`img${index + 1}t`, story.title);
      formData.append(`img${index + 1}d`, story.description);

    });

    // Add SEO fields to FormData
    Object.entries(seo).forEach(([key, value]) => {
      formData.append(key, value);
      
    });
    // formData.append('time', formattedDateTime)
    formData.append('storyid',idGenerate);
    formData.append('user',userName);



    try {
      const response = await fetch('https://www.medicoverhospitals.in/apis/webstorysingle', {
        method: 'POST',
        body: formData,

      });
      
      const data = await response.json();

      if (data.success) {
        alert('Data uploaded successfully!');
        
        // console.log(data,'asdfasdfsadf',formData);
        for (const [key, value] of formData.entries()) {
          console.log('aaaaaaaaaaaaaaaaaaa',`${key}:`, value);
        }

      } else {
        alert('File upload failed!');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

















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

console.log('adfsasdfasf',categories)





  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Stories</h2>
      <form onSubmit={handleSubmit}>
        {stories.map((story, index) => (
          <div className="mb-3" key={index}>
            <h4>Story {index + 1}</h4>
            <div className="row stories-adding ">

              <div className="col-md-4">
                <label className="form-label">Add Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleInputChange(e, index, 'file')}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={story.title}
                  onChange={(e) => handleInputChange(e, index, 'title')}
                  placeholder="Enter Title"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={story.description}
                  onChange={(e) => handleInputChange(e, index, 'description')}
                  placeholder="Enter Description"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Story Button */}
        {stories.length < 5 && (
          <div className='text-center'>
            <button type="button" className="btn btn-primary mb-3 " onClick={handleAddStory}>
            Add Story
          </button>
          </div>
        )}

        {/* SEO Fields */}
        <h4>SEO Elements</h4>

       <div className='seo-section'>  
        <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Title Text</label>
              <input
                type="text"
                className="form-control"
                name="stitle"
                value={seo.stitle}
                onChange={handleSeoChange}
                placeholder="Enter Title Text"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="scategory"
                value={seo.scategory}
                onChange={handleSeoChange}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} className="category-item">
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="sdec"
                value={seo.sdec}
                onChange={handleSeoChange}
                placeholder="Enter a Description..."
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Schema</label>
              <input
                type="text"
                className="form-control"
                name="sschema"
                value={seo.sschema}
                onChange={handleSeoChange}
                placeholder="Enter Schema..."
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">URL</label>
              <input
                type="text"
                className="form-control"
                name="surl"
                value={seo.surl}
                onChange={handleSeoChange}
                placeholder="Enter URL"
              />
            </div>
          </div>
       </div>

        {/* Submit Button */}
        
        <button type="submit" className="btn btn-primary m-4">
          Preview
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Addstory;
