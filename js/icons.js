// js/icons.js — Complete SVG Icon & Mascot System for STAR PLUS 1.2

(function() {
  var PATHS = {
    overview: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    systems: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    health: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    body: '<circle cx="12" cy="5" r="3"/><path d="M6.5 9h11a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-3 0v-3h-1v10a1.5 1.5 0 0 1-3 0v-6h-1v6a1.5 1.5 0 0 1-3 0V12h-1v3a1.5 1.5 0 0 1-3 0v-4a2 2 0 0 1 2-2z"/>',
    vitals: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    assessments: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    wellness: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    radiation: '<circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
    activity: '<path d="M18 20V10M12 20V4M6 20v-6"/>',
    alerts: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    mission: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>',
    learn: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    nasadata: '<circle cx="12" cy="12" r="3"/><path d="M3 12a9 9 0 0 1 18 0 9 9 0 0 1-18 0z"/><path d="M12 3a9 9 0 0 1 0 18 9 9 0 0 1 0-18z"/>',
    orbit: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/>',
    satellite: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/>',
    profile: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    crew: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    control: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    checkcircle: '<circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    arrowup: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    arrowdown: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    heartpulse: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/><path d="M5 12h14"/>',
    lung: '<path d="M12 4v16M8 8a4 4 0 0 0-4 4v5a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3V8zM16 8a4 4 0 0 1 4 4v5a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3V8z"/>',
    lungs: '<path d="M12 4v16M8 8a4 4 0 0 0-4 4v5a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3V8zM16 8a4 4 0 0 1 4 4v5a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3V8z"/>',
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>',
    bone: '<path d="M17 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2 1h-6a2.5 2.5 0 0 1-2-1 2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 2 1h6a2.5 2.5 0 0 1 2-1z"/>',
    bones: '<path d="M17 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2 1h-6a2.5 2.5 0 0 1-2-1 2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 2 1h6a2.5 2.5 0 0 1 2-1z"/>',
    eye: '<circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>',
    eyes: '<circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>',
    digestive: '<path d="M12 2v4M8 6h8c2 0 4 2 4 4v2c0 4-3 8-8 8s-8-4-8-8v-2c0-2 2-4 4-4z"/><path d="M9 14s1.5 2 3 2 3-2 3-2"/>',
    muscle: '<path d="M6 5h12v4H6z"/><path d="M4 9h16v6H4z"/><path d="M6 15h12v4H6z"/>',
    muscles: '<path d="M6 5h12v4H6z"/><path d="M4 9h16v6H4z"/><path d="M6 15h12v4H6z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    immune: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    sleep: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    gamepad: '<rect x="2" y="6" width="20" height="12" rx="6"/><path d="M6 12h4m-2-2v4m10-2h.01m-3-2h.01m0 4h.01m3 0h.01"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    thermometer: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    sparkles: '<path d="M12 3l1.912 5.885L20 10.8l-4.75 3.65 1.815 5.85L12 16.55l-5.065 3.75 1.815-5.85L4 10.8l6.088-1.915L12 3z"/>',
    rotate: '<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'
  };

  window.icon = function(name, size, strokeWidth) {
    size = size || 18;
    strokeWidth = strokeWidth || 2;
    var path = PATHS[name] || PATHS.overview;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + strokeWidth + '" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  };

  // Complex multi-colored SVGs (NASA Insignia, 3D Star Logo, Cute Astronaut Mascot)
  window.nasaLogo = function(size) {
    size = size || 32;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">' +
             '<circle cx="50" cy="50" r="48" fill="#0B3D91"/>' +
             '<path d="M18 64C26 80 44 86 64 82C78 78 88 66 88 50C88 34 78 20 62 16C44 12 26 22 18 36" stroke="#FC3D21" stroke-width="6" stroke-linecap="round"/>' +
             '<path d="M10 42L85 24L52 88" stroke="#FC3D21" stroke-width="4" stroke-linejoin="round"/>' +
             '<circle cx="28" cy="30" r="1.5" fill="#FFFFFF"/>' +
             '<circle cx="70" cy="35" r="1.5" fill="#FFFFFF"/>' +
             '<circle cx="35" cy="70" r="1.5" fill="#FFFFFF"/>' +
             '<circle cx="65" cy="65" r="1.5" fill="#FFFFFF"/>' +
             '<circle cx="45" cy="25" r="1" fill="#FFFFFF"/>' +
             '<circle cx="78" cy="48" r="1.2" fill="#FFFFFF"/>' +
             '<text x="50" y="58" font-family="Helvetica, Arial, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">NASA</text>' +
           '</svg>';
  };

  window.starLogo3D = function(size) {
    size = size || 32;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle; filter:drop-shadow(0 2px 8px rgba(0,113,227,0.4));">' +
             '<defs>' +
               '<linearGradient id="starGrad1" x1="0%" y1="0%" x2="100%" y2="100%">' +
                 '<stop offset="0%" stop-color="#38BDF8"/>' +
                 '<stop offset="100%" stop-color="#0066CC"/>' +
               '</linearGradient>' +
               '<linearGradient id="starGrad2" x1="0%" y1="100%" x2="100%" y2="0%">' +
                 '<stop offset="0%" stop-color="#004C99"/>' +
                 '<stop offset="100%" stop-color="#0071E3"/>' +
               '</linearGradient>' +
             '</defs>' +
             '<polygon points="20,2 25,14 38,15 28,24 31,37 20,30 9,37 12,24 2,15 15,14" fill="url(#starGrad1)"/>' +
             '<polygon points="20,2 25,14 20,30 15,14" fill="url(#starGrad2)" opacity="0.85"/>' +
             '<polygon points="20,30 31,37 28,24" fill="#003D7A" opacity="0.6"/>' +
             '<circle cx="20" cy="18" r="3" fill="#FFFFFF" opacity="0.9"/>' +
           '</svg>';
  };

  window.mascotAvatar = function(size) {
    size = size || 54;
    return '<div class="mascot-avatar-container" style="width:' + size + 'px; height:' + size + 'px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:linear-gradient(135deg, #1E293B, #0F172A); border:2px solid #38BDF8; box-shadow:0 4px 14px rgba(56,189,248,0.3);">' +
             '<svg width="' + (size * 0.72) + '" height="' + (size * 0.72) + '" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
               '<!-- Helmet Background -->' +
               '<circle cx="32" cy="32" r="26" fill="#F8FAFC"/>' +
               '<circle cx="32" cy="32" r="26" stroke="#CBD5E1" stroke-width="2"/>' +
               '<!-- Visor Glass -->' +
               '<ellipse cx="32" cy="31" rx="19" ry="15" fill="#0F172A"/>' +
               '<!-- Visor Reflection -->' +
               '<path d="M19 25C22 20 28 19 35 19C41 19 45 21 45 21" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>' +
               '<circle cx="25" cy="27" r="2.5" fill="#38BDF8"/>' +
               '<circle cx="39" cy="27" r="2.5" fill="#38BDF8"/>' +
               '<!-- Helmet Details -->' +
               '<rect x="28" y="52" width="8" height="4" rx="2" fill="#94A3B8"/>' +
               '<circle cx="8" cy="32" r="3" fill="#64748B"/>' +
               '<circle cx="56" cy="32" r="3" fill="#64748B"/>' +
             '</svg>' +
           '</div>';
  };
})();
