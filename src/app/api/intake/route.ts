import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // TODO: Store in Supabase
    // const { error } = await supabase.from('intake_submissions').insert(data)

    // TODO: Send to ConvertKit for email tagging
    // await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, { ... })

    console.log('Intake submission:', data)

    return NextResponse.json({ success: true, message: 'Thank you! Your responses have been received.' })
  } catch (error) {
    console.error('Intake submission error:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 })
  }
}
