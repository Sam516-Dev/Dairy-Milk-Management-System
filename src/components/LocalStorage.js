import React,{useState,useEffect,useCallback} from 'react'



export default function LocalStorage(key, intialValue)
{
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
           setValue({}) 
        },
        [],
    )
       
   
    useEffect(() =>
    { 
        if (value === undefined) return  localStorage.removeItem(prefixKey) 
        localStorage.setItem(prefixKey, JSON.stringify(value));
    },
    [value, prefixKey])

    return [value, setValue, removeValue]
}



// function LocalStorage() {
//     return ( 

//         <h1> LocalStorage </h1>
//      );
// }

// export default LocalStorage;