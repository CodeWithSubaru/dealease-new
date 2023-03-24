import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axiosClient from '../../api/axios';

export function Dashboard() {
  const [countOfUsers, setCountOfUsers] = useState([]);
  const [countOfMessages, setCountOfMessages] = useState([]);

  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Numbers',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function countByCategory(response, label) {
    const countsByMonth = Array.from({ length: label.length }, () => 0);
    if (!(response.length > 0)) {
      return;
    }

    response.map(({ month, count }) => {
      labels.map((label, index) => {
        if (month === index + 1) {
          countsByMonth[index] += count;
        }
      });
    });
    return countsByMonth;
  }

  function calculateTotal(response) {
    let totalNumber = 0;
    Object.values(response).map((item) => {
      totalNumber += Number(item.count);
    });
    return totalNumber;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: countByCategory(countOfUsers, labels),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Messages',
        data: countByCategory(countOfMessages, labels),
        backgroundColor: 'green',
      },
      {
        label: 'Total Reported Users',
        data: [0],
        backgroundColor: 'blue',
      },
    ],
  };

  const dataChart = {
    labels,
    datasets: [
      {
        label: '# of Users',
        data: countOfUsers.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    axiosClient
      .get('/admin/get-number-of-user')
      .then((response) => setCountOfUsers(response.data));

    axiosClient
      .get('/admin/get-number-of-message')
      .then((response) => setCountOfMessages(response.data));
  }, [countOfUsers.count, countOfMessages.count]);

  return (
    <div className='dashboard'>
      <div className='cards-details-wrapper'>
        <CardDetails
          title='Total Users'
          totalNumber={calculateTotal(countOfUsers)}
        />
        <CardDetails
          title='Total Messages'
          totalNumber={calculateTotal(countOfMessages)}
        />
        <CardDetails title='Total Reported Users' totalNumber={2} />
      </div>

      <div className='graph-container' style={{ background: 'white' }}>
        <Bar options={options} data={data} />

        <Doughnut data={dataChart} />
      </div>
    </div>
  );
}

function CardDetails(props) {
  return (
    <div className='card-details'>
      <h2>{props.title}</h2>
      <p>{props.totalNumber}</p>
    </div>
  );
}
