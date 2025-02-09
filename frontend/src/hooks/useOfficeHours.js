import { useState, useEffect } from "react";

const useOfficeHours = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkOfficeHours = async () => {
            try {
                const response = await fetch(
                    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Manila"
                );
                const data = await response.json();

                const day = data.dayOfWeek;
                const hours = data.hour;
                const minutes = data.minute;

                const isWeekday = [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Sunday",
                ].includes(day);
                const isWorkingHours =
                    (hours > 8 && hours < 24) ||
                    (hours === 8 && minutes >= 0) ||
                    (hours === 23 && minutes === 59);

                setIsOpen(isWeekday && isWorkingHours);
            } catch (error) {
                console.error("Error fetching time:", error);
            }
        };

        checkOfficeHours();
        const interval = setInterval(checkOfficeHours, 60000);
        return () => clearInterval(interval);
    }, []);

    return { isOpen };
};

export default useOfficeHours;
