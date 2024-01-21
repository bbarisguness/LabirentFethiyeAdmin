// project-imports
import MainCard from 'components/MainCard';

import { Box, Tab, Tabs, Button } from '@mui/material';
import { Profile, Calendar, DollarCircle, Image, Folder, ClipboardText } from 'iconsax-react';

import { useEffect, useState, SyntheticEvent } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

import { useParams, useNavigate } from 'react-router';
import useVillaSummary from 'hooks/villa/useVillaSummary';

const VillaShow = () => {
  //const theme = useTheme();

  useEffect(() => {
    //setSearchParams({Page:"0",Size:"15"})
  }, []);

  const params = useParams();

  const { pathname } = useLocation();

  let selectedTab = 0;
  if (pathname.indexOf('summary') != -1) {
    selectedTab = 0;
  } else if (pathname.indexOf('reservation') != -1) {
    selectedTab = 1;
  } else if (pathname.indexOf('price') != -1) {
    selectedTab = 2;
  } else if (pathname.indexOf('gallery') != -1) {
    selectedTab = 3;
  } else if (pathname.indexOf('file') != -1) {
    selectedTab = 4;
  }
  /*
    switch (pathname) {
        case '/apps/profiles/account/personal':
            selectedTab = 1;
        break;
        case '/apps/profiles/account/my-account':
            selectedTab = 2;
        break;
        case '/apps/profiles/account/password':
            selectedTab = 3;
        break;
        case '/apps/profiles/account/role':
            selectedTab = 4;
        break;
        case '/apps/profiles/account/settings':
            selectedTab = 5;
        break;
        case '/apps/profiles/account/basic':
        default:
        selectedTab = 0;
    }
    */
  const [value, setValue] = useState(selectedTab);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const { data } = useVillaSummary(params.id as string);
  const villa = data?.data.data;

  return (
    <MainCard
      title={villa?.attributes.name}
      border={false}
      secondary={
        <>
          <Button variant="contained" onClick={() => navigate('/villa/update/' + params.id)} size="small">
            Güncelle
          </Button>
        </>
      }
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
          <Tab
            label="Genel Bilgiler"
            component={Link}
            to={'/villa/show/' + params.id + '/summary'}
            icon={<Profile />}
            iconPosition="start"
          />
          <Tab
            label="Rezervasyonlar"
            component={Link}
            to={'/villa/show/' + params.id + '/reservation'}
            icon={<Calendar />}
            iconPosition="start"
          />
          <Tab
            label="Müsait Tarihler"
            component={Link}
            to={'/villa/show/' + params.id + '/available-dates'}
            icon={<DollarCircle />}
            iconPosition="start"
          />
          <Tab label="Fiyatlar" component={Link} to={'/villa/show/' + params.id + '/price'} icon={<DollarCircle />} iconPosition="start" />
          <Tab
            label="İçerik Yönetimi"
            component={Link}
            to={'/villa/show/' + params.id + '/content'}
            icon={<ClipboardText />}
            iconPosition="start"
          />
          <Tab label="Galeri" component={Link} to={'/villa/show/' + params.id + '/gallery'} icon={<Image />} iconPosition="start" />
          <Tab label="Dosyalar" component={Link} to={'/villa/show/' + params.id + '/file'} icon={<Folder />} iconPosition="start" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2.5, mb: 2.5 }}>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default VillaShow;
