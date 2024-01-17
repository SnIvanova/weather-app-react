import { useEffect, useState } from "react"
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap"
import { useLocation } from "react-router-dom"

import {WiCloud, WiDayHaze, WiDaySunny, WiFog, WiRain, WiSnow, WiSunrise, WiSunset, WiThermometer, WiThunderstorm } from "weather-icons-react"

import WeatherDetail  from "../components/WeatherDetail"

import rain from "../assets/bg-img/rain.jpeg"
import fog from "../assets/bg-img/fog.jpeg"
import clear from "../assets/bg-img/clear.jpeg"
import cloud from "../assets/bg-img/cloud.jpeg"
import thunderstorm from "../assets/bg-img/thunderstorm.jpeg"
import snow from "../assets/bg-img/snow.jpeg"
import "../assets/css/cardWeather.css"
import ForecastWeather from "./ForecastWeather"
import { Water, Wind } from "react-bootstrap-icons"

const CardWeather = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const location = useLocation()
  // console.log(location.search)
  const [weather, setWeather] = useState({
    city: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    description: "",
    condition: "",
    sunrise: "",
    sunset: "",
    data: "",
    humidity: "",
    wind: "",
  })
  console.log(weather)

  const url = `https://api.openweathermap.org/data/2.5/weather/${location.search}&appid=1222bad9d1d8ef63b964aa245050cd2a&units=metric`
  // qui faccio la fetch per trovare un unico risultato
  console.log("inside the const url"+ location.search )
  const getWeather = async () => {
    try {
      const res = await fetch(url)
      if (res.ok) {
        const dataWeather = await res.json()
        console.log(dataWeather)
        setIsLoading(false)
        setWeather({
          city: dataWeather.name,
          temperature: Math.trunc(dataWeather.main.temp),
          maxTemperature: Math.trunc(dataWeather.main.temp_max),
          minTemperature: Math.trunc(dataWeather.main.temp_min),
          description: dataWeather.weather[0].description,
          condition: dataWeather.weather[0].main,
          sunrise: dataWeather.sys.sunrise,
          sunset: dataWeather.sys.sunset,
          data: dataWeather.dt,
          humidity: dataWeather.main.humidity,
          wind: dataWeather.wind.speed * 3.6,
        }) 
        
      } else {
        throw new Error("Il clima è tempestoso, non ho trovato nulla!")
      }
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
      console.log("errore", error)
    } 
  }

  useEffect(() => {
    getWeather()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // qui formtto data e ore

  const data = new Date(weather.data * 1000)
  const day = data.getDate()
  const month = data.getMonth() + 1
  const year = data.getFullYear()

  const oclock = new Date(weather.sunset * 1000)
  const hour = oclock.getHours()
  const min = oclock.getMinutes()

  const oclock2 = new Date(weather.sunrise * 1000)
  const hour1 = oclock2.getHours()
  const min1 = oclock2.getMinutes()

  return (
    <>
      {/* container card singola */}
      {isLoading && (
        <div className="text-center mb-2">
          <Spinner animation="border" variant="info" />
        </div>
      )}
      {isError && (
        <Alert variant="danger" className="text-center">
          Errore nel recupero dei dati meteo😥
        </Alert>
      )}
      <Container fluid className="mt-5">
          <Row className="justify-content-center">
            <Col xs={12}>
              <Card className="text-center p-3 border-white rounded-2" style={{ zIndex: "100" }}>
                <img
                  src={
                    weather.condition.toLowerCase().includes("snow") ? snow :
                    weather.condition.toLowerCase().includes("fog") ? fog :
                    weather.condition.toLowerCase().includes("rain") ? rain :
                    weather.condition.toLowerCase().includes("thunderstorm") ? thunderstorm :
                    weather.condition.toLowerCase().includes("clear") ? clear :
                    weather.condition.toLowerCase().includes("cloud") ? cloud :
                    weather.condition.toLowerCase().includes("haze") ? fog : ""
                  }
                  alt=""
                  className="bgImg rounded-5"
                  style={{ zIndex: "-100" }}
                />
                <div className="text-center">
                  <h3 className="fw-bold text-white">{weather.city}</h3>
                  <p className="text-muted">{`${day} | ${month} | ${year}`}</p>
                  <h1 className="fw-bold text-white display-4">{weather.temperature}°</h1>
                </div>
                <div className="text-center">
                  {(() => {
                    switch (weather.condition.toLowerCase()) {
                      case "snow": return <WiSnow className="text-info" style={{ fontSize: "100px" }} />;
                      case "fog": return <WiFog className="text-secondary" style={{ fontSize: "100px" }} />;
                      case "rain": return <WiRain className="text-primary" style={{ fontSize: "100px" }} />;
                      case "clear": return <WiDaySunny style={{ fontSize: "100px", color: "rgb(255, 212, 102)" }} />;
                      case "cloud": return <WiCloud className="text-secondary" style={{ fontSize: "100px" }} />;
                      case "thunderstorm": return <WiThunderstorm className="text-black" style={{ fontSize: "100px" }} />;
                      case "haze": return <WiDayHaze className="text-secondary" style={{ fontSize: "100px" }} />;
                      default: return null;
                    }
                  })()}
                </div>
                <Card.Body className="border-bottom border-white w-75 text-center text-white fw-bold">
                  <Card.Text>{weather.condition}</Card.Text>
                </Card.Body>
                <Card.Body className="w-75 text-center text-white">
                  <Row>
                    <Col>
                      <span>
                        Max <WiThermometer className="fs-3" /> {weather.maxTemperature}°
                      </span>
                    </Col>
                    <Col>
                      <span>
                        Min <WiThermometer className="fs-3" /> {weather.minTemperature}°
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

      {/* container forcast per previsioni */}

      <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={7} className="d-flex justify-content-center">
          <ForecastWeather city={location.search} />
        </Col>

        <Col xs={12} md={4} className="d-flex justify-content-center align-items-center p-2 mt-4" style={{ border: "1px solid #fd7486", borderRadius: "20px" }}>
          <WeatherDetail icon={<Water className="fs-5 fw-bold" style={{ color: "#fd7486" }} />} label="Humidity" value={`${weather.humidity}%`} />
          <WeatherDetail icon={<Wind className="fs-3 fw-bold" style={{ color: "#fd7486" }} />} label="Wind" value={`${Math.trunc(weather.wind)} km/h`} />
          <WeatherDetail icon={<WiSunrise className="fs-3 fw-bold" style={{ color: "#fd7486" }} />} label="Sunrise" value={`${hour1}:${min1}`} />
          <WeatherDetail icon={<WiSunset className="fs-3 fw-bold" style={{ color: "#fd7486" }} />} label="Sunset" value={`${hour}:${min}`} />
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default CardWeather