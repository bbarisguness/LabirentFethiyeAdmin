import {
    Grid,
    Button,
    Dialog
} from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';
import AddReservationForm from './component/addForm';
import MainCard from 'components/MainCard';
import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { useEffect, useRef, useState } from 'react';
import { DateSelectArg, EventClickArg,EventSourceInput } from '@fullcalendar/core';
import  interactionPlugin from '@fullcalendar/interaction';
import trLocale from '@fullcalendar/core/locales/tr';
import useReservations from 'hooks/reservation/useReservations';
import {  Add } from 'iconsax-react';

const ReservationCalendar = () => {
    const { data,refetch } = useReservations({
        Page:0,
        Size:100000
    });
    const [events, setEvent] = useState([]);
    const calendarRef = useRef<FullCalendar>(null);
    const handleRangeSelect = (arg: DateSelectArg) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }
        console.log(arg.start, arg.end);
    };
    
    const handleEventSelect = (arg: EventClickArg) => {
        alert("Rezzervasyon Detayı Gelecek");
    };

    const convertData = (data:any) => {
        var reservations = data?.data.data;
        var newArr = reservations.map((item:any) => {
            return (
                {
                    title:"Rezervasyon",
                    start:item.checkIn,
                    end:item.checkOut,
                    display:"block",
                    allDay:true,
                    backgroundColor:"blue",
                }
            );
        })
        setEvent(newArr);
    };
    useEffect(() => {
        if(data){
            convertData(data);
        }
        
    },[data])
    const [add, setAdd] = useState<boolean>(false);
    const handleAdd = () => {
      setAdd(!add);
    };
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MainCard content={false} title="Rezervasyon Listesi" secondary={
            <>
                <Button variant="contained" startIcon={<Add />} onClick={handleAdd} size="small">
                    Rezervasyon Ekle
                </Button>
            </>
        }>
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
                   <AddReservationForm onCancel={handleAdd} resFetch={refetch}/> 
                </Dialog>
                        <FullCalendar
                            locale={trLocale}
                            weekends
                            eventOverlap={false}
                            events={events as EventSourceInput}
                            ref={calendarRef}
                            plugins={[multiMonthPlugin,interactionPlugin]}
                            initialView= 'multiMonthYear'
                            select={handleRangeSelect}
                            eventClick={handleEventSelect}
                        />
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>    
    )
}


export default ReservationCalendar;