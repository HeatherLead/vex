import { auth , currentUser } from "@clerk/nextjs/server"
import {Liveblocks} from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { NextRequest, NextResponse } from "next/server"


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
    secret:"sk_dev_QxoITFOttgcah19WlcrwuMaevW_KnCla_hHMmrVuOAuCLOO5Uioym_T7mZp2FfKF"
})

export async function POST(request:NextRequest) {

    const authorization = await auth();
    const user = await currentUser()
    if(!authorization || !user) {
        return NextResponse.json('unauthorized' , {status: 403})

    }
    const {room} = await request.json()

    const board = await convex.query(api.board.get,{id:room})

    if(board?.orgId !== authorization.orgId){
        return NextResponse.json('unauthorized' , {status: 403})
    }

    const userInfo ={
        name: user.firstName|| "Teammate",
        picture: user.imageUrl,
    }

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    )

    if(room){
        session.allow(room, session.FULL_ACCESS)
    }
     
    const {status , body} = await session.authorize()
    return NextResponse.json(body, {status})
    
} 