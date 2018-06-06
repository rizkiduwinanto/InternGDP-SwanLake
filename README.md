## INTERN GDP LABS 



## Backends

### API
1. Frequent Poster per Forum
```
METHOD /GET
URL : /api/frequent-poster/:since/:until?forum=:forum_id&?limit=:number
RETURN : json [ {forum_id, forum_name, post_username, post_count}, ...]

example:  
  /api/frequent-poster/2018-05-27/2018-06-02?forum=10&limit=2
  /api/frequent-poster/2018-05-27/2018-06-02?forum=10
```

2. Frequent Poster Global
```
METHOD /GET
URL : /api/frequent-poster/:since/:until?limit=:number
RETURN : json [ post_username, post_count}, ...]

example: 
  /api/frequent-poster/2018-05-27/2018-06-02?limit=2
  /api/frequent-poster/2018-05-27/2018-06-02
```

3. Trending Word
```
METHOD /GET
URL: /api/trend/:since/:until/:word?limit=:number
RETURN: json [ {date, counted_word}, ...]

example:
  /api/trend/2018-05-27/2018-06-02/kaskus
```

4. Words Count
```
METHOD /GET
URL: /api/words/:since/:until
RETURN: json [ {word, count}, ...]

example: 
  /api/words/2018-05-27/2018-06-02?limit=3
  /api/words/2018-05-27/2018-06-02
```