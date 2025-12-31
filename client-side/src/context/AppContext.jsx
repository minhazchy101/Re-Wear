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
  const navigate = useNavigate();scrollTo(0,0)
  const [user, setUser] = useState(null)
  const [clothes, setClothes] = useState([])
  const [clothesPost, setClothesPost] = useState([])
  const [loading, setLoading] = useState(true)
   const [selectItems, setSelectItems] = useState([]);


  const fetchUser = async()=>{
    try {
      const res = await axios.get('/isUser')
      if(res.data.success) {
        setUser(res.data.user)
        setClothesPost(res.data.user.clothesPost)
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
  console.log('clothesPost : ', clothesPost)

  const fetchAllClothes = async()=>{
    try {
      const res = await axios.get('/getAllClothes')
      //  console.log(res.data)
      if(res.data.success) {
        const clotheData = res.data.data.filter(clth => clth.status === "Available")

        setClothes(clotheData)
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
      console.log(res.data.data)
      if (res.data.success) {
          setSelectItems(user?.selectItems)
          toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
     toast.error(error.message)
    }
  }

  const removeSelectItem = async(id)=>{
    try {
      const res = await axios.get(`/remove-select/${id}`)
       if (res.data.success) {
        setSelectItems((prev) => prev.filter(o => o._id !== id));
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
     toast.error(error.message)
    }
  }
  
    const handleDelete = async(id)=>{
      try {
        const res = await axios.get(`/deleteClothe/${id}`)
       if (res.data.success) {
        //  await fetchUser()
        // await fetchAllClothes()
         setClothes((prev) => prev.filter((o) => o._id !== id));
          toast.success(res.data.message)
        }
        else{
          toast.error(res.data.message)
  
        }
      }  catch (error) {
        toast.error(error.response?.data?.message || "Failed to Delete item");
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
      selectItem, removeSelectItem,   handleDelete,
    clothesPost, setClothesPost,
  fetchUser, fetchAllClothes,
  selectItems, setSelectItems
}
 return   <AppContext.Provider value={value}>
        {loading ? 'Loading...' : children}
    </AppContext.Provider>

}

export const useAppContext =()=>{
  return useContext(AppContext)
}