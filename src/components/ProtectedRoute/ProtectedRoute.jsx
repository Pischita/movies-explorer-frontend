import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {

  const loggedIn = props.loggedIn || localStorage.getItem('loggedIn');

  return (
    <Route>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to='./signin' />
      }
    </Route>
  );
};

export default ProtectedRoute;
