import moment from 'moment';

moment.updateLocale('en', {
    relativeTime : {
        future: "en %s",
        past:   "%s atrás",
        s:  "segundos",
        m:  "un minuto",
        mm: "%d minutos",
        h:  "una hora",
        hh: "%d horas",
        d:  "un día",
        dd: "%d días",
        M:  "un mes",
        MM: "%d moeses",
        y:  "un año",
        yy: "%d años"
    }
})

const Utils = {
	getTimeFrom(timestamp) {
		const now = moment();
		const theDate = moment(timestamp);
		return theDate.from(now);
	}
};

export default Utils;
