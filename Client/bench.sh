HOST=ec2-3-120-37-101.eu-central-1.compute.amazonaws.com

URLS=(
# $HOST/api/users/100/purpose/$KEY
# $HOST/api/users/100/overview/user/purpose/$KEY
# $HOST/api/users/100/steps/purpose/$KEY
# $HOST/api/users/100/overview/steps/purpose/$KEY

$HOST/users/1\?purpose=PROFILE
)

for URL in "${URLS[@]}"
do
  echo $URL
  ab -c25 -n25000 -q $URL | grep -E "Complete|second|Transfer"
done