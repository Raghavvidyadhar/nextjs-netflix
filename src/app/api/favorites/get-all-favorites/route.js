import  connectToDB from "@/database";


import { NextResponse } from "next/server";
import Favorites from "../../../../models/Favorite";

export const dynamic = "force-dynamic"
export async function GET (req){
    try{
        await connectToDB();
const {searchParams} = new URL(req.url)
const id = searchParams.get('id')
const accountID = searchParams.get('accountID')

const getAllFavorites =  await Favorites.find({uid :id , accountID})
if(getAllFavorites){
    return NextResponse.json({
        success : true,
        data : getAllFavorites
    });
}else{
    return NextResponse.json({
        success: true,
        message: "Something went wrong",
    });
}

    }catch(e){
        console.log(e);
        return NextResponse.json({
            success: false,
            message : "Something went wrong",
        })
    }
}