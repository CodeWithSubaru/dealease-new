import { useState, useEffect } from 'react';
import { TableComponent } from '../Table/Table';
import { Footer } from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import { Load } from '../../Components/Loader/Load';

export function Transactions(props) {
  return (
    <>
      <div className='mx-auto w-75' style={{ minHeight: '85vh' }}>
        <Card className='p-5 h-100 my-5 mb-5'>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Nav justify variant='tabs' defaultActiveKey='/home'>
              <Nav.Item className='mb-0'>
                <Nav.Link
                  eventKey='first'
                  onClick={() => props.changePaymentStatus(1)}
                >
                  Under Review
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '0px' }}
                  >
                    {props.numberOfUnderReviewTransaction}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() => props.changePaymentStatus(2)}
                >
                  Request Approved
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '0px' }}
                  >
                    {props.numberOfApprovedTransaction}
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <Card className='p-5 pb-1 rounded'>
                  {props.loading ? (
                    <Load />
                  ) : (
                    <>
                      <h1 className='mb-4 fw-bold'> Under Review</h1>
                      <TableComponent header={props.header} body={props.body} />
                    </>
                  )}
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Card className='p-5 pb-1 rounded'>
                  {props.loading ? (
                    <Load />
                  ) : (
                    <>
                      <h1 className='mb-4 fw-bold'> Request Approved</h1>
                      <TableComponent header={props.header} body={props.body} />
                    </>
                  )}
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
