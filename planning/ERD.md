![](https://raw.githubusercontent.com/fgfl/Smart-TODO-List/master/planning/smart-todo-app.png)


### [Draw.io link to ERD](https://www.draw.io/#G1HtIF7TwwFAZ-7HGFtpatX16qC0R_NyKg)

``` json
USERS {
  id: PK,
  name: string
  email: string
  password: string
}

CATEGORIES {
  id: PK,
  category_name: string
}

TASKS {
  id: PK,
  task_name: string,
  created_date: TIMESTAMP,
  scheduled_date: TIMESTAMP,
  completed_date: TIMESTAMP,
  priority: INTEGER,
  details_url: string/url
  is_active: boolean
}
```
