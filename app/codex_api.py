from fastapi import FastAPI, HTTPException
from codex import generate_codex_snippet #, generate_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app) # this wraps the api app in a handler function
MAX_INPUT_LENGTH = 128

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/codex_snippet')
async def generate_codex_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_codex_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

# validates the length of the prompt and throws an error if it's too long
def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input must be less than {MAX_INPUT_LENGTH} characters.",
        )
        
#uvicorn codex_api:app --reload