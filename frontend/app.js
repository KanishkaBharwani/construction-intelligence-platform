// BuildIntel AI - Modern React 18 Application
const { useState, useEffect, useRef } = React;

// Sample Assets for 1-Click Test Drive
const SAMPLE_SITE_IMAGE = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4MDAgNTAwJyB3aWR0aD0nODAwJyBoZWlnaHQ9JzUwMCc+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9J3NreScgeDE9JzAnIHkxPScwJyB4Mj0nMCcgeTI9JzEnPgogICAgICA8c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMzhiZGY4Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMTAwJScgc3RvcC1jb2xvcj0nI2JhZTZmZCcvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0nY29uY3JldGUnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz4KICAgICAgPHN0b3Agb2Zmc2V0PScwJScgc3RvcC1jb2xvcj0nIzk0YTNiOCcvPgogICAgICA8c3RvcCBvZmZzZXQ9JzEwMCUnIHN0b3AtY29sb3I9JyM2NDc0OGInLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSc4MDAnIGhlaWdodD0nNTAwJyBmaWxsPSd1cmwoI3NreSknLz4KICA8IS0tIEdyb3VuZCAtLT4KICA8cmVjdCB5PSczODAnIHdpZHRoPSc4MDAnIGhlaWdodD0nMTIwJyBmaWxsPScjNzgzNTBmJy8+CiAgPHJlY3QgeT0nNDAwJyB3aWR0aD0nODAwJyBoZWlnaHQ9JzEwMCcgZmlsbD0nIzQ1MWEwMycvPgogIDwhLS0gU3RydWN0dXJhbCBGcmFtZSBDb2x1bW5zICYgU2xhYnMgLS0+CiAgPHJlY3QgeD0nMTAwJyB5PScxMjAnIHdpZHRoPSc0MCcgaGVpZ2h0PScyNjAnIGZpbGw9J3VybCgjY29uY3JldGUpJyBzdHJva2U9JyMzMzQxNTUnIHN0cm9rZS13aWR0aD0nMycvPgogIDxyZWN0IHg9JzM0MCcgeT0nMTIwJyB3aWR0aD0nNDAnIGhlaWdodD0nMjYwJyBmaWxsPSd1cmwoI2NvbmNyZXRlKScgc3Ryb2tlPScjMzM0MTU1JyBzdHJva2Utd2lkdGg9JzMnLz4KICA8cmVjdCB4PSc1ODAnIHk9JzEyMCcgd2lkdGg9JzQwJyBoZWlnaHQ9JzI2MCcgZmlsbD0ndXJsKCNjb25jcmV0ZSknIHN0cm9rZT0nIzMzNDE1NScgc3Ryb2tlLXdpZHRoPSczJy8+CiAgPCEtLSBGbG9vciBTbGFicyAtLT4KICA8cmVjdCB4PSc4MCcgeT0nMjQwJyB3aWR0aD0nNTYwJyBoZWlnaHQ9JzI0JyBmaWxsPScjY2JkNWUxJyBzdHJva2U9JyM0NzU1NjknIHN0cm9rZS13aWR0aD0nMicvPgogIDxyZWN0IHg9JzgwJyB5PScxMjAnIHdpZHRoPSc1NjAnIGhlaWdodD0nMjQnIGZpbGw9JyNjYmQ1ZTEnIHN0cm9rZT0nIzQ3NTU2OScgc3Ryb2tlLXdpZHRoPScyJy8+CiAgPCEtLSBTY2FmZm9sZGluZyBGcmFtZSBvbiBMZWZ0IC0tPgogIDxsaW5lIHgxPScxMjAnIHkxPSczODAnIHgyPScxMjAnIHkyPScyNDAnIHN0cm9rZT0nI2Y1OWUwYicgc3Ryb2tlLXdpZHRoPSc0Jy8+CiAgPGxpbmUgeDE9JzE5MCcgeTE9JzM4MCcgeDI9JzE5MCcgeTI9JzI0MCcgc3Ryb2tlPScjZjU5ZTBiJyBzdHJva2Utd2lkdGg9JzQnLz4KICA8bGluZSB4MT0nMTIwJyB5MT0nMzQwJyB4Mj0nMTkwJyB5Mj0nMzQwJyBzdHJva2U9JyNmNTllMGInIHN0cm9rZS13aWR0aD0nMycvPgogIDxsaW5lIHgxPScxMjAnIHkxPScyOTAnIHgyPScxOTAnIHkyPScyOTAnIHN0cm9rZT0nI2Y1OWUwYicgc3Ryb2tlLXdpZHRoPSczJy8+CiAgPGxpbmUgeDE9JzEyMCcgeTE9JzM4MCcgeDI9JzE5MCcgeTI9JzI5MCcgc3Ryb2tlPScjZjU5ZTBiJyBzdHJva2Utd2lkdGg9JzInLz4KICA8bGluZSB4MT0nMTkwJyB5MT0nMzgwJyB4Mj0nMTIwJyB5Mj0nMjkwJyBzdHJva2U9JyNmNTllMGInIHN0cm9rZS13aWR0aD0nMicvPgogIDwhLS0gVG93ZXIgQ3JhbmUgaW4gQmFja2dyb3VuZCAtLT4KICA8bGluZSB4MT0nNjgwJyB5MT0nNDAnIHgyPSc2ODAnIHkyPSczODAnIHN0cm9rZT0nI2VhYjMwOCcgc3Ryb2tlLXdpZHRoPSc4Jy8+CiAgPGxpbmUgeDE9JzUyMCcgeTE9JzYwJyB4Mj0nNzYwJyB5Mj0nNjAnIHN0cm9rZT0nI2VhYjMwOCcgc3Ryb2tlLXdpZHRoPSc2Jy8+CiAgPGxpbmUgeDE9JzY4MCcgeTE9JzQwJyB4Mj0nNjAwJyB5Mj0nNjAnIHN0cm9rZT0nI2VhYjMwOCcgc3Ryb2tlLXdpZHRoPSczJy8+CiAgPGxpbmUgeDE9JzY4MCcgeTE9JzQwJyB4Mj0nNzQwJyB5Mj0nNjAnIHN0cm9rZT0nI2VhYjMwOCcgc3Ryb2tlLXdpZHRoPSczJy8+CiAgPGxpbmUgeDE9JzU4MCcgeTE9JzYwJyB4Mj0nNTgwJyB5Mj0nMTQwJyBzdHJva2U9JyMwZjE3MmEnIHN0cm9rZS1kYXNoYXJyYXk9JzQsNCcgc3Ryb2tlLXdpZHRoPScyJy8+CiAgPCEtLSBXb3JrZXJzIC0tPgogIDwhLS0gV29ya2VyIDEgb24gU2xhYiBFZGdlIChVbnByb3RlY3RlZCkgLS0+CiAgPGNpcmNsZSBjeD0nNTQwJyBjeT0nMTA1JyByPSc4JyBmaWxsPScjZmJiZjI0Jy8+IDwhLS0gSGFyZCBIYXQgLS0+CiAgPHJlY3QgeD0nNTM1JyB5PScxMTMnIHdpZHRoPScxMCcgaGVpZ2h0PScxNicgZmlsbD0nIzAyODRjNycvPiA8IS0tIEJsdWUgU2hpcnQgKE5vIFZlc3QpIC0tPgogIDxyZWN0IHg9JzUzNScgeT0nMTI5JyB3aWR0aD0nMTAnIGhlaWdodD0nMTQnIGZpbGw9JyMxZTI5M2InLz4KICA8IS0tIFdvcmtlciAyIG9uIFNjYWZmb2xkaW5nIC0tPgogIDxjaXJjbGUgY3g9JzE1NScgY3k9JzI3NScgcj0nOCcgZmlsbD0nI2ZmZmZmZicvPgogIDxyZWN0IHg9JzE1MCcgeT0nMjgzJyB3aWR0aD0nMTAnIGhlaWdodD0nMTYnIGZpbGw9JyNmOTczMTYnLz4gPCEtLSBIaWdoIFZpcyAtLT4KICA8cmVjdCB4PScxNTAnIHk9JzI5OScgd2lkdGg9JzEwJyBoZWlnaHQ9JzE0JyBmaWxsPScjMWUyOTNiJy8+CiAgPCEtLSBXb3JrZXIgMyBHcm91bmQgUmlnZ2VyIC0tPgogIDxjaXJjbGUgY3g9JzM5MCcgY3k9JzM2NScgcj0nOCcgZmlsbD0nI2ZiYmYyNCcvPgogIDxyZWN0IHg9JzM4NScgeT0nMzczJyB3aWR0aD0nMTAnIGhlaWdodD0nMTYnIGZpbGw9JyMyMmM1NWUnLz4KICA8cmVjdCB4PSczODUnIHk9JzM4OScgd2lkdGg9JzEwJyBoZWlnaHQ9JzE0JyBmaWxsPScjMWUyOTNiJy8+CiAgPHRleHQgeD0nMjAnIHk9JzQwJyBmaWxsPScjMGYxNzJhJyBmb250LWZhbWlseT0nQXJpYWwnIGZvbnQtc2l6ZT0nMjAnIGZvbnQtd2VpZ2h0PSdib2xkJz5ab25lIEItNDogU3RydWN0dXJhbCBGcmFtZSBDb25zdHJ1Y3Rpb24gU2l0ZTwvdGV4dD4KICA8dGV4dCB4PScyMCcgeT0nNjUnIGZpbGw9JyM0NzU1NjknIGZvbnQtZmFtaWx5PSdBcmlhbCcgZm9udC1zaXplPScxNCc+QnVpbGRJbnRlbCBNdWx0aW1vZGFsIFRlc3QgQmVuY2htYXJrIEltYWdlICMwMTwvdGV4dD4KPC9zdmc+";
const SAMPLE_CRACK_IMAGE = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4MDAgNTAwJyB3aWR0aD0nODAwJyBoZWlnaHQ9JzUwMCc+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9J2NvbmNyZXRlX3RleHR1cmUnIHgxPScwJyB5MT0nMCcgeDI9JzEnIHkyPScxJz4KICAgICAgPHN0b3Agb2Zmc2V0PScwJScgc3RvcC1jb2xvcj0nIzk0YTNiOCcvPgogICAgICA8c3RvcCBvZmZzZXQ9JzUwJScgc3RvcC1jb2xvcj0nIzY0NzQ4YicvPgogICAgICA8c3RvcCBvZmZzZXQ9JzEwMCUnIHN0b3AtY29sb3I9JyM0NzU1NjknLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9J3dhdGVyX2xlYWsnIGN4PSc0NSUnIGN5PSc1NSUnIHI9JzMwJSc+CiAgICAgIDxzdG9wIG9mZnNldD0nMCUnIHN0b3AtY29sb3I9J3JnYmEoMTQsIDExNiwgMTQ0LCAwLjYpJy8+CiAgICAgIDxzdG9wIG9mZnNldD0nNzAlJyBzdG9wLWNvbG9yPSdyZ2JhKDgsIDE0NSwgMTc4LCAwLjIpJy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMTAwJScgc3RvcC1jb2xvcj0ncmdiYSg4LCAxNDUsIDE3OCwgMCknLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDwhLS0gQ29uY3JldGUgU3VyZmFjZSAtLT4KICA8cmVjdCB3aWR0aD0nODAwJyBoZWlnaHQ9JzUwMCcgZmlsbD0ndXJsKCNjb25jcmV0ZV90ZXh0dXJlKScvPgogIDwhLS0gU3VyZmFjZSBQb3JlcyAmIEFnZ3JlZ2F0ZSBTdGFpbnMgLS0+CiAgPGNpcmNsZSBjeD0nMjAwJyBjeT0nMTUwJyByPSc2JyBmaWxsPScjMzM0MTU1Jy8+CiAgPGNpcmNsZSBjeD0nNjAwJyBjeT0nMzIwJyByPSc4JyBmaWxsPScjMzM0MTU1Jy8+CiAgPGNpcmNsZSBjeD0nMzgwJyBjeT0nNDIwJyByPSc1JyBmaWxsPScjMzM0MTU1Jy8+CiAgPGNpcmNsZSBjeD0nNjgwJyBjeT0nMTIwJyByPSc3JyBmaWxsPScjMzM0MTU1Jy8+CiAgPCEtLSBXYXRlciBJbmdyZXNzIEVmZmxvcmVzY2VuY2UgU3RhaW4gLS0+CiAgPGVsbGlwc2UgY3g9JzM2MCcgY3k9JzI4MCcgcng9JzE0MCcgcnk9JzEyMCcgZmlsbD0ndXJsKCN3YXRlcl9sZWFrKScvPgogIDwhLS0gUHJpbWFyeSBEaWFnb25hbCA0NSBkZWcgU2hlYXIgQ3JhY2sgLS0+CiAgPHBhdGggZD0nTSAxODAgODAgUSAyNDAgMTQwLCAyOTAgMTkwIFQgMzYwIDI2MCBUIDQyMCAzMTAgVCA1MjAgNDAwIFQgNTgwIDQ2MCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMGYxNzJhJyBzdHJva2Utd2lkdGg9JzYnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPgogIDwhLS0gU2Vjb25kYXJ5IGJyYW5jaGluZyBoYWlybGluZSBmcmFjdHVyZXMgLS0+CiAgPHBhdGggZD0nTSAyOTAgMTkwIFEgMzIwIDE4MCwgMzYwIDE3MCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMWUyOTNiJyBzdHJva2Utd2lkdGg9JzIuNScvPgogIDxwYXRoIGQ9J00gNDIwIDMxMCBRIDQ2MCAzMzAsIDUwMCAzMjAnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzFlMjkzYicgc3Ryb2tlLXdpZHRoPSczJy8+CiAgPHBhdGggZD0nTSAzNjAgMjYwIFEgMzQwIDMwMCwgMzMwIDM1MCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMWUyOTNiJyBzdHJva2Utd2lkdGg9JzInLz4KICA8IS0tIE1lYXN1cmVtZW50IFNjYWxlIEJhciAtLT4KICA8cmVjdCB4PSc2NDAnIHk9JzQyMCcgd2lkdGg9JzEyMCcgaGVpZ2h0PScxMicgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjMDAwMDAwJyBzdHJva2Utd2lkdGg9JzInLz4KICA8cmVjdCB4PSc2NDAnIHk9JzQyMCcgd2lkdGg9JzMwJyBoZWlnaHQ9JzEyJyBmaWxsPScjMDAwMDAwJy8+CiAgPHJlY3QgeD0nNzAwJyB5PSc0MjAnIHdpZHRoPSczMCcgaGVpZ2h0PScxMicgZmlsbD0nIzAwMDAwMCcvPgogIDx0ZXh0IHg9JzY0MCcgeT0nNDUwJyBmaWxsPScjZmZmZmZmJyBmb250LWZhbWlseT0nQXJpYWwnIGZvbnQtc2l6ZT0nMTInIGZvbnQtd2VpZ2h0PSdib2xkJz4wICAgIDUwICAgMTAwIG1tPC90ZXh0PgogIDx0ZXh0IHg9JzMwJyB5PSc0MCcgZmlsbD0nI2Y4ZmFmYycgZm9udC1mYW1pbHk9J0FyaWFsJyBmb250LXNpemU9JzIwJyBmb250LXdlaWdodD0nYm9sZCc+U3RydWN0dXJhbCBDb2x1bW4gI0MtMDQ6IERpYWdvbmFsIFNoZWFyIEZyYWN0dXJlPC90ZXh0PgogIDx0ZXh0IHg9JzMwJyB5PSc2NScgZmlsbD0nI2NiZDVlMScgZm9udC1mYW1pbHk9J0FyaWFsJyBmb250LXNpemU9JzE0Jz5TZXZlcmUgQ3JhY2sgV2lkdGg6IDIuNDVtbSB8IEFjdGl2ZSBNb2lzdHVyZSBJbmdyZXNzPC90ZXh0Pgo8L3N2Zz4=";
const SAMPLE_BUILDING_IMAGE = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4MDAgNTAwJyB3aWR0aD0nODAwJyBoZWlnaHQ9JzUwMCc+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9J2JnJyB4MT0nMCcgeTE9JzAnIHgyPScwJyB5Mj0nMSc+CiAgICAgIDxzdG9wIG9mZnNldD0nMCUnIHN0b3AtY29sb3I9JyMwZjE3MmEnLz4KICAgICAgPHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjMWUyOTNiJy8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSdnbGFzcycgeDE9JzAnIHkxPScwJyB4Mj0nMScgeTI9JzEnPgogICAgICA8c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMzhiZGY4Jy8+CiAgICAgIDxzdG9wIG9mZnNldD0nMTAwJScgc3RvcC1jb2xvcj0nIzAyODRjNycvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9JzgwMCcgaGVpZ2h0PSc1MDAnIGZpbGw9J3VybCgjYmcpJy8+CiAgPCEtLSBHcm91bmQgJiBMYW5kc2NhcGluZyAtLT4KICA8cmVjdCB5PSc0NDAnIHdpZHRoPSc4MDAnIGhlaWdodD0nNjAnIGZpbGw9JyMwNjRlM2InLz4KICA8IS0tIEx1eHVyeSBSZXNpZGVudGlhbCBWaWxsYSBTdHJ1Y3R1cmUgLS0+CiAgPHJlY3QgeD0nMTUwJyB5PScxNDAnIHdpZHRoPSc1MDAnIGhlaWdodD0nMzAwJyBmaWxsPScjZjhmYWZjJyBzdHJva2U9JyM5NGEzYjgnIHN0cm9rZS13aWR0aD0nMicvPgogIDwhLS0gVXBwZXIgRmxvb3IgQmFsY29ueSAmIENhbnRpbGV2ZXIgLS0+CiAgPHJlY3QgeD0nMTIwJyB5PScxODAnIHdpZHRoPScyODAnIGhlaWdodD0nMTQwJyBmaWxsPScjZTJlOGYwJyBzdHJva2U9JyM2NDc0OGInIHN0cm9rZS13aWR0aD0nMicvPgogIDxyZWN0IHg9JzE0MCcgeT0nMjAwJyB3aWR0aD0nMjQwJyBoZWlnaHQ9JzEwMCcgZmlsbD0ndXJsKCNnbGFzcyknIG9wYWNpdHk9JzAuODUnLz4KICA8IS0tIEdsYXNzIEJhbHVzdHJhZGUgLS0+CiAgPHJlY3QgeD0nMTIwJyB5PSczMDAnIHdpZHRoPScyODAnIGhlaWdodD0nMjAnIGZpbGw9JyM3ZGQzZmMnIG9wYWNpdHk9JzAuNycgc3Ryb2tlPScjMzhiZGY4Jy8+CiAgPCEtLSBHcm91bmQgRmxvb3IgUGFub3JhbWljIEdsYXppbmcgLS0+CiAgPHJlY3QgeD0nNDIwJyB5PScyODAnIHdpZHRoPScyMTAnIGhlaWdodD0nMTYwJyBmaWxsPSd1cmwoI2dsYXNzKScgb3BhY2l0eT0nMC45Jy8+CiAgPCEtLSBBcmNoaXRlY3R1cmFsIFRpbWJlciBMb3V2ZXJzIC0tPgogIDxyZWN0IHg9JzQyMCcgeT0nMTYwJyB3aWR0aD0nMjEwJyBoZWlnaHQ9JzEwMCcgZmlsbD0nIzc4MzUwZicvPgogIDxsaW5lIHgxPSc0MjAnIHkxPScxODAnIHgyPSc2MzAnIHkyPScxODAnIHN0cm9rZT0nI2Q5NzcwNicgc3Ryb2tlLXdpZHRoPSczJy8+CiAgPGxpbmUgeDE9JzQyMCcgeTE9JzIwMCcgeDI9JzYzMCcgeTI9JzIwMCcgc3Ryb2tlPScjZDk3NzA2JyBzdHJva2Utd2lkdGg9JzMnLz4KICA8bGluZSB4MT0nNDIwJyB5MT0nMjIwJyB4Mj0nNjMwJyB5Mj0nMjIwJyBzdHJva2U9JyNkOTc3MDYnIHN0cm9rZS13aWR0aD0nMycvPgogIDxsaW5lIHgxPSc0MjAnIHkxPScyNDAnIHgyPSc2MzAnIHkyPScyNDAnIHN0cm9rZT0nI2Q5NzcwNicgc3Ryb2tlLXdpZHRoPSczJy8+CiAgPCEtLSBFbnRyYW5jZSBDYW5vcHkgJiBQYXZlZCBXYWxrd2F5IC0tPgogIDxyZWN0IHg9JzI4MCcgeT0nMzgwJyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzYwJyBmaWxsPScjMzM0MTU1Jy8+CiAgPHBvbHlnb24gcG9pbnRzPScyNjAsMzgwIDQyMCwzODAgNDAwLDM2MCAyODAsMzYwJyBmaWxsPScjMGYxNzJhJy8+CiAgPHRleHQgeD0nNDAnIHk9JzUwJyBmaWxsPScjZjhmYWZjJyBmb250LWZhbWlseT0nQXJpYWwnIGZvbnQtc2l6ZT0nMjInIGZvbnQtd2VpZ2h0PSdib2xkJz5Nb2Rlcm4gQ29udGVtcG9yYXJ5IEx1eHVyeSBWaWxsYSBBc3NldDwvdGV4dD4KICA8dGV4dCB4PSc0MCcgeT0nODAnIGZpbGw9JyM5NGEzYjgnIGZvbnQtZmFtaWx5PSdBcmlhbCcgZm9udC1zaXplPScxNCc+Myw1MDAgc3FmdCBCdWlsdC11cCB8IFByZW1pdW0gU3BlY2lmaWNhdGlvbnMgfCBTdXBlcnN0cnVjdHVyZSAxMDAlPC90ZXh0Pgo8L3N2Zz4=";

// Utility for API headers including optional custom Gemini key
function getHeaders() {
  const headers = { "Content-Type": "application/json" };
  const key = localStorage.getItem("gemini_api_key");
  if (key) {
    headers["X-Gemini-Api-Key"] = key;
  }
  return headers;
}

// ==========================================
// Canvas Overlay Component
// ==========================================
function CanvasOverlay({ imageUrl, boundingBoxes = [], title }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageUrl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 500;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw bounding boxes
      boundingBoxes.forEach((box) => {
        const x = (box.xmin / 100) * canvas.width;
        const y = (box.ymin / 100) * canvas.height;
        const w = ((box.xmax - box.xmin) / 100) * canvas.width;
        const h = ((box.ymax - box.ymin) / 100) * canvas.height;

        // Box border & fill
        ctx.strokeStyle = box.color || "#EF4444";
        ctx.lineWidth = 4;
        ctx.fillStyle = (box.color || "#EF4444") + "33"; // 20% alpha
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);

        // Tag label badge
        const labelText = box.label + (box.confidence ? ` (${Math.round(box.confidence * 100)}%)` : "");
        ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
        const textWidth = ctx.measureText(labelText).width;
        ctx.fillStyle = box.color || "#EF4444";
        ctx.fillRect(x, y > 24 ? y - 24 : y, textWidth + 12, 22);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(labelText, x + 6, (y > 24 ? y - 24 : y) + 16);
      });
    };
  }, [imageUrl, boundingBoxes]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl">
      <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex justify-between items-center text-xs text-slate-300">
        <span className="font-semibold text-amber-400 flex items-center gap-1.5">
          <i data-lucide="scan" className="w-4 h-4"></i>
          {title || "Multimodal Visual Inspection Canvas"}
        </span>
        <span className="font-mono text-slate-400">{boundingBoxes.length} annotations detected</span>
      </div>
      <div className="flex justify-center p-2 bg-slate-950">
        <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-inner"></canvas>
      </div>
    </div>
  );
}

// ==========================================
// Main BuildIntel App Component
// ==========================================
function App() {
  const [activeTab, setActiveTab] = useState("safety");
  const [health, setHealth] = useState(null);
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem("gemini_api_key") || "");
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Module States
  // 1. Safety
  const [safetyImage, setSafetyImage] = useState(SAMPLE_SITE_IMAGE);
  const [safetyZone, setSafetyZone] = useState("Level 4 High-Rise Perimeter Formwork");
  const [safetyLoading, setSafetyLoading] = useState(false);
  const [safetyResult, setSafetyResult] = useState(null);

  // 2. Cracks
  const [crackImage, setCrackImage] = useState(SAMPLE_CRACK_IMAGE);
  const [crackMaterial, setCrackMaterial] = useState("Reinforced Concrete");
  const [crackAge, setCrackAge] = useState(6);
  const [crackLocation, setCrackLocation] = useState("Level 2 Perimeter Spandrel Beam");
  const [crackLoading, setCrackLoading] = useState(false);
  const [crackResult, setCrackResult] = useState(null);

  // 3. Valuation
  const [valArea, setValArea] = useState(4500);
  const [valPlot, setValPlot] = useState(6500);
  const [valFloors, setValFloors] = useState(3);
  const [valType, setValType] = useState("Residential Villa");
  const [valGrade, setValGrade] = useState("Premium Luxury");
  const [valTier, setValTier] = useState("Tier 1 Prime Urban");
  const [valStage, setValStage] = useState("Superstructure Complete");
  const [valImage, setValImage] = useState(SAMPLE_BUILDING_IMAGE);
  const [valLoading, setValLoading] = useState(false);
  const [valResult, setValResult] = useState(null);

  // 4. Planner
  const [planName, setPlanName] = useState("Skyline Commercial & Residential Tower");
  const [planType, setPlanType] = useState("Mixed-Use Commercial/Residential");
  const [planSqft, setPlanSqft] = useState(65000);
  const [planBudget, setPlanBudget] = useState(9500000);
  const [planMonths, setPlanMonths] = useState(20);
  const [planConstraints, setPlanConstraints] = useState("Strict municipal noise curfew 20:00-06:00, tight urban road access");
  const [planLoading, setPlanLoading] = useState(false);
  const [planResult, setPlanResult] = useState(null);

  // 5. Daily Log
  const [dsrProject, setDsrProject] = useState("Metro Central Plaza Phase II");
  const [dsrDate, setDsrDate] = useState(new Date().toISOString().split("T")[0]);
  const [dsrShift, setDsrShift] = useState("Day Shift (07:00 - 16:00)");
  const [dsrWeather, setDsrWeather] = useState("Clear Sky, 29°C, Wind 12 km/h");
  const [dsrTasks, setDsrTasks] = useState("Poured 140 m3 M35 concrete for Level 4 suspended slab.\nTied reinforcement for shear walls SW-3 and SW-4.\nInstalled conduit electrical piping on ceiling slab.");
  const [dsrLoading, setDsrLoading] = useState(false);
  const [dsrResult, setDsrResult] = useState(null);

  // 6. Weather
  const [wthTemp, setWthTemp] = useState(34);
  const [wthHumidity, setWthHumidity] = useState(75);
  const [wthWind, setWthWind] = useState(36);
  const [wthRain, setWthRain] = useState(40);
  const [wthLabel, setWthLabel] = useState("High Wind Gusts & Humid Overcast");
  const [wthLoading, setWthLoading] = useState(false);
  const [wthResult, setWthResult] = useState(null);

  // 7. Knowledge
  const [knowQuery, setKnowQuery] = useState("What are the minimum concrete cover requirements for reinforcement according to ACI 318?");
  const [knowDomain, setKnowDomain] = useState("Structural Concrete & Materials");
  const [knowLoading, setKnowLoading] = useState(false);
  const [knowResult, setKnowResult] = useState(null);

  // Fetch health status
  useEffect(() => {
    fetch("/health")
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => console.error("Health check error:", err));
  }, []);

  // Initialize Lucide icons on DOM updates
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // API Call Handlers
  const handleSafetyAnalyze = async () => {
    setSafetyLoading(true);
    try {
      const res = await fetch("/api/v1/safety/analyze", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          image_base64: safetyImage,
          zone_name: safetyZone,
          work_activities: ["Formwork Stripping", "Steel Rebar Assembly", "Tower Crane Lifting"]
        })
      });
      const data = await res.json();
      setSafetyResult(data);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setSafetyLoading(false);
    }
  };

  const handleCrackAnalyze = async () => {
    setCrackLoading(true);
    try {
      const res = await fetch("/api/v1/cracks/analyze", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          image_base64: crackImage,
          material: crackMaterial,
          structure_age_years: parseInt(crackAge),
          location: crackLocation
        })
      });
      const data = await res.json();
      setCrackResult(data);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setCrackLoading(false);
    }
  };

  const handleValuationEstimate = async () => {
    setValLoading(true);
    try {
      const res = await fetch("/api/v1/valuation/estimate", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          built_up_area_sqft: parseFloat(valArea),
          plot_area_sqft: parseFloat(valPlot),
          number_of_floors: parseInt(valFloors),
          project_type: valType,
          construction_grade: valGrade,
          location_tier: valTier,
          construction_stage: valStage,
          image_base64: valImage
        })
      });
      const data = await res.json();
      setValResult(data);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setValLoading(false);
    }
  };

  const handlePlannerGenerate = async () => {
    setPlanLoading(true);
    try {
      const res = await fetch("/api/v1/planner/generate", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          project_name: planName,
          project_type: planType,
          gross_sqft: parseFloat(planSqft),
          budget: parseFloat(planBudget),
          target_duration_months: parseInt(planMonths),
          site_constraints: planConstraints
        })
      });
      const data = await res.json();
      setPlanResult(data);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setPlanLoading(false);
    }
  };

  const handleDsrGenerate = async () => {
    setDsrLoading(true);
    try {
      const tasksList = dsrTasks.split("\n").filter(t => t.trim().length > 0);
      const res = await fetch("/api/v1/daily-log/generate", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          project_name: dsrProject,
          report_date: dsrDate,
          shift: dsrShift,
          weather_condition: dsrWeather,
          workforce: {
            "Carpenters": 12,
            "Steel Fixers": 16,
            "Masons": 8,
            "MEP Installers": 6,
            "General Labor": 18,
            "Engineers": 4
          },
          equipment: {
            "Potain Tower Crane": 7.5,
            "Concrete Boom Pump": 6.0,
            "CAT Excavator": 8.0,
            "125kVA Generator": 9.0
          },
          tasks_completed: tasksList,
          deliveries_received: [
            "32 MT Grade 60 Rebar",
            "350 Bags Portland Cement",
            "15 Bundles Electrical Conduits"
          ],
          incidents_or_delays: "Minor delay on transit mixer #3 due to perimeter gate congestion. No structural impact."
        })
      });
      const data = await res.json();
      setDsrResult(data);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setDsrLoading(false);
    }
  };

  const handleWeatherEvaluate = async () => {
    setWthLoading(true);
    try {
      const res = await fetch("/api/v1/weather/evaluate", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          temp_c: parseFloat(wthTemp),
          humidity_pct: parseInt(wthHumidity),
          wind_speed_kmh: parseFloat(wthWind),
          rain_probability_pct: parseInt(wthRain),
          condition_label: wthLabel
        })
      });
      const data = await res.json();
      setWthResult(data);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setWthLoading(false);
    }
  };

  const handleKnowledgeQuery = async (queryText = knowQuery) => {
    setKnowLoading(true);
    try {
      const res = await fetch("/api/v1/knowledge/query", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          query: queryText,
          domain: knowDomain
        })
      });
      const data = await res.json();
      setKnowResult(data);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setKnowLoading(false);
    }
  };

  // Helper for custom image upload
  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
              BI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  BuildIntel AI
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    Multimodal v1.0
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">Autonomous Construction Decision Support Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300 font-medium">
                {health ? health.active_engine : "Connecting to Engine..."}
              </span>
            </div>

            <button
              onClick={() => setShowKeyModal(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 transition flex items-center gap-1.5"
            >
              <i data-lucide="key" className="w-3.5 h-3.5"></i>
              {geminiKey ? "Gemini Key Configured" : "API Key Settings"}
            </button>

            <a
              href="/docs"
              target="_blank"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              <i data-lucide="code" className="w-3.5 h-3.5"></i>
              API Docs
            </a>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-2 border-t border-slate-800/50 text-sm">
          {[
            { id: "safety", label: "Site Safety Monitor", icon: "shield-alert" },
            { id: "cracks", label: "Crack & Defect Inspector", icon: "search" },
            { id: "valuation", label: "Real Estate Valuation", icon: "building" },
            { id: "planner", label: "Project Planner & Gantt", icon: "calendar" },
            { id: "daily_log", label: "Daily Site Assistant", icon: "clipboard-check" },
            { id: "weather", label: "Weather Advisory", icon: "cloud-rain" },
            { id: "knowledge", label: "Engineering Knowledge Hub", icon: "book-open" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <i data-lucide={tab.icon} className="w-4 h-4"></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* TAB 1: SAFETY */}
        {activeTab === "safety" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700/60 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">🦺</span>
                    Construction Site Safety Monitoring (OSHA 1926 Compliance)
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Multimodal visual inspection detecting PPE compliance, scaffolding defects, and fall hazards with normalized coordinate overlays.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSafetyImage(SAMPLE_SITE_IMAGE)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 transition"
                  >
                    Load Benchmark Site Image
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Zone / Location Identifier</label>
                  <input
                    type="text"
                    value={safetyZone}
                    onChange={(e) => setSafetyZone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Upload Custom Site Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setSafetyImage)}
                    className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-amber-400 hover:file:bg-slate-700"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSafetyAnalyze}
                    disabled={safetyLoading}
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                  >
                    {safetyLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        Analyzing Multimodal Imagery...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <i data-lucide="shield-alert" className="w-4 h-4"></i>
                        Execute Safety AI Inspection
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <CanvasOverlay
                  imageUrl={safetyImage}
                  boundingBoxes={safetyResult ? safetyResult.violations.map(v => v.bounding_box).filter(Boolean) : []}
                  title="Hazard Bounding Box Overlay"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                {safetyResult ? (
                  <div className="space-y-4">
                    <div className="glass-panel p-5 rounded-xl border-l-4 border-l-red-500">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Site Risk Index</span>
                          <div className="text-3xl font-extrabold text-white mt-0.5">
                            {safetyResult.overall_risk_score}
                            <span className="text-sm font-normal text-slate-400"> / 100</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          safetyResult.safety_level === "CRITICAL" || safetyResult.safety_level === "HIGH_RISK"
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        }`}>
                          {safetyResult.safety_level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        {safetyResult.supervisor_advisory}
                      </p>
                    </div>

                    <div className="glass-panel p-4 rounded-xl">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                        PPE Verification Grid ({safetyResult.detected_personnel_count} Workers Spotted)
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(safetyResult.ppe_compliance).map(([item, stats]) => (
                          <div key={item} className="bg-slate-900/70 p-2 rounded-lg border border-slate-800 flex justify-between items-center">
                            <span className="capitalize text-slate-300">{item.replace(/_/g, " ")}</span>
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              stats.compliant ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                            }`}>
                              {stats.compliant ? "COMPLIANT" : `${stats.missing_count} MISSING`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Detected Violations & OSHA Mandates ({safetyResult.violations.length})
                      </h4>
                      {safetyResult.violations.map((vio) => (
                        <div key={vio.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-100">{vio.title}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30">
                              {vio.severity}
                            </span>
                          </div>
                          <p className="text-slate-400 text-[11px]">{vio.description}</p>
                          <div className="text-amber-400 font-mono text-[10px]">OSHA Ref: {vio.osha_reference}</div>
                          <div className="bg-slate-950 p-2 rounded text-[11px] text-slate-300 border-l-2 border-amber-500">
                            <strong>Remediation:</strong> {vio.immediate_corrective_action}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <i data-lucide="shield-check" className="w-10 h-10 mb-2 text-slate-600"></i>
                    <p className="text-sm font-medium">Ready for Visual Safety Inspection</p>
                    <p className="text-xs text-slate-500 mt-1">Click "Execute Safety AI Inspection" to scan imagery for OSHA hazards.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CRACKS */}
        {activeTab === "cracks" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700/60 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">🔍</span>
                    Crack Detection & Structural Defect Analysis (ACI 224 / 318)
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Computer vision diagnostic evaluating crack width, shear propagation trajectory, and concrete structural integrity.
                  </p>
                </div>
                <button
                  onClick={() => setCrackImage(SAMPLE_CRACK_IMAGE)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 transition"
                >
                  Load Benchmark Concrete Crack
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Material Substrate</label>
                  <select
                    value={crackMaterial}
                    onChange={(e) => setCrackMaterial(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option>Reinforced Concrete</option>
                    <option>Pre-stressed Concrete</option>
                    <option>Brick Masonry</option>
                    <option>Foundation Wall</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Structure Age (Years)</label>
                  <input
                    type="number"
                    value={crackAge}
                    onChange={(e) => setCrackAge(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Upload Crack Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setCrackImage)}
                    className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-amber-400 hover:file:bg-slate-700"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleCrackAnalyze}
                    disabled={crackLoading}
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                  >
                    {crackLoading ? "Evaluating Shear Vectors..." : "Run Crack Forensic AI"}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <CanvasOverlay
                  imageUrl={crackImage}
                  boundingBoxes={crackResult ? crackResult.bounding_boxes : []}
                  title="Structural Defect Localization Canvas"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                {crackResult ? (
                  <div className="space-y-4">
                    <div className="glass-panel p-5 rounded-xl border-l-4 border-l-amber-500">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Integrity Score</span>
                          <div className="text-3xl font-extrabold text-white mt-0.5">
                            {crackResult.structural_integrity_score}
                            <span className="text-sm font-normal text-slate-400"> / 100</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                          {crackResult.severity}
                        </span>
                      </div>
                      <div className="mt-3 text-xs text-slate-300">
                        <strong>Classification:</strong> {crackResult.defect_type}
                      </div>
                    </div>

                    <div className="glass-panel p-4 rounded-xl grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Estimated Crack Width</span>
                        <div className="text-lg font-bold text-amber-400 mt-1">{crackResult.metrics.estimated_width_mm} mm</div>
                      </div>
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Estimated Length</span>
                        <div className="text-lg font-bold text-slate-200 mt-1">{crackResult.metrics.estimated_length_cm} cm</div>
                      </div>
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Water Ingress</span>
                        <div className="text-sm font-bold text-cyan-400 mt-1">
                          {crackResult.metrics.water_ingress_detected ? "Detected (Active)" : "None"}
                        </div>
                      </div>
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Rebar Exposure</span>
                        <div className="text-sm font-bold text-slate-200 mt-1">
                          {crackResult.metrics.rebar_exposure ? "Exposed" : "Cover Intact"}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                      <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Root Cause Engineering Diagnosis</h4>
                      <p className="text-slate-300 leading-relaxed">{crackResult.root_cause_analysis}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2.5">
                      <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">ACI Standard Remediation Plan</h4>
                      {crackResult.remediation_steps.map((step) => (
                        <div key={step.step_number} className="p-2.5 rounded bg-slate-950 border-l-2 border-amber-500 space-y-1">
                          <div className="font-bold text-slate-100">Step {step.step_number}: {step.action}</div>
                          <div className="text-amber-400 font-mono text-[10px]">Material: {step.recommended_material}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <i data-lucide="activity" className="w-10 h-10 mb-2 text-slate-600"></i>
                    <p className="text-sm font-medium">Ready for Structural Diagnostic</p>
                    <p className="text-xs text-slate-500 mt-1">Upload a crack image or click the benchmark sample to inspect.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VALUATION */}
        {activeTab === "valuation" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700/60 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">🏢</span>
                    Real Estate & Construction Cost Valuation
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Multimodal appraisal combining architectural images with civil engineering cost indices and projected ROI.
                  </p>
                </div>
                <button
                  onClick={() => setValImage(SAMPLE_BUILDING_IMAGE)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 transition"
                >
                  Load Benchmark Villa Model
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Built-up Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={valArea}
                    onChange={(e) => setValArea(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Plot Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={valPlot}
                    onChange={(e) => setValPlot(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Project Type</label>
                  <select
                    value={valType}
                    onChange={(e) => setValType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  >
                    <option>Residential Villa</option>
                    <option>Multi-Family Apartment</option>
                    <option>Commercial Office</option>
                    <option>Industrial Warehouse</option>
                    <option>Retail Complex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Specification Grade</label>
                  <select
                    value={valGrade}
                    onChange={(e) => setValGrade(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  >
                    <option>Economy</option>
                    <option>Standard</option>
                    <option>Premium Luxury</option>
                    <option>Ultra-Luxury</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleValuationEstimate}
                  disabled={valLoading}
                  className="py-2.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition"
                >
                  {valLoading ? "Calculating Valuation Model..." : "Calculate Valuation & Cost Breakdown"}
                </button>
              </div>
            </div>

            {valResult && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-l-blue-500">
                    <span className="text-xs uppercase font-bold text-slate-400">Total Construction Cost</span>
                    <div className="text-2xl font-black text-white mt-1">
                      ${valResult.estimated_total_cost.toLocaleString()}
                    </div>
                    <span className="text-xs text-slate-400">${valResult.cost_per_sqft}/sqft</span>
                  </div>

                  <div className="glass-panel p-5 rounded-xl border-l-4 border-l-emerald-500">
                    <span className="text-xs uppercase font-bold text-slate-400">Estimated Market Value</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">
                      ${valResult.estimated_market_value.toLocaleString()}
                    </div>
                    <span className="text-xs text-slate-400">${valResult.value_per_sqft}/sqft</span>
                  </div>

                  <div className="glass-panel p-5 rounded-xl border-l-4 border-l-amber-500">
                    <span className="text-xs uppercase font-bold text-slate-400">Projected Return (ROI)</span>
                    <div className="text-2xl font-black text-amber-400 mt-1">
                      +{valResult.projected_roi_percentage}%
                    </div>
                    <span className="text-xs text-slate-400">Confidence: {valResult.confidence_score}%</span>
                  </div>

                  <div className="glass-panel p-5 rounded-xl border-l-4 border-l-purple-500">
                    <span className="text-xs uppercase font-bold text-slate-400">Stage & Appraisal</span>
                    <div className="text-lg font-bold text-purple-300 mt-1 truncate">
                      {valStage}
                    </div>
                    <span className="text-xs text-slate-400">{valTier}</span>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
                    Itemized Cost Component Breakdown
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                    {Object.entries(valResult.cost_breakdown).map(([component, amount]) => (
                      <div key={component} className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 capitalize block truncate">{component.replace(/_/g, " ")}</span>
                        <div className="text-base font-bold text-slate-200 mt-1.5">${amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <strong>Market Comparables:</strong> {valResult.market_comparables_summary}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PLANNER */}
        {activeTab === "planner" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="border-b border-slate-700/60 pb-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">📅</span>
                  Construction Project Planning & CPM Scheduling
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Automated Phase-by-Phase schedule generation, Critical Path Method (CPM) calculation, and labor/plant resource allocation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Project Name</label>
                  <input
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Duration (Months)</label>
                  <input
                    type="number"
                    value={planMonths}
                    onChange={(e) => setPlanMonths(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handlePlannerGenerate}
                    disabled={planLoading}
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition"
                  >
                    {planLoading ? "Compiling CPM Timeline..." : "Generate Master Schedule"}
                  </button>
                </div>
              </div>
            </div>

            {planResult && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-base font-bold text-white">{planResult.project_name}</h3>
                      <p className="text-xs text-amber-400 font-mono mt-0.5">{planResult.critical_path_summary}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      Total: {planResult.total_estimated_duration_days} Days ({planResult.total_phases_count} Phases)
                    </span>
                  </div>

                  <div className="space-y-4">
                    {planResult.phases.map((ph) => (
                      <div key={ph.phase_id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-amber-400 font-bold">{ph.phase_id}</span>
                            <span className="font-bold text-slate-200 text-sm">{ph.name}</span>
                            {ph.is_critical_path && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30">
                                CRITICAL PATH
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 font-mono">Day {ph.start_day} - {ph.end_day} ({ph.duration_days}d)</span>
                        </div>

                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full ${ph.is_critical_path ? "bg-red-500" : "bg-amber-500"}`}
                            style={{ width: `${ph.progress_pct}%` }}
                          ></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                          <div>
                            <strong className="text-slate-300">Milestones:</strong> {ph.key_milestones.join(", ")}
                          </div>
                          <div>
                            <strong className="text-slate-300">Trades:</strong> {ph.required_labor_trades.join(", ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Project Risk Mitigation Strategy</h4>
                  <div className="space-y-2 text-xs">
                    {planResult.risk_mitigation_plan.map((rm, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between gap-4">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-200">{rm.risk}</span>
                          <p className="text-slate-400">{rm.mitigation}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] h-fit ${
                          rm.likelihood === "HIGH" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {rm.likelihood}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DAILY LOG */}
        {activeTab === "daily_log" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl no-print">
              <div className="border-b border-slate-700/60 pb-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">📋</span>
                  Daily Site Assistant & Contractor Report (DSR)
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Automated field reporting, equipment utilization tracking, and one-click contractor Daily Site Record export.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Project Title</label>
                  <input
                    type="text"
                    value={dsrProject}
                    onChange={(e) => setDsrProject(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Report Date</label>
                  <input
                    type="date"
                    value={dsrDate}
                    onChange={(e) => setDsrDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Shift</label>
                  <input
                    type="text"
                    value={dsrShift}
                    onChange={(e) => setDsrShift(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Weather Overview</label>
                  <input
                    type="text"
                    value={dsrWeather}
                    onChange={(e) => setDsrWeather(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Completed Tasks (Line Separated)</label>
                <textarea
                  rows="3"
                  value={dsrTasks}
                  onChange={(e) => setDsrTasks(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                ></textarea>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={handleDsrGenerate}
                  disabled={dsrLoading}
                  className="py-2.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition"
                >
                  {dsrLoading ? "Synthesizing DSR..." : "Generate Daily Site Report"}
                </button>
              </div>
            </div>

            {dsrResult && (
              <div className="glass-panel p-8 rounded-2xl space-y-6 printable-area">
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Daily Site Report (DSR)</h3>
                    <p className="text-xs text-slate-400">Log ID: {dsrResult.log_id} | {dsrResult.report_date}</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="no-print px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 font-semibold text-xs flex items-center gap-1.5"
                  >
                    <i data-lucide="printer" className="w-4 h-4"></i>
                    Print / Export PDF
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Total Workforce Mobilized</span>
                    <div className="text-2xl font-bold text-slate-100 mt-1">
                      {dsrResult.workforce_metrics.total_workers} Workers
                    </div>
                    <span className="text-xs text-slate-400">{dsrResult.workforce_metrics.man_hours_logged} Man-Hours</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Equipment Utilization</span>
                    <div className="text-2xl font-bold text-amber-400 mt-1">
                      {dsrResult.equipment_utilization_rate}%
                    </div>
                    <span className="text-xs text-slate-400">Operational Capacity</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Productivity Rating</span>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">
                      {dsrResult.progress_assessment.productivity_rating}
                    </div>
                    <span className="text-xs text-slate-400">Target Achieved: Yes</span>
                  </div>
                </div>

                <div
                  className="prose prose-invert max-w-none text-slate-300 text-sm bg-slate-950 p-6 rounded-xl border border-slate-800 font-sans leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: window.marked ? window.marked.parse(dsrResult.formatted_dsr_markdown) : dsrResult.formatted_dsr_markdown }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: WEATHER */}
        {activeTab === "weather" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="border-b border-slate-700/60 pb-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">⛅</span>
                  Weather-Aware Construction Advisory & Operational Matrix
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Predictive civil advisory for crane lifting (wind thresholds), mass concrete hydration (ACI 305R), and excavation safety.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Temperature (°C): {wthTemp}°C</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={wthTemp}
                    onChange={(e) => setWthTemp(e.target.value)}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Wind Speed (km/h): {wthWind} km/h</label>
                  <input
                    type="range"
                    min="0"
                    max="70"
                    value={wthWind}
                    onChange={(e) => setWthWind(e.target.value)}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Humidity (%): {wthHumidity}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={wthHumidity}
                    onChange={(e) => setWthHumidity(e.target.value)}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Rain Probability: {wthRain}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={wthRain}
                    onChange={(e) => setWthRain(e.target.value)}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleWeatherEvaluate}
                  disabled={wthLoading}
                  className="py-2.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition"
                >
                  {wthLoading ? "Evaluating Atmospheric Impact..." : "Evaluate Activity Go / No-Go Matrix"}
                </button>
              </div>
            </div>

            {wthResult && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-l-amber-500">
                    <span className="text-xs uppercase font-bold text-slate-400">Workability Index</span>
                    <div className="text-3xl font-black text-white mt-1">
                      {wthResult.overall_workability_score}
                      <span className="text-sm font-normal text-slate-400"> / 100</span>
                    </div>
                  </div>
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-l-red-500">
                    <span className="text-xs uppercase font-bold text-slate-400">Heat Stress Severity</span>
                    <div className="text-xl font-bold text-red-400 mt-1">
                      {wthResult.worker_safety_advisory.heat_stress_index}
                    </div>
                    <span className="text-xs text-slate-400 truncate block">{wthResult.worker_safety_advisory.mandatory_hydration_rest_cycle}</span>
                  </div>
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-l-yellow-500">
                    <span className="text-xs uppercase font-bold text-slate-400">Lightning Protocol</span>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {wthResult.worker_safety_advisory.lightning_protocol}
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
                    Activity Go / Caution / No-Go Engineering Matrix
                  </h3>
                  <div className="space-y-3">
                    {wthResult.activity_go_no_go_matrix.map((act, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <div className="space-y-1">
                          <div className="font-bold text-slate-100 text-sm">{act.activity_name}</div>
                          <p className="text-xs text-slate-400">{act.limiting_factor} - {act.engineering_reason}</p>
                          <div className="text-[10px] text-amber-400 font-mono">{act.guidelines}</div>
                        </div>
                        <span className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-wider whitespace-nowrap ${
                          act.status === "GO"
                            ? "bg-emerald-500 text-slate-950"
                            : act.status === "CAUTION"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-red-600 text-white"
                        }`}>
                          {act.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: KNOWLEDGE */}
        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="border-b border-slate-700/60 pb-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">📐</span>
                  Construction & Engineering Knowledge Assistant
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Technical intelligence grounded in international building codes (IBC 2024, ACI 318, OSHA 1926, AISC).
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "What are minimum concrete cover requirements according to ACI 318?",
                  "How to calculate curing time and hydration for M25 concrete in cold weather?",
                  "What are OSHA requirements for trench excavation sloping beyond 5 feet?",
                  "What are the standard structural design load combinations under ASCE 7-22?"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setKnowQuery(prompt);
                      handleKnowledgeQuery(prompt);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={knowQuery}
                  onChange={(e) => setKnowQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleKnowledgeQuery()}
                  placeholder="Ask any structural engineering, concrete technology, or building code question..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => handleKnowledgeQuery()}
                  disabled={knowLoading}
                  className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
                >
                  {knowLoading ? "Consulting Codes..." : "Ask Assistant"}
                </button>
              </div>
            </div>

            {knowResult && (
              <div className="glass-panel p-6 rounded-2xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{knowResult.query}</h3>
                    <span className="text-xs text-amber-400 font-medium">Domain: {knowResult.domain}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">
                    Engine: {knowResult.engine_used}
                  </span>
                </div>

                <div
                  className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: window.marked ? window.marked.parse(knowResult.answer_markdown) : knowResult.answer_markdown }}
                ></div>

                {knowResult.engineering_formulas_or_tables.length > 0 && (
                  <div className="space-y-4">
                    {knowResult.engineering_formulas_or_tables.map((tbl, i) => (
                      <div key={i} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">{tbl.title}</h4>
                        <div
                          className="prose prose-invert max-w-none text-xs text-slate-300 overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: window.marked ? window.marked.parse(tbl.content) : tbl.content }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cited Standards</h4>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {knowResult.cited_standards.map((std, i) => (
                        <li key={i} className="flex items-center gap-1.5 font-mono text-amber-300">
                          <i data-lucide="check" className="w-3 h-3 text-emerald-400"></i>
                          {std}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Practical Field Tips</h4>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {knowResult.practical_site_tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <i data-lucide="chevron-right" className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"></i>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full space-y-4 border border-slate-700">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <i data-lucide="key" className="w-4 h-4 text-amber-400"></i>
                Google Gemini API Key
              </h3>
              <button onClick={() => setShowKeyModal(false)} className="text-slate-400 hover:text-white">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your Gemini API key to enable online multimodal LLM inference with Gemini 2.0 Flash. If left blank, BuildIntel AI runs seamlessly with its calibrated civil engineering domain engine.
            </p>
            <div>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  localStorage.removeItem("gemini_api_key");
                  setGeminiKey("");
                  setShowKeyModal(false);
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Clear Key
              </button>
              <button
                onClick={() => {
                  if (geminiKey.trim()) {
                    localStorage.setItem("gemini_api_key", geminiKey.trim());
                  }
                  setShowKeyModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-600 shadow"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
