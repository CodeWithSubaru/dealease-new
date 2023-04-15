import useMessageContext from '../../Hooks/Context/MessageContext';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Button, Row, Col, Container, Badge, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../Components/Footer/footer';
import '../../assets/scss/inbox.scss';

export const InboxAdmin = () => {
  const { user } = useAuthContext();
  const { softDel } = useMessageContext();
  const { inboxes, clickedUser } = useMessageContext();

  function dateFormat(date) {
    let yourDate = new Date(date);
    yourDate = yourDate.toUTCString();
    return yourDate.split(' ').slice(0, 5).join(' ');
  }

  return (
    <>
      <div className='inbox-container'>
        <div className='inbox-header'>
          <Container>
            <Row>
              <Col>
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  className='arrow-icon'
                />
              </Col>
              <Col className='header-text'>Your inbox</Col>
              <Col>
                <Form>
                  <Form.Control
                    type='search'
                    placeholder='Search...'
                    className='search-post-inbox'
                    aria-label='Search'
                  />
                </Form>
              </Col>
            </Row>
          </Container>
        </div>

        {inboxes.length > 0 ? (
          inboxes.map((inbox) =>
            inbox.user_id !== user.user_id ? (
              <Container className='inbox-content' key={inbox.id}>
                <Row>
                  <Col>
                    <div className='text-inbox-content'>
                      <div className='fw-bold'>
                        {inbox.user_id === user.user_id
                          ? inbox.recipient.first_name
                          : inbox.sender.first_name}{' '}
                      </div>
                      {inbox.last_message.chat}
                    </div>
                  </Col>
                  <Col>
                    <div className='btn-inbox-content'>
                      <Button className='btn-content' size='sm'>
                        Profile
                      </Button>
                      <Button
                        className='btn-content'
                        key={inbox.inbox_id}
                        onClick={() =>
                          clickedUser(
                            inbox.recipient_id === user.user_id
                              ? inbox.user_id
                              : inbox.recipient_id,
                            'admin'
                          )
                        }
                        size='sm'
                      >
                        Message
                      </Button>
                      <Button
                        className='btn-content'
                        size='sm'
                        onClick={() => softDel(inbox.inbox_id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            ) : (
              ''
            )
          )
        ) : (
          <Badge className='none-result' pill>
            No Message Yet
          </Badge>
        )}
      </div>
      <Footer />
    </>
  );
};
