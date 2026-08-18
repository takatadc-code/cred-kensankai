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

/**
 * 今日の日付を YYYY-MM-DD で返す（閲覧者のローカル時間basis）。
 * toISOString() は UTC になるため、日本時間の朝は前日扱いになってしまう。
 */
export function todayStr() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
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

/**
 * 問い合わせメールの mailto: リンクを作る。
 * 宛先＋CC（運営2名に同時に届く）、件名と記入項目入りの本文をあらかじめセットする。
 * @param {string} [loginEmail] ログイン中のアドレス（分かる場合は本文に自動記入）
 */
export function contactMailto(loginEmail) {
  const body = [
    'お名前：',
    'ご所属（医院名など）：',
    'PayPalにご登録のメールアドレス：',
    `ログインに使ったメールアドレス：${loginEmail || ''}`,
    'お困りの内容：',
    '',
  ].join('\n');
  const params = new URLSearchParams({
    cc: cfg.CONTACT_CC || '',
    subject: `【${cfg.SALON_NAME}】お問い合わせ`,
    body,
  });
  return `mailto:${cfg.CONTACT_EMAIL}?${params.toString().replace(/\+/g, '%20')}`;
}
