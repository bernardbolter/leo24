/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    webpack(config, options) {
        config.module.rules.push({
        test: /\.mp3$/,
            use: {
                loader: "url-loader",
            },
        });
        return config;
    },
};

export default nextConfig;
