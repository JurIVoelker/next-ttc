// import { NextRequest, NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";

// export async function POST(request: NextRequest) {
//   const secret = request.nextUrl.searchParams.get("secret");

//   if (secret !== process.env.REVALIDATION_SECRET) {
//     return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
//   }

//   const path = request.nextUrl.searchParams.get("path") || "/";

//   revalidatePath(path);

//   return NextResponse.json({ revalidated: true, now: Date.now() });
// }

import type { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const secret = req.query.secret;
  const path = req.query.path;

  const { REVALIDATION_SECRET } = process.env;

  if (!REVALIDATION_SECRET)
    return res
      .status(500)
      .json({ message: "REVALIDATION_SECRET is not defined" });

  if (!secret || !path)
    return res
      .status(400)
      .json({ message: "secret and path are required fields" });

  if (secret !== REVALIDATION_SECRET)
    return res.status(401).json({ message: "secret is invalid" });

  try {
    await res.revalidate(path.toString());
  } catch (error) {
    return res.status(500).json({ message: `Could not revalidate ${path}` });
  }
  return res
    .status(200)
    .json({ message: `${path} was successfully revalidated` });
}
