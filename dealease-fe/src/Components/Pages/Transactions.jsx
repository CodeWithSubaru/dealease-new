import { useState, useEffect } from 'react';
import { TableComponent } from '../Table/Table';
import { Footer } from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import { Nav, Tab, Row, Col, Button } from 'react-bootstrap';
import { Load } from '../../Components/Loader/Load';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

export function Transactions(props) {
  const { fetchUserInfo } = useAuthContext();
  const [buttonSet, setButtonSet] = useState(0);

  function fetchPaymentStatus(buttonSet) {
    if (buttonSet === 0) {
      props.changePaymentStatus(1);
    }

    if (buttonSet === 1) {
      props.changePaymentStatus(2);
    }

    if (buttonSet === 2) {
      props.changePaymentStatus(0);
    }
  }

  return (
    <>
      <div className='p-5' style={{ minHeight: '85vh' }}>
        <Card className='p-5 h-100 my-2 mb-5'>
          <div className='d-flex justify-content-end mb-3'>
            <Button
              onClick={() => {
                fetchUserInfo();
                props.fetchUnderReviewTransaction();
                props.fetchApprovedTransaction();
                props.fetchCancelledTransaction();
                fetchPaymentStatus(buttonSet);
              }}
              className='rounded btn btn-success btn-sm'
            >
              <FontAwesomeIcon icon={faRefresh} />
            </Button>
          </div>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Nav justify variant='tabs' defaultActiveKey='/home'>
              <Nav.Item className='mb-0'>
                <Nav.Link
                  eventKey='first'
                  onClick={() => {
                    props.changePaymentStatus(1);
                    props.fetchUnderReviewTransaction();
                    props.fetchApprovedTransaction();
                    props.fetchCancelledTransaction();
                    setButtonSet(0);
                  }}
                  disabled={props.loading}
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
                  onClick={() => {
                    props.changePaymentStatus(2);
                    props.fetchUnderReviewTransaction();
                    props.fetchApprovedTransaction();
                    props.fetchCancelledTransaction();
                    setButtonSet(1);
                  }}
                  disabled={props.loading}
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
              <Nav.Item>
                <Nav.Link
                  eventKey='third'
                  onClick={() => {
                    props.changePaymentStatus(0);
                    props.fetchUnderReviewTransaction();
                    props.fetchApprovedTransaction();
                    props.fetchCancelledTransaction();
                    setButtonSet(2);
                  }}
                  disabled={props.loading}
                >
                  Request Cancelled
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '0px' }}
                  >
                    {props.numberOfCancelledTransaction}
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
              <Tab.Pane eventKey='third'>
                <Card className='p-5 pb-1 rounded'>
                  {props.loading ? (
                    <Load />
                  ) : (
                    <>
                      <h1 className='mb-4 fw-bold'> Request Cancelled</h1>
                      <TableComponent header={props.header} body={props.body} />
                    </>
                  )}
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card>
      </div>
    </>
  );
}
