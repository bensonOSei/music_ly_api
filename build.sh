docker build -t music_ly_api . --build-arg PORT=3000
docker run -e PORT=3000 music_ly_api 