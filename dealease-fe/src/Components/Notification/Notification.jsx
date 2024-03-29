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

export function Delete() {
  const MySwal = withReactContent(Swal);

  return MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      MySwal.fire('Deleted!', 'Data has been deleted.', 'success');
    }
    return result;
  });
}

export function Finalize(props) {
  const MySwal = withReactContent(Swal);

  return MySwal.fire({
    title: 'Are you sure?',
    text: props.text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: props.confirmButton,
  }).then((result) => {
    if (result.isConfirmed) {
      MySwal.fire('Success!', props.successMsg, 'success');
    }
    return result;
  });
}

export function Finalize1(props) {
  const MySwal = withReactContent(Swal);

  return MySwal.fire({
    title: 'Are you sure?',
    text: props.text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: props.confirmButton,
  }).then((result) => {
    return result;
  });
}
