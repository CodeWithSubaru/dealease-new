import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export function Edit(props) {
  // Show Edit Product Modal
  const [showEditProduct, setShowEditProduct] = useState(false);
  const ShowEditProductModal = (id) => {
    axiosClient
      .get('/seller/product/' + id, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res) {
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
          setImage(res.data.data.image);
          setStocks(res.data.data.stocks_per_kg);
          setPrice(res.data.data.price_per_kg);
          setProductId(id);
          setShowEditProduct(true);
        }
      });
  };

  const closeEditProductModal = () => {
    setShowEditProduct(false);
    setErrors([]);
  };

  // Submit Edit Form
  const handlePostEdit = (e) => {
    e.preventDefault();
    console.log(data);
    axiosClient
      .post('/seller/product/' + product_id, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.status == 200) {
          Notification({
            title: 'Success',
            message: res.data.message,
            icon: 'success',
          });
          setProductDataTable();
          closeEditProductModal();
        }
      })
      .catch((e) => {
        console.log(e);
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant='primary'>Save Changes</Button>
          <Button variant='secondary' onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
