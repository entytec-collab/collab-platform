import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useModals } from '../context/ModalManager.jsx';
import { Modal, EmptyState } from '../components/common.jsx';
import { escapeHTML, getCategoryLabel } from '../lib/helpers.js';

// kind: "category" | "tech" | "peopleTech"
export default function SelectFilterModal({ kind }) {
  const {
    lang, // not used directly for labels of custom categories
    projects, users,
    t,
    selectedCategories, setSelectedCategories,
    selectedTechFilters, setSelectedTechFilters,
    selectedPeopleTechFilters, setSelectedPeopleTechFilters
  } = useApp();
  const modals = useModals();

  const [draft, setDraft] = useState(() => snapshot());

  const isCategory = kind === 'category';
  const isPeople = kind === 'peopleTech';
  const apply = isCategory ? setSelectedCategories : isPeople ? setSelectedPeopleTechFilters : setSelectedTechFilters;
  const onClose = isCategory ? modals.closeCategoryFilter : isPeople ? modals.closePeopleTechFilter : modals.closeTechFilter;

  const options = isCategory
    ? availableCategoriesList(projects, lang)
    : isPeople
      ? availablePeopleTechList(users)
      : availableTechList(projects);

  function title() {
    return isCategory ? t('catFilter.title') : t('techFilter.title');
  }
  function subtitle() {
    if (isPeople) return t('peopleTechFilter.subtitle');
    return isCategory ? t('catFilter.subtitle') : t('techFilter.subtitle');
  }

  const toggle = (value) => {
    setDraft(prev => prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value]);
  };

  const confirm = () => {
    apply(draft);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={title()} subtitle={subtitle()}>
      <div className="featured-counter">{t('catFilter.counterSelected', { n: draft.length, total: options.length })}</div>
      <div className="featured-list">
        {options.length === 0 ? (
          <EmptyState title={isCategory ? t('empty.noCategories') : t('empty.noTechs')} icon={null} />
        ) : (
          options.map((opt, i) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const label = typeof opt === 'string' ? opt : opt.label;
            const selectedNow = draft.includes(value);
            return (
              <button
                type="button"
                key={i}
                className={'featured-proj-card' + (selectedNow ? ' selected' : '')}
                onClick={() => toggle(value)}
              >
                <span className="featured-proj-tick">{selectedNow ? '★' : '☆'}</span>
                <span className="featured-proj-title">{escapeHTML(label)}</span>
              </button>
            );
          })
        )}
      </div>
      <div className="featured-actions">
        <button className="btn btn-ghost" onClick={onClose}>{t('invite.cancel')}</button>
        <button className="btn btn-primary" onClick={confirm}>{t('invite.apply')}</button>
      </div>
    </Modal>
  );

  function snapshot() {
    return isCategory ? selectedCategories.slice()
      : isPeople ? selectedPeopleTechFilters.slice()
        : selectedTechFilters.slice();
  }
}

// Categorías realmente usadas por los proyectos existentes
export function availableCategoriesList(projects, lang) {
  const used = new Set(projects.map(p => p.category));
  const list = [];
  const CAT = {
    web: 'cat.web', mobile: 'cat.mobile', desktop: 'cat.desktop', ai: 'cat.ai',
    game: 'cat.game', backend: 'cat.backend', devops: 'cat.devops'
  };
  Object.keys(CAT).forEach(key => {
    if (used.has(key)) list.push({ value: key, label: getCategoryLabel(lang, key) });
  });
  [...used].filter(c => !CAT[c] && c !== 'other').forEach(c => list.push({ value: c, label: c }));
  return list;
}

// Tecnologías realmente usadas por los proyectos existentes
export function availableTechList(projects) {
  const all = new Set();
  projects.forEach(p => (p.tech || []).forEach(t => all.add(t)));
  return [...all].sort();
}

// Habilidades de los colaboradores disponibles
export function availablePeopleTechList(users) {
  const all = new Set();
  users.filter(u => u.available === true).forEach(u => (u.skills || []).forEach(s => all.add(s)));
  return [...all].sort();
}