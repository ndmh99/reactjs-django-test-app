# Common Issues & Gotchas (React + Django + Cloud Deployment)

This file lists current and frequently encountered issues with this project, especially when deploying to free cloud services like Render and Vercel. Use this as a reference when troubleshooting deployment or development problems.

**Last Updated:** May 22, 2025

---

## 1. Render Free Tier Backend Sleep
- **Issue:** Render free web services go to sleep after 15 minutes of inactivity.
- **Effect:** First request after sleep is slow (cold start, 20-60 seconds).
- **Workaround:** Upgrade to a paid plan for always-on, or use a service to ping your backend periodically (not recommended for production).

## 2. Render Free Tier Limits
- **Issue:** Limited monthly hours, RAM, and CPU on free tier.
- **Effect:** App may be suspended or slow if you exceed limits.
- **Workaround:** Monitor usage, upgrade if needed.

## 3. Amazon RDS Free Tier Expiry
- **Issue:** AWS RDS free tier is only free for 12 months.
- **Effect:** You will be charged after the free period.
- **Workaround:** Set billing alerts, delete unused DBs, or switch to local dev/another free DB.

## 4. CORS Errors
- **Issue:** CORS errors if frontend URL is not in Django's `CORS_ALLOWED_ORIGINS`.
- **Effect:** API requests from frontend are blocked with "Access-Control-Allow-Origin" errors in console.
- **Workaround:** 
  1. Install django-cors-headers: `pip install django-cors-headers`
  2. Add 'corsheaders' to INSTALLED_APPS in settings.py
  3. Add 'corsheaders.middleware.CorsMiddleware' to MIDDLEWARE (as high as possible)
  4. Configure allowed origins:
  ```python
  CORS_ALLOWED_ORIGINS = [
      "https://reactjs-django-test-app.vercel.app",  # Production frontend
      "http://localhost:5173",                      # Local frontend
  ]
  ```
  5. For development only, you can use: `CORS_ALLOW_ALL_ORIGINS = True` (not recommended for production)

## 5. Database Connection Errors (Local vs. Cloud)
- **Issue:** Running `python manage.py migrate` locally with cloud DB settings but no env vars set.
- **Effect:** Connection refused or timeout.
- **Workaround:** Only run migrations on Render for RDS, or use SQLite locally (see settings.py logic).

## 6. Vercel Build Failures
- **Issue:** Wrong root directory or missing build command in Vercel settings.
- **Effect:** Frontend fails to deploy.
- **Workaround:** Set root to `client/app`, build command to `npm run build`, output to `dist`.

## 7. Environment Variables Not Set
- **Issue:** Missing env vars on Render (RDS_DB_NAME, etc.) or Vercel (if using any).
- **Effect:** App crashes or can't connect to DB.
- **Workaround:** Double-check all required env vars are set in the dashboard.

## 8. Static Files Not Served in Production
- **Issue:** Django static files (CSS, JS) not served by default in production.
- **Effect:** Admin or custom static assets may not load.
- **Workaround:** Use WhiteNoise or proper static file hosting for production. For WhiteNoise:
  1. Install: `pip install whitenoise`
  2. Add to MIDDLEWARE: `'whitenoise.middleware.WhiteNoiseMiddleware'`
  3. Configure: `STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'`

## 9. AWS RDS Security Group
- **Issue:** RDS not accessible from Render due to security group rules.
- **Effect:** Database connection errors.
- **Workaround:** Add Render's IP range to RDS security group inbound rules.

## 10. Cold Start on Vercel
- **Issue:** First load after inactivity may be slow (less common than Render).
- **Effect:** Initial page load delay.
- **Workaround:** None for free tier; upgrade for better performance.

---

## Tips
- Always check logs on Render and Vercel for error details.
- Use environment variables for all secrets and DB credentials.
- For local dev, use SQLite and DEBUG=True for easiest setup.
- For production, set DEBUG=False, use strong SECRET_KEY, and monitor your cloud usage.

---

Add new issues here as you encounter them!
