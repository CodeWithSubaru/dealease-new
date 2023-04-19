import Carousel from 'react-bootstrap/Carousel';
import PUBLIC_URL from '../api/public_url';
import { H1 } from '../Components/Helpers/index.style';
import { useState, useEffect } from 'react';
import axiosClient from '../api/axios';
import { Card } from 'react-bootstrap';
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
    if (!item.deleted_at && item.is_published) {
      hasAnnouncements = true;
      return (
        <Carousel.Item key={item.id} className='d-flex justify-content-center '>
          <Card
            style={{
              height: '400px',
              width: '400px',
            }}
          >
            <div
              className='w-100'
              style={{
                height: '250px',
                overflow: 'hidden',
              }}
            >
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
            </div>
            <Carousel.Caption
              className='text-light bg-dark w-100'
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                top: '250px',
              }}
            >
              <div className=''>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Carousel.Caption>
          </Card>
        </Carousel.Item>
      );
    }
  });

  return (
    <div className='p-5 primary-bg' id='announcement'>
      <Card className='p-5 rounded w-75 mx-auto'>
        <div className='w-50 mx-auto mb-5'>
          <H1 className='d-block w-100'>Announcement</H1>
        </div>
        <Carousel
          style={{ height: '50vh' }}
          variant='dark'
          slide={false}
          className='d-flex align-items-center'
        >
          {hasAnnouncements ? (
            announcements
          ) : (
            <Carousel.Item>
              <div className='d-flex justify-content-center fs-1 mt-5 h-100'>
                No Announcement for now...
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </Card>
    </div>
  );
}
