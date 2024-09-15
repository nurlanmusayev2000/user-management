import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/action/action';
import '../styles/styles.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface TableProps {
  fetchAllData: () => void;
  allData: User[];
}

const Table: React.FC<TableProps> = (props) => {
  const [userData, setUserData] = useState<User[]>([]); // State for storing user data
  const [searchFields, setSearchFields] = useState({
    searchName: '',
    searchUsername: '',
    searchEmail: '',
    searchPhone: '',
  });

  useEffect(() => {
    props.fetchAllData();  // Trigger Redux action to fetch data
  }, [props.fetchAllData]);

  useEffect(() => {
    if (props.allData) {
      setUserData(props.allData); // Set the data from props (Redux store)
    }
  }, [props.allData]);

  // Handle input changes for the search form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Filtering logic for search fields
  const filteredData = userData.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(searchFields.searchName.toLowerCase());
    const usernameMatch = user.username.toLowerCase().includes(searchFields.searchUsername.toLowerCase());
    const emailMatch = user.email.toLowerCase().includes(searchFields.searchEmail.toLowerCase());
    const phoneMatch = user.phone.includes(searchFields.searchPhone);

    return (
      (searchFields.searchName === '' || nameMatch) &&
      (searchFields.searchUsername === '' || usernameMatch) &&
      (searchFields.searchEmail === '' || emailMatch) &&
      (searchFields.searchPhone === '' || phoneMatch)
    );
  });

  // Map the filtered data to the table rows
  const dataMap = filteredData.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
    </tr>
  ));

  return (
    <div>
      <form id="search" name="search">
        <label htmlFor="searchName">Search by Name</label>
        <input
          type="text"
          id="searchName"
          name="searchName"
          value={searchFields.searchName}
          onChange={handleInputChange}
        />
        <label htmlFor="searchUsername">Search by Username</label>
        <input
          type="text"
          id="searchUsername"
          name="searchUsername"
          value={searchFields.searchUsername}
          onChange={handleInputChange}
        />
        <label htmlFor="searchEmail">Search by Email</label>
        <input
          type="text"
          id="searchEmail"
          name="searchEmail"
          value={searchFields.searchEmail}
          onChange={handleInputChange}
        />
        <label htmlFor="searchPhone">Search by Phone</label>
        <input
          type="text"
          id="searchPhone"
          name="searchPhone"
          value={searchFields.searchPhone}
          onChange={handleInputChange}
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{dataMap}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    allData: state.data,  // Ensure that 'data' directly holds the array
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAllData: () => dispatch(fetchData()), // Dispatch the fetch action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
