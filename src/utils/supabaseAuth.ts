import { supabase } from './supabaseClient';

export const signUp = async (email: string, password: string, metadata?: any) => {
  const res = await supabase.auth.signUp({ email, password }, { data: metadata });
  return res;
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
};

export const updateProfile = async (supabaseUserId: string, profile: Partial<any>) => {
  // upsert into users table; use RPC or simple upsert
  return await supabase.from('users').upsert({ supabase_user_id: supabaseUserId, ...profile }).select().maybeSingle();
};

export const getProfileBySupabaseId = async (supabaseUserId: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('supabase_user_id', supabaseUserId).maybeSingle();
  if (error) throw error;
  return data ?? null;
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ?? null;
};
