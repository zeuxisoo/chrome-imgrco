.PHONY: server

all:
	@echo "make server"

server:
	@php -S localhost:8080 -t ./server
