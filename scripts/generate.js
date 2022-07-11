const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

/**
 * 合并对象 不改变原对象
 * @param {*} target
 * @param {*} source
 * @returns
 */
 function deepmerge(target, source) {
  if (!target) return source;
  // deep clone
  const newObj = Object.assign({}, target, source);
  Object.keys(source).forEach((key) => {
    const type = Object.prototype.toString.call(source[key]);
    if (type === '[object Array]') {
      newObj[key] = [...new Set([ ...(target[key] || []), ...source[key]])];
    } else if (type === '[object Object]') {
      newObj[key] = deepmerge(target[key], source[key]);
    } else {
      newObj[key] = target[key] || source[key];
    }
  });
  return newObj;
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

    // 读取官方公共配置
    const ax1800ConfigCommon = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/${ax1800Config.include[0]}.yml`, 'utf8'));
    const axt1800ConfigCommon = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/${axt1800Config.include[0]}.yml`, 'utf8'));

    // 移除 include 字段
    ax1800Config.include = [];
    axt1800Config.include = [];

    // 合并官方配置
    let ax1800ConfigMerge = deepmerge(ax1800Config, ax1800ConfigCommon);
    let axt1800ConfigMerge = deepmerge(axt1800Config, axt1800ConfigCommon);

    // 读取 feeds 配置文件
    const feedsPath = path.resolve(process.cwd(), 'scripts', 'feeds.json')
    // 生成 feeds 配置
    const feeds = require(feedsPath)

    // 合并 feeds 配置
    ax1800ConfigMerge = deepmerge(ax1800ConfigMerge, {feeds});
    axt1800ConfigMerge = deepmerge(axt1800ConfigMerge, {feeds});

    // 读取 packages 配置文件
    const packagesPath = path.resolve(process.cwd(), 'scripts', 'packages.json')
    // 生成 packages 配置
    const packages = require(packagesPath).map(item => item.name);

    // 合并 packages 配置
    ax1800ConfigMerge = deepmerge(ax1800ConfigMerge, {packages});
    axt1800ConfigMerge = deepmerge(axt1800ConfigMerge, {packages});

    // 转换为 YAML
    const sortKeys = ['profile', 'target', 'subtarget', 'description', 'image', 'feeds', 'include', 'packages', 'diffconfig'];
    const ax1800ConfigYml = yaml.dump(ax1800ConfigMerge, {
      lineWidth: -1,
      sortKeys: (a, b) => {
        const index = sortKeys.indexOf(a);
        return index - sortKeys.indexOf(b);
      }
    });
    const axt1800ConfigYml = yaml.dump(axt1800ConfigMerge, {
      lineWidth: -1,
      sortKeys: (a, b) => {
        const index = sortKeys.indexOf(a);
        return index - sortKeys.indexOf(b);
      }
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