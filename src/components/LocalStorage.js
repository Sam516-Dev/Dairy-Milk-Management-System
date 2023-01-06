import React,{useState,useEffect,useCallback} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

//the LocalStorage
export default function LocalStorage(key, intialValue)
{
    const navigate = useNavigate()
    const PREFIX ='MOVIESEnt-'
    const prefixKey = PREFIX + key;
    const [value, setValue] = useState(() =>
    {
        const JsonValue = localStorage.getItem(prefixKey);
        if (JsonValue !== null) return JSON.parse(JsonValue);
        if (typeof intialValue ==='function') {
            intialValue();
        } else {
            return intialValue
        }
            
        
    })
    const removeValue = useCallback(
        () => {
             localStorage.removeItem(prefixKey);
            setValue([]) 
            navigate('/')
        },
        [],
    )
       
   //use effect re-renders the page incase there is any change 
    useEffect(() =>
    { 
        if (value === undefined) return  localStorage.removeItem(prefixKey) 
        localStorage.setItem(prefixKey, JSON.stringify(value));
    },
    [value, prefixKey])

    return [value, setValue, removeValue]
}


