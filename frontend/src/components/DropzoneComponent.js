import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Grid, IconButton } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

const DropzoneComponent = ({onUploaded}) => {
  const [selectedFiles, setSelectedFiles] = useState([])

  useEffect(() => {
    onUploaded(selectedFiles.length > 3 ? selectedFiles : [])
  }, [selectedFiles])

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const onDelete = (file, event) => {
    event.stopPropagation()
    setSelectedFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        border: '2px dashed #aaa',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        color: '#555',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}
      {selectedFiles.length > 0 && (
        <Grid container spacing={2}>
          {selectedFiles.map((file) => (
            <Grid item xs={3} key={file.name}>
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="File Preview"
                  style={{ width: '100%', height: 'auto' }}
                />
                <IconButton
                  onClick={(event) => onDelete(file, event)}
                  size="small"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: '5%',
                    width: 50,
                    height: 50,
                    backgroundColor: "lightgray",
                    border: '2px solid lightgray'
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default DropzoneComponent
