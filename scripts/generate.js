const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

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
  return {
    name,
    uri,
    revision
  };
}

/**
 * 生成编译配置文件
 */
const GenerateYml = () => {
  try {
    exec(`npm install js-yaml`);
    const yaml = require('js-yaml');
    exec(`npm install lodash`);
    const _ = require('lodash');

    const glInfraBuilder = path.resolve(process.cwd(), 'gl-infra-builder')
    exec(`git clone --depth=1 https://github.com/gl-inet/gl-infra-builder -b main ${glInfraBuilder}`);
    // 读取官方配置文件
    const ax1800Config = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/target_wlan_ap-gl-ax1800-5-4.yml`, 'utf8'));
    const axt1800Config = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/target_wlan_ap-gl-axt1800-5-4.yml`, 'utf8'));

    // 读取官方公共配置
    const ax1800ConfigCommon = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/${ax1800Config.include[0]}.yml`, 'utf8'));
    const axt1800ConfigCommon = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/${axt1800Config.include[0]}.yml`, 'utf8'));

    // 移除 include 字段
    ax1800Config.include = [];
    axt1800Config.include = [];

    // 合并官方配置
    ax1800Config.packages = ax1800Config.packages ? ax1800Config.packages.concat(ax1800ConfigCommon.packages) : ax1800ConfigCommon.packages;
    axt1800Config.packages = axt1800Config.packages ? axt1800Config.packages.concat(axt1800ConfigCommon.packages) : axt1800ConfigCommon.packages;
    ax1800ConfigCommon.packages = [];
    axt1800ConfigCommon.packages = [];
    const ax1800ConfigMerge = _.merge(ax1800Config, ax1800ConfigCommon);
    const axt1800ConfigMerge = _.merge(axt1800Config, axt1800ConfigCommon);

    // 读取 feeds 配置文件
    const feedsPath = path.resolve(process.cwd(), 'scripts', 'feeds.json')
    // 生成 feeds 配置
    const feeds = require(feedsPath).map(item => GenerateFeedsConfig(item.name, item.uri, item.branch));

    // 合并 feeds 配置
    ax1800ConfigMerge.feeds = ax1800ConfigMerge.feeds ? ax1800ConfigMerge.feeds.concat(feeds) :feeds;
    axt1800ConfigMerge.feeds= axt1800ConfigMerge.feeds ? axt1800ConfigMerge.feeds.concat(feeds) :feeds;

    // 读取 packages 配置文件
    const packagesPath = path.resolve(process.cwd(), 'scripts', 'packages.yml')
    const packagesConfig =  yaml.load(fs.readFileSync(packagesPath, 'utf8'));

    // 合并 packages 配置
    ax1800ConfigMerge.packages = ax1800ConfigMerge.packages ? ax1800ConfigMerge.packages.concat(packagesConfig.packages) :packagesConfig.packages;
    axt1800ConfigMerge.packages = axt1800ConfigMerge.packages ? axt1800ConfigMerge.packages.concat(packagesConfig.packages) :packagesConfig.packages;

    // 转换为 YAML
    const ax1800ConfigYml = yaml.dump(ax1800ConfigMerge, {
      lineWidth: -1,
      sortKeys: true
    });
    const axt1800ConfigYml = yaml.dump(axt1800ConfigMerge, {
      lineWidth: -1,
      sortKeys: true
    });

    // 生成配置文件路径
    const ax1800FilePath = path.resolve(process.cwd(), `glinet-ax1800.yml`);
    const axt1800FilePath = path.resolve(process.cwd(), `glinet-axt1800.yml`);

    // 写入配置文件
    fs.writeFileSync(ax1800FilePath, `---\n${ax1800ConfigYml}`);
    fs.writeFileSync(axt1800FilePath, `---\n${axt1800ConfigYml}`);
  } catch (error) {
    console.log(error);
  } finally {
     // 清理文件
     exec(`rm -rf gl-infra-builder`);
     exec(`rm -rf node_modules`);
     exec(`rm -rf package-lock.json`);
     exec(`rm -rf package.json`);
  }
}

GenerateYml();