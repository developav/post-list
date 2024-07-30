import { FC, FormEventHandler, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { FormField } from '../FormField';
import { Button } from '../Button';
import './LoginForm.css';
import { login } from '../../api/User';
import { queryClient } from '../../api/queryClient';



export const LoginForm: FC = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key:string]:string}>({})

  useEffect(()=>{
    setErrors({})
  }, [email, password])

  const loginMutation = useMutation(
    {
    mutationFn: () => login(email, password),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["users", "me"]})
      setUsername('')
      setPassword('')
    },
    onError(error: any){
      if(error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors({general: 'Произошла ошибка. Попробуйте еще раз'});
      }
    }
  },
   queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if(validateForm()) {
      loginMutation.mutate()
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const errors:{[key:string]: string}={};
    if(!email){
      errors.email="Введите адрес электронной почты";
      formIsValid = false;
    }
    if (!password) {
      errors.password = 'Введите пароль';
      formIsValid = false;
    }

    setErrors(errors);

    return formIsValid;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Имя пользователя" errorMessage={errors.email}>
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={email}
        />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password}>
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>
      {errors.general && <span className="error-message">{errors.general}</span>}

      <Button type='submit' title="Войти" isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
