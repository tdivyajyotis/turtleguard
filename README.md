# TurtleGuard website

Production-ready static website for [turtleguard.in](https://turtleguard.in), built with semantic HTML, responsive CSS, and vanilla JavaScript. There is no framework, package manager, backend, or build step.

## What is included

- Responsive landing page with the original TurtleGuard logo
- Project abstract and explainable monitoring workflow
- Field-work and prototype photo deck
- Research paper and synopsis PDF downloads
- Team profiles and verified public links
- Contact section for `contact@turtleguard.in`
- SEO metadata, Open Graph image, JSON-LD, sitemap, and robots file
- Repository-ready wrapper for branch-based GitHub Pages

## Push to GitHub

Create an empty GitHub repository, then run these commands from this folder:

```bash
git init
git branch -M main
git add .
git commit -m "Launch TurtleGuard website"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

In the GitHub repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and `/(root)`, then click **Save**.

## Connect turtleguard.in

1. In **Settings → Pages → Custom domain**, enter `turtleguard.in` and save it before changing DNS.
2. In Cloudflare DNS, replace the current apex web records with these four `A` records for `@`:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

3. Add `www` as a `CNAME` pointing to `YOUR-USERNAME.github.io`.
4. Keep GitHub's domain-verification TXT record if you add one.
5. When GitHub finishes issuing the certificate, enable **Enforce HTTPS**.

The included `CNAME` file records the intended domain for branch-based GitHub Pages publishing. GitHub's Custom domain setting remains the authoritative configuration.

## Local preview

From this folder, run:

```bash
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Important launch note

The address `contact@turtleguard.in` is displayed as requested. Configure an email provider and the domain's MX/SPF/DKIM records separately before relying on that inbox for public enquiries.
