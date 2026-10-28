document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5511945081313';

  // 1. Scroll Progress & Header State
  const progressBar = document.getElementById('scrollProgressBar');
  const siteHeader = document.getElementById('siteHeader');
  const chapterLinks = document.querySelectorAll('.chapter-link');
  const sections = document.querySelectorAll('section[id]');

  const updateScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${pct}%`;
    }
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollTop > 40);
    }

    let currentSectionId = '';
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 220 && rect.bottom >= 220) {
        currentSectionId = sec.id;
      }
    });

    chapterLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentSectionId}`);
    });
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // 2. Hero Angle Switcher
  const heroBgImage = document.getElementById('heroBgImage');
  const heroAngleCaption = document.getElementById('heroAngleCaption');
  const angleBtns = document.querySelectorAll('.angle-btn');

  angleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      const caption = btn.getAttribute('data-caption');
      if (!imgSrc || !heroBgImage) return;

      angleBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      heroBgImage.classList.add('switching');
      setTimeout(() => {
        heroBgImage.src = imgSrc;
        if (heroAngleCaption && caption) {
          heroAngleCaption.textContent = caption;
        }
        heroBgImage.onload = () => {
          heroBgImage.classList.remove('switching');
        };
      }, 220);
    });
  });

  // 3. Exterior Interactive Hotspots
  const hotspotData = [
    {
      index: 'PONTO DE INSPEÇÃO 01 // FRONTAL',
      title: 'Grade Diamond, Câmera 360° & Radar Max Drive',
      desc: 'A dianteira imponente combina a grade frontal com elementos cromados tridimensionais à câmera frontal de alta definição (sistema 360°) sob o logo e ao radar de ondas milimétricas no para-choque inferior, que comanda o Piloto Automático Adaptativo (ACC) e a Frenagem Autônoma (AEB).',
      stageImg: 'assets/images/frente.jpg',
      detailImg: 'assets/images/grade-detalhe.jpg'
    },
    {
      index: 'PONTO DE INSPEÇÃO 02 // ILUMINAÇÃO',
      title: 'Conjunto Óptico Full LED com IHC & DRL Dinâmico',
      desc: 'Faróis dianteiros 100% em LED com assinatura diurna (DRL), setas dinâmicas sequenciais, ajuste elétrico de altura e comutação automática de farol alto (IHC) integrada à câmera multifuncional no para-brisa.',
      stageImg: 'assets/images/frente.jpg',
      detailImg: 'assets/images/grade-detalhe.jpg'
    },
    {
      index: 'PONTO DE INSPEÇÃO 03 // RODAGEM',
      title: 'Rodas 18" Diamantadas & Pneus Goodyear EfficientGrip',
      desc: 'Rodas de liga leve aro 18 polegadas com acabamento diamantado bicolor calçadas com pneus Goodyear EfficientGrip SUV 235/55 R18 em excelente estado, monitorados por sensor de pressão e temperatura (TPMS) no painel.',
      stageImg: 'assets/images/lateral-traseira.jpg',
      detailImg: 'assets/images/roda-detalhe.jpg'
    },
    {
      index: 'PONTO DE INSPEÇÃO 04 // TRASEIRA',
      title: 'Lanterna Panorâmica Inteiriça em LED & Dupla Saída',
      desc: 'Assinatura luminosa traseira contínua de ponta a ponta em LED (estilo Light Bar), emblemas TIGGO 8 Turbo GDI originais e para-choque traseiro esportivo com ponteiras duplas cromadas e sensores RCTA.',
      stageImg: 'assets/images/traseira-wide.jpg',
      detailImg: 'assets/images/lanterna-led-detalhe.jpg'
    },
    {
      index: 'PONTO DE INSPEÇÃO 05 // VERSATILIDADE',
      title: 'Porta-Malas Elétrico Inteligente (193L a 889L)',
      desc: 'Tampa do porta-malas com acionamento elétrico e abertura automática por sensor de presença. Com 5 lugares configurados, entrega impressionantes 889 litros de capacidade (ou 7 lugares reais para toda a família).',
      stageImg: 'assets/images/porta-malas-wide.jpg',
      detailImg: 'assets/images/porta-malas-wide.jpg'
    }
  ];

  const hotspotPins = document.querySelectorAll('.hotspot-pin');
  const inspectorBtns = document.querySelectorAll('.inspector-item-btn');
  const hotspotStageImg = document.getElementById('hotspotStageImg');
  const inspectorIndex = document.getElementById('inspectorIndex');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorDetailThumb = document.getElementById('inspectorDetailThumb');

  const selectHotspot = (idx) => {
    const item = hotspotData[idx];
    if (!item) return;

    hotspotPins.forEach((pin, i) => pin.classList.toggle('active', i === idx));
    inspectorBtns.forEach((btn, i) => btn.classList.toggle('active', i === idx));

    if (hotspotStageImg && hotspotStageImg.getAttribute('src') !== item.stageImg) {
      hotspotStageImg.style.opacity = '0.3';
      setTimeout(() => {
        hotspotStageImg.src = item.stageImg;
        hotspotStageImg.style.opacity = '1';
      }, 160);
    }
    if (inspectorIndex) inspectorIndex.textContent = item.index;
    if (inspectorTitle) inspectorTitle.textContent = item.title;
    if (inspectorDesc) inspectorDesc.textContent = item.desc;
    if (inspectorDetailThumb) inspectorDetailThumb.src = item.detailImg;
  };

  hotspotPins.forEach((pin, idx) => {
    pin.addEventListener('click', () => selectHotspot(idx));
  });
  inspectorBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => selectHotspot(idx));
  });

  // 4. ADAS Max Drive Interactive Radar
  const adasBtns = document.querySelectorAll('.adas-feature-btn');
  const adasZones = document.querySelectorAll('.adas-zone');
  const adasReadoutCode = document.getElementById('adasReadoutCode');
  const adasReadoutName = document.getElementById('adasReadoutName');
  const adasReadoutDesc = document.getElementById('adasReadoutDesc');

  adasBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      adasBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const code = btn.getAttribute('data-code');
      const name = btn.getAttribute('data-name');
      const desc = btn.getAttribute('data-desc');
      const targetZone = btn.getAttribute('data-zone');

      if (adasReadoutCode) adasReadoutCode.textContent = `SISTEMA ATIVO // ${code}`;
      if (adasReadoutName) adasReadoutName.textContent = name;
      if (adasReadoutDesc) adasReadoutDesc.textContent = desc;

      adasZones.forEach((z) => {
        const zId = z.getAttribute('data-zone-id');
        z.classList.toggle('highlighted', targetZone === 'all' || zId === targetZone);
      });
    });
  });

  // 5. Technical Specifications Tabs
  const specTabBtns = document.querySelectorAll('.spec-tab-btn');
  const specPanels = document.querySelectorAll('.spec-panel');

  specTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      specTabBtns.forEach((b) => b.classList.remove('active'));
      specPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // 6. Gallery Filter & Lightbox
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach((item) => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentGalleryIdx = 0;

  const openLightbox = (idx) => {
    currentGalleryIdx = idx;
    const item = galleryItems[currentGalleryIdx];
    if (!item || !lightboxModal) return;
    const imgEl = item.querySelector('img');
    const titleEl = item.querySelector('.gallery-item-title');
    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
    }
    if (lightboxCaption && titleEl) {
      lightboxCaption.textContent = titleEl.textContent;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${String(currentGalleryIdx + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
    }
    lightboxModal.classList.add('open');
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('open'));
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      const nextIdx = (currentGalleryIdx - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(nextIdx);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      const nextIdx = (currentGalleryIdx + 1) % galleryItems.length;
      openLightbox(nextIdx);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('open')) return;
    if (e.key === 'Escape') lightboxModal.classList.remove('open');
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  // 7. WhatsApp Custom Message Concierge
  const presetBtns = document.querySelectorAll('.msg-preset-btn');
  const customTextarea = document.getElementById('customWaMessage');
  const sendCustomWaBtn = document.getElementById('sendCustomWaBtn');

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const msg = btn.getAttribute('data-msg');
      if (customTextarea && msg) {
        customTextarea.value = msg;
      }
    });
  });

  if (sendCustomWaBtn && customTextarea) {
    sendCustomWaBtn.addEventListener('click', () => {
      const text = customTextarea.value.trim() || 'Olá! Vi o site do seu Tiggo 8 23/24 Max Drive (R$ 139.900,00) e gostaria de mais informações.';
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
