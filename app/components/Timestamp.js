import React from 'react'
import moment from 'moment'

const formatTime = ts => moment(ts).format('LT')
const formatDatetime = ts => moment(ts).calendar(null, {
  sameDay: 'LT',
  lastDay: '[Yesterday,] LT',
  lastWeek: 'dddd[,] LT'
})

const Timestamp = (props) => {
  const { timestamp, type } = props

  let formattedString
  switch (type) {
  case 'time': formattedString = formatTime(timestamp); break
  case 'datetime': formattedString = formatDatetime(timestamp); break
  }

  return (
    <span data-timestamp={timestamp.toISOString()}>{formattedString}</span>
  )
}

export default Timestamp
