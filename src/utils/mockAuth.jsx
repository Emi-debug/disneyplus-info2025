export const mockLogin = (email, password) => {
  // Simulación de autenticación
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: email.split('@')[0],
    email: email,
    role: 'user',
    avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
  };
};

export const validateEmail = (email) => {
  return email.includes('@');
};

export const validatePassword = (password) => {
  return password.length >= 4;
};