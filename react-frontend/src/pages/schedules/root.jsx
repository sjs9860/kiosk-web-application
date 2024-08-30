import React, { useMemo, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFetcher } from "react-router-dom";
import { format, add, endOfDay } from 'date-fns'
import { getEvents, getEvent, updateEvent, deleteEvent, createEvent } from "../../mock/events";

const mLocalizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

const EventDialog = ({ data, open, handleChange, handleClose, handleSubmit }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{!data.title ? `Add Event` : `Edit Event`}</DialogTitle>
      <DialogContent>
        {data.start && <DialogContentText>
          Start: {format(data.start, 'yyyy-MM-dd HH:mm:ss')}
        </DialogContentText>}
        {data.end && <DialogContentText>
          End: {format(data.end, 'yyyy-MM-dd HH:mm:ss')}
        </DialogContentText>}
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Event Title"
          fullWidth
          variant="standard"
          value={data.title}
          onChange={(d) => handleChange('title', d.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  )
} 

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
  localizer = mLocalizer,
  ...props
}) {
  const [events, setEvents] = useState([])
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState({});
  const fetcher = useFetcher()

  const fetchData = () => {
    getEvents().then(events => setEvents(events))
  }

  const handleSelectSlot = useCallback(
    (data) => {
      const { start, end } = data
      setEvent({
        start,
        end,
      })
      setOpen(true)
    },
    [setEvents]
  )

  const handleChange = (k, v) => {
    console.log(k, v)
    setEvent({
      ...event,
      [k]: v,
    })
  }

  const handleSubmitEvent = useCallback(
    (data) => {
      console.log('submit data ', event)
      if (!event.id) {
        createEvent(event).then(() => {
          setEvent({})
          setOpen(false)
        })
      } else {
        updateEvent(event.id, event).then(() => {
          setEvent({})
          setOpen(false)
        })
      }
    },
    [event]
  )

  const handleSelectEvent = useCallback(
    (event) => {
      setEvent(event)
      setOpen(true)
    },
    [event]
  )

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      isAllDay: droppedOnAllDaySlot = false
    }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
          event.allDay = false;
      }

      updateEvent(event.id, { ...event, start, end, allDay: event.allDay }).then((data) => {
        fetchData()
      })

      setEvents((prev) => {
        console.log(prev)
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        console.log(filtered)
        return [...filtered, { ...existing, start, end, allDay: event.allDay }]
      })
    },
    [setEvents]
  )

  const resizeEvent = useCallback(
    ({
      event,
      start,
      end
    }) => {
      updateEvent(event.id, { ...event, start, end }).then((data) => {
        fetchData()
      })
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setEvents]
  )

  const { components, defaultDate, max, views, scrollToTime } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      max: add(endOfDay(new Date(2015, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  useEffect(() => {
    fetchData()
  }, [])

  console.log('events are ', events)

  return (
    <Box height='100%' {...props}>
      <Card id="contact" sx={{ height: '100%', width: '100%', overflow: 'scroll' }}>
        {/* <DnDCalendar */}
        <Calendar
          dayLayoutAlgorithm='no-overlap'
          components={components}
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={events}
          localizer={localizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={views}
          scrollToTime={scrollToTime}
          // draggableAccessor={(event) => true}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          popup
          resizable
          selectable
        />
      </Card>
      <EventDialog
        open={open}
        data={event}
        handleSubmit={handleSubmitEvent}
        handleClose={() => {
          setOpen(false)
          setEvent({})
        }}
        handleChange={handleChange}
      />
    </Box>
  )
}
Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}