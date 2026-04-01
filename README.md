# Zaw Htet Naung Portfolio (React + Tailwind)

This project is fully migrated from static HTML to:
- React (Vite)
- Tailwind CSS
- shadcn-style UI component structure

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

Build output is generated in `dist/`.

## AWS EC2 deployment options

### Option 1: Nginx (simple static deploy)

1. Build locally or on EC2:
```bash
npm install
npm run build
```
2. Upload `dist/` to your EC2 server web root (for example `/var/www/portfolio`).
3. Configure Nginx server block with SPA fallback:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
4. Reload Nginx.

### Option 2: Docker (included)

```bash
docker build -t zaw-portfolio .
docker run -d -p 80:80 --name zaw-portfolio zaw-portfolio
```

The included `nginx.conf` is already configured for React SPA routing.

## Notes

- Public assets are served from `public/assets`.
- Main app code is in `src/`.
- Legacy static file is kept as `index.legacy.html`.
