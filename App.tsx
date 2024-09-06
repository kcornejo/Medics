import React, {useState} from 'react';
import {
  LoadContext,
  UserContext,
  AlertMedicsContext,
} from './src/support/Context';
import {NativeBaseProvider} from 'native-base';
import Loading from './src/support/Loading';
import Login from './src/security/Login';
import Main from './src/Main';
import {LogBox} from 'react-native';
function App() {
  React.useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({
    auth: false,
    email: '',
  });
  const [alerts, setAlerts] = useState({
    title: '',
    message: '',
    type: '',
    show: false,
  });
  return (
    <LoadContext.Provider value={[load, setLoad]}>
      <UserContext.Provider value={[user, setUser]}>
        <AlertMedicsContext.Provider value={[alerts, setAlerts]}>
          <NativeBaseProvider>
            <Loading />
            {!user.auth ? <Login></Login> : <Main></Main>}
          </NativeBaseProvider>
        </AlertMedicsContext.Provider>
      </UserContext.Provider>
    </LoadContext.Provider>
  );
}

export default App;
