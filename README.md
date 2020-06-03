# URL-Shortner ( Rails + Reactjs)

## Setup

- Clone repository with  
  `$ git clone https://github.com/tejasaithal/binary-shortner.git`
- Move into cloned folder with
  `$ cd binary-shortner`
- Install dependencies with
  `$ bundle i`
- Setup database
  `$ rails db:create && rails db:migrate`
- Start rails server
  `$ rails server`

## Rake tasks available

### app:encode

- On running rake task `app:encode` with URL\
  `$ URL=https://bigbinary.com/jobs bundle exec rake app:encode`\
  we get the following statement with short url:\
  `The shortened url of https://bigbinary.com/jobs is https://binary-shortener.herokuapp.com/0eff54d2`

### app:decode

- On running rake task `app:decode` with SHORTURL\
  `$ SHORTURL=https://binary-shortener.herokuapp.com/0eff54d2 bundle exec rake app:decode`\
  we get the following statement with original url:\
  `The original url of short url https://binary-shortener.herokuapp.com/0eff54d2 is https://bigbinary.com/jobs`

### setup_sample_data

- Provides a way to set up sample data for the app.

## API Endpoints

```
Links
	: "GET" on "/api/v1/links"
	: "POST" on "/api/v1/links" with \
		  { original: https://www.bigbinary.com/jobs};
	: "GET" on "/api/v1/links/:id \
		  adds count & creates Counter model
	: "PUT" on /api/v1/links/:id with either pinned or category update
	: "DELETE" on "/api/v1/links/:id

Categories
	: "GET" on "/api/v1/categories"
	: "POST" on "/api/v1/categories" with \
		  { name: "Jobs", color: "#11fa34"};
	: "DELETE" on "/api/v1/categories/:id

Counters
  : "GET" on "/api/v1/counters" gets Reports
```

## Client

### Link List View

- Add Link.
- View all links with their short link.
- **Pin Link**\
  - Links have a boolean field `pinned` (default: false). When clicked, the `pinned` value is changed to the opposite value.
  - Pinned links move to the top (order by `pinned` value in desc) and are further ordered by `updated_at`(recent first).
- Links can be assigned a category.
- "Visits" count.

### Category View

- Add Category.
- List of Categories.

### Reports View

- Get a report of number of clicks per month.
