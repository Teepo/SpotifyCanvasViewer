export async function loadScript(src, options = {}) {
    
    return new Promise((resolve, reject) => {
        
        const script = document.createElement('script');

        script.setAttribute('src', src);

        options.id && script.setAttribute('id', options.id);

        script.async = true

        document.body.appendChild(script);

        script.onload = resolve;
        script.onerror = reject;
    })
};

export async function loadCSS(href) {
    return new Promise((resolve, reject) => {
        
        const link = document.createElement('link');
        
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', href);
        
        document.head.appendChild(link);

        link.onload = resolve;
        link.onerror = reject;
    })
};
