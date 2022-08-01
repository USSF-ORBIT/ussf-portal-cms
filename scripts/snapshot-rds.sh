#! /bin/bash
set -e

# Snapshot ID `rdsss-epoch`
SSID=rdsss-$(date +"%s")

# Create Snapshot
aws rds create-db-snapshot \
  --db-instance-identifier ${RDS_INSTANCE} \
  --db-snapshot-identifier $SSID --tags Key=sha,Value=${IMAGE_TAG}

# RDS Snapshot
RDSSS=$(aws rds describe-db-snapshots --db-snapshot-identifier $SSID |jq -r '.DBSnapshots[]' | jq -r '.Status')

# Don't do anything else until it's available
# aws docdb does not have a `wait`
until [ "$DBSS" = "available" ]
    do
      DBSS=$(aws rds describe-db-snapshots --db-snapshot-identifier $SSID |jq -r '.DBSnapshots[]' | jq -r '.Status')
      echo $RDSSS
      sleep 30
    done
    echo "$SSID available!"
