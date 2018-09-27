export function formatDateTime(date) {
  let d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()
  let hours = '' + d.getHours()
  let minutes = '' + d.getMinutes()

  if (hours.length < 2) hours = '0' + hours
  if (minutes.length < 2) minutes = '0' + minutes

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return `${year}-${month}-${day} ${hours}:${minutes}`
}