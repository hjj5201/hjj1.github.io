import { User } from "screens/project-list/search-panel"
import { useHttp } from "./http"
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useAsync } from "./use-async"
import { useQuery } from "react-query"


export const useUers = (param?: Partial<User>) => {
    const client = useHttp();
  
    return useQuery<User[]>(["users", param], () =>
      client("users", { data: param })
    );
  };


// export const useUers = (param?:Partial<User>) => {
//     const client = useHttp()
//     const {run,...result} = useAsync<User[]>()

//     useEffect(() =>{
//         run(client("users",{data:cleanObject(param || {})}))
//     },[param])

//     return result
// }