import { List, FlexboxGrid, Container } from 'rsuite';

import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { Load } from '../Loader/Load';
import { Modal, Button } from 'react-bootstrap';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function CustomListTransaction(props) {
  // const renderRaise = (number) => {
  //   const isPositive = number > 0;
  //   const isNegative = number < 0;
  //   return (
  //     <span style={{ paddingLeft: 15, color: isNegative ? "red" : "green" }}>
  //       <span>{isPositive ? "+" : null}</span>
  //       <span>{number}</span>
  //     </span>
  //   );
  // };
  const { user } = useAuthContext();

  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
  };

  const slimText = {
    fontSize: '0.666em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5,
  };

  const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 500,
  };

  const dataStyle = {
    fontSize: '1.2em',
    fontWeight: 500,
  };

  return (
    <>
      <Container className='bg-white shadow border-top border-bottom border-start border-end border-1 border-black-subtle overflow-hidden rounded'>
        {props.loading ? (
          <div className='py-5'>
            <Load />
          </div>
        ) : (
          <List hover>
            <FlexboxGrid className='rounded '>
              <h6 className='p-4'> {props.pageTitle}</h6>
            </FlexboxGrid>

            {props.data.length > 0 ? (
              props.data.map((item, index) => (
                <List.Item
                  key={item.id}
                  index={index + 1}
                  className='p-3 border-bottom border-start border-end border-1 border-black-subtle'
                >
                  <FlexboxGrid>
                    {/*base info*/}

                    <FlexboxGrid.Item
                      colspan={8}
                      style={{
                        ...styleCenter,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        flexGrow: 1,
                      }}
                    >
                      <div style={titleStyle} className='mb-1 pb-0'>
                        # {item.payment_number}
                      </div>
                      <div style={slimText}>
                        <div className='d-flex align-items-center'>
                          <UserCircleIcon className='me-1' />{' '}
                          <span style={{ fontSize: '12px' }}>
                            {item.fullname}
                          </span>
                        </div>
                        <div>{item.created_at}</div>
                      </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                      colspan={8}
                      className='d-flex align-items-center'
                    >
                      <div className='d-flex align-items-center pt-3'>
                        {item.payment_status}
                      </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={styleCenter} className='mb-2'>
                      <div style={{ textAlign: 'right' }}>
                        <div style={slimText}>Shells</div>
                        <div style={dataStyle}>{item.payment_total_amount}</div>
                      </div>
                    </FlexboxGrid.Item>

                    <FlexboxGrid.Item className='pt-3 d-flex justify-content-end flex-grow-1 border-top border-1 border-black-subtle'>
                      <div className=''>
                        <div>{item.action}</div>
                      </div>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </List.Item>
              ))
            ) : (
              <List.Item className='p-3 border-bottom border-start border-end border-1 border-black-subtle'>
                <FlexboxGrid className='justify-content-center'>
                  <FlexboxGrid.Item>
                    <div
                      className='p-2'
                      style={{ textAlign: 'center', flexGrow: 1 }}
                    >
                      <div>No Data</div>
                      <div></div>
                    </div>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </List.Item>
            )}
          </List>
        )}
      </Container>
    </>
  );
}
