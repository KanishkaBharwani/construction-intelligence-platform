import base64

SITE_SAFETY_SVG = """<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'>
  <defs>
    <linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#38bdf8'/>
      <stop offset='100%' stop-color='#bae6fd'/>
    </linearGradient>
    <linearGradient id='concrete' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#94a3b8'/>
      <stop offset='100%' stop-color='#64748b'/>
    </linearGradient>
  </defs>
  <rect width='800' height='500' fill='url(#sky)'/>
  <!-- Ground -->
  <rect y='380' width='800' height='120' fill='#78350f'/>
  <rect y='400' width='800' height='100' fill='#451a03'/>
  <!-- Structural Frame Columns & Slabs -->
  <rect x='100' y='120' width='40' height='260' fill='url(#concrete)' stroke='#334155' stroke-width='3'/>
  <rect x='340' y='120' width='40' height='260' fill='url(#concrete)' stroke='#334155' stroke-width='3'/>
  <rect x='580' y='120' width='40' height='260' fill='url(#concrete)' stroke='#334155' stroke-width='3'/>
  <!-- Floor Slabs -->
  <rect x='80' y='240' width='560' height='24' fill='#cbd5e1' stroke='#475569' stroke-width='2'/>
  <rect x='80' y='120' width='560' height='24' fill='#cbd5e1' stroke='#475569' stroke-width='2'/>
  <!-- Scaffolding Frame on Left -->
  <line x1='120' y1='380' x2='120' y2='240' stroke='#f59e0b' stroke-width='4'/>
  <line x1='190' y1='380' x2='190' y2='240' stroke='#f59e0b' stroke-width='4'/>
  <line x1='120' y1='340' x2='190' y2='340' stroke='#f59e0b' stroke-width='3'/>
  <line x1='120' y1='290' x2='190' y2='290' stroke='#f59e0b' stroke-width='3'/>
  <line x1='120' y1='380' x2='190' y2='290' stroke='#f59e0b' stroke-width='2'/>
  <line x1='190' y1='380' x2='120' y2='290' stroke='#f59e0b' stroke-width='2'/>
  <!-- Tower Crane in Background -->
  <line x1='680' y1='40' x2='680' y2='380' stroke='#eab308' stroke-width='8'/>
  <line x1='520' y1='60' x2='760' y2='60' stroke='#eab308' stroke-width='6'/>
  <line x1='680' y1='40' x2='600' y2='60' stroke='#eab308' stroke-width='3'/>
  <line x1='680' y1='40' x2='740' y2='60' stroke='#eab308' stroke-width='3'/>
  <line x1='580' y1='60' x2='580' y2='140' stroke='#0f172a' stroke-dasharray='4,4' stroke-width='2'/>
  <!-- Workers -->
  <!-- Worker 1 on Slab Edge (Unprotected) -->
  <circle cx='540' cy='105' r='8' fill='#fbbf24'/> <!-- Hard Hat -->
  <rect x='535' y='113' width='10' height='16' fill='#0284c7'/> <!-- Blue Shirt (No Vest) -->
  <rect x='535' y='129' width='10' height='14' fill='#1e293b'/>
  <!-- Worker 2 on Scaffolding -->
  <circle cx='155' cy='275' r='8' fill='#ffffff'/>
  <rect x='150' y='283' width='10' height='16' fill='#f97316'/> <!-- High Vis -->
  <rect x='150' y='299' width='10' height='14' fill='#1e293b'/>
  <!-- Worker 3 Ground Rigger -->
  <circle cx='390' cy='365' r='8' fill='#fbbf24'/>
  <rect x='385' y='373' width='10' height='16' fill='#22c55e'/>
  <rect x='385' y='389' width='10' height='14' fill='#1e293b'/>
  <text x='20' y='40' fill='#0f172a' font-family='Arial' font-size='20' font-weight='bold'>Zone B-4: Structural Frame Construction Site</text>
  <text x='20' y='65' fill='#475569' font-family='Arial' font-size='14'>BuildIntel Multimodal Test Benchmark Image #01</text>
</svg>"""
CRACK_INSPECTION_SVG = """<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'>
  <defs>
    <linearGradient id='concrete_texture' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#94a3b8'/>
      <stop offset='50%' stop-color='#64748b'/>
      <stop offset='100%' stop-color='#475569'/>
    </linearGradient>
    <radialGradient id='water_leak' cx='45%' cy='55%' r='30%'>
      <stop offset='0%' stop-color='rgba(14, 116, 144, 0.6)'/>
      <stop offset='70%' stop-color='rgba(8, 145, 178, 0.2)'/>
      <stop offset='100%' stop-color='rgba(8, 145, 178, 0)'/>
    </radialGradient>
  </defs>
  <!-- Concrete Surface -->
  <rect width='800' height='500' fill='url(#concrete_texture)'/>
  <!-- Surface Pores & Aggregate Stains -->
  <circle cx='200' cy='150' r='6' fill='#334155'/>
  <circle cx='600' cy='320' r='8' fill='#334155'/>
  <circle cx='380' cy='420' r='5' fill='#334155'/>
  <circle cx='680' cy='120' r='7' fill='#334155'/>
  <!-- Water Ingress Efflorescence Stain -->
  <ellipse cx='360' cy='280' rx='140' ry='120' fill='url(#water_leak)'/>
  <!-- Primary Diagonal 45 deg Shear Crack -->
  <path d='M 180 80 Q 240 140, 290 190 T 360 260 T 420 310 T 520 400 T 580 460' fill='none' stroke='#0f172a' stroke-width='6' stroke-linecap='round'/>
  <!-- Secondary branching hairline fractures -->
  <path d='M 290 190 Q 320 180, 360 170' fill='none' stroke='#1e293b' stroke-width='2.5'/>
  <path d='M 420 310 Q 460 330, 500 320' fill='none' stroke='#1e293b' stroke-width='3'/>
  <path d='M 360 260 Q 340 300, 330 350' fill='none' stroke='#1e293b' stroke-width='2'/>
  <!-- Measurement Scale Bar -->
  <rect x='640' y='420' width='120' height='12' fill='#ffffff' stroke='#000000' stroke-width='2'/>
  <rect x='640' y='420' width='30' height='12' fill='#000000'/>
  <rect x='700' y='420' width='30' height='12' fill='#000000'/>
  <text x='640' y='450' fill='#ffffff' font-family='Arial' font-size='12' font-weight='bold'>0    50   100 mm</text>
  <text x='30' y='40' fill='#f8fafc' font-family='Arial' font-size='20' font-weight='bold'>Structural Column #C-04: Diagonal Shear Fracture</text>
  <text x='30' y='65' fill='#cbd5e1' font-family='Arial' font-size='14'>Severe Crack Width: 2.45mm | Active Moisture Ingress</text>
</svg>"""
BUILDING_VALUATION_SVG = """<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#0f172a'/>
      <stop offset='100%' stop-color='#1e293b'/>
    </linearGradient>
    <linearGradient id='glass' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#38bdf8'/>
      <stop offset='100%' stop-color='#0284c7'/>
    </linearGradient>
  </defs>
  <rect width='800' height='500' fill='url(#bg)'/>
  <!-- Ground & Landscaping -->
  <rect y='440' width='800' height='60' fill='#064e3b'/>
  <!-- Luxury Residential Villa Structure -->
  <rect x='150' y='140' width='500' height='300' fill='#f8fafc' stroke='#94a3b8' stroke-width='2'/>
  <!-- Upper Floor Balcony & Cantilever -->
  <rect x='120' y='180' width='280' height='140' fill='#e2e8f0' stroke='#64748b' stroke-width='2'/>
  <rect x='140' y='200' width='240' height='100' fill='url(#glass)' opacity='0.85'/>
  <!-- Glass Balustrade -->
  <rect x='120' y='300' width='280' height='20' fill='#7dd3fc' opacity='0.7' stroke='#38bdf8'/>
  <!-- Ground Floor Panoramic Glazing -->
  <rect x='420' y='280' width='210' height='160' fill='url(#glass)' opacity='0.9'/>
  <!-- Architectural Timber Louvers -->
  <rect x='420' y='160' width='210' height='100' fill='#78350f'/>
  <line x1='420' y1='180' x2='630' y2='180' stroke='#d97706' stroke-width='3'/>
  <line x1='420' y1='200' x2='630' y2='200' stroke='#d97706' stroke-width='3'/>
  <line x1='420' y1='220' x2='630' y2='220' stroke='#d97706' stroke-width='3'/>
  <line x1='420' y1='240' x2='630' y2='240' stroke='#d97706' stroke-width='3'/>
  <!-- Entrance Canopy & Paved Walkway -->
  <rect x='280' y='380' width='120' height='60' fill='#334155'/>
  <polygon points='260,380 420,380 400,360 280,360' fill='#0f172a'/>
  <text x='40' y='50' fill='#f8fafc' font-family='Arial' font-size='22' font-weight='bold'>Modern Contemporary Luxury Villa Asset</text>
  <text x='40' y='80' fill='#94a3b8' font-family='Arial' font-size='14'>3,500 sqft Built-up | Premium Specifications | Superstructure 100%</text>
</svg>"""

def svg_to_data_url(svg_str: str) -> str:
    b64 = base64.b64encode(svg_str.encode('utf-8')).decode('utf-8')
    return f"data:image/svg+xml;base64,{b64}"

SAMPLE_SITE_IMAGE = svg_to_data_url(SITE_SAFETY_SVG)
SAMPLE_CRACK_IMAGE = svg_to_data_url(CRACK_INSPECTION_SVG)
SAMPLE_BUILDING_IMAGE = svg_to_data_url(BUILDING_VALUATION_SVG)
