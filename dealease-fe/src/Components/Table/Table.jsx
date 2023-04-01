import "bootstrap/dist/css/bootstrap.min.css";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Col, Row, Table } from "react-bootstrap";

export const TableComponent = ({ header, body }) => {
  return (
    <DatatableWrapper headers={header} body={body}>
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        ></Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        ></Col>
      </Row>
      <Table style={{ color: "white" }}>
        <TableHeader />
        <TableBody />
      </Table>
      <Pagination />
    </DatatableWrapper>
  );
};
