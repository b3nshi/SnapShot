import React, { useState } from "react";
import NoImages from "../NoImages";
import Image from "../Image";
import GoogleMapReact from "google-map-react";

import styles from "./Gallery.module.css";
import Popup from "../Popup";

const Gallery = (props) => {
  const [popupImage, setPopupImage] = useState(null);

  const results = props.data;
  let images;
  let noImages;

  const onClickIconImage = (url) => () => {
    setPopupImage(url ? url.replace("_m.jpg", "_z.jpg") : url);
  };

  if (results.length > 0) {
    images = results.map((image) => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
      return (
        <Image
          url={url}
          key={id}
          alt={title}
          lat={image.latitude}
          lng={image.longitude}
          onClick={onClickIconImage}
        />
      );
    });
  } else {
    noImages = <NoImages lat={props.position.lat} lng={props.position.lng} />;
  }
  return (
    <div className={styles.gallery}>
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={props.position}
          defaultZoom={14}
        >
          {images}
          {noImages}
        </GoogleMapReact>
        <Popup url={popupImage} onClose={onClickIconImage(null)} />
      </div>
    </div>
  );
};

export default Gallery;
