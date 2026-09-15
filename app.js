/* ==========================================================================
   DEVCOLLAB - Lógica Principal
   Plataforma de colaboración para programadores
   ========================================================================== */

(function () {
  'use strict';

  // ========================================================================
  // DATA STORE (localStorage)
  // ========================================================================
  const STORAGE_KEYS = {
    users: 'devcollab_users',
    projects: 'devcollab_projects',
    applications: 'devcollab_applications',
    ratings: 'devcollab_ratings',
    currentUser: 'devcollab_current_user',
    theme: 'devcollab_theme'
  };

  // ========================================================================
  // THEME (modo claro / oscuro)
  // ========================================================================
  function applyTheme() {
    const dark = localStorage.getItem(STORAGE_KEYS.theme) === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = dark ? '☀️' : '🌙';
      btn.classList.toggle('active', dark);
    }
  }

  window.toggleTheme = function () {
    const dark = localStorage.getItem(STORAGE_KEYS.theme) !== 'dark';
    localStorage.setItem(STORAGE_KEYS.theme, dark ? 'dark' : 'light');
    applyTheme();
  };

  // ========================================================================
  // LANGUAGE (ES / EN)
  // ========================================================================
  const STORAGE_LANG = 'devcollab_lang';

  const I18N = {
    es: {
      'nav.login': 'Iniciar Sesión', 'nav.register': 'Crear Cuenta',
      'nav.home': 'Inicio', 'nav.projects': 'Proyectos', 'nav.people': 'Personas',
      'welcome': 'Encuentra programadores para tu proyecto o únete a uno que te apasione. Construye, colabora y crece profesionalmente.',
      'menu.myProjects': '📂 Mis Proyectos', 'menu.myApps': '📋 Mis Postulaciones', 'menu.logout': '🚪 Cerrar Sesión',
      'login.title': 'Iniciar Sesión', 'login.subtitle': 'Accede a tu cuenta para continuar',
      'login.email': 'Correo Electrónico', 'login.password': 'Contraseña', 'login.submit': 'Ingresar',
      'login.switch': '¿No tienes cuenta? ', 'login.switchLink': 'Regístrate aquí',
      'register.title': 'Crear Cuenta', 'register.subtitle': 'Únete a la comunidad de desarrolladores',
      'register.name': 'Nombre', 'register.username': 'Usuario',
      'register.skills': 'Habilidades (separadas por coma)', 'register.bio': 'Breve descripción',
      'register.submit': 'Crear Mi Cuenta',
      'register.switch': '¿Ya tienes cuenta? ', 'register.switchLink': 'Inicia sesión',
      'dash.sub': 'Explora los proyectos más importantes de la comunidad y encuentra tu próximo reto.',
      'dash.featured': 'Proyectos Destacados', 'dash.viewAll': 'Ver Todos →', 'dash.recent': 'Proyectos Recientes',
      'proj.mine': 'Proyectos en los que participo', 'proj.new': 'Nuevos Proyectos',
      'proj.newBtn': '+ Nuevo Proyecto', 'proj.searchPh': 'Buscar proyectos...',
      'people.subtitle': 'Encuentra colaboradores disponibles. Si quieres aparecer aquí, actívalo desde Mi Perfil (Estoy disponible para colaborar).',
      'people.searchPh': 'Buscar por nombre, usuario o tecnología...',
      'myProjects.title': 'Mis Proyectos', 'myApps.title': 'Mis Postulaciones',
      'profile.title': 'Mi Perfil', 'profile.availableToggle': 'Colaborar',
      'profile.changePhoto': '📷 Cambiar Foto', 'profile.removePhoto': 'Quitar Foto',
      'profile.editBtn': '✏️ Editar Perfil',
      'profile.bioLabel': 'Descripción', 'profile.bioPh': 'Cuéntanos sobre ti, tu experiencia e intereses...',
      'profile.skillsLabel': 'Tecnologías que dominas', 'profile.skillsHint': 'Selecciona las tecnologías que dominas',
      'profile.saveBtn': 'Guardar', 'profile.cancelBtn': 'Cancelar',
      'profile.history': 'Historial de Proyectos', 'profile.ratingsReceived': 'Calificaciones Recibidas',
      'createProject.title': 'Crear Nuevo Proyecto', 'createProject.name': 'Nombre del Proyecto',
      'createProject.namePh': 'Ej: App de tareas colaborativas',
      'createProject.category': 'Categoría del Proyecto', 'createProject.select': 'Seleccionar...',
      'createProject.customCat': 'Escribe la categoría', 'createProject.customCatPh': 'Ej: Ciberseguridad, Análisis de datos...',
      'createProject.slots': 'Cupos Disponibles',
      'createProject.minRating': 'Estrellas Mínimas Requeridas',
      'createProject.minRatingHint': '¿Qué calificación mínima debe tener un colaborador para aplicar a este proyecto?',
      'createProject.techs': 'Tecnologías Requeridas',
      'createProject.techsHint': 'Selecciona las tecnologías que necesitas para este proyecto',
      'createProject.desc': 'Descripción del Proyecto',
      'createProject.descPh': 'Describe el proyecto, objetivos, metodología y lo que esperas de los colaboradores...',
      'createProject.image': 'Imagen del Proyecto (opcional)',
      'createProject.imageHint': 'Sube una imagen representativa del proyecto',
      'createProject.removeImg': 'Quitar imagen',
      'createProject.deadline': 'Fecha Límite (opcional)',
      'createProject.repo': 'Repositorio (opcional)', 'createProject.repoPh': 'https://github.com/...',
      'createProject.publish': 'Publicar Proyecto',
      'rate.title': 'Calificar Participantes', 'rate.subtitle': 'Asigna estrellas a cada colaborador del proyecto',
      'rate.saveBtn': 'Guardar Calificaciones',
      'userDetail.title': 'Perfil del Colaborador',
      'invite.title': 'Invitar a Proyecto', 'invite.subtitle': 'Invita a',
      'invite.subtitle2': 'a uno de tus proyectos',
      'invite.selectProject': 'Selecciona un proyecto abierto',
      'invite.message': 'Mensaje (opcional)', 'invite.messagePh': 'Escribe por qué te gustaría que se uniera...',
      'invite.submit': 'Enviar Invitación',
      'invite.cancel': 'Cancelar', 'invite.save': 'Guardar', 'invite.apply': 'Aplicar',
      'featured.title': 'Proyectos Principales',
      'featured.subtitle': 'Elige hasta 5 proyectos para destacar en tu perfil',
      'featured.searchPh': 'Filtrar proyectos...',
      'catFilter.title': 'Categorías', 'catFilter.subtitle': 'Selecciona las categorías que quieres ver',
      'techFilter.title': 'Tecnologías', 'techFilter.subtitle': 'Selecciona las tecnologías que quieres ver',
      'peopleTechFilter.subtitle': 'Selecciona las tecnologías que quieres ver',
      'filter.allCat': 'Todas las categorías', 'filter.allTech': 'Todas las tecnologías',
      'footer.desc': 'La plataforma donde los desarrolladores se encuentran, colaboran y construyen el futuro juntos.',
      'footer.contact': 'Contacto', 'footer.rights': 'Todos los derechos reservados.'
    },
    en: {
      'nav.login': 'Log In', 'nav.register': 'Sign Up',
      'nav.home': 'Home', 'nav.projects': 'Projects', 'nav.people': 'People',
      'welcome': 'Find programmers for your project or join one you\'re passionate about. Build, collaborate and grow professionally.',
      'menu.myProjects': '📂 My Projects', 'menu.myApps': '📋 My Applications', 'menu.logout': '🚪 Log Out',
      'login.title': 'Log In', 'login.subtitle': 'Access your account to continue',
      'login.email': 'Email', 'login.password': 'Password', 'login.submit': 'Log In',
      'login.switch': "Don't have an account? ", 'login.switchLink': 'Sign up here',
      'register.title': 'Create Account', 'register.subtitle': 'Join the developer community',
      'register.name': 'Name', 'register.username': 'Username',
      'register.skills': 'Skills (comma-separated)', 'register.bio': 'Short bio',
      'register.submit': 'Create My Account',
      'register.switch': 'Already have an account? ', 'register.switchLink': 'Log in',
      'dash.sub': 'Explore the community\'s top projects and find your next challenge.',
      'dash.featured': 'Featured Projects', 'dash.viewAll': 'View All →', 'dash.recent': 'Recent Projects',
      'proj.mine': 'Projects I\'m in', 'proj.new': 'New Projects',
      'proj.newBtn': '+ New Project', 'proj.searchPh': 'Search projects...',
      'people.subtitle': 'Find available collaborators. Want to appear here? Enable it from My Profile (Available to collaborate).',
      'people.searchPh': 'Search by name, username or technology...',
      'myProjects.title': 'My Projects', 'myApps.title': 'My Applications',
      'profile.title': 'My Profile', 'profile.availableToggle': 'Collaborate',
      'profile.changePhoto': '📷 Change Photo', 'profile.removePhoto': 'Remove Photo',
      'profile.editBtn': '✏️ Edit Profile',
      'profile.bioLabel': 'Bio', 'profile.bioPh': 'Tell us about yourself, your experience and interests...',
      'profile.skillsLabel': 'Technologies you know', 'profile.skillsHint': 'Select the technologies you know',
      'profile.saveBtn': 'Save', 'profile.cancelBtn': 'Cancel',
      'profile.history': 'Project History', 'profile.ratingsReceived': 'Ratings Received',
      'createProject.title': 'Create New Project', 'createProject.name': 'Project Name',
      'createProject.namePh': 'e.g. Collaborative task app',
      'createProject.category': 'Project Category', 'createProject.select': 'Select...',
      'createProject.customCat': 'Type the category', 'createProject.customCatPh': 'e.g. Cybersecurity, Data Analysis...',
      'createProject.slots': 'Available Slots',
      'createProject.minRating': 'Minimum Stars Required',
      'createProject.minRatingHint': 'What is the minimum rating a collaborator needs to apply to this project?',
      'createProject.techs': 'Required Technologies',
      'createProject.techsHint': 'Select the technologies you need for this project',
      'createProject.desc': 'Project Description',
      'createProject.descPh': 'Describe the project, goals, methodology and what you expect from collaborators...',
      'createProject.image': 'Project Image (optional)',
      'createProject.imageHint': 'Upload a representative image for the project',
      'createProject.removeImg': 'Remove image',
      'createProject.deadline': 'Deadline (optional)',
      'createProject.repo': 'Repository (optional)', 'createProject.repoPh': 'https://github.com/...',
      'createProject.publish': 'Publish Project',
      'rate.title': 'Rate Participants', 'rate.subtitle': 'Assign stars to each collaborator in the project',
      'rate.saveBtn': 'Save Ratings',
      'userDetail.title': 'Collaborator Profile',
      'invite.title': 'Invite to Project', 'invite.subtitle': 'Invite',
      'invite.subtitle2': 'to one of your projects',
      'invite.selectProject': 'Select an open project',
      'invite.message': 'Message (optional)', 'invite.messagePh': 'Write why you\'d like them to join...',
      'invite.submit': 'Send Invitation',
      'invite.cancel': 'Cancel', 'invite.save': 'Save', 'invite.apply': 'Apply',
      'featured.title': 'Featured Projects',
      'featured.subtitle': 'Choose up to 5 projects to highlight on your profile',
      'featured.searchPh': 'Filter projects...',
      'catFilter.title': 'Categories', 'catFilter.subtitle': 'Select the categories you want to see',
      'techFilter.title': 'Technologies', 'techFilter.subtitle': 'Select the technologies you want to see',
      'peopleTechFilter.subtitle': 'Select the technologies you want to see',
      'filter.allCat': 'All categories', 'filter.allTech': 'All technologies',
      'footer.desc': 'The platform where developers meet, collaborate and build the future together.',
      'footer.contact': 'Contact', 'footer.rights': 'All rights reserved.'
    }
  };

  function getLang() {
    return localStorage.getItem(STORAGE_LANG) || (navigator.language.startsWith('en') ? 'en' : 'es');
  }

  function applyLanguage() {
    const lang = getLang();
    const dict = I18N[lang] || I18N.es;
    document.documentElement.lang = lang;

    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'es' ? 'ES' : 'EN';
      btn.title = lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });

    if (typeof currentView !== 'undefined' && currentView) showView(currentView);
  }

  window.toggleLanguage = function () {
    const next = getLang() === 'es' ? 'en' : 'es';
    localStorage.setItem(STORAGE_LANG, next);
    applyLanguage();
  };

  function getData(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch { return []; }
  }

  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getUsers() { return getData(STORAGE_KEYS.users); }
  function getProjects() { return getData(STORAGE_KEYS.projects); }
  function getApplications() { return getData(STORAGE_KEYS.applications); }
  function getRatings() { return getData(STORAGE_KEYS.ratings); }

  function saveUsers(u) { setData(STORAGE_KEYS.users, u); }
  function saveProjects(p) { setData(STORAGE_KEYS.projects, p); }
  function saveApplications(a) { setData(STORAGE_KEYS.applications, a); }
  function saveRatingsData(r) { setData(STORAGE_KEYS.ratings, r); }

  function getCurrentUser() {
    const uid = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (!uid) return null;
    return getUsers().find(u => u.id === uid) || null;
  }

  function setCurrentUser(userId) {
    localStorage.setItem(STORAGE_KEYS.currentUser, userId);
  }

  function clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // ========================================================================
  // CATEGORY & STATUS LABELS
  // ========================================================================
  const CATEGORIES = {
    web: 'Desarrollo Web',
    mobile: 'Desarrollo Móvil',
    desktop: 'Aplicaciones de Escritorio',
    ai: 'Inteligencia Artificial',
    game: 'Desarrollo de Videojuegos',
    backend: 'Backend / APIs',
    devops: 'DevOps / Infraestructura',
    other: 'Otra'
  };

  const STATUSES = {
    open: 'Abierto',
    'in-progress': 'En Progreso',
    completed: 'Completado',
    closed: 'Cerrado'
  };

  // Imagen/icono por categoría (fallback visual cuando el proyecto no tiene imagen subida)
  const CATEGORY_META = {
    web: { icon: '🌐', label: 'Desarrollo Web', gradient: 'linear-gradient(135deg, #6366f1, #0ea5e9)' },
    mobile: { icon: '📱', label: 'Desarrollo Móvil', gradient: 'linear-gradient(135deg, #10b981, #14b8a6)' },
    desktop: { icon: '🖥️', label: 'Apps de Escritorio', gradient: 'linear-gradient(135deg, #64748b, #475569)' },
    ai: { icon: '🤖', label: 'Inteligencia Artificial', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)' },
    game: { icon: '🎮', label: 'Videojuegos', gradient: 'linear-gradient(135deg, #f43f5e, #ec4899)' },
    backend: { icon: '⚙️', label: 'Backend / APIs', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
    devops: { icon: '☁️', label: 'DevOps / Infra', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
    other: { icon: '🗂️', label: 'Proyecto', gradient: 'linear-gradient(135deg, #22c55e, #84cc16)' }
  };

  function getCategoryMeta(category) {
    return CATEGORY_META[category] || CATEGORY_META.other;
  }

  // Banner del proyecto: usa la imagen subida o un banner con icono de su categoría
  function projectBannerHTML(project, mode) {
    const cssClass = mode === 'detail' ? 'detail-project-image' : 'project-card-image';
    if (project.image) {
      return `<div class="${cssClass}"><img src="${project.image}" alt="${escapeHTML(project.title)}" onerror="this.parentElement.style.display='none'"></div>`;
    }
    const meta = getCategoryMeta(project.category);
    return `<div class="${cssClass} ${cssClass}-default" style="background:${meta.gradient}">
      <span class="${mode === 'detail' ? 'detail-project-image-icon' : 'project-card-image-icon'}">${meta.icon}</span>
      <span class="${mode === 'detail' ? 'detail-project-image-label' : 'project-card-image-label'}">${meta.label}</span>
    </div>`;
  }

  // Lista de tecnologías disponibles como botones
  const TECH_LIST = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust',
    'HTML', 'CSS', 'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Node.js',
    'Express', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails', 'PHP', 'Laravel',
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'GraphQL',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'React Native', 'Flutter', 'Swift',
    'Kotlin', 'TensorFlow', 'PyTorch', 'Git', 'Linux', 'WordPress'
  ];

  // ========================================================================
  // TOAST NOTIFICATIONS
  // ========================================================================
  window.showToast = function (message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  };

  // ========================================================================
  // VIEW MANAGEMENT
  // ========================================================================
  let currentView = 'dashboard';

  window.showView = function (viewName) {
    currentView = viewName;
    const user = getCurrentUser();

    // Hide all views
    document.querySelectorAll('.view-container').forEach(v => v.style.display = 'none');

    // Show public views if not logged in
    if (!user) {
      document.getElementById('header-public').style.display = '';
      document.getElementById('header-logged').style.display = 'none';
      document.getElementById('nav-logged').style.display = 'none';

      const publicViews = ['login', 'register'];
      if (publicViews.includes(viewName)) {
        document.getElementById(`view-${viewName}`).style.display = '';
      } else {
        document.getElementById('view-login').style.display = '';
      }
      return;
    }

    // Logged in
    document.getElementById('header-public').style.display = 'none';
    document.getElementById('header-logged').style.display = '';
    document.getElementById('nav-logged').style.display = '';
    updateUserBubble(user);

    // Show the requested view
    if (document.getElementById(`view-${viewName}`)) {
      document.getElementById(`view-${viewName}`).style.display = '';
    } else {
      document.getElementById('view-dashboard').style.display = '';
      viewName = 'dashboard';
    }

    // Update nav active state
    document.querySelectorAll('.nav-link[data-view]').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    // Render view content
    switch (viewName) {
      case 'dashboard': renderDashboard(); break;
      case 'projects': renderProjectsList(); break;
      case 'people': renderPeople(); break;
      case 'my-projects': renderMyProjects(); break;
      case 'my-applications': renderMyApplications(); break;
      case 'profile': renderProfile(); break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ========================================================================
  // AUTH: REGISTER
  // ========================================================================
  window.handleRegister = function (e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const skills = document.getElementById('reg-skills').value.split(',').map(s => s.trim()).filter(Boolean);
    const bio = document.getElementById('reg-bio').value.trim();

    const users = getUsers();

    if (users.find(u => u.email === email)) {
      showToast('Ya existe una cuenta con ese correo', 'error');
      return;
    }
    if (users.find(u => u.username === username)) {
      showToast('Ese nombre de usuario ya está en uso', 'error');
      return;
    }

    const newUser = {
      id: generateId(),
      name,
      username,
      email,
      password,
      skills,
      bio,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    setCurrentUser(newUser.id);
    showToast('¡Cuenta creada exitosamente!', 'success');
    document.getElementById('register-form').reset();
    showView('dashboard');
  };

  // ========================================================================
  // AUTH: LOGIN
  // ========================================================================
  window.handleLogin = function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    const user = getUsers().find(u => u.email === email && u.password === password);
    if (!user) {
      showToast('Correo o contraseña incorrectos', 'error');
      return;
    }

    setCurrentUser(user.id);
    showToast(`¡Bienvenido, ${user.name}!`, 'success');
    document.getElementById('login-form').reset();
    showView('dashboard');
  };

  // ========================================================================
  // AUTH: LOGOUT
  // ========================================================================
  window.logout = function () {
    clearCurrentUser();
    showToast('Sesión cerrada', 'info');
    showView('login');
  };

  // ========================================================================
  // USER BUBBLE (esquina superior derecha)
  // ========================================================================
  function updateUserBubble(user) {
    const avatar = document.getElementById('user-bubble-avatar');
    const name = document.getElementById('user-bubble-name');
    const rating = document.getElementById('user-bubble-rating');

    if (!user) {
      if (avatar) avatar.textContent = '?';
      if (name) name.textContent = '';
      if (rating) rating.textContent = '☆ 0.0';
      return;
    }

    if (avatar) {
      if (user.avatar) {
        avatar.innerHTML = `<img src="${user.avatar}" alt="Foto de ${escapeHTML(user.name)}">`;
      } else {
        avatar.className = 'user-bubble-avatar ' + avatarColorClass(user);
        avatar.textContent = user.name.charAt(0).toUpperCase();
      }
    }
    if (name) name.textContent = user.name.split(' ')[0];
    if (rating) {
      const avg = getUserAvgRating(user.id);
      rating.innerHTML = avg > 0
        ? `★ ${avg.toFixed(1)} <span class="user-bubble-star-empty">${'☆'.repeat(Math.max(0, 5 - Math.round(avg)))}</span>`
        : '☆ 0.0';
    }
  }

  window.toggleUserMenu = function (e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const menu = document.getElementById('user-bubble-menu');
    if (!menu) return;
    const isOpen = menu.style.display !== 'none';
    closeUserMenu();
    if (!isOpen) menu.style.display = 'block';
  };

  window.closeUserMenu = function () {
    const menu = document.getElementById('user-bubble-menu');
    if (menu) menu.style.display = 'none';
  };

  window.goToProfile = function () {
    closeUserMenu();
    showView('profile');
  };

  // Cerrar menú al hacer click fuera de la burbuja
  document.addEventListener('click', function (e) {
    const wrap = document.getElementById('user-bubble-wrap');
    if (!wrap) return;
    if (!wrap.contains(e.target)) {
      closeUserMenu();
    }
  });

  // ========================================================================
  // RATING HELPERS
  // ========================================================================
  function getStarsHTML(rating, maxStars = 5) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = maxStars - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty) +
      ` <span style="font-size:0.75rem;color:var(--color-text-dim);">(${rating.toFixed(1)})</span>`;
  }

  function getUserAvgRating(userId) {
    const ratings = getRatings().filter(r => r.ratedUserId === userId);
    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length;
  }

  function getUserRatingCount(userId) {
    return getRatings().filter(r => r.ratedUserId === userId).length;
  }

  // ========================================================================
  // HOME (INICIO)
  // ========================================================================
  function renderDashboard() {
    const user = getCurrentUser();
    if (!user) return;

    document.getElementById('dash-username').textContent = user.name.split(' ')[0];

    const allProjects = getProjects();

    // Featured: en progreso primero, después abiertos, ordenados por
    // aceptados + rating del dueño (los "más importantes")
    const featured = [...allProjects]
      .sort((a, b) => scoreProject(b) - scoreProject(a))
      .slice(0, 6);

    // Recent: más nuevos
    const recent = [...allProjects]
      .filter(p => p.status === 'open')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    const featuredContainer = document.getElementById('dash-featured-projects');
    if (featured.length === 0) {
      featuredContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📦</div><h3>No hay proyectos todavía</h3><p>Sé el primero en publicar uno</p></div>';
    } else {
      featuredContainer.innerHTML = featured.map(p => renderProjectCard(p, user)).join('');
    }

    const recentContainer = document.getElementById('dash-recent-projects');
    if (recent.length === 0) {
      recentContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🕐</div><h3>No hay proyectos recientes</h3></div>';
    } else {
      recentContainer.innerHTML = recent.map(p => renderProjectCard(p, user)).join('');
    }
  }

  // Puntaje de "importancia" de un proyecto: estado + nº de aceptados + rating del dueño
  function scoreProject(project) {
    const accepted = getApplications().filter(a => a.projectId === project.id && a.status === 'accepted').length;
    const owner = getUsers().find(u => u.id === project.ownerId);
    const ownerRating = owner ? getUserAvgRating(owner.id) : 0;

    let score = accepted * 50;

    if (project.status === 'in-progress') score += 100;
    else if (project.status === 'open') score += 50;
    else if (project.status === 'completed') score += 120;

    score += ownerRating * 10;

    const ageDays = (Date.now() - new Date(project.createdAt).getTime()) / 86400000;
    score -= Math.min(ageDays, 30); // proyectos más nuevos tienen ligera ventaja

    return score;
  }

  // ========================================================================
  // PROJECT CARD RENDERING
  // ========================================================================
  function renderProjectCard(project, currentUser) {
    const owner = getUsers().find(u => u.id === project.ownerId);
    const apps = getApplications().filter(a => a.projectId === project.id);
    const accepted = apps.filter(a => a.status === 'accepted').length;
    const slotsFull = accepted >= project.slots;
    const hasApplied = apps.find(a => a.userId === currentUser.id);
    const isOwner = project.ownerId === currentUser.id;
    const avgRating = owner ? getUserAvgRating(owner.id) : 0;

    const statusClass = project.status === 'open' ? 'status-open' :
      project.status === 'in-progress' ? 'status-in-progress' :
        project.status === 'completed' ? 'status-completed' : 'status-closed';

    let actionButtons = '';
    if (isOwner) {
      if (project.status === 'open') {
        actionButtons = `<button class="btn btn-ghost btn-sm" onclick="openProjectDetail('${project.id}')">Ver Detalle</button>`;
      } else if (project.status === 'completed') {
        actionButtons = `<button class="btn btn-ghost btn-sm" onclick="openProjectDetail('${project.id}')">Ver Detalle</button>`;
      } else {
        actionButtons = `<button class="btn btn-ghost btn-sm" onclick="openProjectDetail('${project.id}')">Gestionar</button>`;
      }
    } else if (hasApplied) {
      if (hasApplied.status === 'accepted') {
        actionButtons = `<button class="btn btn-ghost btn-sm" onclick="openProjectDetail('${project.id}')">Ver Proyecto</button>`;
      } else if (hasApplied.status === 'pending') {
        actionButtons = `<span class="project-status status-in-progress" style="font-size:0.75rem;">Postulación Pendiente</span>`;
      } else {
        actionButtons = `<span class="project-status status-closed" style="font-size:0.75rem;">No Aceptado</span>`;
      }
    } else if (project.status === 'open' && !slotsFull) {
      actionButtons = `<button class="btn btn-primary btn-sm" onclick="applyToProject('${project.id}')">Aplicar</button>
                        <button class="btn btn-ghost btn-sm" onclick="openProjectDetail('${project.id}')">Ver</button>`;
    } else {
      actionButtons = `<button class="btn btn-ghost btn-sm" onclick="openProjectDetail('${project.id}')">Ver Detalle</button>`;
    }

    return `
      <article class="project-card">
        ${projectBannerHTML(project)}
        <div class="project-card-header">
          <h3 class="project-card-title">${escapeHTML(project.title)}</h3>
          <span class="project-status ${statusClass}">${STATUSES[project.status]}</span>
        </div>
        <p class="project-card-owner">
          Por ${owner ? escapeHTML(owner.name) : 'Desconocido'}
          ${avgRating > 0 ? ` · ${getStarsHTML(avgRating)}` : ''}
        </p>
        <p class="project-card-description">${escapeHTML(project.description)}</p>
        <div class="project-card-tech">
          ${project.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div class="project-min-rating">
          <span class="min-rating-label">Mínimo requerido:</span>
          <span class="min-rating-stars">${'★'.repeat(project.minRating || 1)}</span>
        </div>
        <div class="project-card-footer">
          <span class="project-slots ${slotsFull ? 'slots-full' : ''}">
            <strong>${accepted}/${project.slots}</strong> cupos
          </span>
          <div class="project-actions">${actionButtons}</div>
        </div>
      </article>
    `;
  }

  // ========================================================================
  // PROJECTS LIST
  // ========================================================================
  function renderProjectsList() {
    const user = getCurrentUser();
    if (!user) return;

    renderEnrolledProjects();
    updateTechFilterButton();
    updateCategoryFilterButton();
    filterProjects();
  }

  // Proyectos donde el usuario ya fue aceptado (inscrito)
  function renderEnrolledProjects() {
    const user = getCurrentUser();
    const container = document.getElementById('my-enrolled-projects');
    if (!container) return;

    const myAccepted = getApplications().filter(a => a.userId === user.id && a.status === 'accepted');
    const enrolled = myAccepted
      .map(a => getProjects().find(p => p.id === a.projectId))
      .filter(Boolean)
      .filter(p => p.status !== 'closed')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (enrolled.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🤝</div><h3>Aún no participas en ningún proyecto</h3><p>Revisa los nuevos proyectos de abajo y postúlate</p></div>';
    } else {
      container.innerHTML = enrolled.map(p => renderProjectCard(p, user)).join('');
    }
  }

  // ========================================================================
  // FILTRO DE CATEGORÍAS (mini formulario de selección múltiple)
  // ========================================================================
  let selectedCategories = [];
  let categoryFilterOptions = [];

  // Categorías realmente usadas por los proyectos existentes
  function availableCategoriesList() {
    const projects = getProjects();
    const used = new Set(projects.map(p => p.category));
    const list = [];

    Object.keys(CATEGORIES).forEach(key => {
      if (used.has(key) && key !== 'other') {
        list.push({ value: key, label: CATEGORIES[key] });
      }
    });

    // Categorías personalizadas (las que no están en el diccionario)
    [...used]
      .filter(c => !CATEGORIES[c] && c !== 'other')
      .forEach(c => list.push({ value: c, label: c }));

    return list;
  }

  function updateCategoryFilterButton() {
    const btn = document.getElementById('filter-category-btn');
    if (!btn) return;
    if (selectedCategories.length === 0) {
      btn.textContent = 'Todas las categorías';
    } else if (selectedCategories.length === 1) {
      const opt = categoryFilterOptions.find(o => o.value === selectedCategories[0]);
      btn.textContent = opt ? opt.label : selectedCategories[0];
    } else {
      btn.textContent = `${selectedCategories.length} categorías`;
    }
  }

  window.openCategoryFilterModal = function () {
    categoryFilterOptions = availableCategoriesList();
    // Descartar selecciones que ya no existan
    selectedCategories = selectedCategories.filter(v => categoryFilterOptions.some(o => o.value === v));
    renderCategoryFilterList();
    updateCategoryFilterCounter();
    openModal('category-filter-modal');
  };

  window.renderCategoryFilterList = function () {
    const list = document.getElementById('category-filter-list');
    if (!list) return;
    if (categoryFilterOptions.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>Sin categorías disponibles</p></div>';
      return;
    }
    list.innerHTML = categoryFilterOptions.map((o, i) => {
      const selected = selectedCategories.includes(o.value);
      return `
        <button type="button" class="featured-proj-card${selected ? ' selected' : ''}" onclick="toggleCategoryFilterItem(${i})">
          <span class="featured-proj-tick">${selected ? '★' : '☆'}</span>
          <span class="featured-proj-title">${escapeHTML(o.label)}</span>
        </button>
      `;
    }).join('');
  };

  window.toggleCategoryFilterItem = function (index) {
    const opt = categoryFilterOptions[index];
    if (!opt) return;
    if (selectedCategories.includes(opt.value)) {
      selectedCategories = selectedCategories.filter(v => v !== opt.value);
    } else {
      selectedCategories.push(opt.value);
    }
    renderCategoryFilterList();
    updateCategoryFilterCounter();
  };

  window.updateCategoryFilterCounter = function () {
    const el = document.getElementById('category-filter-counter');
    if (el) el.textContent = `Seleccionadas: ${selectedCategories.length} de ${categoryFilterOptions.length}`;
  };

  window.applyCategoryFilter = function () {
    closeModal('category-filter-modal');
    updateCategoryFilterButton();
    filterProjects();
  };

  // ========================================================================
  // FILTRO DE TECNOLOGÍAS (mini formulario de selección múltiple)
  // ========================================================================
  let selectedTechFilters = [];
  let techFilterOptions = [];

  // Tecnologías realmente usadas por los proyectos existentes
  function availableTechList() {
    const projects = getProjects();
    const allTech = new Set();
    projects.forEach(p => (p.tech || []).forEach(t => allTech.add(t)));
    return [...allTech].sort();
  }

  function updateTechFilterButton() {
    const btn = document.getElementById('filter-tech-btn');
    if (!btn) return;
    if (selectedTechFilters.length === 0) {
      btn.textContent = 'Todas las tecnologías';
    } else if (selectedTechFilters.length === 1) {
      btn.textContent = selectedTechFilters[0];
    } else {
      btn.textContent = `${selectedTechFilters.length} tecnologías`;
    }
  }

  window.openTechFilterModal = function () {
    techFilterOptions = availableTechList();
    // Descartar selecciones que ya no existan
    selectedTechFilters = selectedTechFilters.filter(t => techFilterOptions.includes(t));
    renderTechFilterList();
    updateTechFilterCounter();
    openModal('tech-filter-modal');
  };

  window.renderTechFilterList = function () {
    const list = document.getElementById('tech-filter-list');
    if (!list) return;
    if (techFilterOptions.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>Sin tecnologías disponibles</p></div>';
      return;
    }
    list.innerHTML = techFilterOptions.map((t, i) => {
      const selected = selectedTechFilters.includes(t);
      return `
        <button type="button" class="featured-proj-card${selected ? ' selected' : ''}" onclick="toggleTechFilterItem(${i})">
          <span class="featured-proj-tick">${selected ? '★' : '☆'}</span>
          <span class="featured-proj-title">${escapeHTML(t)}</span>
        </button>
      `;
    }).join('');
  };

  window.toggleTechFilterItem = function (index) {
    const tech = techFilterOptions[index];
    if (!tech) return;
    if (selectedTechFilters.includes(tech)) {
      selectedTechFilters = selectedTechFilters.filter(t => t !== tech);
    } else {
      selectedTechFilters.push(tech);
    }
    renderTechFilterList();
    updateTechFilterCounter();
  };

  window.updateTechFilterCounter = function () {
    const el = document.getElementById('tech-filter-counter');
    if (el) el.textContent = `Seleccionadas: ${selectedTechFilters.length} de ${techFilterOptions.length}`;
  };

  window.applyTechFilter = function () {
    closeModal('tech-filter-modal');
    updateTechFilterButton();
    filterProjects();
  };

  window.filterProjects = function () {
    const user = getCurrentUser();
    const search = (document.getElementById('filter-search')?.value || '').toLowerCase();

    // Excluir proyectos donde el usuario ya está inscrito/postulado/dueno
    const myApplications = getApplications().filter(a => a.userId === user.id);
    const appliedIds = new Set(myApplications.map(a => a.projectId));

    let projects = getProjects().filter(p =>
      p.status === 'open' &&
      p.ownerId !== user.id &&
      !appliedIds.has(p.id)
    );

    if (search) {
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tech.some(t => t.toLowerCase().includes(search))
      );
    }
    if (selectedCategories.length > 0) {
      projects = projects.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedTechFilters.length > 0) {
      projects = projects.filter(p => (p.tech || []).some(t => selectedTechFilters.includes(t)));
    }

    // Sort by newest first
    projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const container = document.getElementById('projects-list');
    if (projects.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No se encontraron proyectos</h3><p>Intenta ajustar los filtros o crea un nuevo proyecto</p></div>';
    } else {
      container.innerHTML = projects.map(p => renderProjectCard(p, user)).join('');
    }
  };

  // ========================================================================
  // PEOPLE (colaboradores disponibles)
  // ========================================================================
  let inviteTarget = null;

  function renderPeople() {
    const user = getCurrentUser();
    if (!user) return;

    updateAvailabilityUI();
    updatePeopleTechFilterButton();
    filterPeople();
  }

  // ========================================================================
  // FILTRO DE TECNOLOGÍAS DE PERSONAS (mini formulario de selección múltiple)
  // ========================================================================
  let selectedPeopleTechFilters = [];
  let peopleTechFilterOptions = [];

  // Tecnologías (habilidades) de los colaboradores disponibles
  function availablePeopleTechList() {
    const allSkills = new Set();
    getUsers().filter(u => u.available === true).forEach(u => {
      (u.skills || []).forEach(s => allSkills.add(s));
    });
    return [...allSkills].sort();
  }

  function updatePeopleTechFilterButton() {
    const btn = document.getElementById('filter-people-tech-btn');
    if (!btn) return;
    if (selectedPeopleTechFilters.length === 0) {
      btn.textContent = 'Todas las tecnologías';
    } else if (selectedPeopleTechFilters.length === 1) {
      btn.textContent = selectedPeopleTechFilters[0];
    } else {
      btn.textContent = `${selectedPeopleTechFilters.length} tecnologías`;
    }
  }

  window.openPeopleTechFilterModal = function () {
    peopleTechFilterOptions = availablePeopleTechList();
    // Descartar selecciones que ya no existan
    selectedPeopleTechFilters = selectedPeopleTechFilters.filter(t => peopleTechFilterOptions.includes(t));
    renderPeopleTechFilterList();
    updatePeopleTechFilterCounter();
    openModal('people-tech-filter-modal');
  };

  window.renderPeopleTechFilterList = function () {
    const list = document.getElementById('people-tech-filter-list');
    if (!list) return;
    if (peopleTechFilterOptions.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>Sin tecnologías disponibles</p></div>';
      return;
    }
    list.innerHTML = peopleTechFilterOptions.map((t, i) => {
      const selected = selectedPeopleTechFilters.includes(t);
      return `
        <button type="button" class="featured-proj-card${selected ? ' selected' : ''}" onclick="togglePeopleTechFilterItem(${i})">
          <span class="featured-proj-tick">${selected ? '★' : '☆'}</span>
          <span class="featured-proj-title">${escapeHTML(t)}</span>
        </button>
      `;
    }).join('');
  };

  window.togglePeopleTechFilterItem = function (index) {
    const tech = peopleTechFilterOptions[index];
    if (!tech) return;
    if (selectedPeopleTechFilters.includes(tech)) {
      selectedPeopleTechFilters = selectedPeopleTechFilters.filter(t => t !== tech);
    } else {
      selectedPeopleTechFilters.push(tech);
    }
    renderPeopleTechFilterList();
    updatePeopleTechFilterCounter();
  };

  window.updatePeopleTechFilterCounter = function () {
    const el = document.getElementById('people-tech-filter-counter');
    if (el) el.textContent = `Seleccionadas: ${selectedPeopleTechFilters.length} de ${peopleTechFilterOptions.length}`;
  };

  window.applyPeopleTechFilter = function () {
    closeModal('people-tech-filter-modal');
    updatePeopleTechFilterButton();
    filterPeople();
  };

  window.filterPeople = function () {
    const me = getCurrentUser();
    const search = (document.getElementById('people-search')?.value || '').toLowerCase();

    let list = getUsers().filter(u => u.available === true);

    if (search) {
      list = list.filter(u =>
        u.name.toLowerCase().includes(search) ||
        u.username.toLowerCase().includes(search) ||
        (u.skills || []).some(s => s.toLowerCase().includes(search))
      );
    }
    if (selectedPeopleTechFilters.length > 0) {
      list = list.filter(u => (u.skills || []).some(s => selectedPeopleTechFilters.includes(s)));
    }

    list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    const container = document.getElementById('people-list');
    if (list.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No se encontraron colaboradores</h3><p>Intenta ajustar los filtros o postúlate para aparecer aquí</p></div>';
    } else {
      container.innerHTML = list.map(u => renderPersonCard(u, me)).join('');
    }
  };

  function renderPersonCard(u, me) {
    const rating = getUserAvgRating(u.id);
    const isSelf = u.id === me.id;

    const badges = isSelf
      ? '<span class="person-badge self">Tú</span>'
      : '<span class="person-badge available">● Disponible</span>';

    const actions = isSelf
      ? `<button class="btn btn-ghost btn-sm" onclick="openUserProfileModal('${u.id}')">Ver mi perfil</button>`
      : `<button class="btn btn-ghost btn-sm" onclick="openUserProfileModal('${u.id}')">Ver Perfil</button>
         <button class="btn btn-primary btn-sm" onclick="openInviteModal('${u.id}')">Invitar a mi proyecto</button>`;

    return `
      <article class="person-card">
        <div class="person-card-header">
          <div class="person-avatar ${avatarColorClass(u)}">${u.avatar ? `<img src="${u.avatar}" alt="Foto de ${escapeHTML(u.name)}">` : escapeHTML(u.name.charAt(0).toUpperCase())}</div>
          <div>
            <h3 class="person-name">${escapeHTML(u.name)} ${badges}</h3>
            <div class="person-username">@${escapeHTML(u.username)}</div>
            <div class="person-rating">
              ${rating > 0 ? getStarsHTML(rating) : '☆ Sin calificaciones aún'}
            </div>
          </div>
        </div>
        <p class="person-bio">${u.bio ? escapeHTML(u.bio) : 'Sin biografía'}</p>
        <div class="person-skills">${skillTagsHTML(u.skills)}</div>
        <div class="person-actions">${actions}</div>
      </article>
    `;
  }

  // Sincroniza el toggle de disponibilidad (solo desde Mi Perfil)
  function updateAvailabilityUI() {
    const user = getCurrentUser();
    if (!user) return;
    const on = user.available === true;

    const toggle = document.getElementById('profile-availability-toggle');
    if (toggle) toggle.checked = on;
    const title = document.getElementById('profile-availability-title');
    if (title) title.textContent = 'Colaborar';
  }

  window.toggleMyAvailability = function () {
    const user = getCurrentUser();
    if (!user) return;
    user.available = !(user.available === true);

    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) users[idx].available = user.available;
    saveUsers(users);

    updateAvailabilityUI();
    if (currentView === 'people') renderPeople();
    showToast(user.available ? '¡Te has postulado! Ahora eres visible en Personas' : 'Ya no apareces en Personas', user.available ? 'success' : 'info');
  };

  // Perfil público de otra persona (solo lectura)
  window.openUserProfileModal = function (userId) {
    const u = getUsers().find(x => x.id === userId);
    if (!u) return;
    const rating = getUserAvgRating(u.id);

    const container = document.getElementById('user-detail-content');
    container.innerHTML = `
      <div class="profile-layout">
        <div class="profile-info">
          <div class="profile-avatar ${avatarColorClass(u)}">${u.avatar ? `<img src="${u.avatar}" alt="Foto de ${escapeHTML(u.name)}">` : escapeHTML(u.name.charAt(0).toUpperCase())}</div>
          <h3>${escapeHTML(u.name)}</h3>
          <p class="profile-username">@${escapeHTML(u.username)}</p>
          <div class="profile-rating-display">${rating > 0 ? getStarsHTML(rating) : '☆ Sin calificaciones aún'}</div>
          <p class="profile-bio">${u.bio ? escapeHTML(u.bio) : 'Sin biografía'}</p>
          <div class="profile-skills">${skillTagsHTML(u.skills)}</div>
        </div>
        <div class="profile-history">
          <h3>Historial de Proyectos</h3>
          ${userHistoryHTML(u)}
        </div>
      </div>
      <button class="btn btn-primary btn-full" style="margin-top:1rem;" onclick="closeModal('user-detail-modal'); openInviteModal('${u.id}')">Invitar a mi proyecto</button>
    `;
    openModal('user-detail-modal');
  };

  // Historial compartido del perfil
  function userHistoryHTML(u) {
    const myProjects = getProjects().filter(p => p.ownerId === u.id);
    const myApps = getApplications().filter(a => a.userId === u.id);

    const featured = Array.isArray(u.featuredProjectIds) ? u.featuredProjectIds : [];
    const items = [];

    myProjects.forEach(p => {
      items.push({ p, role: 'Creador', statusText: STATUSES[p.status] || p.status });
    });
    myApps.forEach(a => {
      const p = getProjects().find(proj => proj.id === a.projectId);
      if (p) {
        items.push({
          p,
          role: 'Participante',
          statusText: a.status === 'accepted' ? (STATUSES[p.status] || p.status) : 'No aceptado'
        });
      }
    });

    // Evitar duplicados (gana Creador)
    const seen = new Set();
    const unique = items.filter(it => {
      if (seen.has(it.p.id)) return false;
      seen.add(it.p.id);
      return true;
    });

    if (unique.length === 0) {
      return '<div class="empty-state"><p>No hay historial de proyectos</p></div>';
    }

    const me = getCurrentUser();
    const isSelf = me && me.id === u.id;
    const featuredSet = new Set(featured);

    unique.sort((a, b) => (featuredSet.has(b.p.id) ? 1 : 0) - (featuredSet.has(a.p.id) ? 1 : 0));

    const listHTML = unique.map(it => {
      const isFeat = featuredSet.has(it.p.id);
      return `
        <div class="history-item${isFeat ? ' featured' : ''}">
          <div>
            <span class="history-project-name">${escapeHTML(it.p.title)}</span>
            ${isFeat ? '<span class="history-featured-badge">★ Principal</span>' : ''}
            <span class="history-role"> · ${it.role} · ${it.statusText}</span>
          </div>
        </div>
      `;
    }).join('');

    const manageBtn = isSelf
      ? `<button class="btn btn-ghost btn-sm" onclick="openFeaturedProjectsModal()" style="margin-bottom:0.75rem;">✦ Elegir 5 proyectos principales</button>`
      : '';

    return `${manageBtn}${listHTML}`;
  }

  // ---- Mini ventana: seleccionar 5 proyectos principales ----
  let featuredSelection = [];

  // Proyectos del usuario (creados + participaciones aceptadas, sin duplicar)
  function userProjectsList(u) {
    const created = getProjects().filter(p => p.ownerId === u.id).map(p => ({ p, role: 'Creador' }));
    const participated = getApplications()
      .filter(a => a.userId === u.id && a.status === 'accepted')
      .map(a => getProjects().find(p => p.id === a.projectId))
      .filter(Boolean)
      .map(p => ({ p, role: 'Participante' }));

    const seen = new Set();
    return created.concat(participated).filter(it => {
      if (seen.has(it.p.id)) return false;
      seen.add(it.p.id);
      return true;
    });
  }

  window.openFeaturedProjectsModal = function () {
    const me = getCurrentUser();
    if (!me) return;
    const projs = userProjectsList(me).map(it => it.p);
    featuredSelection = (Array.isArray(me.featuredProjectIds) ? me.featuredProjectIds : [])
      .filter(id => projs.some(p => p.id === id));
    document.getElementById('featured-search').value = '';
    renderFeaturedList();
    updateFeaturedCounter();
    openModal('featured-projects-modal');
  };

  window.renderFeaturedList = function () {
    const me = getCurrentUser();
    if (!me) return;
    const search = (document.getElementById('featured-search')?.value || '').toLowerCase();
    const list = document.getElementById('featured-projects-list');

    const projs = userProjectsList(me).map(it => it.p);
    const filtered = search ? projs.filter(p => p.title.toLowerCase().includes(search)) : projs;

    if (filtered.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>Sin resultados</p></div>';
      return;
    }

    list.innerHTML = filtered.map(p => {
      const selected = featuredSelection.includes(p.id);
      const owner = getUsers().find(u => u.id === p.ownerId);
      return `
        <button type="button" class="featured-proj-card${selected ? ' selected' : ''}" onclick="toggleFeaturedProject('${p.id}')">
          <span class="featured-proj-tick">${selected ? '★' : '☆'}</span>
          <span class="featured-proj-title">${escapeHTML(p.title)}</span>
          <span class="featured-proj-desc">${escapeHTML(p.description || '')}</span>
          <span class="featured-proj-creator">👤 ${owner ? escapeHTML(owner.name) : 'Creador'}</span>
        </button>
      `;
    }).join('');
  };

  window.filterFeaturedProjects = function () {
    renderFeaturedList();
  };

  window.toggleFeaturedProject = function (id) {
    if (featuredSelection.includes(id)) {
      featuredSelection = featuredSelection.filter(x => x !== id);
    } else {
      if (featuredSelection.length >= 5) {
        showToast('Solo puedes destacar 5 proyectos principales', 'error');
        return;
      }
      featuredSelection.push(id);
    }
    updateFeaturedCounter();
    renderFeaturedList();
  };

  window.updateFeaturedCounter = function () {
    const el = document.getElementById('featured-counter');
    if (el) el.textContent = `Seleccionados: ${featuredSelection.length} / 5`;
  };

  window.saveFeaturedProjects = function () {
    const me = getCurrentUser();
    if (!me) return;
    me.featuredProjectIds = featuredSelection.slice();
    const users = getUsers();
    const idx = users.findIndex(x => x.id === me.id);
    if (idx >= 0) users[idx].featuredProjectIds = me.featuredProjectIds;
    saveUsers(users);
    closeModal('featured-projects-modal');

    const detailOpen = document.getElementById('user-detail-modal').style.display === 'flex';
    if (detailOpen) {
      openUserProfileModal(me.id);
    } else {
      showView(currentView);
    }
    showToast('Proyectos principales guardados', 'success');
  };

  window.openInviteModal = function (personId) {
    inviteTarget = personId;
    const me = getCurrentUser();
    const person = getUsers().find(u => u.id === personId);

    document.getElementById('invite-person-name').textContent = person ? person.name : 'la persona';

    const myOpenProjects = getProjects().filter(p => p.ownerId === me.id && p.status === 'open');
    if (myOpenProjects.length === 0) {
      showToast('No tienes proyectos abiertos para invitar', 'error');
      return;
    }

    const select = document.getElementById('invite-project');
    select.innerHTML = myOpenProjects
      .map(p => `<option value="${p.id}">${escapeHTML(p.title)}</option>`)
      .join('');

    document.getElementById('invite-message').value = '';
    openModal('invite-modal');
  };

  window.sendInvite = function (e) {
    e.preventDefault();
    const me = getCurrentUser();
    if (!inviteTarget) return;

    const projectId = document.getElementById('invite-project').value;
    const message = document.getElementById('invite-message').value.trim();
    const apps = getApplications();

    if (apps.find(a => a.projectId === projectId && a.userId === inviteTarget)) {
      showToast('Esta persona ya está postulada o invitada a ese proyecto', 'error');
      return;
    }

    const project = getProjects().find(p => p.id === projectId);
    if (!project) return;
    const acceptedCount = apps.filter(a => a.projectId === projectId && a.status === 'accepted').length;
    if (acceptedCount >= project.slots) {
      showToast('Ya no hay cupos disponibles', 'error');
      return;
    }

    apps.push({
      id: generateId(),
      projectId,
      userId: inviteTarget,
      status: 'pending',
      invitedBy: me.id,
      message,
      appliedAt: new Date().toISOString()
    });
    saveApplications(apps);

    closeModal('invite-modal');
    showToast('¡Invitación enviada!', 'success');
  };

  // ========================================================================
  // MY PROJECTS
  // ========================================================================
  function renderMyProjects() {
    const user = getCurrentUser();
    const projects = getProjects().filter(p => p.ownerId === user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const container = document.getElementById('my-projects-list');
    if (projects.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📂</div><h3>No has creado ningún proyecto</h3><p>Empieza publicando tu primer proyecto</p></div>';
    } else {
      container.innerHTML = projects.map(p => renderProjectCard(p, user)).join('');
    }
  }

  // ========================================================================
  // MY APPLICATIONS
  // ========================================================================
  function renderMyApplications() {
    const user = getCurrentUser();
    const apps = getApplications().filter(a => a.userId === user.id);
    const container = document.getElementById('my-applications-list');

    if (apps.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><h3>No te has postulado a ningún proyecto</h3><p>Explora los proyectos disponibles y aplica a uno</p></div>';
      return;
    }

    const projects = getProjects();
    container.innerHTML = apps.map(a => {
      const project = projects.find(p => p.id === a.projectId);
      if (!project) return '';
      const fakeUser = { id: user.id };

      // Las invitaciones que recibiste se muestran con acciones de aceptar/rechazar
      if (a.invitedBy) {
        const owner = getUsers().find(u => u.id === a.invitedBy);
        const statusClass = project.status === 'open' ? 'status-open' :
          project.status === 'in-progress' ? 'status-in-progress' :
            project.status === 'completed' ? 'status-completed' : 'status-closed';
        const pending = a.status === 'pending';
        return `
          <div class="invite-row">
            <div class="invite-info">
              <span class="invite-project-title">${escapeHTML(project.title)}</span>
              <span class="invite-from">Invitación de ${owner ? escapeHTML(owner.name) + ' (@' + escapeHTML(owner.username) + ')' : 'un usuario'}</span>
              ${a.message ? `<span class="invite-message">"${escapeHTML(a.message)}"</span>` : ''}
              <span class="invite-status-line">
                <span class="project-status ${statusClass}">${STATUSES[project.status]}</span>
                ${a.status === 'accepted' ? '<span class="project-status status-in-progress">Aceptada</span>' : a.status === 'rejected' ? '<span class="project-status status-closed">Rechazada</span>' : '<span class="project-status status-open">Pendiente</span>'}
              </span>
            </div>
            ${pending ? `
              <div class="invite-actions">
                <button class="btn btn-success btn-sm" onclick="handleInvite('${a.id}', 'accepted')">Aceptar Invitación</button>
                <button class="btn btn-danger btn-sm" onclick="handleInvite('${a.id}', 'rejected')">Rechazar</button>
              </div>
            ` : ''}
          </div>
        `;
      }

      return renderProjectCard(project, fakeUser);
    }).join('');
  }

  window.handleInvite = function (appId, action) {
    const apps = getApplications();
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    const project = getProjects().find(p => p.id === app.projectId);
    if (!project) return;

    if (action === 'accepted') {
      const acceptedCount = apps.filter(a => a.projectId === app.projectId && a.status === 'accepted').length;
      if (acceptedCount >= project.slots) {
        showToast('Ya no hay cupos disponibles', 'error');
        return;
      }
    }

    app.status = action === 'accepted' ? 'accepted' : 'rejected';
    saveApplications(apps);
    showToast(
      action === 'accepted' ? '¡Te uniste al proyecto!' : 'Invitación rechazada',
      action === 'accepted' ? 'success' : 'info'
    );

    if (currentView === 'my-applications') renderMyApplications();
    else showView('my-applications');
  };

  // ========================================================================
  // CREATE PROJECT
  // ========================================================================
  let selectedTechs = [];
  let selectedMinRating = 1;
  let selectedProjectImage = null;

  function resetProjectImage() {
    selectedProjectImage = null;
    const preview = document.getElementById('proj-image-preview');
    if (preview) preview.style.display = 'none';
    const upload = document.getElementById('proj-image-upload');
    if (upload) upload.value = '';
  }

  window.initCreateProjectForm = function () {
    selectedTechs = [];
    selectedMinRating = 1;
    resetProjectImage();

    const container = document.getElementById('proj-tech-buttons');
    if (container) {
      container.innerHTML = TECH_LIST.map(t =>
        `<button type="button" class="tech-chip" data-tech="${escapeHTML(t)}" onclick="toggleProjectTech(this, '${escapeHTML(t)}')">${escapeHTML(t)}</button>`
      ).join('');
    }

    const starContainer = document.getElementById('proj-min-rating-input');
    if (starContainer) {
      starContainer.innerHTML = [1, 2, 3, 4, 5].map(s => `
        <span class="star-input-icon ${s <= selectedMinRating ? 'active' : ''}" data-value="${s}" onclick="selectMinRating(${s})" title="${s} estrella${s > 1 ? 's' : ''}">★</span>
      `).join('') + '<span class="star-input-label" id="proj-min-rating-label">1 estrella o más</span>';
    }

    document.getElementById('proj-custom-category-group').style.display = 'none';
    document.getElementById('proj-custom-category').value = '';
    document.getElementById('proj-category').value = '';
  };

  window.toggleProjectTech = function (el, tech) {
    if (selectedTechs.includes(tech)) {
      selectedTechs = selectedTechs.filter(t => t !== tech);
      el.classList.remove('active');
    } else {
      selectedTechs.push(tech);
      el.classList.add('active');
    }
  };

  window.selectMinRating = function (stars) {
    selectedMinRating = stars;
    document.querySelectorAll('#proj-min-rating-input .star-input-icon').forEach(icon => {
      icon.classList.toggle('active', parseInt(icon.dataset.value) <= stars);
    });
    document.getElementById('proj-min-rating-label').textContent =
      `${stars} estrella${stars > 1 ? 's' : ''} o más`;
  };

  window.handleCategoryChange = function () {
    const value = document.getElementById('proj-category').value;
    document.getElementById('proj-custom-category-group').style.display = value === 'other' ? '' : 'none';
  };

  window.handleProjectImage = function (event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Selecciona un archivo de imagen', 'error');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      selectedProjectImage = e.target.result;
      const preview = document.getElementById('proj-image-preview');
      const previewImg = document.getElementById('proj-image-preview-img');
      if (preview && previewImg) {
        previewImg.src = selectedProjectImage;
        preview.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  };

  window.clearProjectImage = function () {
    resetProjectImage();
    showToast('Imagen eliminada', 'info');
  };

  window.handleCreateProject = function (e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    if (selectedTechs.length === 0) {
      showToast('Selecciona al menos una tecnología', 'error');
      return;
    }

    let category = document.getElementById('proj-category').value;
    if (category === 'other') {
      const customCategory = document.getElementById('proj-custom-category').value.trim();
      if (!customCategory) {
        showToast('Escribe el nombre de la categoría', 'error');
        return;
      }
      category = customCategory;
    }

    const project = {
      id: generateId(),
      ownerId: user.id,
      title: document.getElementById('proj-title').value.trim(),
      category: category,
      slots: parseInt(document.getElementById('proj-slots').value),
      tech: selectedTechs,
      minRating: selectedMinRating,
      description: document.getElementById('proj-description').value.trim(),
      deadline: document.getElementById('proj-deadline').value || null,
      repo: document.getElementById('proj-repo').value.trim() || null,
      image: selectedProjectImage || null,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    const projects = getProjects();
    projects.push(project);
    saveProjects(projects);

    document.getElementById('create-project-form').reset();
    resetProjectImage();
    closeModal('create-project-modal');
    showToast('Proyecto publicado exitosamente', 'success');

    if (currentView === 'projects') renderProjectsList();
    else if (currentView === 'my-projects') renderMyProjects();
    else showView('my-projects');
  };

  // ========================================================================
  // APPLY TO PROJECT
  // ========================================================================
  window.applyToProject = function (projectId) {
    const user = getCurrentUser();
    if (!user) return;

    const applications = getApplications();

    if (applications.find(a => a.projectId === projectId && a.userId === user.id)) {
      showToast('Ya te has postulado a este proyecto', 'error');
      return;
    }

    // Verificar estrellas mínimas requeridas
    const project = getProjects().find(p => p.id === projectId);
    if (project && project.minRating) {
      const userRating = getUserAvgRating(user.id);
      if (userRating < project.minRating) {
        showToast(`Necesitas un promedio de ${project.minRating} ★ o más para aplicar a este proyecto (tienes ${userRating.toFixed(1)} ★)`, 'error');
        return;
      }
    }

    applications.push({
      id: generateId(),
      projectId,
      userId: user.id,
      status: 'pending',
      appliedAt: new Date().toISOString()
    });

    saveApplications(applications);
    showToast('¡Postulación enviada!', 'success');

    if (currentView === 'projects') renderProjectsList();
    else if (currentView === 'my-applications') renderMyApplications();
    else if (currentView === 'dashboard') renderDashboard();
  };

  // ========================================================================
  // PROJECT DETAIL MODAL
  // ========================================================================
  window.openProjectDetail = function (projectId) {
    const user = getCurrentUser();
    const project = getProjects().find(p => p.id === projectId);
    if (!project) return;

    const owner = getUsers().find(u => u.id === project.ownerId);
    const apps = getApplications().filter(a => a.projectId === projectId);
    const isOwner = project.ownerId === user.id;
    const accepted = apps.filter(a => a.status === 'accepted').length;
    const statusClass = project.status === 'open' ? 'status-open' :
      project.status === 'in-progress' ? 'status-in-progress' :
        project.status === 'completed' ? 'status-completed' : 'status-closed';

    let ownerActions = '';
    if (isOwner && project.status === 'open') {
      ownerActions = `
        <div style="margin-top:1rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn btn-success btn-sm" onclick="changeProjectStatus('${projectId}', 'in-progress')">Iniciar Proyecto</button>
          <button class="btn btn-danger btn-sm" onclick="changeProjectStatus('${projectId}', 'closed')">Cerrar Proyecto</button>
        </div>
      `;
    } else if (isOwner && project.status === 'in-progress') {
      ownerActions = `
        <div style="margin-top:1rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn btn-warning btn-sm" onclick="changeProjectStatus('${projectId}', 'completed')">Marcar Completado</button>
        </div>
      `;
    } else if (isOwner && project.status === 'completed') {
      ownerActions = `
        <div style="margin-top:1rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn btn-warning btn-sm" onclick="openRateModal('${projectId}')">⭐ Calificar Participantes</button>
        </div>
      `;
    }

    let applicantsHTML = '';
    if (isOwner && apps.length > 0) {
      applicantsHTML = `
        <div class="detail-applicants">
          <h3>Postulantes (${apps.length})</h3>
          ${apps.map(a => {
        const applicant = getUsers().find(u => u.id === a.userId);
        if (!applicant) return '';
        const rating = getUserAvgRating(applicant.id);
        return `
              <div class="applicant-row">
                <div class="applicant-info">
                  <span class="applicant-name">${escapeHTML(applicant.name)} (@${escapeHTML(applicant.username)})</span>
                  <span class="applicant-skills">${applicant.skills.map(s => escapeHTML(s)).join(', ')} ${rating > 0 ? ` · ${getStarsHTML(rating)}` : ''}</span>
                </div>
                <div class="applicant-actions">
                  ${a.status === 'pending' ? `
                    <button class="btn btn-success btn-sm" onclick="handleApplication('${a.id}', 'accepted', '${projectId}')">Aceptar</button>
                    <button class="btn btn-danger btn-sm" onclick="handleApplication('${a.id}', 'rejected', '${projectId}')">Rechazar</button>
                  ` : `<span class="project-status ${a.status === 'accepted' ? 'status-in-progress' : 'status-closed'}" style="font-size:0.75rem;">${a.status === 'accepted' ? 'Aceptado' : 'Rechazado'}</span>`}
                </div>
              </div>
            `;
      }).join('')}
        </div>
      `;
    }

    // Show accepted participants
    const acceptedApps = apps.filter(a => a.status === 'accepted');
    let participantsHTML = '';
    if (acceptedApps.length > 0) {
      participantsHTML = `
        <div class="detail-applicants" style="margin-top:1rem;">
          <h3>Participantes Aceptados (${acceptedApps.length})</h3>
          ${acceptedApps.map(a => {
        const participant = getUsers().find(u => u.id === a.userId);
        if (!participant) return '';
        const rating = getRatings().find(r => r.projectId === projectId && r.ratedUserId === participant.id);
        return `
              <div class="applicant-row">
                <div class="applicant-info">
                  <span class="applicant-name">${escapeHTML(participant.name)}</span>
                  <span class="applicant-skills">
                    ${participant.skills.map(s => escapeHTML(s)).join(', ')}
                    ${rating ? ` · Calificado: ${'★'.repeat(rating.stars)}${'☆'.repeat(5 - rating.stars)}` : (isOwner && project.status === 'completed' ? ' · Sin calificar' : '')}
                  </span>
                </div>
              </div>
            `;
      }).join('')}
        </div>
      `;
    }

    const content = `
      ${projectBannerHTML(project, 'detail')}
      <div class="detail-header">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem;">
          <h2>${escapeHTML(project.title)}</h2>
          <span class="project-status ${statusClass}">${STATUSES[project.status]}</span>
        </div>
        <span class="project-category-badge">${CATEGORIES[project.category] || project.category}</span>
        <div class="detail-meta">
          <span><strong>Creado por:</strong> ${owner ? escapeHTML(owner.name) : 'Desconocido'}</span>
          <span><strong>Cupos:</strong> ${accepted}/${project.slots}</span>
          ${project.deadline ? `<span><strong>Fecha límite:</strong> ${new Date(project.deadline).toLocaleDateString('es')}</span>` : ''}
          ${project.repo ? `<span><a href="${escapeHTML(project.repo)}" target="_blank" rel="noopener">Repositorio</a></span>` : ''}
        </div>
      </div>

      <div class="detail-section">
        <h3>Descripción</h3>
        <p>${escapeHTML(project.description)}</p>
      </div>

      <div class="detail-section">
        <h3>Tecnologías</h3>
        <div class="project-card-tech">
          ${project.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
      </div>

      <div class="detail-section">
        <h3>Calificación Mínima Requerida</h3>
        <div class="min-rating-detail">
          <span class="min-rating-stars big">${'★'.repeat(project.minRating || 1)}${'☆'.repeat(5 - (project.minRating || 1))}</span>
          <span class="min-rating-desc">Los colaboradores deben tener un promedio de <strong>${project.minRating || 1} estrellas</strong> o más para aplicar.</span>
        </div>
      </div>

      ${ownerActions}
      ${applicantsHTML}
      ${participantsHTML}
    `;

    document.getElementById('project-detail-content').innerHTML = content;
    openModal('project-detail-modal');
  };

  // ========================================================================
  // HANDLE APPLICATIONS (Accept/Reject)
  // ========================================================================
  window.handleApplication = function (appId, newStatus, projectId) {
    const apps = getApplications();
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    const project = getProjects().find(p => p.id === projectId);
    if (!project) return;

    if (newStatus === 'accepted') {
      const acceptedCount = apps.filter(a => a.projectId === projectId && a.status === 'accepted').length;
      if (acceptedCount >= project.slots) {
        showToast('Ya no hay cupos disponibles', 'error');
        return;
      }
    }

    app.status = newStatus;
    saveApplications(apps);

    const user = getUsers().find(u => u.id === app.userId);
    showToast(
      newStatus === 'accepted'
        ? `${user ? user.name : 'Usuario'} ha sido aceptado`
        : `${user ? user.name : 'Usuario'} ha sido rechazado`,
      newStatus === 'accepted' ? 'success' : 'info'
    );

    openProjectDetail(projectId);
  };

  // ========================================================================
  // CHANGE PROJECT STATUS
  // ========================================================================
  window.changeProjectStatus = function (projectId, newStatus) {
    const projects = getProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    if (newStatus === 'completed') {
      const apps = getApplications().filter(a => a.projectId === projectId && a.status === 'accepted');
      if (apps.length === 0) {
        showToast('No hay participantes aceptados para calificar', 'error');
        return;
      }
    }

    project.status = newStatus;
    saveProjects(projects);
    showToast(`Proyecto actualizado a: ${STATUSES[newStatus]}`, 'success');

    closeModal('project-detail-modal');
    showView(currentView);
  };

  // ========================================================================
  // RATE MODAL
  // ========================================================================
  window.openRateModal = function (projectId) {
    const apps = getApplications().filter(a => a.projectId === projectId && a.status === 'accepted');
    const ratings = getRatings();
    const container = document.getElementById('rate-participants-list');

    if (apps.length === 0) {
      container.innerHTML = '<p style="color:var(--color-text-muted);text-align:center;">No hay participantes para calificar</p>';
    } else {
      container.innerHTML = apps.map(a => {
        const user = getUsers().find(u => u.id === a.userId);
        if (!user) return '';
        const existing = ratings.find(r => r.projectId === projectId && r.ratedUserId === user.id);
        const currentStars = existing ? existing.stars : 0;
        return `
          <div class="rate-participant">
            <div>
              <span class="rate-participant-name">${escapeHTML(user.name)}</span>
              <div class="applicant-skills" style="font-size:0.8rem;color:var(--color-text-dim);">${user.skills.map(s => escapeHTML(s)).join(', ')}</div>
            </div>
            <div class="star-rating" data-user="${user.id}" data-project="${projectId}">
              ${[5, 4, 3, 2, 1].map(s => `
                <input type="radio" id="star-${user.id}-${s}" name="rating-${user.id}" value="${s}" ${currentStars === s ? 'checked' : ''}>
                <label for="star-${user.id}-${s}" title="${s} estrella${s > 1 ? 's' : ''}">★</label>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
    }

    container.dataset.projectId = projectId;
    openModal('rate-modal');
  };

  window.saveRatings = function () {
    const container = document.getElementById('rate-participants-list');
    const projectId = container.dataset.projectId;
    const allRatings = getRatings();
    let saved = false;

    container.querySelectorAll('.star-rating').forEach(group => {
      const userId = group.dataset.user;
      const checked = group.querySelector('input:checked');
      if (!checked) return;

      const stars = parseInt(checked.value);
      const existing = allRatings.findIndex(r => r.projectId === projectId && r.ratedUserId === userId);

      if (existing >= 0) {
        allRatings[existing].stars = stars;
        allRatings[existing].updatedAt = new Date().toISOString();
      } else {
        allRatings.push({
          id: generateId(),
          projectId,
          ratedUserId: userId,
          ratedBy: getCurrentUser().id,
          stars,
          createdAt: new Date().toISOString()
        });
      }
      saved = true;
    });

    saveRatingsData(allRatings);

    if (saved) {
      showToast('Calificaciones guardadas', 'success');
    } else {
      showToast('No se asignaron calificaciones', 'info');
    }

    closeModal('rate-modal');
    showView(currentView);
  };

  // ========================================================================
  // PROFILE
  // ========================================================================
  function renderProfile() {
    const user = getCurrentUser();
    if (!user) return;

    const avatarEl = document.getElementById('profile-avatar');
    if (user.avatar) {
      avatarEl.className = 'profile-avatar';
      avatarEl.innerHTML = `<img src="${user.avatar}" alt="Foto de ${escapeHTML(user.name)}">`;
    } else {
      avatarEl.className = 'profile-avatar ' + avatarColorClass(user);
      avatarEl.textContent = user.name.charAt(0).toUpperCase();
    }
    const removeBtn = document.getElementById('profile-photo-remove');
    if (removeBtn) removeBtn.style.display = user.avatar ? 'inline-flex' : 'none';

    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-username-display').textContent = '@' + user.username;
    document.getElementById('profile-rating-stars').innerHTML = getStarsHTML(getUserAvgRating(user.id)) +
      ` <span style="font-size:0.85rem;color:var(--color-text-dim);">(${getUserRatingCount(user.id)} calificaciones)</span>`;
    document.getElementById('profile-bio').textContent = user.bio;

    document.getElementById('profile-skills').innerHTML = skillTagsHTML(user.skills);

    // Historial de proyectos
    document.getElementById('profile-history-list').innerHTML = userHistoryHTML(user);

    updateAvailabilityUI();

    // Received ratings
    const ratings = getRatings().filter(r => r.ratedUserId === user.id);
    const ratingsContainer = document.getElementById('profile-received-ratings');

    if (ratings.length === 0) {
      ratingsContainer.innerHTML = '<div class="empty-state"><p>No has recibido calificaciones aún</p></div>';
    } else {
      ratingsContainer.innerHTML = ratings.map(r => {
        const rater = getUsers().find(u => u.id === r.ratedBy);
        const project = getProjects().find(p => p.id === r.projectId);
        return `
          <div class="rating-row">
            <div>
              <span class="rating-by">${rater ? escapeHTML(rater.name) : 'Anónimo'} · ${project ? escapeHTML(project.title) : 'Proyecto eliminado'}</span>
            </div>
            <span class="rating-stars-display">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
          </div>
        `;
      }).join('');
    }
  }

  // ========================================================================
  // EDITAR PERFIL (descripción + tecnologías - Mi Perfil)
  // ========================================================================
  let selectedEditSkills = [];

  window.toggleEditProfile = function (cancel) {
    const user = getCurrentUser();
    if (!user) return;
    const panel = document.getElementById('edit-profile-panel');
    const skillTags = document.getElementById('profile-skills');
    const btn = document.querySelector('.profile-edit-btn');
    const bioInput = document.getElementById('profile-bio-input');
    if (!panel) return;

    const editing = panel.style.display !== 'none';

    if (editing || cancel) {
      // Salir del modo edición
      panel.style.display = 'none';
      btn.textContent = '✏️ Editar Perfil';
      const bioEl = document.getElementById('profile-bio');
      const skillsEl = document.getElementById('profile-skills');
      if (bioEl) bioEl.style.display = '';
      if (skillsEl) skillsEl.style.display = '';
      // Volver a mostrar lo guardado
      document.getElementById('profile-bio').textContent = user.bio;
      skillTags.innerHTML = skillTagsHTML(user.skills);
      return;
    }

    // Entrar al modo edición
    const bioEl = document.getElementById('profile-bio');
    const skillsEl = document.getElementById('profile-skills');
    if (bioEl) bioEl.style.display = 'none';
    if (skillsEl) skillsEl.style.display = 'none';
    if (bioInput) bioInput.value = user.bio || '';
    selectedEditSkills = (user.skills || []).slice();
    const chips = document.getElementById('edit-skills-buttons');
    chips.innerHTML = TECH_LIST.map(s => {
      const active = selectedEditSkills.includes(s);
      return `<button type="button" class="tech-chip ${active ? 'active' : ''}" data-skill="${escapeHTML(s)}" onclick="toggleEditSkill(this, '${escapeHTML(s)}')">${escapeHTML(s)}</button>`;
    }).join('');
    panel.style.display = 'block';
    btn.textContent = '✏️ Guardar cambios';
  };

  window.toggleEditSkill = function (el, skill) {
    if (selectedEditSkills.includes(skill)) {
      selectedEditSkills = selectedEditSkills.filter(s => s !== skill);
      el.classList.remove('active');
    } else {
      selectedEditSkills.push(skill);
      el.classList.add('active');
    }
  };

  window.saveProfile = function () {
    const user = getCurrentUser();
    if (!user) return;

    if (selectedEditSkills.length === 0) {
      showToast('Selecciona al menos una tecnología', 'error');
      return;
    }

    const bioInput = document.getElementById('profile-bio-input');
    user.bio = bioInput ? bioInput.value.trim() : user.bio;
    user.skills = selectedEditSkills.slice();

    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx].bio = user.bio;
      users[idx].skills = user.skills;
    }
    saveUsers(users);

    window.toggleEditProfile(true);
    document.getElementById('profile-bio').textContent = user.bio;
    document.getElementById('profile-skills').innerHTML = skillTagsHTML(selectedEditSkills);
    if (currentView === 'people') renderPeople();
    showToast('Perfil actualizado', 'success');
  };

  // ========================================================================
  // FOTO DE PERFIL
  // ========================================================================
  window.handleProfilePhoto = function (event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Selecciona un archivo de imagen', 'error');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const user = getCurrentUser();
      user.avatar = e.target.result;

      const users = getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx >= 0) users[idx].avatar = user.avatar;
      saveUsers(users);

      updateUserBubble(user);
      if (currentView === 'profile') renderProfile();
      showToast('Foto de perfil actualizada', 'success');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  window.removeProfilePhoto = function () {
    const user = getCurrentUser();
    user.avatar = null;

    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) users[idx].avatar = null;
    saveUsers(users);

    updateUserBubble(user);
    if (currentView === 'profile') renderProfile();
    showToast('Foto eliminada', 'info');
  };

  // ========================================================================
  // MODAL HELPERS
  // ========================================================================
  window.openModal = function (modalId) {
    if (modalId === 'create-project-modal') {
      window.initCreateProjectForm();
    }
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = '';
  };

  // Close modal on overlay click
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => {
        m.style.display = 'none';
      });
      document.body.style.overflow = '';
    }
  });

  // Header del usuario: al hacer scroll queda translúcido (superposición)
  function handleHeaderScroll() {
    const header = document.getElementById('header-logged');
    if (header) header.classList.toggle('scrolled', (window.scrollY || 0) > 12);
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ========================================================================
  // UTILITIES
  // ========================================================================
  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Renderiza habilidades como tags, mostrando solo `limit` y el resto sumado en un tag "+N".
  function skillTagsHTML(skills, limit = 3) {
    const list = (skills || []).slice();
    if (list.length === 0) return '';
    const shown = list.slice(0, limit);
    const rest = list.slice(limit);
    let html = shown.map(s => `<span class="tech-tag">${escapeHTML(s)}</span>`).join('');
    if (rest.length > 0) {
      html += `<span class="tech-tag skill-more-tag" title="${escapeHTML(rest.join(', '))}">+${rest.length}</span>`;
    }
    return html;
  }

  // Color de avatar determinístico por usuario (para avatares sin foto)
  function avatarColorClass(u) {
    const key = (u && (u.id || u.name)) || '';
    let seed = 0;
    for (let i = 0; i < key.length; i++) {
      seed = (seed * 31 + key.charCodeAt(i)) >>> 0;
    }
    return 'avatar-color-' + (seed % 10);
  }

  // ========================================================================
  // INITIALIZATION
  // ========================================================================
  function init() {
    applyTheme();
    applyLanguage();

    // Seed demo data if empty
    if (getUsers().length === 0) {
      seedDemoData();
    }

    // Migrar datos viejos guardados de versiones anteriores
    migrateLegacyData();
    seedDemoExtraData();

    // Pre-renderizar el formulario de creación de proyecto
    if (typeof window.initCreateProjectForm === 'function') {
      window.initCreateProjectForm();
    }

    if (getCurrentUser()) {
      showView('dashboard');
    } else {
      showView('login');
    }
  }

  function migrateLegacyData() {
    let changed = false;

    // Usuarios viejos sin "available"
    const users = getUsers().map(u => {
      const out = { ...u };
      if (typeof out.available !== 'boolean') {
        out.available = false;
        changed = true;
      }
      return out;
    });
    if (changed) saveUsers(users);

    // Proyectos viejos sin minRating o con "requirements" de texto
    const projects = getProjects().map(p => {
      const out = { ...p };
      if (typeof out.minRating !== 'number') {
        out.minRating = 1;
        changed = true;
      }
      if ('requirements' in out) {
        delete out.requirements;
        changed = true;
      }
      if (!Array.isArray(out.tech)) {
        out.tech = [];
        changed = true;
      }
      return out;
    });
    if (changed) saveProjects(projects);
  }

  function seedDemoData() {
    const demoUsers = [
      {
        id: 'demo1',
        name: 'María García',
        username: 'mariagar',
        email: 'maria@demo.com',
        password: '123456',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        bio: 'Desarrolladora full stack con 3 años de experiencia. Apasionada por crear aplicaciones web modernas y escalables.',
        createdAt: '2026-01-15T10:00:00Z'
      },
      {
        id: 'demo2',
        name: 'Carlos López',
        username: 'carloslop',
        email: 'carlos@demo.com',
        password: '123456',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        bio: 'Ingeniero de software enfocado en backend y arquitectura de microservicios.',
        available: true,
        createdAt: '2026-02-10T10:00:00Z'
      },
      {
        id: 'demo3',
        name: 'Ana Martínez',
        username: 'anamart',
        email: 'ana@demo.com',
        password: '123456',
        skills: ['TypeScript', 'Vue.js', 'Tailwind CSS', 'Firebase'],
        bio: 'Frontend developer y diseñadora UI/UX. Me encanta crear interfaces elegantes y funcionales.',
        available: true,
        createdAt: '2026-03-05T10:00:00Z'
      }
    ];

    const demoProjects = [
      {
        id: 'proj1',
        ownerId: 'demo1',
        title: 'Plataforma de Gestión de Tareas Colaborativas',
        category: 'web',
        slots: 3,
        tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        description: 'Busco programadores para crear una plataforma tipo Trello pero con funcionalidades avanzadas de colaboración en tiempo real, incluyendo chat, asignación de tareas y dashboards de progreso.',
        minRating: 2,
        deadline: '2026-12-01',
        repo: 'https://github.com/demo/task-manager',
        status: 'open',
        createdAt: '2026-08-20T10:00:00Z'
      },
      {
        id: 'proj2',
        ownerId: 'demo2',
        title: 'API REST para Sistema de E-learning',
        category: 'backend',
        slots: 2,
        tech: ['Python', 'Django REST Framework', 'PostgreSQL', 'Redis'],
        description: 'Necesito desarrolladores backend para construir una API robusta para una plataforma de cursos online. Incluirá autenticación JWT, sistema de pagos y streaming de video.',
        minRating: 3,
        deadline: '2026-11-15',
        repo: null,
        status: 'in-progress',
        createdAt: '2026-07-10T10:00:00Z'
      },
      {
        id: 'proj3',
        ownerId: 'demo3',
        title: 'App Móvil de Recetas con IA',
        category: 'mobile',
        slots: 2,
        tech: ['React Native', 'Python', 'TensorFlow Lite', 'Firebase'],
        description: 'Creando una aplicación móvil que sugiere recetas basándose en los ingredientes que el usuario tiene en la cocina, usando inteligencia artificial para el reconocimiento de imágenes.',
        minRating: 1,
        deadline: '2027-01-20',
        repo: 'https://github.com/demo/recipe-ai',
        status: 'open',
        createdAt: '2026-08-25T10:00:00Z'
      }
    ];

    saveUsers(demoUsers);
    saveProjects(demoProjects);
    saveApplications([]);
    saveRatingsData([]);
  }

  // Personas de ejemplo adicionales (solo se agregan si no existen; no borra datos reales)
  function seedDemoExtraData() {
    const extraUsers = [
      {
        id: 'demo4',
        name: 'Luis Ramírez',
        username: 'luisram',
        email: 'luis@demo.com',
        password: '123456',
        skills: ['JavaScript', 'React', 'Next.js', 'Node.js'],
        bio: 'Desarrollador frontend especializado en React y Next.js. Me gusta el diseño de interfaces y el performance web.',
        available: true,
        createdAt: '2026-03-20T10:00:00Z'
      },
      {
        id: 'demo5',
        name: 'Sofía Herrera',
        username: 'sofiaher',
        email: 'sofia@demo.com',
        password: '123456',
        skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
        bio: 'Backend developer y entusiasta del data. Construyo APIs escalables en la nube.',
        available: true,
        createdAt: '2026-04-02T10:00:00Z'
      },
      {
        id: 'demo6',
        name: 'Diego Torres',
        username: 'diegotor',
        email: 'diego@demo.com',
        password: '123456',
        skills: ['TypeScript', 'Angular', 'CSS', 'MySQL'],
        bio: 'Full stack web con amor por el frontend. Experiencia con aplicaciones empresariales.',
        available: true,
        createdAt: '2026-05-11T10:00:00Z'
      },
      {
        id: 'demo7',
        name: 'Valentina Rojas',
        username: 'valerojas',
        email: 'vale@demo.com',
        password: '123456',
        skills: ['Go', 'Docker', 'Kubernetes', 'AWS'],
        bio: 'Ingeniera de plataformas. Microservicios, contenedores y CI/CD son mi día a día.',
        available: true,
        createdAt: '2026-05-28T10:00:00Z'
      },
      {
        id: 'demo8',
        name: 'Mateo Silva',
        username: 'mateosil',
        email: 'mateo@demo.com',
        password: '123456',
        skills: ['Flutter', 'Dart', 'Firebase'],
        bio: 'Mobile developer en Flutter. Apps nativas multiplataforma con UI cuidada.',
        available: true,
        createdAt: '2026-06-15T10:00:00Z'
      }
    ];

    const extraProjects = [
      {
        id: 'proj4',
        ownerId: 'demo4',
        title: 'Dashboard de Analítica en Tiempo Real',
        category: 'web',
        slots: 3,
        tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        description: 'Panel de métricas con actualización en vivo para equipos de ventas. Incluirá gráficos, filtros y alertas personalizadas.',
        minRating: 1,
        deadline: '2026-12-20',
        repo: null,
        status: 'open',
        createdAt: '2026-09-01T10:00:00Z'
      },
      {
        id: 'proj5',
        ownerId: 'demo5',
        title: 'Sistema de Reservas para Restaurantes',
        category: 'backend',
        slots: 2,
        tech: ['Python', 'Django', 'PostgreSQL'],
        description: 'API para gestionar reservas de mesas en tiempo real, con notificaciones por email y reportes de ocupación.',
        minRating: 2,
        deadline: '2026-12-10',
        repo: null,
        status: 'open',
        createdAt: '2026-09-05T10:00:00Z'
      },
      {
        id: 'proj6',
        ownerId: 'demo6',
        title: 'Portal Web de la Comunidad',
        category: 'web',
        slots: 2,
        tech: ['TypeScript', 'Angular', 'MySQL'],
        description: 'Portal para una comunidad de desarrolladores locales: foros, eventos y directorio de miembros.',
        minRating: 1,
        deadline: '2026-12-30',
        repo: null,
        status: 'open',
        createdAt: '2026-09-08T10:00:00Z'
      },
      {
        id: 'proj7',
        ownerId: 'demo7',
        title: 'Gateway de Microservicios',
        category: 'devops',
        slots: 2,
        tech: ['Go', 'Docker', 'Kubernetes'],
        description: 'API gateway para orquestar microservicios con autenticación centralizada, rate limiting y observabilidad.',
        minRating: 3,
        deadline: '2027-01-15',
        repo: 'https://github.com/demo/api-gateway',
        status: 'open',
        createdAt: '2026-09-10T10:00:00Z'
      }
    ];

    // Aceptados (participaciones) que alimentan las referencias de cada persona
    const extraApps = [
      { id: 'app-ref-1', projectId: 'proj2', userId: 'demo4', status: 'accepted', appliedAt: '2026-08-01T10:00:00Z' },
      { id: 'app-ref-2', projectId: 'proj1', userId: 'demo5', status: 'accepted', appliedAt: '2026-08-22T10:00:00Z' },
      { id: 'app-ref-3', projectId: 'proj3', userId: 'demo5', status: 'accepted', appliedAt: '2026-08-26T10:00:00Z' },
      { id: 'app-ref-4', projectId: 'proj1', userId: 'demo6', status: 'accepted', appliedAt: '2026-08-21T10:00:00Z' },
      { id: 'app-ref-5', projectId: 'proj5', userId: 'demo7', status: 'accepted', appliedAt: '2026-09-06T10:00:00Z' },
      { id: 'app-ref-6', projectId: 'proj4', userId: 'demo8', status: 'accepted', appliedAt: '2026-09-03T10:00:00Z' },
      { id: 'app-ref-7', projectId: 'proj3', userId: 'demo8', status: 'accepted', appliedAt: '2026-08-27T10:00:00Z' }
    ];

    const extraRatings = [
      { id: 'rating-6', projectId: 'proj2', ratedUserId: 'demo2', ratedBy: 'demo1', stars: 5, createdAt: '2026-08-05T10:00:00Z' },
      { id: 'rating-7', projectId: 'proj3', ratedUserId: 'demo3', ratedBy: 'demo1', stars: 4, createdAt: '2026-08-30T10:00:00Z' },
      { id: 'rating-8', projectId: 'proj2', ratedUserId: 'demo4', ratedBy: 'demo2', stars: 5, createdAt: '2026-09-02T10:00:00Z' },
      { id: 'rating-9', projectId: 'proj3', ratedUserId: 'demo5', ratedBy: 'demo3', stars: 5, createdAt: '2026-09-04T10:00:00Z' },
      { id: 'rating-10', projectId: 'proj1', ratedUserId: 'demo5', ratedBy: 'demo1', stars: 4, createdAt: '2026-09-01T10:00:00Z' },
      { id: 'rating-11', projectId: 'proj1', ratedUserId: 'demo6', ratedBy: 'demo1', stars: 4, createdAt: '2026-09-01T10:00:00Z' },
      { id: 'rating-12', projectId: 'proj5', ratedUserId: 'demo7', ratedBy: 'demo5', stars: 5, createdAt: '2026-09-11T10:00:00Z' },
      { id: 'rating-13', projectId: 'proj4', ratedUserId: 'demo8', ratedBy: 'demo4', stars: 5, createdAt: '2026-09-05T10:00:00Z' }
    ];

    const users = getUsers();
    const projects = getProjects();
    const apps = getApplications();
    const ratings = getRatings();
    let changed = false;

    extraUsers.forEach(u => {
      if (!users.some(x => x.id === u.id) && !users.some(x => x.email === u.email)) {
        users.push(u);
        changed = true;
      }
    });

    extraProjects.forEach(p => {
      if (!projects.some(x => x.id === p.id)) {
        projects.push(p);
        changed = true;
      }
    });

    extraApps.forEach(a => {
      if (!apps.some(x => x.projectId === a.projectId && x.userId === a.userId)) {
        apps.push(a);
        changed = true;
      }
    });

    extraRatings.forEach(r => {
      if (!ratings.some(x => x.projectId === r.projectId && x.ratedUserId === r.ratedUserId)) {
        ratings.push(r);
        changed = true;
      }
    });

    if (changed) {
      saveUsers(users);
      saveProjects(projects);
      saveApplications(apps);
      saveRatingsData(ratings);
    }
  }

  // Start
  init();

})();
