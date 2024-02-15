import { Grid, Button, Box, Dialog } from '@mui/material';

import MainCard from 'components/MainCard';
import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { useEffect, useRef, useState } from 'react';
import { DateSelectArg, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import trLocale from '@fullcalendar/core/locales/tr';
import { useParams } from 'react-router';
import useVillaPrice from 'hooks/villa/useVillaPrice';
import { PopupTransition } from 'components/@extended/Transitions';
import DatePricesCreate from 'pages/prices/add';
import moment from 'moment';

const VillaPrice = () => {
  const params = useParams();

  //const { data } = useVillaPrice(params.id as string);
  const { data, refetch: refreshPrices } = useVillaPrice(params.id as string);
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
    //console.log(reservations)
    //console.log(reservations[0].attributes.checkOut);
    //console.log(moment(reservations[0].attributes.checkOut, 'YYYY-MM-DD').add(1, 'days').toString());
    //console.log(moment(reservations[0].attributes.checkOut, 'YYYY-MM-DD HH:mm:ss').add(20, 'hours').format('YYYY-MM-DD HH:mm:ss').toString());

    var newArr = reservations.map((item: any) => {
      return {
        title: item.attributes.price + ' TL',
        start: moment(item.attributes.checkIn, 'YYYY-MM-DD HH:mm:ss').add(1, 'hours').format('YYYY-MM-DD HH:mm:ss').toString(),
        end: moment(item.attributes.checkOut, 'YYYY-MM-DD HH:mm:ss').add(1, 'hours').format('YYYY-MM-DD HH:mm:ss').toString(),
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

  const [add, setAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    refreshPrices();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Box sx={{ width: '100%', marginBottom: 2 }}>
                <Button variant="contained" onClick={handleAdd} size="medium">
                  Fiyat Ekle
                </Button>
              </Box>
              <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleAdd}
                open={add}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
              >
                {/* <ReservationCreate /> */}
                <DatePricesCreate />
                {/* <AddReservationForm onCancel={handleAdd} resFetch={refetch} /> */}
              </Dialog>

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
