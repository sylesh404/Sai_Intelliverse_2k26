import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isPast: boolean;
  statusMessage: string;
}

export function useCountdown(targetDateISO: string): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => {
    return calculateTimeRemaining(targetDateISO);
  });

  useEffect(() => {
    // Immediate calculation on mount
    setTimeLeft(calculateTimeRemaining(targetDateISO));

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDateISO));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateISO]);

  return timeLeft;
}

function calculateTimeRemaining(targetDateISO: string): CountdownTime {
  // Target timestamp in UTC milliseconds (ISO string contains +05:30 offset)
  const target = Date.parse(targetDateISO);
  const now = Date.now();
  const difference = target - now;

  // If past target time
  if (isNaN(target) || difference <= 0) {
    // Check if within 24 hours of event start (Event Day) or past that (Completed)
    const isSameDayOrRecent = difference > -86400000;
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isPast: true,
      statusMessage: isSameDayOrRecent ? "EVENT DAY HAS ARRIVED" : "EVENT COMPLETED",
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days: days < 10 ? `0${days}` : `${days}`,
    hours: hours < 10 ? `0${hours}` : `${hours}`,
    minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
    isPast: false,
    statusMessage: "T-MINUS LAUNCH",
  };
}
