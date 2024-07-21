import React from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Loader from '../../components/shared/Loader';
import { CirclePlus, PlusCircleIcon } from 'lucide-react';
import { useGetEventsQuery } from '../../slices/eventApiSlice';

const AdminAgendaScreen = () => {
  const { data: events, error, isLoading } = useGetEventsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string'
          ? error.data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  const formattedEvents = events.map(event => ({
    title: event.title,
    start: event.date,
    url: `/event/${event._id}`, // Assurez-vous que _id est correct selon votre modèle
    extendedProps: {
      description: event.description,
      location: event.location,
      status: event.status,
      priority: event.priority,
      meetingUrl: event.meetingUrl,
    },
  }));

  const handleAddEventClick = () => {
    window.location.href = '/add-event-form';
  };

  return (
    <div className="h-screen p-6 text-sm">
      <div className="flex justify-center items-center w-full mb-4">
        <div className="bg-gray-300 p-6 rounded-lg shadow-md w-full max-w-9xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={formattedEvents}
            headerToolbar={{
              left: 'prev,next today customAddEvent',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            customButtons={{
              customAddEvent: {
                text:  "Ajouter un évènement",
                click: handleAddEventClick,
              },
            }}
            locale="fr"
            buttonText={{
              today: 'Aujourd\'hui',
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
            }}
            height="auto"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              if (info.event.url) {
                window.open(info.event.url, "_self");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAgendaScreen;
