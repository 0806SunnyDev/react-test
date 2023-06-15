import React from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Grid, 
  Typography, 
  Button, 
} from '@mui/material'


const Dropzone = ({
  formData,
  errors,
  onDrop,
  handlePhotoDeleteClick,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive 
  } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()} 
      style={{
        border: '1px dashed #ccc',
        borderRadius: 10,
        padding: '1rem',
        marginTop: '1rem',
        textAlign: 'center'
      }}
    >
      <Typography style={{color: 'red'}}>{errors.photos}</Typography>
      <input {...getInputProps()} name="photos" />
      {isDragActive ? (
        <p>Drop your photos here...</p>
      ) : (
        <Grid>{formData.photos?.length > 0 ? (
          <>
            <strong>Selected Photos:</strong>
            <br />
            {formData.photos.map((file, index) => (
              <div
                key={index}
                style={{ display: 'inline-block', position: 'relative' }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`File ${index + 1}`}
                  style={{ height: '100px', margin: '0.5rem' }}
                  />
                <Button
                  variant="contained"
                  size="small"
                  onClick={(event) => handlePhotoDeleteClick(event, index)}
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)' 
                  }}
                >Delete</Button>
              </div>
            ))}
          </>
        ) : ("Drag and drop your photos here, or click to select...")}
        </Grid>
        )}
    </div>
  )
}

export default Dropzone