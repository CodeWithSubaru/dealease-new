import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faHome,
  faShop,
  faInbox,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  {
    title: 'Home',
    path: '/seller/home',
    icon: <FontAwesomeIcon icon={faHome} className='me-3 ms-4' />,
    cName: 'nav-text',
  },
  {
    title: 'Products',
    path: '/seller/product',
    icon: <FontAwesomeIcon icon={faShop} className='me-3 ms-4' />,
    cName: 'nav-text',
  },
  {
    title: 'Inbox',
    path: '/seller/inbox',
    icon: <FontAwesomeIcon icon={faInbox} className='me-3 ms-4' />,
    cName: 'nav-text',
  },
  {
    title: 'Donasyon',
    path: '/seller/donation',
    icon: <FontAwesomeIcon icon={faHeart} className='me-3 ms-4' />,
    cName: 'nav-text',
  },
];
