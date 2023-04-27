import { useState, useEffect } from 'react';
import { TableComponent } from '../Table/Table';
import { Footer } from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import axiosClient from '../../api/axios';

export function Transactions(props) {
  return (
    <>
      <div className='mx-auto w-75' style={{ minHeight: '85vh' }}>
        <Card className='p-5 h-100 mb-5'>
          <div className='p-5 pb-1 primary-bg rounded'>
            <TableComponent header={props.header} body={props.body} />;
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}
