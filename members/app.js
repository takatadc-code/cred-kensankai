// ============================================================
//  共通処理（Supabase クライアントと小さなヘルパー）
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const cfg = window.SALON_CONFIG;

if (!cfg || cfg.SUPABASE_URL.includes('xxxxxxxx')) {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML =
      '<div class="wrap"><div class="card"><h2>設定が未完了です</h2>' +
      '<p>public/config.js に Supabase の URL と anon key を記入してください。</p>' +
      '</div></div>';
  });
}

export const supabase = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
  auth: {
    detectSessionInUrl: true,   // マジックリンクから戻ってきたときに自動でログイン処理をする
    persistSession: true,
    autoRefreshToken: true,
  },
});

/** 画面上部のメッセージ欄に文言を出す */
export function showMsg(el, type, text) {
  el.className = `msg show ${type}`;
  el.textContent = text;
}

export function hideMsg(el) {
  el.className = 'msg';
  el.textContent = '';
}

/** 2026-08-14 → 2026年8月14日 */
export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${Number(y)}年${Number(m)}月${Number(d)}日`;
}

/** ログイン後に戻ってくる URL。ローカルでも本番でもそのまま動く */
export function memberPageUrl() {
  return new URL('member.html', window.location.href).toString();
}
