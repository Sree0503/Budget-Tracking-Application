import {useState, useEffect} from "react";
export default function useLocalStorage(key,defaultValue){
    const[value,setValue]=useState(()=>{
        const jsonValue=localStorage.getItem(key)
        if(jsonValue!=null) return JSON.parse(jsonValue)
        if(typeof defaultValue==="function"){
            return defaultValue()
        }
        else
        {
            return defaultValue
        }
    })
    
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])
    return [value,setValue]
}
 

// function MyComponent(){
//     const [count,setCount]=useState(0);
//     useEffect(()=>{
//         console.log.apply('Count has changed!');
//     },[count]);
//     return(
//         <div>
//             <p>Count:{count}</p>
//             <button onClick={()=>setCount(count+1)}>Increase</button>
//         </div>
//     );
// }

// export default MyComponent;