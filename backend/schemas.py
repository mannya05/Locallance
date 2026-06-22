from pydantic import BaseModel

class GigCreate(BaseModel):
    title: str
    description: str
    category: str
    budget: int
    user: str
    status: str = "Open"


class GigResponse(GigCreate):
    id: int

    class Config:
        from_attributes = True
        
class ApplicationCreate(BaseModel):
    gig_id: int
    applicant: str
    proposal: str
    delivery_time: str
    quote: int
    portfolio: str


class ApplicationResponse(ApplicationCreate):
    id: int
    status: str
    feedback: str = ""

    class Config:
        from_attributes = True
        
class UserCreate(BaseModel):

    name: str
    email: str
    password: str


class UserLogin(BaseModel):

    email: str
    password: str