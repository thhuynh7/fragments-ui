FROM node:latest AS build

LABEL maintainer="Thai Huynh <thhuynh7@myseneca.ca>"
LABEL description="Fragments-ui web app client"

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

# fragments microservice API URL 
ARG API_URL=local
ENV API_URL ${API_URL}

# AWS Amazon Cognito User Pool ID 
ARG AWS_COGNITO_POOL_ID=local
ENV AWS_COGNITO_POOL_ID ${AWS_COGNITO_POOL_ID}

# AWS Amazon Cognito Client App ID 
ARG AWS_COGNITO_CLIENT_ID=local
ENV AWS_COGNITO_CLIENT_ID ${AWS_COGNITO_CLIENT_ID}

# AWS Amazon Cognito Host UI domain 
ARG AWS_COGNITO_HOSTED_UI_DOMAIN=local
ENV AWS_COGNITO_HOSTED_UI_DOMAIN ${AWS_COGNITO_HOSTED_UI_DOMAIN}

# OAuth Sign-In Redirect URL 
ARG OAUTH_SIGN_IN_REDIRECT_URL=local
ENV OAUTH_SIGN_IN_REDIRECT_URL ${OAUTH_SIGN_IN_REDIRECT_URL}

# OAuth Sign-Out Redirect URL 
ARG OAUTH_SIGN_OUT_REDIRECT_URL=local
ENV OAUTH_SIGN_OUT_REDIRECT_URL ${OAUTH_SIGN_OUT_REDIRECT_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install -g parcel-bundler
RUN npm ci 

COPY . .
RUN npm run build

###############################################################################
FROM nginx:latest

COPY --from=build /app/dist/*.* /usr/share/nginx/html/

