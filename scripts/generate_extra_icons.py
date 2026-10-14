import subprocess, os

ICONS_DIR = "/Users/tomatoxcj/Downloads/gemini-problem/astro-blog/public/images/icons"
DL_DIR = "/Users/tomatoxcj/Downloads"
os.makedirs(ICONS_DIR, exist_ok=True)

# 1. globe.svg -> Cyberspace / Web / Network / Society
globe_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#141824"/>
      <stop offset="100%" stop-color="#0a0d14"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.3"/>
    </linearGradient>
    <radialGradient id="sphere-base" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="40%" stop-color="#0284c7"/>
      <stop offset="80%" stop-color="#0369a1"/>
      <stop offset="100%" stop-color="#082f49"/>
    </radialGradient>
    <radialGradient id="globe-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#globe-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Cyberspace Globe -->
  <g filter="url(#shadow-main)">
    <!-- Globe Sphere -->
    <circle cx="256" cy="256" r="130" fill="url(#sphere-base)"/>

    <!-- Latitude lines -->
    <ellipse cx="256" cy="256" rx="130" ry="40" fill="none" stroke="#e0f2fe" stroke-width="3.5" opacity="0.65"/>
    <ellipse cx="256" cy="205" rx="112" ry="32" fill="none" stroke="#e0f2fe" stroke-width="3" opacity="0.5"/>
    <ellipse cx="256" cy="307" rx="112" ry="32" fill="none" stroke="#e0f2fe" stroke-width="3" opacity="0.5"/>
    <ellipse cx="256" cy="165" rx="80" ry="20" fill="none" stroke="#bae6fd" stroke-width="2.5" opacity="0.4"/>
    <ellipse cx="256" cy="347" rx="80" ry="20" fill="none" stroke="#bae6fd" stroke-width="2.5" opacity="0.4"/>

    <!-- Longitude lines -->
    <ellipse cx="256" cy="256" rx="42" ry="130" fill="none" stroke="#e0f2fe" stroke-width="3.5" opacity="0.65"/>
    <ellipse cx="256" cy="256" rx="88" ry="130" fill="none" stroke="#e0f2fe" stroke-width="3" opacity="0.5"/>
    <line x1="256" y1="126" x2="256" y2="386" stroke="#ffffff" stroke-width="3.5" opacity="0.75"/>

    <!-- Outer Orbit Ring -->
    <ellipse cx="256" cy="256" rx="165" ry="55" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="12 8" transform="rotate(-25 256 256)" opacity="0.8"/>
    <!-- Orbit Satellites -->
    <circle cx="390" cy="190" r="9" fill="#ffffff" filter="url(#shadow-main)"/>
    <circle cx="390" cy="190" r="15" fill="#38bdf8" opacity="0.4"/>
    <circle cx="120" cy="320" r="7" fill="#67e8f9"/>

    <!-- Specular Highlight -->
    <ellipse cx="210" cy="185" rx="60" ry="35" fill="#ffffff" opacity="0.3" transform="rotate(-30 210 185)"/>
  </g>
</svg>'''

# 2. market.svg -> Finance / Economy / Ascending Trend
market_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#141c18"/>
      <stop offset="100%" stop-color="#090f0c"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#047857" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="bar-green" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="bar-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <radialGradient id="market-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#market-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Candlestick & Ascending Trend -->
  <g filter="url(#shadow-main)">
    <!-- Base Plate Grid Lines -->
    <line x1="120" y1="370" x2="390" y2="370" stroke="#374151" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Bar 1 (Left Low) -->
    <rect x="135" y="270" width="55" height="100" rx="12" fill="url(#bar-green)"/>
    <path d="M142 276 L183 276" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
    
    <!-- Bar 2 (Middle Med) -->
    <rect x="225" y="210" width="55" height="160" rx="12" fill="url(#bar-gold)"/>
    <path d="M232 216 L273 216" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.4"/>

    <!-- Bar 3 (Right High Peak) -->
    <rect x="315" y="145" width="55" height="225" rx="12" fill="url(#bar-green)"/>
    <path d="M322 151 L363 151" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.4"/>

    <!-- Glowing Trend Sparkline Curve -->
    <path d="M110 320 Q 200 290 250 190 T 380 120" fill="none" stroke="#6ee7b7" stroke-width="6" stroke-linecap="round"/>
    <path d="M110 320 Q 200 290 250 190 T 380 120" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    
    <!-- Arrowhead at top right -->
    <polygon points="380,105 395,128 368,128" fill="#10b981" stroke="#ffffff" stroke-width="2" transform="rotate(25 380 120)"/>

    <!-- Sparkle Stars -->
    <circle cx="395" cy="115" r="5" fill="#fef08a"/>
    <circle cx="260" cy="175" r="4" fill="#a7f3d0"/>
  </g>
</svg>'''

# 3. rocket.svg -> Productivity / Speed / Rocket Launch
rocket_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1f1519"/>
      <stop offset="100%" stop-color="#0d090c"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#9f1239" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="rocket-hull" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <linearGradient id="rocket-red" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>
    <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
    <radialGradient id="rocket-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#rocket-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Supersonic Rocket -->
  <g transform="translate(256 256) rotate(45) translate(-256 -256)" filter="url(#shadow-main)">
    <!-- Exhaust Plume -->
    <path d="M236 340 Q256 430 256 440 Q256 430 276 340 Z" fill="url(#flame)" filter="url(#shadow-main)"/>
    <path d="M244 340 Q256 390 256 400 Q256 390 268 340 Z" fill="#ffffff" opacity="0.8"/>

    <!-- Left & Right Delta Fins -->
    <path d="M216 270 L160 330 L216 330 Z" fill="url(#rocket-red)"/>
    <path d="M296 270 L352 330 L296 330 Z" fill="url(#rocket-red)"/>

    <!-- Rocket Body / Fuselage -->
    <path d="M256 110 C216 170 216 260 216 340 L296 340 C296 260 296 170 256 110 Z" fill="url(#rocket-hull)"/>

    <!-- Nosecone Cap -->
    <path d="M256 110 C234 145 224 185 220 205 L292 205 C288 185 278 145 256 110 Z" fill="url(#rocket-red)"/>

    <!-- Specular Highlight Strip -->
    <path d="M232 215 C232 260 232 300 234 330 L238 330 C236 300 236 260 236 215 Z" fill="#ffffff" opacity="0.6"/>

    <!-- Circular Porthole Window -->
    <circle cx="256" cy="245" r="22" fill="#0f172a" stroke="#94a3b8" stroke-width="4"/>
    <circle cx="256" cy="245" r="16" fill="#0284c7"/>
    <circle cx="251" cy="240" r="5" fill="#ffffff" opacity="0.8"/>

    <!-- Exhaust Nozzle Ring -->
    <rect x="226" y="336" width="60" height="12" rx="4" fill="#475569"/>
  </g>
</svg>'''

# 4. health.svg -> Health / Life / Sprout / Tomato leaf
health_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#121d17"/>
      <stop offset="100%" stop-color="#080f0b"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#065f46" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="leaf-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="50%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="leaf-sec" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>
    <radialGradient id="health-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#health-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Organic Vitality Sprout -->
  <g filter="url(#shadow-main)">
    <!-- Soil Mound / Base Horizon -->
    <ellipse cx="256" cy="380" rx="90" ry="24" fill="#1e293b"/>
    <ellipse cx="256" cy="376" rx="70" ry="16" fill="#334155"/>

    <!-- Central Curved Stalk -->
    <path d="M256 376 Q250 260 210 180" fill="none" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/>
    <path d="M256 376 Q250 260 210 180" fill="none" stroke="#4ade80" stroke-width="4" stroke-linecap="round"/>

    <!-- Big Left Leaf -->
    <path d="M235 240 C170 230 130 170 145 125 C190 120 230 170 235 240 Z" fill="url(#leaf-grad)"/>
    <!-- Leaf Vein -->
    <path d="M230 230 C200 190 170 160 155 135" fill="none" stroke="#86efac" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    <!-- Morning Dew Drop on Leaf -->
    <circle cx="170" cy="155" r="9" fill="#e0f2fe" opacity="0.9"/>
    <circle cx="168" cy="153" r="3" fill="#ffffff"/>

    <!-- Smaller Right Leaf -->
    <path d="M242 270 C290 250 330 200 325 160 C280 165 250 215 242 270 Z" fill="url(#leaf-sec)"/>
    <path d="M248 260 C275 230 295 200 315 175" fill="none" stroke="#bbf7d0" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>

    <!-- Sprout Crown Heart Leaf -->
    <path d="M210 180 C205 140 230 115 250 110 C255 135 240 165 210 180 Z" fill="#86efac"/>
  </g>
</svg>'''

# 5. target.svg -> Target / Bullseye / Countdown Goal
target_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1c1418"/>
      <stop offset="100%" stop-color="#0d080a"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e11d48" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#881337" stop-opacity="0.3"/>
    </linearGradient>
    <radialGradient id="ring-red" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </radialGradient>
    <radialGradient id="target-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e11d48" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#e11d48" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#target-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Precision Target with Bullseye -->
  <g filter="url(#shadow-main)">
    <!-- Outer Red Ring -->
    <circle cx="256" cy="256" r="140" fill="url(#ring-red)"/>
    <!-- Outer White Ring -->
    <circle cx="256" cy="256" r="105" fill="#f8fafc"/>
    <!-- Inner Red Ring -->
    <circle cx="256" cy="256" r="70" fill="url(#ring-red)"/>
    <!-- Bullseye Gold Center -->
    <circle cx="256" cy="256" r="35" fill="#fbbf24"/>
    <circle cx="256" cy="256" r="15" fill="#ffffff"/>

    <!-- Crosshair Lines -->
    <line x1="256" y1="90" x2="256" y2="422" stroke="#ffffff" stroke-width="3" stroke-dasharray="10 10" opacity="0.4"/>
    <line x1="90" y1="256" x2="422" y2="256" stroke="#ffffff" stroke-width="3" stroke-dasharray="10 10" opacity="0.4"/>

    <!-- Hit Indicator Spark -->
    <circle cx="256" cy="256" r="45" fill="none" stroke="#fef08a" stroke-width="4" opacity="0.75"/>
  </g>
</svg>'''

# 6. search.svg -> Search / Magnifying Glass
search_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#161822"/>
      <stop offset="100%" stop-color="#0a0c12"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#3730a3" stop-opacity="0.3"/>
    </linearGradient>
    <radialGradient id="lens-grad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#a5f3fc"/>
      <stop offset="40%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </radialGradient>
    <linearGradient id="rim-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="handle-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <radialGradient id="search-ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#search-ambient)"/>
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Prismatic Magnifying Glass -->
  <g filter="url(#shadow-main)">
    <!-- Ergonomic Handle (diagonal down-right) -->
    <rect x="290" y="290" width="42" height="130" rx="21" fill="url(#handle-grad)" transform="rotate(-45 311 355)"/>
    <rect x="303" y="303" width="16" height="104" rx="8" fill="#1e293b" transform="rotate(-45 311 355)"/>

    <!-- Lens Outer Metallic Rim -->
    <circle cx="215" cy="215" r="105" fill="none" stroke="url(#rim-grad)" stroke-width="22"/>

    <!-- Glass Lens Core -->
    <circle cx="215" cy="215" r="94" fill="url(#lens-grad)" opacity="0.75"/>

    <!-- Refraction Highlight / Prismatic Arc -->
    <path d="M145 180 C155 140, 200 130, 245 140" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
    <circle cx="165" cy="165" r="8" fill="#ffffff" opacity="0.8"/>
  </g>
</svg>'''

icons = {
    'globe': globe_svg,
    'market': market_svg,
    'rocket': rocket_svg,
    'health': health_svg,
    'target': target_svg,
    'search': search_svg
}

for name, svg in icons.items():
    svg_path = os.path.join(ICONS_DIR, f"{name}.svg")
    with open(svg_path, "w") as f:
        f.write(svg)
    
    png_path = os.path.join(ICONS_DIR, f"{name}.png")
    dl_path = os.path.join(DL_DIR, f"{name}_icon.png")

    html_content = f'''<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{
      margin: 0;
      padding: 0;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 512px;
      height: 512px;
      overflow: hidden;
    }}
  </style>
</head>
<body>
  {svg}
</body>
</html>'''
    temp_html = f"/tmp/{name}_render.html"
    with open(temp_html, "w") as f:
        f.write(html_content)

    cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--default-background-color=00000000",
        "--window-size=512,512",
        f"--screenshot={png_path}",
        f"file://{temp_html}"
    ]
    subprocess.run(cmd, check=True)
    subprocess.run(["cp", png_path, dl_path], check=True)
    print(f"Generated {name} -> {png_path} and {dl_path}")

print("All extra icons generated successfully!")
