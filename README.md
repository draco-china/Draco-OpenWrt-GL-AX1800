
# GL-AX1800 固件

> 基于官方编译器 <https://github.com/gl-inet/gl-infra-builder> 构建, 支持官方界面

> 暂时只能通过  openwrt-ipq807x-glinet_ax1800-squashfs-sysupgrade.tar 升级

> 暂时不支持进入uboot，选择openwrt-ipq807x-glinet_ax1800-squashfs-nand-factory.img 文件升级，等待官方修复

> 不定时更新第三方软件源仓库，稳定后考虑使用 actions 自动更新

[![](https://img.shields.io/github/release-date/Draco-china/Draco-OpenWrt-GL-AX1800?label=%E5%9B%BA%E4%BB%B6%E6%9B%B4%E6%96%B0)](https://github.com/Draco-china/Draco-OpenWrt-GL-AX1800/actions)

![](https://img.shields.io/badge/-主要功能:-696969.svg) ![](https://img.shields.io/badge/-OpenClash-FFFFFF.svg) ![](https://img.shields.io/badge/-AdGuard_Home-FFFFFF.svg) ![](https://img.shields.io/badge/-Samba-FFFFFF.svg) ![](https://img.shields.io/badge/-CIFSD-FFFFFF.svg) ![](https://img.shields.io/badge/-FTP-FFFFFF.svg) ![](https://img.shields.io/badge/-SFTP-FFFFFF.svg) ![](https://img.shields.io/badge/-DLNA-FFFFFF.svg) ![](https://img.shields.io/badge/-Aria2-FFFFFF.svg) ![](https://img.shields.io/badge/-Transmission-FFFFFF.svg) ![](https://img.shields.io/badge/-解锁网易云灰色歌曲-FFFFFF.svg) ![](https://img.shields.io/badge/-UPnP-FFFFFF.svg) ![](https://img.shields.io/badge/-京东签到服务-FFFFFF.svg) ![](https://img.shields.io/badge/-IPv6_加速-FFFFFF.svg) ![](https://img.shields.io/badge/-BBR_加速-FFFFFF.svg) ![](https://img.shields.io/badge/-FullCone_NAT_加速-FFFFFF.svg) ![](https://img.shields.io/badge/-SFE_加速-FFFFFF.svg) ![](https://img.shields.io/badge/-HWNAT_加速-FFFFFF.svg) ![](https://img.shields.io/badge/-桥接加速-FFFFFF.svg) ![](https://img.shields.io/badge/-DDNS-FFFFFF.svg) ![](https://img.shields.io/badge/-Docker_容器-FFFFFF.svg) ![](https://img.shields.io/badge/-Frpc_NPS_内网穿透-FFFFFF.svg) ![](https://img.shields.io/badge/-多线多拨-FFFFFF.svg) ![](https://img.shields.io/badge/-负载均衡-FFFFFF.svg) ![](https://img.shields.io/badge/-SQM_Qos-FFFFFF.svg) ![](https://img.shields.io/badge/-文件助手-FFFFFF.svg) ![](https://img.shields.io/badge/-文件浏览器-FFFFFF.svg) ![](https://img.shields.io/badge/-可道云-FFFFFF.svg) ![](https://img.shields.io/badge/-Rclone-FFFFFF.svg) ![](https://img.shields.io/badge/-SmartDNS-FFFFFF.svg) ![](https://img.shields.io/badge/-网络唤醒-FFFFFF.svg) ![](https://img.shields.io/badge/-TTYD_终端-FFFFFF.svg) ![](https://img.shields.io/badge/-迅雷快鸟-FFFFFF.svg) ![](https://img.shields.io/badge/-USB_打印服务器-FFFFFF.svg) ![](https://img.shields.io/badge/-KMS_服务器-FFFFFF.svg) ![](https://img.shields.io/badge/-微信推送-FFFFFF.svg) ![](https://img.shields.io/badge/-上网时间控制-FFFFFF.svg) ![](https://img.shields.io/badge/-WatchCat-FFFFFF.svg) ![](https://img.shields.io/badge/-各种驱动-FFFFFF.svg) ![](https://img.shields.io/badge/-DNS_Filter-FFFFFF.svg) ![](https://img.shields.io/badge/-持续更新中……-FFFFFF.svg)

PS: 部分功能未启用，有需要请自行 fork 定制

## 界面一览

![](./preview/WX20220709-151101%402x.png)
![](./preview/WX20220709-151127%402x.png)

## 默认配置

- 北京时间每天 `0:00` 定时编译，`Release` 中只保留最新版本
- 历史版本在 `Actions` 中选择一个已经运行完成且成功的 `workflow` 在页面底部可以看到 `Annotations` 和 `Artifacts`
- `Annotations` 中的网盘失效时间一般是 1-3 天, `Artifacts` 需要登录 Github 才能下载

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

## License

[MIT](https://github.com/P3TERX/Actions-OpenWrt/blob/main/LICENSE) © [**P3TERX**](https://p3terx.com)
