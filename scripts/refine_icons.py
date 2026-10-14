import subprocess, os

ICONS_DIR = "/Users/tomatoxcj/Downloads/gemini-problem/astro-blog/public/images/icons"
DL_DIR = "/Users/tomatoxcj/Downloads"

# Refined tools_svg: High-end 3D developer toolkit / crossed titanium wrench and screwdriver with glowing cyan/emerald energy
tools_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="titanium" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="cyan-glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="emerald-glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <radialGradient id="tool-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#tool-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Orbital tech particle ring -->
  <circle cx="256" cy="256" r="130" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="6 8" opacity="0.4"/>

  <!-- Crossed Tools -->
  <g filter="url(#shadow-main)">
    <!-- Wrench (Bottom-Left to Top-Right) -->
    <g transform="translate(256, 256) rotate(45)">
      <!-- Main body -->
      <rect x="-14" y="-120" width="28" height="240" rx="14" fill="url(#titanium)"/>
      <rect x="-6" y="-70" width="12" height="140" rx="6" fill="#334155"/>
      <!-- Neon energy strip in wrench handle -->
      <rect x="-2" y="-50" width="4" height="100" rx="2" fill="url(#cyan-glow)"/>
      
      <!-- Top Open Wrench Jaw -->
      <path d="M-36 -120 C-38 -95, 38 -95, 36 -120 L30 -145 C15 -135, -15 -135, -30 -145 Z" fill="url(#titanium)"/>
      <circle cx="0" cy="-115" r="16" fill="#18181b"/>
      <rect x="-9" y="-132" width="18" height="20" fill="#18181b"/>

      <!-- Bottom Closed Ring -->
      <circle cx="0" cy="120" r="28" fill="url(#titanium)"/>
      <circle cx="0" cy="120" r="15" fill="#18181b"/>
      <!-- Inner teeth -->
      <polygon points="0,108 5,114 -5,114" fill="#64748b"/>
      <polygon points="0,132 5,126 -5,126" fill="#64748b"/>
    </g>

    <!-- Screwdriver (Top-Left to Bottom-Right) -->
    <g transform="translate(256, 256) rotate(-45)">
      <!-- Metal shaft -->
      <rect x="-8" y="-140" width="16" height="160" rx="4" fill="#e2e8f0"/>
      <!-- Tip -->
      <polygon points="-8,-140 8,-140 4,-158 -4,-158" fill="#94a3b8"/>
      <!-- Ergonomic Grip Handle -->
      <rect x="-18" y="10" width="36" height="120" rx="18" fill="url(#emerald-glow)"/>
      <rect x="-12" y="25" width="24" height="90" rx="12" fill="#065f46"/>
      <rect x="-4" y="35" width="8" height="70" rx="4" fill="#34d399"/>
      <!-- Top Collar -->
      <rect x="-12" y="0" width="24" height="12" rx="4" fill="#1e293b"/>
    </g>

    <!-- Center Cyber Energy Reactor Hub -->
    <circle cx="256" cy="256" r="34" fill="#09090b" stroke="#0284c7" stroke-width="4"/>
    <circle cx="256" cy="256" r="24" fill="url(#cyan-glow)"/>
    <circle cx="256" cy="256" r="12" fill="#ffffff"/>
  </g>

  <!-- Glowing satellite telemetry dots -->
  <circle cx="160" cy="170" r="5" fill="#38bdf8"/>
  <circle cx="350" cy="340" r="4.5" fill="#34d399"/>
  <circle cx="360" cy="160" r="4" fill="#38bdf8"/>
</svg>'''

# Refined moyu_svg: Beautiful 3D Koi leaping over ripples with vibrant lotus/emerald drops
moyu_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="koi-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="40%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="koi-fin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#67e8f9" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.6"/>
    </linearGradient>
    <radialGradient id="moyu-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#moyu-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Water ripple rings -->
  <ellipse cx="256" cy="300" rx="145" ry="48" fill="none" stroke="#059669" stroke-width="3" opacity="0.3"/>
  <ellipse cx="256" cy="300" rx="95" ry="32" fill="none" stroke="#34d399" stroke-width="2.5" opacity="0.5"/>
  <ellipse cx="256" cy="300" rx="45" ry="16" fill="none" stroke="#6ee7b7" stroke-width="2" opacity="0.7"/>

  <!-- 3D Leaping Koi Fish -->
  <g filter="url(#shadow-main)">
    <!-- Dorsal Fin (Top wave) -->
    <path d="M220 180 C240 120, 290 125, 310 160 C280 165, 250 172, 220 180 Z" fill="url(#koi-fin)"/>

    <!-- Pectoral Fin (Bottom front) -->
    <path d="M190 240 C150 265, 130 300, 160 315 C185 300, 195 270, 190 240 Z" fill="url(#koi-fin)"/>

    <!-- Fish Main Muscular Body (Elegant leap arc) -->
    <path d="M140 245 C145 180, 220 150, 285 180 C345 205, 375 275, 360 320 C340 275, 305 245, 255 240 C205 235, 160 268, 140 245 Z" 
          fill="url(#koi-body)"/>

    <!-- Iridescent Back Highlight -->
    <path d="M165 230 C200 180, 265 170, 300 190" fill="none" stroke="#a7f3d0" stroke-width="6" stroke-linecap="round" opacity="0.8"/>

    <!-- Golden Koi Accent Patch -->
    <path d="M210 195 C230 180, 260 185, 275 205 C255 215, 230 215, 210 195 Z" fill="#fbbf24" opacity="0.9"/>

    <!-- Flowing Split Tail Fin -->
    <path d="M360 320 C390 340, 420 365, 420 330 C405 310, 385 305, 370 305 C385 285, 395 260, 370 265 C360 280, 355 305, 360 320 Z" 
          fill="url(#koi-fin)"/>

    <!-- Fish Eye (Luminous jewel) -->
    <circle cx="168" cy="230" r="10" fill="#0f172a"/>
    <circle cx="168" cy="230" r="7" fill="#fbbf24"/>
    <circle cx="166" cy="228" r="2.5" fill="#ffffff"/>

    <!-- Glowing airborne splash droplets -->
    <circle cx="185" cy="140" r="6" fill="#67e8f9" opacity="0.9"/>
    <circle cx="330" cy="150" r="7" fill="#67e8f9" opacity="0.85"/>
    <circle cx="365" cy="200" r="5" fill="#a7f3d0" opacity="0.9"/>
    <circle cx="140" cy="300" r="4.5" fill="#38bdf8" opacity="0.8"/>
  </g>
</svg>'''

# Refined news_svg: Radiant morning sunrise illuminating 3D modern newspaper / briefing codex
news_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="sun-core" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="45%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="paper-front" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <radialGradient id="news-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#news-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Radiant Sunrise Rays -->
  <g stroke="url(#sun-core)" stroke-width="5" stroke-linecap="round" opacity="0.8">
    <line x1="256" y1="85" x2="256" y2="60"/>
    <line x1="160" y1="110" x2="140" y2="90"/>
    <line x1="352" y1="110" x2="372" y2="90"/>
    <line x1="120" y1="180" x2="95" y2="180"/>
    <line x1="392" y1="180" x2="417" y2="180"/>
  </g>

  <!-- 3D Rising Sun Orb -->
  <g filter="url(#shadow-main)">
    <circle cx="256" cy="190" r="80" fill="url(#sun-core)"/>
    <ellipse cx="256" cy="150" rx="55" ry="30" fill="#ffffff" opacity="0.25"/>
  </g>

  <!-- 3D Morning Briefing Newspaper -->
  <g filter="url(#shadow-main)" transform="translate(256, 315)">
    <!-- Back drop sheet -->
    <rect x="-115" y="-65" width="230" height="125" rx="12" fill="#94a3b8" transform="rotate(-3)"/>
    <!-- Front main newspaper -->
    <rect x="-110" y="-60" width="220" height="120" rx="10" fill="url(#paper-front)"/>
    
    <!-- Masthead & Red Accent Pill -->
    <rect x="-92" y="-45" width="105" height="15" rx="3" fill="#0f172a"/>
    <rect x="25" y="-45" width="68" height="12" rx="2" fill="#ef4444"/>

    <!-- Headline text bars -->
    <line x1="-92" y1="-20" x2="92" y2="-20" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
    <line x1="-92" y1="-5" x2="92" y2="-5" stroke="#64748b" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="-92" y1="7" x2="50" y2="7" stroke="#64748b" stroke-width="3.5" stroke-linecap="round"/>

    <!-- News Thumbnail photo box & summary lines -->
    <rect x="-92" y="20" width="52" height="28" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="-30" y1="26" x2="92" y2="26" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
    <line x1="-30" y1="38" x2="70" y2="38" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>'''

updates = {
    "tools": tools_svg,
    "moyu": moyu_svg,
    "news": news_svg,
}

for name, content in updates.items():
    svg_p = f"{ICONS_DIR}/{name}.svg"
    png_p = f"{ICONS_DIR}/{name}.png"
    dl_p = f"{DL_DIR}/{name}_icon.png"

    with open(svg_p, "w", encoding="utf-8") as f:
        f.write(content)

    cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        f"--screenshot={png_p}",
        "--window-size=512,512",
        "--default-background-color=00000000",
        f"file://{svg_p}"
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["cp", png_p, dl_p], check=True)
    print(f"Updated {name}.png")
