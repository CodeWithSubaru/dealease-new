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
        <Carousel.Item key={item.id} className='d-flex justify-content-center'>
          <Card
            className='d-flex justify-content-between align-items-center flex-column' //border border-1 border-primary
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
                style={{
                  backgroundSize: 'cover',
                  backgroundClip: 'center',
                  backgroundPosition: 'center',
                }}
                alt={item.title}
              />
            </div>
            <Carousel.Caption
              className='w-50 mx-auto px-0'
              style={{ position: 'absolute', bottom: '0' }}
            >
              <div className='text-light'>
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
      <Card className='p-5 rounded'>
        <div className='w-50 mx-auto mb-5'>
          <h1 className='title d-block w-100'>Announcement</h1>
        </div>
        <Carousel style={{ height: '50vh' }} variant='dark' slide={false}>
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
