HOST=ec2-3-120-37-101.eu-central-1.compute.amazonaws.com:8000

URLS=(
  $HOST/users/1?purpose=PROFILE
  $HOST/users/1/render?purpose=PROFILE
  $HOST/users/1/steplogs/1?purpose=HEALTH
  $HOST/users/1/steplogs/1/render?purpose=HEALTH
)

for URL in "${URLS[@]}"
do
  echo $URL
  ab -c25 -n25000 -q $URL | grep -E "Complete|second|Transfer"
done

curl $HOST/kill
sleep 10

for URL in "${URLS[@]}"
do
  echo $URL
  ab -c25 -n25000 -q $URL | grep -E "Complete|second|Transfer"
done