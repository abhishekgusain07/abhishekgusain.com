import { NextResponse } from 'next/server'
import { getAvailableLogs } from '@/lib/logs'

export async function GET() {
  try {
    const logs = getAvailableLogs()
    
    const response = NextResponse.json({
      success: true,
      logs,
      count: logs.length
    })

    // Add caching headers to reduce API calls
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')
    
    return response
  } catch (error) {
    console.error('Error in logs API:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch logs',
        logs: [],
        count: 0
      },
      { status: 500 }
    )
  }
} 