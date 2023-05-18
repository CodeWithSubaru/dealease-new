import Carousel from 'react-bootstrap/Carousel';
import PUBLIC_URL from '../api/public_url';
import { H1 } from '../Components/Helpers/index.style';
import { useState, useEffect } from 'react';
import axiosClient from '../api/axios';
import { Card, Container } from 'react-bootstrap';
import '../../src/assets/scss/announcement.scss';

export function Announcement() {
  const [data, setData] = useState([]);

  function fetchData() {
    axiosClient.get('/announcement').then((res) => {
      setData(res.data);
    });
  }

  useEffect(() => fetchData(), []);

  let hasAnnouncements = false;
  const announcements = data.map((item) => {
    if (!item.deleted_at && item.is_published == 1) {
      hasAnnouncements = true;
      return (
        <Carousel.Item key={item.id}>
          {/* <div className='d-flex justify-content-center carousel-item'> */}
          <img
            src={PUBLIC_URL + 'images/' + item.image}
            className='w-100 h-100'
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              objectFit: 'cover',
            }}
            alt={item.title}
          />
          {/* </div> */}
          <Carousel.Caption
            className='text-white bg-dark'
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              // top: '250px',
            }}
          >
            <div className=''>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      );
    }
  });

  return (
    <div
      style={
        {
          // marginTop: '-100px',
        }
      }
    >
      <Card className='announcement-card p-4 rounded mx-auto'>
        <H1 className='title-announcement d-block w-100'>Announcement</H1>

        <Carousel
          fade
          variant='dark'
          slide={false}
          className='d-flex align-items-center announcement-carousel'
        >
          {hasAnnouncements ? (
            announcements
          ) : (
            <Carousel.Item>
              <div className='d-flex carousel-no-announcement justify-content-center'>
                <Container>No Announcement for now...</Container>
              </div>
            </Carousel.Item>
          )}
        </Carousel>
        <div id='products'></div>
      </Card>
    </div>
  );
}
