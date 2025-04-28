"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching advocates...");
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        const data = await response.json();
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

  const onChange = (e) => {
    const searchTerm = e.target.value;
    console.log("searchTerm", searchTerm);
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");

    const checkSpecialties = (specialties) => {
      return specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    const filteredAdvocates = advocates.filter((advocate) => {
      console.log("advocate", advocate.specialties);
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
            onClick={onResetSearchClick}
          >
            Reset Search
          </button>
        </div>

        {/* Searching for */}
        <div className="mb-4 text-gray-600">
          {searchTerm && (
            <span>
              <span className="font-semibold">Searching for:</span> {searchTerm}
            </span>
          )}
        </div>

        {/* Error and Loading */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        {loading && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">Loading advocates...</div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">First Name</th>
                <th className="py-3 px-4 text-left font-semibold">Last Name</th>
                <th className="py-3 px-4 text-left font-semibold">City</th>
                <th className="py-3 px-4 text-left font-semibold">Degree</th>
                <th className="py-3 px-4 text-left font-semibold">Specialties</th>
                <th className="py-3 px-4 text-left font-semibold">Experience</th>
                <th className="py-3 px-4 text-left font-semibold">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map((advocate, idx) => (
                <tr
                  key={advocate.id || idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4">{advocate.firstName}</td>
                  <td className="py-2 px-4">{advocate.lastName}</td>
                  <td className="py-2 px-4">{advocate.city}</td>
                  <td className="py-2 px-4">{advocate.degree}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc list-inside space-y-1">
                      {advocate.specialties.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 text-center">{advocate.yearsOfExperience}</td>
                  <td className="py-2 px-4">{advocate.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
