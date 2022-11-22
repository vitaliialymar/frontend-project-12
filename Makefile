start:
	make start-backend & make start-frontend

install:
	npm ci


start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main