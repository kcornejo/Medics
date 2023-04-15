import React, {useState} from 'react';
import {LoadContext, UserContext} from './src/support/Context';
import {NativeBaseProvider} from 'native-base';
import Loading from './src/support/Loading';
import Login from './src/security/Login';
function App() {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({
    auth: false,
    email: '',
  });
  return (
    <LoadContext.Provider value={[load, setLoad]}>
      <UserContext.Provider value={[user, setUser]}>
        <NativeBaseProvider>
          {!user.auth ? <Login></Login> : <></>}
          <Loading />
        </NativeBaseProvider>
      </UserContext.Provider>
    </LoadContext.Provider>
  );
}

export default App;
