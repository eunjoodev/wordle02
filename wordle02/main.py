from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer="EUNJU"

@app.get("/answer")
def get_answer():
    return answer

app.mount("/", StaticFiles(directory="static/wordle02", html=True), name="static")

# class Item(BaseModel):
#     id:int
#     content:str

# items = ['맥북', '애플워치', '아이폰', '에어팟']

# @app.get('/items')
# def read_id_items(id):
#     return items[int(id)]

# @app.get('/items/')
# def read_item(skip:int=0, limit:int=10):
#     return items[skip:skip+limit]

# @app.post("/items")
# def post_item(item:Item):
#     items.append(item.content) 
#     return '성공'