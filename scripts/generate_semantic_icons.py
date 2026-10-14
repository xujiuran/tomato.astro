import os
import subprocess

ICONS_DIR = "/Users/tomatoxcj/Downloads/gemini-problem/astro-blog/public/images/icons"
DOWNLOADS_DIR = "/Users/tomatoxcj/Downloads"
os.makedirs(ICONS_DIR, exist_ok=True)

# 1. thoughts.svg -> Micro-thoughts / Memos / Sparks
thoughts_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background squircle gradient -->
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <!-- Speech bubble gradient -->
    <linearGradient id="bubble-fill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="50%" stop-color="#9333ea"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
    <!-- Spark / bulb gradient -->
    <linearGradient id="spark-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="glow-violet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="ambient-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Ambient background glow -->
  <circle cx="256" cy="256" r="220" fill="url(#ambient-glow)"/>

  <!-- Base Apple-style squircle plate -->
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>

  <!-- Subtle inner squircle rim highlight -->
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Small secondary thought bubble (bottom left) -->
  <g filter="url(#shadow-main)">
    <circle cx="160" cy="340" r="22" fill="#6366f1" opacity="0.8"/>
    <circle cx="125" cy="375" r="12" fill="#818cf8" opacity="0.7"/>
  </g>

  <!-- Main 3D Frosted Speech Bubble -->
  <g filter="url(#shadow-main)">
    <!-- Base bubble shadow -->
    <path d="M140 150 C140 105, 175 70, 220 70 L300 70 C345 70, 380 105, 380 150 L380 230 C380 275, 345 310, 300 310 L220 310 L160 360 L175 310 C155 305, 140 280, 140 250 Z" 
          fill="url(#bubble-fill)"/>

    <!-- Glassmorphic specular top curve -->
    <path d="M145 150 C145 110, 178 76, 220 76 L300 76 C342 76, 375 110, 375 150 C375 160, 370 170, 360 170 C280 170, 210 160, 155 175 C148 175, 145 165, 145 150 Z" 
          fill="#ffffff" opacity="0.22"/>
  </g>

  <!-- Central Glowing Inspiration Spark / Radiant Filament -->
  <g transform="translate(260, 190)">
    <!-- Glow halo -->
    <circle cx="0" cy="0" r="48" fill="#f59e0b" opacity="0.3"/>
    
    <!-- Four-point star core -->
    <path d="M0 -42 C2 -12, 12 -2, 42 0 C12 2, 2 12, 0 42 C-2 12, -12 2, -42 0 C-12 -2, -2 -12, 0 -42 Z" 
          fill="url(#spark-gold)" filter="url(#shadow-main)"/>
    
    <!-- Pure white center core -->
    <circle cx="0" cy="0" r="10" fill="#ffffff"/>

    <!-- Dynamic satellite sparkles -->
    <circle cx="-55" cy="-28" r="4" fill="#fef08a"/>
    <circle cx="50" cy="30" r="3.5" fill="#fef08a"/>
    <circle cx="45" cy="-35" r="3" fill="#fef08a"/>
  </g>

  <!-- Soundwave / Thought pulse arcs -->
  <path d="M320 150 A35 35 0 0 1 345 220" fill="none" stroke="#e0e7ff" stroke-width="4.5" stroke-linecap="round" opacity="0.75"/>
  <path d="M335 135 A55 55 0 0 1 370 235" fill="none" stroke="#e0e7ff" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
</svg>'''

# 2. tools.svg -> Curated Tools / Geek Toolkit
tools_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="metal-titanium" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#71717a"/>
      <stop offset="50%" stop-color="#3f3f46"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
    <linearGradient id="neon-cyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="neon-emerald" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <radialGradient id="tool-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Ambient background glow -->
  <circle cx="256" cy="256" r="220" fill="url(#tool-glow)"/>

  <!-- Base Apple-style squircle plate -->
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Precision Crossed Tools & Engineering Cube -->
  <g filter="url(#shadow-main)">
    <!-- Tool 1: Precision Screwdriver (Diagonal 45deg) -->
    <g transform="translate(256, 256) rotate(-45)">
      <!-- Handle -->
      <rect x="-14" y="20" width="28" height="110" rx="14" fill="url(#neon-cyan)"/>
      <rect x="-10" y="35" width="20" height="75" rx="10" fill="#0369a1"/>
      <rect x="-4" y="45" width="8" height="55" rx="4" fill="#38bdf8"/>
      <!-- Metal shaft -->
      <rect x="-6" y="-105" width="12" height="125" rx="3" fill="#cbd5e1"/>
      <!-- Screwdriver Tip -->
      <polygon points="-6,-105 6,-105 3,-125 -3,-125" fill="#94a3b8"/>
    </g>

    <!-- Tool 2: Modern Cyber Wrench (Diagonal 45deg opposite) -->
    <g transform="translate(256, 256) rotate(45)">
      <!-- Handle -->
      <rect x="-13" y="15" width="26" height="115" rx="13" fill="url(#metal-titanium)" stroke="#52525b" stroke-width="2"/>
      <circle cx="0" cy="105" r="6" fill="#09090b"/>
      <!-- Center neon accent groove -->
      <rect x="-2" y="30" width="4" height="60" rx="2" fill="#34d399"/>
      <!-- Wrench Head -->
      <path d="M-28 -90 C-32 -60, 32 -60, 28 -90 L22 -110 C14 -102, -14 -102, -22 -110 Z" fill="#94a3b8"/>
      <circle cx="0" cy="-80" r="14" fill="#18181b"/>
      <rect x="-8" y="-95" width="16" height="18" fill="#18181b"/>
    </g>

    <!-- Center Reactor Gear Core -->
    <g transform="translate(256, 256)">
      <circle cx="0" cy="0" r="38" fill="#0f172a" stroke="#0284c7" stroke-width="4"/>
      <circle cx="0" cy="0" r="28" fill="url(#neon-cyan)"/>
      <circle cx="0" cy="0" r="14" fill="#ffffff"/>
      <!-- 4 Energy notches -->
      <rect x="-3" y="-35" width="6" height="8" rx="2" fill="#38bdf8"/>
      <rect x="-3" y="27" width="6" height="8" rx="2" fill="#38bdf8"/>
      <rect x="-35" y="-3" width="8" height="6" rx="2" fill="#38bdf8"/>
      <rect x="27" y="-3" width="8" height="6" rx="2" fill="#38bdf8"/>
    </g>
  </g>
</svg>'''

# 3. moyu.svg -> Moyu Weekly / Leisure Fish
moyu_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="fish-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="50%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="fish-fin" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.5"/>
    </linearGradient>
    <radialGradient id="moyu-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Ambient background glow -->
  <circle cx="256" cy="256" r="220" fill="url(#moyu-glow)"/>

  <!-- Base Apple-style squircle plate -->
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Ripple wave rings on water surface -->
  <ellipse cx="256" cy="285" rx="140" ry="45" fill="none" stroke="#059669" stroke-width="3" opacity="0.35"/>
  <ellipse cx="256" cy="285" rx="90" ry="28" fill="none" stroke="#34d399" stroke-width="2.5" opacity="0.5"/>
  <ellipse cx="256" cy="285" rx="45" ry="14" fill="none" stroke="#6ee7b7" stroke-width="2" opacity="0.65"/>

  <!-- Leaping Cyber Koi Fish -->
  <g filter="url(#shadow-main)">
    <!-- Dorsal Fin -->
    <path d="M210 185 C230 140, 275 145, 290 170 C270 175, 240 180, 210 185 Z" fill="url(#fish-fin)"/>

    <!-- Pectoral Fin -->
    <path d="M190 240 C155 260, 140 290, 165 305 C185 290, 195 265, 190 240 Z" fill="url(#fish-fin)"/>

    <!-- Fish Main Body (Graceful curved arc) -->
    <path d="M140 250 C145 190, 210 160, 275 185 C335 210, 360 270, 350 310 C335 270, 305 245, 255 240 C205 235, 160 270, 140 250 Z" 
          fill="url(#fish-body)"/>

    <!-- High-tech Ventral Highlight Curve -->
    <path d="M160 240 C190 195, 250 185, 280 200" fill="none" stroke="#a7f3d0" stroke-width="5" stroke-linecap="round" opacity="0.75"/>

    <!-- Fish Tail Fin (Flowing silk fan) -->
    <path d="M350 310 C375 325, 400 350, 405 320 C395 300, 380 295, 365 295 C375 280, 385 260, 365 265 C355 275, 350 295, 350 310 Z" 
          fill="url(#fish-fin)"/>

    <!-- Fish Eye (Glowing golden bead) -->
    <circle cx="165" cy="235" r="9" fill="#0f172a"/>
    <circle cx="165" cy="235" r="6" fill="#facc15"/>
    <circle cx="163" cy="233" r="2.5" fill="#ffffff"/>

    <!-- Suspended Glowing Droplets -->
    <circle cx="185" cy="155" r="5" fill="#67e8f9" opacity="0.8"/>
    <circle cx="315" cy="165" r="6" fill="#67e8f9" opacity="0.85"/>
    <circle cx="350" cy="210" r="4" fill="#a7f3d0" opacity="0.9"/>
  </g>
</svg>'''

# 4. news.svg -> Daily 60s News / Morning Brief
news_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="sun-glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="40%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="paper-front" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <radialGradient id="morning-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#morning-glow)"/>

  <!-- Base Apple-style squircle plate -->
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- 3D Rising Sun Orb -->
  <g filter="url(#shadow-main)">
    <circle cx="256" cy="200" r="75" fill="url(#sun-glow)"/>
    <!-- Solar Ray Filaments -->
    <g stroke="url(#sun-glow)" stroke-width="5" stroke-linecap="round" opacity="0.85">
      <line x1="256" y1="100" x2="256" y2="75"/>
      <line x1="180" y1="130" x2="160" y2="110"/>
      <line x1="332" y1="130" x2="352" y2="110"/>
      <line x1="145" y1="200" x2="120" y2="200"/>
      <line x1="367" y1="200" x2="392" y2="200"/>
    </g>
  </g>

  <!-- 3D Folded Morning News Sheet -->
  <g filter="url(#shadow-main)" transform="translate(256, 310)">
    <!-- Back page -->
    <rect x="-105" y="-60" width="210" height="120" rx="10" fill="#94a3b8" transform="rotate(-4)"/>
    <!-- Main page -->
    <rect x="-100" y="-55" width="200" height="115" rx="8" fill="url(#paper-front)"/>
    <!-- Newspaper Header -->
    <rect x="-85" y="-42" width="95" height="14" rx="3" fill="#0f172a"/>
    <rect x="25" y="-42" width="60" height="10" rx="2" fill="#ef4444"/>
    <!-- Headline Bars -->
    <line x1="-85" y1="-18" x2="85" y2="-18" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
    <line x1="-85" y1="-4" x2="85" y2="-4" stroke="#64748b" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="-85" y1="8" x2="45" y2="8" stroke="#64748b" stroke-width="3.5" stroke-linecap="round"/>
    <!-- News Thumbnail photo -->
    <rect x="-85" y="20" width="45" height="26" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="-30" y1="25" x2="85" y2="25" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
    <line x1="-30" y1="36" x2="65" y2="36" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>'''

# 5. trending.svg -> Trending Radar / Lightning
trending_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1e24"/>
      <stop offset="100%" stop-color="#0d0d11"/>
    </linearGradient>
    <linearGradient id="sq-stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f3f46" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#18181b" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="bolt-energy" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="50%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <radialGradient id="bolt-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-main" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="256" cy="256" r="220" fill="url(#bolt-glow)"/>

  <!-- Base Apple-style squircle plate -->
  <rect x="36" y="36" width="440" height="440" rx="100" fill="url(#sq-bg)" stroke="url(#sq-stroke)" stroke-width="4" filter="url(#shadow-main)"/>
  <rect x="40" y="40" width="432" height="432" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

  <!-- Orbital radar pulse rings -->
  <circle cx="256" cy="256" r="145" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="8 8" opacity="0.35"/>
  <circle cx="256" cy="256" r="110" fill="none" stroke="#f97316" stroke-width="2.5" opacity="0.4"/>

  <!-- 3D Dynamic Faceted Lightning Bolt -->
  <g filter="url(#shadow-main)">
    <!-- Base bolt glow -->
    <polygon points="280,85 170,250 255,250 220,415 355,230 270,230" fill="url(#bolt-energy)"/>
    
    <!-- Highlight facet edge -->
    <polygon points="280,85 240,250 255,250 220,415 235,340 270,230" fill="#ffffff" opacity="0.35"/>
    
    <!-- Ultra-hot core line -->
    <line x1="275" y1="95" x2="245" y2="245" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
  </g>

  <!-- Kinetic velocity sparks -->
  <circle cx="165" cy="180" r="5" fill="#f43f5e"/>
  <circle cx="340" cy="330" r="6" fill="#f97316"/>
  <circle cx="310" cy="140" r="4" fill="#fef08a"/>
  <circle cx="190" cy="360" r="4.5" fill="#facc15"/>
</svg>'''

icons = {
    "thoughts": thoughts_svg,
    "tools": tools_svg,
    "moyu": moyu_svg,
    "news": news_svg,
    "trending": trending_svg,
}

for name, svg_content in icons.items():
    svg_path = os.path.join(ICONS_DIR, f"{name}.svg")
    png_path = os.path.join(ICONS_DIR, f"{name}.png")
    dl_path = os.path.join(DOWNLOADS_DIR, f"{name}_icon.png")

    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

    # Render to 1024x1024 high-definition PNG via ImageMagick
    cmd = ["magick", "-background", "none", "-density", "288", svg_path, "-resize", "1024x1024", png_path]
    subprocess.run(cmd, check=True)

    # Copy to ~/Downloads
    subprocess.run(["cp", png_path, dl_path], check=True)
    print(f"Generated {png_path} and {dl_path}")
