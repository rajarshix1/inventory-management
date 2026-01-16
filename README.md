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
Added socket in backend. Notifications and low stock alerts working.

frontend: 
Login page
Dashboard page
Context api

Limitations: 
Didn't connect with socket in the frontend. 
Didnt design the frontend that well. 
Haven't tested the api execution times. 
Could've used redis for caching dashboard data.
Didn't add real time data in dashboard. will take time so skipping that. 

*********************************************************************************************************************************************
To test socket, connect to the backend url. then join room with join-room and tenantId as argument. listen to notification and refreshDashboard. Then just create any order, po or so. and update order's status. Have two images of response as well.
*********************************************************************************************************************************************
Included the postman collection as well. 
