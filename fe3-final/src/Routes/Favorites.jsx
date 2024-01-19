import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext/useAppContext';
import { IoClose } from "react-icons/io5";
import { actionTypes } from '../Context/AppContext/AppContext';


export function Favorites() {
  const { state, dispatch } = useAppContext();

  const handleRemoveFromFavorites = (favorite) => {
    dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: favorite});
    const favs = state.favorites.filter(({id}) => id !== favorite.id)
    localStorage.favs = JSON.stringify(favs)
  };

  return (
    <main className='max-w-[1200px] mx-auto overflow-auto flex flex-col gap-4 pb-4 h-full w-full'>
      <h2 className='font-semibold text-[24px]'>Dentistas destacados</h2>
      {state.favorites.length === 0 ? (
        <p className='p-loco'>No tienes dentistas destacados.</p>
      ) : (
        <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mx-1 h-full'>

        {state.favorites.map((favorite) => (
          <article className="card card-2 flex justify-between relative" key={favorite.id}>
            <IoClose onClick={() => handleRemoveFromFavorites(favorite)} className='cursor-pointer absolute text-white right-3 top-3' size='20px'/>
          <Link to={`/favorite/${favorite.id}`} className='card_link font-semibold'>
            <h3 className='w-[80%]'>{favorite.name}</h3>
          </Link>
          <p className='xl:flex xl:flex-col'><strong>Email:</strong> {favorite.email}</p>
          <p className='xl:flex xl:flex-col'><strong>Teléfono:</strong> {favorite.phone}</p>
          <p className='xl:flex xl:flex-col'><strong>Website:</strong> {favorite.website}</p>
            <Link to={`/dentist/${favorite.id}`} className='border-2 rounded-lg px-[8px] flex justify-center w-full text-center mt-4 hover:bg-green-400 hover:text-white'>
              Ver Perfil
            </Link>
        </article>
        ))}
      </section>)}
    </main>
  );
}