import date from 'date-and-time';
/*
*   Recibe fecha y retorna el tiempo transcurrido hasta el momento de ejecución
*   @param dateToFormat string
*   @returns string
*/
export default function formatTweetDate(dateToFormat: string): string {
    const tweetDate = new Date(dateToFormat);
    const currentDate = new Date();

    const days = Math.trunc(date.subtract(currentDate, tweetDate).toDays());
    if(days > 0) return `${days}d`;
    const hours = Math.trunc(date.subtract(currentDate, tweetDate).toHours());
    if(hours > 0) return `${hours}h`;
    const minutes = Math.trunc(date.subtract(currentDate, tweetDate).toMinutes());
    if(minutes > 0) return `${minutes}m`;
    const seconds = Math.trunc(date.subtract(currentDate, tweetDate).toSeconds());
    if(seconds > 0) return `${seconds}s`;

    return '0s';
}