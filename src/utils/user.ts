import { User } from "screens/project-list/search-panel"
import { useHttp } from "./http"
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useAsync } from "./use-async"

export const useUers = (param?:Partial<User>) => {
    const client = useHttp()
    const {run,...result} = useAsync<User[]>()

    useEffect(() =>{
        run(client("users",{data:cleanObject(param || {})}))
    },[param])

    return result
}