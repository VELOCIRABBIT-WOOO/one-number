import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: [ 'Checking', 'Saving', 'CD', 'Money Market', 'IRA', '401k' ],
  datasets: [
    {
      label: 'Account',
      data: [110, 210, 1000, 3200, 320, 12631 ], //'$110.00', '$210.00', '$1,000.00', '$43,200.00', '$320.76', '$23,631.98'
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
      ],
      borderWidth: 2,
      hoverOffset: 4
    },
  ],
};

const Chart2 = () => (
  <>
    <div className='header'>
      
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/VELOCIRABBIT-WOOO'
          target="_BLANK"
        >
          <h6 className='title'>Total Assets: $68,473</h6>
        </a>
      </div>
    </div>
    <Doughnut data={data} />
  </>
);

export default Chart2;