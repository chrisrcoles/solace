"use client";

type SearchBarProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 w-full">
        <label className="block text-gray-700 font-medium mb-1">Search</label>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={onChange}
          placeholder="Search by name, city, specialty, etc."
        />
      </div>
      <button
        className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={onClick}
      >
        Reset Search
      </button>
    </div>
  );
}

export default SearchBar;