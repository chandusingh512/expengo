import { useContext } from 'react';
import { UserContext } from './context';

const LogoutButton = () => {
  const { logOutUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };





  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;