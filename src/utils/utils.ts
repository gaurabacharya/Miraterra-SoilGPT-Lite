import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Parse CSV data into a usable format
export function parseCSV(csvContent: string) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      if (header.trim() === 'sampleId') {
        obj[header.trim()] = values[index];
      } else {
        obj[header.trim()] = values[index] ? parseFloat(values[index]) : null;
      }
      return obj;
    }, {} as Record<string, number | string | null>);
  });
  
  return data;
}

// Validate soil data to ensure it has the required fields
export function validateSoilData(data: Record<string, number | string | null>[]) {
  const requiredFields = ['sampleId', 'N', 'P', 'K', 'pH', 'Moisture'];
  
  for (const record of data) {
    for (const field of requiredFields) {
      if (!(field in record) || record[field] === null) {
        return false;
      }
    }
  }
  
  return true;
}

// Format soil data for display in UI
export function formatSoilParameter(name: string, value: number): string {
  switch (name) {
    case 'N':
      return `${value} mg/kg`;
    case 'P':
      return `${value} mg/kg`;
    case 'K':
      return `${value} mg/kg`;
    case 'pH':
      return value.toFixed(1);
    case 'Moisture':
      return `${value}%`;
    default:
      return `${value}`;
  }
}

// Get status color based on parameter value
export function getStatusColor(parameter: string, value: number): string {
  switch (parameter) {
    case 'N':
      return value < 20 ? 'error' : value < 40 ? 'warning' : 'success';
    case 'P':
      return value < 10 ? 'error' : value < 25 ? 'warning' : 'success';
    case 'K':
      return value < 15 ? 'error' : value < 30 ? 'warning' : 'success';
    case 'pH':
      return value < 5.5 || value > 8.5 ? 'error' : value < 6.0 || value > 7.5 ? 'warning' : 'success';
    case 'Moisture':
      return value < 10 ? 'error' : value < 20 || value > 60 ? 'warning' : 'success';
    default:
      return 'neutral';
  }
}