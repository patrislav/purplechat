import React from 'react'
import moment from 'moment'

const formatTime = ts => moment(ts).format('LT')
const formatDatetime = ts => moment(ts).calendar(null, {
  sameDay: 'LT',
  lastDay: '[Yesterday,] LT',
  lastWeek: 'dddd[,] LT',
  sameElse: 'L LT'
})
const formatDate = ts => moment(ts).calendar(null, {
  sameDay: 'LT',
  lastDay: '[Yesterday]',
  lastWeek: 'dddd',
  sameElse: 'L'
})

const Timestamp = (props) => {
  const { timestamp, type, ...otherProps } = props

  let formattedString
  switch (type) {
  case 'time': formattedString = formatTime(timestamp); break
  case 'date': formattedString = formatDate(timestamp); break
  case 'datetime': formattedString = formatDatetime(timestamp); break
  }

  return (
    <span data-timestamp={timestamp.toISOString()} {...otherProps}>{formattedString}</span>
  )
}

export default Timestamp
