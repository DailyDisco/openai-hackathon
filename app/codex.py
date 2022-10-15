import os
from typing import List
import openai
import argparse # if __name__ == "__main__": let's us run the script from the command line
from dotenv import load_dotenv
import re

MAX_INPUT_LENGTH = 128

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def main ():
    print(f"working")
    # parser = argparse.ArgumentParser() # default library no need to install
    # parser.add_argument("--input", "-i", type=str, required=True)
    # #throws an error if you don't provide an input
    # args = parser.parse_args()
    # user_input = args.input
    
    # print(f"User input: {user_input}")
    # if validate_length(user_input):
    #      generate_gpt_snippet(user_input)
    #     #  generate_keywords(user_input)

    # else:
    #     raise ValueError(f"Input must be less than {MAX_INPUT_LENGTH} characters. Submitted user input is: {user_input}")

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_codex_snippet(prompt: str) -> str:

    response = openai.Completion.create(
        model="code-davinci-002",
        prompt="# Create a Python dictionary of 6 countries and their capitals\ncountries =",
        temperature=0,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

if __name__ == "__main__":
    main()