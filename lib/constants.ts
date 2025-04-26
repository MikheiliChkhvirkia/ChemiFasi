export const DEBOUNCE_DELAY = 500;
export const MIN_SEARCH_LENGTH = 3;

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'რელევანტურობა' },
  { value: 'price-asc', label: 'ფასი: დაბალი - მაღალი' },
  { value: 'price-desc', label: 'ფასი: მაღალი - დაბალი' },
  { value: 'discount', label: 'ფასდაკლება' },
] as const;

export const FALLBACK_IMAGE = 'https://placehold.co/400x400/png';