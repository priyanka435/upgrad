import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    // Perform base64 encoding (window.btoa()) on username and password
    const encodedCredentials = btoa(`${username}:${password}`);

    // Send a POST request to the backend with the encoded credentials
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`,
      },
    });

    if (response.ok) {
      // Assuming the backend sends back an access token
      const { accessToken } = await response.json();
      
      // Store the access token in SESSION_STORAGE
      sessionStorage.setItem('accessToken', accessToken);

      // Redirect to the BookShow page
      history.push('/bookshow');
    } else {
      // Handle login failure
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
