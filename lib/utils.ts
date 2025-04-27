import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-\s]+/g, '') // Remove hyphens and spaces
    .normalize('NFKD') // Normalize Unicode characters
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ka-GE', {
    style: 'currency',
    currency: 'GEL',
    minimumFractionDigits: 2,
  }).format(price);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function addUtmParams(url: string, storeName: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('utm_source', 'chemifasi');
    urlObj.searchParams.set('utm_medium', 'referral');
    urlObj.searchParams.set('utm_campaign', 'products');
    urlObj.searchParams.set('utm_content', storeName.toLowerCase());
    return urlObj.toString();
  } catch (error) {
    console.error('Invalid URL:', url);
    return url;
  }
}