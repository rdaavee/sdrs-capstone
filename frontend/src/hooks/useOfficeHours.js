import { useState, useEffect } from "react";
import { fetchCurrentTime } from "../services/api";

const useOfficeHours = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkOfficeHours = async () => {
            const data = await fetchCurrentTime();
            if (!data) return;

            const day = data.dayOfWeek;
            const hours = data.hour;
            const minutes = data.minute;

            const isWeekday = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ].includes(day);
            const isWorkingHours =
                (hours > 0 && hours < 24) ||
                (hours === 0 && minutes >= 0) ||
                (hours === 23 && minutes === 59);

            setIsOpen(isWeekday && isWorkingHours);
        };

        checkOfficeHours();
        const interval = setInterval(checkOfficeHours, 60000);
        return () => clearInterval(interval);
    }, []);

    return { isOpen };
};

export default useOfficeHours;
