const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const model = process.argv[process.argv.length - 1];


/**
 * 生成 feeds 配置
 * @param {*} name
 * @param {*} uri
 * @param {*} branch
 * @returns
 */
 const GenerateFeedsConfig = (name, uri, branch) => {
  exec(`git clone --depth=1 ${uri} -b ${branch} ${name}`);
  const revision = exec(`cd ${name} && git log -1 --pretty=%H`).toString().trim();
  exec(`cd ..`);
  exec(`rm -rf ${name}`);
  const config = `  - name: ${name}
    uri: ${uri}
    revision: ${revision}`;
  return config;
}

/**
 * 生成 feeds 配置文件
 */
const GenerateYml = () => {
  // 读取 feeds 配置文件
  const feedsPath = path.resolve(process.cwd(), 'scripts', 'feeds.json')
  const feeds = require(feedsPath);
  // 生成 feeds 配置
  const config = feeds.map(item => GenerateFeedsConfig(item.name, item.uri, item.branch)).join('\n');
  // 读取 packages 配置文件
  const packagesPath = path.resolve(process.cwd(), 'scripts', 'packages.yml')
  const packages = fs.readFileSync(packagesPath, 'utf8');
  // 生成配置文件路径
  const filePath = path.resolve(process.cwd(), `glinet-${model}.yml`);
  // 写入配置文件
  fs.writeFileSync(filePath, `---
profile: glinet_${model}
description: Build image for the GL.iNET ${model.toLocaleUpperCase()}
image: bin/targets/ipq807x/ipq60xx/openwrt-ipq807x-glinet_${model}-squashfs-sysupgrade.tar
feeds:
${config}

include:
  - target_wlan_ap-gl-${model}-common-5-4

${packages}`);
}

GenerateYml();