from flask import Flask, abort, request
from tempfile import NamedTemporaryFile
import whisper
import torch
import gpt3
import openai
import os
import codex
from dotenv import load_dotenv
from flask_cors import CORS
# from whisperMic import whisperResults, main #, generate_keywords
# # from mangum import Mangum

app = Flask(__name__)
# handler = Mangum(app) # this wraps the api app in a handler function for AWS Lambda
CORS(app, supports_credentials=True)


load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Check if NVIDIA GPU is available
torch.cuda.is_available()
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Load the Whisper model:
model = whisper.load_model("base", device=DEVICE)

## Example
# @app.route("/")
# def hello():
#     return "Whisper Hello World!"

# @app.route('/whisper_snippet', methods=['GET', 'POST'])
# def generate_whisper_api(result):
#     voiceSnippet = whisperResults(result)
#     return {'voiceSnippet': voiceSnippet}

@app.route('/whisper_mic', methods=['POST', 'GET'])
def generate_whisper_mp3():
    # print('Hello world!', file=sys.stderr)
    # if not request.files:
    #     # If the user didn't submit any files, return a 400 (Bad Request) error.
    #     abort(400)

    # For each file, let's store the results in a list of dictionaries.
    results = []

    # Loop over every file that the user submitted.
    for filename, handle in request.files.items():
        # Create a temporary file.
        # The location of the temporary file is available in `temp.name`.
        temp = NamedTemporaryFile()
        # Write the user's uploaded file to the temporary file.
        # The file will get deleted when it drops out of scope.
        handle.save(temp)
        # Let's get the transcript of the temporary file.
        result = model.transcribe(temp.name)
        # Now we can store the result object for this file.
        results.append({
            'filename': filename,
            'transcript': result['text'],
        })

    # This will be automatically converted to JSON.
    return {'results': results}


@app.route('/whisper', methods=['POST', 'GET', 'PUT'])
def handler():
    if not request.files:
        # If the user didn't submit any files, return a 400 (Bad Request) error.
        abort(400)

    # For each file, let's store the results in a list of dictionaries.
    results = []

    # Loop over every file that the user submitted.
    for filename, handle in request.files.items():
        # Create a temporary file.
        # The location of the temporary file is available in `temp.name`.
        temp = NamedTemporaryFile()
        # Write the user's uploaded file to the temporary file.
        # The file will get deleted when it drops out of scope.
        handle.save(temp)
        # Let's get the transcript of the temporary file.
        result = model.transcribe(temp.name)
        text = result['text']
        # Let's get the summary of the sound file
        summary = gpt3.gpt3complete(text)
        
        # Let's make a summary of the first summary
        secondSummary = codex.codexComplete(summary)
        # Now we can store the result object for this file.
        results.append({
            'filename': filename,
            'transcript': text.strip(),
            'summary': summary.strip(),
            'secondSummary': secondSummary.strip(),
        })

    # This will be automatically converted to JSON.
    return {'results': results}