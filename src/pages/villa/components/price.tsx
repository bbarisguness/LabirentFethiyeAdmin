import { Grid, Button, Box } from '@mui/material';

import MainCard from 'components/MainCard';
import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { useEffect, useRef, useState } from 'react';
import { DateSelectArg, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import trLocale from '@fullcalendar/core/locales/tr';
import { useParams } from 'react-router';
import useVillaPrice from 'hooks/villa/useVillaPrice';

const VillaPrice = () => {
  const params = useParams();

  const { data } = useVillaPrice(params.id as string);
  const [events, setEvent] = useState([]);
  const calendarRef = useRef<FullCalendar>(null);
  const handleRangeSelect = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    //console.log(arg.start, arg.end);
  };

  const handleEventSelect = (arg: EventClickArg) => {
    alert('Fiyat Detayı Gelecek');
  };

  const convertData = (data: any) => {
    var reservations = data?.data.data;

    console.log(reservations);

    var newArr = reservations.map((item: any) => {
      return {
        title: item.attributes.price + ' TL',
        start: item.attributes.checkIn,
        end: item.attributes.checkOut,
        display: 'block',
        allDay: true,
        backgroundColor: 'blue',
        borderColor: 'gray'
      };
    });
    //console.log(newArr);
    setEvent(newArr);
  };
  useEffect(() => {
    if (data) {
      convertData(data);
    }
  }, [data]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Box sx={{ width: '100%', marginBottom: 2 }}>
                <Button variant="contained" onClick={() => alert('modal')} size="medium">
                  Fiyat Ekle
                </Button>
              </Box>

              <FullCalendar
                locale={trLocale}
                weekends
                eventOverlap={false}
                events={events as EventSourceInput}
                ref={calendarRef}
                plugins={[multiMonthPlugin, interactionPlugin]}
                initialView="multiMonthYear"
                select={handleRangeSelect}
                eventClick={handleEventSelect}
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VillaPrice;
