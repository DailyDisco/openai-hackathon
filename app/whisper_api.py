from fastapi import FastAPI, HTTPException, File, UploadFile
from whisper_mic import whisperResults, main #, generate_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
handler = Mangum(app) # this wraps the api app in a handler function
MAX_INPUT_LENGTH = 256

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get('/whisper_snippet')
# async def generate_whisper_api(result):
#     # validate_input_length(result)
#     snippet = main(result)
#     return {"snippet": snippet}

# @app.post("/files/")
# async def create_file(file: bytes = File()):
#     return {"file_size": len(file)}


# @app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile):
#     return {"filename": file.filename}

@app.get('/whisper_snippet')
async def generate_whisper_api(result):
    # validate_input_length(result)
    snippet = whisperResults(result)
    return {"snippet": snippet}

# validates the length of the prompt and throws an error if it's too long
def validate_input_length(result: str):
    if len(result) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input must be less than {MAX_INPUT_LENGTH} characters.",
        )
        
#uvicorn whisper_api:app --reload