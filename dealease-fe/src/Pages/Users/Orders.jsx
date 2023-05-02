import { OrdersTable } from '../../Components/Pages/Orders';

export function OrdersUser(props) {
  return (
    <div>
      <OrdersTable header={props.header} body={props.body} />
    </div>
  );
}
