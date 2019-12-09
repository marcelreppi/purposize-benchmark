export GENERATE_DATA=true

while true; do
  export USE_PURPOSIZE=false
  npm start
  export USE_PURPOSIZE=true
  npm start
done