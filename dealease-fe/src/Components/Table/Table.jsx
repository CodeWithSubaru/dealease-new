import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap';
import '../../assets/scss/table.scss';

export const TableComponent = ({ header, body, button }) => {
  return (
    <DatatableWrapper
      headers={header}
      body={body}
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20],
        },
      }}
    >
      <Row className='mb-4'>
        <Col
          xs={12}
          sm={12}
          lg={4}
          className='d-flex flex-col justify-content-end align-items-end mb-2'
        >
          <Filter placeholder='Search...'></Filter>
        </Col>
        <Col
          xs={12}
          sm={12}
          lg={8}
          className='d-flex flex-col justify-content-end align-items-end mb-2'
        >
          {button}
        </Col>
      </Row>
      <Table responsive style={{ color: '#000' }}>
        <TableHeader />
        <TableBody />
      </Table>

      <Row className='mb-4'>
        <Col
          xs={12}
          sm={12}
          lg={2}
          className='d-flex flex-col justify-content-start align-items-end justify-content-sm-center mb-4'
        >
          <PaginationOptions labels={'text-dark'} />
        </Col>
        <Col
          xs={12}
          sm={12}
          lg={10}
          className='d-flex flex-col justify-content-end align-items-center justify-content-xs-center'
        >
          <Pagination />
        </Col>
      </Row>
    </DatatableWrapper>
  );
};
