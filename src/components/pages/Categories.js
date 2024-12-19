import React, { useEffect, useState } from "react";
import catogary1 from "../../assets/images/category1.png";
import catogary2 from "../../assets/images/category2.png";
import catogary3 from "../../assets/images/category3.png";
import catogary4 from "../../assets/images/category4.png";
import catogary5 from "../../assets/images/category5.png";
import catogary6 from "../../assets/images/category6.png";
import { Link } from "react-router-dom";
import "../styles/categories.css";

const Categories = () => {
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);      // To handle errors

  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = "https://www.medicoverhospitals.in/apis/category";

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategoriesdata(data.data || []);  // Ensure data is an array
      } catch (err) {
        setError(err.message);  // Set error message if API call fails
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchCategories();
  }, []);

  // Default categories array in case the API is still loading
  const categories = categoriesdata.length
    ? categoriesdata.map((category, index) => ({
        id: index + 1,
        title: category.category || `Category ${index + 1}`,
        image: [catogary1, catogary2, catogary3, catogary4, catogary5, catogary6][index] || catogary6,
      }))
    : [];

  return (
    <div className="categories-section">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 px-3 mt-5">
        <h1 className="fw-semibold mb-0">Categories</h1>
        <ul className="d-flex align-items-center gap-2 m-0">
          <Link to="/add-category" className="btn btn-primary radius-8 px-20 py-11">
            Add Category
          </Link>
        </ul>
      </div>

      {loading ? (
        <div className="text-center">Loading categories...</div>
      ) : error ? (
        <div className="text-center text-danger">Error: {error}</div>
      ) : (
        <div className="row gy-4">
          {categories.map((category) => (
            <div key={category.id} className="col-xxl-3 col-sm-3">
              <div className="card h-100 radius-12">
                <img src={category.image} className="card-img-top" alt={category.title} />
                <div className="card-body p-16 text-center">
                  <h5 className="card-title text-lg text-primary-light mb-6">
                    {category.title}
                  </h5>
                  <button className="btn px-4 mt-3 view-btn">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
