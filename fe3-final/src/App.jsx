
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { useAppContext } from "./Context/AppContext/useAppContext";
import { Home, DentistDetail, Contact, Favorites } from "./Routes";


function App() {
  const { state } = useAppContext(); // Accede al estado global
  return (
      
  <div className={`${state.darkMode ? 'dark' : ''} xl:h-screen h-auto flex flex-col`}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dentist/:id" element={<DentistDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/favs" element={<Favorites />} />
      </Routes>
      <Footer/>

  </div>
  );
}

export default App;