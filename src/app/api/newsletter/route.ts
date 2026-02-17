import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const email = formData.get('email') as string

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // TODO: Subscribe to ConvertKit
    // const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
    // const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID
    // await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
    // })

    console.log('Newsletter signup:', email)

    return NextResponse.redirect(new URL('/?subscribed=true', req.url))
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
