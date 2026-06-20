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

## Motivations

Current analytics solutions (e.g. GTM or Google Analytics) are more than analytics tools. They're also often synonymous with tracking and invasion of privacy.

Semantic Log Analysis is valuable, and analytics can help with providing better coverage. Achieving that without compromising into data selling/broking is the goal.

In Semantic Log Analysis, we don't care if you like X, despise Y, or have visited Z before. All we want to know, is how you're using the website and how that can help us improve it.

What does `ethical-web-analytics` bring to the table for that? Simple: [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). We simply store a session ID (it's a UUID completely independant of the machine and user), and attach it to events we monitor (for instance, when you change pages). The session changes? So does the session ID.

What does this allow us to do? We don't track a user across the web, we track exactly what we want: this specific session. You arrive on the website, you do your thing how you manage to do them, and we analyze that and only that. If tomorrow you do the same thing, you won't have the same session ID. If you change browsers, you won't have the same session ID. If you close the tabs and open new ones, you won't have the same session ID (given that `sessionStorage` respects its API of course).

You're not overly analyzed, tied to groups of interests, tied to cohorts, etc. : We just want to know how the website is used and if that makes sense or is optimal enough for you.

You get all the benefits of analytics for website optimizations, and none of the invasive and intrusive parts of data broking.

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
