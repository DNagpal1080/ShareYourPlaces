import React, { useEffect, useState } from 'react';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import UserList from '../components/UsersList';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  // const USERS =
  //     [
  //         { id: 'u1', name: 'Deepak Nagpal', image: 'https://picsum.photos/50/50', places: [0] },
  //         { id: 'u2', name: 'Mamta Nagpal', image: 'https://picsum.photos/50/50', places: [9] },
  //         { id: 'u3', name: 'Amayra Nagpal', image: 'https://picsum.photos/50/50', places: [8] }
  //     ]

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
