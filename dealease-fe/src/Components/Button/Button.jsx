import { Link } from 'react-router-dom';

export function Button({ className, navigateTo, btnTitle, link }) {
  return link ? (
    <Link to={navigateTo} className={className}>
      {btnTitle}
    </Link>
  ) : (
    <button className={className}>{btnTitle}</button>
  );
}
