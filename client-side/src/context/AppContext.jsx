import { Children, createContext, useContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true ; 
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL ;

export const AppContext = createContext()

export const AppContextProvider =({children})=>{
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [clothes, setClothes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUser = async()=>{
    try {
      const res = await axios.get('/isUser')
       console.log(res.data.user.clothesPost)
      if(res.data.success) {
        setUser(res.data.user)
        setLoading(false)
      }else{
         setUser(null)
        setLoading(false)
      }
      //  toast.error(res.data.message)
    } catch (error) {
      // toast.error(error.message)
     console.log(error.message)
      
    }
  }
  console.log('clothes : ', clothes)

  const fetchAllClothes = async()=>{
    try {
      const res = await axios.get('/getAllClothes')
       console.log(res.data)
      if(res.data.success) {
        setClothes(res.data.data)
        setLoading(false)
      }else{
         setClothes(null)
        setLoading(false)
      }
      //  toast.error(res.data.message)
    } catch (error) {
      // toast.error(error.message)
     console.log(error.message)
      
    }
  }
console.log('user => ', user)
  const selectItem = async(id)=>{
    if(!user) return toast.error("Please log in to continue.")
    if(user.role === 'sharer') return toast.error("Only Finder can select the item.")
    try {
      const res = await axios.post('/select-item', {id})
      if (res.data.success) {
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
     toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchUser()
    fetchAllClothes()
  },[])
  const value = {axios, navigate,
     user, setUser,
      loading, setLoading,
       clothes, setClothes,
      selectItem,}
 return   <AppContext.Provider value={value}>
        {loading ? 'Loading...' : children}
    </AppContext.Provider>

}

export const useAppContext =()=>{
  return useContext(AppContext)
}