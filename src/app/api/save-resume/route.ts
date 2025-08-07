import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
  
  try {
    const data = await req.json()
    const filePath = path.join(process.cwd(), '/data', 'resume-data.json')

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
