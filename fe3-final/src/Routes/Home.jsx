import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppContext } from '../Context/AppContext/useAppContext';
import { actionTypes } from '../Context/AppContext/AppContext';
import doc from '../images/doctor.jpg'
import './Home.css'

export function Home() {
  const [dentists, setDentists] = useState([]);

  const { state, dispatch } = useAppContext();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(data => setDentists(data))
  }, []);

  const isFavorite = (id) => state.favorites.some((favDentist) => favDentist.id === id)


  const handleAddToFavorites = (id) => {
    const dentist = dentists.find(dentist => dentist.id === id)
    dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: dentist});
    const favs = [...state.favorites, dentist]
    localStorage.favs = JSON.stringify(favs)
  };

  const handleRemoveFromFavorites = (id) => {
    const dentist = dentists.find(dentist => dentist.id === id)
    dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: dentist});
    const favs = state.favorites.filter(({id}) => id !== dentist.id)
    localStorage.favs = JSON.stringify(favs)
  };

  
  return (
    <main id='contenedorDoctores' >
      <h2 className='tituloHome'>Home</h2>
      <section className='listaDentistas'>
      {dentists.map((dentist) => (
        
        <article className="doctor-container" key={dentist.id}> 
      
         <img className='imgDoctor' src= {doc} alt="" />
          {isFavorite(dentist.id) ? 
          <AiFillHeart onClick={() => handleRemoveFromFavorites(dentist.id)}/> : 
          <AiOutlineHeart className=' cursor-pointer'onClick={() => handleAddToFavorites(dentist.id)}/>}
          <Link to={`/dentist/${dentist.id}`} className="doctor-container">
            <h3 className='w-[80%]'>{dentist.name}</h3>
          </Link>
    
            <Link to={`/dentist/${dentist.id}`} className='border-2 rounded-lg px-[8px] flex justify-center w-full text-center mt-4 hover:bg-green-400 hover:text-white'>
              Ver Perfil
            </Link>
        </article>
      ))}
      </section>

    </main>
  );
}