// js/charts.js — SVG Data Visualizations for STAR PLUS 1.2

(function() {
  window.sparkline = function(data, color, width, height, isArea) {
    if (!data || !data.length) return '';
    width = width || 120;
    height = height || 40;
    color = color || '#1769E8';
    
    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    if (min === max) { min -= 1; max += 1; }

    var points = data.map(function(val, idx) {
      var x = (idx / (data.length - 1)) * width;
      var y = height - ((val - min) / (max - min)) * (height - 8) - 4;
      return x.toFixed(1) + ',' + y.toFixed(1);
    });

    var pathD = 'M ' + points.join(' L ');
    var id = 'grad-' + Math.random().toString(36).substr(2, 6);

    var html = '<svg width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none" style="overflow:visible;">';
    
    if (isArea) {
      var areaD = pathD + ' L ' + width + ',' + height + ' L 0,' + height + ' Z';
      html += '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
              '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.25"/>' +
              '<stop offset="100%" stop-color="' + color + '" stop-opacity="0.0"/>' +
              '</linearGradient></defs>';
      html += '<path d="' + areaD + '" fill="url(#' + id + ')"/>';
    }

    html += '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    html += '</svg>';
    return html;
  };

  window.areaChart = function(data, labels, color, width, height) {
    if (!data || !data.length) return '';
    width = width || 500;
    height = height || 180;
    color = color || '#1769E8';
    labels = labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var range = (max - min) || 1;
    min = Math.max(0, min - range * 0.1);
    max = max + range * 0.1;

    var padding = { top: 20, right: 20, bottom: 30, left: 40 };
    var w = width - padding.left - padding.right;
    var h = height - padding.top - padding.bottom;

    var points = data.map(function(val, idx) {
      var x = padding.left + (idx / (data.length - 1)) * w;
      var y = padding.top + h - ((val - min) / (max - min)) * h;
      return { x: x, y: y, val: val, label: labels[idx] || '' };
    });

    var pathD = 'M ' + points.map(function(p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' L ');
    var areaD = pathD + ' L ' + (padding.left + w) + ',' + (padding.top + h) + ' L ' + padding.left + ',' + (padding.top + h) + ' Z';
    var id = 'chart-grad-' + Math.random().toString(36).substr(2, 6);

    var svg = '<svg width="100%" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" style="font-family:Inter,sans-serif; overflow:visible;">';
    
    // Gradient
    svg += '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
           '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.3"/>' +
           '<stop offset="100%" stop-color="' + color + '" stop-opacity="0.0"/>' +
           '</linearGradient></defs>';

    // Horizontal Grid lines & Y axis labels
    var gridSteps = 3;
    for (var i = 0; i <= gridSteps; i++) {
      var gy = padding.top + (h / gridSteps) * i;
      var gval = Math.round(max - ((max - min) / gridSteps) * i);
      svg += '<line x1="' + padding.left + '" y1="' + gy + '" x2="' + (width - padding.right) + '" y2="' + gy + '" stroke="#E2E8F0" stroke-dasharray="4,4"/>';
      svg += '<text x="' + (padding.left - 8) + '" y="' + (gy + 4) + '" font-size="10" fill="#94A3B8" text-anchor="end">' + gval + '</text>';
    }

    // X axis labels
    points.forEach(function(p) {
      svg += '<text x="' + p.x + '" y="' + (height - 8) + '" font-size="10" fill="#64748B" text-anchor="middle">' + p.label + '</text>';
    });

    // Area & Line
    svg += '<path d="' + areaD + '" fill="url(#' + id + ')"/>';
    svg += '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';

    // Dots
    points.forEach(function(p) {
      svg += '<circle cx="' + p.x + '" cy="' + p.y + '" r="4" fill="#FFFFFF" stroke="' + color + '" stroke-width="2.5"/>';
    });

    svg += '</svg>';
    return svg;
  };

  window.donutRing = function(percentage, color, size, strokeWidth, centerText, subText) {
    size = size || 160;
    strokeWidth = strokeWidth || 14;
    color = color || '#16B978';
    percentage = Math.min(100, Math.max(0, percentage));

    var radius = (size - strokeWidth) / 2;
    var circumference = 2 * Math.PI * radius;
    var strokeDashoffset = circumference - (percentage / 100) * circumference;

    var svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="transform: rotate(-90deg);">';
    // Background track
    svg += '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + radius + '" fill="none" stroke="#E2E8F0" stroke-width="' + strokeWidth + '"/>';
    // Progress fill
    svg += '<circle cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + radius + '" fill="none" stroke="' + color + '" stroke-width="' + strokeWidth + '" ' +
           'stroke-dasharray="' + circumference + '" stroke-dashoffset="' + strokeDashoffset + '" stroke-linecap="round" style="transition: stroke-dashoffset 0.8s ease;"/>';
    svg += '</svg>';

    var overlay = '<div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">' +
                  '<div style="font-size:26px; font-weight:800; color:#0F172A; line-height:1;">' + (centerText || (percentage + '%')) + '</div>' +
                  (subText ? '<div style="font-size:11px; font-weight:600; color:#64748B; margin-top:4px; text-transform:uppercase; letter-spacing:0.05em;">' + subText + '</div>' : '') +
                  '</div>';

    return '<div style="position:relative; width:' + size + 'px; height:' + size + 'px; margin:0 auto;">' + svg + overlay + '</div>';
  };

  window.multiLineChart = function(seriesList, labels, width, height) {
    width = width || 500;
    height = height || 200;
    labels = labels || ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

    var allVals = [];
    seriesList.forEach(function(s) { allVals = allVals.concat(s.data); });
    var min = Math.min.apply(null, allVals);
    var max = Math.max.apply(null, allVals);
    var range = (max - min) || 1;
    min = Math.max(0, min - range * 0.1);
    max = max + range * 0.1;

    var padding = { top: 20, right: 20, bottom: 30, left: 40 };
    var w = width - padding.left - padding.right;
    var h = height - padding.top - padding.bottom;

    var svg = '<svg width="100%" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" style="font-family:Inter,sans-serif; overflow:visible;">';

    // Grid
    var gridSteps = 3;
    for (var i = 0; i <= gridSteps; i++) {
      var gy = padding.top + (h / gridSteps) * i;
      var gval = Math.round(max - ((max - min) / gridSteps) * i);
      svg += '<line x1="' + padding.left + '" y1="' + gy + '" x2="' + (width - padding.right) + '" y2="' + gy + '" stroke="#E2E8F0" stroke-dasharray="4,4"/>';
      svg += '<text x="' + (padding.left - 8) + '" y="' + (gy + 4) + '" font-size="10" fill="#94A3B8" text-anchor="end">' + gval + '</text>';
    }

    // X Labels
    labels.forEach(function(lbl, idx) {
      var lx = padding.left + (idx / (labels.length - 1)) * w;
      svg += '<text x="' + lx + '" y="' + (height - 8) + '" font-size="10" fill="#64748B" text-anchor="middle">' + lbl + '</text>';
    });

    // Series
    seriesList.forEach(function(series) {
      var points = series.data.map(function(val, idx) {
        var x = padding.left + (idx / (series.data.length - 1)) * w;
        var y = padding.top + h - ((val - min) / (max - min)) * h;
        return { x: x, y: y };
      });
      var pathD = 'M ' + points.map(function(p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' L ');
      svg += '<path d="' + pathD + '" fill="none" stroke="' + series.color + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
      points.forEach(function(p) {
        svg += '<circle cx="' + p.x + '" cy="' + p.y + '" r="3.5" fill="#FFFFFF" stroke="' + series.color + '" stroke-width="2"/>';
      });
    });

    svg += '</svg>';
    return svg;
  };
})();
