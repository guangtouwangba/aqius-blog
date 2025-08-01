import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
  // 确保配置文件被包含在构建中
  webpack: (config, { isServer }) => {
    // 复制config.yaml到构建输出
    if (isServer) {
      config.module.rules.push({
        test: /config\.yaml$/,
        type: 'asset/resource',
        generator: {
          filename: 'config.yaml'
        }
      })
    }
    return config
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig);
