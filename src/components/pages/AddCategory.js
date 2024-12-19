import React, { useState } from 'react';
import '../styles/addCategories.css';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    categoryImage: null,
    categoryName: '',
  });

  const [errors, setErrors] = useState({
    categoryImage: '',
    categoryName: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'categoryImage') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, categoryImage: file }));
      setErrors((prev) => ({ ...prev, categoryImage: file ? '' : 'Please choose a file.' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, categoryName: value ? '' : 'Category name is required.' }));
    }
  };

  const handleReset = () => {
    setFormData({ categoryImage: null, categoryName: '' });
    setErrors({ categoryImage: '', categoryName: '' });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { categoryImage: '', categoryName: '' };

    if (!formData.categoryImage) {
      newErrors.categoryImage = 'Please choose a file.';
      isValid = false;
    }

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = 'Category name is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataObj = new FormData();


    formDataObj.append("category", formData.categoryName);
    console.log(formData.categoryName)
    try {
      const response = await fetch('https://www.medicoverhospitals.in/apis/addcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: formData.categoryName }), 
      });

      const data = await response.json();
      console.log(formData.categoryName,'data',data)

      // for (let pair of formDataObj.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }


      if (response.ok) {
        alert('Category added successfully!');
        handleReset();
      } else {
        alert('Failed to add category.');
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mx-md-4 mx-1 mt-5 add-category rounded-2">
      <div className="row justify-content-center">
        <div className="col-xxl-6 col-md-6">
          <div className="card py-4">
            <div className="text-center">
              <h5 className="card-title mb-0">Add Category</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Add Image</label>
                  <div className={`input-group align-items-center ${errors.categoryImage ? 'is-invalid' : ''}`}>
                    <button
                      type="button"
                      className="btn browser-btn"
                      onClick={() => document.getElementById('categoryImage').click()}
                    >
                      Browse
                    </button>
                    <input
                      type="file"
                      id="categoryImage"
                      name="categoryImage"
                      onChange={handleInputChange}
                      className="d-none"
                      required
                    />
                    {formData.categoryImage && (
                      <span className="ms-2">{formData.categoryImage.name}</span>
                    )}
                  </div>
                  {errors.categoryImage && (
                    <div className="invalid-feedback d-block">{errors.categoryImage}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    name="categoryName"
                    className={`form-control py-3 ${errors.categoryName ? 'is-invalid' : ''}`}
                    placeholder="Enter Category Name"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.categoryName && (
                    <div className="invalid-feedback">{errors.categoryName}</div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
