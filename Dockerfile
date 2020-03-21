FROM node
RUN yarn global add lerna && mkdir /opt/rent-a-dress2
COPY . /opt/rent-a-dress2
WORKDIR /opt/rent-a-dress2
RUN lerna bootstrap
WORKDIR /opt/rent-a-dress2/packages/nest-server
CMD ls && yarn run test:e2e