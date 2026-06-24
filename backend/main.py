from fastapi.middleware.cors import CORSMiddleware
from fastapi import (FastAPI,Header,Depends)
from database import engine, SessionLocal, Base
from jwt_handler import (create_access_token,verify_token)
from auth import (
    hash_password,
    verify_password
)
from model import (
    Gig,
    Application,
    User
)

from schemas import (
    GigCreate,
    ApplicationCreate,
    UserCreate,
    UserLogin
)
from openai import OpenAI
import json
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(
    api_key=os.getenv("OPEN_ROUTER_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:5173",
        "https://locallancefrontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_current_user(
    authorization: str = Header(None)
):

    if not authorization:
        return None

    try:

        token = authorization.split(" ")[1]

        payload = verify_token(token)

        return payload

    except:
        return None
    

@app.get("/")
def home():
    return {
        "message": "LocalLance Backend Running"
    }


@app.post("/gigs")
def create_gig(
    gig: GigCreate,
    current_user = Depends(get_current_user)
):

    if not current_user:

        return {
            "message": "Unauthorized"
        }

    db = SessionLocal()

    new_gig = Gig(
        title=gig.title,
        description=gig.description,
        category=gig.category,
        budget=gig.budget,
        user=current_user["name"],
        status="Open"
    )

    db.add(new_gig)
    db.commit()
    db.refresh(new_gig)

    db.close()

    return new_gig


@app.get("/gigs")
def get_gigs():

    db = SessionLocal()

    gigs = db.query(Gig).all()

    db.close()

    return gigs


@app.get("/gigs/{gig_id}")
def get_gig(gig_id: int):

    db = SessionLocal()

    gig = db.query(Gig).filter(
        Gig.id == gig_id
    ).first()

    db.close()

    return gig

@app.delete("/gigs/{gig_id}")
def delete_gig(gig_id: int):

    db = SessionLocal()

    gig = db.query(Gig).filter(
        Gig.id == gig_id
    ).first()

    if not gig:
        db.close()
        return {"message": "Gig not found"}

    db.delete(gig)
    db.commit()

    db.close()

    return {
        "message": "Gig deleted successfully"
    }
    
@app.post("/applications")
def apply_for_gig(application: ApplicationCreate):

    db = SessionLocal()

    existing_application = db.query(Application).filter(
        Application.gig_id == application.gig_id,
        Application.applicant == application.applicant
    ).first()

    if existing_application:

        db.close()

        return {
            "message": "Already applied"
        }

    new_application = Application(
    gig_id=application.gig_id,
    applicant=application.applicant,
    proposal=application.proposal,
    delivery_time=application.delivery_time,
    quote=application.quote,
    portfolio=application.portfolio
)

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    db.close()

    return new_application

@app.get("/applications")
def get_applications():

    db = SessionLocal()

    applications = db.query(Application).all()

    db.close()

    return applications

@app.get("/applications/{applicant}")
def get_user_applications(applicant: str):

    db = SessionLocal()

    applications = db.query(Application).filter(
        Application.applicant == applicant
    ).all()

    db.close()

    return applications

@app.get("/gigs/{gig_id}/applications")
def get_gig_applications(gig_id: int):

    db = SessionLocal()

    applications = db.query(Application).filter(
        Application.gig_id == gig_id
    ).all()

    db.close()

    return applications

@app.put("/applications/{application_id}")
def update_application_status(
    application_id: int,
    status: str,
    feedback: str = ""
):

    db = SessionLocal()

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:

        db.close()

        return {
            "message": "Application not found"
        }

    application.status = status
    application.feedback = feedback

    # If applicant is accepted
    if status == "Accepted":
        already_selected = db.query(Application).filter(
        Application.gig_id == application.gig_id,
        Application.status == "Accepted",
        Application.id != application_id
        ).first()
        
        if already_selected:

            db.close()

            return {
            "message": "An applicant has already been selected for this gig."
            }

        application.feedback = (
        feedback
        if feedback
        else "Congratulations! Your proposal has been accepted. You can now contact the client using the details provided in your dashboard."
            )

        gig = db.query(Gig).filter(
        Gig.id == application.gig_id
        ).first()

        if gig:
            gig.status = "In Progress"

        other_apps = db.query(Application).filter(
        Application.gig_id == application.gig_id,
        Application.id != application_id
        ).all()

        for app in other_apps:

            app.status = "Rejected"

            app.feedback = (
            "Thank you for applying. Another applicant was selected for this project. We appreciate your interest and encourage you to apply for future opportunities."
            )
                
    db.commit()
    db.refresh(application)

    db.close()

    return application

@app.put("/gigs/{gig_id}")
def update_gig(
    gig_id: int,
    updated_gig: GigCreate
):

    db = SessionLocal()

    gig = db.query(Gig).filter(
        Gig.id == gig_id
    ).first()

    if not gig:

        db.close()

        return {
            "message": "Gig not found"
        }

    gig.title = updated_gig.title
    gig.description = updated_gig.description
    gig.category = updated_gig.category
    gig.budget = updated_gig.budget
    gig.user = updated_gig.user
    gig.status = updated_gig.status

    db.commit()
    db.refresh(gig)

    db.close()

    return gig

@app.post("/register")
def register(user: UserCreate):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        db.close()

        return {
            "message":
            "Account already exists"
        }

    new_user = User(

        name=user.name,

        email=user.email,

        password=hash_password(user.password)
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    db.close()

    return {
        "message":
        "Registration successful"
    }

@app.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        db.close()

        return {
            "message":
            "User not found"
        }

    if not verify_password(
    user.password,
    existing_user.password
):

        db.close()

        return {
            "message":
            "Incorrect password"
        }

    db.close()

    token = create_access_token(
    {
        "email": existing_user.email,
        "name": existing_user.name
    }
)

    return {
    "message": "Login successful",
    "token": token,
    "user": {
        "name": existing_user.name,
        "email": existing_user.email
    }
}
    
@app.get("/users")
def get_users():

    db = SessionLocal()

    users = db.query(User).all()

    db.close()

    return users


@app.post("/ai/rank-applicants")
def rank_applicants(data: dict):

    gig_description = data.get("gig_description", "")
    applicants = data.get("applicants", [])

    if not applicants:
        return {"ranked": []}

    prompt = f"""
    You are a hiring assistant for a college freelance marketplace.

    Gig Description:
    {gig_description}

    Applicants:
    {json.dumps(applicants, indent=2)}

    Score each applicant from 0-100 based on:
    1. How relevant their proposal is to the gig (40%)
    2. Clarity and professionalism of proposal (40%)
    3. Reasonable pricing for the work (20%)

    Return ONLY a valid JSON array, nothing else, no backticks:
    [
      {{"id": 1, "score": 85, "reason": "one line reason"}},
      {{"id": 2, "score": 72, "reason": "one line reason"}}
    ]

    Sort by score descending.
    """

    response = client.chat.completions.create(
    model="deepseek/deepseek-chat-v3-0324",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ]
)

    raw = response.choices[0].message.content
    raw = raw.replace("```json", "")
    raw = raw.replace("```", "")
    raw = raw.strip()

    ranked = json.loads(raw)

    return {"ranked": ranked}