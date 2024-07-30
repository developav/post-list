import { Button } from "../Button";
import { logout } from "../../api/User";
import { useState } from "react";
import { Account } from "../Account/Account";
import "./LogoutButton.css";


export const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogout = async () => {
    try {
      // Выполняем запрос на выход
      await logout();

      // Устанавливаем состояние isLoggedIn в false после успешного выхода
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Ошибка выхода из системы:", error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="logout-button">
          <Button kind="secondary" onClick={handleLogout}>Выйти</Button>
        </div>
      ) : (
        <div>
          <h1>Вы вышли из системы</h1>
          <Account />
        </div>
      )}
    </div>
  );
};