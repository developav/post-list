import { FC, FormEventHandler, useState } from 'react';
import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const RegisterForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const registerMutation = useMutation(
    {
    mutationFn: () => registerUser(username, email, password)
  }, 
  queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    registerMutation.mutate();
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input 
        type='text'
        name='username'
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        />
      </FormField>
      <FormField label="Email">
        <input 
        type='email'
        name='email'
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        />
      </FormField>
      <FormField label="Пароль">
        <input 
         type='password'
         name='password'
         onChange={(event) => setPassword(event.target.value)}
         value={password}
         />
      </FormField>
      <Button type="submit" title="Зарегистрироваться" isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
