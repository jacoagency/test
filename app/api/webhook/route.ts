import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  try {
    const response = await fetch('https://hook.us1.make.com/78s6qcq96l83qdgbnuetncthmoyw27q8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false }, { status: 500 })
    }
  } catch (error) {
    console.error('Error sending webhook:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}