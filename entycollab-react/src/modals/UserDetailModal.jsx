import { useApp } from '../context/AppContext.jsx';
import { useModals } from '../context/ModalManager.jsx';
import { Modal, Avatar, Stars, SkillTags } from '../components/common.jsx';
import UserHistory from '../components/UserHistory.jsx';
import { getUserAvgRating, escapeHTML } from '../lib/helpers.js';

export default function UserDetailModal() {
  const { users, ratings, t, l10n } = useApp();
  const { userDetailId, closeUserDetail, openInvite } = useModals();
  const { user: me } = useApp();

  const u = users.find(x => x.id === userDetailId);
  if (!u) return null;

  const rating = getUserAvgRating(u.id, ratings);
  const bio = l10n(u.bio);
  const isSelf = me && me.id === u.id;

  return (
    <Modal open onClose={closeUserDetail} size="modal-large" title={t('userDetail.title')}>
      <div className="profile-layout">
        <div className="profile-info">
          <Avatar user={u} cls="profile-avatar" />
          <h3>{escapeHTML(u.name)}</h3>
          <p className="profile-username">@{escapeHTML(u.username)}</p>
          <div className="profile-rating-display">
            {rating > 0 ? <Stars rating={rating} /> : t('person.noRatings')}
          </div>
          <p className="profile-bio">{bio ? escapeHTML(bio) : t('person.noBio')}</p>
          <div className="profile-skills">{<SkillTags skills={u.skills} limit={999} />}</div>
        </div>
        <div className="profile-history">
          <h3>{t('profile.history')}</h3>
          <UserHistory user={u} />
        </div>
      </div>
      {!isSelf && (
        <button
          className="btn btn-primary btn-full"
          style={{ marginTop: '1rem' }}
          onClick={() => { closeUserDetail(); openInvite(u.id); }}
        >
          {t('person.inviteProject')}
        </button>
      )}
    </Modal>
  );
}