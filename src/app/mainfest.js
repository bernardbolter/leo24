export default function manifest() {
    return {
        name: 'leonhardlaupichler.com',
        short_name: "leo",
        description: "Leonhard Laupichler Portfolio",
        start_url: '/',
        display: 'standalone',
        background_color: '#212121',
        theme_color: '#ffffff',
        icons: [
            {
                "src": "/images/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/images/icon-512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
        ],
    }
}