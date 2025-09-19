class HTMLToImageConverter {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.loadSampleHTML();
        this.currentImageData = null;
        this.currentFilename = 'converted-image';
    }

    initializeElements() {
        // Editor elements
        this.htmlEditor = document.getElementById('htmlEditor');
        this.previewContent = document.getElementById('previewContent');
        this.imageOutput = document.getElementById('imageOutput');
        
        // Control elements
        this.loadSampleBtn = document.getElementById('loadSample');
        this.clearEditorBtn = document.getElementById('clearEditor');
        this.refreshPreviewBtn = document.getElementById('refreshPreview');
        
        // Convert button and format selector
        this.convertBtn = document.getElementById('convertButton');
        this.formatSelect = document.getElementById('formatSelect');
        
        // Option controls
        this.backgroundColorInput = document.getElementById('backgroundColor');
        this.qualityInput = document.getElementById('quality');
        this.qualityValue = document.getElementById('qualityValue');
        this.pixelRatioSelect = document.getElementById('pixelRatio');
        this.outputWidthInput = document.getElementById('outputWidth');
        this.cacheBustCheckbox = document.getElementById('cacheBust');
        
        // Watermark controls
        this.watermarkEnabledCheckbox = document.getElementById('watermarkEnabled');
        this.watermarkOptions = document.getElementById('watermarkOptions');
        this.watermarkUrlInput = document.getElementById('watermarkUrl');
        this.watermarkOpacityInput = document.getElementById('watermarkOpacity');
        this.watermarkOpacityValue = document.getElementById('watermarkOpacityValue');
        
        // Output controls
        this.downloadBtn = document.getElementById('downloadImage');
        this.copyBtn = document.getElementById('copyToClipboard');
        
        // Loading overlay
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }

    attachEventListeners() {
        // Editor controls
        this.loadSampleBtn.addEventListener('click', () => this.loadSampleHTML());
        this.clearEditorBtn.addEventListener('click', () => this.clearEditor());
        this.refreshPreviewBtn.addEventListener('click', () => this.updatePreview());
        
        // Convert button
        this.convertBtn.addEventListener('click', () => {
            const selectedFormat = this.formatSelect.value;
            this.exportImage(selectedFormat);
        });
        
        // Output controls
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        
        // Real-time preview update
        this.htmlEditor.addEventListener('input', this.debounce(() => this.updatePreview(), 500));
        
        // Quality slider update
        this.qualityInput.addEventListener('input', (e) => {
            this.qualityValue.textContent = Math.round(e.target.value * 100) + '%';
        });

        // Watermark controls
        this.watermarkEnabledCheckbox.addEventListener('change', (e) => {
            this.toggleWatermarkOptions(e.target.checked);
        });
        
        this.watermarkOpacityInput.addEventListener('input', (e) => {
            this.watermarkOpacityValue.textContent = Math.round(e.target.value * 100) + '%';
        });

        // Initialize Bootstrap tooltips
        this.initializeTooltips();
    }

    loadSampleHTML() {
        const sampleHTML = `<div style="padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white; font-family: Arial, sans-serif; text-align: center; max-width: 500px;">
    <h1 style="margin: 0 0 20px 0; font-size: 2.5rem;">🎨 Sample Design</h1>
    <p style="margin: 0 0 30px 0; font-size: 1.2rem; opacity: 0.9;">This is a beautiful sample HTML content that demonstrates the converter's capabilities.</p>
    
    <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #fff;">✨ Features</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="padding: 5px 0;">📱 Responsive Design</li>
            <li style="padding: 5px 0;">🎯 High Quality Output</li>
            <li style="padding: 5px 0;">⚡ Fast Conversion</li>
        </ul>
    </div>
    
    <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
        <div style="background: #28a745; padding: 10px 20px; border-radius: 20px; font-weight: bold;">Success</div>
        <div style="background: #ffc107; color: #333; padding: 10px 20px; border-radius: 20px; font-weight: bold;">Warning</div>
        <div style="background: #dc3545; padding: 10px 20px; border-radius: 20px; font-weight: bold;">Error</div>
    </div>
</div>`;
        
        this.htmlEditor.value = sampleHTML;
        this.updatePreview();
    }

    clearEditor() {
        this.htmlEditor.value = '';
        this.previewContent.innerHTML = '';
        this.resetOutput();
    }

    updatePreview() {
        const htmlContent = this.htmlEditor.value.trim();
        if (htmlContent) {
            this.previewContent.innerHTML = htmlContent;
        } else {
            this.previewContent.innerHTML = '<p style="color: #6c757d; text-align: center; padding: 20px;">Enter HTML content to see preview</p>';
        }
    }

    toggleWatermarkOptions(enabled) {
        this.watermarkOptions.style.display = enabled ? 'block' : 'none';
    }

    validateWatermarkUrl(url) {
        if (!url || !url.trim()) {
            return { valid: false, message: 'Watermark URL is required when watermark is enabled' };
        }

        try {
            const urlObj = new URL(url);
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return { valid: false, message: 'Watermark URL must use HTTP or HTTPS protocol' };
            }
            
            // Check if it looks like an image URL
            const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg'];
            const hasImageExtension = imageExtensions.some(ext => 
                urlObj.pathname.toLowerCase().endsWith(ext)
            );
            
            if (!hasImageExtension) {
                return { valid: true, message: 'Warning: URL doesn\'t appear to be an image file' };
            }
            
            return { valid: true, message: '' };
        } catch (error) {
            return { valid: false, message: 'Invalid URL format' };
        }
    }

    async exportImage(format) {
        const htmlContent = this.htmlEditor.value.trim();
        if (!htmlContent) {
            this.showNotification('Please enter some HTML content first!', 'error');
            return;
        }

        // Validate watermark URL if watermark is enabled
        if (this.watermarkEnabledCheckbox.checked) {
            const validation = this.validateWatermarkUrl(this.watermarkUrlInput.value.trim());
            if (!validation.valid) {
                this.showNotification(validation.message, 'error');
                return;
            } else if (validation.message) {
                this.showNotification(validation.message, 'warning');
            }
        }

        // Check if running from file:// protocol
        if (window.location.protocol === 'file:') {
            this.showNotification('⚠️ Running from file:// may cause issues. Please use a local server (see README for setup instructions)', 'warning');
        }

        this.showLoading(true);
        this.currentFormat = format;

        try {
            const options = this.getConversionOptions();
            console.log('Conversion options:', options);
            
            // Try using the preview element directly first (it's already rendered and visible)
            let targetElement = this.previewContent;
            let usePreview = true;
            
            console.log('Preview element dimensions:', targetElement.offsetWidth, 'x', targetElement.offsetHeight);
            console.log('Preview element content:', targetElement.innerHTML.substring(0, 200) + '...');
            
            // Always create a temporary element for conversion to ensure full content capture
            console.log('Creating temporary element for full content capture...');
            usePreview = false;
            
            // Create a temporary element for conversion
            targetElement = document.createElement('div');
            targetElement.innerHTML = htmlContent;
            
            // Make sure the element is visible and has proper dimensions for full content
            Object.assign(targetElement.style, {
                position: 'fixed',
                left: '0px',
                top: '0px',
                zIndex: '-1000',
                visibility: 'visible',
                opacity: '1',
                width: 'auto',
                height: 'auto',
                maxWidth: 'none',
                maxHeight: 'none',
                display: 'block',
                pointerEvents: 'none',
                padding: '20px',
                minWidth: '200px',
                minHeight: '100px',
                backgroundColor: options.backgroundColor || '#ffffff',
                // Ensure fonts and styles are applied
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.4',
                color: '#333',
                // Allow content to expand naturally
                overflow: 'visible',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
            });
            
            document.body.appendChild(targetElement);

            // Wait for styles to apply and content to render
            await new Promise(resolve => setTimeout(resolve, 300));
            
            console.log('Temp element dimensions:', targetElement.offsetWidth, 'x', targetElement.offsetHeight);
            
            // Apply custom width if specified
            const customWidth = this.outputWidthInput.value;
            if (customWidth && customWidth > 0) {
                targetElement.style.width = customWidth + 'px';
                targetElement.style.minWidth = customWidth + 'px';
                await new Promise(resolve => setTimeout(resolve, 100));
                console.log('Applied custom width:', customWidth + 'px');
            } else if (targetElement.offsetWidth < 400) {
                // If content is still too narrow and no custom width, force a minimum width
                targetElement.style.minWidth = '600px';
                await new Promise(resolve => setTimeout(resolve, 100));
                console.log('Applied minimum width: 600px');
            }
            
            console.log('Final element dimensions:', targetElement.offsetWidth, 'x', targetElement.offsetHeight);

            let dataUrl;

            switch (format) {
                case 'png':
                    dataUrl = await htmlToImage.toPng(targetElement, options);
                    this.currentFilename = 'converted-image.png';
                    break;
                case 'jpeg':
                    dataUrl = await htmlToImage.toJpeg(targetElement, {
                        ...options,
                        quality: parseFloat(this.qualityInput.value)
                    });
                    this.currentFilename = 'converted-image.jpg';
                    break;
                case 'svg':
                    dataUrl = await htmlToImage.toSvg(targetElement, options);
                    this.currentFilename = 'converted-image.svg';
                    break;
            }

            console.log('Generated dataUrl length:', dataUrl ? dataUrl.length : 'null');
            console.log('DataUrl preview:', dataUrl ? dataUrl.substring(0, 100) + '...' : 'null');

            // Clean up temporary element if we created one
            if (!usePreview && targetElement.parentNode) {
                document.body.removeChild(targetElement);
            }

            if (!dataUrl || dataUrl.length < 100) {
                throw new Error('Generated image is empty or invalid');
            }

            // Apply watermark if enabled
            if (this.watermarkEnabledCheckbox.checked && this.watermarkUrlInput.value.trim()) {
                console.log('Applying watermark...');
                dataUrl = await this.applyWatermark(dataUrl, format);
            }

            this.displayImage(dataUrl);
            this.currentImageData = dataUrl;
            this.enableOutputControls();
            this.showNotification(`Successfully converted to ${format.toUpperCase()}!`, 'success');
            
            // Auto-scroll to the generated image
            this.scrollToImage();

        } catch (error) {
            console.error('Conversion error:', error);
            let errorMessage = `Failed to convert to ${format.toUpperCase()}: ${error.message}`;
            
            if (window.location.protocol === 'file:') {
                errorMessage += '\n\n💡 Try running with a local server instead of opening the file directly.';
            }
            
            this.showNotification(errorMessage, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    getConversionOptions() {
        const options = {
            backgroundColor: this.backgroundColorInput.value,
            pixelRatio: parseInt(this.pixelRatioSelect.value),
            cacheBust: this.cacheBustCheckbox.checked,
            useCORS: true,
            allowTaint: false,
            style: {
                transform: 'scale(1)',
                transformOrigin: 'top left',
                boxSizing: 'border-box',
                maxWidth: 'none',
                maxHeight: 'none',
                overflow: 'visible'
            },
            // Let the element determine its natural dimensions
            width: undefined,
            height: undefined,
            // Ensure we capture the full content
            skipAutoScale: false
        };
        
        console.log('Final conversion options:', options);
        return options;
    }

    async loadWatermarkImage(watermarkUrl) {
        const strategies = [
            // Strategy 1: Try with CORS anonymous first (most likely to work without tainting)
            () => this.loadImageWithStrategy(watermarkUrl, true, false),
            
            // Strategy 2: Try with CORS and cache busting
            () => this.loadImageWithStrategy(watermarkUrl + '?t=' + Date.now(), true, false),
            
            // Strategy 3: Try using a CORS proxy (for public images)
            () => this.loadImageWithStrategy(`https://cors-anywhere.herokuapp.com/${watermarkUrl}`, true, true),
            
            // Strategy 4: Try another CORS proxy
            () => this.loadImageWithStrategy(`https://api.allorigins.win/raw?url=${encodeURIComponent(watermarkUrl)}`, true, true),
            
            // Strategy 5: Last resort - try without CORS (will likely taint canvas)
            () => this.loadImageWithStrategy(watermarkUrl, false, false)
        ];

        let lastError;
        let loadedImage;
        let isTainted = false;
        
        for (let i = 0; i < strategies.length; i++) {
            try {
                console.log(`Trying watermark loading strategy ${i + 1}...`);
                const img = await strategies[i]();
                console.log(`Strategy ${i + 1} succeeded!`);
                
                // Test if this strategy would taint the canvas
                if (i === 4) { // Last strategy (no CORS)
                    isTainted = true;
                    console.log('Warning: This image will taint the canvas');
                }
                
                loadedImage = img;
                loadedImage._isTainted = isTainted;
                return loadedImage;
            } catch (error) {
                console.log(`Strategy ${i + 1} failed:`, error.message);
                lastError = error;
                
                // Don't try proxy strategies if we're running locally
                if (i >= 1 && window.location.protocol === 'file:') {
                    break;
                }
            }
        }
        
        // If all strategies failed, throw a comprehensive error
        throw new Error(`Failed to load watermark image from ${watermarkUrl}. This could be due to:
• CORS restrictions (the server doesn't allow cross-origin requests)
• Invalid or broken image URL
• Network connectivity issues

Suggestions:
• Use an image from a CORS-enabled server (like imgur.com, github.com, or your own server)
• Host the watermark image locally and serve it from the same domain
• Use a different image URL that supports cross-origin requests

Last error: ${lastError?.message || 'Unknown error'}`);
    }

    async loadImageWithStrategy(url, useCORS, isProxy) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            const timeout = setTimeout(() => {
                reject(new Error(`Timeout loading image${isProxy ? ' via proxy' : ''}`));
            }, isProxy ? 10000 : 5000); // Longer timeout for proxy requests
            
            img.onload = () => {
                clearTimeout(timeout);
                resolve(img);
            };
            
            img.onerror = (error) => {
                clearTimeout(timeout);
                reject(new Error(`Failed to load image${isProxy ? ' via proxy' : ''}: ${error.message || 'Unknown error'}`));
            };
            
            if (useCORS) {
                img.crossOrigin = 'anonymous';
            }
            
            img.src = url;
        });
    }

    async handleTaintedCanvas(canvas, format) {
        // Canvas is tainted - we cannot export it due to browser security restrictions
        // Provide a helpful error message with solutions
        throw new Error(`❌ Canvas Security Restriction

The watermark image from a different domain cannot be exported due to browser security policies (CORS). This happens when the watermark image doesn't allow cross-origin access.

🔧 Solutions:
• Upload your watermark to imgur.com, github.com, or another CORS-enabled service
• Host the watermark image on the same domain as this app
• Use a different watermark image that supports cross-origin requests
• Disable the watermark for this conversion

🔍 Technical Details:
The canvas becomes "tainted" when it contains cross-origin images without proper CORS headers, making it impossible to export for security reasons.

💡 Quick Fix:
Try uploading your watermark image to https://imgur.com and use that URL instead.`);
    }

    isCanvasTainted(canvas) {
        try {
            // Try to read a single pixel to test if canvas is tainted
            const ctx = canvas.getContext('2d');
            ctx.getImageData(0, 0, 1, 1);
            return false; // Canvas is not tainted
        } catch (error) {
            if (error.name === 'SecurityError' || error.message.includes('tainted')) {
                return true; // Canvas is tainted
            }
            return false; // Other error, assume not tainted
        }
    }

    async applyWatermark(originalDataUrl, format) {
        try {
            const watermarkUrl = this.watermarkUrlInput.value.trim();
            const opacity = parseFloat(this.watermarkOpacityInput.value);
            
            // Validate watermark URL
            if (!watermarkUrl) {
                throw new Error('Watermark URL is required');
            }

            // For SVG format, we can't apply watermark using canvas, skip it
            if (format === 'svg') {
                console.log('Watermark not supported for SVG format');
                this.showNotification('Watermark is not supported for SVG format', 'warning');
                return originalDataUrl;
            }

            // Create a canvas to combine the original image with watermark
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Load the original image
            const originalImg = new Image();
            originalImg.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
                originalImg.onload = resolve;
                originalImg.onerror = () => reject(new Error('Failed to load original image'));
                originalImg.src = originalDataUrl;
            });

            // Set canvas dimensions to match original image
            canvas.width = originalImg.width;
            canvas.height = originalImg.height;

            // Draw the original image
            ctx.drawImage(originalImg, 0, 0);

            // Load the watermark image with multiple fallback strategies
            const watermarkImg = await this.loadWatermarkImage(watermarkUrl);
            
            // Warn user if image might taint the canvas
            if (watermarkImg._isTainted) {
                console.warn('Watermark image may taint the canvas, attempting conversion anyway...');
            }

            // Calculate watermark dimensions (max 25% of image width/height)
            const maxWatermarkWidth = canvas.width * 0.25;
            const maxWatermarkHeight = canvas.height * 0.25;
            
            let watermarkWidth = watermarkImg.width;
            let watermarkHeight = watermarkImg.height;
            
            // Scale down if watermark is too large
            if (watermarkWidth > maxWatermarkWidth || watermarkHeight > maxWatermarkHeight) {
                const scale = Math.min(maxWatermarkWidth / watermarkWidth, maxWatermarkHeight / watermarkHeight);
                watermarkWidth *= scale;
                watermarkHeight *= scale;
            }

            // Position watermark at bottom-right with 20px padding
            const padding = 20;
            const watermarkX = canvas.width - watermarkWidth - padding;
            const watermarkY = canvas.height - watermarkHeight - padding;

            // Apply opacity and draw watermark
            ctx.globalAlpha = opacity;
            ctx.drawImage(watermarkImg, watermarkX, watermarkY, watermarkWidth, watermarkHeight);
            ctx.globalAlpha = 1.0; // Reset opacity

            // Test if canvas is tainted before trying to export
            if (this.isCanvasTainted(canvas)) {
                console.error('Canvas is tainted, cannot export');
                throw new Error(`❌ Canvas Security Restriction

The watermark image from "${watermarkUrl}" cannot be exported due to browser security policies (CORS).

🔧 Solutions:
• Upload your watermark to imgur.com, github.com, or another CORS-enabled service
• Host the watermark image on the same domain as this app
• Use a different watermark image that supports cross-origin requests
• Disable the watermark for this conversion

💡 Quick Fix: Try uploading your image to https://imgur.com and use that URL instead.`);
            }

            // Convert canvas back to data URL
            const quality = format === 'jpeg' ? parseFloat(this.qualityInput.value) : undefined;
            const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
            
            return canvas.toDataURL(mimeType, quality);

        } catch (error) {
            console.error('Watermark error:', error);
            this.showNotification(`Watermark failed: ${error.message}`, 'error');
            return originalDataUrl; // Return original image if watermark fails
        }
    }

    displayImage(dataUrl) {
        const img = document.createElement('img');
        img.src = dataUrl;
        img.alt = 'Generated Image';
        img.className = 'img-fluid';
        img.style.maxHeight = '500px';
        img.style.borderRadius = '8px';
        img.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';

        this.imageOutput.innerHTML = '';
        this.imageOutput.appendChild(img);
        
        // Update the container styling to center the image
        this.imageOutput.style.display = 'flex';
        this.imageOutput.style.alignItems = 'center';
        this.imageOutput.style.justifyContent = 'center';
        this.imageOutput.style.minHeight = '200px';
    }

    downloadImage() {
        if (!this.currentImageData) return;

        const link = document.createElement('a');
        link.download = this.currentFilename;
        link.href = this.currentImageData;
        link.click();
    }

    async copyToClipboard() {
        if (!this.currentImageData) return;

        try {
            if (this.currentFormat === 'svg') {
                // For SVG, copy as text
                const svgText = atob(this.currentImageData.split(',')[1]);
                await navigator.clipboard.writeText(svgText);
                this.showNotification('SVG copied to clipboard as text!', 'success');
            } else {
                // For PNG/JPEG, copy as image
                const response = await fetch(this.currentImageData);
                const blob = await response.blob();
                await navigator.clipboard.write([
                    new ClipboardItem({ [blob.type]: blob })
                ]);
                this.showNotification('Image copied to clipboard!', 'success');
            }
        } catch (error) {
            console.error('Copy error:', error);
            this.showNotification('Failed to copy to clipboard. Your browser may not support this feature.', 'error');
        }
    }

    enableOutputControls() {
        this.downloadBtn.disabled = false;
        this.copyBtn.disabled = false;
    }

    resetOutput() {
        this.imageOutput.innerHTML = `
            <div class="text-muted">
                <i class="display-4">🖼️</i>
                <p class="mt-2 mb-1">Generated image will appear here</p>
                <small>Select a format and click to generate</small>
            </div>
        `;
        this.downloadBtn.disabled = true;
        this.copyBtn.disabled = true;
        this.currentImageData = null;
    }

    showLoading(show) {
        this.loadingOverlay.style.display = show ? 'flex' : 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message.replace(/\n/g, '<br>');
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1001',
            maxWidth: '400px',
            wordWrap: 'break-word',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            lineHeight: '1.4',
            fontSize: '14px'
        });

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // For warning type, use darker text
        if (type === 'warning') {
            notification.style.color = '#333';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after longer time for error/warning messages
        const duration = (type === 'error' || type === 'warning') ? 5000 : 3000;
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }


    initializeTooltips() {
        // Initialize Bootstrap tooltips for all elements with data-bs-toggle="tooltip"
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    scrollToImage() {
        // Wait a moment for the image to be displayed, then scroll to it
        setTimeout(() => {
            const outputSection = document.querySelector('.row.mt-4');
            if (outputSection) {
                outputSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 300);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HTMLToImageConverter();
});

// Add some utility functions for enhanced functionality
window.HTMLToImageConverter = HTMLToImageConverter;
