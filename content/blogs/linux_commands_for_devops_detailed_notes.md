---
title: "Linux Commands for DevOps Engineers: The Complete Field Manual"
date: "2026-02-15"
excerpt: "A comprehensive, production-grade guide to essential Linux commands, permissions, process management, networking, troubleshooting, and real-world DevOps incident playbooks."
author: "Manjeet Kumar"
readTime: "25 min read"
tags: ["Linux", "DevOps", "Bash", "System Administration", "Networking", "Troubleshooting", "Docker", "SRE"]
category: "DevOps"
featured: true
sequence: 3
---

# Linux Commands for DevOps Engineers — Detailed Notes

*A comprehensive, production-ready handbook designed for DevOps Engineers, Site Reliability Engineers (SREs), and Cloud Architects.*

---

## Table of Contents

- [Introduction & Linux Architecture](#introduction--linux-architecture)
- [1. User Management & Privilege Control](#1-user-management--privilege-control)
- [2. File & Directory Operations](#2-file--directory-operations)
- [3. Linux Permissions & Security Model](#3-linux-permissions--security-model)
- [4. Process Management & Job Control](#4-process-management--job-control)
- [5. Networking & Connectivity Diagnostics](#5-networking--connectivity-diagnostics)
- [6. Disk, Memory & Resource Monitoring](#6-disk-memory--resource-monitoring)
- [7. System Administration & Service Management (systemd)](#7-system-administration--service-management-systemd)
- [8. Package Management (Debian, Ubuntu & RHEL)](#8-package-management-debian-ubuntu--rhel)
- [9. Archiving, Compression & Backup](#9-archiving-compression--backup)
- [10. Text Processing, Streams & Redirection](#10-text-processing-streams--redirection)
- [11. Vim Editor Quick Reference](#11-vim-editor-quick-reference)
- [12. Real-World DevOps Incident Playbooks](#12-real-world-devops-incident-playbooks)
- [13. Key Differences & Comparison Matrix](#13-key-differences--comparison-matrix)
- [14. The DevOps Troubleshooting Mindset](#14-the-devops-troubleshooting-mindset)

---

## Introduction & Linux Architecture

Linux powers the vast majority of modern cloud infrastructure, Docker containers, Kubernetes clusters, and CI/CD runners. To excel in DevOps, you must understand not only the individual commands, but also how the operating system manages resources, processes, file descriptors, and network sockets.

### Filesystem Hierarchy Standard (FHS) Quick Map

In Linux, **everything is a file** (including hardware devices, network sockets, and running processes).

| Directory | Purpose / Role in DevOps |
|---|---|
| `/` | The root directory of the entire filesystem hierarchy. |
| `/etc` | System-wide configuration files (`/etc/nginx/`, `/etc/hosts`, `/etc/resolv.conf`, `/etc/sudoers`). |
| `/var/log` | System and service application log files (`syslog`, `auth.log`, `nginx/access.log`). |
| `/proc` | Virtual filesystem exposing kernel metrics, running process details (`/proc/[PID]/`), and hardware info. |
| `/sys` | Virtual filesystem providing hardware, driver, and kernel subsystem parameters. |
| `/tmp` | Temporary files, cleared on reboot or managed by cleanup daemons. |
| `/opt` | Optional third-party software and self-contained enterprise applications. |
| `/home` | Personal directories for regular users (`/home/ubuntu`, `/home/manjeet`). |
| `/root` | Home directory of the root superuser. |
| `/bin` / `/usr/bin` | Standard user executable binaries (`ls`, `grep`, `curl`, `node`, `docker`). |
| `/sbin` / `/usr/sbin` | System administrator binaries (`iptables`, `fdisk`, `reboot`, `ip`). |

---

# 1. User Management & Privilege Control

Access control and principle of least privilege are central to securing servers, Kubernetes nodes, and CI/CD agents.

---

### `whoami`

Prints the effective username of the currently logged-in shell session.

```bash
whoami
```

**Output:**
```text
ubuntu
```

> [!TIP]
> **DevOps Use Case:** Run `whoami` immediately after entering an SSH session or inside a container (`docker exec -it <container> sh`) to verify whether you are operating as `root` or an unprivileged application user.

---

### `id`

Displays comprehensive user identification: User ID (`UID`), primary Group ID (`GID`), and all supplementary groups.

```bash
id
```

**Output:**
```text
uid=1000(manjeet) gid=1000(manjeet) groups=1000(manjeet),4(adm),27(sudo),998(docker)
```

- `uid`: Unique numeric identifier for the user account (`0` is always `root`).
- `gid`: Primary group ID assigned to files created by the user.
- `groups`: Supplementary groups granting additional permissions (e.g., `sudo`, `docker`).

---

### `groups`

Lists the group names to which the current user (or specified user) belongs.

```bash
groups
groups ubuntu
```

**DevOps Use Case:** Verify Docker socket access. Non-root users must belong to the `docker` group to execute `docker ps` without `sudo`:
```bash
sudo usermod -aG docker $USER
```

---

### `passwd`

Updates a user's authentication password.

```bash
# Change your own password
passwd

# Change another user's password (requires root/sudo)
sudo passwd deployer
```

---

### `useradd` & `usermod` & `userdel`

Create, modify, and delete local user accounts for applications, deployers, and automation bots.

```bash
# Create a system user for a microservice with no login shell
sudo useradd -r -s /usr/sbin/nologin appuser

# Create a regular user with home directory and bash shell
sudo useradd -m -s /bin/bash deployer

# Add an existing user to the sudo and docker groups
sudo usermod -aG sudo,docker deployer

# Delete a user and remove their home directory
sudo userdel -r olduser
```

---

### `sudo` & `visudo`

Executes commands with administrative (superuser) privileges.

```bash
sudo apt update
```

To edit the sudoers configuration file safely without corrupting syntax, **always** use:
```bash
sudo visudo
```

**Granting Passwordless Sudo for CI/CD Deployer:**
```text
deployer ALL=(ALL) NOPASSWD: ALL
```

---

# 2. File & Directory Operations

Navigating directories, inspecting files, searching logs, and creating structures are daily operations in Linux environments.

---

### `pwd` (Print Working Directory)

Outputs the absolute path from the root directory to your current working location.

```bash
pwd
# /var/log/nginx
```

---

### `ls` (List Storage & Directory Contents)

Lists directory contents with customizable sorting, formatting, and file attribute details.

```bash
# Standard listing
ls

# Long listing format with human-readable sizes and hidden files
ls -lah

# Sort files by modification time (newest first) - great for log inspection
ls -lt

# Sort files by size (largest first)
ls -lSh
```

#### Understanding `ls -l` Output Columns

```text
-rw-r--r--  1 ubuntu ubuntu 4.2K Feb 15 10:30 app.log
▲          ▲ ▲      ▲      ▲    ▲            ▲
│          │ │      │      │    │            └─ File Name
│          │ │      │      │    └─ Timestamp of last modification
│          │ │      │      └─ File Size (human-readable with -h)
│          │ │      └─ Group Owner
│          │ └─ User Owner
│          └─ Hard Link Count
└─ Permissions string (Type + Owner + Group + Others)
```

---

### `cd` (Change Directory)

Changes the active working directory.

```bash
# Navigate to an absolute path
cd /etc/nginx/conf.d

# Move up one level (parent directory)
cd ..

# Move up two levels
cd ../..

# Switch to the user's home directory (/home/username or ~)
cd ~

# Switch back to the previous directory (super useful shortcut!)
cd -
```

---

### `mkdir` (Make Directory)

Creates one or more new directories.

```bash
# Create a single directory
mkdir build

# Create nested directory trees in a single command (-p = parents)
mkdir -p /opt/myapp/releases/v1.0.0/config
```

---

### `touch`

Creates an empty file or updates the access and modification timestamps of an existing file.

```bash
# Create empty files
touch .env app.py Dockerfile

# Update timestamp of existing file
touch config.yaml
```

---

### `cp` (Copy Files and Directories)

Copies source files or directories to a destination path.

```bash
# Copy a single file
cp nginx.conf nginx.conf.bak

# Copy a directory recursively (-r)
cp -r /var/www/html /var/www/html_backup

# Preserve permissions, ownership, and timestamps (-p or -a for archive)
cp -a /opt/app /opt/app_backup
```

---

### `mv` (Move & Rename)

Moves files/directories to a new path or renames them in place.

```bash
# Rename a file
mv old_name.yaml new_name.yaml

# Move a file to another directory
mv app.jar /opt/backend/
```

---

### `rm` (Remove Files and Directories)

Removes file system entries permanently.

```bash
# Delete a single file
rm temp.log

# Force delete without prompt (-f)
rm -f old_token.txt

# Delete a directory recursively (-r)
rm -r /tmp/cache_dir

# Force recursive deletion (USE WITH EXTREME CAUTION!)
rm -rf /tmp/build_artifacts
```

> [!CAUTION]
> Never run `rm -rf /` or `rm -rf /*`. Always inspect the target path, use environment variables carefully (e.g., `rm -rf "${BUILD_DIR:?}/"`), and double-check directory names before hitting Enter.

---

### `cat` (Concatenate & Display)

Reads file contents sequentially and outputs them directly to standard output (`stdout`).

```bash
# View entire file
cat /etc/os-release

# Combine multiple files into one
cat part1.log part2.log > combined.log

# Display line numbers with -n
cat -n server.js
```

---

### `less` (Paginated File Viewer)

Opens a file in an interactive, scrollable terminal viewer without loading the entire file into memory (safe for multi-gigabyte log files).

```bash
less /var/log/syslog
```

#### Essential `less` Navigation Shortcuts

| Key | Action |
|---|---|
| `Space` or `f` | Forward one full page |
| `b` | Backward one full page |
| `j` / `Down Arrow` | Scroll down one line |
| `k` / `Up Arrow` | Scroll up one line |
| `G` | Jump directly to end of file |
| `g` | Jump directly to beginning of file |
| `/pattern` | Search forward for `pattern` |
| `?pattern` | Search backward for `pattern` |
| `n` | Next search match |
| `N` | Previous search match |
| `q` | Quit viewer |

---

### `head` & `tail` (File Boundaries Inspection)

View the top or bottom lines of files.

```bash
# View first 10 lines (default)
head /etc/passwd

# View first 25 lines
head -n 25 app.log

# View last 30 lines
tail -n 30 /var/log/nginx/error.log

# Follow logs in real-time as they are written (CRITICAL DEVOPS COMMAND)
tail -f /var/log/nginx/access.log

# Follow log even if the file is rotated/recreated by logrotate (-F)
tail -F /var/log/application.log
```

---

### `find` (Advanced Filesystem Search)

Searches directory hierarchies in real-time based on names, file types, modification times, permissions, and file sizes.

```bash
# Find all .log files in /var/log
find /var/log -type f -name "*.log"

# Find case-insensitive file names
find /etc -iname "*nginx*"

# Find directories only (-type d)
find /var/www -type d -name "static"

# Find files modified in the last 24 hours (-mtime -1)
find /var/log -type f -mtime -1

# Find files larger than 100 Megabytes (+100M)
find / -type f -size +100M 2>/dev/null

# Find and delete old log files older than 30 days
find /var/log/myapp -type f -name "*.log" -mtime +30 -exec rm -f {} \;
```

---

### `locate` & `updatedb`

Searches an indexed database for file names instantly (faster than `find`, but reliant on periodic index updates).

```bash
# Search for configuration file
locate nginx.conf

# Manually refresh the locate database
sudo updatedb
```

---

### `ln` (Create Links: Symbolic vs Hard)

Creates references linking to existing files.

```bash
# Create a Symbolic Link (Soft Link / Shortcut)
ln -s /var/log/nginx/access.log ~/current_access.log

# Create a Hard Link (Direct inode pointer)
ln file.txt hardlink_file.txt
```

#### Symbolic Links vs Hard Links

```text
Symbolic Link:  [symlink] ----points to path----> [target file] ----> [Inode / Data on Disk]
                (Breaks if target file is deleted or moved)

Hard Link:      [original] ──┐
                             ├──> Points directly to identical [Inode / Data on Disk]
                [hardlink] ──┘
                (Data remains intact as long as at least one link exists)
```

---

# 3. Linux Permissions & Security Model

Linux enforces multi-user security through an explicit permission matrix for every file and directory.

```text
-  r w x  r - x  r - -
▲  ▲      ▲      ▲
│  │      │      └─ Others Permissions (Read Only)
│  │      └─ Group Permissions (Read + Execute)
│  └─ Owner / User Permissions (Read + Write + Execute)
└─ File Type (- = file, d = directory, l = symlink, c = character device)
```

### Permission Values (Octal Matrix)

| Permission | Symbol | Binary | Octal Value | Meaning on File | Meaning on Directory |
|---|:---:|:---:|:---:|---|---|
| **Read** | `r` | `100` | **4** | Read file content | View file names inside directory |
| **Write** | `w` | `010` | **2** | Modify file content | Create / delete files inside directory |
| **Execute** | `x` | `001` | **1** | Execute file as script/binary | Traverse / `cd` into directory |
| **None** | `-` | `000` | **0** | No permissions | No access |

---

### `chmod` (Change File Mode / Permissions)

Changes the read, write, and execute permissions of files and directories.

```bash
# Numeric (Octal) Mode
chmod 755 deploy.sh       # rwxr-xr-x (Owner all, others read+execute)
chmod 644 app.config      # rw-r--r-- (Owner read+write, others read-only)
chmod 600 id_rsa          # rw------- (Strict private key permission)
chmod 700 ~/.ssh          # rwx------ (Strict SSH directory permission)

# Symbolic Mode
chmod u+x script.sh       # Add execute for Owner (user)
chmod g-w config.yaml     # Remove write from Group
chmod o-rwx secret.env    # Remove all permissions from Others
chmod a+r public.txt      # Add read for All (u + g + o)

# Recursive Permission Change (-R)
chmod -R 755 /var/www/html
```

> [!WARNING]
> Never use `chmod 777` in production. It grants full read, write, and arbitrary code execution to every local user and compromised service on the host.

---

### `chown` & `chgrp` (Change Ownership)

Changes the user owner and group owner of a file or directory tree.

```bash
# Change owner only
sudo chown deployer app.jar

# Change owner and group simultaneously
sudo chown www-data:www-data /var/www/html

# Recursively change ownership for an entire application folder
sudo chown -R nodejs:nodejs /opt/my-node-app

# Change group only
sudo chgrp docker /var/run/docker.sock
```

---

### Special Permissions: SUID, SGID & Sticky Bit

| Special Bit | Octal | Applied To | Description & DevOps Context |
|---|:---:|---|---|
| **SUID** (*Set User ID*) | `4000` | Executables | Process runs with privileges of file owner (e.g., `/usr/bin/passwd`). |
| **SGID** (*Set Group ID*) | `2000` | Directories | New files created in directory inherit the directory's group automatically (crucial for shared team folders). |
| **Sticky Bit** | `1000` | Directories | Only file owners or root can delete files inside (applied to `/tmp` via `chmod +t /tmp`). |

---

# 4. Process Management & Job Control

Every running program, daemon, container process, and script runs as a Linux Process with a unique Process ID (`PID`).

---

### `ps` (Process Status Snapshot)

Provides a static snapshot of current running processes.

```bash
# Standard process list
ps

# Standard BSD-style detailed list of all system processes (DevOps Standard)
ps aux

# Standard POSIX format
ps -ef

# Filter for a specific service (e.g., node, nginx, python)
ps aux | grep nginx

# Sort processes by memory usage
ps aux --sort=-%mem | head -n 10

# Sort processes by CPU usage
ps aux --sort=-%cpu | head -n 10
```

#### Understanding `ps aux` Columns
- `USER`: User owning the process.
- `PID`: Unique process identifier.
- `%CPU`: Percentage of CPU time consumed.
- `%MEM`: Percentage of physical RAM consumed.
- `VSZ` / `RSS`: Virtual memory size vs Resident Set Size (actual physical memory in KB).
- `STAT`: Process status (`R` = Running, `S` = Sleeping, `Z` = Zombie, `D` = Uninterruptible sleep, `T` = Stopped).
- `START` / `TIME`: Launch time and total cumulative CPU execution time.
- `COMMAND`: Executable command and runtime arguments.

---

### `top` & `htop` (Real-Time Interactive Monitoring)

Displays live, dynamically updated metrics on CPU load, memory utilization, and running tasks.

```bash
top
```

```text
top - 14:20:10 up 12 days,  3:45,  2 users,  load average: 0.15, 0.22, 0.18
Tasks: 142 total,   1 running, 141 sleeping,   0 stopped,   0 zombie
%Cpu(s):  3.2 us,  1.1 sy,  0.0 ni, 95.2 id,  0.3 wa,  0.0 hi,  0.2 si
MiB Mem :   7950.4 total,   3120.2 free,   2410.5 used,   2419.7 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   5210.8 avail Mem
```

#### Interpreting CPU States in `top`
- `us` (*user*): CPU percentage spent running non-kernel user code.
- `sy` (*system*): CPU percentage spent executing kernel tasks and system calls.
- `wa` (*iowait*): CPU percentage waiting for disk I/O or network responses (**High values indicate disk bottleneck!**).
- `id` (*idle*): Idle percentage. Higher is better.

```bash
# Modern colorized interactive viewer with scrolling and tree view
htop
```

---

### `kill`, `pkill` & `killall` (Signal Dispatching)

Sends control signals to running processes to request shutdown, restart, or immediate termination.

```bash
# Graceful termination (SIGTERM - Signal 15) - ALLOWS CLEANUP
kill 12345

# Forceful immediate kill (SIGKILL - Signal 9) - KERNEL DROPS IMMEDIATELY
kill -9 12345

# Kill by process name using regex match
pkill -f "python worker.py"

# Kill all matching exact binary instances
sudo killall nginx
```

#### Essential Linux Signals Matrix

| Signal Name | Number | Action | DevOps Behavior |
|---|:---:|:---:|---|
| **SIGHUP** | `1` | Reload | Instructs daemon to reload configuration without closing active connections (e.g., Nginx). |
| **SIGINT** | `2` | Interrupt | Triggered by `Ctrl + C` in the terminal to cleanly interrupt a foreground program. |
| **SIGQUIT**| `3` | Quit | Quits process and produces a core dump for debugging. |
| **SIGKILL**| `9` | Kill | Uncatchable, non-ignorable immediate kernel kill. Use only when processes are unresponsive. |
| **SIGTERM**| `15` | Terminate | **Default.** Polite request asking process to flush data, close open sockets, and exit cleanly. |

---

### Job Control: `&`, `jobs`, `fg`, `bg`, `nohup`

Manage programs directly within your current interactive shell session.

```bash
# Run a long script in background by appending &
python3 migrate_db.py &

# List background jobs in current shell session
jobs -l

# Bring background job #1 to foreground
fg %1

# Resume a paused job (paused with Ctrl + Z) in the background
bg %1

# Run process detached from terminal hangup signal (survives SSH disconnect)
nohup python3 server.py > server.log 2>&1 &

# Disown a running job so it won't terminate when terminal closes
disown -h %1
```

---

# 5. Networking & Connectivity Diagnostics

DevOps workflows require constant debugging of network reachability, DNS queries, firewall rules, and API endpoints.

---

### `ping` (ICMP Reachability)

Tests round-trip latency and packet loss to a remote host using ICMP echo requests.

```bash
# Send 4 packets and exit
ping -c 4 8.8.8.8

# Test domain reachability
ping -c 4 google.com
```

> [!NOTE]
> Many cloud providers (such as AWS EC2 Security Groups) drop ICMP packets by default. A failed `ping` does **not** always mean the HTTP/SSH port is down.

---

### `ip` (Modern Network Configuration Tool)

Replaces legacy `ifconfig` and `route` commands for inspecting and configuring network interfaces, IP addresses, and routing tables.

```bash
# Show IP addresses assigned to all network interfaces
ip addr
# or shorthand:
ip a

# Show network interface status (up/down, MAC address, MTU)
ip link

# Display the kernel routing table and default gateway
ip route

# Display ARP neighbor cache (IP to MAC mappings)
ip neigh
```

---

### `ss` (Socket Statistics)

Fast modern utility for inspecting listening ports, active TCP/UDP connections, and socket states (replaces `netstat`).

```bash
# Show all listening TCP and UDP sockets in numeric format
ss -tuln

# Show listening sockets with process name and PID (requires sudo)
sudo ss -ltnp

# Filter connections for a specific port (e.g., port 80 or 443)
sudo ss -ltnp '( sport = :80 or sport = :443 )'

# Show established outbound connections
ss -t state established
```

#### Common `ss` Flags
- `-t`: TCP sockets.
- `-u`: UDP sockets.
- `-l`: Listening sockets only.
- `-n`: Numeric ports/IPs (prevents slow DNS lookups).
- `-p`: Show process name and PID owning the socket.

---

### `curl` (Client URL Transfer)

Swiss-army knife for transferring data to and from web servers and REST/GraphQL APIs.

```bash
# Simple GET request
curl https://api.github.com

# Fetch and display HTTP response headers only (-I)
curl -I https://google.com

# Follow HTTP 301/302 redirects (-L)
curl -IL https://google.com

# Send HTTP POST request with JSON payload and custom header
curl -X POST https://api.example.com/v1/deploy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"environment": "production", "version": "v2.1.0"}'

# Silent mode with formatted response metrics (great for healthchecks)
curl -s -o /dev/null -w "%{http_code} - Total Time: %{time_total}s\n" https://example.com

# Download file saving with original remote filename (-O)
curl -O https://releases.hashicorp.com/terraform/1.7.0/terraform_1.7.0_linux_amd64.zip
```

---

### `wget` (Non-Interactive Network Downloader)

Downloads files directly from URLs over HTTP, HTTPS, and FTP.

```bash
# Basic download
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# Save download under a specific filename (-O)
wget -O nodejs_setup.sh https://deb.nodesource.com/setup_20.x

# Download in background (-b)
wget -b https://example.com/large_dataset.tar.gz
```

---

### `ssh` (Secure Shell)

Cryptographically secure remote login protocol for managing remote Linux servers.

```bash
# Basic login
ssh ubuntu@54.210.10.45

# Authenticate using an SSH private key (.pem or id_rsa)
ssh -i ~/.ssh/prod_key.pem ec2-user@10.0.1.50

# Connect to a non-standard SSH port
ssh -p 2222 admin@remote.server.com

# Execute a command remotely without entering an interactive shell
ssh -i key.pem ubuntu@server "sudo systemctl restart nginx && df -h"
```

#### SSH Key Generation for CI/CD & GitHub
```bash
# Generate modern, secure Ed25519 keypair
ssh-keygen -t ed25519 -C "ci-deployer@mycompany.com"

# Copy public key to remote server for passwordless login
ssh-copy-id -i ~/.ssh/id_ed25519.pub ubuntu@server_ip
```

---

### `scp` & `rsync` (Secure File Copying & Synchronization)

Transfer files securely over SSH channels.

```bash
# SCP: Copy local file to remote server
scp -i key.pem app.zip ubuntu@remote-host:/opt/apps/

# SCP: Copy remote directory to local machine recursively (-r)
scp -i key.pem -r ubuntu@remote-host:/var/log/nginx/ ./local_logs/

# RSYNC: Fast delta synchronization (only transfers modified parts)
# -a = archive (preserves permissions/times), -v = verbose, -z = compress, -P = progress
rsync -avzP -e "ssh -i key.pem" ./dist/ ubuntu@remote-host:/var/www/html/
```

---

### `nc` (Netcat) & DNS Utilities (`dig`, `nslookup`)

```bash
# Test if a remote port is open without curl/browser (timeout 3 seconds)
nc -zv 10.0.1.15 5432

# Query DNS A Record
dig api.example.com +short

# Trace DNS resolution path step-by-step
dig +trace example.com

# Quick DNS lookup
nslookup google.com
```

---

# 6. Disk, Memory & Resource Monitoring

Diagnose storage capacity issues, memory leaks, and CPU throttling.

---

### `df` (Disk Filesystem Usage)

Displays available and used disk space across mounted filesystems.

```bash
# Human-readable format (-h)
df -h

# Include filesystem types (-T)
df -hT

# Check inode usage (-i) - Crucial when disk says "No space left" despite free megabytes!
df -i
```

**Example Output:**
```text
Filesystem     Type      Size  Used Avail Use% Mounted on
/dev/root      ext4       49G   38G  8.9G  81% /
tmpfs          tmpfs     3.9G     0  3.9G   0% /dev/shm
/dev/nvme0n1p1 vfat      511M  6.1M  505M   2% /boot/efi
```

---

### `du` (Disk Usage of Files and Folders)

Calculates the actual disk space consumed by specific files or directory trees.

```bash
# Summary size of a specific directory (-s: summary, -h: human-readable)
du -sh /var/log

# List top-level folder sizes up to depth 1
du -h --max-depth=1 /var

# Find the 10 largest directories/files in /var sorted
du -ah /var 2>/dev/null | sort -rh | head -n 10
```

> [!TIP]
> **Rule of Thumb:**
> - `df` = Filesystem-level view (**"How full is the disk?"**)
> - `du` = Directory/file-level view (**"Which specific folder is taking up space?"**)

---

### `free` (Memory & Swap Utilization)

Displays total, used, free, and cached physical RAM and Swap space.

```bash
free -h
```

**Example Output:**
```text
               total        used        free      shared  buff/cache   available
Mem:           7.7Gi       2.1Gi       1.4Gi       120Mi       4.2Gi       5.2Gi
Swap:          2.0Gi       128Mi       1.9Gi
```

- **`used`**: Memory currently held by running application processes.
- **`buff/cache`**: Memory used by the Linux kernel to cache disk blocks. **The kernel will automatically release this memory if applications request it!**
- **`available`**: The actual estimation of memory available for starting new applications without swapping. Always look at `available`, not `free`!

---

### `uptime` (Uptime & Load Average)

Shows how long the server has been running, active user count, and system load averages.

```bash
uptime
# 16:45:00 up 45 days, 12:10,  2 users,  load average: 0.85, 1.20, 0.95
```

#### Interpreting Load Average (1 min, 5 min, 15 min)
Load average represents the average number of processes in a **runnable** or **uninterruptible sleep (disk wait)** state.

- On a **4-Core CPU**:
  - Load average `4.0` = 100% capacity utilization.
  - Load average `2.0` = 50% utilization (plenty of headroom).
  - Load average `8.0` = 200% utilization (processes are queuing up; CPU bottleneck or disk I/O stall).

---

# 7. System Administration & Service Management (systemd)

`systemd` is the standard init system and service manager across modern Linux distributions.

---

### `systemctl` (Manage Services & Daemons)

Controls the state of systemd background services and units.

```bash
# Check running status, recent logs, and PID
sudo systemctl status nginx

# Start / Stop / Restart a service
sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker

# Reload service configuration without stopping active connections
sudo systemctl reload nginx

# Enable service to start automatically on system boot
sudo systemctl enable nginx

# Disable automatic startup at boot
sudo systemctl disable nginx

# Reload systemd manager configuration after editing a .service unit file
sudo systemctl daemon-reload

# Check if a service is actively running (returns 0 if active, useful for scripts)
systemctl is-active --quiet nginx && echo "Nginx is UP"
```

---

### `journalctl` (Systemd Centralized Log Inspection)

Queries and parses logs collected by the `systemd-journald` service.

```bash
# View logs for a specific service unit
journalctl -u nginx

# Follow logs in real-time (-f)
journalctl -u docker -f

# View logs since the last system boot
journalctl -b

# View only error level logs (-p err)
journalctl -u my-app.service -p err

# View logs from a specific timeframe
journalctl -u nginx --since "2026-02-15 10:00:00" --until "2026-02-15 11:30:00"

# Show last 100 lines without pagination
journalctl -u my-app.service -n 100 --no-pager
```

---

### System Information: `uname`, `hostnamectl`, `date`

```bash
# Display kernel version, OS architecture, and build
uname -a

# Set a new persistent system hostname
sudo hostnamectl set-hostname prod-k8s-worker-01

# Inspect and configure system timezone and NTP time sync
timedatectl
sudo timedatectl set-timezone UTC
```

---

### Shell Productivity: `history` & Navigation Shortcuts

```bash
# View recent command history
history

# Search history interactively (Press Ctrl + R and type keyword)
# (reverse-i-search)`docker`: docker compose up -d

# Execute command number 452 from history list
!452

# Re-run the immediately preceding command with sudo
sudo !!
```

---

# 8. Package Management (Debian, Ubuntu & RHEL)

Install, update, query, and clean binary packages across popular distributions.

---

### `apt` & `apt-get` (Debian / Ubuntu)

```bash
# Update the local package index database from repositories
sudo apt update

# Upgrade all installed packages to their latest versions
sudo apt upgrade -y

# Search for available packages
apt search postgresql

# View detailed metadata and dependencies of a package
apt show nginx

# Install software package
sudo apt install -y nginx htop git

# Remove software but leave configuration files intact
sudo apt remove nginx

# Purge software AND remove all associated configuration files
sudo apt purge nginx

# Remove orphaned packages and unused dependencies
sudo apt autoremove -y
```

### Differences: `apt` vs `apt-get`

```text
apt      → Designed for interactive command-line use (progress bars, cleaner output).
apt-get  → Lower-level, stable CLI interface recommended for shell scripts and Dockerfiles.
```

---

### RHEL / CentOS / Rocky / Amazon Linux (`dnf` / `yum`)

```bash
# Update repositories and packages
sudo dnf update -y

# Install package
sudo dnf install -y nginx

# Remove package
sudo dnf remove -y nginx
```

---

### Alpine Linux (`apk` - Container Standard)

```bash
# Update index and install package without caching to minimize Docker image size
apk update && apk add --no-cache curl jq
```

---

# 9. Archiving, Compression & Backup

Manage compressed tarballs and backup archives for deployments and storage.

---

### `tar` (Tape Archive Utility)

Bundles multiple files/directories into a single archive file, optionally compressing it.

```bash
# Create a tarball compressed with gzip (.tar.gz / .tgz)
# -c = create, -z = gzip, -v = verbose, -f = output filename
tar -czvf app_backup_2026.tar.gz /opt/myapp

# Extract a .tar.gz archive into current directory
# -x = extract, -z = gzip, -v = verbose, -f = input filename
tar -xzvf app_backup_2026.tar.gz

# Extract archive into a specific target destination directory (-C)
tar -xzvf release.tar.gz -C /var/www/html/

# View contents of an archive without extracting it (-t)
tar -tzvf backup.tar.gz

# Exclude specific files/directories (e.g. node_modules, .git)
tar --exclude='node_modules' --exclude='.git' -czvf source.tar.gz ./project
```

#### Understanding `tar` Flags
- `-c`: **C**reate a new archive.
- `-x`: E**x**tract an existing archive.
- `-t`: Lis**t** table of contents inside archive.
- `-z`: Filter through g**z**ip compression (`.tar.gz`).
- `-j`: Filter through bzip2 compression (`.tar.bz2`).
- `-v`: **V**erbose progress display.
- `-f`: Specify the archive **f**ilename.
- `-C`: Change directory before extraction.

---

### `gzip` / `gunzip` & `zip` / `unzip`

```bash
# Compress single file (replaces original with app.log.gz)
gzip app.log

# Decompress .gz file
gunzip app.log.gz

# Create standard .zip archive recursively
zip -r project_backup.zip ./project/

# Unpack .zip archive
unzip project_backup.zip -d /opt/destination/
```

---

# 10. Text Processing, Streams & Redirection

The Unix philosophy states: *"Write programs that do one thing and do it well. Write programs to work together."* Mastering text utilities enables high-speed log filtering, metric parsing, and config generation.

---

### Linux Standard Streams

Every process automatically opens three standard data streams:

```text
[Keyboard / Input File] ──> stdin  (File Descriptor 0) ──┐
                                                         ▼
                                                [ Linux Process ]
                                                 │             │
   stdout (File Descriptor 1) <──────────────────┘             └─> stderr (File Descriptor 2)
        │                                                               │
        ▼                                                               ▼
   [Terminal Display / Log File]                                  [Error Log File]
```

---

### Stream Redirection Operators

```bash
# Overwrite stdout to file (>):
echo "PORT=8080" > .env

# Append stdout to file (>>):
echo "DATABASE_URL=postgres://..." >> .env

# Redirect stderr to file (2>):
find / -name "*.conf" 2> /dev/null

# Redirect BOTH stdout and stderr to the same file (&> or 2>&1):
./deploy.sh > deployment.log 2>&1

# Discard all output completely (silent execution):
command > /dev/null 2>&1

# Read stdin from file (<):
mysql -u root -p database_name < schema.sql

# Tee: Output to terminal AND file simultaneously
echo "Starting build..." | tee -a build.log
```

---

### `grep` (Global Regular Expression Print)

Searches text and log files for patterns matching regular expressions.

```bash
# Search for keyword (case-sensitive)
grep "ERROR" /var/log/app.log

# Case-insensitive search (-i)
grep -i "exception" /var/log/app.log

# Invert match (display lines that DO NOT contain pattern) (-v)
grep -v "DEBUG" /var/log/app.log

# Search recursively through all files in a directory (-r)
grep -r "DB_PASSWORD" /etc/myapp/

# Show matching line numbers (-n)
grep -n "FATAL" application.log

# Display matching lines plus 3 lines of Context After (-A 3) and Before (-B 2)
grep -B 2 -A 3 "NullPointerException" server.log

# Count total occurrences (-c)
grep -c "500 Internal Server Error" access.log
```

---

### `awk` (Pattern Scanning & Data Processing)

A full programming language optimized for column-based data parsing.

```bash
# Print only the 1st and 3rd columns from whitespace-separated text
ps aux | awk '{print $1, $3}'

# Use a custom delimiter (-F) (e.g., parse usernames from /etc/passwd)
awk -F: '{print $1, $6}' /etc/passwd

# Filter rows where 9th column (HTTP status) is 500 in an access log
awk '$9 == 500 {print $1, $7, $9}' access.log

# Calculate the sum of values in column 1
cat numbers.txt | awk '{sum += $1} END {print "Total:", sum}'
```

---

### `sed` (Stream Editor)

Performs non-interactive text transformations, search-and-replace, and line filtering.

```bash
# Replace first occurrence of 'localhost' with '127.0.0.1' per line
sed 's/localhost/127.0.0.1/' config.yaml

# Replace ALL occurrences globally on all lines (g)
sed 's/http:\/\/localhost/https:\/\/prod.domain.com/g' config.js

# In-place file replacement directly modifying the source file (-i)
sed -i 's/ENVIRONMENT=dev/ENVIRONMENT=production/g' .env

# Delete empty lines from a file
sed -i '/^$/d' server.conf
```

---

### `cut`, `sort`, `uniq` & `wc`

```bash
# Extract 1st field delimited by colon
cut -d: -f1 /etc/passwd

# Sort lines alphabetically
sort users.txt

# Sort lines numerically (-n) in reverse order (-r)
sort -nr scores.txt

# Filter out duplicates and count frequency (-c) (INPUT MUST BE SORTED!)
cat ip_addresses.txt | sort | uniq -c | sort -nr

# Count lines (-l), words (-w), and characters (-c) in a file
wc -l access.log
```

---

### `xargs` (Build & Execute Commands from Standard Input)

Converts lines from standard input into arguments for other commands.

```bash
# Find all .log files and compress them using gzip
find /var/log/myapp -type f -name "*.log" | xargs gzip

# Delete all stopped Docker containers
docker ps -a -q -f status=exited | xargs docker rm
```

---

# 11. Vim Editor Quick Reference

`vim` is installed by default across virtually all Linux environments.

```bash
vim /etc/nginx/nginx.conf
```

```text
               ┌───────────────────────────────┐
               │         NORMAL MODE           │ <─── [Esc] Key (Return to base)
               │ (Navigation, Deletion, Yanks) │
               └───────────┬───────▲───────────┘
               Press 'i','a'│       │
                            ▼       │
               ┌────────────────────┴──────────┐
               │         INSERT MODE           │
               │   (Typing and Editing Text)   │
               └───────────────────────────────┘
```

### Essential Vim Cheat Sheet

#### Switching Modes
- `i`: Enter **Insert Mode** before cursor.
- `a`: Enter **Insert Mode** after cursor.
- `o`: Open a new line **below** cursor and enter Insert Mode.
- `O`: Open a new line **above** cursor and enter Insert Mode.
- `Esc`: Return to **Normal Mode**.
- `v`: Enter **Visual Mode** (highlight text blocks).

#### Navigation in Normal Mode
- `h`, `j`, `k`, `l`: Left, Down, Up, Right.
- `w` / `b`: Jump forward / backward by one word.
- `0` / `$`: Jump to beginning / end of current line.
- `gg`: Jump to first line of file.
- `G`: Jump to last line of file.
- `:45`: Jump directly to line 45.

#### Editing & Clipboard
- `x`: Delete single character under cursor.
- `dd`: Delete (cut) entire current line.
- `yy`: Yank (copy) current line.
- `p`: Paste clipboard below cursor.
- `u`: Undo last action.
- `Ctrl + r`: Redo undone action.

#### Search & Replace
- `/search_term`: Search forward. Press `n` for next match, `N` for previous.
- `:%s/old/new/g`: Replace all occurrences of `old` with `new` throughout the entire file.

#### Save & Exit (from Normal Mode)
- `:w`: Write (save) file.
- `:q`: Quit (fails if there are unsaved changes).
- `:wq` or `:x` or `ZZ`: Save and exit.
- `:q!`: Force quit without saving modifications.

---

# 12. Real-World DevOps Incident Playbooks

Real-world production troubleshooting scripts and command chains.

---

### Incident 1: Disk Space 100% Full Alert (`No space left on device`)

**Diagnostic Workflow:**
```bash
# 1. Check which filesystem partition is at 100%
df -h

# 2. Check if disk has run out of file INODES (despite free disk megabytes)
df -i

# 3. Locate the largest folders under /var or /
sudo du -h --max-depth=1 /var 2>/dev/null | sort -rh | head -n 10

# 4. Find large log or dump files greater than 200MB
sudo find /var/log -type f -size +200M

# 5. Check if deleted log files are still held open by running processes!
# (A file removed with 'rm' remains on disk until the process closes its file descriptor)
sudo lsof | grep deleted

# 6. Safely truncate active log files without breaking file descriptors
sudo truncate -s 0 /var/log/nginx/access.log
```

---

### Incident 2: High CPU Spikes & Runaway Process Alert

**Diagnostic Workflow:**
```bash
# 1. Check system load average and uptime
uptime

# 2. Identify top 5 CPU-hogging processes
ps aux --sort=-%cpu | head -n 6

# 3. Check live interactive thread consumption
top -b -n 1 | head -n 20

# 4. Inspect specific PID details
ls -l /proc/12345/exe
cat /proc/12345/cmdline

# 5. Gracefully terminate process (SIGTERM)
kill 12345

# 6. If unresponsive, force terminate (SIGKILL)
kill -9 12345
```

---

### Incident 3: Application Crash & "Address Already in Use" Port Collision

**Diagnostic Workflow:**
```bash
# 1. Inspect what process is currently binding to the desired port (e.g. 8080)
sudo ss -ltnp 'sport = :8080'

# Alternative using lsof:
sudo lsof -i :8080

# 2. Check the service status and recent crash logs
sudo systemctl status my-backend.service

# 3. Kill the orphaned rogue process holding the port
sudo kill -15 <PID_FROM_SS>

# 4. Restart your service cleanly
sudo systemctl restart my-backend.service
```

---

### Incident 4: Production Log Analysis for 5xx Errors & Suspicious Traffic

**Diagnostic Workflow:**
```bash
# 1. Count total HTTP 500 Internal Server Errors in access log
grep "HTTP/1.1\" 500" /var/log/nginx/access.log | wc -l

# 2. Extract Top 10 IP addresses generating the highest traffic volume
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 10

# 3. Extract Top 10 most requested URI endpoints
awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 10

# 4. Tail live error log filtered for critical warnings only
tail -f /var/log/nginx/error.log | grep -E "crit|error|emerg"
```

---

# 13. Key Differences & Comparison Matrix

| Commands | Core Difference | DevOps Context |
|---|---|---|
| `df` vs `du` | **Filesystem total usage** vs **directory/file specific size**. | Use `df -h` first to spot full partitions; then `du -sh` to locate the culprit directory. |
| `ps` vs `top` | **Static snapshot** vs **real-time dynamic monitor**. | Use `ps aux` for scripting and filtering; use `top`/`htop` for live debugging. |
| `grep` vs `find` | **Searches text inside files** vs **searches file names/metadata**. | `grep "API_KEY" .` vs `find . -name "*.env"`. |
| `cat` vs `less` | **Dumps entire file to terminal** vs **interactive scrollable viewer**. | Never `cat` a 5 GB log file (terminal freezes); always use `less` or `tail`. |
| `>` vs `>>` | **Overwrites destination** vs **appends to end of file**. | Using `>` on an existing `.log` destroys history; `>>` preserves existing records. |
| `kill` vs `pkill` | **Terminates by numeric PID** vs **terminates by process name pattern**. | `kill 8432` vs `pkill -f "celery worker"`. |
| `SIGTERM (15)` vs `SIGKILL (9)` | **Graceful shutdown request** vs **immediate kernel termination**. | Always attempt `kill -15` first so databases flush and sockets disconnect cleanly. |
| `apt` vs `apt-get` | **Human-friendly CLI** vs **stable scripting tool**. | Use `apt` on terminal, `apt-get` in automated Bash scripts and Dockerfiles. |
| `ss` vs `netstat` | **Fast modern kernel socket tool** vs **deprecated legacy tool**. | Modern Linux distros may not include `netstat` by default. |
| `ip` vs `ifconfig` | **Modern network suite** vs **deprecated legacy utility**. | `ip a` replaces `ifconfig`; `ip route` replaces `route`. |
| `Symlink` vs `Hard Link` | **Path reference pointer** vs **direct inode pointer**. | Symlinks can span across filesystems; hard links cannot. |

---

# 14. The DevOps Troubleshooting Mindset

When an alert triggers or an outage occurs on a Linux server, follow this structured, 9-step systematic diagnostic mental model:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               SYSTEMATIC LINUX DIAGNOSTIC FLOW                         │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
 1. Identity & Context             ▼
    whoami / id / pwd              "Who am I running as? Where am I?"
                                   │
 2. Service & Process State        ▼
    systemctl status / ps aux      "Is the application process running?"
                                   │
 3. Network & Port Bindings        ▼
    ss -ltnp / nc -zv              "Is the service listening on expected port?"
                                   │
 4. Connectivity & DNS             ▼
    ping / curl -Iv / dig          "Can it reach the database, API, and DNS?"
                                   │
 5. Log Files & Errors             ▼
    journalctl -u / tail -F        "What exact error messages are logged?"
                                   │
 6. System Resource Saturation     ▼
    df -h / free -h / uptime       "Is disk full, RAM exhausted, or CPU pegged?"
                                   │
 7. File Permissions & Security    ▼
    ls -lah / chmod / chown        "Are read/write permissions preventing access?"
                                   │
 8. Configuration File Integrity   ▼
    nginx -t / diff / git status   "Was a config modified with invalid syntax?"
                                   │
 9. Kernel & System Events         ▼
    dmesg -T | grep -i oom         "Did the Linux OOM-Killer kill the container?"
```

---

## Conclusion & Recommended Learning Path

Mastering Linux is a continuous journey. To build mastery from fundamental administration to cloud-native platforms, follow this sequence:

```text
1. File System, Permissions & Text Utilities (grep, sed, awk)
                          ↓
2. Process Control, Streams & System Services (systemd, journalctl)
                          ↓
3. Networking, DNS, Sockets & Remote Access (ss, curl, SSH)
                          ↓
4. Bash Shell Scripting & Automation Pipelines
                          ↓
5. Docker Container Internals (cgroups, namespaces, chroot)
                          ↓
6. Kubernetes Node Administration & Cloud Orchestration (AWS / GCP / Azure)
```
