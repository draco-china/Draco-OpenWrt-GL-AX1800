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

    const glInfraBuilder = path.resolve(process.cwd(), 'gl-infra-builder')
    exec(`git clone --depth=1 https://github.com/gl-inet/gl-infra-builder -b main ${glInfraBuilder}`);
    // 读取官方配置文件
    const ax1800Config = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/target_wlan_ap-gl-ax1800-5-4.yml`, 'utf8'));
    const axt1800Config = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/target_wlan_ap-gl-axt1800-5-4.yml`, 'utf8'));

    // 读取 feeds 配置文件
    const feedsPath = path.resolve(process.cwd(), 'scripts', 'feeds.json')
    // 生成 feeds 配置
    const feeds = require(feedsPath).map(item => GenerateFeedsConfig(item.name, item.uri, item.branch));

    // 合并 feeds 配置
    ax1800Config.feeds = ax1800Config.feeds ? ax1800Config.feeds.concat(packagesConfig.feeds) :feeds;
    axt1800Config.feeds= axt1800Config.feeds ? axt1800Config.feeds.concat(packagesConfig.feeds) :feeds;

    // 读取 packages 配置文件
    const packagesPath = path.resolve(process.cwd(), 'scripts', 'packages.yml')
    const packagesConfig =  yaml.load(fs.readFileSync(packagesPath, 'utf8'));

    // 合并 packages 配置
    ax1800Config.packages = ax1800Config.packages ? ax1800Config.packages.concat(packagesConfig.packages) :packagesConfig.packages;
    axt1800Config.packages = axt1800Config.packages ? axt1800Config.packages.concat(packagesConfig.packages) :packagesConfig.packages;

    // 转换为 YAML
    const ax1800ConfigYml = yaml.dump(ax1800Config, {
      lineWidth: -1
    });

    const axt1800ConfigYml = yaml.dump(axt1800Config, {
      lineWidth: -1
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