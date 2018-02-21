# dont-really

A utility for publishing to and adding packages from a local npm registry.

## Installation

This package uses the awesome Docker image provided by [verdaccio](https://github.com/verdaccio/verdaccio) to create the local registry.

Step one is to ensure you have Docker installed and running. If you need to install Docker, follow the [Docker installation docs](https://docs.docker.com/install/) to get setup. Verify Docker is running with:

```
docker --version
```

Next download and start the [verdaccio](https://github.com/verdaccio/verdaccio) Docker image:

```
docker run -it -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

You can now visit the local registry at http://localhost:4873. Add yourself as a user on the local registry with:

```
npm adduser --registry http://localhost:4873
```

This allows you to publish packages to the local registry. Finally run:

```
npm install -g dont-really
```

## Usage

From the directory of the package you want to publish locally:

```
dont-really publish
```

To add the package from local registry:

```
dont-really add [options] <package-name>
```
