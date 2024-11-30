import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import AllUsers from "./Components/AllUser/AllUsers";



function App() {

  return (
    <div className="w-full mx-auto  bg-gray-50 min-h-screen font-Poppins">
      <Navbar />
      <div className="px-4 py-2">
        <Outlet />
      </div>

      <AllUsers />
      <Toaster/>
    </div>
  );
}

export default App;
