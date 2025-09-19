# LCOJ Tools

A comprehensive collection of web development utilities designed to boost productivity and streamline common tasks. Each tool is crafted with modern web technologies and focuses on user experience, performance, and reliability.

## 🚀 Available Tools

### 1. HTML to Image Converter ✅
**Location**: `/html-to-image/`

Convert HTML content into high-quality PNG, JPEG, and SVG images with advanced features:

- **Real-time Preview**: Live HTML rendering as you type
- **Multiple Export Formats**: PNG, JPEG, and SVG support
- **Advanced Watermarking**: Custom watermark images with opacity control
- **Professional Output**: High-resolution images with customizable settings
- **Responsive Design**: Three-column layout optimized for all screen sizes
- **Clipboard Integration**: One-click copy to clipboard functionality

[📖 Full Documentation](html-to-image/README.md) | [🚀 Launch Tool](html-to-image/)

---

### 2. Code Formatter 🔄 *Coming Soon*
Format and beautify code with support for multiple programming languages.

**Planned Features**:
- Multi-language support (JavaScript, Python, CSS, HTML, etc.)
- Syntax highlighting with themes
- Custom formatting rules and preferences
- Batch processing capabilities
- Integration with popular style guides

---

### 3. Color Palette Generator 🎨 *Coming Soon*
Generate beautiful, accessible color palettes for your projects.

**Planned Features**:
- Multiple generation algorithms (complementary, triadic, etc.)
- Accessibility checker with WCAG compliance
- Export to various formats (CSS, JSON, Adobe, Sketch)
- Save and manage favorite palettes
- Color harmony analysis

---

### 4. Image Optimizer 📸 *Coming Soon*
Compress and optimize images while maintaining quality.

**Planned Features**:
- Lossless and lossy compression options
- Batch processing for multiple images
- Format conversion (PNG, JPEG, WebP, AVIF)
- Before/after size comparison
- Progressive JPEG support

---

### 5. QR Code Generator 📱 *Coming Soon*
Create customizable QR codes for various data types.

**Planned Features**:
- Custom styling with colors and patterns
- Logo embedding capabilities
- Multiple data types (URL, text, WiFi, vCard)
- High-resolution export options
- Batch generation from CSV/JSON

---

### 6. URL Shortener 🔗 *Coming Soon*
Create short, memorable URLs with analytics tracking.

**Planned Features**:
- Custom short URL generation
- Click analytics and tracking
- QR code generation for URLs
- Bulk URL shortening
- Expiration date settings

## 🏃‍♂️ Quick Start

1. **Clone or Download** this repository
2. **Open** `index.html` in your web browser
3. **Browse** available tools from the homepage
4. **Launch** any tool by clicking "Open Tool"

### For HTML to Image Converter:
For full functionality (especially watermarking), run the local server:

**Windows**: Double-click `html-to-image/start-server.bat`  
**Mac/Linux**: Run `./html-to-image/start-server.sh`

## 🛠️ Technology Stack

### Frontend
- **Framework**: Vanilla JavaScript (ES6+)
- **UI Library**: Bootstrap 5.3.2
- **Icons**: Font Awesome 6.4.0
- **Styling**: Modern CSS with custom properties and gradients

### Backend (Tool-Specific)
- **Server**: Python HTTP server with CORS support
- **Protocol**: HTTP/HTTPS with cross-origin handling

### Browser Support
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS 13+, Android 8+
- **Required Features**: ES6+, Canvas API, modern CSS

## 📁 Project Structure

```
lcoj-tools/
├── index.html                    # Main homepage showcasing all tools
├── README.md                     # This file - project overview
│
├── html-to-image/               # HTML to Image Converter
│   ├── index.html              # Tool interface
│   ├── script.js               # Core functionality
│   ├── style.css               # Tool-specific styles
│   ├── server.py               # Local development server
│   ├── start-server.bat        # Windows launcher
│   ├── start-server.sh         # Unix/Linux launcher
│   ├── AGENTS.md               # AI development guidelines
│   └── README.md               # Detailed tool documentation
│
└── [future-tools]/             # Additional tools will be added here
```

## 🎨 Design Philosophy

### User Experience First
- **Intuitive Interfaces**: Clean, modern designs that are easy to navigate
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Performance**: Fast loading times and smooth interactions
- **Accessibility**: WCAG compliant with keyboard navigation support

### Developer Friendly
- **Clean Code**: Well-documented, maintainable codebase
- **Modern Standards**: ES6+, semantic HTML, and modern CSS
- **No Build Process**: Direct browser compatibility without compilation
- **Extensible**: Easy to add new tools and features

### Professional Quality
- **Robust Error Handling**: Comprehensive error detection and user feedback
- **Cross-Browser Compatibility**: Tested across major browsers
- **Security Conscious**: Safe handling of user data and external resources
- **Performance Optimized**: Efficient algorithms and resource management

## 🤝 Contributing

We welcome contributions to expand the LCOJ Tools collection!

### Adding New Tools
1. **Create Folder**: Add a new directory for your tool
2. **Follow Structure**: Use the `html-to-image` folder as a template
3. **Update Homepage**: Add your tool card to the main `index.html`
4. **Documentation**: Include comprehensive README and usage instructions

### Improving Existing Tools
1. **Fork Repository**: Create your own copy
2. **Make Changes**: Implement improvements or bug fixes
3. **Test Thoroughly**: Ensure cross-browser compatibility
4. **Submit Pull Request**: Include detailed description of changes

### Reporting Issues
- **Use Browser Console**: Capture error messages and logs
- **Include Environment**: OS, browser version, and tool being used
- **Provide Examples**: Sample content or steps to reproduce
- **Describe Impact**: Expected vs. actual behavior

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute according to the license terms.

## 🙏 Acknowledgments

### Core Technologies
- **[html-to-image](https://github.com/bubkoo/html-to-image)** - HTML to image conversion library
- **[Bootstrap](https://getbootstrap.com/)** - Responsive UI framework
- **[Font Awesome](https://fontawesome.com/)** - Icon library

### Community
- **Open Source Contributors** - For the tools and libraries that make this possible
- **Developer Community** - For feedback, suggestions, and contributions
- **Early Adopters** - For testing and helping improve the tools

---

**🚀 Ready to boost your productivity? Start with any tool above and experience the difference!**

*Built with ❤️ for developers, by developers.*