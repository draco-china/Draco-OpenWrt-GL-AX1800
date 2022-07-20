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
    name: name.trim(),
    uri: uri.trim(),
    branch: branch.trim(),
    revision: revision.trim(),
  };
}

/**
 * 生成编译配置文件
 */
const GenerateYml = (workflows) => {
  try {
    exec(`npm install js-yaml`);
    const yaml = require('js-yaml');

    const glInfraBuilder = path.resolve(process.cwd(), 'gl-infra-builder')
    exec(`git clone --depth=1 https://github.com/gl-inet/gl-infra-builder -b main ${glInfraBuilder}`);

    // 序列化配置文件
    const keys = ['profile', 'target', 'subtarget', 'description', 'image', 'feeds', 'include', 'packages', 'diffconfig'];
    const sortKeys = (a, b) => {
      const index = keys.indexOf(a);
      return index - keys.indexOf(b);
    }
    // 生成 feeds 配置
    const feeds = require('./feeds').map(item => GenerateFeedsConfig(item.name, item.uri, item.branch));

    // 生成 packages 配置
    const package = require('./packages');
    const packages = package.map(item => item.name.trim());
    const packagesDesc = package.map((item, index) => `${index + 1}. ${item.desc.trim()}`);

    workflows.forEach(workflow => {
      // 读取官方配置文件
      let profilesYml = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/${workflow.target}.yml`, 'utf8'));
      // 获取 include 列表
      const include = profilesYml.include;
      if(include.length > 0) {
        profilesYml.include = [];
        include.forEach(include => {
          // 读取 include 配置文件
          const includeYml = yaml.load(fs.readFileSync(`${glInfraBuilder}/profiles/${include}.yml`, 'utf8'));
          // 合并 include 配置文件
          profilesYml = deepmerge(profilesYml, includeYml);
        });

      }
      // 合并 feeds 配置
      profilesYml = deepmerge(profilesYml, { feeds });
      // 合并 packages 配置
      profilesYml = deepmerge(profilesYml, { packages });

      // 转换为 YAML 格式
      const yamlStr = yaml.dump(profilesYml, { lineWidth: -1, sortKeys });
      // 配置文件路径
      const build = (workflow.build || `glinet-${workflow.model}`);
      const profilesPath = path.resolve(process.cwd(), `${build}.yml`);
      // 写入配置文件
      fs.writeFileSync(profilesPath, `---\n${yamlStr}`);

      // 生成 workflow 配置
      const workflowName = workflow.name || `build-glinet-${workflow.model}`;
      // 读取 workflow 模板
      let template = fs.readFileSync(path.resolve(__dirname, 'workflow.tpl'), 'utf8');
      // 替换模板中的变量
      template = template.replace(/\$\{name\}/g, workflowName.toUpperCase().replace(/-/g, ' '));
      template = template.replace(/\$\{workflowName\}/g, workflowName);
      template = template.replace(/\$\{build\}/g, build);
      template = template.replace(/\$\{model\}/g, workflow.model);
      template = template.replace(/\$\{config\}/g, workflow.config);
      template = template.replace(/\$\{modelUpper\}/g, workflow.model.toUpperCase());
      template = template.replace(/\$\{releaseTitle\}/g, `## 📦‍ 固件下载 | ${workflowName.replace('build-', '').toUpperCase().replace(/-/g, ' ')}`);
      template = template.replace(/\$\{releasePackages\}/g, JSON.stringify([
        `## ✨ 主要功能`,
        ...packagesDesc
      ].join('\n')));
      template = template.replace(/\$\{length\}/g, workflows.length);
      // 写入workflow
      const workflowsPath = path.resolve(process.cwd(), '.github/workflows', `${workflowName}.yml`);
      fs.writeFileSync(workflowsPath, template)
    })
  } catch (error) {
    throw error;
  } finally {
     // 清理文件
     exec(`rm -rf gl-infra-builder`);
     exec(`rm -rf node_modules`);
     exec(`rm -rf package-lock.json`);
     exec(`rm -rf package.json`);
  }
}

const workflows = require('./workflows');

GenerateYml(workflows);