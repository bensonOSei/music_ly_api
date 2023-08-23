docker build -t music_ly_api . --build-arg PORT=3000
docker run  -p 3000:3000 music_ly_api