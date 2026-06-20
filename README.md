# ethical-web-analytics

An ethical alternative to modern web analytics like Google Analytics/GTM

## Usage

```html
<!-- Must be the very first script in the <head> tag -->
<script>
    window.dataLayer = window.dataLayer || [];
    var bootScript = document.createElement("script");
    bootScript.onload = function() { window.bootEthicalWebAnalytics("https://my.domain.com/analytics") };
    Object.assign(bootScript, {
        "defer": "true",
        "fetchpriority": "low",
        "crossorigin": "anonymous",
        // "integrity": "",
        "src": "https://cdn.jsdelivr.net/npm/ethical-web-analytics@latest"
        //NOTE: prefer loading a specific version from a CDN  with its SRI
        // to avoid supply chain poisoning attacks
    });
</script>
```

```typescript
// Later in the code
window.dataLayer.push({
    event: "navigation",
    from: location.pathname,
    to: "/login",
});
```

## Development/Maintainers

Requirements:
- Git 
- Just
- NVM (or equivalent)

First clone the repository:
```bash
git clone git@github.com:Voltra/ethical-web-analytics.git
```

Then run the setup task:
```bash
just setup
```
