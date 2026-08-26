# 🎮 Unity Game Developer Portfolio (GitHub Pages Ready)

A modern, high-performance, single-page interactive portfolio website designed specifically for **Unity Game Developers**, **C# Gameplay Engineers**, and **Technical Artists**.

---

## ✨ Key Features & Highlights

- **⚡ Modern Game Engine HUD Aesthetic**: Custom dark theme with cyan & purple neon glows, glassmorphism UI cards, floating engine stats, and smooth animations.
- **🌌 Interactive Background Particle Grid**: Real-time canvas particle system that reacts to cursor movements.
- **🚀 Playable Browser Arcade Mini-Game**: Built-in 2D space shooter canvas sandbox with Web Audio API sci-fi sound synthesis, particle explosion VFX, and high-score tracking!
- **🔊 Web Audio API SFX**: Synthesized futuristic sound effects on button hovers & clicks with a top-bar mute toggle.
- **🎮 Filterable Project Showcase**: Category filterable grid (`All`, `3D Action`, `Arcade & Racing`, `Shaders & Tech Art`) with deep-dive technical project modal cards.
- **📊 Technical Skill Matrix**: Animated proficiency bars covering C# Architecture, URP/HDRP Shaders, Physics, Addressables, and Editor Extensions.
- **⏳ Career & Shipped Titles Timeline**: Interactive career roadmap detailing studio experience and published games on Steam / Itch.io.
- **📱 100% Mobile Responsive & GitHub Pages Ready**: Fully responsive layout without any external frameworks or complex build pipelines.

---

## 🚀 How to Publish to GitHub Pages

Publishing your portfolio on GitHub Pages takes less than 2 minutes:

### Option 1: Personal User Site (`https://<your-username>.github.io`)
1. Create a new public repository on GitHub named **`<your-username>.github.io`**.
2. Initialize Git and commit your files in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Unity portfolio"
   git branch -M main
   git remote add origin https://github.com/omerakcali/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. GitHub Pages will automatically publish your site live at `https://<your-username>.github.io`!

### Option 2: Repository Site (`https://<your-username>.github.io/portfolio`)
1. Create a repository named `portfolio` (or any name you prefer).
2. Push your files to the `main` branch.
3. Go to **Settings** -> **Pages** in your GitHub repository.
4. Under **Source**, select **Deploy from a branch** and choose `main` / `(root)`.
5. Click **Save**.

---

## 🛠️ How to Customize Your Content

### 1. Update Personal Info & Bio
Open `index.html` and search for:
- Developer Name: Replace `Omer Akcali` with your name.
- Status Badge: Update availability or current focus.
- Hero Text & Bio: Update your summary, years of experience, and tags.

### 2. Update Social & Game Links
In `index.html` (under `.social-quick-bar` and `#contact`), replace the default links:
- **GitHub**: Link to your `github.com/username`
- **Itch.io**: Link to your `username.itch.io`
- **ArtStation / LinkedIn / YouTube**

### 3. Add or Edit Game Projects
- **Images**: Add your game screenshots to `assets/images/`
- **Project Cards**: Modify the project cards in `index.html` under `#projects`.
- **Deep Dive Modals**: Open `script.js` and edit the `projectDetails` object to update technical specs, C# architecture highlights, and links for each game!

### 4. Upload Your Resume
Place your `resume.pdf` file into the root folder (`E:\github-portfolio\resume.pdf`) and update the link inside `index.html` or `script.js`.

---

## 💻 Running Locally

Simply open `index.html` in any web browser, or serve it using Python/Node:

```bash
# Using Python 3
python -m http.server 8000

# Using Node npx http-server
npx http-server .
```
Then visit `http://localhost:8000`.

---

© 2026 Crafted for Unity Developers. Free to use and customize!
