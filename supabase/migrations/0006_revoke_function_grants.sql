-- 0006_revoke_function_grants.sql
-- SECURITY DEFINER fonksiyonlarını Data API üzerinden gereksiz rollere kapat.

-- Yalnızca auth.users tetikleyicisi çağırır; RPC olarak açık olmamalı.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Yalnızca oturumlu kullanıcılar sohbet başlatabilir.
revoke execute on function public.create_direct_conversation(uuid) from public, anon;
