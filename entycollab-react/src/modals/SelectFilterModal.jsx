import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useModals } from '../context/ModalManager.jsx';
import { Modal, EmptyState } from '../components/common.jsx';
import { escapeHTML } from '../lib/helpers.js';
import { availableCategoriesList, availablePeopleTechList, availableTechList } from '../lib/filters.js';

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
