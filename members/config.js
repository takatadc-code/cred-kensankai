// ============================================================
//  Supabase 接続設定
//  Supabase ダッシュボード > Project Settings > API からコピーする
//
//  anon key は公開して問題ない鍵です（ブラウザに配る前提の設計）。
//  実際のアクセス制御は schema.sql の RLS が行っています。
//  ※ service_role key は絶対にここに書かないこと。
// ============================================================

window.SALON_CONFIG = {
  SUPABASE_URL: 'https://msvueolaugfyfwfazqmu.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdnVlb2xhdWdmeWZ3ZmF6cW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2OTQ2NjcsImV4cCI6MjEwMjI3MDY2N30.4mUeISRKl3vehwyKxmClZBs_QhWiQ6zS51AAcVSdIVU',

  // サロン名（画面表示用）
  SALON_NAME: 'Salon de CRED',

  // 会員から問い合わせを受けるメールアドレス（CC にも同時送信される）
  CONTACT_EMAIL: 'info@takata-dc.jp',
  CONTACT_CC: 'norico.takahashi@gmail.com',

  // 会員から問い合わせを受ける公式LINE
  CONTACT_LINE_URL: 'https://lin.ee/TfGrFSS',
  CONTACT_LINE_ID: '@057flcio',
};
