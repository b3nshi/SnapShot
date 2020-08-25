import React, { useState } from "react"
import PropTypes from "prop-types"
import GoogleMapReact from "google-map-react"

import NoImages from "../NoImages"
import Image from "../Image"
import Popup from "../Popup"

import styles from "./Gallery.module.css"

const Gallery = (props) => {
  const [popupImage, setPopupImage] = useState(null)

  const results = props.data

  const onClickIconImage = (url) => () => {
    setPopupImage(url ? url.replace("_m.jpg", "_z.jpg") : url)
  }

  const onBoundsChange = ({ center }) => {
    props.changePosition(center)
  }

  const renderImages = () =>
    results.length > 0 ? (
      results.map((image) => {
        const farm = image.farm
        const server = image.server
        const id = image.id
        const secret = image.secret
        const title = image.title
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
        return (
          <Image
            url={url}
            key={id}
            alt={title}
            lat={image.latitude}
            lng={image.longitude}
            onClick={onClickIconImage}
          />
        )
      })
    ) : (
      <NoImages lat={props.position.lat} lng={props.position.lng} />
    )

  return (
    <div className={styles.gallery}>
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          center={props.position}
          zoom={14}
          onChange={onBoundsChange}
        >
          {renderImages()}
        </GoogleMapReact>
        <Popup url={popupImage} onClose={onClickIconImage(null)} />
      </div>
    </div>
  )
}

Gallery.propTypes = {
  changePosition: PropTypes.func,
  position: PropTypes.object,
  data: PropTypes.array,
}

export default Gallery
