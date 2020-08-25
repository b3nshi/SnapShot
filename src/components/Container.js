import React, { useContext, useEffect, useState, useCallback } from "react"
import { PhotoContext } from "../context/PhotoContext"
import Gallery from "./Gallery"
import Loader from "./Loader"

const Container = ({ searchTerm }) => {
  const { images, loading, runSearch } = useContext(PhotoContext)
  const [position, setPosition] = useState({
    loaded: false,
  })

  const updateGeoPosition = useCallback(
    (geoPosition) => {
      console.log(geoPosition)
      setPosition({
        loaded: true,
        lat: geoPosition.lat || geoPosition.coords.latitude,
        lng: geoPosition.lng || geoPosition.coords.longitude,
      })
    },
    [setPosition]
  )

  useEffect(() => {
    if (!position.loaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateGeoPosition)
    }
  }, [position, updateGeoPosition])

  useEffect(() => {
    if (position.loaded) {
      runSearch(searchTerm, position)
    }
    // eslint-disable-next-line
  }, [searchTerm, position])

  return (
    <div className="photo-container">
      {!position.loaded || loading ? (
        <Loader />
      ) : (
        <Gallery
          changePosition={updateGeoPosition}
          position={position}
          data={images}
        />
      )}
    </div>
  )
}

export default Container
