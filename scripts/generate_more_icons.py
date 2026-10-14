import subprocess, os

ICONS_DIR = "/Users/tomatoxcj/Downloads/gemini-problem/astro-blog/public/images/icons"
DL_DIR = "/Users/tomatoxcj/Downloads"
os.makedirs(ICONS_DIR, exist_ok=True)

# 1. ai.svg -> AI Tech / Cyber Bot / Neural Core
ai_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="bot-head" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="visor-cyan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <radialGradient id="ai-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#ai-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Neural Connection Nodes -->
  <g stroke="#0284c7" stroke-width="2" stroke-dasharray="4 6" opacity="0.4">
    <line x1="256" y1="120" x2="160" y2="180"/>
    <line x1="256" y1="120" x2="352" y2="180"/>
    <line x1="160" y1="180" x2="190" y2="340"/>
    <line x1="352" y1="180" x2="322" y2="340"/>
  </g>

  <!-- 3D Cyber Bot Head -->
  <g filter="url(#shadow-main)">
    <!-- Antenna Core -->
    <rect x="250" y="115" width="12" height="45" rx="6" fill="#94a3b8"/>
    <circle cx="256" cy="115" r="14" fill="#38bdf8"/>
    <circle cx="256" cy="115" r="7" fill="#ffffff"/>

    <!-- Ear Pods -->
    <rect x="130" y="210" width="22" height="60" rx="10" fill="#475569"/>
    <rect x="360" y="210" width="22" height="60" rx="10" fill="#475569"/>

    <!-- Head Shell -->
    <rect x="145" y="150" width="222" height="185" rx="48" fill="url(#bot-head)"/>
    <!-- Specular highlight on forehead -->
    <path d="M170 165 C200 155, 310 155, 340 165 C320 180, 190 180, 170 165 Z" fill="#ffffff" opacity="0.25"/>

    <!-- Glowing Visor Screen -->
    <rect x="170" y="195" width="172" height="75" rx="20" fill="#090d16" stroke="#0284c7" stroke-width="3"/>
    
    <!-- Visor Eye Optics (Twin Luminous Pill Eyes) -->
    <rect x="195" y="218" width="42" height="28" rx="14" fill="url(#visor-cyan)"/>
    <rect x="275" y="218" width="42" height="28" rx="14" fill="url(#visor-cyan)"/>
    <circle cx="210" cy="228" r="5" fill="#ffffff"/>
    <circle cx="290" cy="228" r="5" fill="#ffffff"/>

    <!-- Cheek Circuit Grid Dots -->
    <circle cx="225" cy="295" r="4" fill="#67e8f9"/>
    <circle cx="245" cy="295" r="4" fill="#67e8f9"/>
    <circle cx="265" cy="295" r="4" fill="#67e8f9"/>
    <circle cx="285" cy="295" r="4" fill="#67e8f9"/>
  </g>
</svg>'''

# 2. epic.svg -> Epic Free Games / Cyber Game Controller
epic_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="pad-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="gold-neon" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <radialGradient id="game-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#game-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Ergonomic Gamepad -->
  <g filter="url(#shadow-main)">
    <!-- Main Gamepad Contour -->
    <path d="M160 170 C200 160, 312 160, 352 170 C395 180, 415 280, 375 345 C355 375, 315 365, 300 310 C280 295, 232 295, 212 310 C197 365, 157 375, 137 345 C97 280, 117 180, 160 170 Z" 
          fill="url(#pad-body)" stroke="#64748b" stroke-width="3"/>

    <!-- Specular Highlight Curve -->
    <path d="M175 180 C210 172, 302 172, 337 180 C360 190, 365 220, 330 215 C280 210, 230 210, 180 215 C150 220, 155 190, 175 180 Z" 
          fill="#ffffff" opacity="0.18"/>

    <!-- D-Pad (Left) -->
    <g transform="translate(180, 240)">
      <rect x="-10" y="-30" width="20" height="60" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
      <rect x="-30" y="-10" width="60" height="20" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="4" fill="#334155"/>
    </g>

    <!-- Action Buttons (Right) in diamond layout -->
    <g transform="translate(330, 240)">
      <circle cx="0" cy="-20" r="10" fill="#ef4444"/> <!-- Y -->
      <circle cx="20" cy="0" r="10" fill="#3b82f6"/> <!-- B -->
      <circle cx="0" cy="20" r="10" fill="#10b981"/> <!-- A -->
      <circle cx="-20" cy="0" r="10" fill="#f59e0b"/> <!-- X -->
    </g>

    <!-- Analog Joysticks -->
    <circle cx="215" cy="290" r="24" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
    <circle cx="215" cy="290" r="16" fill="url(#gold-neon)"/>
    <circle cx="297" cy="290" r="24" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
    <circle cx="297" cy="290" r="16" fill="url(#gold-neon)"/>

    <!-- Center LED Badge (Epic / Win) -->
    <polygon points="256,205 264,222 282,222 268,232 273,248 256,238 239,248 244,232 230,222 248,222" fill="#fbbf24"/>
  </g>
</svg>'''

# 3. history.svg -> History Today / Scroll & Hourglass
history_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="parchment" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="50%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <radialGradient id="hist-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d97706" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#hist-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Ancient Historical Scroll -->
  <g filter="url(#shadow-main)" transform="translate(256, 256)">
    <!-- Scroll Body -->
    <path d="M-110 -110 C-90 -130, 90 -130, 110 -110 C130 -80, 130 90, 110 120 C90 140, -90 140, -110 120 C-130 90, -130 -80, -110 -110 Z" 
          fill="url(#parchment)"/>

    <!-- Scroll Top & Bottom Rollers -->
    <rect x="-125" y="-125" width="250" height="24" rx="12" fill="#78350f" stroke="#b45309" stroke-width="2"/>
    <circle cx="-125" cy="-113" r="14" fill="#d97706"/>
    <circle cx="125" cy="-113" r="14" fill="#d97706"/>

    <rect x="-125" y="105" width="250" height="24" rx="12" fill="#78350f" stroke="#b45309" stroke-width="2"/>
    <circle cx="-125" cy="117" r="14" fill="#d97706"/>
    <circle cx="125" cy="117" r="14" fill="#d97706"/>

    <!-- Ancient Text Inscriptions -->
    <line x1="-80" y1="-70" x2="80" y2="-70" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
    <line x1="-80" y1="-45" x2="80" y2="-45" stroke="#92400e" stroke-width="4" stroke-linecap="round"/>
    <line x1="-80" y1="-25" x2="50" y2="-25" stroke="#92400e" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Red Imperial Seal Mark (Stamp) -->
    <rect x="-30" y="5" width="60" height="60" rx="8" fill="#dc2626" opacity="0.85"/>
    <rect x="-24" y="11" width="48" height="48" rx="5" fill="none" stroke="#fef2f2" stroke-width="2"/>
    <circle cx="0" cy="35" r="12" fill="none" stroke="#fef2f2" stroke-width="2.5"/>
  </g>
</svg>'''

# 4. douban.svg -> Douban Movies / Cinema Clapperboard
douban_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="douban-green" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <radialGradient id="douban-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#douban-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Cinema Clapperboard -->
  <g filter="url(#shadow-main)" transform="translate(256, 260)">
    <!-- Lower Main Board -->
    <rect x="-120" y="-30" width="240" height="150" rx="14" fill="#0f172a" stroke="#334155" stroke-width="3"/>
    
    <!-- Movie Title Area -->
    <rect x="-100" y="-10" width="200" height="24" rx="4" fill="#1e293b"/>
    <line x1="-90" y1="2" x2="-20" y2="2" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Director / Scene Lines -->
    <rect x="-100" y="30" width="90" height="18" rx="3" fill="#1e293b"/>
    <rect x="10" y="30" width="90" height="18" rx="3" fill="#1e293b"/>
    <rect x="-100" y="62" width="200" height="36" rx="6" fill="url(#douban-green)"/>
    <!-- Rating Stars inside green badge -->
    <g fill="#fef08a" transform="translate(-65, 80) scale(0.7)">
      <polygon points="0,-12 4,-4 12,-4 6,2 8,10 0,6 -8,10 -6,2 -12,-4 -4,-4"/>
      <polygon points="35,-12 39,-4 47,-4 41,2 43,10 35,6 27,10 29,2 23,-4 31,-4"/>
      <polygon points="70,-12 74,-4 82,-4 76,2 78,10 70,6 62,10 64,2 58,-4 66,-4"/>
      <polygon points="105,-12 109,-4 117,-4 111,2 113,10 105,6 97,10 99,2 93,-4 101,-4"/>
      <polygon points="140,-12 144,-4 152,-4 146,2 148,10 140,6 132,10 134,2 128,-4 136,-4"/>
    </g>

    <!-- Top Clapper Arm (Angled open) -->
    <g transform="translate(-120, -30) rotate(-18)">
      <rect x="0" y="-36" width="240" height="36" rx="6" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      <!-- Striped Zebra pattern -->
      <polygon points="25,0 45,0 75,-36 55,-36" fill="#f8fafc"/>
      <polygon points="85,0 105,0 135,-36 115,-36" fill="#f8fafc"/>
      <polygon points="145,0 165,0 195,-36 175,-36" fill="#f8fafc"/>
      <polygon points="205,0 225,0 240,-18 240,-36" fill="#f8fafc"/>
      <!-- Hinge Joint -->
      <circle cx="12" cy="-18" r="8" fill="#64748b"/>
      <circle cx="12" cy="-18" r="4" fill="#ffffff"/>
    </g>
  </g>
</svg>'''

# 5. calendar.svg -> Calendar Month
calendar_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="cal-red" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#b91c1c"/>
    </linearGradient>
    <radialGradient id="cal-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#cal-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Wall / Desk Calendar -->
  <g filter="url(#shadow-main)" transform="translate(256, 260)">
    <!-- Main White Calendar Sheet -->
    <rect x="-110" y="-120" width="220" height="230" rx="18" fill="#f8fafc"/>
    
    <!-- Top Crimson Header -->
    <path d="M-110 -102 C-110 -112, -102 -120, -92 -120 L92 -120 C102 -120, 110 -112, 110 -102 L110 -55 L-110 -55 Z" fill="url(#cal-red)"/>
    
    <!-- Binding Metal Rings -->
    <rect x="-65" y="-135" width="16" height="30" rx="8" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
    <rect x="49" y="-135" width="16" height="30" rx="8" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>

    <!-- Calendar Grid of Days -->
    <g fill="#94a3b8">
      <circle cx="-65" cy="-25" r="8"/>
      <circle cx="-22" cy="-25" r="8"/>
      <circle cx="22" cy="-25" r="8"/>
      <circle cx="65" cy="-25" r="8"/>

      <circle cx="-65" cy="15" r="8"/>
      <circle cx="-22" cy="15" r="8"/>
      <circle cx="22" cy="15" r="8"/>
      <circle cx="65" cy="15" r="8"/>

      <circle cx="-65" cy="55" r="8"/>
      <!-- Highlighted Today Tile -->
      <rect x="-34" y="43" width="24" height="24" rx="6" fill="#ef4444"/>
      <circle cx="22" cy="55" r="8"/>
      <circle cx="65" cy="55" r="8"/>
    </g>
  </g>
</svg>'''

# 6. coffee.svg -> Coffee Mug / Work Routine
coffee_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="mug-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="coffee-liq" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
    <radialGradient id="coffee-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#b45309" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#b45309" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#coffee-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Rising Steam Swirls -->
  <g fill="none" stroke="#fed7aa" stroke-width="4" stroke-linecap="round" opacity="0.65">
    <path d="M225 150 C215 125, 235 110, 220 90"/>
    <path d="M256 145 C246 120, 266 100, 256 80"/>
    <path d="M287 150 C277 125, 297 110, 287 90"/>
  </g>

  <!-- 3D Ceramic Coffee Mug -->
  <g filter="url(#shadow-main)" transform="translate(256, 275)">
    <!-- Mug Handle -->
    <path d="M60 -30 C120 -30, 120 70, 60 70" fill="none" stroke="url(#mug-body)" stroke-width="22" stroke-linecap="round"/>

    <!-- Main Cup Body -->
    <path d="M-80 -50 L-65 95 C-60 120, 60 120, 65 95 L80 -50 Z" fill="url(#mug-body)"/>

    <!-- Top Rim Opening -->
    <ellipse cx="0" cy="-50" rx="80" ry="24" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3"/>
    
    <!-- Rich Dark Coffee Liquid Inside -->
    <ellipse cx="0" cy="-50" rx="72" ry="20" fill="url(#coffee-liq)"/>
    <ellipse cx="15" cy="-52" rx="30" ry="10" fill="#9a3412" opacity="0.4"/>
  </g>
</svg>'''

new_icons = {
    "ai": ai_svg,
    "epic": epic_svg,
    "history": history_svg,
    "douban": douban_svg,
    "calendar": calendar_svg,
    "coffee": coffee_svg,
}

for name, content in new_icons.items():
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
    print(f"Generated {name}.png")
