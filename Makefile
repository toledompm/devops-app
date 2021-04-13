.PHONY: build
build:
	@docker build -t devops-app --build-arg=${PORT} .

.PHONY: run
run:
	@docker run --rm -dit --name devops-app -e PORT=${PORT} -p ${PORT}:${PORT} devops-app
