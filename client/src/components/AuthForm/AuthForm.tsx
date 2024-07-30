import { FC, useState } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

import "./AuthForm.css";

type AuthType = 'login' | 'register'

export const AuthForm: FC = () => {
  const [authType, setAuthType] = useState<AuthType>("login");

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "login" : "register",
    );
  };

  return (
    <div className="auth-form">
      <p className="auth-form__title">
        {authType === "register" ? "Регистрация" : "Авторизация"}
      </p>
      {authType === "register" ? <RegisterForm /> : <LoginForm />}
      <div className="auth-form__info">
        <span>
          {authType === "register" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}
        </span>
        <button className="auth-form__button" onClick={handleClick}>
          {authType === "register" ? "Войти" : "Создать аккаунт"}
        </button>
      </div>
    </div>
  );
};
