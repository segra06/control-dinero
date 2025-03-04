import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Obtén la sesión actual
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('Error fetching session:', error);
        return;
      }

      // Obtén el usuario autenticado desde la sesión
      const user = session.user;

      if (user) {
        // Realiza la consulta para obtener la información del usuario en la tabla 'usuarios'
        const { data, error: userDataError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('mail', user.email) // Utiliza la columna correcta 'mail' en lugar de 'email'
          .single();

        if (userDataError) {
          console.error('Error fetching user data:', userDataError);
        } else {
          setUser(data);
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {user && (
        <h1>Bienvenido, {user.nombre}</h1>
      )}
    </div>
  );
};

export default Dashboard;