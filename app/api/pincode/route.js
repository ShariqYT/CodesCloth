import { NextResponse } from "next/server";
import pincodes from '../../../pincodes.json'
export async function GET(request) {

    // let pincodes ;

    return NextResponse.json(pincodes)
}