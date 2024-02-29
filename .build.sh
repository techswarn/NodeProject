docker build --no-cache --platform=linux/amd64 -t swarntech/nodeproject:latest .
docker push swarntech/nodeproject:latest
#docker run -it -p8000:8000 -e PORT="8000" -e NODE_ENV="production" -e DATABASE="mongodb+srv://doadmin:<password>@app-db01-fe45a622.mongo.ondigitalocean.com/story?replicaSet=app-db01&tls=true&authSource=admin" -e DATABASE_PASSWORD="S5l1e4nx0vK369G7" swarntech/nodeproject