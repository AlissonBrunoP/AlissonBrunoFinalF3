import React, { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.length < 3) {
      setFormError('Por favor, ingresa un nombre completo válido (más de 3 caracteres).');
      setFormSuccess('');
    } else if (!isValidEmail(formData.email)) {
      setFormError('Por favor, ingresa una dirección de correo electrónico válida.');
      setFormSuccess('');
    } else {
      setFormSuccess(`Gracias ${formData.username}, te contactaremos pronto vía correo electrónico.`);
      setFormError('');
      setFormData({
        fullName: '',
        email: '',
      });
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <main className='max-w-[1200px] w-full h-full mx-auto mb-8'>
<form onSubmit={handleSubmit} className="bg-white dark:bg-[#0C134F] shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 form-resizer">
  <div className="mb-4">
    <label
      className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
      htmlFor="username"
    >
      Nombre Completo
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="username"
      type="text"
      name="username"
      value={formData.username}
      onChange={handleInputChange}
      placeholder="Nombre Completo"
    />
  </div>
  <div className="mb-6">
    <label
      className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
      htmlFor="email"
    >
      Email
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="email"
      type="email"
      placeholder="Ingrese su email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
    />
  </div>
  <div className="flex items-center justify-between">
    <button
      className="bg-[#1D267D] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Enviar
    </button>
  </div>
</form>
{formError && <p className='text-red-500 dark:text-white'>{formError}</p>}
      {formSuccess && <p className='text-green-500 dark:text-white'>{formSuccess}</p>}
    </main>
  );
}