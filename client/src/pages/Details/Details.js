import React, { useEffect, useState } from "react";
import "./Details.scss";

import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";

const getProductDetails = async (id) => await axios.get(`/api/product/${id}`);

function Details() {
  const [details, setDetails] = useState({});
  const [manufacturer, setManufacturer] = useState({});
  const [value, setValue] = useState(0);
  const [spinner, setSpinner] = useState(true);

  const path =
    window.location.href.split("/")[window.location.href.split("/").length - 1];

  useEffect(() => {
    const getData = async () => {
      const details = await getProductDetails(path);
      const data = details.data[0];
      setDetails(data);
      setManufacturer(details.data[0].manufacturer);
      setValue(data.rating);
    };
    getData();
    setSpinner(false);
  }, [path]);

  return (
    <div className='Details'>
      {spinner ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardMedia
            component='img'
            alt={`imagen de la cámara ${manufacturer.manufacturer} ${details.product}`}
            image={details.image}
            title={`${manufacturer.manufacturer} ${details.product}`}
            data-testid='imagen'
          />
          <CardContent>
            <div>
              <Typography
                gutterBottom
                variant='h5'
                component='h2'
                data-testid='title'>
                {details.product}
              </Typography>
              <Rating name='read-only' value={value} readOnly />
            </div>
            <Typography component='h3' data-testid='price'>
              {details.price} €
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              data-testid='manufacturer'>
              Fabricante: {manufacturer.manufacturer}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              data-testid='cif'>
              CIF: {manufacturer.cif}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              data-testid='address'>
              Dirección: {manufacturer.address}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Details;
