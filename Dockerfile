FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# Comment in first command if you want to run the app with authentication
#CMD ["npm", "run", "dock_start_auth"]
CMD ["npm", "run", "dock_start"]
