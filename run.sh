IMAGE_URL="https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png"
BACKGROUND_URL="https://wallpaperaccess.com/full/3057585.jpg"
curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
autocannon --renderStatusCodes -c1000 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"