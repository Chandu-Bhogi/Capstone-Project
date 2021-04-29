import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const getUserToken = () => {
    try {
        let data = JSON.parse(localStorage.getItem("user_data_TCS"));
        return data.token;
    } catch (e) {
        return false;
    }
};

export const getUserDetails = () => {
    try {
        let data = JSON.parse(localStorage.getItem("user_data_TCS"));
        return data.user;
    } catch (e) {
        return false;
    }
};

export const deepGet = (obj) => (path, defaultReturn) => {
    if(obj === undefined) return defaultReturn;

    var paths = path.split("."),
        current = obj,
        i;
    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] === undefined) {
            return defaultReturn || undefined;
        } else {
            current = current[paths[i]];
        }
    }
    return current;
};

export const shortDateFormatter = (dateStr) =>
    dayjs(dateStr).format("Do MMM YYYY");

export const isTestActiveNow = (start_date, end_date, duration = 5) => {
    let isTestActive = false;
    const startDate = start_date ? dayjs(start_date) : dayjs().add(5, "m");
    const endDate = end_date
        ? dayjs(end_date)
        : dayjs(startDate).add(duration, "m");
    const nowTime = dayjs();

    if (nowTime.isBetween(startDate, endDate)) {
        isTestActive = true;
    }

    return { startDate, endDate, isTestActive };
};

export const secondsToHms = (total) => {
    total = Number(total);
    const seconds = ("0" + Math.floor((total / 1000) % 60)).slice(-2);
    const minutes = ("0" + Math.floor((total / 1000 / 60) % 60)).slice(-2);
    const hours = ("0" + Math.floor(total / (1000 * 60 * 60))).slice(-2);
    //const days = Math.floor( total/(1000*60*60*24) );

    return hours + ":" + minutes + ":" + seconds;
};

export const getAudiencesString = (audiences, listOfGroups = {}) => {
    let batchStr = "UNASSIGNED";
    let individualsCount = 0;
    if (audiences) {
        if (Object.keys(listOfGroups).length) {
            const audiencesArray = audiences.split(",");
            audiencesArray.forEach((groupItem, index) => {
                if (index === 0) {
                    batchStr = listOfGroups[groupItem]
                        ? listOfGroups[groupItem].name
                        : "";
                } else {
                    batchStr = `${batchStr} ${
                        listOfGroups[groupItem]
                            ? listOfGroups[groupItem].name
                            : ""
                    }`;
                }
            });
        } else if (typeof audiences !== "string" && audiences.length) {
            audiences.forEach((groupItem, index) => {
                if (index === 0) {
                    batchStr = audiences[0].name;
                    individualsCount = audiences[0].total_individuals;
                } else {
                    batchStr = `${batchStr}, ${groupItem.name}`;
                    individualsCount += groupItem.total_individuals || 0;
                }
            });
        }
    }

    return { batchStr, individualsCount };
};

export const isRichTextNotEmpty = (richStr) =>
    richStr !== "<p><br></p>" && richStr.length > 7;

export const isTestScheduled = (start_date, end_date) => {
    return !start_date || !end_date;
};
