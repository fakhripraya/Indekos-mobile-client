import { AppStyle } from "../config/app.config";

export function RoomDetailStatusString(status) {
    let statusString = "";

    if (status == 0) {
        statusString = "New";
    }
    else if (status == 1) {
        statusString = "Approved";
    }
    else if (status == 2) {
        statusString = "Accepted";
    }
    else if (status == 3) {
        statusString = "Rejected";
    }
    else {
        statusString = "Unknown";
    }

    return statusString;
}

export function RoomDetailStatusColor(status) {
    let statusColor = "#ffffff";

    if (status == 0) {
        statusColor = AppStyle.warning;
    }
    else if (status == 1) {
        statusColor = AppStyle.warning;
    }
    else if (status == 2) {
        statusColor = AppStyle.success;
    }
    else if (status == 3) {
        statusColor = AppStyle.error;
    }
    else {
        statusColor = "#ffffff";
    }

    return statusColor;
}