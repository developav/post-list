import { User } from '../../api/User';
import { FC } from 'react';
import {
  getColorIndexByUsername,
  getColorByIndex,
  getGradientByIndex,
} from './getColorByUsername';
import "./UserView.css";


export interface UserViewProps {
  user: User
}

export const UserView: FC<UserViewProps> = ({ user }) => {
  const colorIndex = getColorIndexByUsername(user.username);

  return (
    <div className="user-view">
      <div className="user-view__logo"
       style={{ background: getGradientByIndex(colorIndex) }}>
        {user.username.slice(0, 1).toUpperCase()}
      </div>
      <span
       style={{ color: getColorByIndex(colorIndex) }}
        className="user-view__name">{user.username}</span>
    </div>
  );
};
