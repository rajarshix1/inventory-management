This application is a multi-tenant inventory management system where multiple businesses use the same platform while keeping their data isolated. 
I'M Thinking of implementimg this using a rowlevel approach, where every document will contain tenantId. This will keep; the system simple and will ensure that tenants never access each other’s data.

Each tenant will have multiple users with roles- Owner, Manager, and Staff. Authentication will be handled /using JWT. I'M also thinking of enforcing the tenantid in all db calls through middleware.

Products will store onlyy basic information. Product variants (SKUs) stored as separate documents. Each variant is going to have its own stock. I'll choose this over embedding the skus to prevent frequent updates o n the product documentand to have better scaling capabilities when products have many  variants .


Stock is stored only at the variant level and every stock change is going to be recorded in a separate table. Stock can't be negative. MongoDB transactions and atomic updates to safely handle concurrent orders, ensuring that only one user can successfully order the last available item.

I have been thinking about the suppliers logic. A supplier can be tenant specific,or there will be only one supplier which can be connected to multiple tenants. If i go with one to many relationship, I have to put a mapping table or work on some logic for that. But I can also store suppliers separately to allow different agreements with different tenants. Means for supplierabc there can be two records, {name: supplierabc , tenantid: 1234},  {name: supplierabc , tenantid: 2345} . Probably going with the second flow. 

Two types of orders is there. PO or Purchase Orders are used when a tenant buys products from suppliers and they increase stock when items are received. SO orSales Orders are used when a tenant sells  products to customers and they decrease stock. These are best kept separate instead of creating a single order table, as they follow different workflow and have different logics and impact as well.


For indexing tenantId is definately going to be indexed. I'll also index frequently queried fields to ensure good performance. There can be compound indexes for the heavy query operations. For dashboard aggregation has to be used. 

For frontend: Its the first time I'm using react router so taking some suggestions from the internet(not using any AI). Just going to create login, dashboard, context for storing logged in state and users data, and real time socket based dashboard data. 

If had some time I'd add purchase order screen, system for sales order, customer login and system for supplier login as well. For supplier there would'VE been one supplier master table, which would store the creds for supplier while linking the current supplier table. 


the concept is when creating purchase order it is saved in the draft first. this is to mimic draft saving from frontend. Then the order is changed to sent via api. same for the other two statuses. 

In actual scenario, I'd have implemented a draft table for the draft feature. 

Used mongodb atlas for using transactions. Without replica set transaction cannot be done. Either setup replica in local or use docker, or use atlas. 