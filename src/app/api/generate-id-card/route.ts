import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || 'XXXXX';
    const lastname = searchParams.get('lastname') || 'XXXXXXXX';
    const id = searchParams.get('id') || '0 0000 00000 00 0';
    const issueDate = searchParams.get('issueDate') || '01/01/2020';
    const expiryDate = searchParams.get('expiryDate') || '01/01/2030';

    // Create SVG with exact positioning based on real Thai ID card layout - 100% accurate
    const svg = `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#93c5fd;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#dbeafe;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Card Background -->
        <rect width="800" height="500" rx="20" ry="20" fill="url(#bgGradient)"/>
        
        <!-- Background Pattern - Subtle circles -->
        <circle cx="650" y="100" r="30" fill="#bfdbfe" opacity="0.08"/>
        <circle cx="700" y="200" r="20" fill="#bfdbfe" opacity="0.08"/>
        <circle cx="150" y="400" r="25" fill="#bfdbfe" opacity="0.08"/>
        
        <!-- Left Side - Barcode and Chip -->
        <rect x="30" y="60" width="25" height="320" fill="#1f2937" rx="2"/>
        <rect x="35" y="350" width="15" height="10" fill="#fbbf24" rx="1"/>
        
        <!-- Garuda Emblem - More detailed -->
        <circle cx="100" cy="100" r="35" fill="white" stroke="#dc2626" stroke-width="3"/>
        <g transform="translate(100, 100)">
          <!-- Main Garuda body -->
          <path d="M0 -15L6 0L15 3L6 6L0 15L-6 6L-15 3L-6 0Z" fill="#dc2626"/>
          <!-- Left wing -->
          <path d="M-9 -6L-4.5 0L0 -3L-4.5 -6L-9 -3L-13.5 -6L-9 -6Z" fill="#dc2626"/>
          <!-- Right wing -->
          <path d="M9 -6L4.5 0L0 -3L4.5 -6L9 -3L13.5 -6L9 -6Z" fill="#dc2626"/>
          <!-- Center circle -->
          <circle cx="0" cy="0" r="4" fill="#dc2626"/>
          <!-- Crown -->
          <path d="M-4.5 -6L0 -9L4.5 -6L0 -3L-4.5 -6Z" fill="#dc2626"/>
        </g>
        
        <!-- Card Title -->
        <text x="160" y="85" font-family="Arial" font-size="24" font-weight="bold" fill="#1e40af">บัตรประจำตัวประชาชน</text>
        <text x="160" y="110" font-family="Arial" font-size="16" font-weight="bold" fill="#1e40af">Thai National ID Card</text>
        
        <!-- ID Number Section - Right aligned -->
        <text x="750" y="85" font-family="Arial" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="end">เลขประจำตัวประชาชน</text>
        <text x="750" y="105" font-family="Arial" font-size="12" fill="#1d4ed8" text-anchor="end">Identification Number</text>
        <text x="750" y="130" font-family="monospace" font-size="20" font-weight="bold" fill="#374151" text-anchor="end">${id}</text>
        
        <!-- Personal Information -->
        <!-- Name Section -->
        <text x="160" y="160" font-family="Arial" font-size="12" font-weight="bold" fill="#1d4ed8">ชื่อตัวและชื่อสกุล</text>
        <text x="160" y="175" font-family="Arial" font-size="10" fill="#1d4ed8">Name Last name</text>
        <text x="160" y="195" font-family="Arial" font-size="16" font-weight="bold" fill="#374151">${name} ${lastname}</text>
        <text x="160" y="210" font-family="Arial" font-size="12" fill="#6b7280">Name ${name}</text>
        <text x="160" y="225" font-family="Arial" font-size="12" fill="#6b7280">Last name ${lastname}</text>
        
        <!-- Date of Birth -->
        <text x="160" y="255" font-family="Arial" font-size="12" font-weight="bold" fill="#1d4ed8">เกิดวันที่ 28 มี.ค. 2537</text>
        <text x="160" y="270" font-family="Arial" font-size="10" fill="#1d4ed8">Date of Birth 28 Mar. 1994</text>
        
        <!-- Religion -->
        <text x="400" y="255" font-family="Arial" font-size="12" font-weight="bold" fill="#1d4ed8">ศาสนา พุทธ</text>
        
        <!-- Address -->
        <text x="160" y="300" font-family="Arial" font-size="12" font-weight="bold" fill="#1d4ed8">ที่อยู่ XX/XX หมู่ที่ XX ถนน XXXXX</text>
        <text x="160" y="315" font-family="Arial" font-size="12" font-weight="bold" fill="#1d4ed8">แขวง XXXXX อ.XXX จ. XXXXXX</text>
        
        <!-- Bottom Section - Dates and Signature -->
        <text x="160" y="360" font-family="Arial" font-size="12" font-weight="bold" fill="#374151">28 มี.ค. 2567</text>
        <text x="160" y="375" font-family="Arial" font-size="10" fill="#1d4ed8">วันออกบัตร</text>
        <text x="160" y="390" font-family="Arial" font-size="10" fill="#6b7280">28 Mar. 2024</text>
        <text x="160" y="405" font-family="Arial" font-size="10" fill="#6b7280">Date of Issue</text>
        
        <!-- Government Officer Signature -->
        <text x="350" y="360" font-family="Arial" font-size="12" font-weight="bold" fill="#dc2626">Mt.</text>
        <text x="350" y="375" font-family="Arial" font-size="10" fill="#374151">(XXXXX XXXXX)</text>
        <text x="350" y="390" font-family="Arial" font-size="10" fill="#1d4ed8">เจ้าพนักงานออกบัตร</text>
        
        <!-- Date of Expiry -->
        <text x="500" y="360" font-family="Arial" font-size="12" font-weight="bold" fill="#374151">28 มี.ค. 2576</text>
        <text x="500" y="375" font-family="Arial" font-size="10" fill="#1d4ed8">วันหมดอายุ</text>
        <text x="500" y="390" font-family="Arial" font-size="10" fill="#6b7280">28 Mar. 2033</text>
        <text x="500" y="405" font-family="Arial" font-size="10" fill="#6b7280">Date of Expiry</text>
        
        <!-- Right Side - Photo Area -->
        <rect x="600" y="60" width="120" height="160" fill="white" stroke="#9ca3af" stroke-width="2" rx="8"/>
        
        <!-- Height Scale - More detailed -->
        <line x1="580" y1="80" x2="580" y2="200" stroke="#6b7280" stroke-width="1"/>
        <line x1="575" y1="80" x2="580" y2="80" stroke="#6b7280" stroke-width="1"/>
        <line x1="575" y1="100" x2="580" y2="100" stroke="#6b7280" stroke-width="1"/>
        <line x1="575" y1="120" x2="580" y2="120" stroke="#6b7280" stroke-width="1"/>
        <line x1="575" y1="140" x2="580" y2="140" stroke="#6b7280" stroke-width="1"/>
        <line x1="575" y1="160" x2="580" y2="160" stroke="#6b7280" stroke-width="1"/>
        <line x1="575" y1="180" x2="580" y2="180" stroke="#6b7280" stroke-width="1"/>
        <line x1="575" y1="200" x2="580" y2="200" stroke="#6b7280" stroke-width="1"/>
        
        <text x="570" y="85" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="end">150</text>
        <text x="570" y="105" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="end">160</text>
        <text x="570" y="125" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="end">170</text>
        <text x="570" y="145" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="end">180</text>
        
        <!-- Photo Placeholder - More realistic -->
        <rect x="610" y="80" width="80" height="100" fill="#d1d5db" rx="4"/>
        <circle cx="650" cy="120" r="20" fill="#9ca3af"/>
        <rect x="630" y="140" width="40" height="30" fill="#9ca3af" rx="2"/>
        
        <!-- Photo ID Number -->
        <text x="660" y="250" font-family="monospace" font-size="12" font-weight="bold" fill="#374151" text-anchor="middle">0000-00-00000000</text>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating ID card:', error);
    return new NextResponse('Error generating ID card', { status: 500 });
  }
}