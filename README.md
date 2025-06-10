# PROTO-zips-schm-admin

A responsive HTML/CSS/JS demo of an admin area for managing schematics.

## Features

- **Search**: Search schematics by name, model, or editor
- **Sort**: Sort by most recent, name, or needs attention status
- **Filter**: Filter by model (Jerr-Dan, Century Steel Carrier, Miller Industries)
- **Views**: Toggle between table and grid view
- **Add/Edit/Delete**: Manage schematics with modal forms
- **Pagination**: Navigate through results
- **Responsive**: Works on desktop, tablet, and mobile

## Getting Started

Simply open `index.html` in your web browser, or serve it via a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Then open http://localhost:8000
```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and flexbox/grid
- **JavaScript**: Vanilla JS for functionality
- **Icons**: Feather Icons (via CDN)

## Data Structure

Each schematic includes:
- Name
- Image URL
- Image Size
- Associated Models (array)
- Part Count
- Needs Attention (boolean)
- Last Edited By
- Last Edited Date

## Design

- Clean white background theme
- Red primary color (#dc3545)
- Gray secondary color (#6c757d)
- Button classes: primary, secondary, tertiary
- Fully responsive design