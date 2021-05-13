import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const rand = () => Math.floor(Math.random() * 255);

// const months = Array.from({length: 6}, (e, i) => {
//   return new Date().toLocaleDateString("en", {month: "short", year: "2-digit"});
// })
const current = new Date();
const currMonth = new Date().toLocaleDateString("en", {month: "short" , year: "2-digit"})
const months = [currMonth];

for (let i = 5; i > 0; i --){
  current.setMonth(current.getMonth()-1);
  const previousMonth = current.toLocaleString('default', {month: "short" , year: "2-digit"});
  months.push(previousMonth)
}

const genData = () => ({
  
  labels: months.reverse(),
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
