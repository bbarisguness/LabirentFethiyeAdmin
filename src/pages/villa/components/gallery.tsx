import { Grid, List, ListItem, CardMedia, Box, Button } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useVillaPhoto from 'hooks/villa/useVillaPhoto';
import {  useParams } from 'react-router';
import useUpdateVillaPhoto from 'hooks/villa/useUpdateVillaPhoto';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import MainCard from 'components/MainCard';
import { Dialog } from '@mui/material';
import AddPhotoForm from './addPhoto';
import { PopupTransition } from 'components/@extended/Transitions';
import { useState } from 'react';
import { Stack } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import apiRequest from 'services/request';

const VillaGallery = () => {
  const params = useParams();
  

  const { data: photos, refetch: refreshPhotos } = useVillaPhoto(params.id as string);
  const { mutate: drag } = useUpdateVillaPhoto();

  const [add, setAdd] = useState<boolean>(false);
  const handleAdd = () => {
    setAdd(!add);
    refreshPhotos();
  };

  const handleDragEnd = (result: any, provided: any) => {
    if (result && photos) {
      let tPhotos = photos.data.data;
      //@ts-ignore
      const temp = tPhotos[result?.source?.index];
      //@ts-ignore
      tPhotos[result?.source?.index] = tPhotos[result?.destination?.index];
      //@ts-ignore
      tPhotos[result?.destination?.index] = temp;
      var async = require('async');
      async.each(
        tPhotos,
        function (item: any, callback: any) {
          drag(
            {
              id: item.id,
              data: {
                line: tPhotos.indexOf(item)
              }
            },
            {
              onSuccess: (response) => {
                return callback(null);
              }
            }
          );
        },
        function (err: any) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Fotoğraf sırası başarıyla güncellendi!',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          refreshPhotos();
        }
      );
    }

    //console.log(result);
  };

  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<boolean>(false);
  const handleDeletePhoto = (id: any) => {
    setPhotoId(id);
    setDeletePhoto(!deletePhoto);
  };
  const handleDeletePhotoRequest = () => {
    apiRequest('DELETE', `/photos/${photoId}`).then((res) => {
      setDeletePhoto(!deletePhoto);
      refreshPhotos();
      return;
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', marginLeft: 2 }}>
          <Button variant="contained" onClick={handleAdd} size="medium">
            Resim Ekle
          </Button>
        </Box>
        <Dialog
          maxWidth="lg"
          TransitionComponent={PopupTransition}
          keepMounted
          fullWidth
          onClose={handleAdd}
          open={add}
          sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
          aria-describedby="alert-dialog-slide-description"
        >
          <AddPhotoForm onCancel={handleAdd} />
        </Dialog>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {photos?.data.data.map((photo: any, index: any) => (
                  <Draggable key={photo.id} draggableId={'p-' + photo.id} index={index}>
                    {(provided) => (
                      <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <MainCard>
                          <CardMedia component="img" image={photo.attributes.photo.data.attributes.url} alt="green iguana" />
                          <Button color="error" variant="contained" sx={{ marginTop: 1 }} onClick={() => handleDeletePhoto(photo.id)}>
                            x
                          </Button>
                        </MainCard>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
        <Dialog
          maxWidth="sm"
          TransitionComponent={PopupTransition}
          keepMounted
          fullWidth
          onClose={handleDeletePhoto}
          open={deletePhoto}
          sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
          aria-describedby="alert-dialog-slide-description"
        >
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={12}>
              <MainCard title="WARNING !!">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>Resimi Silmek İstediğinize Emin misiniz?</Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-start">
                      <div style={{ marginRight: 5 }}>
                        <AnimateButton>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setDeletePhoto(!deletePhoto);
                            }}
                          >
                            İPTAL
                          </Button>
                        </AnimateButton>
                      </div>
                      <div style={{ marginLeft: 5 }}>
                        <AnimateButton>
                          <Button color="primary" variant="contained" onClick={handleDeletePhotoRequest}>
                            ONAYLA
                          </Button>
                        </AnimateButton>
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  );
};
export default VillaGallery;
