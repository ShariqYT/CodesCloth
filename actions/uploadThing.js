import { UTApi } from "uploadthing/server";

export const utapi = new UTApi(process.env.UPLOADTHING_SECRET);