from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import pyrebase

app = FastAPI()


firebaseConfig = {
  "apiKey": "AIzaSyCe6mD3Aw2YeCyB4IQlCsiSxcHd2g5B3Ug",
  "authDomain": "autentificacion-a345c.firebaseapp.com",
  "databaseURL": "https://autentificacion-a345c-default-rtdb.firebaseio.com",
  "storageBucket": "autentificacion-a345c.appspot.com",
  "projectId": "autentificacion-a345c",
  "messagingSenderId": "796860377329",
  "appId": "1:796860377329:web:4efe9ff2aa787478dba150",
}

firebase = pyrebase.initialize_app(firebaseConfig)

securityBasic= HTTPBasic()
securityBearer= HTTPBearer()

@app.get(
    "/users/token", 
    status_code=status.HTTP_202_ACCEPTED,
    summary="Obtener un token de usuario",
    description="Obtener un token de usuario",
    tags=["auth"]
    )
async def get_token(credentials:HTTPBasicCredentials = Depends(securityBasic)):
    try:
        email=credentials.username
        password=credentials.password
        auth=firebase.auth()
        user=auth.sign_in_with_email_and_password(email, password) 
        response={
            "token": user['idToken']
        }
        return response
    except Exception as error:
        return(f"Errorcitotoken:{error}")
     #   raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

@app.get(
    "/users/", 
    status_code=status.HTTP_202_ACCEPTED,
    summary="Obtener un user",
    description="Obtener un user",
    tags=["auth"]
    )
async def get_user(credentials: HTTPAuthorizationCredentials=Depends(securityBearer)):
    try:
        auth=firebase.auth()
        user=auth.get_account_info(credentials.credentials)
        uid= user['users'][0]['localId']
        
        db= firebase.database()
        user_data=db.child('users').child(uid).get().val()

        response={
            "user_data":user_data 
            }
        return response

    except Exception as error:
        return(f"Erroruser:{error}")
#        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)