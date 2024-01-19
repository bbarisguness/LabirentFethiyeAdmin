import { Grid, List, ListItem, CardMedia } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useVillaPhoto from 'hooks/villa/useVillaPhoto';
import { useParams } from 'react-router';
import useUpdateVillaPhoto from 'hooks/villa/useUpdateVillaPhoto';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import MainCard from 'components/MainCard';

const VillaGallery = () => {
  const params = useParams();
  const { data: photos, refetch: refreshPhotos } = useVillaPhoto(params.id as string);
  const { mutate: drag } = useUpdateVillaPhoto();
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

    console.log(result);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
};
export default VillaGallery;
