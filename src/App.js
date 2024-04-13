import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./PagesAll/context";
import Home from "./PagesAll/Home";
import Login from "./PagesAll/Login";
import PrivateRoute from "./PagesAll/PrivateRoute";
import Signup from "./PagesAll/Signup";

 
function App() {
 return (
   <BrowserRouter>
     {/* We are wrapping our whole app with UserProvider so that */}
     {/* our user is accessible through out the app from any page*/}
     <UserProvider>
       <Routes>
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/signup" element={<Signup />} />
         {/* We are protecting our Home Page from unauthenticated */}
         {/* users by wrapping it with PrivateRoute here. */}
         <Route element={<PrivateRoute />}>
           <Route exact path="/" element={<Home />} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;