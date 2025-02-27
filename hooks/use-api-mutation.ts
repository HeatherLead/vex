import { useState } from "react";

import { useMutation } from "convex/react";
import { mutation } from "@/convex/_generated/server";
import { error } from "console";
import { api } from "@/convex/_generated/api";

export const useApiMutation = (mutationFunction: any) =>{
    const [pending,setPending] = useState(false)
    const apiMutation = useMutation(mutationFunction)   

    const mutate = (payload: any) =>{
        setPending(true)
        return apiMutation(payload)
            .finally(()=> setPending(false))
            .then((result)=> {
                return result
            })
            .catch((error)  => {
                throw error
            })
    }
    return {
        mutate,
        pending
    }
}