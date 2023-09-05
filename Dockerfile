FROM node:16-alpine

# Add working directory
WORKDIR /app

COPY ./package.json ./
# install dependency
RUN npm install


#Copy all the files of current directory
COPY . .

# RUN npm run dev
#CMD
EXPOSE 5173
CMD ["npm", "run", "dev"]