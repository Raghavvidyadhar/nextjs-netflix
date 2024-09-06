import connectToDB from "@/database";

import { NextResponse } from "next/server";
import Favorites from "../../../../models/Favorite";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Favorite item ID is required",
      });
    }

    const deleteFavorites = await Favorites.findByIdAndDelete(id);

    if (deleteFavorites) {
      return NextResponse.json({
        success: true,
        message: "Removed from your Favorites",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went wrong",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something Went wrong",
    });
  }
}