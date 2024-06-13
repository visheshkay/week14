import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Line, Bar, Pie, PolarArea } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

function City() {
    const [city, setCity] = useState('');
    const [data, setData] = useState({});
    const loc = useLocation();
    const apiKey = "88fb5329bf11e277242f84a183872b70";

    useEffect(() => {
        const cityName = loc.pathname.slice(6);
        setCity(cityName);

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const getInfo = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const dat = await response.json();
                setData(dat);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        getInfo();
    }, [loc.pathname, apiKey]);

    const temperatureData = {
        labels: ['Current', 'Feels Like', 'Min', 'Max'],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: data.main ? [data.main.temp, data.main.feels_like, data.main.temp_min, data.main.temp_max] : [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const humidityPressureData = {
        labels: ['Humidity (%)', 'Pressure (hPa)'],
        datasets: [
            {
                label: 'Humidity and Pressure',
                data: data.main ? [data.main.humidity, data.main.pressure] : [],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const cloudinessData = {
        labels: ['Cloudiness (%)', 'Clear Sky (%)'],
        datasets: [
            {
                data: data.clouds ? [data.clouds.all, 100 - data.clouds.all] : [],
                backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 205, 86, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 205, 86, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const windData = {
        labels: ['Wind Speed (m/s)'],
        datasets: [
            {
                label: 'Wind Speed',
                data: data.wind ? [data.wind.speed] : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    const chartStyle = {
        height: '300px',
        width: '100%',
    };

    return (
        <div>
            <h1>{city}</h1>
            {data.main ? (
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h2>Temperature</h2>
                        <div style={chartStyle}>
                            <Line data={temperatureData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h2>Humidity and Pressure</h2>
                        <div style={chartStyle}>
                            <Bar data={humidityPressureData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h2>Cloudiness</h2>
                        <div style={chartStyle}>
                            <Pie data={cloudinessData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h2>Wind Speed</h2>
                        <div style={chartStyle}>
                            <PolarArea data={windData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-danger fs-5 text-bold mt-5">NO DATA FOUND</p>
            )}
        </div>
    );
}

export default City;
