# dont-really

Easily publish throwaway versions of a package to a local npm registry.

## The problem

You are making changes to a library that is used by other packages. You want a quick way to see how the changes impact your consumers.

Adding the library using the `file://` prefix copies whole directory into the package's node modules. This is different to adding the library from a remote registry. In the remote case, only files that have been published are put into the package's node modules. These published files are controlled by the library's `package.json` and `.npmignore` files.

These difference can lead to errors that are false positives, or worse, errors that are undiscovered. 😡

## The solution

`dont-really` is a utility that provides an easy way of publishing to and adding packages from a local npm registry. This makes it painless to publish local versions of a library and add those versions in other packages. Your library will be added in the same way it would be in the wild. You are now consuming your library in the same way your users do. Hurray! 🙌

## Usage

From the directory of the package you want to publish locally:

```
dont-really publish
```

To add the package from local registry:

```
dont-really add [options] <package-name>
```

## Installation

This package uses the awesome Docker image provided by [verdaccio](https://github.com/verdaccio/verdaccio) to create the local registry.

Step one is to ensure you have Docker installed and running. If you need to install Docker, follow the [Docker installation docs](https://docs.docker.com/install/) to get setup. Verify Docker is running with:

```
docker --version
```

Download and start the [verdaccio](https://github.com/verdaccio/verdaccio) Docker image by running:

```
docker run -it -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

You can now visit the local registry at http://localhost:4873.

Add yourself as a user on the local registry with:

```
npm adduser --registry http://localhost:4873
```

This allows you to publish packages to the local registry.

Finally run:

```
npm install -g dont-really
```

Thats it! 🎉
