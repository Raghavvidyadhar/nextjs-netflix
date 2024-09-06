import connectToDB from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export const dynamic = "force-dynamic";
export async function POST(req) {
    try {
        await connectToDB();
        const { name, pin, uid } = await req.json();

        // Check if account with the same uid and name already exists
        const isAccountAlreadyExists = await Account.find({ uid, name });
        console.log(isAccountAlreadyExists);

        if (isAccountAlreadyExists && isAccountAlreadyExists.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Please try with a different name",
            });
        }

        // Check if user already has 5 accounts
        const allAccounts = await Account.find({ uid });
        if (allAccounts && allAccounts.length === 5) {
            return NextResponse.json({
                success: false,
                message: "You can only add a maximum of 5 accounts",
            });
        }

        // If no issues, proceed to create the account
        const hashPin = await hash(pin, 12);
        const newlyCreatedAccount = await Account.create({
            name,
            pin: hashPin,
            uid,
        });

        if (newlyCreatedAccount) {
            return NextResponse.json({
                success: true,
                message: "Account created successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong",
            });
        }

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        });
    }
}
