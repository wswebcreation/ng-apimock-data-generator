'use strict';

module.exports = (data) => {
    if (typeof data === "string") {
        try {
            const isJSON = JSON.parse(data);
            return isJSON && typeof isJSON === "object";
        } catch (error) {
            return false;
        }
    } else {
        const jsonString = JSON.stringify(data);
        try {
            const checkJSON = JSON.parse(jsonString);
            return checkJSON && typeof checkJSON === "object";
        } catch (error) {
            return false;
        }
    }
};
