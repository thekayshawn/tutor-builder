#  setting the base image to node v16
FROM node:16
#  creating and changing the current directory to /usr/src/app in the image
WORKDIR /usr/src/app

#  setting two args for cloning repo from bitbucket. These args will be provided from CLI 
#  using --build-arg like 
#  docker build --build-arg username=Abdullah-Sajjad026 --build-arg password=apppassword -t dashboardsv1/desired-image-name .
ARG username=GIT_USERNAME
ARG password=GIT_PASSWORD

# RUN ["git", "clone", "https://$username:$password@bitbucket.org/rashid-pangiah/dashboardsv1.git"]
#  Using the defined args to clone git repo to current directory.
RUN git clone https://$username:$password@bitbucket.org/rashid-pangiah/content_builder.git

#  Cloned directory contains package.json so installing the node modules.
RUN ["yarn"]

#  copying .env files in newly created image's current directory.
COPY .env.* .

#  Setting a PORT env variable to 3001.
ENV PORT=3002

#  Exposing a port from container when image will be running in a container. We can sync this port 
#  to system's port with -p flag while starting the container.
EXPOSE 3002

#  A Dockerfile contains only one CMD command that executes when we start a container using that image.
CMD [ "yarn", "start" ]