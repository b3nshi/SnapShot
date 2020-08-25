import React, { createContext, useState } from "react"
import axios from "axios"
import { apiKey } from "../api/config"
export const PhotoContext = createContext()

const PhotoContextProvider = (props) => {
  const [cache, setCache] = useState({})
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const runSearch = (query, geoPosition) => {
    const keyCache = `${query}_${geoPosition.lat}_${geoPosition.lng}`
    if (cache[keyCache]) {
      setImages(cache[keyCache])
      setLoading(false)
    } else {
      axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&lat=${geoPosition.lat}&lon=${geoPosition.lng}&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&extras=geo`
        )
        .then((response) => {
          setCache({
            ...cache,
            [keyCache]: response.data.photos.photo,
          })
          setImages(response.data.photos.photo)
          setLoading(false)
        })
        .catch((error) => {
          console.log("Encountered an error with fetching and parsing data", error)
        })
    }
  }
  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  )
}

export default PhotoContextProvider
