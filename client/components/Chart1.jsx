import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const rand = () => Math.floor(Math.random() * 255);

const genData = () => ({
  labels: ['January\'21', 'February\'21', 'March\'21', 'April\'21', 'May\'21', 'June\'21', 'July\'21'],
  datasets: [
    {
      type: 'line',
      label: 'Your Balance',
      backgroundColor: `rgb(44, 24, 10)`,
      borderColor: `rgb(44, 24, 10)`,
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Assets',
      backgroundColor: `rgb(25, 135, 84)`,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Liabilites',
      backgroundColor: `rgb(228, 96, 109)`,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const data = genData();

const Chart1 = () => {
  const [clickedDataset, setClickedDataset] = useState('');
  const [clickedElement, setClickedElement] = useState('');
  const [clickedElements, setClickedElements] = useState('');

  const getDatasetAtEvent = dataset => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    setClickedDataset(data.datasets[datasetIndex].label);
  };

  const getElementAtEvent = element => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    setClickedElement(
      `${data.labels[index]}: $${data.datasets[datasetIndex].data[index]}`
    );
  };

  const getElementsAtEvent = elements => {
    if (!elements.length) return;

    setClickedElements(elements.length);
  };

  return (
    <>
      <div className='header'>
        {/* <h3 className='title' align='center'>Chart</h3> */}
        <div className='links'  align='center'>
          <a
            className='btn btn-gh'
            href='https://github.com/VELOCIRABBIT-WOOO'
            target="_BLANK"
          >
            Visualize your Finances. Live!
          </a>
        </div>
      </div>
      <Bar
        data={data}
        options={options}
        getDatasetAtEvent={getDatasetAtEvent}
        getElementAtEvent={getElementAtEvent}
        getElementsAtEvent={getElementsAtEvent}
      />
      <div className='text-center'>
        <p>{clickedElement}</p>
        <p>{clickedDataset}</p>
        <p>{clickedElements.data}</p>
      </div>
    </>
  );
};

export default Chart1;
