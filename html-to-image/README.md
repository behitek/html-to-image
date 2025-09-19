# HTML to Image Converter Web App

A modern, responsive web application that converts HTML content to images using the [html-to-image](https://github.com/bubkoo/html-to-image) library. Features an intuitive three-column layout with live preview, advanced watermarking, and professional image export capabilities.

## ✨ Features

### 🖼️ **Core Functionality**
- **Multiple Export Formats**: PNG, JPEG, and SVG support with format-specific optimizations
- **Live Preview**: Real-time preview of your HTML content with instant updates
- **Professional Output**: High-quality image generation with customizable settings
- **Batch Processing**: Convert multiple variations quickly with different settings

### 🎨 **Advanced Watermarking**
- **Image Watermarks**: Add custom watermark images to your generated images
- **Smart Positioning**: Automatic bottom-right placement with intelligent sizing
- **Opacity Control**: Adjustable transparency from 10% to 100%
- **CORS Handling**: Advanced cross-origin image loading with multiple fallback strategies
- **Default Integration**: Pre-configured with luyencode.net logo for instant testing

### ⚙️ **Customization Options**
- **Background Colors**: Full color picker for custom background selection
- **Quality Control**: JPEG compression quality settings (10% - 100%)
- **Resolution Settings**: Pixel ratio options (1x, 2x, 3x) for different output resolutions
- **Custom Dimensions**: Optional width specification for precise sizing
- **Cache Management**: Cache busting option for external resource handling

### 🎯 **User Experience**
- **Responsive Design**: Optimized three-column layout that adapts to all screen sizes
- **Fixed Height Layout**: Consistent column heights with intelligent scrolling
- **Smart Controls**: Scrollable options panel with always-visible convert button
- **Interactive Tooltips**: Comprehensive help system with detailed explanations
- **Loading States**: Professional loading animations and progress indicators

### 🚀 **Performance & Reliability**
- **Debounced Updates**: Optimized preview rendering (500ms delay) for smooth performance
- **Error Handling**: Comprehensive error detection with user-friendly messages
- **CORS Detection**: Automatic protocol detection with helpful troubleshooting guidance
- **Memory Management**: Efficient DOM element cleanup and resource management
- **Cross-Browser Support**: Works in all modern browsers with fallback handling

### 💾 **Export & Sharing**
- **One-Click Download**: Instant file downloads with proper naming conventions
- **Clipboard Integration**: Direct copy-to-clipboard support for PNG/JPEG formats
- **Format-Specific Features**: SVG text copying, JPEG quality preservation
- **Auto-Scrolling**: Automatic navigation to generated images

## 🚀 Quick Start

### Method 1: Local Server (Recommended)
To avoid CORS issues and ensure full functionality, including watermark features:

**Windows:**
1. Double-click `start-server.bat`
2. The app will open automatically in your browser at `http://localhost:8000`

**Mac/Linux:**
1. Run `./start-server.sh` in terminal
2. Or manually: `python3 server.py`

**Manual Server Commands:**
```bash
# With uv (fastest, recommended if you have it)
uv run server.py

# With standard Python
python3 server.py
# or
python server.py
```

### Method 2: Direct File Access
You can also open `index.html` directly in your browser, but some features (especially watermarks) may not work due to CORS restrictions.

## 📖 Usage Guide

### Basic Usage
1. **Launch Application**: Use one of the methods above
2. **Enter HTML Content**: Type or paste your HTML code in the left editor panel
3. **Live Preview**: Watch your content render in real-time in the center preview panel
4. **Configure Settings**: Adjust options in the right controls panel
5. **Generate Image**: Click the "🚀 Convert" button
6. **Download/Copy**: Use the output controls to save or copy your image

### Advanced Watermarking
1. **Enable Watermarks**: Check the "Add Watermark" option in the controls panel
2. **Configure URL**: Use the pre-loaded luyencode.net logo or enter your own image URL
3. **Adjust Opacity**: Set transparency level using the opacity slider (default: 50%)
4. **Generate**: Convert your HTML with the watermark automatically applied
5. **CORS Tips**: For best results, use CORS-enabled hosts like imgur.com or github.com

### Export Options
- **PNG**: Lossless format, perfect for graphics with transparency and watermarks
- **JPEG**: Compressed format with quality control, ideal for photos and complex designs
- **SVG**: Vector format, scalable and perfect for simple graphics (watermarks not supported)

### Configuration Options
- **Background Color**: Set custom background colors for transparent areas
- **Quality Control**: Fine-tune JPEG compression (higher = better quality, larger files)
- **Resolution**: Choose pixel ratios for different output resolutions (1x standard, 2x retina, 3x ultra-high)
- **Custom Width**: Force specific pixel widths for consistent sizing
- **Cache Busting**: Enable for external resources that might be cached

## 🛠️ Technical Architecture

### Frontend Stack
- **Framework**: Vanilla JavaScript (ES6+) with modern async/await patterns
- **UI Library**: Bootstrap 5.3.2 with custom CSS enhancements
- **Image Processing**: html-to-image v1.11.13 library via CDN
- **Browser APIs**: Canvas API, Clipboard API, File API integration

### Layout Design
- **Three-Column Layout**: HTML editor, controls, and live preview
- **Fixed Height System**: Viewport-based height (70vh) with intelligent scrolling
- **Responsive Breakpoints**: Mobile-optimized layout below 768px
- **Modern Styling**: Gradient backgrounds, glass-morphism effects, custom scrollbars

### Advanced Features
- **CORS Handling**: Multiple loading strategies for cross-origin images
- **Canvas Security**: Tainted canvas detection and user-friendly error messages
- **Memory Management**: Automatic cleanup of temporary DOM elements
- **Performance Optimization**: Debounced updates and efficient DOM queries

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Blank Images
**Symptoms**: Generated images appear empty or white
**Solutions**:
1. **Use Local Server**: Most common cause is CORS restrictions
2. **Check Browser Console**: Press F12 to see detailed error messages
3. **Test Sample Content**: Use the "Load Sample" button to verify functionality
4. **Verify HTML**: Ensure your HTML content is valid and renders properly

#### Watermark Problems
**Symptoms**: Watermark fails to load or causes errors
**Solutions**:
1. **CORS-Friendly Hosting**: Use imgur.com, github.com, or similar services
2. **Check URL Validity**: Ensure the image URL is publicly accessible
3. **Try Different Formats**: PNG and JPEG work best for watermarks
4. **Local Hosting**: Host watermark images on the same domain when possible

#### Performance Issues
**Symptoms**: Slow conversion or browser freezing
**Solutions**:
1. **Reduce Content Size**: Very large HTML may cause memory issues
2. **Lower Pixel Ratio**: Use 1x instead of 2x/3x for faster processing
3. **Optimize Images**: Compress external images referenced in your HTML
4. **Close Other Tabs**: Free up browser memory for processing

#### Layout Problems
**Symptoms**: Columns don't display correctly or content overflows
**Solutions**:
1. **Modern Browser**: Ensure you're using a current browser version
2. **Viewport Size**: Minimum 1024px width recommended for desktop layout
3. **Zoom Level**: Reset browser zoom to 100% for optimal display
4. **Clear Cache**: Refresh the page or clear browser cache

### Browser Compatibility
**Supported**: All modern browsers including:
- Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- Mobile browsers on iOS 13+ and Android 8+

**Required Features**:
- HTML5 Canvas and SVG support
- ES6+ JavaScript (classes, async/await, arrow functions)
- CSS Grid and Flexbox
- Clipboard API (for copy functionality)

**Not Supported**: Internet Explorer (any version)

## 📁 File Structure

```
lcoj-tools/
├── index.html              # Main application UI with three-column layout
├── style.css               # Modern CSS with responsive design and animations
├── script.js               # Core application logic with HTMLToImageConverter class
├── server.py               # Python HTTP server with CORS support
├── start-server.bat        # Windows server launcher with fallback options
├── start-server.sh         # Unix/Linux server launcher
├── AGENTS.md               # AI agent development guidelines
└── README.md               # This comprehensive documentation
```

## 🎨 Sample Content

The application includes a beautiful demonstration template featuring:
- **Gradient Backgrounds**: Modern CSS gradients with professional color schemes
- **Typography Showcase**: Various font sizes, weights, and styles
- **Interactive Elements**: Buttons, badges, and styled components
- **Responsive Design**: Mobile-friendly layouts and flexible containers
- **Color Coding**: Status indicators and semantic color usage

## 🔍 Advanced Usage

### Custom Styling Tips
- Use inline styles for best compatibility across different rendering contexts
- Avoid external font dependencies that might not load during conversion
- Test with various pixel ratios to ensure crisp output at different resolutions
- Consider background colors for transparent elements

### Performance Optimization
- Minimize external resource dependencies
- Use data URLs for small images when possible
- Keep HTML content under 10MB for optimal performance
- Enable cache busting only when necessary

### Watermark Best Practices
- Use PNG format for watermarks with transparency
- Keep watermark images under 500KB for fast loading
- Test watermark visibility at different opacities
- Consider watermark contrast against your content background

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
- Use the browser console to capture error messages
- Include your operating system and browser version
- Provide sample HTML content that reproduces the issue
- Describe expected vs. actual behavior

### Feature Requests
- Explain the use case and benefits
- Consider backward compatibility
- Suggest implementation approaches
- Check existing issues to avoid duplicates

### Code Contributions
- Follow the existing code style and patterns
- Test across different browsers and screen sizes
- Update documentation for new features
- Ensure responsive design principles are maintained

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute according to the license terms.

## 🙏 Credits

### Core Dependencies
- **[html-to-image](https://github.com/bubkoo/html-to-image)** by bubkoo and contributors - The powerful library that makes HTML to image conversion possible
- **[Bootstrap 5.3.2](https://getbootstrap.com/)** - Responsive UI framework for modern web design

### Special Thanks
- **luyencode.net** - For providing the default watermark logo and inspiration
- **Open Source Community** - For the tools and libraries that make this project possible
- **Contributors** - Everyone who has helped improve and enhance this application

---

**Built with ❤️ for the developer community. Convert your HTML to beautiful images with ease!**