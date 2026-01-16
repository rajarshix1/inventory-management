Instruction: 
Backend: npm install, create .env file from the example. use mongodb atlas(must). 
first use npm run seed. itll create 3 tenants and for each one owner user. 
start with npm run dev or npm run start. 

Frontend: create env from example, then npm install. start with npm run dev or npm run start.

Test creds: john@abc.com , jane@qqq.com || password: DEFAULT_PASSWORD variable from env file. 

Features Implemented: 
backend:
user creation for owners and managers. 
creation of products and variants. 
purchase order creation from supplier: initially its set as draft, to mimic draft saving.
purchase order status change api: only the next order status can be set. you cant set received directly from draft. 
******** 'Draft', 'Sent', 'Confirmed', 'Received' ******** these are the statuses.
purchase order increases stock only when the status is received.
race condition handled in sales order creation. used mongo sessions. handles stock decrease gracefully. 
dashboard api. used aggregation there.
roll based authorization for some apis. just to show the feature. 
api for getting all products. 
login for users.

frontend: 
Login page
Dashboard page
Context api

Limitations: 
Didnt add notification yet. if I can add those by two hours Ill add it along with socket.io in frontend. need alert/notification table for that.
Didnt add low stock alerts yet. I'll add these as well. 
Didnt design the frontend that well. 
Haven't tested the api times. 
Could've used redis for caching dashboard data.
Didn't add real time data in dashboard. will take time so skipping that. 


