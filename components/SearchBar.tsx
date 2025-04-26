'use client';

import { useState } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryInfo } from '@/lib/types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImageSearch: (imageUrl: string) => void;
  isLoading?: boolean;
  selectedCategory?: CategoryInfo | null;
}

export function SearchBar({ onSearch, onImageSearch, isLoading, selectedCategory }: SearchBarProps) {
  const [query, setQuery] = useState('');
  // Commented out image search functionality
  // const [isImageSearch, setIsImageSearch] = useState(false);

  const handleSearch = () => {
    if (isLoading) return;
    onSearch(query);
    // Commented out image search functionality
    // if (isImageSearch) {
    //   onImageSearch(query);
    // } else {
    //   onSearch(query);
    // }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  // Commented out image search functionality
  // const toggleSearchMode = () => {
  //   setIsImageSearch(!isImageSearch);
  //   setQuery('');
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // if (!isImageSearch) {
    onSearch(newQuery);
    // }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={
              selectedCategory
                ? `ძიება ${selectedCategory.title}-ში...`
                : "ძიება პროდუქტის სახელით..."
            }
            value={query}
            onChange={handleInputChange}
            className="w-full h-12 pl-12 pr-10 bg-gray-100 border-gray-200 rounded-lg focus:border-black focus:ring-black text-lg"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSearch();
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute left-4 top-0 bottom-0 flex items-center">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>
          {query && !isLoading && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-gray-200"
              onClick={handleClear}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        {/* Commented out image search button
        <Button 
          variant="outline"
          size="default"
          onClick={toggleSearchMode}
          className="hidden sm:flex h-12 px-6 hover:bg-gray-100"
          disabled={isLoading}
        >
          {isImageSearch ? 'ტექსტით ძიება' : 'სურათით ძიება'}
        </Button>
        */}
        <Button 
          onClick={handleSearch}
          size="default"
          className="h-12 px-8 bg-black hover:bg-black/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'ძიება'
          )}
        </Button>
      </div>
    </div>
  );
}