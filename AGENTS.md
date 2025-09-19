# AGENTS.md - AI Agent Guidelines for lcoj-tools

## Project Overview

**lcoj-tools** is a modern HTML to Image Converter web application that allows users to convert HTML content into PNG, JPEG, and SVG images. The application features a responsive design with real-time preview, customizable export options, and clipboard integration.

## Architecture & Technology Stack

### Frontend
- **Framework**: Vanilla JavaScript (ES6+) with Bootstrap 5.3.2
- **Main Library**: html-to-image v1.11.13 (via CDN)
- **UI Components**: Bootstrap components with custom CSS styling
- **Browser APIs**: Canvas API, Clipboard API, File API

### Backend
- **Server**: Simple Python HTTP server (referenced in scripts but file missing)
- **Protocol**: HTTP with CORS handling for local development

### File Structure
```
lcoj-tools/
├── index.html          # Main UI with Bootstrap layout
├── script.js           # Core application logic (HTMLToImageConverter class)
├── style.css           # Custom styling with gradients and responsive design
├── start-server.bat    # Windows server launcher
├── start-server.sh     # Unix/Linux server launcher
└── README.md           # User documentation
```

## Core Components

### HTMLToImageConverter Class (script.js)
**Location**: `script.js` (lines 1-447)

**Key Methods**:
- `exportImage(format)` - Main conversion logic for PNG/JPEG/SVG
- `getConversionOptions()` - Builds options object for html-to-image library
- `updatePreview()` - Real-time HTML preview rendering
- `displayImage(dataUrl)` - Shows generated image in output section
- `showNotification(message, type)` - User feedback system

**Important Features**:
- Debounced preview updates (500ms delay)
- Temporary DOM element creation for conversion
- CORS detection and warnings
- Clipboard integration with format-specific handling
- Auto-scrolling to generated images

### UI Components (index.html)

**Layout Structure**:
- 3-column responsive layout (HTML editor, controls, preview)
- Bootstrap cards with custom styling
- Loading overlay with spinner animation
- Tooltip integration for option explanations

**Key Elements**:
- `#htmlEditor` - Textarea for HTML input
- `#previewContent` - Live preview container
- `#imageOutput` - Generated image display area
- `#formatSelect` - PNG/JPEG/SVG format selector
- Option controls for background, quality, pixel ratio, etc.

## Agent Guidelines

### When Working with Conversion Logic

1. **Image Generation Issues**:
   - Always check for CORS problems (file:// protocol detection)
   - Verify temporary DOM element creation and cleanup
   - Ensure proper styling application before conversion
   - Test with different pixel ratios and custom widths

2. **Option Handling**:
   - Background color affects transparent areas
   - Quality only applies to JPEG format
   - Pixel ratio impacts both quality and file size
   - Cache busting prevents external resource issues

### When Modifying UI

1. **Responsive Design**:
   - Maintain Bootstrap grid system
   - Preserve equal-height card layout
   - Test mobile responsiveness (breakpoint: 768px)
   - Keep scrollable preview container

2. **User Experience**:
   - Maintain debounced preview updates
   - Preserve notification system with proper timing
   - Keep tooltip explanations for technical options
   - Ensure loading states during conversion

### When Debugging

1. **Common Issues**:
   - Blank images → Usually CORS or missing server
   - Slow conversion → Check pixel ratio and image size
   - Preview not updating → Verify event listeners
   - Download failures → Check dataUrl generation

2. **Console Logging**:
   - Conversion options are logged before processing
   - Element dimensions logged during conversion
   - DataUrl length and preview logged after generation
   - Error details logged with context

### File Dependencies

1. **Missing Server File**:
   - `server.py` is referenced in start scripts but missing from project
   - Agents should create a simple Python HTTP server if needed
   - Must handle CORS headers for proper functionality

2. **External Dependencies**:
   - html-to-image library (CDN-loaded, version pinned)
   - Bootstrap CSS/JS (CDN-loaded, version 5.3.2)
   - No package.json or dependency management

## Code Patterns & Conventions

### JavaScript Style
- ES6 class-based architecture
- Arrow functions for event handlers
- Async/await for image generation
- Debouncing for performance optimization
- Error handling with user-friendly messages

### CSS Architecture
- Custom properties with CSS variables
- Gradient backgrounds and modern effects
- Responsive design with media queries
- Custom scrollbar styling
- Hover animations with transforms

### HTML Structure
- Semantic HTML5 elements
- Bootstrap utility classes
- Data attributes for tooltips
- Accessible form controls
- Progressive enhancement approach

## Testing Considerations

### Browser Compatibility
- Modern browsers with Canvas/SVG support
- ES6+ JavaScript features required
- Clipboard API may not work in all browsers
- File:// protocol limitations in some browsers

### Performance Factors
- Large HTML content may cause memory issues
- High pixel ratios increase processing time
- External images affected by CORS policies
- Preview updates are debounced for performance

## Common Agent Tasks

1. **Adding New Export Formats**:
   - Extend `exportImage()` method with new case
   - Add option to `#formatSelect` dropdown
   - Update filename generation logic
   - Test with various HTML content types

2. **Improving Error Handling**:
   - Enhance CORS detection and messaging
   - Add validation for HTML content
   - Implement retry mechanisms
   - Improve user feedback for edge cases

3. **UI Enhancements**:
   - Maintain Bootstrap component structure
   - Preserve responsive design principles
   - Keep accessibility features intact
   - Test across different screen sizes

4. **Performance Optimization**:
   - Optimize preview rendering
   - Reduce memory usage during conversion
   - Implement progressive loading for large content
   - Cache frequently used DOM queries

## Security Considerations

- HTML content is rendered in isolated preview container
- No server-side processing of user input
- External resources subject to CORS policies
- Clipboard API requires HTTPS in production
- No user data persistence or storage

---

*This document should be updated when significant changes are made to the codebase architecture or core functionality.*
