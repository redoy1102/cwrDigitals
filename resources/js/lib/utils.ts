import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formateDate = (date?: string) => {
    if (!date) return '';
    // Converts a MySQL-style datetime ("YYYY-MM-DD HH:mm:ss") to ISO 8601 format ("YYYY-MM-DDTHH:mm:ss"), which JavaScript can parse.
    const isoDate = date.replace(' ', 'T');
    const parsedDate = Date.parse(isoDate);
    
    if (isNaN(parsedDate)) return date; // fallback
    return new Date(parsedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
