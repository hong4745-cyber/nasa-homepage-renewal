import { useState, useEffect } from 'react'
import axios from 'axios'

const NASA_API_KEY = 'DEMO_KEY'
const BASE_URL = 'https://api.nasa.gov'

export function useAPOD() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`)
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export function useAsteroids() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    axios.get(`${BASE_URL}/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`)
      .then(res => {
        const nearEarthObjects = res.data.near_earth_objects[today] || []
        setData({
          count: res.data.element_count,
          objects: nearEarthObjects.slice(0, 5)
        })
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export function useISS() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await axios.get('https://api.wheretheiss.at/v1/satellites/25544')
        setData({
          latitude: res.data.latitude?.toFixed(4),
          longitude: res.data.longitude?.toFixed(4),
          altitude: res.data.altitude?.toFixed(2),
          velocity: res.data.velocity?.toFixed(2),
        })
      } catch {
        setData({
          latitude: '51.5074',
          longitude: '-0.1278',
          altitude: '408.50',
          velocity: '27600.00',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchISS()
    const interval = setInterval(fetchISS, 5000)
    return () => clearInterval(interval)
  }, [])

  return { data, loading }
}

export function useMarsPhotos() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BASE_URL}/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${NASA_API_KEY}`)
      .then(res => setData(res.data.latest_photos?.slice(0, 6)))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}
