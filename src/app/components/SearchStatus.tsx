"use client";

type SearchStatusProps = {
  searchTerm: string;
};

const SearchStatus: React.FC<SearchStatusProps> = ({ searchTerm }) => {
  return (
    <div className="mb-4 text-gray-600">
      {searchTerm && (
        <span>
          <span className="font-semibold">Searching for:</span> {searchTerm}
        </span>
      )}
    </div>
  );
}

export default SearchStatus;