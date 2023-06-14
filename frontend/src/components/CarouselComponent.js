import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

const Item = ({photo}) => {
    let url = 'http://localhost:5000/' + photo.Url + photo.Name

    return (
        <Paper>
            <img
                src={url}
                height="650" 
                alt="User_photo"
                style={{ display: 'block', margin: '0 auto' }}
            />
        </Paper>
    )
}

const CarouselComponent = ({photos}) => {
    return (
        
        <Carousel>
            {photos?.map((photo, i) => (
                <Item key={i} photo={photo} />
            ))}
        </Carousel>
    )
}

export default CarouselComponent