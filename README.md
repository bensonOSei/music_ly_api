# Music.ly

## Description

Music.ly is an AI powered chatbot that can recommend songs based on user's mood. It can also play songs on user's request. It is built using GPT-3.5 and Spotify API. This is the backend repository for the project, built using Node.js.

## Installation

1. Clone the repository

```bash
git clone
```

2.Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory and add the following environment variables

```bash
cp .env.example .env
```

4. Run the server

```bash
npm run dev
```

## Run the application Docker
commands for building and running the app using docker have already 
being scripted inside the build.sh to easy of use and convenience

To run the app using docker, just run

```
bash build.sh
```
feel free to customize the build.sh based on your preferences

### Using Docker Compose
Running with docker compose 


Using Docker Compose provides a significant advantage by effortlessly setting up and managing both your Music.ly application and the MySQL database. This eliminates the complexity of manually configuring and maintaining the database environment. This streamlined approach saves time and ensures consistent setups, making development and testing smoother.


```
docker-compose up
```

Now your Music.ly application is up and running along with a MySQL database. You can access the application at http://localhost:3000.