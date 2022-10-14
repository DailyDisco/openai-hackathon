import os

import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
    model="code-davinci-002",
    prompt="# Create a Python dictionary of 6 countries and their capitals\ncountries =",
    temperature=0,
     max_tokens=256,
     top_p=1,
     frequency_penalty=0,
     presence_penalty=0
)