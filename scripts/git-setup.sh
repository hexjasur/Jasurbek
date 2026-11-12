#!/usr/bin/env bash
# Git global sozlamalarini bir marta, savollar bilan o'rnatadi.
# Ishlatish:  bash scripts/git-setup.sh
# Oldindan berish mumkin:
#   GIT_USER_NAME="Ism" GIT_USER_EMAIL="siz@misol.com" bash scripts/git-setup.sh
set -euo pipefail

say() { printf '%s\n' "$*"; }

yes_no() {
  local ans=""
  read -r -p "$1 (y/N): " ans || true
  case "$ans" in
    [Yy]*) return 0 ;;
    *) return 1 ;;
  esac
}

if ! command -v git >/dev/null 2>&1; then
  say "Git topilmadi. Avval örnating: https://git-scm.com/downloads"
  exit 1
fi

say "=== Git sozlaş ==="

NAME="${GIT_USER_NAME:-}"
EMAIL="${GIT_USER_EMAIL:-}"
[ -z "$NAME" ]  && read -r -p "Ismingiz: " NAME || true
[ -z "$EMAIL" ] && read -r -p "Email: " EMAIL || true

if [ -z "$NAME" ] || [ -z "$EMAIL" ]; then
  say "Ism va email boş bölmasligi kerak."
  exit 1
fi
case "$EMAIL" in
  *@*) ;;
  *) say "Email notöğri körinadi (@ yöq)."; exit 1 ;;
esac

# Asosiy sozlamalar
git config --global user.name "$NAME"
git config --global user.email "$EMAIL"
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global push.autoSetupRemote true
git config --global color.ui auto

# Qisqa buyruqlar (aliaslar)
git config --global alias.st "status"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.unstage "restore --staged"

# Satr oxiri: Windows (Git Bash) va boşqalar uçun
case "$(uname -s)" in
  MINGW*|MSYS*|CYGWIN*) git config --global core.autocrlf true ;;
  *)                    git config --global core.autocrlf input ;;
esac

# SSH kalit (GitHub'ga ulanish uçun, ixtiyoriy)
if command -v ssh-keygen >/dev/null 2>&1; then
  KEY="$HOME/.ssh/id_ed25519"
  if [ -f "$KEY" ]; then
    say "SSH kalit allaqachon bor: $KEY"
  elif yes_no "SSH kalit yaratilsinmi (GitHub uçun)?"; then
    mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
    ssh-keygen -t ed25519 -C "$EMAIL" -f "$KEY"
    say ""
    say "Ochiq kalit. GitHub > Settings > SSH and GPG keys ga qöşing:"
    cat "$KEY.pub"
  fi
fi

say ""
say "Tayyor. Hozirgi sozlamalar:"
git config --global --get-regexp '^(user|init|pull|push|core\.autocrlf)\.' || true
