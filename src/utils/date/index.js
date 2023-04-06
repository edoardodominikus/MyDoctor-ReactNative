export const getChatTime = (date_today) => {
    const hour = date_today.getHours();
    const minutes = date_today.getMinutes();
    return `${hour}:${minutes} ${hour > 12 ? "PM" : "AM"}`;
}
export const getChatDate = (date_today) => {
    const year = date_today.getFullYear();
    const month = date_today.getMonth() + 1;
    const date = date_today.getDate();
    return `${year}-${month}-${date}`;
}