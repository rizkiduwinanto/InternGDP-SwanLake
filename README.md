## INTERN GDP LABS 



## Backends

### API
1. Frequent Poster per Forum
```
METHOD /GET
URL : /api/frequent-poster/forum/:date
RETURN : json

example:  /api/frequent-poster/forum/2018-05-27
```

2. Frequent Poster global
```
METHOD /GET
URL : /api/frequent-poster/global/:date
RETURN : json

example:  /api/frequent-poster/global/2018-05-27
```

3. Trending Word
```
METHOD /GET
URL: /api/trend/:since/:until/:word
RETURN: json

example: /api/words/2018-05-27/2018-06-02/kaskus
```