from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, OPTIONS
    allow_headers=["*"],       
)

#endP
@app.post("/login")
def login(user: dict):
    national_id = user.get("national_id")

    if national_id and len(national_id) == 10:
        return {
            "status": "success",
            "user_id": national_id,
            "token": "mock-token-123"
        }

    return {"status": "error", "message": "Invalid National ID"}
