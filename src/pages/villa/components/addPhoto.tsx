import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from 'react-router';
import AnimateButton from 'components/@extended/AnimateButton';
import apiRequest from 'services/request';
//import apiRequest from 'services/request';

export interface Props {
  onCancel: () => void;
}
const AddPhotoForm = ({ onCancel }: Props) => {
  const params = useParams();

  const [files, setFiles] = useState([]);
  const [setRejected] = useState([]);
  //@ts-ignore
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      //@ts-ignore
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) }))
      ]);
    }

    if (rejectedFiles?.length) {
      //@ts-ignore
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    onDrop
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  //   const removeFile = (name: any) => {
  //     setFiles((files) => files.filter((file: any) => file.name !== name));
  //   };

  const removeAll = () => {
    setFiles([]);
    // setRejected([]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    apiRequest('POST', '/upload', formData).then((res) => {
      //console.log(res);

      res.data.map((img: any) => {
        const imgJson = {
          data: {
            name: img.name,
            line: 0,
            photo: img.id,
            villa: { connect: [params.id] }
          }
        };
        apiRequest('POST', `/photos`, imgJson);
      });
      onCancel();
    });
  };

  const clickFileInput = () => {
    document.getElementById('getFile')?.click();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Resim Ekle</DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container spacing={3} justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
              <Stack spacing={1}>
                <div>
                  {files.length == 0 && (
                    <Button variant="contained" color="success" onClick={clickFileInput}>
                      Resim Seçiniz..
                    </Button>
                  )}
                  <input {...getInputProps()} id="getFile" style={{ display: 'none' }}></input>
                  {/* <input name='files' {...getInputProps()} style={{ display: 'block' }} /> */}
                </div>
              </Stack>
            </Grid>

            {files.map((file: any) => (
              <Grid item xs={5} sx={{ marginRight: 5 }}>
                <Stack spacing={1}>
                  <img
                    src={file.preview}
                    width="100%"
                    height="auto"
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                  {/* <Button type="button" onClick={() => removeFile(file.name)} size='small' variant="contained" color='error'>
                      x
                    </Button> */}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <AnimateButton>
                  <Button color="error" onClick={onCancel}>
                    İPTAL
                  </Button>
                </AnimateButton>

                <AnimateButton>
                  <Button color="warning" onClick={removeAll}>
                    TÜMÜNÜ SİL
                  </Button>
                </AnimateButton>

                <AnimateButton>
                  <Button variant="contained" type="submit">
                    KAYDET
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </LocalizationProvider>
  );
};

export default AddPhotoForm;
