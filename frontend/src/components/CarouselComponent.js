import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

const CarouselComponent = (props) => {
    const items = [
        {
            name: 'Aya Bouchiha',
            description: 'Full Stack Web Developer',
            image: "https://source.unsplash.com/random?wallpapers",
        },
        {
            name: 'John Doe',
            description: 'Author',
            image: "https://source.unsplash.com/random?wallpapers",
        },
        {
            name: 'Pitsu Coma',
            description: 'Math Student',
            image: "https://source.unsplash.com/random?wallpapers",
        },
    ]

    return (
        <Carousel>
            {items.map((item, i) => (
                <Item key={i} {...item} />
            ))}
        </Carousel>
    )
}

const Item = ({image}) => {
    return (
        <Paper>
            <img src={image} width="100%" />
        </Paper>
    )
}

export default CarouselComponent