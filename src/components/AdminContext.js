import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import UseLocalStorage from './LocalStorage'

const admincontext = React.createContext()

export function UseadminContext() {
  return useContext(admincontext)
}

//logged in as the current local user in the localstorage
export function AdminContextProvider({ children }) {
  const [fetchedLanguage, setfetchedLanguage] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setuser] = useState([])

  const [LocalUser, setLocalUser, removeLocalUser] = UseLocalStorage(
    'UserLoggedIn',
    [],
  )

  const fetchUser = async () => {
    //  try {
    //      await axios
    //          .get("")
    //          .then((res) => {
    //              setuser(res.data);
    //              setLocalUser(res.data);
    //          })
    //          .catch((error) => {
    //              if (error.response.status == 401) {
    //                  removeLocalUser();
    //              }
    //             //  console.log(error);
    //          });
    //  } catch (error) {
    //      console.log(error);
    //  }
  }

  const setNewUser = (data) => {
    console.log('am called')
    setLocalUser(data)
    return fetchUser()
  }
  const EmptyUser = () => {
    removeLocalUser()
    return setuser([])
  }
  const getLanguage = async () => {
    try {
      await axios.get('/api/language').then((res) => {
        setfetchedLanguage(res.data)
      })
    } catch (err) {}
  }
  useEffect(() => {
    if (loading) {
      console.log(LocalUser)
      // getLanguage();
      // fetchUser();
      setLoading(false)
    }

    return () => {
      setLoading(false)
    }
  }, [LocalUser])

  return (
    <admincontext.Provider
      value={{ fetchedLanguage, user, setNewUser, LocalUser, EmptyUser }}
    >
      {children}
    </admincontext.Provider>
  )
}
