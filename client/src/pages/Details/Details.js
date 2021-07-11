import React, { useEffect, useState } from "react";
import "./Details.scss";

import axios from "axios";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const getProductDetails = async (id) => await axios.get(`/api/product/${id}`);

function Details() {
  const [details, setDetails] = useState({});
  const [value, setValue] = useState(0);

  const path =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  console.log(path);

  useEffect(() => {
    const getData = async () => {
      const details = await getProductDetails(path);
      const data = details.data[0];
      console.log(data);
      setDetails(data);
      setValue(data.rating);
    };
    getData();
  }, [path]);

  return (
    <div className='Details'>
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='Contemplative Reptile'
            image={details.image}
            title='Contemplative Reptile'
          />
          <CardContent>
            <div>
              <Typography gutterBottom variant='h5' component='h2'>
                {details.product}
              </Typography>
              <Rating
                name='half-rating'
                precision={0.5}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <Typography component='h3'>{details.price} €</Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Fabricante: {details.manufacturer}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              CIF: {details.cif}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Dirección: {details.address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Details;
