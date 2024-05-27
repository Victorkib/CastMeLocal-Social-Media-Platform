// src/components/UserSearch.js
import { useState } from 'react';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    distance: '',
    gender: '',
    age: '',
    hourlyRate: '',
    ethnicity: '',
  });

  const handleSearch = () => {
    // Implement search logic
  };

  return (
    <div>
      <h2>User Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by username"
      />
      <div>
        <input
          type="text"
          value={filters.distance}
          onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
          placeholder="Distance"
        />
        <input
          type="text"
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          placeholder="Gender"
        />
        <input
          type="text"
          value={filters.age}
          onChange={(e) => setFilters({ ...filters, age: e.target.value })}
          placeholder="Age"
        />
        <input
          type="text"
          value={filters.hourlyRate}
          onChange={(e) =>
            setFilters({ ...filters, hourlyRate: e.target.value })
          }
          placeholder="Hourly Rate"
        />
        <input
          type="text"
          value={filters.ethnicity}
          onChange={(e) =>
            setFilters({ ...filters, ethnicity: e.target.value })
          }
          placeholder="Ethnicity"
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default UserSearch;
