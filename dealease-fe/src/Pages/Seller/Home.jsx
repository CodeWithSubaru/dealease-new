import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../assets/scss/global.scss';
// import { HeroSection } from "../../Components/Section/HeroSection";
import { Card } from '../../Components/Card/Card';
import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Container,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../Components/Footer/footer';
import '../../assets/scss/card.scss';
import '../../assets/scss/button.scss';
import '../../assets/scss/post-section.scss';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';
import usePostContext from '../../Hooks/Context/ProductContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

export const HomeSeller = () => {
  const { fetchPost } = usePostContext();
  const { setRegistrationSuccess } = useAuthContext();
  const [post_description, setDescription] = useState('');
  const [post_image, setImage] = useState('');
  const data = { post_description: post_description, post_image: post_image };
  const handlePost = (e) => {
    e.preventDefault();
    console.log(post_description, post_image);
    axiosClient
      .post('/seller/post', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.status == 200) {
          Notification({
            title: 'Success',
            message: res.data.message,
            icon: 'success',
          }).then(() => {
            fetchPost();
            setDescription('');
            setImage('');
          });
        }
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  useEffect(() => {
    return () => {
      setRegistrationSuccess(false);
    };
  }, []);

  return (
    <>
      <div className='post_container'>
        <Container className='container_item px-5'>
          <form onSubmit={handlePost}>
            <Row>
              <Col>
                <div className='image-container'>
                  <img
                    src='/images/1.jpg'
                    alt=''
                    className='imagepost float-end mb-4'
                  />
                </div>
              </Col>
              <Col lg={8}>
                <Form.Control
                  as='textarea'
                  className='form-control textarea-input'
                  aria-label='Small'
                  aria-describedby='inputGroup-sizing-sm'
                  placeholder="What's on your mind?"
                  autoComplete='none'
                  value={post_description ? post_description : ''}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                  <span>
                    <FontAwesomeIcon icon={faImage} className='image' />
                    <h6 className='input_text'>Add Photos</h6>
                    <h5>Or drag and drop1</h5>
                  </span>
                  <input
                    value={post_image ? post_image : ''}
                    type='file'
                    className='file-seller'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <button>Submit</button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>{' '}
      */}
      {/* <HeroSection /> */}
      {/* <Card /> */}
      <Footer />
    </>
  );
};
