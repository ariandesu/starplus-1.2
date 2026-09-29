// js/charts.js — Apple-grade SVG Visualizations for STAR PLUS 1.2

(function() {
  // Smooth Spline Curve Generator (Apple Health & Stocks aesthetic)
  function getBezierPath(points, tension) {
    tension = tension || 0.2;
    if (!points || !points.length) return '';
    if (points.length === 1) return 'M ' + points[0].x.toFixed(1) + ',' + points[0].y.toFixed(1);
    var d = 'M ' + points[0].x.toFixed(1) + ',' + points[0].y.toFixed(1);
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[i === 0 ? 0 : i - 1];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = points[i + 2 < points.length ? i + 2 : i + 1];
      var cp1x = p1.x + (p2.x - p0.x) * tension;
      var cp1y = p1.y + (p2.y - p0.y) * tension;
      var cp2x = p2.x - (p3.x - p1.x) * tension;
      var cp2y = p2.y - (p3.y - p1.y) * tension;
      d += ' C ' + cp1x.toFixed(1) + ',' + cp1y.toFixed(1) + ' ' + cp2x.toFixed(1) + ',' + cp2y.toFixed(1) + ' ' + p2.x.toFixed(1) + ',' + p2.y.toFixed(1);
    }
    return d;
  }

  window.sparkline = function(data, color, width, height, isArea) {
    if (!data || !data.length) return '';
    width = width || 120;
    height = height || 38;
    color = color || '#0071E3';
    
    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    if (min === max) { min -= 1; max += 1; }

    var points = data.map(function(val, idx) {
      var x = (idx / (data.length - 1)) * (width - 4) + 2;
      var y = height - ((val - min) / (max - min)) * (height - 10) - 5;
      return { x: x, y: y };
    });

    var pathD = getBezierPath(points, 0.18);
    var id = 'grad-' + Math.random().toString(36).substr(2, 6);

    var html = '<svg width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" style="overflow:visible;">';
    
    html += '<defs>' +
              '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
                '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.32"/>' +
                '<stop offset="100%" stop-color="' + color + '" stop-opacity="0.0"/>' +
              '</linearGradient>' +
              '<filter id="glow-' + id + '" x="-20%" y="-20%" width="140%" height="140%">' +
                '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="' + color + '" flood-opacity="0.25"/>' +
              '</filter>' +
            '</defs>';

    if (isArea) {
      var lastP = points[points.length - 1];
      var areaD = pathD + ' L ' + lastP.x.toFixed(1) + ',' + (height + 2) + ' L ' + points[0].x.toFixed(1) + ',' + (height + 2) + ' Z';
      html += '<path d="' + areaD + '" fill="url(#' + id + ')"/>';
    }

    html += '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow-' + id + ')"/>';
    
    // Glowing pulse on the latest reading
    var last = points[points.length - 1];
    html += '<circle cx="' + last.x.toFixed(1) + '" cy="' + last.y.toFixed(1) + '" r="3" fill="#FFFFFF" stroke="' + color + '" stroke-width="2"/>';
    
    html += '</svg>';
    return html;
  };

  window.areaChart = function(data, labels, color, width, height) {
    if (!data || !data.length) return '';
    width = width || 520;
    height = height || 190;
    color = color || '#0071E3';
    labels = labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var range = (max - min) || 1;
    min = Math.max(0, min - range * 0.12);
    max = max + range * 0.12;

    var padding = { top: 22, right: 20, bottom: 32, left: 44 };
    var w = width - padding.left - padding.right;
    var h = height - padding.top - padding.bottom;

    var points = data.map(function(val, idx) {
      var x = padding.left + (idx / (data.length - 1)) * w;
      var y = padding.top + h - ((val - min) / (max - min)) * h;
      return { x: x, y: y, val: val, label: labels[idx] || '' };
    });

    var pathD = getBezierPath(points, 0.2);
    var id = 'chart-grad-' + Math.random().toString(36).substr(2, 6);

    var svg = '<svg width="100%" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" style="font-family:Inter,-apple-system,sans-serif; overflow:visible;">';
    
    svg += '<defs>' +
             '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
               '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.28"/>' +
               '<stop offset="60%" stop-color="' + color + '" stop-opacity="0.08"/>' +
               '<stop offset="100%" stop-color="' + color + '" stop-opacity="0.0"/>' +
             '</linearGradient>' +
             '<filter id="glow-chart-' + id + '" x="-20%" y="-20%" width="140%" height="140%">' +
               '<feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="' + color + '" flood-opacity="0.28"/>' +
             '</filter>' +
           '</defs>';

    // Horizontal Grid lines & Y axis labels
    var gridSteps = 3;
    for (var i = 0; i <= gridSteps; i++) {
      var gy = padding.top + (h / gridSteps) * i;
      var gval = Math.round(max - ((max - min) / gridSteps) * i);
      svg += '<line x1="' + padding.left + '" y1="' + gy + '" x2="' + (width - padding.right) + '" y2="' + gy + '" stroke="rgba(226, 232, 240, 0.7)" stroke-dasharray="3,4" stroke-width="1"/>';
      svg += '<text x="' + (padding.left - 10) + '" y="' + (gy + 4) + '" font-size="10" font-family="JetBrains Mono, monospace" font-weight="500" fill="#94A3B8" text-anchor="end">' + gval + '</text>';
    }

    // X axis labels
    points.forEach(function(p) {
      svg += '<text x="' + p.x + '" y="' + (height - 8) + '" font-size="11" font-weight="500" fill="#64748B" text-anchor="middle">' + p.label + '</text>';
    });

    // Area fill
    var lastP = points[points.length - 1];
    var areaD = pathD + ' L ' + lastP.x.toFixed(1) + ',' + (padding.top + h) + ' L ' + points[0].x.toFixed(1) + ',' + (padding.top + h) + ' Z';
    svg += '<path d="' + areaD + '" fill="url(#' + id + ')"/>';

    // Stroke line
    svg += '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow-chart-' + id + ')"/>';

    // Interactive looking data dots
    points.forEach(function(p) {
      svg += '<circle cx="' + p.x + '" cy="' + p.y + '" r="4.5" fill="#FFFFFF" stroke="' + color + '" stroke-width="2.5" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.08));"/>';
    });

    svg += '</svg>';
    return svg;
  };

  window.donutRing = function(percentage, color, size, strokeWidth, centerText, subText) {
    size = size || 160;
    strokeWidth = strokeWidth || 14;
    color = color || '#10B981';
    percentage = Math.min(100, Math.max(0, percentage));

    var radius = (size - strokeWidth) / 2;
    var circumference = 2 * Math.PI * radius;
    var strokeDashoffset = circumference - (percentage / 100) * circumference;

    var gradId = 'donut-grad-' + Math.random().toString(36).substr(2, 6);

    var svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="transform: rotate(-90deg); overflow:visible;">';
    
    // Background track
    svg += '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + radius + '" fill="none" stroke="rgba(226, 232, 240, 0.6)" stroke-width="' + strokeWidth + '"/>';
    
    // Progress fill with subtle shadow
    svg += '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + radius + '" fill="none" stroke="' + color + '" stroke-width="' + strokeWidth + '" ' +
           'stroke-dasharray="' + circumference + '" stroke-dashoffset="' + strokeDashoffset + '" stroke-linecap="round" ' +
           'style="transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1); filter: drop-shadow(0 2px 6px ' + color + '40);"/>';
    svg += '</svg>';

    var overlay = '<div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; pointer-events:none;">' +
                  '<div style="font-size:28px; font-weight:800; font-family:JetBrains Mono, monospace; color:#0F172A; line-height:1; letter-spacing:-0.03em;">' + (centerText || (percentage + '%')) + '</div>' +
                  (subText ? '<div style="font-size:10px; font-weight:700; color:#64748B; margin-top:5px; text-transform:uppercase; letter-spacing:0.08em;">' + subText + '</div>' : '') +
                  '</div>';

    return '<div style="position:relative; width:' + size + 'px; height:' + size + 'px; margin:0 auto;">' + svg + overlay + '</div>';
  };

  window.multiLineChart = function(seriesList, labels, width, height) {
    width = width || 520;
    height = height || 200;
    labels = labels || ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

    var allVals = [];
    seriesList.forEach(function(s) { allVals = allVals.concat(s.data); });
    var min = Math.min.apply(null, allVals);
    var max = Math.max.apply(null, allVals);
    var range = (max - min) || 1;
    min = Math.max(0, min - range * 0.12);
    max = max + range * 0.12;

    var padding = { top: 22, right: 20, bottom: 32, left: 44 };
    var w = width - padding.left - padding.right;
    var h = height - padding.top - padding.bottom;

    var svg = '<svg width="100%" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" style="font-family:Inter,-apple-system,sans-serif; overflow:visible;">';

    // Grid
    var gridSteps = 3;
    for (var i = 0; i <= gridSteps; i++) {
      var gy = padding.top + (h / gridSteps) * i;
      var gval = Math.round(max - ((max - min) / gridSteps) * i);
      svg += '<line x1="' + padding.left + '" y1="' + gy + '" x2="' + (width - padding.right) + '" y2="' + gy + '" stroke="rgba(226, 232, 240, 0.7)" stroke-dasharray="3,4"/>';
      svg += '<text x="' + (padding.left - 10) + '" y="' + (gy + 4) + '" font-size="10" font-family="JetBrains Mono, monospace" font-weight="500" fill="#94A3B8" text-anchor="end">' + gval + '</text>';
    }

    // X Labels
    labels.forEach(function(lbl, idx) {
      var lx = padding.left + (idx / (labels.length - 1)) * w;
      svg += '<text x="' + lx + '" y="' + (height - 8) + '" font-size="11" font-weight="500" fill="#64748B" text-anchor="middle">' + lbl + '</text>';
    });

    // Series
    seriesList.forEach(function(series) {
      var points = series.data.map(function(val, idx) {
        var x = padding.left + (idx / (series.data.length - 1)) * w;
        var y = padding.top + h - ((val - min) / (max - min)) * h;
        return { x: x, y: y };
      });
      var pathD = getBezierPath(points, 0.18);
      svg += '<path d="' + pathD + '" fill="none" stroke="' + series.color + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
      points.forEach(function(p) {
        svg += '<circle cx="' + p.x + '" cy="' + p.y + '" r="3.5" fill="#FFFFFF" stroke="' + series.color + '" stroke-width="2"/>';
      });
    });

    svg += '</svg>';
    return svg;
  };
})();
