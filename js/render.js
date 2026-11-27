window.AviralRender = (() => {
  function formatINR(amount) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  }

  function renderStats(container, stats) {
    container.innerHTML = stats
      .map(
        (item) => `
        <div class="stat-item">
          <div class="stat-value">${item.value}</div>
          <div class="stat-label">${item.label}</div>
        </div>
      `
      )
      .join('');
  }

  function renderLands(container, lands) {
    if (!lands.length) {
      container.innerHTML = `<p style="color:var(--text-secondary)">No land parcels match that filter right now. Try selecting "All Lands".</p>`;
      return;
    }

    container.innerHTML = lands
      .map(
        (land) => `
        <article class="land-card" data-land-id="${land._id}">
          <div class="land-media">
            <img src="${land.image}" alt="${land.name} — Aviral Infratech Lucknow" loading="lazy" />
            <div class="land-badges">
              <span class="badge-status">${land.status}</span>
              <span class="badge-distance">${land.airportDistance}</span>
            </div>
          </div>
          <div class="land-body">
            <div class="land-location">${land.location}</div>
            <h3 class="land-title">${land.name}</h3>
            <p class="land-summary">${land.summary}</p>
            <div class="land-specs">
              <div class="land-spec">
                <strong>${land.totalArea}</strong>
                <span>Total Layout Area</span>
              </div>
              <div class="land-spec">
                <strong>${land.plotRange}</strong>
                <span>Plot Sizes</span>
              </div>
              <div class="land-spec">
                <strong>${land.roadWidth}</strong>
                <span>Internal Roads</span>
              </div>
            </div>
            <div class="land-highlights">
              ${land.highlights.map((chip) => `<span class="land-chip">${chip}</span>`).join('')}
            </div>
            <div class="land-footer">
              <div class="land-price-hint">
                <span>Site Price</span>
                <strong>₹${land.ratePerSqft.toLocaleString('en-IN')} / sq.ft.</strong>
              </div>
              <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
                <a href="#layout" class="btn btn-outline btn-sm" data-select-project="${land._id}">Layout</a>
                <button type="button" class="btn btn-primary btn-sm" data-inquire-land="${land.name} (₹${land.ratePerSqft.toLocaleString('en-IN')}/sq.ft.)">Book Visit</button>
              </div>
            </div>
          </div>
        </article>
      `
      )
      .join('');
  }

  function renderPlans(container, plans, mode) {
    container.className = `plans-grid ${mode === 'payment' ? 'payment-mode' : ''}`;
    container.innerHTML = plans
      .map(
        (plan) => `
        <article class="plan-card ${plan.featured ? 'featured' : ''}">
          <span class="plan-badge">${plan.badge}</span>
          <h3 class="plan-title">${plan.title}</h3>
          <div class="plan-range">${plan.range}</div>
          <p class="plan-desc">${plan.description}</p>
          <ul class="plan-list">
            ${plan.features.map((f) => `<li>${f}</li>`).join('')}
          </ul>
          <button
            type="button"
            class="btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-sm"
            data-choose-plan="${plan.title}"
            data-plan-sqft="${plan.defaultSqft}"
          >
            Select This Plan
          </button>
        </article>
      `
      )
      .join('');
  }

  function renderLayoutPlots(container, plots, selectedId) {
    const row1 = plots.slice(0, 9);
    const row2 = plots.slice(9, 18);
    const row3 = plots.slice(18, 27);
    const row4 = plots.slice(27, 36);

    const buildRow = (list) =>
      `<div class="plots-grid-cad">
        ${list
          .map((p) => {
            const cls = [
              'plot-cell',
              p.status === 'corner' ? 'corner' : '',
              p.status === 'booked' ? 'booked' : '',
              p.id === selectedId ? 'selected' : ''
            ]
              .filter(Boolean)
              .join(' ');
            return `
              <button type="button" class="${cls}" data-plot-id="${p.id}" title="Plot #${p.id} — ${p.area} sq.ft. (${p.facing})">
                <strong>#${p.id}</strong>
                <span>${p.area} sf</span>
              </button>
            `;
          })
          .join('')}
      </div>`;

    container.innerHTML = `
      <div class="cad-highway-bar">KANPUR ROAD TO RAEBARELY ROAD LINK MARG • 2 KM FROM JUNAB GANJ TIRAHA & AIRPORT CORRIDOR</div>
      ${buildRow(row1)}
      <div class="cad-road-strip">25'-0" WIDE BLACKTOP ROAD</div>
      ${buildRow(row2)}
      <div class="cad-road-strip">25'-0" WIDE INTERNAL ROAD</div>
      ${buildRow(row3)}
      <div class="cad-road-strip">25'-0" WIDE INTERNAL ROAD</div>
      ${buildRow(row4)}
    `;
  }

  function renderPlotInspector(container, plot) {
    if (!plot) return;
    const statusLabel =
      plot.status === 'corner'
        ? 'Corner / Premium Available'
        : plot.status === 'booked'
        ? 'Allotted / Booked'
        : 'Available for Registry';

    const statusColor =
      plot.status === 'booked' ? '#6B7280' : plot.status === 'corner' ? '#EA580C' : '#0F766E';

    const approxEstimate = formatINR(plot.area * 1999);

    container.innerHTML = `
      <span class="eyebrow" style="margin-bottom:0.65rem;">Aura City / Aviral City • Plot Inspector</span>
      <h3 style="font-family:var(--font-display); font-size:1.55rem;">Plot #${plot.id}</h3>
      <p style="font-size:0.88rem; font-weight:700; color:${statusColor}; margin-top:0.2rem;">● ${statusLabel}</p>

      <div class="inspector-metrics">
        <div class="inspector-metric">
          <span>Plot Area</span>
          <strong>${plot.area.toLocaleString('en-IN')} sq.ft.</strong>
        </div>
        <div class="inspector-metric">
          <span>Front Road</span>
          <strong>${plot.road}</strong>
        </div>
        <div class="inspector-metric">
          <span>Orientation</span>
          <strong>${plot.facing}</strong>
        </div>
        <div class="inspector-metric">
          <span>Indicative Value</span>
          <strong>${approxEstimate}</strong>
        </div>
      </div>

      <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:1.15rem;">
        Part of our 1,25,023 sq.ft. gated layout in Banthra, Khasarwara (87,387 sq.ft. plotted + 37,634 sq.ft. wide roads).
      </p>

      <button
        type="button"
        class="btn btn-primary"
        style="width:100%;"
        data-inquire-plot="Plot #${plot.id} (${plot.area} sq.ft., ${plot.facing})"
      >
        ${plot.status === 'booked' ? 'Request Similar Plot' : `Hold / Inquire Plot #${plot.id}`}
      </button>
    `;
  }

  function renderReels(container, reels) {
    container.innerHTML = reels
      .map(
        (reel) => `
        <article class="reel-card" data-reel-id="${reel.id}" tabindex="0" role="button" aria-label="Play reel: ${reel.title}">
          <img src="${reel.image}" alt="${reel.title}" loading="lazy" />
          <div class="reel-overlay">
            <div class="reel-top">
              <span class="reel-tag">${reel.tag}</span>
              <span class="reel-duration">${reel.duration}</span>
            </div>
            <div class="reel-play-center" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="reel-bottom">
              <h3>${reel.title}</h3>
              <div class="reel-meta">
                <span>${reel.project}</span>
                <span>${reel.views}</span>
              </div>
            </div>
          </div>
        </article>
      `
      )
      .join('');
  }

  function renderLandmarks(container, landmarks) {
    container.innerHTML = landmarks
      .map(
        (item) => `
        <div class="route-item ${item.featured ? 'featured' : ''}">
          <div class="route-time">${item.time}</div>
          <div class="route-info">
            <h4>${item.title}</h4>
            <p>${item.detail}</p>
          </div>
        </div>
      `
      )
      .join('');
  }

  return {
    formatINR,
    renderStats,
    renderLands,
    renderPlans,
    renderLayoutPlots,
    renderPlotInspector,
    renderReels,
    renderLandmarks
  };
})();
