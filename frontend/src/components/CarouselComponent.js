import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

const Item = ({image}) => {
    return (
        <Paper>
            <img src={image} width="100%" />
        </Paper>
    )
}

const CarouselComponent = ({photos}) => {
    console.log(photos)
    return (
        <Carousel>
            {photos.map((photo, i) => (
                <Item key={i} {...photo.Url} />
            ))}
        </Carousel>
    )
}

export default CarouselComponent