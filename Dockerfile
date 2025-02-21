FROM --platform=linux/amd64 oven/bun:latest


# Install required dependencies, including curl
RUN apt-get update -y && \
    apt-get install -y curl unzip build-essential && \
    rm -rf /var/lib/apt/lists/*

# Install AWS CLI
RUN curl -s "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws/

# Set working directory
WORKDIR /home/app

COPY . .