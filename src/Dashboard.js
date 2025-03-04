import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndCuentas = async () => {
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
        const { data: userData, error: userDataError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('mail', user.email) // Utiliza la columna correcta 'mail' en lugar de 'email'
          .single();

        if (userDataError) {
          console.error('Error fetching user data:', userDataError);
        } else {
          setUser(userData);

          // Realiza la consulta para obtener las cuentas asociadas al usuario
          const { data: cuentaUsuarios, error: cuentaUsuariosError } = await supabase
            .from('cuenta_usuarios')
            .select('cuenta_id')
            .eq('usuario_id', userData.id);

          if (cuentaUsuariosError) {
            console.error('Error fetching cuenta_usuarios data:', cuentaUsuariosError);
          } else {
            const cuentaIds = cuentaUsuarios.map(cuentaUsuario => cuentaUsuario.cuenta_id);

            // Realiza la consulta para obtener los nombres de las cuentas
            const { data: cuentasData, error: cuentasDataError } = await supabase
              .from('cuentas')
              .select('nombre')
              .in('id', cuentaIds);

            if (cuentasDataError) {
              console.error('Error fetching cuentas data:', cuentasDataError);
            } else {
              setCuentas(cuentasData);
            }
          }
        }
      }

      setLoading(false);
    };

    fetchUserAndCuentas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {user && (
        <>
          <h1>Bienvenido, {user.nombre}</h1>
          <h2>Tus Cuentas:</h2>
          <ul>
            {cuentas.map((cuenta, index) => (
              <li key={index}>{cuenta.nombre}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;