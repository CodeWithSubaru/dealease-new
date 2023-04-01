import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function Notification(props) {
  const MySwal = withReactContent(Swal);

  return MySwal.fire({
    title: <strong>{props.title}!</strong>,
    html: <span>{props.message}!</span>,
    icon: props.icon,
    confirmButtonText: 'Ok',
    timer: props.timer ? props.timer : 3000,
  });
}
