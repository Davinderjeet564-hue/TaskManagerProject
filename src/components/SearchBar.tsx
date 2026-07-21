import React from 'react'
import { IoMdSearch } from 'react-icons/io';

interface SearchBarProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  searchTasks: (value: string) => void;
}

function SearchBar({ inputRef, searchValue, setSearchValue, setIsSearching, searchTasks }: SearchBarProps) {
  return (
    <>
      <input
        type="text"
        ref={inputRef}
        className="w-full border border-gray-300 rounded-md p-4 pl-4 pr-12 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-hidden dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:outline-hidden transition-colors duration-300"
        placeholder="Search Task"
        value={searchValue}
        onChange={(e) => {
          const value = e.target.value;
          setSearchValue(value);
          setIsSearching(value.length > 0);
          searchTasks(value);
        }}
      />
      <IoMdSearch
        size={24}
        className="text-gray-500 dark:text-gray-400 absolute right-8 top-1/2 -translate-y-1/2 transition-colors duration-300 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 dark:focus:text-indigo-500"
        onClick={() => {
          inputRef?.current?.focus();
        }}
      />
    </>
  )
}

export default SearchBar