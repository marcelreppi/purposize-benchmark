HOST=ec2-3-120-37-101.eu-central-1.compute.amazonaws.com:8000

URLS_25K=(
  $HOST/users/random?purpose=PROFILE
  $HOST/users/random/render?purpose=PROFILE
  $HOST/users/random/steplogs?purpose=HEALTH
  $HOST/users/random/steplogs/render?purpose=HEALTH
  $HOST/users/random/steplogs/all?purpose=HEALTH\&n=24
)

URLS_10K=(
  $HOST/users/random/steplogs/all/render?purpose=HEALTH\&n=24\&view=1
  $HOST/users/random/steplogs/all/render?purpose=HEALTH\&n=24\&view=2
  $HOST/users/random/steplogs/all/render?purpose=HEALTH\&n=24\&view=3
)

function benchUrls {
  for URL in "${URLS_25K[@]}"
  do
    echo $URL
    # ab -c25 -n25000 -q $URL | grep -E "Complete|second|Transfer"
  done

  for URL in "${URLS_10K[@]}"
  do
    echo $URL
    # ab -c25 -n10000 -q $URL | grep -E "Complete|second|Transfer"
  done
}

benchUrls

# curl $HOST/kill
# sleep 10

# benchUrls