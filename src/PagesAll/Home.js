import { Button } from '@mui/material'
import { useContext } from 'react';
import { UserContext } from './context';
import Header from './Header';
import Navbar from './Navbar';

 
export default function Home() {
 const { logOutUser } = useContext(UserContext);

 // This function is called when the user clicks the "Logout" button.
 const logOut = async () => {
   try {
     // Calling the logOutUser function from the user context.
     const loggedOut = await logOutUser();
     // Now we will refresh the page, and the user will be logged out and
     // redirected to the login page because of the <PrivateRoute /> component.
     if (loggedOut) {
       window.location.reload(true);
     }
   } catch (error) {
     alert(error)
   }
 }
 
 return (
     <>
    <Navbar/>
      <div>


      <h1>Welcome to our Homepage!</h1>
      <p>Here you can find all the latest news and updates about our company.</p>
      <div/>
      
     <div>
    <Button variant="contained" onClick={logOut}>Logout</Button>
    </div> 
       </div>
   
   </>
 )
}