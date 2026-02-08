# 🔐 Supabase Credentials & Security

## ✅ Configuration Complete

Your Supabase project is now configured and ready for use:

**Project ID:** `rgzwavtriyrxqrbivuyq`  
**Project URL:** `https://rgzwavtriyrxqrbivuyq.supabase.co`

### Environment Files Status
- ✅ `.env.example` — Updated with your credentials (reference)
- ✅ `.env.local` — Created with active credentials (local dev)
- ✅ `.gitignore` — Updated to exclude `.env*` files

### Running the App
```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 🔒 Security Checklist

### DO ✅
- [ ] Keep `.env.local` safe and never commit to git
- [ ] Use the **anon key** in frontend code (already in environment)
- [ ] Use **service role key** ONLY on secure backend/server functions
- [ ] Rotate keys if accidentally exposed
- [ ] Enable RLS policies on all Supabase tables before production

### DON'T ❌
- ❌ Commit `.env.local` or `.env` to git
- ❌ Hardcode secrets in source code
- ❌ Share service role key in client-side bundles
- ❌ Expose keys in error messages or logs
- ❌ Use these keys in public repositories

---

## 🚀 Next Steps

1. **Run the dev server** (already running at http://localhost:5173)
2. **Apply SQL migrations** to your Supabase database:
   - Log into [supabase.com](https://supabase.com)
   - Go to `SQL Editor` → `New Query`
   - Paste SQL from `supabase/sql/01_create_users.sql` through `07_create_messages.sql`
3. **Configure RLS policies** (see `SUPABASE_SETUP.md` for examples)
4. **Wire up auth** (see `SUPABASE_SETUP.md` for AuthContext migration)
5. **Deploy** when ready

---

## 📚 Useful Resources
- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

---

## ⚠️ Key Credentials Reference

**Anon Key (Public - Safe in Frontend):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnendhdnRyaXlyeHFyYml2dXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4ODE1NjEsImV4cCI6MjA4NTQ1NzU2MX0.YhTWK3ldJeQK0RhRxkIsw_twxPmSSg7L4HuBfB3Sk1Y
```

**Service Role Key (Secret - Backend Only):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnendhdnRyaXlyeHFyYml2dXlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTg4MTU2MSwiZXhwIjoyMDg1NDU3NTYxfQ.8iLJTv2exBSyqSlTmh6ZRBVf-AwNUFDYxE0fY0QGsY4
```

---

**Status:** ✅ Ready to use. Keep keys safe!
