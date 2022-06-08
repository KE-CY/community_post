## Description
使用 Nest 框架開發簡易貼文留言功能

## Q1. DB design
![Community_Post](https://user-images.githubusercontent.com/54132183/172594698-8f5f654b-d326-4869-b64e-e410e695d032.png)


## Q2. Engineering planning
專案架構使用乾淨架構開發
API 遵循使用 RESTful API 做開發
設計 Database 
撰寫貼文的 CRUD
撰寫留言的 CRUD


## Api 
### Post
1. Get all post -> Get: `/post`
2. Get top10 comment -> Get:  `/post/top10`
3. Create post -> Post: `/post`
4. Update post -> Patch: `/post/:id`
5. Delete post -> Delete: `/post/:id`

### Comment
1. Create comment -> Post: `/comment`
2. Reply comment -> Post: `/comment/:id`
3. Update comment -> Patch: `/comment/:id`
4. Delete comment -> Delete: `/comment/:id`

## Q3. 應⽤程式反應過慢，會如何找到問題所在並且優化?
先看是否是資料庫搜尋的時段太長，查看是否是資料量太多，導致原始的搜尋方式無法快速找到需要的資料，加入索引減少搜尋時間。<br>


## Docker run
```bash
$ docker-compose build --no-cache
$ docker-compose up -d
```

## Running the app

```bash
$ npm i
$ npm run start:dev
```

## Author

- Author - [Chih Yi, Ko](https://github.com/KE-CY)

