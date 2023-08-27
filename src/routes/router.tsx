import { createBrowserRouter } from 'react-router-dom';
import UpcomingMatches from '../pages/home/UpcomingMatches';
import MainLayout from '../layouts/mainLayout/MainLayout';
import Team from '../pages/team/Team';
import PickPlayers from '../pages/pickPlayers/PickPlayers';
import SelectCaptain from '../pages/selectCaptain/SelectCaptain';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <UpcomingMatches />
      },
      {
        path: '/teams/:id',
        element: <Team />
      },
      {
        path: '/pick-players/:id',
        element: <PickPlayers />
      },
      {
        path: '/select-captain/:id',
        element: <SelectCaptain />
      }
    ]
  }
]);
