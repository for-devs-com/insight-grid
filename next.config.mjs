/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
	typescript: {
		ignoreBuildErrors: true,
	},


};

export default nextConfig;
