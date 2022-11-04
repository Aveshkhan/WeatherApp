import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const ListKeys = () => {
  let ICON;
  let AM_PM;
  // let time;
  let URL = "https://weatherapi-com.p.rapidapi.com/current.json"
  let ipURL = "https://api.ipgeolocation.io/ipgeo?apiKey=72fd666d64b84036acc3280006b501bb"

  const [locationName, setLocationName] = useState("")
  const [region, setRegion] = useState("")
  const [temp, setTemp] = useState("")
  const [feelsLikeTemp, setFeelsLikeTemp] = useState("")
  const [wind, setWind] = useState("")
  const [humidity, setHumidity] = useState("")
  const [uvRay, setUvRay] = useState("")
  const [isDay, setIsDay] = useState(Boolean)
  const [locationTime, setLocationTime] = useState("")

  const getCurrentWeather = async (city) => {
    let config = {
      headers: {
        'X-RapidAPI-Key': '111fe0a9famsh5e1f1ccf7cd2630p14fa27jsn2455bd145019',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      },
      params: {
        q: city
      }
    }

    axios.get(URL, config).then((response) => {
      setLocationName(response.data.location.name)
      setRegion(response.data.location.region)
      setTemp(response.data.current.temp_c)
      setFeelsLikeTemp(response.data.current.feelslike_c)
      setWind(response.data.current.wind_kph)
      setHumidity(response.data.current.humidity)
      setUvRay(response.data.current.uv)
      setIsDay(response.data.current.is_day)
      setLocationTime(response.data.location.localtime)


    })
  }

  let time = new Date(locationTime).getHours()
  if (time >= 12) {
    AM_PM = <span>PM</span>
  } else {
    AM_PM = <span>AM</span>
  }

  const getCurrentLocationByIp = async () => {
    axios.get(ipURL).then((response) => {
      if (response) {
        let city = response.data.city
        console.log(city);
        getCurrentWeather(city);

      }
    })
  }

  useEffect(() => {
    getCurrentLocationByIp();
  }, [])

  if (isDay === 1) {
    ICON = <box-icon type="solid" color="#fac915e3" size="cssSize" className="sun fill-stroke text-yellow-400 text-4xl w-full h-full" name="sun"></box-icon>;
  } else {
    ICON = <box-icon type='solid' name='moon' color="#fac915e3" size="cssSize" className="moon fill-stroke text-yellow-400 text-4xl w-full h-full"></box-icon>;
  }

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: function (values) {
      console.log(`Search Value ${values.search}`)
      getCurrentWeather(values.search)
    },
    validationSchema: Yup.object({
      search: Yup.string().required()
    })
  })


  return (
    <div>
      <div className={`antialiased ${isDay === 1 ? "bg-gray-100" : "bg-gray-800"}`}>
        <div className="container mx-auto h-screen w-screen">
          <div className="flex items-center justify-center flex-col h-full">
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <form className=" mb-4" onSubmit={formik.handleSubmit}>
                  <div className='input-group relative flex items-stretch w-full'>
                    <input type="search" name="search" id="search" className={`form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none ${formik.touched.search && formik.errors.search ? 'border-red-200' : 'border-gray-300'}`} placeholder="Search city" aria-label="Search" aria-describedby="button-addon2" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.search} />
                    <button type="submit" className="btn inline-block px-6 py-2.5 bg-gray-900	 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-gray-700	 hover:shadow-lg focus:bg-gray-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-lg transition duration-150 ease-in-out flex items-center" id="button-addon2">
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                      </svg>
                    </button>
                  </div>
                  <div>
                    {/* {formik.touched.search && formik.errors.search && (
                    <span className='text-red-400 text-xs'>{formik.errors.search}</span>
                  )} */}
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
              <div className="flex flex-col">
                <div>
                  <h2 className="font-bold text-gray-600 text-center">{locationName} / {region}</h2>
                </div>
                <div className="my-6">
                  <div className="flex flex-row space-x-4 justify-center items-center">
                    <div id="icon">
                        {ICON}
                    </div>
                    <div id="temp">
                      <h4 className="text-4xl">{temp}&deg;C</h4>
                      <p className="text-xs text-gray-500">Feels like {feelsLikeTemp}&deg;C</p>
                      <p className="text-xs text-gray-500">{locationTime} {AM_PM}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                  <div className="flex justify-center">
                    <ul className="bg-white rounded-lg w-56 text-gray-900 flex">
                      <li className="px-2 py-2  border-gray-200 w-full rounded-t-lg flex flex-col items-center">
                        <div className='flex items-center'>
                          <box-icon name="wind"></box-icon>
                          <span className='ml-1'>{wind}</span>
                        </div>
                        <p className='text-xs	'>wind km/h</p>
                      </li>
                      <li className="px-2 py-2  border-gray-200 w-full flex flex-col items-center">
                        <div className='flex items-center'>
                          <box-icon name="droplet"></box-icon>
                          <span className='ml-1'>{humidity}</span>
                        </div>
                        <p className='text-xs	'>humidity</p>
                      </li>
                      <li className="px-2 py-2 w-full rounded-b-lg flex flex-col items-center">
                        <div className='flex items-center'>
                          <box-icon name="sun"></box-icon>
                          <span className='ml-1'>{uvRay}</span>
                        </div>
                        <p className='text-xs	'>UV ray</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}