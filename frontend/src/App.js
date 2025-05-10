// frontend/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function App() {
  const [file, setFile] = useState(null);
  const [heartRateData, setHeartRateData] = useState(null);
  const [averageHR, setAverageHR] = useState(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:8000/upload-ecg/', formData)
      .then(response => {
        setHeartRateData({
          x: response.data.heart_rate_ts,
          y: response.data.heart_rate
        });
        setAverageHR(response.data.average_hr.toFixed(2));
      })
      .catch(error => alert('Upload failed.'));
  };

  return (
    <div>
      <h1>ECG Analyzer</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload ECG</button>
      {averageHR && <p>Average Heart Rate: {averageHR} bpm</p>}
      {heartRateData && (
        <Plot
          data={[
            {
              x: heartRateData.x,
              y: heartRateData.y,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{ width: 720, height: 440, title: 'Heart Rate Over Time' }}
        />
      )}
    </div>
  );
}

export default App;

