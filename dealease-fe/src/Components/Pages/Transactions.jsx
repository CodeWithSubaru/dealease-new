import { useState, useEffect } from 'react';
import { TableComponent } from '../Table/Table';
import { Footer } from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import axiosClient from '../../api/axios';

export function Transactions(props) {
  return (
    <>
      <div className='mx-auto w-75' style={{ minHeight: '85vh' }}>
        <Card className='p-5 h-100 mb-5'>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Nav justify variant='tabs' defaultActiveKey='/home'>
              <Nav.Item className='mb-0'>
                <Nav.Link
                  eventKey='first'
                  onClick={() => props.changePaymentStatus(1)}
                >
                  Under Review
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() => props.changePaymentStatus(2)}
                >
                  Request Approved
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <Card className='p-5 pb-1 rounded'>
                  <TableComponent header={props.header} body={props.body} />;
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Card className='p-5 pb-1 rounded'>
                  <TableComponent header={props.header} body={props.body} />;
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card>
      </div>
      <Footer />
    </>
  );
}
