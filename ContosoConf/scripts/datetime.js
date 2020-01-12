export function parseTimeAsTotalMinutes(timeString) {
    const timeParts = timeString.split(":");
    return parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = Math.floor(totalSeconds - hours * 3600 - minutes * 60);

    const parts = [];
    const add = function (value) {
        if (value < 10) {
            parts.push("0" + value);
        } else {
            parts.push(value);
        }
    };

    add(hours);
    add(minutes);
    add(seconds);

    return parts.join(":");
}