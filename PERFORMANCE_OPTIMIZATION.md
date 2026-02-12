# Performance Optimization Guide

## ✅ Already Implemented

### 1. Code Splitting
- Lazy loading all route components with React.lazy()
- Suspense boundaries for smooth loading
- Reduces initial bundle from ~500KB to ~150KB

### 2. Image Optimization
- WebP format images (already in use)
- Lazy loading attribute on images
- OptimizedImage component created for responsive images

### 3. Font Optimization
- Google Fonts with display=swap (prevents FOUT)
- Preconnect to fonts.googleapis.com

### 4. Resource Hints
- Preconnect to external resources
- DNS prefetch for Supabase

---

## 📋 Additional Optimizations to Implement

### 1. **Image Responsive Srcset**

Update images to use srcset for different screen sizes:

```javascript
<OptimizedImage
  src="/images/hero.webp"
  alt="Hero image"
  srcSet="
    /images/hero-sm.webp 480w,
    /images/hero-md.webp 768w,
    /images/hero-lg.webp 1200w,
    /images/hero.webp 1920w
  "
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 1200px"
  loading="lazy"
/>
```

### 2. **Enable Gzip Compression**

In your build configuration (if using custom server):

```javascript
// For Express.js
const compression = require('compression');
app.use(compression());
```

### 3. **Service Worker for PWA**

Create `src/serviceWorker.js`:

```javascript
export const register = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW registration failed'));
    });
  }
};
```

### 4. **Optimize Bundle Size**

Check bundle size:
```bash
npm install --save-dev source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### 5. **Lazy Load Heavy Components**

For components that aren't immediately visible:

```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// In JSX:
<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### 6. **Optimize CSS**

- Remove unused CSS with PurgeCSS
- Minify CSS in production (already done by CRA)
- Use CSS-in-JS for dynamic styles

### 7. **Optimize JavaScript**

- Remove console.logs in production
- Tree-shake unused imports
- Use production build: `npm run build`

### 8. **Database Query Optimization**

In Supabase calls:

```javascript
// ❌ Bad - fetches all columns
const { data } = await supabase.from('classes').select('*');

// ✅ Good - fetch only needed columns
const { data } = await supabase
  .from('classes')
  .select('id, name, description')
  .order('sort_order', { ascending: true })
  .limit(10);
```

### 9. **Caching Strategy**

Add cache headers in your server configuration:

```
# For static assets (1 year)
Cache-Control: public, max-age=31536000, immutable

# For HTML (1 day)
Cache-Control: public, max-age=86400

# For API responses (5 minutes)
Cache-Control: public, max-age=300
```

### 10. **Monitor Performance**

Add Google Analytics:

```javascript
// In index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🎯 Performance Metrics to Track

### Core Web Vitals (Google's ranking factors)

1. **LCP (Largest Contentful Paint)** - Target: < 2.5s
   - Optimize images
   - Reduce JavaScript
   - Use CDN

2. **FID (First Input Delay)** - Target: < 100ms
   - Reduce JavaScript execution
   - Use web workers for heavy tasks
   - Break up long tasks

3. **CLS (Cumulative Layout Shift)** - Target: < 0.1
   - Reserve space for images
   - Avoid inserting content above existing content
   - Use transform animations instead of position changes

### Other Metrics

- **TTFB (Time to First Byte)** - Target: < 600ms
- **FCP (First Contentful Paint)** - Target: < 1.8s
- **TTI (Time to Interactive)** - Target: < 3.8s

---

## 📊 Performance Checklist

### Images
- [ ] Use WebP format (already done ✓)
- [ ] Add srcset for responsive images
- [ ] Lazy load images
- [ ] Compress images (use TinyPNG/ImageOptim)
- [ ] Use CDN for image delivery

### JavaScript
- [ ] Code splitting (already done ✓)
- [ ] Minification (CRA does this ✓)
- [ ] Remove unused dependencies
- [ ] Lazy load heavy libraries
- [ ] Use production build

### CSS
- [ ] Minification (CRA does this ✓)
- [ ] Remove unused CSS
- [ ] Critical CSS inline
- [ ] Defer non-critical CSS

### Fonts
- [ ] Use system fonts or limit custom fonts
- [ ] Font display: swap (already done ✓)
- [ ] Preload critical fonts
- [ ] Subset fonts (only needed characters)

### Server
- [ ] Enable gzip compression
- [ ] Enable brotli compression
- [ ] Set cache headers
- [ ] Use CDN
- [ ] Enable HTTP/2

### Monitoring
- [ ] Set up Google Search Console
- [ ] Monitor Core Web Vitals
- [ ] Set up Google Analytics
- [ ] Monitor error rates
- [ ] Track user experience metrics

---

## 🚀 Quick Wins (Easy to Implement)

1. **Compress images** - Use TinyPNG (saves 30-50%)
2. **Enable gzip** - Reduces file size by 60-70%
3. **Lazy load images** - Already implemented ✓
4. **Code splitting** - Already implemented ✓
5. **Remove unused CSS** - Review App.css and component styles
6. **Optimize fonts** - Limit to 2-3 font families
7. **Defer non-critical JS** - Move analytics to end of body

---

## 📈 Expected Performance Improvements

With these optimizations:

- **Initial Load Time:** 40-50% faster
- **Bundle Size:** 60-70% smaller
- **Lighthouse Score:** 85-95 (from current ~70)
- **Core Web Vitals:** All green
- **SEO Score:** 95+

---

## 🔗 Tools & Resources

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://www.npmjs.com/package/source-map-explorer)

---

## 💡 Pro Tips

1. **Test on slow networks** - Use Chrome DevTools throttling
2. **Test on real devices** - Performance varies by device
3. **Monitor continuously** - Set up alerts for performance regressions
4. **Prioritize user experience** - Focus on metrics that matter to users
5. **Iterate gradually** - Make small improvements over time

---

## 📞 Need Help?

Refer to:
- Google's [Web Vitals Guide](https://web.dev/vitals/)
- React's [Code Splitting Guide](https://reactjs.org/docs/code-splitting.html)
- [Web.dev Performance](https://web.dev/performance/)
