import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaCamera } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Setting.css';


const Settings = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [profilePic, setProfilePic] = useState('');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValidation = () => {
    const tempErrors = {};
    let isValid = true;

    if (username.trim() === '') {
      tempErrors.username = 'Username is Required';
      isValid = false;
    }

    if (currentPassword.trim() === '') {
      tempErrors.currentPassword = 'Password is Required';
      isValid = false;
    }

    if (newPassword.trim() === '') {
      tempErrors.newPassword = 'New Password is Required';
      isValid = false;
    }

    if (reEnterPassword.trim() === '') {
      tempErrors.reEnterPassword = 'Re-enter Password is Required';
      isValid = false;
    } else if (newPassword !== reEnterPassword) {
      tempErrors.reEnterPassword = 'Passwords do not Match';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      toast.success('Profile Updated Successfully');
    }
  };

  return (
    <Container>
      <div className='setting'>
      <h4 className=''>Settings</h4>
      <p className=''>Profile</p>
      </div>

      <div className="d-flex justify-content-center" style={{ padding: '2rem' }}>
        <Card className='w-100 p-3'>
          <Card.Body>
            <div className="text-center profile-pic mb-3">
              
               <FaCamera
              className="cameraicon" />  
               <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <img
                src={profilePic}
                className="rounded-circle propic"
                onClick={() => document.getElementById('fileInput').click()}
              />
              
              {/* <p
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() => document.getElementById('fileInput').click()}
              >
                Upload / Change Photo
              </p> */}
              
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              
            </div>
            <p className='upload-para'>Upload / Change Photo</p>

            <Form className='pt-4' onSubmit={handleSubmit}>
              <Row className="g-3 g-xl-4">
                <Col md={6}>
                  <Form.Group controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please Enter User Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="currentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      isInvalid={!!errors.currentPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.currentPassword}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
          
                <Col md={6}>
                  <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      isInvalid={!!errors.newPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="reEnterPassword">
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-Enter Password"
                      value={reEnterPassword}
                      onChange={(e) => setReEnterPassword(e.target.value)}
                      isInvalid={!!errors.reEnterPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.reEnterPassword}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
           
                <Col className="text-center">
                  <Button variant="primary" type="submit" className="mt-3">
                    Update Changes
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </Container>
  );
};

export default Settings;