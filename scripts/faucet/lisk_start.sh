#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/iov1/iov-faucet/tags
FAUCET_VERSION="v0.6.0"

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/faucet_start_lisk.XXXXXXXXX")
LOGFILE="$TMP_DIR/faucet_lisk.log"

DOCKER_HOST_IP=$(docker run --rm alpine ip route | awk 'NR==1 {print $3}')

BLOCKCHAIN_URL="http://$DOCKER_HOST_IP:4000"
echo "Connecting to $BLOCKCHAIN_URL"

docker run --read-only \
  --name "lisk_faucet" \
  --env "FAUCET_CONCURRENCY=3" \
  --env "FAUCET_CREDIT_AMOUNT_LSK=5" \
  --env "FAUCET_MNEMONIC=wagon stock borrow episode laundry kitten salute link globe zero feed marble" \
  --env "FAUCET_PORT=8002" \
  -p 8002:8002 \
  --rm "iov1/iov-faucet:${FAUCET_VERSION}" \
  start lisk "$BLOCKCHAIN_URL" \
  > "$LOGFILE" &

echo "Faucet running and logging into $LOGFILE. Showing the first few seconds of the log:"
sleep 8
cat "$LOGFILE"
