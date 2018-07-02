## INTERN GDP LABS 

## Installation

```
  git clone https://github.com/rizkiduwinanto/InternGDP-SwanLake
```
```
  cd InternGDP-SwanLake && npm install
```


## Commands to run
0. Open 4 terminal
1. Terminal#1 for redis server
```
  npm run start:redis
```
2. Terminal#2 for backend server API
```
  npm run start:server
```
3. Terminal#3 for consumer pub/sub
```
  npm run start:consumer
```
4. Terminal#4 for frontend
```
  npm run start
```




## Consumer pubsub

### Testing simple publish thread / post 
1. Publish thread
```
  npm run test:thread
```

2. Publish post
```
  npm run test:post
```

## Backends - API

1. Get Forum List
```
METHOD /GET
URL : /api/forum_list
RETURN : json [ {forum_id, forum_name, description}, ...]

example:  
  /api/forum_list

```

2. Frequent Poster per Forum
```
METHOD /GET
URL : /api/frequent_poster/:since/:until?forum=:forum_id&?limit=:number
RETURN : json [ {forum_id, forum_name, post_username, post_count}, ...]

example:  
  /api/frequent_poster/2018-05-27/2018-06-02?forum=10&limit=2
  /api/frequent_poster/2018-05-27/2018-06-02?forum=10
```

3. Frequent Poster Global
```
METHOD /GET
URL : /api/frequent_poster/:since/:until?limit=:number
RETURN : json [ post_username, post_count}, ...]

example: 
  /api/frequent_poster/2018-05-27/2018-06-02?limit=2
  /api/frequent_poster/2018-05-27/2018-06-02
```

4. Trending Word
```
METHOD /GET
URL: /api/trend/:since/:until/:word?limit=:number
RETURN: json [ {date, counted_word}, ...]

example:
  /api/trend/2018-05-27/2018-06-02/kaskus
```

5. Words Count
```
METHOD /GET
URL: /api/words/:since/:until
RETURN: json [ {word, count}, ...]

example: 
  /api/words/2018-05-27/2018-06-02?limit=3
  /api/words/2018-05-27/2018-06-02
```