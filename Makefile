install: 
	npm link

lint:
	npx eslint .
	
test:
	npm run test

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

.PHONY: test log