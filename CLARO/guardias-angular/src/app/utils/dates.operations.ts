import * as moment from 'moment'


export function transformStringInDates(day: string,  hourStarts:string, hourEnds:string) {
    day       = moment(day).format('YYYY-MM-DD ');
    let start = moment(day + hourStarts);
    let end   = moment(day + hourEnds); 

    if(end <= start) {
      end = end.add(1,'days');
    }

    const dates = {
      start:start.toDate(),
      end:end.toDate()
    }
    return dates;
}
