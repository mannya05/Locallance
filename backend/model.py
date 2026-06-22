from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(String)

    email = Column(
        String,
        unique=True
    )

    password = Column(String)
    
class Gig(Base):
    __tablename__ = "gigs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    category = Column(String)
    budget = Column(Integer)
    user = Column(String)
    status = Column(
        String,
        default="Open"
    )
    
class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    gig_id = Column(Integer)

    applicant = Column(String)

    proposal = Column(String)

    delivery_time = Column(String)

    quote = Column(Integer)

    portfolio = Column(String)

    feedback = Column(String, default="")
    
    status = Column(String, default="Pending")
    
    