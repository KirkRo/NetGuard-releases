# NetGuard Marine

[Русский](README.md) · **English**

Internet traffic control with hard limits for Windows. Built for metered links: satellite
internet on a ship, a mobile modem, a plan billed per megabyte.

Its main job is to stop traffic from leaking away unnoticed: background Windows updates,
telemetry, Delivery Optimization, automatic patch downloads by Steam, Epic, EA and Ubisoft,
cloud sync. NetGuard blocks a download **before** it starts instead of counting the cost
afterwards.

The interface is in English or Russian: the RU/EN button in the title bar switches it.
Below, buttons and screens are named as in the Russian interface, with a translation in
brackets.

> This repository holds the NetGuard Marine installers and release notes, on the
> [Releases](https://github.com/KirkRo/NetGuard-releases/releases) page. The source code
> is kept in a separate private repository.

![NetGuard dashboard](docs/screenshots/01-dashboard.png)

**[Download the latest version](https://github.com/KirkRo/NetGuard-releases/releases/latest)** ·
[How to use](#how-to-use) · [Features](#features) · [Screens](#screens) · [Security](#security) ·
[Commands](#commands)

---

## Installation

1. Download `NetGuardSetup.exe` from the
   [Releases](https://github.com/KirkRo/NetGuard-releases/releases/latest) page.
2. Run it. The installer asks for administrator rights on its own, because Windows does not
   let a program set traffic filters without them.
3. Read the consent to processing of computer data. It lists the hardware identifiers the
   licence is bound to, says where their fingerprint is stored and how to erase it.
   Installation will not start without consent. When you update, the installer does not
   ask again if you have already agreed, unless the consent text has changed (1.7.13 asks
   once more: the text was made more precise).
4. Keep the default folder (`Program Files\NetGuard`) or choose another one, on another
   drive if you like. The installer sets permissions on it so the program cannot be
   replaced.
5. If the launch checkbox is left on, NetGuard opens when you close the installer.

**Updating:** once a day NetGuard asks GitHub whether a new version is out. That is one
request of about 10 KB, and you can turn it off in «Настройки» (settings). When there is a
new version, a banner appears above the screens. «Скачать и установить» (download and
install) downloads the installer (about 3 MB), checks it against the signed release
description and runs it. «Открыть GitHub» (open GitHub) opens the release page. To check
by hand, press «Проверить сейчас» (check now) on the «О приложении» (about) screen. The
old way still works too: run the new version's `NetGuardSetup.exe` over the old one, into
the same folder. Your licence, rules and settings are kept.

**Removing:** Settings > Apps, or `uninstall.exe` in the installation folder. Removal takes
down all filters, cleans `hosts`, and restores Windows services, Task Scheduler tasks,
browser settings and the Windows metered connection setting.

**Requirements:** Windows 10 version 1809 or later, x64. There is nothing to download:
.NET Framework 4.8 already ships with Windows. The installer is under 3 MB.

### Licence

**The trial period is 30 days** with every feature, counted from the first launch. After
that the program keeps working in free mode, and paid features are unlocked with a key.
Keys are available on Telegram from **@kirk_ro**.

| Key term | Price | Per month |
|---|---|---|
| 3 months | $7.99 | $2.66 |
| 6 months | $13.99 | $2.33 |
| 12 months | $22.99 | $1.92 |
| Forever | $54.99 | one payment |

A key entered before the current term ends adds its term to what is left. One key, one
computer. Thirty-day keys issued earlier keep working.

You can buy a key inside the program: the licence screen, «Купить» (buy) on the term's
card. «Заказать в Telegram» (order on Telegram) opens a chat with the seller with the
order already typed. Paste the key you receive in the same place and it is activated.
Prices and terms of purchase are on the site:
[kirkro.github.io/NetGuard-releases](https://kirkro.github.io/NetGuard-releases/)
([in Russian](https://kirkro.github.io/NetGuard-releases/ru/)). Card, Apple
Pay and Google Pay checkout will appear in the program when the store opens.

**Interface language**: Russian or English, the RU/EN button in the title bar. Every
screen is in English now: the title bar, the nine main screens, Settings, Help, Support,
About (with the version history) and Licence, and so are the service messages. The
startup windows shown before the language is read from the settings, and the service log,
stay in Russian.

| Without a key | With a key |
|---|---|
| Usage monitoring | Saving modes (Satellite Save, game isolation, whitelist) |
| Block log | Protection against unexpected downloads |
| Manual block and allow | Daily quotas per program |
| Per-program speed limit | Priorities and Economy |
| Overall daily quota | Update hunter and browser saving |
| Network type | Diagnostics and rule health |
| One week of history | Traffic cost calculation |
| Emergency reset | Network profiles and automatic switching |
| Restoring disabled tasks | History longer than a week |
| Choosing a DNS server and measuring latency | Encrypted DNS (DoH) |

The licence is bound to the computer. Uninstalling and reinstalling does not restart the
trial and does not take away days you have paid for.

`NetGuard.FreeDemo.exe` from the same release is the program locked in free mode, so you
can see what the paid tier includes.

---

## How to use

### 1. Tell NetGuard which network you are on

Screen **06 Тип сети** (network type). Choose ship internet, port Wi-Fi, home Wi-Fi or
phone. Each type is a ready set of rules: on the ship, Windows updates are cut off and a
daily allowance of 500 MB applies; at home there are no restrictions. The label is
remembered against the gateway's MAC address, and the profile switches on by itself when
you come back to that network.

On ship internet and phone networks NetGuard also turns on the Windows metered connection:
Windows Update puts off optional downloads and Microsoft apps save data on their own. A
network you already set as metered is left alone, and the previous value comes back when
the network type changes. To turn this off, untick the box in Settings > Networks.

The pencil on a profile card changes its quota, its speed ceiling and how it treats
updates.

### 2. Set your tariff and quota

Screen **05 Квоты и стоимость** (quotas and cost). Enter the price the way your contract
states it, for example "10 per 1024 MB". Usage is then shown in money, per day and per
quota period. The daily limit in megabytes warns at 80% and 90% and can cut the internet
off when it runs out. That is the **kill switch**.

### 3. Turn on saving

The **SATELLITE SAVE** button in the header switches on every saving measure at once:
Windows Update, BITS, Delivery Optimization, game updates, telemetry and cloud sync.
Individual modes are in the «Режимы сети» (network modes) row under the header.
**ЗАЩИТИТЬ** (protect) on the right applies the protection that fits the current network
type.

### 4. Configure individual programs

Use screen **02 Процессы и приоритеты** (processes and priorities) or the table on the
dashboard. Every row has an **«Действие»** (action) menu:

| Item | What it does |
|---|---|
| Разрешить / Заблокировать / Обычный (allow / block / normal) | The program's network access |
| Это игра / Это голосовой чат (game / voice chat) | A mark: automation leaves such a program alone and never slows it down |
| Лимит скорости… (speed limit) | A ceiling in KB/s or MB/s, and what to do when it is exceeded |
| Снять правило (remove rule) | Return the program to default behaviour |

When closed, the menu shows the program's current state, for example
`Разрешён · Игра · ≤2.0 МБ/с` (allowed, game, up to 2.0 MB/s).

Priority, from Низкий (low) to Критический (critical), decides who gives way on the link.
While a higher-priority program is busy, the programs below it have their outgoing speed
cut.

### 5. Speed limits: three responses

| Response | What happens |
|---|---|
| **Записать и не мешать** (log and let it run), the default | The excess appears in the log and the program keeps working |
| **Отсекать** (cut off) | Each time the limit is exceeded, the program is disconnected for 10 seconds. Connections drop |
| **Замедлить (драйвер)** (slow down with the driver) | The WinDivert driver holds the speed at the limit without dropping the connection |

Slowing down is enabled with a checkbox in **Настройки** (settings): «Плавно замедлять
входящую скорость» (slow incoming speed smoothly). The driver loads only while there is
something to slow down and unloads straight after. Games and voice chat do not go through
it. Some anti-cheat systems (FACEIT, Vanguard) refuse to start while the driver is loaded,
so clear the checkbox before playing such a game.

### 6. See what was blocked

Screen **03 Журнал блокировок** (block log) shows who was blocked, where they were
connecting and why. You can filter by kind of reason, search and export to CSV. Red means
cut off by a rule, amber means held by a protection and waiting for your decision, blue
means limited but still working.

### 7. Find the updaters

On screen **07 Охотник за обновлениями** (update hunter), press «Сканировать систему»
(scan the system). It finds services, scheduled tasks and programs that download updates
in the background. Nothing changes until you tick items and press «Заглушить отмеченные»
(silence the selected). «Вернуть отключённые задачи» (restore disabled tasks) rolls all of
it back.

### 8. Choose a DNS server

Screen **09 Оптимизатор DNS** (DNS optimizer). The top panel shows which DNS is in use, its
latency and whether it is encrypted. Below are thirteen public servers; the «Вредоносное ПО»
(malware), «18+» and «Реклама» (ads) tabs keep only the servers that block that.
«Выбрать» (choose) sets the server on every connection that carries traffic; «Вернуть
системный» (restore system default) puts back the DNS that was there before.

**(Тест)** (test) measures the latency of the current DNS and of every server in the list,
and only when you press it. Each server gets a real DNS query over HTTPS (DoH, HTTP/2):
about 6 KB per server, about 80 KB for the whole list. Latency is the time of one query on
an open connection. The time to connect (up to a second over satellite) is shown under it
and in each server's tooltip. The fastest server is marked with a star. A short UDP query
would lie here: antivirus software, a VPN, a router or a ship's terminal intercepts it and
answers from its own cache in 1-3 ms. When the network does that, the screen says so.

**Зашифровано** (encrypted; needs a key and Windows 11) switches queries to the chosen
server to DNS over HTTPS, so they cannot be read or tampered with. They never fall back to
plain UDP: if the server cannot be reached over HTTPS, turn encryption off or press
«ВЕРНУТЬ ИНТЕРНЕТ». Before encryption turns on, every address of the server is checked over
HTTPS. An address that something else has taken on this network is left out while
encryption is on. If no address answers, encryption stays off.

### If the internet is gone

First press the red **ВЕРНУТЬ ИНТЕРНЕТ** (restore internet) button in the header. If the
window does not open, run this in PowerShell as administrator:

```powershell
& "C:\Program Files\NetGuard\NetGuard.exe" --purge
```

The command removes all filters, cleans `hosts`, deletes the QoS policies, restores
Windows services, the metered connection setting and the DNS that was in use before
NetGuard, and unloads the driver. It
works even with no network at all.

The filters also live only as long as the service does. If the service crashes, the
internet comes back by itself.

---

## Screens

The screenshots come from the real program window filled with made-up data: names,
addresses and networks are invented.

### Processes and priorities

A table of every program with its rules, priority and daily limit. Below it is the
inspector for the selected program; here Steam is slowed by the driver to 2 MB/s.

![Processes and priorities](docs/screenshots/02-processes.png)

### Block log

![Block log](docs/screenshots/03-journal.png)

### Quota and cost

![Quota and cost](docs/screenshots/04-quota.png)

### Network type and profiles

![Network type](docs/screenshots/05-network.png)

### Update hunter

![Update hunter](docs/screenshots/06-hunter.png)

### Licence

![Licence](docs/screenshots/07-licence.png)

### DNS optimizer

![DNS optimizer](docs/screenshots/09-dns.png)

### Speed limit window

<img src="docs/screenshots/08-speed-limit.png" alt="Speed limit window" width="560">

---

## Features

### Blocking before the download

- Windows Update, BITS, Delivery Optimization and telemetry: the services are stopped and
  blocked by **service SID**. Blocking `svchost.exe` as a whole would also take out DNS
  and DHCP.
- The CDNs of the Steam, Epic, EA and Ubisoft launchers: games and matchmaking work,
  patches do not download.
- Update domains, through NetGuard's own block in the `hosts` file.
- Cloud sync, blocked or throttled to a trickle.

### Modes

- **Satellite Save**: maximum saving with one button.
- **Game isolation**: only the game and the programs you marked have network access.
- **Strict whitelist**: everything is forbidden except what you allowed.
- **Economy**: an outgoing speed ceiling set by priority.

### Protection against unexpected usage

- Speed bursts and large downloads: the program is held until you decide.
- Idle freeze: a program you have not used for a long time is throttled, then
  disconnected.
- Background leak detector: finds who transmits while nobody is using them.
- Anomalies: usage that does not look like the usual pattern for that program.
- Unaccounted traffic: the adapter counted more than the programs can explain.

### Accounting and money

- A daily quota with warnings and a kill switch, plus quotas for individual programs.
- Usage in money at your tariff. "Saved by protection" counts only what was actually
  measured.
- History: 90 days by day and 8 days by hour, with a chart for an hour, a day and a week.

### Networks

- Four profiles: ship, port, home and hotspot. Networks are recognised by the gateway's MAC
  address, and the profile switches automatically.
- Windows metered connection on ship and hotspot networks, with the previous value put back.

### DNS

- DNS optimizer: thirteen public servers with a filter by purpose: no filtering, or
  blocking malware, ads or adult content.
- Latency measured on request, and encrypted DNS (DoH) with a key.
- The previous DNS comes back with a button, on uninstall and with «ВЕРНУТЬ ИНТЕРНЕТ».

### Diagnostics

- Connection check: ten checks and one named suspect, **without sending a single packet**
  to the network.
- Rule health: broken, expired, conflicting and forgotten rules.
- Automatic rollback: if the connection drops after a new block, NetGuard offers to undo
  it.

### Honesty

- The program does not go online on its own: there are no licence checks and no telemetry.
  There is one exception. Once a day it asks GitHub whether a new version is out. That takes
  about 10 KB, and you can turn it off in «Настройки» (settings).
- Everything it changes in the system is recorded and put back when you remove it.

---

## Speed limiting: what it can and cannot do

**Outgoing traffic** is limited by a Windows QoS policy, which is real shaping in the
kernel. Economy and priorities work this way and do not drop connections.

**Incoming traffic** cannot be slowed by an ordinary program on Windows. A WFP filter acts
when a connection is set up and has no "go slower" verdict. That is why a limit on incoming
speed has three responses (see [above](#5-speed-limits-three-responses)):

- by default, the excess is only logged;
- "cut off" drops connections. You choose it for a specific program; automation never does
  this;
- "slow down" works through the **WinDivert** driver. It delays incoming packets, and TCP
  lowers its own speed in response. Only TCP is slowed, so browser QUIC traffic (UDP) is
  not affected.

Before version 1.7, automation cut programs off on its own, and games and launchers
disconnected every ten seconds. That is fixed: now only a limit you set to cut off does so.

---

## Security

- Filters disappear together with the service. The WFP session is dynamic, so if the
  service crashes or is killed, every filter is removed automatically and the internet
  comes back. On a ship, a stuck filter with no connection at all is a worse outcome than
  a few leaked megabytes.
- The control channel is closed. The named pipe is open only to `SYSTEM` and the
  Administrators group. A process without elevation cannot even open it; otherwise any
  program could cut the machine off the network.
- The `hosts` file is edited only between NetGuard's own markers, `# >>> NetGuard` and
  `# <<< NetGuard`. Anything written by you or by other programs is left alone, and the
  whole block is removed on uninstall.
- The start modes of Windows services are recorded before they are changed and restored
  when a mode is turned off or the program is removed.
- The WinDivert driver comes from the official release
  ([basil00/WinDivert](https://github.com/basil00/WinDivert)) and is signed by Microsoft.
  Its files are checked against recorded checksums.
- Only a signed update is installed. A downloaded installer runs only if its size and
  SHA-256 match a release description signed with an RSA-3072 key, and only if its version
  is newer than the installed one. The private key stays with the author and never enters
  the repository, so even a hijacked GitHub account cannot make the program install
  someone else's file. Downloading happens only when you press the button.

---

## Commands

| Command | Action |
|---|---|
| `NetGuard.exe` | Open the interface |
| `NetGuard.exe --install` | Install and start the service |
| `NetGuard.exe --uninstall` | Remove the service and lift all restrictions |
| `NetGuard.exe --purge` | **Emergency:** remove all filters and bring the network back |
| `NetGuard.exe --status` | Show the service status |
| `NetGuard.exe --background on\|off` | Keep working in the background, or only while the window is open |
| `NetGuard.exe --restore-tasks` | Re-enable Task Scheduler tasks |
| `NetGuard.exe --reset-guards` | Reset protection thresholds to their defaults |
| `NetGuard.exe --shaper-check` | Check the WinDivert driver by loading and unloading it, with no traffic |
| `NetGuard.exe --metered-status` | Show whether Windows treats the current network as metered (read-only) |
| `NetGuard.exe --console` | Run the engine in a console (debugging) |
| `NetGuard.exe --diag-appid <exe>` | Work out why a rule does not fire |

NetGuard always runs with administrator rights, so Windows asks for permission when it
starts. Run the commands from PowerShell as administrator.
