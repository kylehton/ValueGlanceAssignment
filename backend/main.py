from fastapi import FastAPI
from urllib.request import urlopen
import certifi
import json
import dotenv
import os

dotenv.load_dotenv()

app = FastAPI()

def get_income_statements():
   
    def get_jsonparsed_data(url):
        response = urlopen(url, cafile=certifi.where())
        data = response.read().decode("utf-8")
        return json.loads(data)

    url = ("https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=YOUR_API_KEY")
    print(get_jsonparsed_data(url))


@app.get("/")
async def root():
    return {"message": "Hello World"}