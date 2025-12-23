import { Children, createContext, useContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true ; 
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL ;

export const AppContext = createContext()

export const AppContextProvider =({children})=>{
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const fetchUser = async()=>{
    try {
      const res = await axios.get('/isUser')
       console.log(res.data)
      if(res.data.success) return setUser(res.data.user)
      //  toast.error(res.data.message)
    } catch (error) {
      // toast.error(error.message)
     console.log(error.message)
      
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])
  const value = {axios, user, setUser, navigate, }
 return   <AppContext.Provider value={value}>
            {children}
    </AppContext.Provider>

}

export const useAppContext =()=>{
  return useContext(AppContext)
}