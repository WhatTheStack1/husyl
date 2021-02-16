module.exports = (startingTime, endingTime) => {
    let start = new Date(startingTime)
    let end = new Date(endingTime)

    let startHours = parseInt(startingTime.toString().slice(11, 13)) + (start.getMinutes() / 60)
    let endingHours = parseInt(endingTime.toString().slice(11, 13)) + (end.getMinutes() / 60)

    let totalHours = endingHours - startHours
    return totalHours
}