import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      submittedAt: new Date().toISOString(),
    }

    // TODO: Store in Supabase
    // const { error } = await supabase.from('contact_submissions').insert(data)

    // TODO: Send email notification to Bryan
    // TODO: Add to ConvertKit

    console.log('Contact form submission:', data)

    // Redirect back with success
    return NextResponse.redirect(new URL('/contact?success=true', req.url))
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.redirect(new URL('/contact?error=true', req.url))
  }
}
