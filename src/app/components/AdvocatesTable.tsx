"use client";

// src/app/types.ts (optional, for sharing types)
export type Advocate = {
  id?: string | number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

type AdvocatesTableProps = {
  advocates: Advocate[];
};

const AdvocatesTable: React.FC<AdvocatesTableProps> = ({ advocates }) => (
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
        {advocates.map((advocate, idx) => (
          <tr
            key={advocate.id ?? idx}
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
);

export default AdvocatesTable;