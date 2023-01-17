import React, { useState } from 'react'
import Search from '../components/Search';
import { userProps } from '../types/user';
import User from '../components/User';
import Erro from '../components/Erro';

function Home() {
  const [user, setUser] = useState< userProps | null>(null)
  const [error, setError] = useState(false)
  const loadUser = async(userName: string) =>{
    setError(false);
    setUser(null)

    const res  = await  fetch (`http://api.github.com/users/${userName}`);
    const data = await res.json();
    if(res.status == 404){
      setError(true)
      return;
    }

    const {avatar_url, login, location, followers, following} = data;

    const userData: userProps ={ 
      avatar_url, 
      login, 
      location, 
      followers, 
      following,
    };
    setUser(userData)

    console.log(data);
  }
  return (
    <div>
        <Search loadUser={loadUser}/>
        {user && <User{...user}/>}
        {error && <Erro/>}
    </div>
  )
}

export default Home