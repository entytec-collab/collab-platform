// ==========================================================================
// HELPERS
// Funciones auxiliares portadas de app.js.
// ==========================================================================

import { t, l10nValue } from './i18n.js';

export const CATEGORIES = {
  web: 'cat.web',
  mobile: 'cat.mobile',
  desktop: 'cat.desktop',
  ai: 'cat.ai',
  game: 'cat.game',
  backend: 'cat.backend',
  devops: 'cat.devops',
  other: 'cat.other'
};

export const STATUSES = {
  open: 'status.open',
  'in-progress': 'status.in-progress',
  completed: 'status.completed',
  closed: 'status.closed'
};

export const CATEGORY_META = {
  web: { icon: '🌐', labelKey: 'cat.web', gradient: 'linear-gradient(135deg, #6366f1, #0ea5e9)' },
  mobile: { icon: '📱', labelKey: 'cat.mobile', gradient: 'linear-gradient(135deg, #10b981, #14b8a6)' },
  desktop: { icon: '🖥️', labelKey: 'cat.desktop', gradient: 'linear-gradient(135deg, #64748b, #475569)' },
  ai: { icon: '🤖', labelKey: 'cat.ai', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)' },
  game: { icon: '🎮', labelKey: 'cat.game', gradient: 'linear-gradient(135deg, #f43f5e, #ec4899)' },
  backend: { icon: '⚙️', labelKey: 'cat.backend', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
  devops: { icon: '☁️', labelKey: 'cat.devops', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
  other: { icon: '🗂️', labelKey: 'cat.other', gradient: 'linear-gradient(135deg, #22c55e, #84cc16)' }
};

export const GAME_DEV_TECH_LIST = [
  'Unity', 'Unreal Engine', 'Godot', 'GameMaker', 'RPG Maker', 'CryEngine', 'Defold', 'Phaser', 'Bevy', 'Raylib',
  'C#', 'C++', 'GDScript', 'Lua', 'Blueprints', 'Rust', 'Python',
  'Blender', 'Maya', '3ds Max', 'ZBrush', 'Substance 3D', 'Aseprite', 'Photoshop', 'Spine 2D', 'Houdini', 'Pixel Art',
  'Shader Graph', 'HLSL / GLSL', 'OpenGL', 'Vulkan', 'DirectX', 'Metal',
  'FMOD', 'Wwise', 'Audacity', 'Reaper',
  'PhysX', 'Havok', 'Photon', 'Mirror', 'Netcode'
];

export const TECH_LIST = [
  'Unity', 'Unreal Engine', 'Godot', 'Blender', 'C#', 'C++', 'Python', 'Rust',
  'JavaScript', 'TypeScript', 'Java', 'Go', 'React', 'Node.js', 'PostgreSQL',
  'Docker', 'AWS', 'TensorFlow', 'PyTorch', 'Git', 'Linux'
];

export function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// getStatusLabel y getCategoryLabel dependen del idioma actual
export function getStatusLabel(lang, status) {
  return STATUSES[status] ? t(lang, STATUSES[status]) : status;
}

export function getCategoryLabel(lang, category) {
  return CATEGORIES[category] ? t(lang, CATEGORIES[category]) : category;
}

export function getCategoryMeta(category) {
  return CATEGORY_META[category] || CATEGORY_META.other;
}

export function statusClassHelper(status) {
  return status === 'open' ? 'status-open'
    : status === 'in-progress' ? 'status-in-progress'
      : status === 'completed' ? 'status-completed' : 'status-closed';
}

export function starLabel(lang, n) {
  return n === 1 ? t(lang, 'star.one') : t(lang, 'star.many', { n });
}

export function getUserAvgRating(userId, ratings) {
  const list = ratings.filter(r => r.ratedUserId === userId);
  if (list.length === 0) return 0;
  return list.reduce((sum, r) => sum + r.stars, 0) / list.length;
}

export function getUserRatingCount(userId, ratings) {
  return ratings.filter(r => r.ratedUserId === userId).length;
}

export function getStarsHTML(rating, maxStars = 5) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = maxStars - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty) +
    ` <span style="font-size:0.75rem;color:var(--color-text-dim);">(${rating.toFixed(1)})</span>`;
}

export function avatarColorClass(u) {
  const key = (u && (u.id || u.name)) || '';
  let seed = 0;
  for (let i = 0; i < key.length; i++) {
    seed = (seed * 31 + key.charCodeAt(i)) >>> 0;
  }
  return 'avatar-color-' + (seed % 10);
}

// Renderiza habilidades como tags, mostrando solo `limit` y el resto en "+N".
export function skillTagsHTML(skills, limit = 3) {
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

// Puntaje de "importancia" de un proyecto: estado + nº de aceptados + rating del dueño
export function scoreProject(project, projects, applications, users, ratings) {
  const accepted = applications.filter(a => a.projectId === project.id && a.status === 'accepted').length;
  const owner = users.find(u => u.id === project.ownerId);
  const ownerRating = getUserAvgRating(owner ? owner.id : '', ratings);

  let score = accepted * 50;

  if (project.status === 'in-progress') score += 100;
  else if (project.status === 'open') score += 50;
  else if (project.status === 'completed') score += 120;

  score += ownerRating * 10;

  const ageDays = (Date.now() - new Date(project.createdAt).getTime()) / 86400000;
  score -= Math.min(ageDays, 30);

  return score;
}

// Convierte un file upload a data URL (para fotos/imágenes de proyecto)
export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function l10nFor(lang) {
  return (value) => l10nValue(lang, value);
}

// Proyectos del usuario (creados + participaciones aceptadas, sin duplicar)
export function userProjectsList(u, projects, applications) {
  const created = projects.filter(p => p.ownerId === u.id).map(p => ({ p, role: 'creator' }));
  const participated = applications
    .filter(a => a.userId === u.id && a.status === 'accepted')
    .map(a => projects.find(p => p.id === a.projectId))
    .filter(Boolean)
    .map(p => ({ p, role: 'participant' }));

  const seen = new Set();
  return created.concat(participated).filter(it => {
    if (seen.has(it.p.id)) return false;
    seen.add(it.p.id);
    return true;
  });
}

// Items del historial de un usuario (Creador + Participante, duplicados se descartan)
export function userHistoryItems(u, projects, applications, lang) {
  const myProjects = projects.filter(p => p.ownerId === u.id)
    .map(p => ({ p, role: t(lang, 'history.creator'), statusText: getStatusLabel(lang, p.status) }));
  const myApps = applications
    .filter(a => a.userId === u.id)
    .map(a => {
      const p = projects.find(proj => proj.id === a.projectId);
      if (!p) return null;
      return {
        p,
        role: t(lang, 'history.participant'),
        statusText: a.status === 'accepted' ? getStatusLabel(lang, p.status) : t(lang, 'history.notAccepted')
      };
    })
    .filter(Boolean);

  const seen = new Set();
  return [...myProjects, ...myApps].filter(it => {
    if (seen.has(it.p.id)) return false;
    seen.add(it.p.id);
    return true;
  });
}