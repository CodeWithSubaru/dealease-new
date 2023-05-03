import { OrdersTable } from '../../Components/Pages/Orders';

export function OrdersBuyer(props) {
  return (
    <div>
      <OrdersTable header={props.header} body={props.body} />
    </div>
  );
}

export function OrdersSeller(props) {
  return (
    <div>
      <OrdersTable header={props.header} body={props.body} />
    </div>
  );
}
