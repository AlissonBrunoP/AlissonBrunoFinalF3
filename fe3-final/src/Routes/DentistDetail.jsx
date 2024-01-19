import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext/useAppContext';
import { actionTypes } from '../Context/AppContext/AppContext';
import doctorImg from '../images/doctor.jpg'
export function DentistDetail() {
  const { id } = useParams();
  const { state, dispatch } = useAppContext();
  const [dentist, setDentist] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/'+id).then(res => res.json()).then(data => setDentist(data))
  }, [id]);
  const handleAddToFavorites = () => {
    dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: dentist});
    const favs = [...state.favorites, dentist]
    localStorage.favs = JSON.stringify(favs)
  };

  const handleRemoveFromFavorites = () => {
    dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: dentist});
    const favs = state.favorites.filter(({id}) => id !== dentist.id)
    localStorage.favs = JSON.stringify(favs)
  };

  if (!dentist) {
    return <div>Cargando...</div>;
  }

  const isFavorite = state?.favorites?.some((favDentist) => favDentist.id === dentist.id);

  return (
    <main className='max-w-[1200px] w-full h-full mx-auto mb-8'>
      <div className='w-full flex flex-col div-pesado'>
      <h2 className='font-semibold text-[24px]'>Detalles del dentista</h2>
      <h3>{dentist.name}</h3>
        <img className='w-full sm:w-[25%] mb-4 rounded-md' src={doctorImg} alt="" />
      <p className='xl:flex xl:flex-col'><strong>Email:</strong> {dentist.email}</p>
          <p className='xl:flex xl:flex-col'><strong>Teléfono:</strong> {dentist.phone}</p>
          <p className='xl:flex xl:flex-col'><strong>Website:</strong> {dentist.website}</p>
      {isFavorite ? (
        <button onClick={handleRemoveFromFavorites} className='border-2 rounded-lg px-[8px] flex justify-center text-center mt-4 hover:bg-green-400 hover:text-white'>Eliminar de Favoritos</button>
      ) : (
        <button onClick={handleAddToFavorites} className='border-2 rounded-lg px-[8px] flex justify-center text-center mt-4 hover:bg-green-400 hover:text-white'>Agregar a Favoritos</button>
      )}
      </div>


      
    </main>
  );
}