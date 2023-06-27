import React, { useState } from 'react';
import Card from '../shared/sharedComponents/uiElements/Card';

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <Card>
      <h2>LOGIN WYMAGANY</h2>
    </Card>
  );
}
