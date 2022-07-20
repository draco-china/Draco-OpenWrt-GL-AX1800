# GL-AX1800 & GL-AXT1800 固件

[![固件更新](https://img.shields.io/badge/dynamic/json?style=flat-square&label=固件更新&query=0.published_at&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fdraco-china%2FDraco-OpenWrt-GL-AX1800%2Freleases)](https://github.com/Draco-china/Draco-OpenWrt-GL-AX1800/actions)
[![仓库地址](https://img.shields.io/badge/仓库地址-点我-brightgreen?style=flat-square)](https://github.com/draco-china/Draco-OpenWrt-GL-AX1800)
[![固件下载](https://img.shields.io/badge/固件下载-点我-brightgreen?style=flat-square)](https://github.com/draco-china/Draco-OpenWrt-GL-AX1800/releases)
[![界面预览](https://img.shields.io/badge/界面预览-点我-brightgreen?style=flat-square)](#界面预览)
[![QQ群](https://img.shields.io/badge/QQ群-303121713-brightgreen?style=flat-square)](https://jq.qq.com/?_wv=1027&k=JVYytZpL)

![主要功能](https://img.shields.io/badge/主要功能:-blueviolet.svg?style=flat-square) ![OpenClash](https://img.shields.io/badge/-OpenClash-blue.svg?style=flat-square) ![AdGuard_Home](https://img.shields.io/badge/-AdGuard_Home-blue.svg?style=flat-square) ![Samba](https://img.shields.io/badge/-Samba-blue.svg?style=flat-square) ![CIFSD](https://img.shields.io/badge/-CIFSD-blue.svg?style=flat-square) ![FTP](https://img.shields.io/badge/-FTP-blue.svg?style=flat-square) ![SFTP](https://img.shields.io/badge/-SFTP-blue.svg?style=flat-square) ![DLNA](https://img.shields.io/badge/-DLNA-blue.svg?style=flat-square) ![Aria2](https://img.shields.io/badge/-Aria2-blue.svg?style=flat-square) ![Transmission](https://img.shields.io/badge/-Transmission-blue.svg?style=flat-square) ![解锁网易云灰色歌曲](https://img.shields.io/badge/-解锁网易云灰色歌曲-blue.svg?style=flat-square) ![UPnP](https://img.shields.io/badge/-UPnP-blue.svg?style=flat-square) ![京东签到服务](https://img.shields.io/badge/-京东签到服务-blue.svg?style=flat-square) ![IPv6_加速](https://img.shields.io/badge/-IPv6_加速-blue.svg?style=flat-square) ![BBR_加速](https://img.shields.io/badge/-BBR_加速-blue.svg?style=flat-square) ![FullCone_NAT_加速](https://img.shields.io/badge/-FullCone_NAT_加速-blue.svg?style=flat-square) ![HWNAT_加速](https://img.shields.io/badge/-SFE_加速-blue.svg?style=flat-square) ![HWNAT_加速](https://img.shields.io/badge/-HWNAT_加速-blue.svg?style=flat-square) ![桥接加速](https://img.shields.io/badge/-桥接加速-blue.svg?style=flat-square) ![DDNS](https://img.shields.io/badge/-DDNS-blue.svg?style=flat-square) ![Docker_容器](https://img.shields.io/badge/-Docker_容器-blue.svg?style=flat-square) ![Frpc_NPS_内网穿透](https://img.shields.io/badge/-Frpc_NPS_内网穿透-blue.svg?style=flat-square) ![多线多拨](https://img.shields.io/badge/-多线多拨-blue.svg?style=flat-square) ![负载均衡](https://img.shields.io/badge/-负载均衡-blue.svg?style=flat-square) ![SQM_Qos](https://img.shields.io/badge/-SQM_Qos-blue.svg?style=flat-square) ![文件助手](https://img.shields.io/badge/-文件助手-blue.svg?style=flat-square) ![文件浏览器](https://img.shields.io/badge/-文件浏览器-blue.svg?style=flat-square) ![可道云](https://img.shields.io/badge/-可道云-blue.svg?style=flat-square) ![Rclone](https://img.shields.io/badge/-Rclone-blue.svg?style=flat-square) ![SmartDNS](https://img.shields.io/badge/-SmartDNS-blue.svg?style=flat-square) ![网络唤醒](https://img.shields.io/badge/-网络唤醒-blue.svg?style=flat-square) ![TTYD_终端](https://img.shields.io/badge/-TTYD_终端-blue.svg?style=flat-square) ![迅雷快鸟](https://img.shields.io/badge/-迅雷快鸟-blue.svg?style=flat-square) ![USB_打印服务器](https://img.shields.io/badge/-USB_打印服务器-blue.svg?style=flat-square) ![KMS_服务器](https://img.shields.io/badge/-KMS_服务器-blue.svg?style=flat-square) ![微信推送](https://img.shields.io/badge/-微信推送-blue.svg?style=flat-square) ![上网时间控制](https://img.shields.io/badge/-上网时间控制-blue.svg?style=flat-square) ![WatchCat](https://img.shields.io/badge/-WatchCat-blue.svg?style=flat-square) ![各种驱动](https://img.shields.io/badge/-各种驱动-blue.svg?style=flat-square) ![DNS_Filter](https://img.shields.io/badge/-DNS_Filter-blue.svg?style=flat-square) ![持续更新中……](https://img.shields.io/badge/-持续更新中……-blue.svg?style=flat-square)

## 目录介绍

```tree
Draco-OpenWrt-GL-AX1800
├── .github/workflows
│   ├── build-glnet-ax1800.yml    云编译 AX1800
│   ├── build-glnet-axt1800.yml   云编译 AXT1800
│   ├── generate-config.yml       云生成 `glinet-ax1800.yml` & `glinet-ax1800.yml`
├── scripts
│   ├── build.sh                  本地编译脚本，必须在项目根目录下执行 `./scripts/build.sh`
│   ├── feeds.js                  feeds 第三方仓库地址配置
│   ├── generate.js               云生成 `glinet-ax1800.yml` & `glinet-ax1800.yml` 脚本(每天11点定时执行，代码提交也会自动执行)
│   ├── packages.js               packages 第三方软件包配置
│   ├── workflow.tpl              actions 模板文件
│   ├── workflows.js              生成设备所需的设备的工作流（actions）, 支持官方所有支持的型号
├── glinet-ax1800.yml             AX1800 编译描述文件
├── glinet-axt1800.yml            AXT1800 编译描述文件
└── README.md
```

## 其他说明

- *基于官方编译器 <https://github.com/gl-inet/gl-infra-builder> 构建, 支持官方界面*
- *通过  `openwrt-ipq807x-glinet_ax1800-squashfs-sysupgrade.tar` 升级*
- *进入`uboot`，选择 `openwrt-ipq807x-glinet_ax1800-squashfs-nand-factory.img` 文件升级*
- 部分 `feeds` & `packages` 已经注释移除，可自行 `fork` 编译定制
- 北京时间每天 `0:00` 定时检测 `官方更新` `feeds`  `packages` 更新, 如果上游更新将自动重新编译最新固件，`Release` 中只保留最新版本
- **不需要(`定时/监听`)执行的可以将对应的工作流 `schedule/push` 删除或者注释, 编译固件的 `Actions` 请到 `scripts/workflow.tpl` 下修改**
- 历史版本在 `Actions` 中选择一个已经运行完成且成功的 `workflow` 在页面底部可以看到 `Annotations` 和 `Artifacts`
- `Annotations` 中的网盘失效时间一般是 1-3 天, `Artifacts` 需要登录 Github 才能下载
- `Actions` 运行需要设置 `Actions Secrets`, 查看[配置令牌](#配置令牌)

## 配置令牌

- 创建 [Personal access token(PAT)](https://github.com/settings/tokens/new) ，勾选repo权限，这将用于自动触发编译工作流程。
- ![](./preview/WX20220711-202547%402x.png)
- 然后点击自己仓库的Settings选项卡，再点击Secrets。添加名为 DEPLOY_KEY 的加密环境变量，保存刚刚创建的 PAT 。
- ![](./preview/WX20220711-202739%402x.png)
- 在 Actions 页面选择 GENERATE CONFIG ，点击Run workflow手动进行一次测试运行。如果没有报错且 OpenWrt 编译工作流程被触发，则代表测试通过。

## 界面预览

![](./preview/WX20220712-093843@2x.png)
![](./preview/WX20220712-093936@2x.png)
![](./preview/WX20220712-093945@2x.png)
![](./preview/WX20220712-093955@2x.png)
![](./preview/WX20220712-094004@2x.png)
![](./preview/WX20220712-094014@2x.png)

## Credits

- [Microsoft Azure](https://azure.microsoft.com)
- [GitHub Actions](https://github.com/features/actions)
- [OpenWrt](https://github.com/openwrt/openwrt)
- [Lean's OpenWrt](https://github.com/coolsnowwolf/lede)
- [tmate](https://github.com/tmate-io/tmate)
- [mxschmitt/action-tmate](https://github.com/mxschmitt/action-tmate)
- [csexton/debugger-action](https://github.com/csexton/debugger-action)
- [Cowtransfer](https://cowtransfer.com)
- [WeTransfer](https://wetransfer.com/)
- [Mikubill/transfer](https://github.com/Mikubill/transfer)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
- [ActionsRML/delete-workflow-runs](https://github.com/ActionsRML/delete-workflow-runs)
- [dev-drprasad/delete-older-releases](https://github.com/dev-drprasad/delete-older-releases)
- [peter-evans/repository-dispatch](https://github.com/peter-evans/repository-dispatch)
- [P3TERX/Actions-OpenWrt](https://github.com/P3TERX/Actions-OpenWrt)
- [gl-inet/gl-infra-builder](https://github.com/gl-inet/gl-infra-builder)
- [JiaY-shi/build-gl](https://github.com/JiaY-shi/build-gl.inet)

## License

[MIT](https://github.com/P3TERX/Actions-OpenWrt/blob/main/LICENSE) © [**P3TERX**](https://p3terx.com)
