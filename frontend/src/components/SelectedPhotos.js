import React from 'react';
import { Grid, Button } from '@mui/material';

const SelectedPhotos = ({ photos, handleDeleteClick }) => {
  return (
    <Grid>
      <strong>Selected Photos:</strong>
      <br />
      {photos.map((file, index) => (
        <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
          <img
            src={URL.createObjectURL(file)}
            alt={`File ${index + 1}`}
            style={{ height: '100px', margin: '0.5rem' }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={(event) => handleDeleteClick(event, index)}
            style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}
          >
            Delete
          </Button>
        </div>
      ))}
    </Grid>
  );
};

export default SelectedPhotos;
