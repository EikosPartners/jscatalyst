/*
Parse data for the data table
*/
export class referenceData {
  getDays () {
    const days = [
        { name: 'Mon', value: 2, description: 'Monday' },
        { name: 'Tue', value: 3, description: 'Tuesday' },
        { name: 'Wed', value: 4, description: 'Wednesday' },
        { name: 'Thu', value: 5, description: 'Thursday' },
        { name: 'Fri', value: 6, description: 'Friday' },
        { name: 'Sat', value: 7, description: 'Saturday' },
        { name: 'Sun', value: 1, description: 'Sunday' }
    ]
    return days
  }

  getMonths () {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December']
    return months
  }

  getFullDays () {
    const data = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday']
    return data
  }

}
