"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import SearchStatus from "@/app/components/SearchStatus";
import AdvocatesTable from "@/app/components/AdvocatesTable";
import { Advocate } from "@/app/types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching advocates...");
    const fetchAdvocates = async (): Promise<void> => {
      try {
        const response = await fetch("/api/advocates");
        type ApiResponse = { data: Advocate[] };

        const data: ApiResponse = await response.json();
        setAdvocates(data.data);
        setFilteredAdvocates(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    console.log("searchTerm", searchTerm);
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");

    const checkSpecialties = (specialties: string[]) => {
      return specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    const filteredAdvocates = advocates.filter((advocate) => {
      // console.log("advocate", advocate.specialties);
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkSpecialties(advocate.specialties) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onResetSearchClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Solace Advocates</h1>

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onChange={onChange}
          onClick={onResetSearchClick}
        />
        
        {/* Searching for */}
        <SearchStatus searchTerm={searchTerm} />

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        {/* Loading and Table */}
        {loading ? (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">Loading advocates...</div>
        ) : (   
          <AdvocatesTable advocates={filteredAdvocates} />
        )}
      </div>
    </main>
  );
}
