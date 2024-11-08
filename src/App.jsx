import './App.css';
import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { v4 as uuidv4 } from 'uuid';
import { styled } from 'styled-components'

function App() {
  const [formData, setFormData] = useState('');
  const [data, setData] = useState(null);
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:5000/get-country/${formData}`, {
        mode: 'cors' // Assuming your backend supports CORS
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <StyledForm onSubmit={handleSubmit}>
        <h1>Country Finder</h1>
        <a href={`http://127.0.0.1:5000/get-country/${formData}`}>Download</a>
        <div>
          <StyledInput placeholder="Type name of country" onChange={(e) => setFormData(e.target.value)} type="search" />
          <StyledButton type="submit">Search</StyledButton>
        </div>
      </StyledForm>
      <MapContainer center={[31, -7]} zoom={2} style={{ height: '90vh' }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />
        {data && <GeoJSON key={uuidv4()} data={data} />}
      </MapContainer>
    </div>
  );
}

const StyledButton = styled.button`
  all: unset;
  background: #08f;
  padding: 8px 16px;
  border-radius: 0px 8px 8px 0px;
  font-size: 700;
  text-transform: uppercase;
  margin-top: 12px;
`

const StyledInput = styled.input`
  all: unset;
  padding: 6px 8px;
  border-radius: 8px 0px 0px 8px;
  border: #08f solid 2px;
  margin-left: 96px;
`

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #eff;
`

export default App;
