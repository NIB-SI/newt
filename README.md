# Dockerized Newt

This is a fork of [Newt](https://github.com/iVis-at-Bilkent/newt), a web based, open source viewer and editor for pathways in [Systems Biological Graphical Notation (SBGN)](https://sbgn.github.io/) and Simple Interaction Format (SIF).


# How to run

```bash
docker-compose up --build
```
will build and start the container and make Newt available at port 8080. If you want to use some other port, change the `.env` file accordingly. Please keep in mind that using ports below 1024 require superuser access.


# Documentation

The original README file for Newt is available [here](https://github.com/iVis-at-Bilkent/newt/blob/master/README.md).
