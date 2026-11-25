document.addEventListener('DOMContentLoaded', async () => {
  const api = window.AviralAPI;
  const data = window.AVIRAL_DATA;
  const render = window.AviralRender;

  // Fetch initial datasets via MERN-compatible API adapter
  const [lands, plotPlans, paymentPlans, layoutPlots, reels] = await Promise.all([
    api.getLands(),
    api.getPlans('plots'),
    api.getPlans('payment'),
    api.getLayoutPlots(),
    api.getReels()
  ]);

  // DOM References
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const mobileToggle = document.getElementById('mobileToggle');
  const statsContainer = document.getElementById('heroStats');
  const landsGrid = document.getElementById('landsGrid');
  const plansGrid = document.getElementById('plansGrid');
  const cadMapContainer = document.getElementById('cadMapContainer');
  const plotInspector = document.getElementById('plotInspector');
  const reelsGrid = document.getElementById('reelsGrid');
  const routeTimeline = document.getElementById('routeTimeline');

  // State
  let activeLandFilter = 'all';
  let activePlanTab = 'plots';
  let activeReelFilter = 'all';
  let selectedPlotId = 1;
  let currentReelIndex = 0;
  let reelTimer = null;
  let reelPaused = false;
  let reelProgress = 0;

  // Initial Renders
  render.renderStats(statsContainer, data.stats);
  render.renderLands(landsGrid, lands);
  render.renderPlans(plansGrid, plotPlans, 'plots');
  render.renderLayoutPlots(cadMapContainer, layoutPlots, selectedPlotId);
  render.renderPlotInspector(
    plotInspector,
    layoutPlots.find((p) => p.id === selectedPlotId)
  );
  render.renderReels(reelsGrid, reels);
  render.renderLandmarks(routeTimeline, data.landmarks);

  // Sticky Navbar Shadow, Scroll-Spy & Mobile Menu
  const navSectionLinks = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
  const observedSections = navSectionLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function updateNavbarState() {
    navbar.classList.toggle('scrolled', window.scrollY > 16);
    const scrollPos = window.scrollY + 130;
    let currentId = observedSections[0]?.id;
    for (const sec of observedSections) {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    }
    navSectionLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  function setMobileMenu(open) {
    navLinks.classList.toggle('mobile-open', open);
    mobileToggle.classList.toggle('open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
  }

  window.addEventListener('scroll', updateNavbarState, { passive: true });
  updateNavbarState();

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setMobileMenu(!navLinks.classList.contains('mobile-open'));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('mobile-open') && !navbar.contains(e.target)) {
      setMobileMenu(false);
    }
  });

  // Hero Quick Finder
  document.getElementById('heroFinderBtn').addEventListener('click', () => {
    const corridor = document.getElementById('finderCorridor').value;
    const sizeRange = document.getElementById('finderSize').value;

    activeLandFilter = corridor;
    document.querySelectorAll('#landFilters .filter-pill').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.filter === corridor);
    });

    const filtered =
      corridor === 'all' ? lands : lands.filter((l) => l.category.includes(corridor));
    render.renderLands(landsGrid, filtered);

    if (sizeRange) {
      document.getElementById('estSqft').value = sizeRange;
      updateEstimator();
    }

    document.getElementById('lands').scrollIntoView({ behavior: 'smooth' });
  });

  // Land Filters
  document.getElementById('landFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    activeLandFilter = btn.dataset.filter;
    document.querySelectorAll('#landFilters .filter-pill').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');

    const filtered =
      activeLandFilter === 'all'
        ? lands
        : lands.filter((l) => l.category.includes(activeLandFilter));
    render.renderLands(landsGrid, filtered);
  });

  // Plans Tabs (Plot Size Plans vs Payment Plans)
  document.getElementById('plansTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    activePlanTab = btn.dataset.tab;
    document.querySelectorAll('#plansTabs .tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    render.renderPlans(
      plansGrid,
      activePlanTab === 'payment' ? paymentPlans : plotPlans,
      activePlanTab
    );
  });

  // Interactive Plot Budget & Area Estimator
  const estProject = document.getElementById('estProject');
  const estSqft = document.getElementById('estSqft');
  const estFacing = document.getElementById('estFacing');
  const estPayment = document.getElementById('estPayment');

  lands.forEach((land) => {
    const opt = document.createElement('option');
    opt.value = land._id;
    opt.textContent = `${land.name} (₹${land.ratePerSqft}/sq.ft.)`;
    estProject.appendChild(opt);
  });

  function updateEstimator() {
    const selectedLand = lands.find((l) => l._id === estProject.value) || lands[0];
    const sqft = Number(estSqft.value);
    const cornerMultiplier = estFacing.value === 'corner' ? 1.05 : 1;
    const totalValue = sqft * selectedLand.ratePerSqft * cornerMultiplier;

    document.getElementById('estSqftDisplay').textContent = `${sqft.toLocaleString('en-IN')} sq.ft.`;
    document.getElementById('estDimensions').textContent = estimateDimensions(sqft);
    document.getElementById('estTotalPrice').textContent = render.formatINR(totalValue);

    if (estPayment.value === 'instant') {
      document.getElementById('estPaymentNoteLabel').textContent = '10% Booking Token';
      document.getElementById('estPaymentNoteValue').textContent = render.formatINR(totalValue * 0.1);
    } else if (estPayment.value === 'flexi') {
      document.getElementById('estPaymentNoteLabel').textContent = '50% Allotment Amount';
      document.getElementById('estPaymentNoteValue').textContent = render.formatINR(totalValue * 0.5);
    } else {
      const emi = (totalValue * 0.7) / 18;
      document.getElementById('estPaymentNoteLabel').textContent = 'Est. 18-Month EMI';
      document.getElementById('estPaymentNoteValue').textContent = `${render.formatINR(emi)}/mo`;
    }
  }

  function estimateDimensions(sqft) {
    if (sqft <= 650) return '20 × 30 ft (approx)';
    if (sqft <= 900) return '22 × 36 ft (approx)';
    if (sqft <= 1250) return '25 × 45 ft (approx)';
    if (sqft <= 1700) return '30 × 52 ft (approx)';
    return '40 × 60 ft (approx)';
  }

  [estProject, estSqft, estFacing, estPayment].forEach((el) => {
    el.addEventListener('input', updateEstimator);
    el.addEventListener('change', updateEstimator);
  });
  updateEstimator();

  document.getElementById('estLockBtn').addEventListener('click', () => {
    const selectedLand = lands.find((l) => l._id === estProject.value) || lands[0];
    const sqft = estSqft.value;
    openInquiryModal(`${selectedLand.name} — ${sqft} sq.ft. (${estFacing.options[estFacing.selectedIndex].text})`);
  });

  // CAD Master Layout Click Inspector
  cadMapContainer.addEventListener('click', (e) => {
    const cell = e.target.closest('.plot-cell');
    if (!cell) return;
    selectedPlotId = Number(cell.dataset.plotId);
    render.renderLayoutPlots(cadMapContainer, layoutPlots, selectedPlotId);
    render.renderPlotInspector(
      plotInspector,
      layoutPlots.find((p) => p.id === selectedPlotId)
    );
  });

  // Reels Filtering & Modal Player
  document.getElementById('reelFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    activeReelFilter = btn.dataset.filter;
    document.querySelectorAll('#reelFilters .filter-pill').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');

    const filtered =
      activeReelFilter === 'all'
        ? reels
        : reels.filter((r) => r.category === activeReelFilter);
    render.renderReels(reelsGrid, filtered);
  });

  const reelModal = document.getElementById('reelModal');
  const reelStage = document.getElementById('reelStage');
  const reelPlayerImg = document.getElementById('reelPlayerImg');
  const reelPlayerTag = document.getElementById('reelPlayerTag');
  const reelPlayerTitle = document.getElementById('reelPlayerTitle');
  const reelPlayerCaption = document.getElementById('reelPlayerCaption');
  const reelProgressFill = document.getElementById('reelProgressFill');
  const reelPlayPauseBtn = document.getElementById('reelPlayPauseBtn');

  function openReel(index) {
    currentReelIndex = (index + reels.length) % reels.length;
    const item = reels[currentReelIndex];
    reelPlayerImg.src = item.image;
    reelPlayerImg.alt = item.title;
    reelPlayerTag.textContent = `${item.tag} • ${item.duration}`;
    reelPlayerTitle.textContent = item.title;
    reelPlayerCaption.textContent = item.caption;

    reelProgress = 0;
    reelPaused = false;
    reelStage.classList.remove('paused');
    reelPlayPauseBtn.textContent = 'Pause';
    reelProgressFill.style.width = '0%';
    reelModal.classList.add('open');

    clearInterval(reelTimer);
    reelTimer = setInterval(() => {
      if (reelPaused) return;
      reelProgress += 2;
      reelProgressFill.style.width = `${Math.min(reelProgress, 100)}%`;
      if (reelProgress >= 100) {
        openReel(currentReelIndex + 1);
      }
    }, 160);
  }

  function closeReelModal() {
    clearInterval(reelTimer);
    reelModal.classList.remove('open');
  }

  reelsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.reel-card');
    if (!card) return;
    const idx = reels.findIndex((r) => r.id === card.dataset.reelId);
    openReel(idx >= 0 ? idx : 0);
  });

  reelPlayPauseBtn.addEventListener('click', () => {
    reelPaused = !reelPaused;
    reelStage.classList.toggle('paused', reelPaused);
    reelPlayPauseBtn.textContent = reelPaused ? 'Play' : 'Pause';
  });

  document.getElementById('reelPrevBtn').addEventListener('click', () => openReel(currentReelIndex - 1));
  document.getElementById('reelNextBtn').addEventListener('click', () => openReel(currentReelIndex + 1));
  document.getElementById('reelCloseBtn').addEventListener('click', closeReelModal);
  document.getElementById('reelBookVisitBtn').addEventListener('click', () => {
    const activeReel = reels[currentReelIndex];
    closeReelModal();
    openInquiryModal(`${activeReel.project} (From Reel: ${activeReel.tag})`);
  });

  reelModal.addEventListener('click', (e) => {
    if (e.target === reelModal) closeReelModal();
  });

  // Inquiry Modal & Delegated Action Triggers
  const inquiryModal = document.getElementById('inquiryModal');
  const modalInterest = document.getElementById('modalInterest');
  const modalForm = document.getElementById('modalInquiryForm');
  const modalToast = document.getElementById('modalToast');

  function openInquiryModal(prefillText = 'Aviral Enclave — Banthra Site Visit') {
    modalInterest.value = prefillText;
    modalToast.classList.remove('visible');
    inquiryModal.classList.add('open');
  }

  function closeInquiryModal() {
    inquiryModal.classList.remove('open');
  }

  document.querySelectorAll('[data-open-inquiry]').forEach((btn) => {
    btn.addEventListener('click', () => openInquiryModal(btn.dataset.openInquiry));
  });

  document.body.addEventListener('click', (e) => {
    const landBtn = e.target.closest('[data-inquire-land]');
    if (landBtn) {
      openInquiryModal(landBtn.dataset.inquireLand);
      return;
    }

    const plotBtn = e.target.closest('[data-inquire-plot]');
    if (plotBtn) {
      openInquiryModal(plotBtn.dataset.inquirePlot);
      return;
    }

    const planBtn = e.target.closest('[data-choose-plan]');
    if (planBtn) {
      const sqft = planBtn.dataset.planSqft;
      if (sqft) {
        estSqft.value = sqft;
        updateEstimator();
      }
      openInquiryModal(`Plan: ${planBtn.dataset.choosePlan}`);
    }
  });

  document.getElementById('inquiryCloseBtn').addEventListener('click', closeInquiryModal);
  inquiryModal.addEventListener('click', (e) => {
    if (e.target === inquiryModal) closeInquiryModal();
  });

  // Form Submissions (Both Inline Contact & Modal)
  async function handleFormSubmit(formEl, toastEl, getPayload) {
    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = getPayload();
      await api.submitInquiry(payload);
      toastEl.textContent = `Thank you, ${payload.name}! Our Aviral Infratech Lucknow advisor will call you shortly on ${payload.phone}.`;
      toastEl.classList.add('visible');
      formEl.reset();
    });
  }

  handleFormSubmit(
    modalForm,
    modalToast,
    () => ({
      source: 'modal',
      name: document.getElementById('modalName').value.trim(),
      phone: document.getElementById('modalPhone').value.trim(),
      interest: modalInterest.value.trim(),
      visitDate: document.getElementById('modalDate').value
    })
  );

  handleFormSubmit(
    document.getElementById('contactForm'),
    document.getElementById('contactToast'),
    () => ({
      source: 'homepage-contact',
      name: document.getElementById('contactName').value.trim(),
      phone: document.getElementById('contactPhone').value.trim(),
      interest: document.getElementById('contactProject').value,
      plan: document.getElementById('contactPlan').value,
      message: document.getElementById('contactMessage').value.trim()
    })
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReelModal();
      closeInquiryModal();
    }
  });
});
